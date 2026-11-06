"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";
import { ArrowRight, Check, ChevronDown, ChevronLeft, Clock } from "@/app/components/icons";
import { readLocal, useLocalValue, writeLocal } from "../_lib/use-local-store";
import { AskJakubProvider, type LessonRef } from "./ask-jakub";
import { BackToTop } from "./back-to-top";
import { collectPart, primeVoices, Reader, speechSupported, type ReadItem } from "./lesson-listen";
import { usePrefCookie, writePrefCookie } from "../_lib/use-pref-cookie";
import { COOKIES } from "../_lib/welcome";

/*
 * The lesson player. A lesson is a series of steps: its parts (cut at the section headings)
 * and a closing wrap-up. Members either go one part at a time ("guided", the default) or
 * read the whole lesson on one page ("full"). Every step is rendered on the server; the
 * player only decides which one shows, and remembers progress on this device.
 */

export type LessonStepMeta = {
  id: string;
  kicker: string | null;
  title: string;
  minutes: number;
  interactive: number;
  /** Has text to read aloud. */
  readable?: boolean;
  /** The closing step: key terms, the knowledge check and "Complete lesson". */
  wrapUp?: boolean;
  /** What the wrap-up holds, for the button that leads to it. */
  blurb?: string;
};

export type LessonMode = "guided" | "full";
export type TextSize = "m" | "l" | "xl";
export type LessonFont = "standard" | "easy";

type Saved = { at: string | null; done: string[] };
type Nav = { index: number; focus: boolean; scroll: boolean; animate: boolean };
type GoTo = (index: number, opts?: { focus?: boolean; scroll?: boolean; keepListening?: boolean; countRead?: boolean }) => void;
type Listening = { step: number; playing: boolean; error?: boolean };

const LISTEN_RATES = [1, 1.25, 1.5, 0.75];

type Player = {
  steps: LessonStepMeta[];
  /** Steps that are lesson parts (all but the wrap-up). */
  parts: number;
  mode: LessonMode;
  current: number;
  done: ReadonlySet<string>;
  /** A part to offer "Continue where you left off" for, or null. */
  resume: number | null;
  lessonDone: boolean;
  goTo: GoTo;
  setMode: (mode: LessonMode) => void;
  size: TextSize;
  font: LessonFont;
  partsOpen: boolean;
  setPartsOpen: (open: boolean) => void;
  /** Read-aloud: which part is being read, if any. */
  listening: Listening | null;
  listenTo: (index: number) => void;
  toggleListening: () => void;
  stopListening: () => void;
  /** Closes the "read aloud isn't working" notice. */
  dismissListenError: () => void;
  listenRate: number;
  cycleListenRate: () => void;
};

const PlayerContext = createContext<Player | null>(null);

function usePlayer() {
  const p = useContext(PlayerContext);
  if (!p) throw new Error("Lesson player components must be inside <LessonPlayerProvider>.");
  return p;
}

function parseSaved(raw: string | null): Saved {
  try {
    const v = JSON.parse(raw ?? "");
    return {
      at: typeof v?.at === "string" ? v.at : null,
      done: Array.isArray(v?.done) ? v.done.filter((x: unknown): x is string => typeof x === "string") : [],
    };
  } catch {
    return { at: null, done: [] };
  }
}

const motionOK = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function readHash() {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
}

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export function LessonPlayerProvider({
  lessonKey,
  steps,
  lessonDone,
  initial,
  children,
}: {
  lessonKey: string;
  steps: LessonStepMeta[];
  lessonDone: boolean;
  /** The reading-option cookies the server rendered with. */
  initial: { mode: string | null; size: string | null; font: string | null };
  children: ReactNode;
}) {
  const mode: LessonMode = usePrefCookie(COOKIES.lessonMode, initial.mode) === "full" ? "full" : "guided";
  const sizeRaw = usePrefCookie(COOKIES.lessonSize, initial.size);
  const size: TextSize = sizeRaw === "l" || sizeRaw === "xl" ? sizeRaw : "m";
  const font: LessonFont = usePrefCookie(COOKIES.lessonFont, initial.font) === "easy" ? "easy" : "standard";

  const storageKey = `efba_lesson_parts:${lessonKey}`;
  const raw = useLocalValue(storageKey);
  const saved = useMemo(() => parseSaved(raw), [raw]);
  const indexOf = useCallback((id: string | null) => (id ? steps.findIndex((s) => s.id === id) : -1), [steps]);
  const hashIndex = indexOf(useSyncExternalStore(subscribeHash, readHash, () => ""));

  // Guided: the part picked (or, before any pick, the one in the address). Full: the part in view.
  const [picked, setPicked] = useState<number | null>(null);
  const [spy, setSpy] = useState(0);
  const [navigated, setNavigated] = useState(false);
  const [partsOpen, setPartsOpen] = useState(false);
  const [navTick, setNavTick] = useState(0);
  const navRef = useRef<Nav | null>(null);
  // Whole-lesson mode: until when a jump (not reading) is scrolling the page, and the part last in view.
  const jumpUntil = useRef(0);
  const lastSpy = useRef(0);
  // Whether the address's part link has been honoured (only ever on arrival).
  const landed = useRef(false);

  /** Scrolls to a part. Parts a jump scrolls past haven't been read, so the read-tracking waits it out. */
  const jump = useCallback((el: HTMLElement, smooth: boolean) => {
    jumpUntil.current = performance.now() + 3000;
    const done = () => {
      jumpUntil.current = performance.now() + 50;
      window.removeEventListener("scrollend", done);
    };
    window.addEventListener("scrollend", done);
    // No scrollend if the page was already there: the timeout above still ends the guard.
    el.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "instant" });
    if (!smooth) requestAnimationFrame(() => requestAnimationFrame(done));
  }, []);

  // Read-aloud state goTo needs (the rest of read-aloud is further down).
  const listenRef = useRef<Listening | null>(null);
  const stopRef = useRef<() => void>(() => {});

  const current = mode === "full" ? spy : (picked ?? (hashIndex >= 0 ? hashIndex : 0));

  const done = useMemo(() => {
    const set = new Set(saved.done.filter((id) => indexOf(id) >= 0));
    // Lessons completed before parts existed count as fully read.
    if (lessonDone) for (const s of steps) if (!s.wrapUp) set.add(s.id);
    return set;
  }, [saved, lessonDone, steps, indexOf]);

  const savedAt = indexOf(saved.at);
  const resume = !navigated && hashIndex < 0 && savedAt > 0 ? savedAt : null;

  /** Merges into what's saved for this lesson (read fresh, so quick writes never clash). */
  const save = useCallback(
    (at: string | null, finished: string[] = []) => {
      const prev = parseSaved(readLocal(storageKey));
      const add = finished.filter((id) => !prev.done.includes(id));
      if ((at === null || at === prev.at) && add.length === 0) return;
      writeLocal(storageKey, JSON.stringify({ at: at ?? prev.at, done: [...prev.done, ...add] }));
    },
    [storageKey],
  );

  const goTo = useCallback<GoTo>(
    (index, opts = {}) => {
      const i = Math.max(0, Math.min(steps.length - 1, index));
      const from = steps[current];
      // Going somewhere yourself stops the read-aloud.
      if (!opts.keepListening && listenRef.current && listenRef.current.step !== i) stopRef.current();
      // Moving on from a part counts as having read it.
      save(steps[i].id, mode === "guided" && i > current && !from.wrapUp && opts.countRead !== false ? [from.id] : []);
      landed.current = true;
      setPicked(i);
      setSpy(i);
      setNavigated(true);
      setPartsOpen(false);
      navRef.current = { index: i, focus: opts.focus ?? true, scroll: opts.scroll ?? true, animate: mode === "full" || i !== current };
      setNavTick((t) => t + 1);
      if (mode === "guided") window.history.replaceState(null, "", `#${steps[i].id}`);
    },
    [steps, current, mode, save],
  );

  const setMode = useCallback(
    (next: LessonMode) => {
      if (next === mode) return;
      // Keep the reader on the part they were on.
      setPicked(current);
      setSpy(current);
      writePrefCookie(COOKIES.lessonMode, next);
      window.history.replaceState(null, "", next === "guided" ? `#${steps[current].id}` : window.location.pathname + window.location.search);
      if (current > 0) {
        navRef.current = { index: current, focus: false, scroll: true, animate: false };
        setNavTick((t) => t + 1);
      }
    },
    [mode, current, steps],
  );

  // After a step change: bring it into view, move focus to its heading (screen readers hear
  // "Part 3 of 5: …"), and ease it in.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    navRef.current = null;
    const step = steps[nav.index];
    const section = step && document.getElementById(step.id);
    if (!section) return;
    if (nav.scroll) {
      const smooth = mode === "full" && nav.animate !== false && motionOK();
      jump(section, smooth);
    }
    if (nav.focus) document.getElementById(`${step.id}-title`)?.focus({ preventScroll: true });
    if (mode === "guided" && nav.animate && motionOK()) {
      section.querySelector("[data-step-body]")?.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }
  }, [navTick, steps, mode, jump]);

  // Opened from a link to a part (…/lesson#finding-the-right-contact): show it once it's on screen.
  useEffect(() => {
    if (landed.current || hashIndex < 0) return;
    landed.current = true;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(steps[hashIndex].id);
      if (el) jump(el, false);
    });
    return () => cancelAnimationFrame(frame);
  }, [hashIndex, steps, jump]);

  // A link on the page to another part.
  const goToRef = useRef(goTo);
  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);
  useEffect(() => {
    const onHash = () => {
      const i = indexOf(readHash());
      if (i >= 0) goToRef.current(i);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [indexOf]);

  // Whole-lesson mode: follow the part in view, and count parts scrolled past as read.
  useEffect(() => {
    if (mode !== "full") return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      let index = 0;
      steps.forEach((s, i) => {
        const r = document.getElementById(s.id)?.getBoundingClientRect();
        if (r && r.top <= line) index = i;
      });
      if (atEnd) index = steps.length - 1;
      // Scrolling on from a part counts as reading it; jumping past parts doesn't.
      const from = lastSpy.current;
      const read = index > from && performance.now() > jumpUntil.current && !steps[from]?.wrapUp ? [steps[from].id] : [];
      lastSpy.current = index;
      setSpy(index);
      if (index > 0) setNavigated(true);
      save(index > 0 ? steps[index].id : null, read);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, steps, save]);

  /* ---------------- Read aloud ---------------- */
  const [listening, setListening] = useState<Listening | null>(null);
  const [listenRate, setListenRate] = useState(1);
  const reader = useRef<Reader | null>(null);
  const items = useRef<ReadItem[]>([]);
  const marked = useRef<HTMLElement | null>(null);
  const endRef = useRef<() => void>(() => {});
  const rateRef = useRef(1);
  const bar = useRef<HTMLButtonElement>(null);
  const barRegion = useRef<HTMLDivElement>(null);
  const errorRef = useRef<() => void>(() => {});

  const setListen = useCallback(
    (l: Listening | null) => {
      // If the controls are going away with focus on them, hand it to the part's Listen button.
      const prev = listenRef.current;
      if (!l && prev && barRegion.current?.contains(document.activeElement)) {
        const id = steps[prev.step]?.id;
        requestAnimationFrame(() => (document.getElementById(`${id}-listen`) ?? document.getElementById(`${id}-title`))?.focus());
      }
      listenRef.current = l;
      setListening(l);
    },
    [steps],
  );

  const unmark = useCallback(() => {
    marked.current?.removeAttribute("data-reading");
    marked.current = null;
  }, []);

  const getReader = useCallback(() => {
    reader.current ??= new Reader({
      onItem: (n) => {
        unmark();
        const el = items.current[n]?.el;
        if (!el) return;
        el.setAttribute("data-reading", "");
        marked.current = el;
        const r = el.getBoundingClientRect();
        if (r.top < 90 || r.bottom > window.innerHeight - 110) el.scrollIntoView({ block: "center", behavior: motionOK() ? "smooth" : "auto" });
      },
      onEnd: () => endRef.current(),
      onError: () => errorRef.current(),
    });
    return reader.current;
  }, [unmark]);

  const listenTo = useCallback(
    (index: number) => {
      const s = steps[index];
      const section = s && document.getElementById(s.id);
      if (!section || s.wrapUp) return;
      const parts = steps.filter((x) => !x.wrapUp).length;
      items.current = collectPart(section, `Part ${index + 1} of ${parts}. ${s.kicker ? `${s.kicker}: ` : ""}${s.title}.`);
      getReader().play(items.current, rateRef.current);
      setListen({ step: index, playing: true });
    },
    [steps, getReader, setListen],
  );

  const stopListening = useCallback(() => {
    reader.current?.stop();
    unmark();
    setListen(null);
  }, [unmark, setListen]);

  const dismissListenError = useCallback(() => setListen(null), [setListen]);

  const toggleListening = useCallback(() => {
    const l = listenRef.current;
    if (!l || l.error) return;
    if (l.playing) reader.current?.pause();
    else reader.current?.resume();
    setListen({ ...l, playing: !l.playing });
  }, [setListen]);

  const cycleListenRate = useCallback(() => {
    const next = LISTEN_RATES[(LISTEN_RATES.indexOf(rateRef.current) + 1) % LISTEN_RATES.length];
    rateRef.current = next;
    setListenRate(next);
    reader.current?.setRate(next, !!listenRef.current?.playing);
  }, []);

  // At the end of a part, carry on into the next one (not into a part that is only a tool, or the wrap-up).
  useEffect(() => {
    stopRef.current = stopListening;
    endRef.current = () => {
      unmark();
      const l = listenRef.current;
      const next = l ? l.step + 1 : -1;
      if (!l || next >= steps.length || steps[next].wrapUp || !steps[next].readable) {
        setListen(null);
        return;
      }
      // Focus can't stay in a part that's about to be hidden.
      const leaving = document.getElementById(steps[l.step].id);
      if (mode === "guided" && leaving?.contains(document.activeElement)) bar.current?.focus();
      goToRef.current(next, { focus: false, scroll: mode === "guided", keepListening: true });
      requestAnimationFrame(() => listenTo(next));
    };
  });

  // When the voice fails: say so, rather than skipping on.
  useEffect(() => {
    errorRef.current = () => {
      unmark();
      const l = listenRef.current;
      if (l) setListen({ ...l, playing: false, error: true });
    };
  });
  // Load the voices early, so a part isn't started in one voice and finished in another.
  useEffect(() => primeVoices(), []);
  // Leaving the lesson stops the voice.
  useEffect(() => () => reader.current?.stop(), []);

  const value = useMemo<Player>(
    () => ({
      steps,
      parts: steps.filter((s) => !s.wrapUp).length,
      mode,
      current,
      done,
      resume,
      lessonDone,
      goTo,
      setMode,
      size,
      font,
      partsOpen,
      setPartsOpen,
      listening,
      listenTo,
      toggleListening,
      stopListening,
      dismissListenError,
      listenRate,
      cycleListenRate,
    }),
    [steps, mode, current, done, resume, lessonDone, goTo, setMode, size, font, partsOpen, listening, listenTo, toggleListening, stopListening, dismissListenError, listenRate, cycleListenRate],
  );

  return (
    <PlayerContext.Provider value={value}>
      <div data-lesson-size={size} data-lesson-font={font} className="contents">
        {children}
        <ListenBar pauseRef={bar} regionRef={barRegion} />
      </div>
    </PlayerContext.Provider>
  );
}

/** Ask Jakub, told which part of the lesson the member is on. */
export function LessonAskProvider({ lesson, children }: { lesson: LessonRef; children: ReactNode }) {
  const p = usePlayer();
  const step = p.steps[p.current];
  const part = step && !step.wrapUp ? `part ${p.current + 1}, ${step.title}` : null;
  const ref = useMemo(() => ({ ...lesson, part }), [lesson, part]);
  return <AskJakubProvider lesson={ref}>{children}</AskJakubProvider>;
}

/** Back to top, in "Whole lesson" mode only (guided parts are short), kept clear of the read-aloud bar. */
export function LessonBackToTop() {
  const p = usePlayer();
  if (p.mode !== "full") return null;
  return <BackToTop placement={p.listening ? "bottom-24 right-4 sm:bottom-28 lg:right-6" : "bottom-5 right-4 lg:bottom-6 lg:right-6"} />;
}

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

function stepLabel(p: Player, index: number) {
  return p.steps[index].wrapUp ? "Final step" : `Part ${index + 1} of ${p.parts}`;
}

/** One part of the lesson (or the wrap-up), with its heading and, in guided mode, Back/Continue. */
export function LessonStep({ index, children }: { index: number; children: ReactNode }) {
  const p = usePlayer();
  const { goTo } = p;
  const step = p.steps[index];
  const ref = useRef<HTMLElement>(null);
  const guided = p.mode === "guided";
  const hidden = guided && index !== p.current;

  // Hidden parts stay findable: the browser's find-in-page (and links into them) reveal them.
  useLayoutEffect(() => {
    if (hidden) ref.current?.setAttribute("hidden", "until-found");
  }, [hidden]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => goTo(index, { focus: false, scroll: false, countRead: false });
    el.addEventListener("beforematch", reveal);
    return () => el.removeEventListener("beforematch", reveal);
  }, [goTo, index]);

  const titleId = `${step.id}-title`;
  const label = stepLabel(p, index);
  const prev = index > 0 ? p.steps[index - 1] : null;
  const next = index < p.steps.length - 1 ? p.steps[index + 1] : null;

  return (
    <section
      ref={ref}
      id={step.id}
      data-lesson-step=""
      data-part-label={step.wrapUp ? undefined : `part ${index + 1}, ${step.title}`}
      // A hidden part shouldn't be listed as an (empty) named region.
      aria-labelledby={hidden ? undefined : titleId}
      hidden={hidden}
      className="scroll-mt-24"
    >
      <div data-step-body className={!guided && index > 0 ? "mt-16 border-t border-line pt-14 sm:mt-20 sm:pt-16" : ""}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.875rem] text-ink-muted">
          <span
            aria-hidden
            className={`inline-flex h-7 items-center rounded-full px-3 text-[0.8125rem] font-semibold ${
              step.wrapUp ? "bg-emerald-700 text-white" : "bg-ink text-white"
            }`}
          >
            {label}
          </span>
          {!step.wrapUp && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} /> {step.minutes} min
            </span>
          )}
          {step.interactive > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <ToolIcon /> {step.interactive === 1 ? "1 hands-on tool" : `${step.interactive} hands-on tools`}
            </span>
          )}
          {(step.readable || guided) && (
            <div className="ml-auto flex items-center gap-2">
              {step.readable && <ListenButton index={index} />}
              {guided && <PartsToggle />}
            </div>
          )}
        </div>
        <h2
          id={titleId}
          tabIndex={-1}
          className="lesson-heading mt-4 max-w-[32ch] font-display text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] text-ink outline-none text-balance md:text-[2.25rem]"
        >
          <span className="sr-only">{label}: </span>
          {step.kicker && (
            <span className="mb-1.5 block text-[1rem] font-semibold tracking-[-0.01em] text-orange-800 md:text-[1.0625rem]">
              {step.kicker}
              <span className="sr-only">: </span>
            </span>
          )}
          {step.title}
        </h2>
        {guided && p.partsOpen && index === p.current && <PartsMenu />}

        <div className="mt-7">{children}</div>

        {guided && (
          <div className="lesson-print-hide mt-14 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <button type="button" onClick={() => goTo(index - 1)} className="btn btn-secondary h-12 self-start pl-4 sm:self-auto">
                <ChevronLeft size={18} /> Back<span className="sr-only"> to {stepLabel(p, index - 1)}: {prev.title}</span>
              </button>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                className="group flex min-h-[4.25rem] w-full items-center gap-4 rounded-2xl bg-[#c2410c] py-3 pl-5 pr-3 text-left text-white shadow-[0_4px_0_0_#7c2d12] transition-[transform,box-shadow,background-color] duration-150 hover:bg-[#b23c0b] active:translate-y-[3px] active:shadow-[0_1px_0_0_#7c2d12] sm:w-auto sm:min-w-[300px] sm:max-w-[440px]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8125rem] font-medium text-white">
                    {next.wrapUp ? "Continue to the last step" : `Continue to part ${index + 2} of ${p.parts}`}
                  </span>
                  <span className="mt-0.5 block font-display text-[1.0625rem] font-semibold leading-snug">
                    {next.wrapUp ? next.blurb ?? "Wrap up" : next.title}
                  </span>
                </span>
                <span aria-hidden className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <ArrowRight size={18} className="nudge" />
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const noSubscribe = () => () => {};

/** "Listen" on a part: reads it aloud, then carries on into the next part. */
function ListenButton({ index }: { index: number }) {
  const p = usePlayer();
  const supported = useSyncExternalStore(noSubscribe, speechSupported, () => false);
  if (!supported) return null;
  const mine = p.listening?.step === index && !p.listening?.error;
  const playing = mine && p.listening?.playing;
  return (
    <button
      id={`${p.steps[index].id}-listen`}
      type="button"
      onClick={() => (mine && !p.listening?.error ? p.toggleListening() : p.listenTo(index))}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-[0.875rem] font-medium transition-colors ${
        mine ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink hover:border-ink/25"
      }`}
    >
      {playing ? <PauseIcon /> : <HeadphonesIcon />}
      {playing ? "Pause" : mine ? "Resume" : "Listen"}
      <span className="sr-only">{mine ? " reading aloud" : " to this part read aloud"}</span>
    </button>
  );
}

/** The read-aloud controls, pinned to the bottom of the screen while a part is being read. */
function ListenBar({ pauseRef, regionRef }: { pauseRef: RefObject<HTMLButtonElement | null>; regionRef: RefObject<HTMLDivElement | null> }) {
  const p = usePlayer();
  const l = p.listening;
  if (!l) return null;
  const step = p.steps[l.step];
  if (l.error)
    return (
      <div
        ref={regionRef}
        role="alert"
        className="dialog-in fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[560px] items-center gap-3 rounded-2xl bg-ink p-2 pl-4 text-white shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:bottom-5"
      >
        <p className="min-w-0 flex-1 py-1.5 text-[0.9375rem] leading-snug">
          Read aloud isn&rsquo;t working on this device right now. Your browser&rsquo;s voice didn&rsquo;t start.
        </p>
        <button
          type="button"
          onClick={p.dismissListenError}
          aria-label="Close this message"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    );
  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Read aloud"
      className="dialog-in fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[560px] items-center gap-2 rounded-2xl bg-ink p-2 pl-4 text-white shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:bottom-5"
    >
      <span aria-hidden className={`listen-bars ${l.playing ? "" : "is-paused"}`}>
        <span />
        <span />
        <span />
        <span />
      </span>
      <div className="min-w-0 flex-1 pl-1">
        <p className="whitespace-nowrap text-[0.8125rem] font-medium text-white/75">
          {l.playing ? "" : "Paused · "}Part {l.step + 1} of {p.parts}
        </p>
        <p className="truncate text-[0.9375rem] font-semibold">{step.title}</p>
      </div>
      <button
        ref={pauseRef}
        type="button"
        onClick={p.toggleListening}
        aria-label={l.playing ? "Pause reading" : "Resume reading"}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform active:scale-95"
      >
        {l.playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        onClick={p.cycleListenRate}
        aria-label={`Reading speed ${p.listenRate}×. Change speed`}
        className="inline-flex h-11 min-w-12 shrink-0 items-center justify-center rounded-full bg-white/10 px-3 text-[0.875rem] font-semibold tabular-nums transition-colors hover:bg-white/20"
      >
        {p.listenRate}×
      </button>
      <button
        type="button"
        onClick={p.stopListening}
        aria-label="Stop reading aloud"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="4" height="7" rx="1.5" />
      <rect x="17" y="14" width="4" height="7" rx="1.5" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Lists of parts                                                      */
/* ------------------------------------------------------------------ */

function StepBadge({ step, index, on, isDone, dark }: { step: LessonStepMeta; index: number; on: boolean; isDone: boolean; dark?: boolean }) {
  const base = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold tabular-nums";
  if (isDone) return <span aria-hidden className={`${base} bg-emerald-600 text-white`}><Check size={14} strokeWidth={2.4} /></span>;
  if (step.wrapUp)
    return (
      <span aria-hidden className={`${base} ${on ? "bg-emerald-700 text-white" : dark ? "bg-white/10 text-white" : "bg-surface-deep text-ink"}`}>
        <FlagIcon />
      </span>
    );
  return (
    <span
      aria-hidden
      className={`${base} ${on ? (dark ? "bg-white text-ink" : "bg-ink text-white") : dark ? "bg-white/10 text-white" : "bg-surface-deep text-ink"}`}
    >
      {index + 1}
    </span>
  );
}

function FlagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

/** The parts as a list of buttons: the sidebar, the phone menu and the wrap-up recap share it. */
function PartsList({ className = "" }: { className?: string }) {
  const p = usePlayer();
  return (
    <ol className={`space-y-0.5 ${className}`}>
      {p.steps.map((s, i) => {
        const on = i === p.current;
        const isDone = p.done.has(s.id);
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => p.goTo(i)}
              aria-current={on ? "step" : undefined}
              className={`flex w-full items-start gap-3 rounded-xl px-2.5 py-2 text-left text-[0.875rem] leading-snug transition-colors ${
                on ? "bg-surface font-medium text-ink shadow-[var(--shadow-soft)] ring-1 ring-line" : "text-ink-muted hover:bg-surface/70 hover:text-ink"
              }`}
            >
              <StepBadge step={s} index={i} on={on} isDone={isDone} />
              <span className="min-w-0 flex-1 pt-[0.2rem]">
                {s.title}
                {isDone && <span className="sr-only"> (done)</span>}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/** Sidebar on large screens: where you are in the lesson. */
export function LessonNav() {
  const p = usePlayer();
  const read = p.steps.filter((s) => !s.wrapUp && p.done.has(s.id)).length;
  return (
    <nav aria-label="Parts of this lesson">
      <div className="flex items-baseline justify-between gap-3 px-2.5">
        <p className="text-[0.875rem] font-semibold text-ink">In this lesson</p>
        <p className="text-[0.8125rem] tabular-nums text-ink-muted">
          {read}/{p.parts}
          <span className="sr-only"> parts done</span>
        </p>
      </div>
      <div aria-hidden className="mx-2.5 mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-deep">
        <div
          className="h-full rounded-full bg-emerald-600 transition-[width] duration-700 ease-[var(--ease-out-expo)]"
          style={{ width: `${p.parts ? (read / p.parts) * 100 : 0}%` }}
        />
      </div>
      <PartsList className="mt-3" />
    </nav>
  );
}

/** Phones and tablets: the same list, opened from the part's header. */
function PartsToggle() {
  const p = usePlayer();
  return (
    <button
      type="button"
      onClick={() => p.setPartsOpen(!p.partsOpen)}
      aria-expanded={p.partsOpen}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-[0.875rem] font-medium text-ink transition-colors hover:border-ink/25 lg:hidden"
    >
      All parts
      <ChevronDown size={16} className={`transition-transform duration-200 ${p.partsOpen ? "rotate-180" : ""}`} />
    </button>
  );
}

function PartsMenu() {
  return (
    <div className="animate-in mt-5 rounded-2xl border border-line bg-surface-alt p-2 lg:hidden">
      <PartsList />
    </div>
  );
}

function resumeLabel(p: Player, index: number) {
  return p.steps[index].wrapUp ? "Continue to the wrap-up" : `Continue with part ${index + 1}`;
}

/** The hero's overview of a lesson without a video: every part, and where to start. */
export function LessonOverview() {
  const p = usePlayer();
  const start = p.resume ?? 0;
  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => p.goTo(start)} className="btn btn-primary btn-aa group h-12">
          {p.resume !== null ? resumeLabel(p, p.resume) : p.lessonDone ? "Go through it again" : "Start the lesson"}
          <ArrowRight size={17} className="nudge" />
        </button>
        {p.resume !== null && (
          <button type="button" onClick={() => p.goTo(0)} className="btn btn-on-dark h-12">
            Start from the beginning
          </button>
        )}
      </div>
      <h2 className="mt-9 text-[0.9375rem] font-semibold text-white/85">What&rsquo;s in this lesson</h2>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2">
        {p.steps.map((s, i) => {
          const isDone = p.done.has(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => p.goTo(i)}
                className="flex min-h-14 w-full items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left ring-1 ring-white/10 transition-colors hover:bg-white/[0.11] hover:ring-white/25"
              >
                <StepBadge step={s} index={i} on={false} isDone={isDone} dark />
                <span className="min-w-0 flex-1">
                  {s.kicker && <span className="block text-[0.8125rem] font-medium text-[#ffb27a]">{s.kicker}</span>}
                  <span className="block text-[0.9375rem] font-medium leading-snug text-white">{s.wrapUp ? s.blurb ?? s.title : s.title}</span>
                  {isDone && <span className="sr-only"> (done)</span>}
                </span>
                {!s.wrapUp && <span className="shrink-0 text-[0.8125rem] tabular-nums text-white/70">{s.minutes} min</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Under a lesson video: a way into the written version. */
export function ReadInstead({ minutes }: { minutes: number }) {
  const p = usePlayer();
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
      <p className="min-w-0 flex-1 text-[0.9375rem] leading-relaxed text-white/85">
        <span className="font-semibold text-white">Prefer reading?</span> The written lesson is below in {p.parts} short {p.parts === 1 ? "part" : "parts"}, about{" "}
        {minutes} min.
      </p>
      <button type="button" onClick={() => p.goTo(p.resume ?? 0)} className="btn btn-on-dark group h-11">
        {p.resume !== null ? resumeLabel(p, p.resume) : "Start reading"}
        <ArrowRight size={16} className="nudge" />
      </button>
    </div>
  );
}

/** Wrap-up: every part, ticked off, with a way back into each. */
export function PartsRecap() {
  const p = usePlayer();
  const parts = p.steps.filter((s) => !s.wrapUp);
  const read = parts.filter((s) => p.done.has(s.id)).length;
  const all = read === parts.length;
  return (
    <div className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <p className="text-[2rem] leading-none" aria-hidden>
        {all ? "🏁" : "🧭"}
      </p>
      <h3 className="mt-3 font-display text-[1.25rem] font-semibold tracking-[-0.015em] text-ink">
        {all ? `You've been through all ${parts.length} ${parts.length === 1 ? "part" : "parts"}` : `${read} of ${parts.length} parts done`}
      </h3>
      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
        {all ? "Lock it in with the key terms and the quick check below, then complete the lesson." : "Skipped one? You can go back to any part."}
      </p>
      <ol className="mt-5 grid gap-2 sm:grid-cols-2">
        {parts.map((s, i) => {
          const isDone = p.done.has(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => p.goTo(i)}
                className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-line bg-surface-alt/60 px-3 py-2.5 text-left text-[0.9375rem] leading-snug text-ink transition-colors hover:border-ink/25 hover:bg-surface"
              >
                <StepBadge step={s} index={i} on={false} isDone={isDone} />
                <span className="min-w-0 flex-1">
                  {s.title}
                  <span className="sr-only">{isDone ? " (done)" : " (not read yet)"}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress and reading options                                        */
/* ------------------------------------------------------------------ */

/** A segment per step along the bottom of the lesson header, filling as you go. */
export function LessonProgressBar() {
  const p = usePlayer();
  const { steps, mode, current } = p;
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      steps.forEach((s, i) => {
        const bar = bars.current[i];
        if (!bar) return;
        let fill = 0;
        if (mode === "guided" && i !== current) fill = i < current ? 1 : 0;
        else {
          const r = document.getElementById(s.id)?.getBoundingClientRect();
          if (r && r.height > 0) fill = atEnd && r.top < vh ? 1 : Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
        }
        bar.style.transform = `scaleX(${fill})`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps, mode, current]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px flex h-[3px] gap-[3px]">
      {steps.map((s, i) => (
        <span key={s.id} className="relative h-full flex-1 overflow-hidden bg-line">
          <span
            ref={(el) => {
              bars.current[i] = el;
            }}
            className="absolute inset-0 origin-left bg-accent transition-transform duration-300 ease-out"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      ))}
    </div>
  );
}

type Option<T extends string> = [T, string];

function Choice<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: Option<T>[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="mt-5 first:mt-0">
      <legend className="text-[0.875rem] font-semibold text-ink">{legend}</legend>
      <div className="mt-2 grid gap-1 rounded-xl bg-surface-alt p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map(([v, label]) => (
          <label key={v} className="relative">
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="peer sr-only" />
            <span className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-2 text-center text-[0.875rem] font-medium leading-tight text-ink-muted transition-colors hover:text-ink peer-checked:bg-surface peer-checked:text-ink peer-checked:shadow-[var(--shadow-soft)] peer-focus-visible:ring-2 peer-focus-visible:ring-orange-700">
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** "Aa" in the lesson header: one part at a time or the whole lesson, text size, font. */
export function ReadingOptions() {
  const p = usePlayer();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      setOpen(false);
      button.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="sm:relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-[0.85rem] font-medium text-ink transition-colors hover:border-ink/25"
      >
        <span aria-hidden className="font-display text-[0.95rem] font-semibold tracking-[-0.02em]">
          Aa
        </span>
        <span className="sr-only md:not-sr-only">Reading options</span>
      </button>
      {open && (
        <div
          ref={panel}
          id={id}
          role="group"
          aria-label="Reading options"
          className="dialog-in fixed inset-x-4 top-16 z-50 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-lift)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[22rem]"
        >
          <Choice
            legend="Layout"
            name="lesson-layout"
            value={p.mode}
            onChange={p.setMode}
            options={[
              ["guided", "One part at a time"],
              ["full", "Whole lesson"],
            ]}
          />
          <Choice
            legend="Text size"
            name="lesson-size"
            value={p.size}
            onChange={(v) => writePrefCookie(COOKIES.lessonSize, v)}
            options={[
              ["m", "Standard"],
              ["l", "Large"],
              ["xl", "Larger"],
            ]}
          />
          <Choice
            legend="Font"
            name="lesson-font"
            value={p.font}
            onChange={(v) => writePrefCookie(COOKIES.lessonFont, v)}
            options={[
              ["standard", "Standard"],
              ["easy", "Easy-read"],
            ]}
          />
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-muted">Saved on this device.</p>
        </div>
      )}
    </div>
  );
}
