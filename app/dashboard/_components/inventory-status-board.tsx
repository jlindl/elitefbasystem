const STATUSES = [
  {
    id: "inbound",
    icon: "🚚",
    title: "Inbound",
    short: "In transit",
    detail:
      "Units that are currently in transit via truck or carrier, or being checked in at the loading dock at the fulfilment centre.",
    accent: "amber",
  },
  {
    id: "available",
    icon: "✅",
    title: "Available",
    short: "Live and selling",
    detail:
      "Ready for customers to buy instantly with Prime delivery. This is the bucket that earns you money.",
    accent: "emerald",
  },
  {
    id: "reserved",
    icon: "🔒",
    title: "Reserved",
    short: "Temporarily held",
    detail:
      "Units that are either being moved between regional warehouses by Amazon, or are already tied to a pending customer order awaiting dispatch.",
    accent: "blue",
  },
] as const;

const COLORS = {
  amber: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    chip: "bg-amber-100 text-amber-800",
    iconBg: "bg-amber-100",
  },
  emerald: {
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    chip: "bg-emerald-100 text-emerald-800",
    iconBg: "bg-emerald-100",
  },
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    chip: "bg-blue-100 text-blue-800",
    iconBg: "bg-blue-100",
  },
} as const;

export function InventoryStatusBoard() {
  return (
    <div className="my-8">
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-3">
        📊 Inventory Health Dashboard
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {STATUSES.map((s) => {
          const c = COLORS[s.accent];
          return (
            <div
              key={s.id}
              className={`rounded-2xl border-2 ${c.border} ${c.bg} p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${c.iconBg} text-2xl`}
                >
                  {s.icon}
                </span>
                <span
                  className={`inline-flex h-6 px-2.5 items-center rounded-full ${c.chip} font-mono text-[0.6rem] font-bold tracking-[0.12em] uppercase`}
                >
                  {s.short}
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-ink mb-2">
                {s.title}
              </h4>
              <p className="text-[0.85rem] text-ink-muted leading-relaxed">
                {s.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
