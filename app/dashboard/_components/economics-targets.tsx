const TARGETS = [
  {
    icon: "💷",
    value: "£5+",
    label: "Net profit per unit",
    reason:
      "Anything thinner and Q4 storage, returns, or a small fee revision will swallow the margin entirely.",
  },
  {
    icon: "📈",
    value: "30%+",
    label: "Margin floor",
    reason:
      "Leaves headroom for fee changes, seasonal swings, and the occasional discount campaign without going negative.",
  },
  {
    icon: "🚀",
    value: "60+",
    label: "Units per month velocity",
    reason:
      "Roughly two sales a day. Below this, fixed storage and account costs start eating the bundle alive.",
  },
  {
    icon: "⏱",
    value: "<45 days",
    label: "Inventory turnover",
    reason:
      "Anything slower means stock starts crossing into long-term storage fee territory, which compounds losses fast.",
  },
] as const;

export function EconomicsTargets() {
  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-emerald-50/40 via-surface to-slate-50/40 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        🎯 The Floor Rule
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        A bundle does not get sourced unless every projected metric clears
        the floor at the same time.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TARGETS.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border-2 border-emerald-200 bg-white p-4 text-center flex flex-col"
          >
            <span className="text-2xl leading-none">{t.icon}</span>
            <p className="font-display text-2xl md:text-3xl font-bold text-emerald-800 mt-2 leading-none">
              {t.value}
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-emerald-700 mt-2 leading-tight">
              {t.label}
            </p>
            <p className="text-[0.75rem] text-ink-muted leading-snug mt-2 flex-1">
              {t.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
