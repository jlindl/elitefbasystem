"use client";

type Row = { icon: string; label: string; value: string };

type SideData = {
  name: string;
  example: string;
  competition: string;
  sale: number;
  cogs: number;
  fees: number;
  profit: number;
  tone: "rose" | "emerald";
  metrics: Row[];
};

const SINGLE: SideData = {
  name: "Single Branded Item",
  example: "e.g., a single car sponge",
  competition: "35+ sellers fighting the same Buy Box",
  sale: 5.99,
  cogs: 1.5,
  fees: 3.5,
  profit: 0.99,
  tone: "rose",
  metrics: [
    { icon: "🏭", label: "Sourcing Cost", value: "£1.50" },
    { icon: "🏷️", label: "Amazon Selling Price", value: "£5.99" },
    { icon: "⚔️", label: "Competition", value: "35+ sellers" },
    { icon: "📊", label: "Referral Fee (15%)", value: "£0.90" },
    { icon: "📦", label: "FBA Fee", value: "£2.60" },
    { icon: "💰", label: "Total Fees", value: "£3.50" },
    { icon: "✅", label: "Net Profit per Unit", value: "£0.99" },
  ],
};

const BUNDLE: SideData = {
  name: "Your Owned Bundle",
  example: "Multi-pack or complementary set",
  competition: "0 sellers (you own the ASIN)",
  sale: 15.99,
  cogs: 4.5,
  fees: 6.0,
  profit: 5.49,
  tone: "emerald",
  metrics: [
    { icon: "🏭", label: "Sourcing Cost", value: "£4.50" },
    { icon: "🏷️", label: "Amazon Selling Price", value: "£15.99" },
    { icon: "👑", label: "Competition", value: "0 sellers" },
    { icon: "📊", label: "Referral Fee (15%)", value: "£2.40" },
    { icon: "📦", label: "FBA Fee", value: "£3.60" },
    { icon: "💰", label: "Total Fees", value: "£6.00" },
    { icon: "✅", label: "Net Profit per Unit", value: "£5.49" },
  ],
};

const TONES = {
  rose: {
    border: "border-rose-300",
    softBg: "bg-rose-50",
    rowBg: "bg-white",
    rowBorder: "border-rose-100",
    text: "text-rose-900",
    sub: "text-rose-700",
    chip: "bg-rose-100 text-rose-800",
  },
  emerald: {
    border: "border-emerald-300",
    softBg: "bg-emerald-50",
    rowBg: "bg-white",
    rowBorder: "border-emerald-100",
    text: "text-emerald-900",
    sub: "text-emerald-700",
    chip: "bg-emerald-100 text-emerald-800",
  },
} as const;

function gbp(n: number) {
  return `£${n.toFixed(2)}`;
}

function margin(s: SideData) {
  return (s.profit / s.sale) * 100;
}

function SideCard({ data }: { data: SideData }) {
  const t = TONES[data.tone];
  return (
    <div
      className={`rounded-2xl border-2 ${t.border} ${t.softBg} p-5 md:p-6`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className={`font-display text-lg md:text-xl font-bold ${t.text} leading-tight`}>
            {data.name}
          </h3>
          <p className={`text-[0.8rem] ${t.sub} mt-0.5 italic`}>
            {data.example}
          </p>
        </div>
        <span
          className={`flex-shrink-0 inline-flex items-baseline gap-1 rounded-full px-2 py-1 font-mono text-[0.6rem] tracking-[0.1em] uppercase font-semibold ${t.chip}`}
        >
          {margin(data).toFixed(1)}% margin
        </span>
      </div>

      <div className="space-y-2">
        {data.metrics.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${t.rowBg} border ${t.rowBorder}`}
          >
            <span className="text-lg flex-shrink-0 leading-none">{m.icon}</span>
            <p className={`flex-1 font-mono text-[0.7rem] tracking-[0.1em] uppercase ${t.sub}`}>
              {m.label}
            </p>
            <p className={`font-display font-bold ${t.text}`}>{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProportionalBar({
  side,
  tone,
}: {
  side: SideData;
  tone: "rose" | "emerald";
}) {
  const total = side.cogs + side.fees + side.profit;
  const cogsPct = (side.cogs / total) * 100;
  const feesPct = (side.fees / total) * 100;
  const profitPct = (side.profit / total) * 100;
  const t = TONES[tone];

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <p className={`font-display font-bold ${t.text}`}>
          {side.name} <span className="font-normal text-ink-muted">·</span>{" "}
          <span className="font-mono text-[0.75rem] text-ink-muted">
            {gbp(side.sale)} sale
          </span>
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle">
          Net {gbp(side.profit)}
        </p>
      </div>
      <div className="flex h-8 rounded-lg overflow-hidden border border-line bg-line">
        <div
          className="flex items-center justify-center bg-rose-500 text-white text-[0.7rem] font-bold transition-all duration-300"
          style={{ width: `${cogsPct}%` }}
          title={`COGS: ${gbp(side.cogs)}`}
        >
          {cogsPct > 12 ? gbp(side.cogs) : ""}
        </div>
        <div
          className="flex items-center justify-center bg-amber-500 text-white text-[0.7rem] font-bold transition-all duration-300"
          style={{ width: `${feesPct}%` }}
          title={`Fees: ${gbp(side.fees)}`}
        >
          {feesPct > 12 ? gbp(side.fees) : ""}
        </div>
        <div
          className="flex items-center justify-center bg-emerald-500 text-white text-[0.7rem] font-bold transition-all duration-300"
          style={{ width: `${profitPct}%` }}
          title={`Profit: ${gbp(side.profit)}`}
        >
          {profitPct > 12 ? gbp(side.profit) : ""}
        </div>
      </div>
    </div>
  );
}

export function UnitEconomics() {
  const profitDifference = BUNDLE.profit - SINGLE.profit;
  const profitMultiple = (BUNDLE.profit / SINGLE.profit).toFixed(1);
  const revenueIncrease = (
    ((BUNDLE.sale - SINGLE.sale) / SINGLE.sale) *
    100
  ).toFixed(0);
  const feesIncrease = (
    ((BUNDLE.fees - SINGLE.fees) / SINGLE.fees) *
    100
  ).toFixed(0);

  return (
    <div className="my-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SideCard data={SINGLE} />
        <SideCard data={BUNDLE} />
      </div>

      <div className="rounded-2xl border-2 border-line bg-surface p-5 md:p-6">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
          📊 Where Every Pound of Each Sale Goes
        </p>
        <p className="text-[0.85rem] text-ink-muted mb-5">
          The bands are proportional to the actual share of each sale taken
          by sourcing cost, Amazon fees, and what lands in your account.
        </p>
        <div className="space-y-5">
          <ProportionalBar side={SINGLE} tone="rose" />
          <ProportionalBar side={BUNDLE} tone="emerald" />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 mt-5 border-t border-line">
          <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle">
            <span className="w-3 h-3 rounded bg-rose-500"></span>
            <span>COGS</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle">
            <span className="w-3 h-3 rounded bg-amber-500"></span>
            <span>Amazon Fees</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span>Net Profit</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          tone="blue"
          label="Profit Difference"
          value={gbp(profitDifference)}
          caption={`Bundle earns ${profitMultiple}x more`}
        />
        <StatTile
          tone="purple"
          label="Revenue Increase"
          value={`+${revenueIncrease}%`}
          caption="Higher AOV at the same fee structure"
        />
        <StatTile
          tone="amber"
          label="Fee Increase"
          value={`+${feesIncrease}%`}
          caption={`But profit grows ${profitMultiple}x`}
        />
        <StatTile
          tone="emerald"
          label="Buy Box Ownership"
          value="100%"
          caption="No competition on a unique ASIN"
        />
      </div>
    </div>
  );
}

const STAT_TONES = {
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-900",
    sub: "text-blue-700",
  },
  purple: {
    border: "border-purple-200",
    bg: "bg-purple-50",
    text: "text-purple-900",
    sub: "text-purple-700",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-900",
    sub: "text-amber-700",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    sub: "text-emerald-700",
  },
} as const;

function StatTile({
  tone,
  label,
  value,
  caption,
}: {
  tone: keyof typeof STAT_TONES;
  label: string;
  value: string;
  caption: string;
}) {
  const t = STAT_TONES[tone];
  return (
    <div className={`rounded-2xl border-2 ${t.border} ${t.bg} p-4 text-center`}>
      <p className={`font-mono text-[0.6rem] tracking-[0.12em] uppercase ${t.sub}`}>
        {label}
      </p>
      <p className={`font-display text-2xl md:text-3xl font-bold ${t.text} mt-1.5`}>
        {value}
      </p>
      <p className={`text-[0.7rem] ${t.sub} mt-1 leading-snug`}>{caption}</p>
    </div>
  );
}
