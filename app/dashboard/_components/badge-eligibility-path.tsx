const PATHS = [
  {
    id: "fba",
    icon: "🚚",
    title: "Fulfilment by Amazon (FBA)",
    subtitle: "The practical path",
    recommended: true,
    color: "emerald",
    steps: [
      "Send a single box of stock to an Amazon fulfilment centre.",
      "Amazon scans the units in and adds them to your active inventory.",
      "The Prime badge appears on your listing automatically, within hours.",
    ],
    summary:
      "No application form, no performance criteria, no ongoing upkeep. This is the route the Elite FBA System uses every single time.",
  },
  {
    id: "sfp",
    icon: "🏠",
    title: "Seller-Fulfilled Prime (SFP)",
    subtitle: "The hard path",
    recommended: false,
    color: "amber",
    steps: [
      "Apply and pass Amazon's strict performance audit (often closed to new applicants).",
      "Maintain near-perfect on-time delivery from your own warehouse, every week.",
      "Pass continuous performance checks every month or lose the badge instantly.",
    ],
    summary:
      "Possible but exhausting. Most sellers who try SFP fail the metrics within months, and Amazon has frozen new applications for years at a time to keep quality high.",
  },
] as const;

const COLORS = {
  emerald: {
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    chip: "bg-emerald-200 text-emerald-900",
    subtitleColor: "text-emerald-700",
  },
  amber: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    chip: "bg-amber-200 text-amber-900",
    subtitleColor: "text-amber-700",
  },
} as const;

export function BadgeEligibilityPath() {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-3">
      {PATHS.map((path) => {
        const c = COLORS[path.color];
        return (
          <div
            key={path.id}
            className={`relative rounded-2xl border-2 ${c.border} ${c.bg} p-5`}
          >
            {path.recommended && (
              <span className="absolute -top-2.5 right-4 inline-flex h-6 px-2.5 items-center rounded-full bg-emerald-500 text-white font-mono text-[0.6rem] font-bold tracking-[0.12em] uppercase shadow-sm">
                ✓ Recommended
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{path.icon}</span>
              <div>
                <p
                  className={`font-mono text-[0.6rem] tracking-[0.12em] uppercase ${c.subtitleColor}`}
                >
                  {path.subtitle}
                </p>
                <h4 className="font-display text-[1.05rem] font-bold text-ink mt-0.5 leading-tight">
                  {path.title}
                </h4>
              </div>
            </div>
            <ol className="space-y-2.5 mb-4">
              {path.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[0.85rem] text-ink leading-snug"
                >
                  <span
                    className={`flex-shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full ${c.chip} font-mono text-[0.7rem] font-bold`}
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-[0.8rem] text-ink-muted italic leading-relaxed border-t border-line pt-3">
              {path.summary}
            </p>
          </div>
        );
      })}
    </div>
  );
}
