"use client";

import { useState, type ReactNode } from "react";
import { Plus } from "./icons";

type Item = {
  id: string;
  title: string;
  meta?: string;
  numeral?: string;
  body: ReactNode;
};

type AccordionProps = {
  items: Item[];
  showNumeral?: boolean;
};

export function Accordion({ items, showNumeral = false }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t border-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={`border-b border-line transition-colors duration-200 ${
              isOpen ? "bg-surface-alt" : "hover:bg-surface-alt/60"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center gap-5 md:gap-8 px-2 md:px-4 py-6 md:py-7 text-left"
            >
              {showNumeral && item.numeral && (
                <span className="font-display text-[1.5rem] md:text-[2rem] font-light text-ink-subtle min-w-[2.5rem] md:min-w-[3.5rem]">
                  {item.numeral}
                </span>
              )}
              <span className="flex-1">
                <span className="block font-display text-[1.05rem] md:text-[1.25rem] font-medium tracking-[-0.01em] text-ink">
                  {item.title}
                </span>
                {item.meta && (
                  <span className="mt-1 block text-[0.9rem] text-ink-muted">
                    {item.meta}
                  </span>
                )}
              </span>
              <Plus
                className={`shrink-0 text-ink transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              style={{ transitionDuration: "350ms" }}
            >
              <div className="overflow-hidden">
                <div className="px-2 md:px-4 pb-7 pl-2 md:pl-[5.5rem]">
                  <div className="text-[0.95rem] text-ink-muted leading-[1.65] max-w-[680px]">
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
