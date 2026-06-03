"use client";

import { useState } from "react";

function gbp(n: number) {
  return n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}

const SLIDERS = [
  {
    key: "bundles" as const,
    label: "Active bundles",
    min: 1,
    max: 20,
    step: 1,
    unit: "",
    default: 5,
  },
  {
    key: "units" as const,
    label: "Units per bundle per month",
    min: 30,
    max: 200,
    step: 10,
    unit: "",
    default: 80,
  },
  {
    key: "profit" as const,
    label: "Net profit per unit",
    min: 2,
    max: 20,
    step: 1,
    unit: "£",
    default: 6,
  },
];

export function CompoundingProjection() {
  const [bundles, setBundles] = useState(5);
  const [units, setUnits] = useState(80);
  const [profit, setProfit] = useState(6);

  const monthly = bundles * units * profit;
  const annual = monthly * 12;
  const perBundleMonthly = units * profit;

  const values = { bundles, units, profit };
  const setters = {
    bundles: setBundles,
    units: setUnits,
    profit: setProfit,
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-emerald-50/40 via-surface to-blue-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        🧮 The Compounding Calculator
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-6">
        Slide the inputs to model your operation. Every bundle compounds
        independently of the others.
      </p>

      <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5 md:p-6 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700">
              Monthly Net Cash
            </p>
            <p className="font-display text-4xl md:text-5xl font-bold text-emerald-900 mt-1 leading-none">
              {gbp(monthly)}
            </p>
            <p className="text-[0.8rem] text-emerald-700 mt-2 leading-snug">
              From {bundles} {bundles === 1 ? "bundle" : "bundles"} producing
              roughly {gbp(perBundleMonthly)} each per month.
            </p>
          </div>
          <div className="sm:border-l-2 sm:border-emerald-200 sm:pl-5">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700">
              Annual Run Rate
            </p>
            <p className="font-display text-4xl md:text-5xl font-bold text-emerald-900 mt-1 leading-none">
              {gbp(annual)}
            </p>
            <p className="text-[0.8rem] text-emerald-700 mt-2 leading-snug">
              Projected over twelve months at the current settings, before
              accounting for VAT, corporation tax, and reinvestment.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {SLIDERS.map((s) => {
          const value = values[s.key];
          return (
            <div key={s.key}>
              <div className="flex items-baseline justify-between mb-2">
                <label
                  htmlFor={`slider-${s.key}`}
                  className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink-subtle"
                >
                  {s.label}
                </label>
                <span className="font-display text-lg font-bold text-ink">
                  {s.unit}
                  {value}
                </span>
              </div>
              <input
                id={`slider-${s.key}`}
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={value}
                onChange={(e) =>
                  setters[s.key](Number(e.target.value))
                }
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between font-mono text-[0.6rem] tracking-[0.1em] uppercase text-ink-subtle mt-1">
                <span>
                  {s.unit}
                  {s.min}
                </span>
                <span>
                  {s.unit}
                  {s.max}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-100/50 px-4 py-3 mt-6">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700 mb-1">
          💡 What This Shows
        </p>
        <p className="text-[0.88rem] text-emerald-900 leading-relaxed">
          A single bundle at the floor produces modest monthly cash. The same
          operation with five or ten validated bundles, each protected by its
          own ASIN, becomes a quietly compounding system that scales without
          adding headcount or warehouse space.
        </p>
      </div>
    </div>
  );
}
