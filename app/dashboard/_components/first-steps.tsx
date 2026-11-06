"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePrefCookie, writePrefCookie } from "../_lib/use-pref-cookie";
import { COOKIES } from "../_lib/welcome";
import { ProgressRing } from "./ui/progress-ring";

export type FirstStep = {
  id: string;
  label: string;
  detail: string;
  href: string;
  done: boolean;
  /** Opens outside the site (WhatsApp). */
  external?: boolean;
};

/** "Your first steps" checklist. Ticks itself off from real progress. */
export function FirstSteps({ steps: initial }: { steps: FirstStep[] }) {
  const id = useId();
  // Both follow the cookie live, so Back/Forward can't bring back a stale card.
  const saidHi = usePrefCookie(COOKIES.saidHi, initial.some((s) => s.id === "hello" && s.done) ? "1" : null) === "1";
  const hidden = usePrefCookie(COOKIES.stepsHidden) === "1";
  // Only offer "Show them again" straight after hiding, not on later visits.
  const [justHid, setJustHid] = useState(false);
  const hideButton = useRef<HTMLButtonElement>(null);
  const showButton = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  // The focused button disappears when the card hides or comes back, so focus its replacement.
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (hidden ? showButton : hideButton).current?.focus();
  }, [hidden]);

  const steps = initial.map((s) => (s.id === "hello" && saidHi ? { ...s, done: true } : s));
  const done = steps.filter((s) => s.done).length;
  const all = done === steps.length;

  if (hidden) {
    if (!justHid) return null;
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-dashed border-line bg-surface px-5 py-3">
        <p id={`${id}-hid`} className="text-[0.9375rem] text-ink-muted">
          Your first steps are hidden.
        </p>
        <button
          ref={showButton}
          type="button"
          aria-describedby={`${id}-hid`}
          onClick={() => {
            moveFocus.current = true;
            writePrefCookie(COOKIES.stepsHidden, "0");
          }}
          className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:bg-surface-alt"
        >
          Show them again
        </button>
      </div>
    );
  }

  return (
    <section aria-labelledby={`${id}-h`} className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-4">
        <ProgressRing value={(done / steps.length) * 100} size={60} stroke={6} color={all ? "#10b981" : "var(--color-accent)"} label={`${done} of ${steps.length} first steps done`}>
          <span className="font-display text-[0.95rem] font-semibold tabular-nums text-ink">
            {done}/{steps.length}
          </span>
        </ProgressRing>
        <div className="min-w-0 flex-1">
          <h2 id={`${id}-h`} className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
            {all ? "You're all set up 🎉" : "Your first steps"}
          </h2>
          <p className="mt-0.5 text-[0.9375rem] text-ink-muted">
            {all ? "Every first step done. Keep the streak going." : "Each one ticks itself off as you go."}
          </p>
        </div>
        <button
          ref={hideButton}
          type="button"
          onClick={() => {
            moveFocus.current = true;
            setJustHid(true);
            writePrefCookie(COOKIES.stepsHidden, "1");
          }}
          className="rounded-full px-3 py-2 text-[0.875rem] font-medium text-ink-muted underline decoration-ink/20 underline-offset-4 hover:bg-surface-alt hover:text-ink"
        >
          Hide<span className="sr-only"> the first steps checklist</span>
        </button>
      </div>

      <ol className="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((s) => {
          const inner = (
            <>
              <span
                aria-hidden
                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-bold ${
                  s.done ? "bg-emerald-600 text-white" : "bg-surface text-ink-muted ring-2 ring-line"
                }`}
              >
                {s.done ? "✓" : ""}
              </span>
              <span className="min-w-0">
                <span className={`block font-semibold ${s.done ? "text-ink-muted line-through decoration-ink/30" : "text-ink"}`}>{s.label}</span>
                <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-muted">{s.detail}</span>
              </span>
              <span className="sr-only">{s.done ? " (done)" : " (to do)"}</span>
            </>
          );
          const cls = `flex h-full items-start gap-3 rounded-2xl p-3.5 ring-1 transition-colors ${
            s.done ? "bg-emerald-50/60 ring-emerald-100" : "bg-surface-alt ring-line hover:ring-ink/25"
          }`;
          return (
            <li key={s.id}>
              {s.external ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                  onClick={() => {
                    if (s.id === "hello") writePrefCookie(COOKIES.saidHi, "1");
                  }}
                >
                  {inner}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href={s.href} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
