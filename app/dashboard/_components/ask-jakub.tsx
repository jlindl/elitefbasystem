"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { whatsappLink } from "../_lib/contact";
import { lockScroll } from "../_lib/scroll-lock";
import { charLength, clampChars } from "../_lib/win-kinds";

/*
 * "Ask Jakub about this lesson": three ways in (header button, highlight-to-ask,
 * end-of-lesson card), one composer. The composer writes the WhatsApp message for
 * the student - who they are, which lesson, the passage they highlighted - shows
 * exactly what will be sent, then opens WhatsApp with it typed out.
 */

/** firstName is null when the member hasn't saved a name (never greet with an email username). */
export type LessonRef = {
  firstName: string | null;
  moduleNumber: number;
  lessonNumber: number | null;
  lessonTitle: string;
  /** The part of the lesson they're on ("part 4, Finding the Right Contact"), when known. */
  part?: string | null;
};

const TOPICS = [
  { id: "unclear", label: "Something isn't clear", line: "There's a part I don't quite understand." },
  { id: "apply", label: "How does this apply to my product?", line: "How would this apply to the product I'm looking at?" },
  { id: "numbers", label: "Can you check my numbers?", line: "Could you check my numbers for me?" },
  { id: "stuck", label: "I'm stuck on a step", line: "I'm stuck on one of the steps." },
] as const;
type TopicId = (typeof TOPICS)[number]["id"];

const MAX_QUOTE = 280;
const MAX_TEXT = 800;
const AVATAR = "/jakub portrait 2.jpeg";

function tidyQuote(raw: string) {
  const q = raw.replace(/\s+/g, " ").trim();
  return charLength(q) > MAX_QUOTE ? `${clampChars(q, MAX_QUOTE - 1).trimEnd()}…` : q;
}

export function buildMessage(lesson: LessonRef, topic: TopicId | null, quote: string, text: string) {
  const where = lesson.lessonNumber ? `Module ${lesson.moduleNumber}, Lesson ${lesson.lessonNumber}: ${lesson.lessonTitle}` : `Module ${lesson.moduleNumber}: ${lesson.lessonTitle}`;
  const lines = [lesson.firstName ? `Hi Jakub, it's ${lesson.firstName} 👋` : "Hi Jakub 👋", `I'm on ${where}${lesson.part ? ` (${lesson.part})` : ""}.`];
  if (quote) lines.push("", `About this part: "${quote}"`);
  const body = [TOPICS.find((t) => t.id === topic)?.line, text.trim()].filter(Boolean).join(" ");
  if (body) lines.push("", body);
  return lines.join("\n");
}

/** `part`: where a highlighted passage came from, which beats the part in view. */
type OpenOptions = { quote?: string; topic?: TopicId; part?: string | null };
const AskContext = createContext<{ open: (o?: OpenOptions) => void } | null>(null);

function useAsk() {
  const ctx = useContext(AskContext);
  if (!ctx) throw new Error("Ask Jakub components must be inside <AskJakubProvider>");
  return ctx;
}

function ChatIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
      <path d="M9 10.5h6M9 13.5h4" />
    </svg>
  );
}

function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.46 9.48-9.46a9.4 9.4 0 0 1 6.7 2.78 9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.01c0 2 .52 3.96 1.52 5.69L.55 23.4l5.83-1.53a11.4 11.4 0 0 0 5.65 1.44h.01c6.28 0 11.39-5.1 11.39-11.38 0-3.04-1.18-5.9-3.33-8.05z" />
    </svg>
  );
}

function Avatar({ size = 48 }: { size?: number }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <Image src={AVATAR} alt="" width={size * 2} height={size * 2} className="h-full w-full rounded-full object-cover ring-2 ring-white" sizes={`${size}px`} />
      <span aria-hidden className="absolute -bottom-0.5 -right-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#25d366] text-white ring-2 ring-white">
        <WhatsAppGlyph size={11} />
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */

export function AskJakubProvider({ lesson, children }: { lesson: LessonRef; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [text, setText] = useState("");
  const [part, setPart] = useState<string | null | undefined>(undefined);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((o: OpenOptions = {}) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuote(o.quote ? tidyQuote(o.quote) : "");
    setTopic(o.topic ?? null);
    setPart(o.part);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Hand focus back to whatever opened the composer.
    requestAnimationFrame(() => returnFocus.current?.focus?.());
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <AskContext.Provider value={value}>
      {children}
      <AskDialog
        lesson={part === undefined ? lesson : { ...lesson, part }}
        isOpen={isOpen}
        onClose={close}
        quote={quote}
        onRemoveQuote={() => setQuote("")}
        topic={topic}
        onTopic={setTopic}
        text={text}
        onText={setText}
        onSent={() => {
          setText("");
          setTopic(null);
          setQuote("");
        }}
      />
    </AskContext.Provider>
  );
}

function AskDialog({
  lesson,
  isOpen,
  onClose,
  quote,
  onRemoveQuote,
  topic,
  onTopic,
  text,
  onText,
  onSent,
}: {
  lesson: LessonRef;
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  onRemoveQuote: () => void;
  topic: TopicId | null;
  onTopic: (t: TopicId | null) => void;
  text: string;
  onText: (t: string) => void;
  onSent: () => void;
}) {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  const downOnBackdrop = useRef(false);
  const message = buildMessage(lesson, topic, quote, text);
  const ready = !!(topic || text.trim() || quote);

  useEffect(() => {
    const d = ref.current;
    if (!d || !isOpen) return;
    if (!d.open) d.showModal();
    const release = lockScroll();
    // Typing is the main job here, so start in the box.
    requestAnimationFrame(() => textarea.current?.focus());
    return () => {
      release();
      if (d.open) d.close();
    };
  }, [isOpen]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt("Copy your message:", message);
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
      data-lenis-prevent
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // Clicking the dimmed backdrop closes the composer - but not a drag that started inside it.
      onPointerDown={(e) => {
        downOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (downOnBackdrop.current && e.target === e.currentTarget) onClose();
        downOnBackdrop.current = false;
      }}
      className="ask-dialog m-0 mt-auto max-h-[92dvh] w-full max-w-full overflow-y-auto rounded-t-[1.75rem] bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/55 backdrop:backdrop-blur-[2px] sm:m-auto sm:max-h-[88vh] sm:w-[min(580px,calc(100%-2rem))] sm:rounded-[1.75rem]"
    >
      {isOpen && (
        <div className="p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <Avatar size={52} />
            <div className="min-w-0 flex-1">
              <h2 id={`${id}-title`} className="font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                Ask Jakub
              </h2>
              <p id={`${id}-desc`} className="mt-0.5 text-[0.9375rem] leading-snug text-ink-muted">
                About Module {lesson.moduleNumber}
                {lesson.lessonNumber ? `, Lesson ${lesson.lessonNumber}` : ""}: {lesson.lessonTitle}
                {lesson.part && <span className="block">{lesson.part.charAt(0).toUpperCase() + lesson.part.slice(1)}</span>}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[1.25rem] text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
            >
              ✕
            </button>
          </div>

          {quote && (
            <figure className="mt-5 rounded-2xl border-l-[3px] border-accent bg-surface-alt px-4 py-3">
              <figcaption className="flex items-center justify-between gap-3 text-[0.875rem] font-medium text-ink-muted">
                The part you highlighted
                <button
                  type="button"
                  onClick={() => {
                    onRemoveQuote();
                    // The button disappears with the quote, so carry on in the question box.
                    textarea.current?.focus();
                  }}
                  className="rounded-full px-2 py-1 text-[0.875rem] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:bg-surface"
                >
                  Remove<span className="sr-only"> the highlighted passage</span>
                </button>
              </figcaption>
              <blockquote className="mt-1.5 text-[0.9375rem] italic leading-relaxed text-ink">&ldquo;{quote}&rdquo;</blockquote>
            </figure>
          )}

          <fieldset className="mt-5">
            <legend className="text-[0.9375rem] font-semibold text-ink">What do you need help with?</legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {TOPICS.map((t) => {
                const on = topic === t.id;
                return (
                  <label
                    key={t.id}
                    className={`relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-700 has-[:focus-visible]:ring-offset-2 ${
                      on ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${id}-topic`}
                      value={t.id}
                      checked={on}
                      onChange={() => onTopic(t.id)}
                      onClick={() => on && onTopic(null)}
                      className="sr-only"
                    />
                    <span aria-hidden>{on ? "✓" : "+"}</span>
                    {t.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5">
            <label htmlFor={`${id}-text`} className="text-[0.9375rem] font-semibold text-ink">
              Your question <span className="font-normal text-ink-muted">(optional)</span>
            </label>
            <textarea
              ref={textarea}
              id={`${id}-text`}
              value={text}
              onChange={(e) => onText(e.target.value)}
              // The native limit stops typing at the caret instead of trimming the end.
              maxLength={MAX_TEXT}
              rows={3}
              placeholder="e.g. My supplier's case pack is 12 - does that still work for a 3-pack bundle?"
              aria-describedby={`${id}-count`}
              className="mt-2 w-full resize-y rounded-2xl border border-line bg-surface px-4 py-3 text-[1rem] leading-relaxed text-ink outline-none placeholder:text-ink-subtle focus-visible:border-ink/40 focus-visible:ring-2 focus-visible:ring-orange-700"
            />
            <p id={`${id}-count`} className="mt-1 text-right text-[0.8125rem] tabular-nums text-ink-muted">
              {text.length}/{MAX_TEXT}
            </p>
          </div>

          <div className="mt-2">
            <p className="text-[0.9375rem] font-semibold text-ink">Your message</p>
            <div className="mt-2 rounded-2xl bg-[#efeae2] p-3 sm:p-4">
              <p className="ml-auto max-w-[92%] whitespace-pre-line rounded-2xl rounded-tr-md bg-[#d9fdd3] px-3.5 py-2.5 text-[0.9375rem] leading-relaxed text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] [overflow-wrap:anywhere]">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink/30"
            >
              {copied ? "✓ Copied" : "Copy message"}
            </button>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!ready}
              onClick={(e) => {
                if (!ready) {
                  e.preventDefault();
                  textarea.current?.focus();
                  return;
                }
                onSent();
                onClose();
              }}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold text-white transition-[background-color,transform] duration-200 ${
                ready ? "bg-[#0f7a3d] hover:-translate-y-0.5 hover:bg-[#0b6532]" : "cursor-not-allowed bg-[#0f7a3d]/45"
              }`}
            >
              <WhatsAppGlyph size={18} /> Open WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted sm:text-right">
            {ready ? "WhatsApp opens with this typed out. Nothing is sent until you press send." : "Pick a topic or type a question to continue."}
          </p>
          <span className="sr-only" aria-live="polite">
            {copied ? "Message copied" : ""}
          </span>
        </div>
      )}
    </dialog>
  );
}

/* ------------------------------------------------------------------ */

/** Compact trigger for the sticky lesson header. */
export function AskJakubButton() {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={() => open()}
      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-[0.875rem] font-semibold text-ink transition-colors hover:border-ink/30"
    >
      <ChatIcon size={16} />
      <span className="hidden sm:inline">Ask Jakub</span>
      <span className="sr-only sm:hidden">Ask Jakub about this lesson</span>
    </button>
  );
}

/** End-of-lesson invitation with one-tap topics. */
export function AskJakubCard({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const { open } = useAsk();
  const id = useId();
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <section aria-labelledby={`${id}-h`} className="relative mt-6 overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-8">
      <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -right-16 -top-20 h-60 w-60 rounded-full" style={{ background: "radial-gradient(circle, rgba(37,211,102,0.22), transparent 65%)" }} />
      <div className="relative">
        <div className="flex items-center gap-4">
          <Avatar size={56} />
          <div className="min-w-0">
            <Heading id={`${id}-h`} className="font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.02em]">
              Stuck on anything? Ask Jakub.
            </Heading>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/80">
              Your question goes straight to his WhatsApp, with this lesson already mentioned.
            </p>
          </div>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Quick questions">
          {TOPICS.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => open({ topic: t.id })}
                className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-[0.9375rem] font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={() => open()} className="btn h-12 bg-white text-ink hover:bg-white/90">
            <ChatIcon size={18} /> Write a question
          </button>
          <p className="text-[0.9375rem] text-white/75">
            <span aria-hidden>💡 </span>Tip: highlight any sentence above to ask about it.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Wraps lesson text: selecting a passage shows a floating "Ask Jakub" button. */
export function SelectionAsk({ children }: { children: ReactNode }) {
  const { open } = useAsk();
  const root = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; below: boolean } | null>(null);
  const selected = useRef({ text: "", part: null as string | null });

  useEffect(() => {
    let frame = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const update = () => {
      frame = 0;
      const sel = window.getSelection();
      const el = root.current;
      if (!sel || sel.isCollapsed || sel.rangeCount === 0 || !el) return setPos(null);
      const range = sel.getRangeAt(0);
      if (!el.contains(range.commonAncestorContainer)) return setPos(null);
      // Ignore selections inside interactive widgets and form fields.
      const host = range.commonAncestorContainer instanceof Element ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
      if (host?.closest("button, input, textarea, select, [role=slider], [contenteditable=true]")) return setPos(null);
      const text = sel.toString().replace(/\s+/g, " ").trim();
      if (text.length < 3) return setPos(null);
      const r = range.getBoundingClientRect();
      if (!r.width && !r.height) return setPos(null);
      selected.current = { text, part: host?.closest("[data-part-label]")?.getAttribute("data-part-label") ?? null };
      // Phones show their own copy/paste menu above a selection, so sit below it there.
      // Keep the ~220px button fully on screen, flipping above the selection near the bottom edge.
      const half = 120;
      let below = coarse || r.top < 80;
      if (below && r.bottom + 10 + 44 > window.innerHeight - 8 && r.top > 70) below = false;
      const y = below ? Math.min(r.bottom + 10, window.innerHeight - 52) : Math.max(r.top - 10, 52);
      setPos({ x: Math.min(Math.max(r.left + r.width / 2, half), window.innerWidth - half), y, below });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const hide = () => setPos(null);
    document.addEventListener("selectionchange", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("selectionchange", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root}>
      {children}
      {pos && (
        <button
          type="button"
          // Keep the selection alive while the button is pressed.
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => {
            const { text: q, part } = selected.current;
            window.getSelection()?.removeAllRanges();
            setPos(null);
            open({ quote: q, part });
          }}
          style={{ left: pos.x, top: pos.y }}
          className={`pop-in fixed z-50 inline-flex h-11 -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 text-[0.9375rem] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(10,10,10,0.6)] ${
            pos.below ? "" : "-translate-y-full"
          }`}
        >
          <ChatIcon size={17} /> Ask Jakub about this
        </button>
      )}
    </div>
  );
}
