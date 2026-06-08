"use client";

import { useState } from "react";

const ROWS = [
  {
    label: "Monthly fee",
    individual: "£0 (£0.75 per item sold instead)",
    professional: "£25 + VAT per month, flat",
    favours: "individual",
  },
  {
    label: "Per-item fee",
    individual: "£0.75 deducted from every sale",
    professional: "None (just the standard referral fee)",
    favours: "professional",
  },
  {
    label: "Break-even point",
    individual: "Under 33 units per month",
    professional: "33 units per month or more",
    favours: "neutral",
  },
  {
    label: "Buy Box eligibility",
    individual: "Not eligible. Cannot win the Buy Box.",
    professional: "Eligible from day one",
    favours: "professional",
  },
  {
    label: "Bulk listing tools",
    individual: "No bulk uploads, no inventory file feeds",
    professional: "Full bulk upload, inventory feed, reports API",
    favours: "professional",
  },
  {
    label: "Restricted categories",
    individual: "Cannot apply for gated categories",
    professional: "Can apply to ungate any restricted category",
    favours: "professional",
  },
  {
    label: "Sponsored Ads (PPC)",
    individual: "Not available",
    professional: "Available",
    favours: "professional",
  },
  {
    label: "Switch between plans",
    individual: "Yes, at any time from Account Settings",
    professional: "Yes, at any time from Account Settings",
    favours: "neutral",
  },
] as const;

type Mode = "individual" | "professional";

export function PlanComparison() {
  const [mode, setMode] = useState<Mode>("professional");

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-surface overflow-hidden">
      <div className="grid grid-cols-2 border-b-2 border-line">
        <button
          type="button"
          onClick={() => setMode("individual")}
          className={`p-5 text-left transition-colors duration-200 ${
            mode === "individual"
              ? "bg-blue-50 border-r-2 border-blue-300"
              : "bg-surface hover:bg-surface-alt border-r-2 border-line"
          }`}
        >
          <p
            className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${
              mode === "individual" ? "text-blue-700" : "text-ink-subtle"
            }`}
          >
            Plan A
          </p>
          <h3
            className={`font-display text-lg md:text-xl font-bold leading-tight mt-1 ${
              mode === "individual" ? "text-blue-900" : "text-ink"
            }`}
          >
            Individual
          </h3>
          <p className="text-[0.8rem] text-ink-muted mt-1">£0/month + £0.75/sale</p>
        </button>
        <button
          type="button"
          onClick={() => setMode("professional")}
          className={`p-5 text-left transition-colors duration-200 ${
            mode === "professional"
              ? "bg-emerald-50"
              : "bg-surface hover:bg-surface-alt"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p
              className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${
                mode === "professional" ? "text-emerald-700" : "text-ink-subtle"
              }`}
            >
              Plan B
            </p>
            <span className="inline-flex h-5 px-2 items-center rounded-full bg-emerald-500 text-white font-mono text-[0.55rem] font-bold tracking-[0.1em] uppercase">
              Operator Pick
            </span>
          </div>
          <h3
            className={`font-display text-lg md:text-xl font-bold leading-tight mt-1 ${
              mode === "professional" ? "text-emerald-900" : "text-ink"
            }`}
          >
            Professional
          </h3>
          <p className="text-[0.8rem] text-ink-muted mt-1">£25/month, flat</p>
        </button>
      </div>

      <div className="hidden md:grid grid-cols-[1.1fr_1fr_1fr] bg-slate-50 border-b-2 border-line">
        <div className="px-4 py-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          Feature
        </div>
        <div className="px-4 py-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-blue-700 border-l border-line">
          Individual
        </div>
        <div className="px-4 py-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-emerald-700 border-l border-line">
          Professional
        </div>
      </div>

      {ROWS.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] ${
            i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
          } ${i < ROWS.length - 1 ? "border-b border-line" : ""}`}
        >
          <div className="px-4 py-3 md:py-4 font-display font-semibold text-ink text-[0.9rem] flex items-center">
            {row.label}
          </div>
          <div
            className={`px-4 py-3 md:py-4 md:border-l border-line flex items-start gap-2 text-[0.85rem] leading-snug ${
              mode === "individual"
                ? "text-blue-900"
                : "text-ink-muted opacity-60 hidden md:flex"
            }`}
          >
            <span className="hidden md:inline font-mono text-[0.6rem] tracking-[0.1em] uppercase text-ink-subtle md:hidden">
              Ind:
            </span>
            <span>{row.individual}</span>
          </div>
          <div
            className={`px-4 py-3 md:py-4 md:border-l border-line flex items-start gap-2 text-[0.85rem] leading-snug ${
              mode === "professional"
                ? "text-emerald-900"
                : "text-ink-muted opacity-60 hidden md:flex"
            }`}
          >
            <span>{row.professional}</span>
          </div>
        </div>
      ))}

      <div className="px-5 py-4 bg-gradient-to-r from-amber-50 to-amber-50/40 border-t-2 border-amber-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0 leading-none">🎯</span>
          <div>
            <h4 className="font-display font-bold text-amber-900 text-[0.95rem]">
              The Operator Move
            </h4>
            <p className="text-[0.85rem] text-amber-900/90 leading-relaxed mt-1">
              Start on the Individual plan while your test batch is in
              transit. The moment your first units are live and selling,
              switch to Professional. You unlock the Buy Box, ungating
              applications, and bulk tools, and the £25 monthly fee becomes
              cheaper than per-item charges at anything above 33 sales a
              month. The switch is two clicks in Account Settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
