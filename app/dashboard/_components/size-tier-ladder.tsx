"use client";

import { useState } from "react";

const TIERS = [
  {
    id: "small-env",
    name: "Small Envelope",
    fee: "~£1.80",
    dim: "Under 20 × 15 × 1 cm",
    weight: "Up to 80g",
    tone: "green",
    note: "Cheapest tier. Slim items like single-sachet products.",
  },
  {
    id: "std-env",
    name: "Standard Envelope",
    fee: "~£2.40",
    dim: "Up to 33 × 23 × 2.5 cm",
    weight: "Up to 460g",
    tone: "green",
    note: "Most tightly-packed 2-pack and 3-pack bundles fit here.",
  },
  {
    id: "lrg-env",
    name: "Large Envelope",
    fee: "~£2.85",
    dim: "Up to 33 × 23 × 4 cm",
    weight: "Up to 960g",
    tone: "amber",
    note: "Thicker bundles. Still envelope-class pricing.",
  },
  {
    id: "std-parcel",
    name: "Standard Parcel",
    fee: "~£4.20+",
    dim: "Up to 45 × 34 × 26 cm",
    weight: "Up to 9kg",
    tone: "rose",
    note: "Boxy items. Fees climb fast as weight increases.",
  },
] as const;

const TONES = {
  green: {
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    chip: "bg-emerald-100 text-emerald-800",
    text: "text-emerald-900",
    activeBorder: "border-emerald-500",
    activeRing: "ring-emerald-300/40",
  },
  amber: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    chip: "bg-amber-100 text-amber-800",
    text: "text-amber-900",
    activeBorder: "border-amber-500",
    activeRing: "ring-amber-300/40",
  },
  rose: {
    border: "border-rose-300",
    bg: "bg-rose-50",
    chip: "bg-rose-100 text-rose-800",
    text: "text-rose-900",
    activeBorder: "border-rose-500",
    activeRing: "ring-rose-300/40",
  },
} as const;

export function SizeTierLadder() {
  const [activeIdx, setActiveIdx] = useState(1);
  const active = TIERS[activeIdx];
  const activeTone = TONES[active.tone];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-rose-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-4">
        📏 Size Tier Ladder · Tap a tier
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
        {TIERS.map((tier, i) => {
          const tone = TONES[tier.tone];
          const isActive = activeIdx === i;
          const isBoundary = i === 3;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`relative rounded-xl border-2 ${tone.bg} p-3 text-left transition-all duration-200 ${
                isActive
                  ? `${tone.activeBorder} ring-4 ${tone.activeRing} -translate-y-0.5 shadow-md`
                  : `${tone.border} hover:-translate-y-0.5 hover:shadow-sm`
              }`}
            >
              {isBoundary && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex h-5 px-2 items-center rounded-full bg-rose-500 text-white font-mono text-[0.55rem] font-bold tracking-[0.1em] uppercase whitespace-nowrap shadow-sm">
                  ⚠️ Critical Boundary
                </span>
              )}
              <p className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-ink-subtle">
                Tier {i + 1}
              </p>
              <p className={`font-display font-bold text-[0.95rem] leading-tight mt-1 ${tone.text}`}>
                {tier.name}
              </p>
              <p className="font-display text-lg font-bold text-ink mt-1.5">
                {tier.fee}
              </p>
              <p className="text-[0.65rem] text-ink-muted mt-0.5 leading-tight">
                per unit fulfilment fee
              </p>
            </button>
          );
        })}
      </div>

      <div className={`mt-5 rounded-xl border-2 ${activeTone.activeBorder} bg-white/70 p-5`}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <h4 className={`font-display text-lg font-bold ${activeTone.text}`}>
            {active.name}
          </h4>
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em] uppercase font-semibold ${activeTone.chip}`}>
            Fee {active.fee}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="rounded-lg bg-slate-50 border border-line px-3 py-2">
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-subtle">
              Max Dimensions
            </p>
            <p className="font-mono text-[0.9rem] text-ink mt-0.5">
              {active.dim}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 border border-line px-3 py-2">
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-subtle">
              Max Weight
            </p>
            <p className="font-mono text-[0.9rem] text-ink mt-0.5">
              {active.weight}
            </p>
          </div>
        </div>
        <p className="text-[0.9rem] text-ink leading-relaxed">{active.note}</p>
      </div>

      <p className="mt-4 text-center text-[0.75rem] text-ink-subtle italic leading-snug">
        Indicative UK FBA rates. Cross the boundary by a single millimetre and Amazon bills you for the next tier up.
      </p>
    </div>
  );
}
