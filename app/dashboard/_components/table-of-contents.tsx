"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; label: string };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this lesson" className="sticky top-24">
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-3">
        On this lesson
      </p>
      <ul className="space-y-0.5">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-[0.85rem] leading-snug border-l-2 pl-3 py-1.5 transition-colors ${
                  isActive
                    ? "border-accent text-ink font-medium"
                    : "border-line text-ink-muted hover:text-ink hover:border-ink/40"
                }`}
              >
                {h.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
