"use client";

import type { CSSProperties } from "react";
import { useRevealOnScroll } from "./reveal";

const steps = [
  {
    day: "Day 1",
    title: "Onboarding call",
    body: "We go deep on your business, your goals, and the next 90 days. You leave with a written plan.",
  },
  {
    day: "Day 2",
    title: "Inbox open",
    body: "WhatsApp invite hits. Ask anything - supplier, listing, ad, or mindset.",
  },
  {
    day: "Day 3–6",
    title: "Daily back-and-forth",
    body: "I review your work in-thread. Voice notes, screenshots, redlines - fast feedback, no waiting.",
  },
  {
    day: "Day 7",
    title: "Weekly 1-to-1",
    body: "We screenshare. We move one number. Recording lands in your library by the next morning.",
  },
];

/** Vertical on phones, horizontal from md up; the rail draws in on reveal. */
export function WeekTimeline() {
  const ref = useRevealOnScroll<HTMLOListElement>();

  return (
    <ol ref={ref} className="group/tl relative mt-12 md:mt-16 grid gap-8 md:grid-cols-4 md:gap-6">
      {/* rail */}
      <span
        aria-hidden
        className="absolute left-[11px] top-3 bottom-3 w-px bg-line md:hidden"
      />
      <span
        aria-hidden
        className="draw-line-y absolute left-[11px] top-3 bottom-3 w-px bg-accent md:hidden"
      />
      <span
        aria-hidden
        className="absolute left-0 right-0 top-[11px] hidden h-px bg-line md:block"
      />
      <span
        aria-hidden
        className="draw-line absolute left-0 right-0 top-[11px] hidden h-px bg-accent md:block"
      />

      {steps.map((s, i) => (
        <li
          key={s.day}
          style={{ "--i": i } as CSSProperties}
          className="relative pl-10 md:pl-0 md:pt-10 opacity-0 translate-y-4 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] [transition-delay:calc(var(--i)*160ms+300ms)] group-[.is-visible]/tl:opacity-100 group-[.is-visible]/tl:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 inline-flex h-[23px] w-[23px] items-center justify-center rounded-full border border-accent/40 bg-surface-alt"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
            {s.day}
          </p>
          <h3 className="mt-2 font-display text-[1.25rem] md:text-[1.375rem] font-medium tracking-[-0.02em] leading-[1.2]">
            {s.title}
          </h3>
          <p className="mt-2.5 text-[0.95rem] leading-[1.65] text-ink-muted">
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
