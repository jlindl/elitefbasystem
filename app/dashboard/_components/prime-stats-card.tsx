"use client";

import { useState } from "react";

const STATS = [
  {
    icon: "🌍",
    value: "200M+",
    label: "Prime members worldwide",
    detail:
      "Spread across more than 20 countries including the UK, US, Germany, Japan, and Canada. Prime is the most successful paid consumer subscription product on the planet.",
  },
  {
    icon: "💷",
    value: "2-3×",
    label: "Spend vs non-members",
    detail:
      "Industry analyses consistently estimate that Prime members spend two to three times more per year on Amazon than non-Prime shoppers. Higher repeat-purchase rates, larger basket sizes, faster replenishment.",
  },
  {
    icon: "🔁",
    value: "~95%",
    label: "Annual retention",
    detail:
      "Once shoppers subscribe, they almost never cancel. Prime has one of the highest retention rates ever recorded for a paid consumer subscription, which means the audience compounds year on year.",
  },
  {
    icon: "📦",
    value: "24h",
    label: "Standard delivery",
    detail:
      "Prime promises one or two-day delivery on millions of items. In dense cities, same-day delivery is now the default expectation for Prime members on eligible products.",
  },
  {
    icon: "🏠",
    value: "1 in 2",
    label: "UK households",
    detail:
      "More than half of UK households now hold a Prime membership. The badge is not a niche feature; it is the default expectation for the majority of British shoppers.",
  },
  {
    icon: "🛒",
    value: "70+",
    label: "Orders per member / year",
    detail:
      "The average Prime member orders from Amazon more than once a week. That works out at roughly 70 to 80 orders a year, compared with around 10 for non-members.",
  },
] as const;

export function PrimeStatsCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = STATS[activeIdx];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-blue-50/40 via-surface to-purple-50/40 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-4">
        📊 Prime by the Numbers · Tap any stat
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {STATS.map((s, i) => {
          const isActive = activeIdx === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                isActive
                  ? "border-accent bg-accent-soft ring-4 ring-accent/20 -translate-y-0.5 shadow-md"
                  : "border-line bg-surface hover:border-ink/30 hover:-translate-y-0.5"
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <p
                className={`mt-1.5 font-display text-2xl md:text-[1.75rem] font-bold leading-tight ${
                  isActive ? "text-accent" : "text-ink"
                }`}
              >
                {s.value}
              </p>
              <p className="text-[0.7rem] text-ink-muted mt-1 leading-tight">
                {s.label}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border-2 border-accent/30 bg-white/70 p-5">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-2xl">{active.icon}</span>
          <div>
            <p className="font-display text-xl font-bold text-accent leading-tight">
              {active.value}
            </p>
            <p className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted mt-0.5">
              {active.label}
            </p>
          </div>
        </div>
        <p className="text-[0.9rem] text-ink leading-relaxed mt-3">
          {active.detail}
        </p>
      </div>
    </div>
  );
}
