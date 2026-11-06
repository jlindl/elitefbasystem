"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type TermEntry = { term: string; acronymFor: string; definition: string; category: string };

/*
 * A dictionary term inside lesson text. Hover (mouse), tap, or Enter/Space opens a
 * definition card; Esc or clicking elsewhere closes it. Built as a disclosure: the
 * card sits right after the button in the DOM, so keyboard users can Tab into its link.
 */

let closeActive: (() => void) | null = null;
let liveRegion: HTMLElement | null = null;

/** One shared, visually hidden live region so screen readers hear the definition once. */
function announce(text: string) {
  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.className = "sr-only";
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = "";
  window.setTimeout(() => liveRegion && (liveRegion.textContent = text), 60);
}

export function Term({ entry, children, variant = "inline" }: { entry: TermEntry; children: ReactNode; variant?: "inline" | "chip" }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLSpanElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  const close = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setOpen(false);
    setPinned(false);
  }, []);

  const show = useCallback(
    (pin: boolean) => {
      if (closeActive && closeActive !== close) closeActive();
      closeActive = close;
      setOpen(true);
      if (pin) setPinned(true);
    },
    [close],
  );

  // Keep the card on screen: flip above when there's no room below, nudge sideways at the edges.
  useLayoutEffect(() => {
    if (!open || !pop.current || !btn.current) return;
    const b = btn.current.getBoundingClientRect();
    const p = pop.current.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const above = b.bottom + p.height + 16 > window.innerHeight && b.top > p.height + 16;
    // Stay inside the viewport and inside <main>, which clips horizontal overflow.
    const clip = btn.current.closest("main")?.getBoundingClientRect();
    const minL = Math.max(12, (clip?.left ?? 0) + 8);
    const maxR = Math.min(vw - 12, (clip?.right ?? vw) - 8);
    const center = b.left + b.width / 2;
    const left = center - p.width / 2;
    const shift = left < minL ? minL - left : left + p.width > maxR ? maxR - (left + p.width) : 0;
    // Written straight to the element: measuring needs the card rendered, so state would cost a second paint.
    pop.current.style.setProperty("--shift", `${shift}px`);
    pop.current.toggleAttribute("data-above", above);
  }, [open]);

  // Click outside or Esc closes it.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        btn.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const hoverable = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <span
      ref={wrap}
      className="relative inline"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || !hoverable()) return;
        window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => show(false), 140);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse" || pinned) return;
        window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => setOpen(false), 180);
      }}
      onBlur={(e) => {
        // Tabbing out of the term and its card closes it.
        if (open && wrap.current && !wrap.current.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-card`}
        onClick={() => {
          if (open && pinned) return close();
          show(true);
          announce(`${entry.term}${entry.acronymFor ? `, ${entry.acronymFor}` : ""}: ${entry.definition}`);
        }}
        className={
          variant === "chip"
            ? `inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                open ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink hover:border-ink/30"
              }`
            : "term-link cursor-help rounded-[3px] text-left text-inherit"
        }
      >
        {children}
      </button>
      <span
        ref={pop}
        id={`${id}-card`}
        // Focusable (not tabbable) so a click inside keeps focus in the term and the card open.
        tabIndex={-1}
        hidden={!open}
        className="term-card absolute left-1/2 z-50 block w-[min(340px,calc(100vw-24px))] rounded-2xl border border-line bg-surface p-4 text-left shadow-[0_24px_50px_-20px_rgba(10,10,10,0.35),0_2px_6px_rgba(10,10,10,0.06)]"
      >
        <span className="block text-[0.8125rem] font-semibold text-orange-800">
          <span aria-hidden>📖 </span>Dictionary · {entry.category}
        </span>
        <span className="mt-1 block font-display text-[1.0625rem] font-semibold leading-snug text-ink">
          {entry.term}
          {entry.acronymFor && <span className="font-normal text-ink-muted"> · {entry.acronymFor}</span>}
        </span>
        <span className="mt-1.5 block text-[0.9375rem] font-normal not-italic leading-relaxed text-ink-muted">{entry.definition}</span>
        <Link
          href={`/dashboard/tools/dictionary?q=${encodeURIComponent(entry.term)}`}
          className="mt-3 inline-flex min-h-11 items-center gap-1 text-[0.9375rem] font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          Open in the dictionary<span aria-hidden> →</span>
        </Link>
      </span>
    </span>
  );
}
