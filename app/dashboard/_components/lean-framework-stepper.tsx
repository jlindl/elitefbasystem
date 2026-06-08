"use client";

import { useState } from "react";

const STEPS = [
  {
    num: 1,
    icon: "🆓",
    title: "Start Free",
    short: "Free Individual Seller Account",
    detail:
      "No £25 a month subscription. Amazon takes a small per-item fee instead, so your overhead stays at zero until you start selling. Beginners do not need the Professional tier.",
    color: "blue",
  },
  {
    num: 2,
    icon: "📦",
    title: "Buy Micro-Batches",
    short: "10 to 12 units of a tested product",
    detail:
      "We do not buy hundreds of items. We buy a handful from local retail and discount shops to confirm the bundle, then move to the brand's wholesale distributor for ongoing supply. Your absolute downside on a test batch is the cost of an evening out.",
    color: "amber",
  },
  {
    num: 3,
    icon: "📈",
    title: "Test Fast",
    short: "Validate before you scale",
    detail:
      "Send those 10 units to FBA. If they sell out fast, you have validated demand. Reinvest into a bigger order. If they do not, you review the data, clear the stock, and have only risked pocket change.",
    color: "emerald",
  },
] as const;

const COLORS = {
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    activeBg: "bg-blue-100",
    chip: "bg-blue-200 text-blue-900",
    ring: "ring-blue-300",
  },
  amber: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    activeBg: "bg-amber-100",
    chip: "bg-amber-200 text-amber-900",
    ring: "ring-amber-300",
  },
  emerald: {
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    activeBg: "bg-emerald-100",
    chip: "bg-emerald-200 text-emerald-900",
    ring: "ring-emerald-300",
  },
} as const;

export function LeanFrameworkStepper() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = STEPS[activeIdx];
  const ac = COLORS[active.color];

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {STEPS.map((s, i) => {
          const c = COLORS[s.color];
          const isActive = activeIdx === i;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-200 ${c.border} ${
                isActive
                  ? `${c.activeBg} ring-4 ${c.ring} -translate-y-0.5 shadow-md`
                  : `${c.bg} hover:-translate-y-0.5`
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${c.chip} text-[0.75rem] font-bold font-mono`}
                >
                  {s.num}
                </span>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h4 className="font-display text-[1.05rem] font-bold text-ink leading-tight">
                {s.title}
              </h4>
              <p className="text-[0.75rem] text-ink-muted mt-1 leading-snug">
                {s.short}
              </p>
            </button>
          );
        })}
      </div>

      <div
        className={`rounded-2xl border-2 ${ac.border} ${ac.bg} p-5 md:p-6`}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{active.icon}</span>
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
              Step {active.num} of {STEPS.length}
            </p>
            <h3 className="font-display text-lg font-bold text-ink mt-0.5">
              {active.title}
            </h3>
          </div>
        </div>
        <p className="text-[0.95rem] text-ink leading-relaxed">{active.detail}</p>
      </div>
    </div>
  );
}
