"use client";

import { useEffect, useState } from "react";

type Chapter = { id: string; n: string; title: string };

/**
 * Fixed chapter index on wide screens. Highlights whichever chapter is
 * crossing the middle of the viewport and hides while the hero or closing
 * section is on screen.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    const inView = new Set<string>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target.id);
          else inView.delete(e.target.id);
        }
        const current = chapters.find((c) => inView.has(c.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="Chapters"
      className={`fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 min-[1400px]:block transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] ${
        active ? "opacity-100" : "pointer-events-none -translate-x-3 opacity-0"
      }`}
    >
      <ol className="flex flex-col gap-1 rounded-2xl border border-line/80 bg-white/90 p-1 shadow-[var(--shadow-float)] backdrop-blur-xl">
        {chapters.map((c) => {
          const on = c.id === active;
          return (
            <li key={c.id} className="relative">
              <a
                href={`#${c.id}`}
                aria-current={on ? "step" : undefined}
                aria-label={`Chapter ${c.n}: ${c.title}`}
                className={`peer flex h-8 w-9 items-center justify-center rounded-xl font-mono text-[0.68rem] transition-colors ${
                  on ? "bg-ink text-accent" : "text-ink-subtle hover:bg-surface-alt hover:text-ink"
                }`}
              >
                {c.n}
              </a>
              {/* Title tooltip - only on hover/focus so it never sits over the text. */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white opacity-0 transition-[opacity,transform] duration-300 peer-hover:translate-x-0 peer-hover:opacity-100 peer-focus-visible:translate-x-0 peer-focus-visible:opacity-100"
              >
                {c.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
