"use client";

import { useState } from "react";

const SALE_PRICE = 20;
const COGS = 6;
const AMAZON_FEES = 6.21;
const PROFIT_PER_UNIT = SALE_PRICE - COGS - AMAZON_FEES; // £7.79
const MARGIN = (PROFIT_PER_UNIT / SALE_PRICE) * 100;     // 38.95%
const DEFAULT_UNITS_PER_MONTH = 80;

export function ProfitCalculator() {
  const [units, setUnits] = useState(DEFAULT_UNITS_PER_MONTH);

  const monthlyRevenue = units * SALE_PRICE;
  const monthlyCosts = units * (COGS + AMAZON_FEES);
  const monthlyProfit = units * PROFIT_PER_UNIT;

  return (
    <div className="my-8 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-surface to-emerald-50/20 p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
            Real example
          </p>
          <h3 className="font-display text-xl font-bold text-ink flex items-center gap-2 mt-0.5">
            <span>📦</span> A 3-Pack Bundle at £20
          </h3>
        </div>
        <span className="inline-flex h-8 px-3 items-center rounded-full font-mono text-[0.7rem] font-bold tracking-wider bg-emerald-100 text-emerald-800 whitespace-nowrap">
          ✓ Profitable
        </span>
      </div>

      <p className="text-[0.85rem] text-ink-muted mb-5">
        Here is the math on a bundle a real Elite FBA student sells right now.
        These are the exact numbers we run before we ever buy a unit of stock.
      </p>

      <div className="space-y-2">
        <Row label="Customer pays Amazon" value={SALE_PRICE} tint="positive" />
        <Row label="Your product cost (COGS)" value={COGS} tint="negative" />
        <Row label="Amazon FBA fees" value={AMAZON_FEES} tint="negative" />
      </div>

      <div className="mt-4 pt-4 border-t-2 border-dashed border-emerald-300">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-base font-semibold text-ink">
            Profit per Bundle
          </span>
          <span className="font-mono text-3xl font-bold text-emerald-700">
            £{PROFIT_PER_UNIT.toFixed(2)}
          </span>
        </div>
        <div className="mt-1 text-right text-[0.75rem] text-ink-muted">
          Margin:{" "}
          <span className="font-mono font-bold text-ink">
            {MARGIN.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-emerald-200">
        <p className="text-[0.85rem] text-ink-muted mb-4">
          Now scale it. Drag the slider to see what this single listing earns at
          different monthly sales volumes.
        </p>

        <div className="mb-1.5 flex items-baseline justify-between">
          <label
            htmlFor="units-per-month"
            className="text-[0.85rem] text-ink-muted"
          >
            Bundles sold per month
          </label>
          <span className="font-mono text-[1.05rem] font-bold text-ink">
            {units}
          </span>
        </div>
        <input
          id="units-per-month"
          type="range"
          min={0}
          max={400}
          step={10}
          value={units}
          onChange={(e) => setUnits(parseInt(e.target.value, 10))}
          className="w-full accent-emerald-600 cursor-pointer"
          aria-label="Bundles sold per month"
        />

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Tile label="Monthly revenue" value={monthlyRevenue} tint="neutral" />
          <Tile label="Monthly costs" value={monthlyCosts} tint="negative" />
          <Tile
            label="Monthly profit"
            value={monthlyProfit}
            tint="positive"
            emphasis
          />
        </div>

        <p className="mt-5 text-[0.8rem] text-ink-muted italic leading-relaxed">
          At 80 bundles per month, this one listing clears around £
          {(DEFAULT_UNITS_PER_MONTH * PROFIT_PER_UNIT).toFixed(0)} in profit
          every single month. Stack three or four listings like this and you
          have a real business, not a side hustle.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  tint,
}: {
  label: string;
  value: number;
  tint: "positive" | "negative";
}) {
  const sign = tint === "negative" ? "-" : "";
  const color = tint === "negative" ? "text-rose-700" : "text-ink";
  return (
    <div className="flex items-baseline justify-between px-4 py-2.5 rounded-xl bg-white/70 border border-emerald-100">
      <span className="text-[0.9rem] text-ink-muted">{label}</span>
      <span className={`font-mono text-[1.05rem] font-bold ${color}`}>
        {sign}£{value.toFixed(2)}
      </span>
    </div>
  );
}

function Tile({
  label,
  value,
  tint,
  emphasis,
}: {
  label: string;
  value: number;
  tint: "positive" | "negative" | "neutral";
  emphasis?: boolean;
}) {
  const color =
    tint === "positive"
      ? "text-emerald-700"
      : tint === "negative"
      ? "text-rose-700"
      : "text-ink";
  const bg =
    tint === "positive"
      ? "bg-emerald-50 border-emerald-300"
      : tint === "negative"
      ? "bg-rose-50 border-rose-200"
      : "bg-surface border-line";
  return (
    <div className={`rounded-xl border-2 p-3.5 ${bg}`}>
      <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle leading-tight">
        {label}
      </p>
      <p
        className={`mt-1 font-mono font-bold ${color} ${
          emphasis ? "text-2xl" : "text-xl"
        }`}
      >
        £{Math.round(value).toLocaleString("en-GB")}
      </p>
    </div>
  );
}
