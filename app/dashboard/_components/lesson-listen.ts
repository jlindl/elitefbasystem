/*
 * "Listen": reads a lesson part aloud with the browser's own speech voices (no service,
 * nothing to install). Text is spoken in short runs (whole sentences where they fit),
 * which keeps every browser reliable (some cut long utterances off without telling us)
 * and lets the page highlight the paragraph being read.
 */

export type ReadItem = { el: HTMLElement | null; text: string };

export function speechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

/** Text a listener should hear: no screen-reader-only extras, hidden popovers or decorations. */
function spokenText(el: HTMLElement) {
  const copy = el.cloneNode(true) as HTMLElement;
  copy.querySelectorAll(".sr-only, [aria-hidden='true'], [hidden], script, style").forEach((n) => n.remove());
  const clean = (n: Element) => (n.textContent ?? "").replace(/\s+/g, " ").trim();
  // A callout's title and body are separate paragraphs: give them a pause ("Pro tip. Always…").
  const blocks = [...copy.querySelectorAll("p, li")].map(clean).filter(Boolean);
  if (blocks.length < 2) return clean(copy);
  return blocks.reduce((all, b) => (all ? `${all}${/[.!?:]$/.test(all) ? "" : "."} ${b}` : b), "");
}

/** Everything readable in a part: its heading, then its text blocks in order (tools are skipped). */
export function collectPart(section: HTMLElement, heading: string): ReadItem[] {
  const items: ReadItem[] = [{ el: section.querySelector<HTMLElement>("h2"), text: heading }];
  section.querySelectorAll<HTMLElement>("[data-read]").forEach((el) => {
    const text = spokenText(el);
    if (text) items.push({ el, text });
  });
  return items;
}

let voices: SpeechSynthesisVoice[] = [];

/** Starts the browser loading its voices (Chrome has none on the first call). */
export function primeVoices() {
  if (!speechSupported()) return;
  const load = () => {
    voices = window.speechSynthesis.getVoices();
  };
  load();
  window.speechSynthesis.addEventListener?.("voiceschanged", load);
}

/** The best English voice on this device: natural/neural British voices first. */
function pickVoice(): SpeechSynthesisVoice | null {
  if (!voices.length) voices = window.speechSynthesis.getVoices();
  const score = (v: SpeechSynthesisVoice) => {
    let s = 0;
    if (/^en[-_]GB/i.test(v.lang)) s += 40;
    else if (/^en/i.test(v.lang)) s += 20;
    else return -1;
    if (/natural|neural|online/i.test(v.name)) s += 30;
    if (/google/i.test(v.name)) s += 15;
    if (/sonia|libby|ryan|daniel|serena|kate|arthur|martha/i.test(v.name)) s += 10;
    if (v.localService) s += 2;
    return s;
  };
  const best = voices.map((v) => ({ v, s: score(v) })).filter((x) => x.s >= 0).sort((a, b) => b.s - a.s)[0];
  return best?.v ?? null;
}

const MAX = 140;

/** Splits a sentence that's too long at commas and semicolons, then between words. */
function split(sentence: string): string[] {
  if (sentence.length <= MAX) return [sentence];
  const out: string[] = [];
  let cur = "";
  const pieces = sentence.match(/[^,;:]+[,;:]?\s*/g) ?? [sentence];
  for (const piece of pieces.flatMap((p) => (p.length <= MAX ? [p] : (p.match(new RegExp(`.{1,${MAX}}(\\s|$)`, "g")) ?? [p])))) {
    if (cur && (cur + piece).length > MAX) {
      out.push(cur.trim());
      cur = "";
    }
    cur += piece;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** Short runs of whole sentences (long sentences are split), each at most ~140 characters. */
export function chunk(text: string): string[] {
  const sentences = (text.match(/[^.!?]+(?:[.!?]+["')\]]*|$)\s*/g) ?? [text]).flatMap(split);
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if (cur && (cur + s).length > MAX) {
      out.push(cur.trim());
      cur = "";
    }
    cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

type Events = { onItem: (index: number) => void; onEnd: () => void; onError: () => void };

export class Reader {
  private chunks: { item: number; text: string }[] = [];
  private at = 0;
  private token = 0;
  private lastItem = -1;
  private watchdog = 0;
  rate = 1;

  constructor(private events: Events) {}

  play(items: ReadItem[], rate: number) {
    this.stop();
    this.rate = rate;
    this.chunks = items.flatMap((it, item) => chunk(it.text).map((text) => ({ item, text })));
    this.at = 0;
    this.lastItem = -1;
    this.speak();
  }

  /** Stops speaking but keeps the place (pause/resume is unreliable on some phones, so this restarts the sentence). */
  pause() {
    this.token++;
    window.clearTimeout(this.watchdog);
    window.speechSynthesis.cancel();
  }

  resume() {
    this.speak();
  }

  stop() {
    this.token++;
    window.clearTimeout(this.watchdog);
    this.chunks = [];
    window.speechSynthesis.cancel();
  }

  setRate(rate: number, playing: boolean) {
    this.rate = rate;
    if (playing) {
      this.pause();
      this.speak();
    }
  }

  private speak() {
    const token = ++this.token;
    window.clearTimeout(this.watchdog);
    const next = this.chunks[this.at];
    if (!next) {
      this.events.onEnd();
      return;
    }
    if (next.item !== this.lastItem) {
      this.lastItem = next.item;
      this.events.onItem(next.item);
    }
    const u = new SpeechSynthesisUtterance(next.text);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-GB";
    u.rate = this.rate;
    const advance = () => {
      if (token !== this.token) return;
      this.at++;
      this.speak();
    };
    u.onend = advance;
    u.onerror = (e) => {
      if (token !== this.token || e.error === "interrupted" || e.error === "canceled") return;
      // The voice isn't working (offline network voice, no speech engine…): stop, don't skip ahead.
      this.stop();
      this.events.onError();
    };
    // Some voices go quiet mid-way without ever saying they've finished: move on if it's long overdue.
    const expected = (next.text.length / (14 * this.rate)) * 1000;
    this.watchdog = window.setTimeout(() => {
      if (token !== this.token) return;
      this.token++;
      window.speechSynthesis.cancel();
      this.at++;
      this.speak();
    }, expected * 2 + 4000);
    window.speechSynthesis.speak(u);
  }
}
