"use client";

import { useState } from "react";

const SIDES = [
  {
    id: "you",
    accent: "blue",
    icon: "💻",
    title: "Your Job",
    subtitle: "The Digital Side",
    items: [
      "Find profitable products from your phone or laptop",
      "Create the product listing on Amazon",
      "Pack stock into one big box",
      "Ship that box to Amazon",
    ],
  },
  {
    id: "amazon",
    accent: "amber",
    icon: "🏭",
    title: "Amazon's Job",
    subtitle: "The Physical Side",
    items: [
      "Store your stock on their warehouse shelves",
      "Pick the item the moment a customer orders",
      "Pack it into an Amazon box and ship to the buyer",
      "Handle returns and front-line customer service",
    ],
  },
] as const;

const COLORS = {
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    chip: "bg-blue-100 text-blue-800",
    tick: "text-blue-600",
    ring: "ring-blue-200",
  },
  amber: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    chip: "bg-amber-100 text-amber-800",
    tick: "text-amber-600",
    ring: "ring-amber-200",
  },
} as const;

export function SplitWorkDiagram() {
  const [hovered, setHovered] = useState<"you" | "amazon" | null>(null);

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-blue-50/40 via-surface to-amber-50/40 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-4">
        ⇄ A clean split of responsibilities
      </p>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        {SIDES.map((side) => {
          const c = COLORS[side.accent];
          const isHovered = hovered === side.id;
          return (
            <div
              key={side.id}
              onMouseEnter={() => setHovered(side.id)}
              onMouseLeave={() => setHovered(null)}
              className={`rounded-xl border-2 p-5 transition-all duration-200 ${c.border} ${c.bg} ${
                isHovered
                  ? `ring-4 ${c.ring} -translate-y-0.5 shadow-md`
                  : "hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{side.icon}</span>
                <span
                  className={`inline-flex h-6 px-2.5 items-center rounded-full font-mono text-[0.6rem] font-bold tracking-[0.12em] uppercase ${c.chip}`}
                >
                  {side.subtitle}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-3">
                {side.title}
              </h3>
              <ul className="space-y-2">
                {side.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[0.875rem] text-ink leading-snug">
                    <span className={`${c.tick} mt-0.5 font-bold flex-shrink-0`}>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
