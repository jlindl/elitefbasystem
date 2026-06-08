"use client";

import { useState } from "react";

type Gate = {
  num: number;
  icon: string;
  title: string;
  question: string;
  howToCheck: string;
  greenLight: string;
  redLight: string;
};

const GATES: Gate[] = [
  {
    num: 1,
    icon: "🎯",
    title: "Multipack Fit",
    question:
      "Could a customer plausibly want this product as a 3-pack or matched-pair?",
    howToCheck:
      "Look at the product in your hand or on the shelf. Is it something people replenish, share, run out of, or stockpile? Or is it a single-use item with no natural bundling logic? It does not have to be an everyday consumable; batteries, candles, dog chews, replacement filters, light bulbs, sponges, sachets, and refill cartridges all work.",
    greenLight:
      "You can immediately picture a 3-pack listing photo where the bundle reads as obvious value to a buyer who already wanted one.",
    redLight:
      "You cannot articulate why a customer would buy three of these at once. The item is a one-and-done purchase.",
  },
  {
    num: 2,
    icon: "🔁",
    title: "No Established Multipack",
    question:
      "Does a well-established multipack already dominate this product on Amazon?",
    howToCheck:
      "Open Amazon. Search 'BRAND PRODUCT 3-pack' or 'BRAND PRODUCT multipack' or 'BRAND PRODUCT twin pack'. Look at the top results. If a clean, well-photographed multipack listing exists with serious reviews and multiple sellers, the market position is taken.",
    greenLight:
      "No multipack listing exists, or the only one has under 100 reviews, weak photos, missing A+ content, or has been dormant for months. Plenty of room for your bundle to take the position.",
    redLight:
      "An established multipack with 500+ reviews and multiple sellers is already there. Your new bundle will start invisible and stay invisible.",
  },
  {
    num: 3,
    icon: "🚫",
    title: "Brand Is Not Amazon-Owned Territory",
    question:
      "Does the brand have an aggressive official presence backed by the manufacturer?",
    howToCheck:
      "Search the brand name alone on Amazon. Look for these red flags: a clickable Brand Store linked under the brand name on listings, A+ Content on every product page, Sponsored Brands ads at the top of search results, and 'Sold by Amazon' on the Buy Box. If three or more of these signals are present, the brand controls the marketplace and you are an unwelcome guest.",
    greenLight:
      "Brand has no Brand Store, no Sponsored Brands ads on its own keywords, no A+ content, and listings are all third-party sellers. This is the territory where a new operator can actually compete.",
    redLight:
      "Brand has a custom Brand Store, active Sponsored Brands ads, A+ content everywhere, and Amazon Retail is on the Buy Box. Examples: L'Oreal, Garnier, Maybelline, Procter & Gamble, Nestle, Unilever, Reckitt. Walk away.",
  },
];

export function BundleCandidateGate() {
  const [activeNum, setActiveNum] = useState<number>(1);
  const [passed, setPassed] = useState<Set<number>>(new Set());

  function togglePass(num: number) {
    setPassed((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  const cleared = passed.size;
  const total = GATES.length;
  const allClear = cleared === total;
  const firstFailed = GATES.find((g) => !passed.has(g.num));

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-blue-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🚦 The Pre-Validation Gate
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {cleared} / {total} gates clear
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Three quick checks before you bother with the full Amazon Validation
        Method. Fail any gate and the candidate is dead. Tap a gate to read
        its details, mark it cleared as you confirm it.
      </p>

      <div className="relative space-y-3">
        {GATES.map((g, idx) => {
          const isActive = activeNum === g.num;
          const isCleared = passed.has(g.num);
          const isLast = idx === GATES.length - 1;
          return (
            <div key={g.num} className="relative">
              <button
                type="button"
                onClick={() => setActiveNum(isActive ? 0 : g.num)}
                aria-expanded={isActive}
                className={`w-full text-left rounded-2xl border-2 transition-all duration-200 ${
                  isActive
                    ? "border-blue-400 bg-blue-50 ring-4 ring-blue-300/30 shadow-md"
                    : isCleared
                    ? "border-emerald-300 bg-emerald-50 hover:border-emerald-400"
                    : "border-line bg-surface hover:border-ink/30"
                }`}
              >
                <div className="flex items-start gap-4 p-4 md:p-5">
                  <div
                    className={`flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full font-display text-base font-bold border-2 ${
                      isCleared
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : isActive
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-surface border-ink/20 text-ink-muted"
                    }`}
                  >
                    {isCleared ? "✓" : g.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4
                        className={`font-display text-lg font-bold leading-tight ${
                          isCleared
                            ? "text-emerald-900"
                            : isActive
                            ? "text-blue-900"
                            : "text-ink"
                        }`}
                      >
                        {g.icon} {g.title}
                      </h4>
                    </div>
                    <p className="text-[0.88rem] text-ink-muted leading-snug mt-1 italic">
                      {g.question}
                    </p>
                  </div>
                </div>
              </button>

              {isActive && (
                <div className="mt-2 rounded-2xl border-2 border-blue-200 bg-white p-5 md:p-6">
                  <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-blue-700 mb-1.5">
                    How to check
                  </p>
                  <p className="text-[0.9rem] text-ink leading-relaxed">
                    {g.howToCheck}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
                      <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700 mb-1.5">
                        🟢 Gate clears
                      </p>
                      <p className="text-[0.85rem] text-emerald-900 leading-relaxed">
                        {g.greenLight}
                      </p>
                    </div>
                    <div className="rounded-lg border-2 border-rose-200 bg-rose-50 px-4 py-3">
                      <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1.5">
                        🔴 Gate fails
                      </p>
                      <p className="text-[0.85rem] text-rose-900 leading-relaxed">
                        {g.redLight}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => togglePass(g.num)}
                    className={`mt-4 inline-flex items-center gap-2 h-10 px-5 rounded-full font-mono text-[0.7rem] tracking-[0.1em] uppercase font-bold transition-all duration-200 ${
                      isCleared
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-ink text-white hover:opacity-90"
                    }`}
                  >
                    {isCleared ? "✓ Marked cleared" : "Mark gate cleared"}
                  </button>
                </div>
              )}

              {!isLast && (
                <div className="flex justify-center py-1">
                  <div
                    className={`w-0.5 h-4 ${
                      isCleared ? "bg-emerald-400" : "bg-line"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`mt-5 rounded-2xl border-2 p-5 ${
          allClear
            ? "border-emerald-300 bg-emerald-50"
            : "border-line bg-surface"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none flex-shrink-0">
            {allClear ? "🚀" : "⏳"}
          </span>
          <div>
            <p
              className={`font-mono text-[0.65rem] tracking-[0.18em] uppercase ${
                allClear ? "text-emerald-700" : "text-ink-subtle"
              }`}
            >
              {allClear ? "Pre-validation passed" : "Not yet"}
            </p>
            <p
              className={`font-display text-lg font-bold leading-tight mt-1 ${
                allClear ? "text-emerald-900" : "text-ink"
              }`}
            >
              {allClear
                ? "Move on to the Amazon Validation Method"
                : firstFailed
                ? `Next: ${firstFailed.title}`
                : ""}
            </p>
            <p
              className={`text-[0.88rem] leading-relaxed mt-1.5 ${
                allClear ? "text-emerald-900" : "text-ink-muted"
              }`}
            >
              {allClear
                ? "All three gates clear. This candidate is worth the full 20-minute Amazon validation run in Lesson 3."
                : "Either work through the remaining gates, or move on to the next candidate. Do not try to push a candidate through a failed gate; it is the cheapest decision you will make today."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
