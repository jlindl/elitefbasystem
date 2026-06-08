"use client";

import { useState } from "react";

type Criterion = {
  id: string;
  icon: string;
  title: string;
  passingTest: string;
  failingFlag: string;
};

const CRITERIA: Criterion[] = [
  {
    id: "demand",
    icon: "📈",
    title: "Proven single-unit demand",
    passingTest:
      "The single-unit version of the product (or both items, for a complementary bundle) has a BSR under 50,000 in its main category and at least 20 reviews on Amazon.",
    failingFlag:
      "BSR over 100,000 or fewer than 10 reviews. The market is too small or too new.",
  },
  {
    id: "uniqueness",
    icon: "🧩",
    title: "Genuinely unique combination",
    passingTest:
      "No identical 3-pack or complementary bundle currently exists on Amazon. Or the only existing bundle is weak (poor photos, no A+ content, under 50 reviews).",
    failingFlag:
      "An established 3-pack listing already exists with 500+ reviews and multiple sellers. You will be late to a fight.",
  },
  {
    id: "margin",
    icon: "💷",
    title: "Margin clears the floor",
    passingTest:
      "Projected net profit per unit clears £5 and projected margin clears 30%, using conservative numbers (retail sourcing cost, full FBA fees, no Q4 discount).",
    failingFlag:
      "Margin below 30% or net under £5 per unit. A fee revision or normal return rate will erase the profit.",
  },
  {
    id: "sourcing",
    icon: "🏭",
    title: "Sourcing route exists",
    passingTest:
      "You can name the wholesale distributor for the brand (found on the brand website or via a 'BRAND wholesale UK' search), or you have seen the brand repeatedly across local mini markets and discount retailers, which signals a cash-and-carry route you can confirm.",
    failingFlag:
      "Brand sells direct-only with no distributor, or supply only appeared as a one-off retail batch. You will hit a stockout in month 2.",
  },
  {
    id: "category",
    icon: "🟢",
    title: "Category is open to a new seller",
    passingTest:
      "Category is ungated for new accounts. Beauty, Home, Pet, Snacks, Personal Care, and Toys are all open. No restricted-substance flags.",
    failingFlag:
      "Topical creams, OTC medication, supplements with extended health claims, or any other gated category. Save the bundle for after Module 6.",
  },
];

export function BundleScorecard() {
  const [passed, setPassed] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setPassed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const score = passed.size;
  const total = CRITERIA.length;
  const verdict =
    score === total
      ? "go"
      : score === total - 1
      ? "conditional"
      : score >= 2
      ? "rework"
      : "skip";

  const VERDICT_META = {
    go: {
      icon: "🚀",
      label: "Go",
      color: "emerald",
      narrative:
        "All five criteria clear. This bundle deserves capital. Move on to Lesson 6 and start your wholesale outreach this week.",
    },
    conditional: {
      icon: "🟡",
      label: "Conditional Go",
      color: "amber",
      narrative:
        "Four of five clear, which means there is one specific gap to fix. Address the failing criterion (most often margin or sourcing) before committing capital.",
    },
    rework: {
      icon: "🛠️",
      label: "Rework",
      color: "amber",
      narrative:
        "Two or three pass. The bundle idea has merit but the execution does not yet. Rework the combination, the price point, or the sourcing route, then re-score.",
    },
    skip: {
      icon: "⛔",
      label: "Skip This Bundle",
      color: "rose",
      narrative:
        "Fewer than two criteria pass. This is not the bundle. Move on to the next candidate; do not try to salvage a structurally weak idea.",
    },
  } as const;

  const v = VERDICT_META[verdict];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-rose-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          📦 The Bundle Scorecard
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {score} / {total} criteria pass
        </p>
      </div>

      <p className="text-[0.85rem] text-ink-muted mb-4">
        Tap each criterion as you confirm it for your candidate bundle. The
        verdict at the bottom updates automatically.
      </p>

      <ul className="space-y-2.5">
        {CRITERIA.map((c) => {
          const isPassed = passed.has(c.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 ${
                  isPassed
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-line bg-surface hover:border-ink/30"
                }`}
                aria-pressed={isPassed}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 h-7 w-7 rounded-md border-2 flex items-center justify-center transition-colors duration-150 ${
                      isPassed
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-ink/20 bg-surface"
                    }`}
                  >
                    {isPassed && (
                      <span className="text-[0.9rem] font-bold leading-none">
                        ✓
                      </span>
                    )}
                  </span>
                  <span className="text-2xl leading-none flex-shrink-0">
                    {c.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-display font-bold leading-tight ${
                        isPassed ? "text-emerald-900" : "text-ink"
                      }`}
                    >
                      {c.title}
                    </p>
                    <p className="text-[0.85rem] text-ink-muted leading-relaxed mt-1">
                      <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-emerald-700 mr-1.5">
                        Passes if
                      </span>
                      {c.passingTest}
                    </p>
                    <p className="text-[0.8rem] text-rose-700 leading-relaxed mt-1.5">
                      <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mr-1.5">
                        Fails if
                      </span>
                      {c.failingFlag}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        className={`mt-5 rounded-2xl border-2 p-5 ${
          v.color === "emerald"
            ? "border-emerald-300 bg-emerald-50"
            : v.color === "amber"
            ? "border-amber-300 bg-amber-50"
            : "border-rose-300 bg-rose-50"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none flex-shrink-0">{v.icon}</span>
          <div>
            <p
              className={`font-mono text-[0.65rem] tracking-[0.18em] uppercase ${
                v.color === "emerald"
                  ? "text-emerald-700"
                  : v.color === "amber"
                  ? "text-amber-700"
                  : "text-rose-700"
              }`}
            >
              Verdict
            </p>
            <p
              className={`font-display text-2xl font-bold leading-tight ${
                v.color === "emerald"
                  ? "text-emerald-900"
                  : v.color === "amber"
                  ? "text-amber-900"
                  : "text-rose-900"
              }`}
            >
              {v.label}
            </p>
            <p
              className={`text-[0.92rem] leading-relaxed mt-2 ${
                v.color === "emerald"
                  ? "text-emerald-900"
                  : v.color === "amber"
                  ? "text-amber-900"
                  : "text-rose-900"
              }`}
            >
              {v.narrative}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
