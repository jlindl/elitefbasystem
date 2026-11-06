"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type ModuleTab = { id: string; label: string; icon: string; content: ReactNode };

/** WAI-ARIA tabs: arrow keys / Home / End move between sections. */
export function ModuleTabs({ tabs }: { tabs: ModuleTab[] }) {
  const base = useId();
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = tabs.find((t) => t.id === active);

  function onKey(e: KeyboardEvent, i: number) {
    const last = tabs.length - 1;
    const to =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i === last ? 0 : i + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i === 0 ? last : i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(tabs[to].id);
    refs.current[to]?.focus();
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:gap-8">
      <div
        role="tablist"
        aria-label="Sections"
        aria-orientation="vertical"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:sticky md:top-6 md:mx-0 md:h-fit md:w-60 md:shrink-0 md:flex-col md:overflow-visible md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, i) => {
          const on = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex min-h-12 shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[0.9375rem] font-medium transition-all duration-200 ${
                on ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink-muted hover:border-ink/25 hover:text-ink"
              }`}
            >
              <span aria-hidden className="text-[1.15rem]">
                {tab.icon}
              </span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {current && (
        <div
          key={current.id}
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${current.id}`}
          tabIndex={0}
          className="animate-in min-w-0 flex-1 rounded-xl"
        >
          {current.content}
        </div>
      )}
    </div>
  );
}
