"use client";

import { useState } from "react";

type Scenario = {
  id: string;
  letter: string;
  title: string;
  bundle: string;
  tier: string;
  sweetSpot?: boolean;
  cautionLabel?: string;
  sale: number;
  referral: number;
  fba: number;
  prep: number;
  cogs: number;
  takeaway?: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "small",
    letter: "A",
    title: "The Small Compact Multipack",
    bundle:
      "A 3-pack of high-velocity, everyday brand specialised shampoo. Wrapped tightly side-by-side in a slim polybag to keep it completely flat.",
    tier: "Standard Envelope",
    sale: 19.99,
    referral: 3.0,
    fba: 2.4,
    prep: 0.6,
    cogs: 6.0,
  },
  {
    id: "large",
    letter: "B",
    title: "The Large Parcel Bundle",
    bundle:
      "A backyard children's paddling pool packaged together with a thick, heavy-duty protective ground liner. An all-in-one bundle, but heavy and bulky.",
    tier: "Standard Parcel",
    cautionLabel: "Bulky",
    sale: 29.99,
    referral: 4.5,
    fba: 4.2,
    prep: 1.5,
    cogs: 11.0,
    takeaway:
      "The sale price is £10 higher than Scenario A, yet the bulky logistics footprint drags the margin down. Sales velocity has to justify the extra warehouse handling, or this bundle is not worth running.",
  },
  {
    id: "premium",
    letter: "C",
    title: "The Premium Compact Bundle",
    bundle:
      "A premium, specialised skincare serum set (2 items) sourced directly from an authorised regional UK distributor at standard wholesale pricing. High retail value, tiny physical footprint.",
    tier: "Small Envelope",
    sweetSpot: true,
    sale: 44.99,
    referral: 6.75,
    fba: 1.8,
    prep: 0.5,
    cogs: 14.0,
    takeaway:
      "This is the operational sweet spot. High retail value plus a minimal physical size profile yields the ultimate cash-flow compounding vehicle.",
  },
];

function profit(s: Scenario) {
  return s.sale - s.referral - s.fba - s.prep - s.cogs;
}

function margin(s: Scenario) {
  return (profit(s) / s.sale) * 100;
}

function gbp(n: number) {
  return `£${n.toFixed(2)}`;
}

export function BundleScenarios() {
  const [activeId, setActiveId] = useState<string>("small");
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];
  const activeProfit = profit(active);
  const activeMargin = margin(active);

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-emerald-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-4">
        🧮 Real-World Bundle Scenarios · Tap a card
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {SCENARIOS.map((s) => {
          const isActive = activeId === s.id;
          const m = margin(s);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                isActive
                  ? "border-accent bg-accent-soft ring-4 ring-accent/20 -translate-y-0.5 shadow-md"
                  : "border-line bg-surface hover:border-ink/30 hover:-translate-y-0.5"
              }`}
            >
              {s.sweetSpot && (
                <span className="absolute -top-2.5 right-4 inline-flex h-5 px-2 items-center rounded-full bg-emerald-500 text-white font-mono text-[0.55rem] font-bold tracking-[0.1em] uppercase shadow-sm">
                  ✓ Sweet Spot
                </span>
              )}
              {s.cautionLabel && (
                <span className="absolute -top-2.5 right-4 inline-flex h-5 px-2 items-center rounded-full bg-amber-500 text-white font-mono text-[0.55rem] font-bold tracking-[0.1em] uppercase shadow-sm">
                  ⚠ {s.cautionLabel}
                </span>
              )}
              <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-subtle">
                Scenario {s.letter}
              </p>
              <h4 className="font-display text-[1rem] font-bold text-ink leading-tight mt-1">
                {s.title}
              </h4>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold text-ink">
                  {m.toFixed(1)}%
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-subtle">
                  margin
                </span>
              </div>
              <p className="text-[0.7rem] text-ink-muted mt-0.5">
                {gbp(profit(s))} net per unit
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border-2 border-accent/30 bg-white/70 p-5">
        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-subtle">
          Scenario {active.letter} · Size Tier: {active.tier}
        </p>
        <h4 className="font-display text-xl font-bold text-ink mt-0.5 leading-tight">
          {active.title}
        </h4>
        <p className="text-[0.9rem] text-ink-muted leading-relaxed mt-2 italic">
          {active.bundle}
        </p>

        <div className="mt-4 rounded-lg border border-line bg-slate-50/60 divide-y divide-line font-mono text-[0.85rem]">
          <Row label="Sale Price" value={gbp(active.sale)} positive />
          <Row label="Referral Fee (15%)" value={`-${gbp(active.referral)}`} />
          <Row label="FBA Fulfilment Fee" value={`-${gbp(active.fba)}`} />
          <Row label="Inbound Shipping & Prep" value={`-${gbp(active.prep)}`} />
          <Row label="Wholesale Sourcing Cost" value={`-${gbp(active.cogs)}`} />
          <div className="grid grid-cols-[1fr_auto] items-center px-4 py-3 bg-emerald-50">
            <span className="font-display text-[0.95rem] font-bold text-emerald-900 not-italic">
              Net Profit per Unit
            </span>
            <span className="font-display text-lg font-bold text-emerald-900">
              {gbp(activeProfit)}
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center px-4 py-2.5 bg-emerald-100/60">
            <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-emerald-800">
              Profit Margin
            </span>
            <span className="font-display text-base font-bold text-emerald-900">
              {activeMargin.toFixed(1)}%
            </span>
          </div>
        </div>

        {active.takeaway && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[0.85rem] text-amber-900 leading-relaxed">
            <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase block mb-1">
              🎯 Operator Takeaway
            </span>
            {active.takeaway}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center px-4 py-2.5">
      <span className="text-ink-muted">{label}</span>
      <span className={positive ? "text-ink font-semibold" : "text-rose-700"}>
        {value}
      </span>
    </div>
  );
}
