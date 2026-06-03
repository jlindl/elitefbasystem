const DEDUCTIONS = [
  {
    icon: "💼",
    label: "1. Referral Fee",
    sub: "15% Commission",
    detail: "Amazon's commission for putting your listing in front of their buyer base.",
    color: "blue",
  },
  {
    icon: "📦",
    label: "2. FBA Fulfilment Fee",
    sub: "Size & Weight Picker / Packer Cost",
    detail: "Pulled from the shelf, packed in an Amazon box, shipped to the customer.",
    color: "purple",
  },
  {
    icon: "🏬",
    label: "3. Storage Fee",
    sub: "Monthly Cubic Foot Rent",
    detail: "Rent on every cubic foot your stock occupies in the warehouse.",
    color: "amber",
  },
] as const;

const COLORS = {
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    chip: "bg-blue-100 text-blue-800",
    accent: "text-blue-700",
  },
  purple: {
    border: "border-purple-300",
    bg: "bg-purple-50",
    chip: "bg-purple-100 text-purple-800",
    accent: "text-purple-700",
  },
  amber: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    chip: "bg-amber-100 text-amber-800",
    accent: "text-amber-700",
  },
} as const;

export function FeeBreakdownDiagram() {
  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-slate-50/40 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-5">
        💰 Where Your Money Goes
      </p>

      <div className="rounded-xl border-2 border-ink/80 bg-ink text-white px-5 py-4 text-center shadow-sm">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-white/60">
          Customer Retail Price
        </p>
        <p className="font-display text-xl md:text-2xl font-bold mt-1">
          What the buyer pays at checkout
        </p>
      </div>

      <div className="flex justify-center my-2">
        <div className="w-0.5 h-6 bg-ink/30"></div>
      </div>

      <p className="text-center font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle mb-3">
        Amazon Deducts ↓
      </p>

      <div className="grid gap-2.5">
        {DEDUCTIONS.map((d, i) => {
          const c = COLORS[d.color];
          return (
            <div
              key={i}
              className={`rounded-xl border-2 ${c.border} ${c.bg} p-4 flex items-start gap-3`}
            >
              <span className="text-2xl flex-shrink-0 leading-none">
                {d.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h4 className={`font-display font-bold ${c.accent}`}>
                    {d.label}
                  </h4>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em] uppercase font-semibold ${c.chip}`}
                  >
                    {d.sub}
                  </span>
                </div>
                <p className="text-[0.85rem] text-ink leading-snug mt-1">
                  {d.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-2">
        <div className="w-0.5 h-6 bg-emerald-400"></div>
      </div>

      <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 px-5 py-4 text-center">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700">
          = Your Net Cash Profile
        </p>
        <p className="font-display text-xl md:text-2xl font-bold text-emerald-900 mt-1">
          What actually lands in your account
        </p>
      </div>
    </div>
  );
}
