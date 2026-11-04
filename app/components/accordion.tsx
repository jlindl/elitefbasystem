"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "./icons";

type Item = {
  id: string;
  title: string;
  meta?: string;
  numeral?: string;
  body: ReactNode;
  completed?: boolean;
};

type AccordionProps = {
  items: Item[];
  showNumeral?: boolean;
};

export function Accordion({ items, showNumeral = false }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div
            key={item.id}
            className={`transition-colors duration-300 ${
              isOpen ? "bg-surface-alt/70" : "hover:bg-surface-alt/50"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="group flex w-full items-center gap-4 md:gap-6 px-5 md:px-7 py-5 md:py-6 text-left"
            >
              {showNumeral && item.numeral && (
                <span
                  className={`font-display text-[1.25rem] md:text-[1.625rem] font-light tabular-nums min-w-[2rem] md:min-w-[2.75rem] transition-colors duration-300 ${
                    item.completed
                      ? "text-emerald-600"
                      : isOpen
                        ? "text-accent"
                        : "text-ink-subtle"
                  }`}
                >
                  {item.numeral}
                </span>
              )}
              <span className="flex-1 min-w-0">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-display text-[1.025rem] md:text-[1.2rem] font-medium tracking-[-0.015em] text-ink">
                    {item.title}
                  </span>
                  {item.completed && (
                    <span className="inline-flex h-5 px-2 items-center rounded-full bg-emerald-100 text-emerald-800 font-mono text-[0.55rem] font-bold tracking-[0.14em] uppercase">
                      ✓ Complete
                    </span>
                  )}
                </span>
                {item.meta && (
                  <span className="mt-1 block text-[0.875rem] md:text-[0.9rem] leading-[1.5] text-ink-muted">
                    {item.meta}
                  </span>
                )}
              </span>
              <span
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] ${
                  isOpen
                    ? "rotate-45 border-ink bg-ink text-white"
                    : "border-line bg-surface text-ink group-hover:border-ink/25"
                }`}
              >
                <Plus size={16} />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-5 md:px-7 pb-7 ${
                    showNumeral ? "md:pl-[6rem]" : ""
                  }`}
                >
                  <div className="text-[0.95rem] text-ink-muted leading-[1.7] max-w-[680px]">
                    {item.body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
