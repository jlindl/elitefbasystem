"use client";

import { useState } from "react";

const BENEFITS = [
  {
    id: "trust",
    icon: "🤝",
    title: "Instant Trust",
    headline: "Customers trust Amazon, not you (and that's fine).",
    detail:
      "Shoppers do not know your seller name and they do not want to. The Prime badge tells them this listing has been vetted by Amazon, the shipping is guaranteed by Amazon, and Amazon will handle any problem. Their trust transfers to your listing automatically the moment the badge appears.",
    color: "blue",
  },
  {
    id: "filter",
    icon: "👁️",
    title: "Invisible Filters",
    headline: "Around 80% of buyers may never see you without it.",
    detail:
      "Most shoppers leave the Prime-only filter switched on. If your product is not on FBA, your listing vanishes from those results entirely, no matter how cheap it is or how well it is reviewed. Mobile makes the effect even worse: the small screen rarely shows past the first few Prime results.",
    color: "amber",
  },
  {
    id: "pricing",
    icon: "💷",
    title: "Premium Pricing",
    headline: "Prime buyers will pay more for speed.",
    detail:
      "Prime customers want their items tomorrow. They will happily pay £19.99 for a Prime-eligible item rather than £14.99 for a non-Prime version that takes a week to arrive. The badge lets you hold a healthier margin without losing the sale.",
    color: "emerald",
  },
] as const;

const COLORS = {
  blue: {
    btnActive: "border-blue-400 bg-blue-100 text-blue-900",
    panelBorder: "border-blue-300",
    panelBg: "bg-gradient-to-br from-blue-50 to-blue-100/30",
    headline: "text-blue-800",
  },
  amber: {
    btnActive: "border-amber-400 bg-amber-100 text-amber-900",
    panelBorder: "border-amber-300",
    panelBg: "bg-gradient-to-br from-amber-50 to-amber-100/30",
    headline: "text-amber-800",
  },
  emerald: {
    btnActive: "border-emerald-400 bg-emerald-100 text-emerald-900",
    panelBorder: "border-emerald-300",
    panelBg: "bg-gradient-to-br from-emerald-50 to-emerald-100/30",
    headline: "text-emerald-800",
  },
} as const;

export function PrimeBadgeBenefits() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = BENEFITS[activeIdx];
  const c = COLORS[active.color];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-surface p-5 md:p-6">
      <div className="flex flex-wrap gap-2 mb-5">
        {BENEFITS.map((b, i) => {
          const isActive = activeIdx === i;
          const bc = COLORS[b.color];
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-150 ${
                isActive
                  ? bc.btnActive
                  : "border-line bg-surface text-ink-muted hover:border-ink/30 hover:text-ink"
              }`}
            >
              <span className="text-lg">{b.icon}</span>
              <span className="text-[0.85rem] font-medium">{b.title}</span>
            </button>
          );
        })}
      </div>

      <div className={`rounded-xl border-2 ${c.panelBorder} ${c.panelBg} p-5 md:p-6`}>
        <div className="flex items-start gap-4 mb-3">
          <span className="text-4xl flex-shrink-0">{active.icon}</span>
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
              Prime unlock
            </p>
            <h3 className="font-display text-xl font-bold text-ink mt-0.5">
              {active.title}
            </h3>
          </div>
        </div>
        <p className={`text-[0.95rem] font-semibold ${c.headline} mb-3`}>
          {active.headline}
        </p>
        <p className="text-[0.9rem] text-ink leading-relaxed">{active.detail}</p>
      </div>
    </div>
  );
}
