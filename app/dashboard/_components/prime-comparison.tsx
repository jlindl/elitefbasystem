const comparisons = [
  {
    category: "Trust Level",
    prime: "Instant Amazon-backed trust",
    nonPrime: "Unknown seller, buyer hesitation",
    primeIcon: "✅",
    nonPrimeIcon: "❌",
  },
  {
    category: "Customer Filter Visibility",
    prime: "Visible to 80%+ of active buyers",
    nonPrime: 'Hidden from "Prime Only" filters',
    primeIcon: "👁️",
    nonPrimeIcon: "🙈",
  },
  {
    category: "Delivery Speed",
    prime: "Next-day delivery",
    nonPrime: "5-14 day delivery",
    primeIcon: "⚡",
    nonPrimeIcon: "🐢",
  },
  {
    category: "Price Flexibility",
    prime: "Can charge premium prices",
    nonPrime: "Must compete on price",
    primeIcon: "💰",
    nonPrimeIcon: "📉",
  },
  {
    category: "Customer Support",
    prime: "Amazon handles returns & issues",
    nonPrime: "You handle everything",
    primeIcon: "🛡️",
    nonPrimeIcon: "😰",
  },
];

export function PrimeComparison() {
  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-surface overflow-hidden">
      <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-slate-50 border-b-2 border-line">
        <div className="px-4 py-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          Benefit
        </div>
        <div className="px-4 py-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-emerald-700 border-l border-line flex items-center gap-2">
          <span>⭐</span>
          <span>Prime (FBA)</span>
        </div>
        <div className="px-4 py-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-rose-700 border-l border-line flex items-center gap-2">
          <span>📦</span>
          <span>Non-Prime (FBM)</span>
        </div>
      </div>

      {comparisons.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-[1.1fr_1fr_1fr] ${
            i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
          } ${i < comparisons.length - 1 ? "border-b border-line" : ""}`}
        >
          <div className="px-4 py-4 font-semibold text-ink text-sm flex items-center">
            {row.category}
          </div>
          <div className="px-4 py-4 border-l border-line flex items-start gap-2.5">
            <span className="text-lg flex-shrink-0 leading-none mt-0.5">
              {row.primeIcon}
            </span>
            <span className="text-sm text-emerald-900 leading-snug">
              {row.prime}
            </span>
          </div>
          <div className="px-4 py-4 border-l border-line flex items-start gap-2.5">
            <span className="text-lg flex-shrink-0 leading-none mt-0.5">
              {row.nonPrimeIcon}
            </span>
            <span className="text-sm text-rose-900 leading-snug">
              {row.nonPrime}
            </span>
          </div>
        </div>
      ))}

      <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-blue-50/40 border-t-2 border-blue-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0 leading-none">🚀</span>
          <div>
            <h4 className="font-semibold text-ink mb-1 text-[0.95rem]">
              Why We Only Use Prime (FBA)
            </h4>
            <p className="text-sm text-ink-muted leading-relaxed">
              As a new seller with zero history, the Prime badge is your
              superpower. It instantly makes your listings compete with
              established sellers, filters you into the most active buyer
              segment, and lets you maintain healthy profit margins without a
              price war.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
