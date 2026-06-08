type Stage = {
  range: string;
  icon: string;
  title: string;
  what: string;
  status: "you" | "carrier" | "amazon" | "live";
};

const STAGES: Stage[] = [
  {
    range: "Day 0",
    icon: "🖨️",
    title: "Print labels, hand box to the carrier",
    what: "You finish polybagging, pack the outer box, apply all labels, and either drop the box at a UPS or DPD pickup point or book a doorstep collection through the carrier's website. The shipment is now out of your hands.",
    status: "you",
  },
  {
    range: "Day 1 to 3",
    icon: "🚚",
    title: "In transit with the carrier",
    what: "UPS or DPD route the box to the Amazon fulfilment centre printed on the shipping label. Tracking updates flow into Seller Central automatically (one of the benefits of using the Partnered Carrier route). Most UK-to-UK FC shipments arrive in 1 to 3 working days.",
    status: "carrier",
  },
  {
    range: "Day 3 to 5",
    icon: "🏬",
    title: "Box received at the fulfilment centre",
    what: "The shipment status in Seller Central moves to 'Delivered' the moment the carrier hands it over. The box then sits in a receiving queue at the FC. Status updates again to 'Receiving' when the warehouse team starts processing it.",
    status: "amazon",
  },
  {
    range: "Day 5 to 10",
    icon: "📥",
    title: "Units checked in to your inventory",
    what: "The warehouse team scans each polybag, confirms the FNSKU, increments your sellable inventory count, and shelves the units. This step has the longest variance: quiet weeks are 1 to 2 days; peak weeks (mid-November, mid-December, Prime Day week) can take 5 to 7 days on top of transit.",
    status: "amazon",
  },
  {
    range: "Day 7 to 12",
    icon: "✅",
    title: "Listing buy box goes live, Prime-eligible",
    what: "As soon as the FC marks units as sellable, your buy box flips from 'Currently unavailable' to active with a price and the Prime badge. Your listing is now real. First sale typically happens within 24 to 72 hours of going live if your title, images, and price are competitive.",
    status: "live",
  },
];

const STATUS_META = {
  you: { color: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50", label: "You" },
  carrier: { color: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", label: "Carrier" },
  amazon: { color: "bg-violet-500", text: "text-violet-700", bg: "bg-violet-50", label: "Amazon FC" },
  live: { color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", label: "Live" },
} as const;

export function DeliveryTimeline() {
  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-cyan-50/30 p-5 md:p-6">
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        🚚 From Dispatch to Sellable
      </p>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        From the moment you hand the box to UPS or DPD, the typical timeline
        to the listing going live for customers is 7 to 12 working days.
        Quiet periods are faster, Q4 weeks are slower.
      </p>

      <div className="relative">
        <div
          className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-line"
          aria-hidden="true"
        />
        <ol className="space-y-4 relative">
          {STAGES.map((s) => {
            const meta = STATUS_META[s.status];
            return (
              <li key={s.title} className="flex items-start gap-4">
                <div
                  className={`relative z-10 flex-shrink-0 h-10 w-10 rounded-full border-2 border-white ${meta.color} flex items-center justify-center text-base shadow-sm`}
                  aria-hidden="true"
                >
                  {s.icon}
                </div>
                <div
                  className={`flex-1 min-w-0 rounded-2xl border-2 border-line bg-white p-4`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
                      {s.range}
                    </p>
                    <span
                      className={`inline-flex h-5 px-2 items-center rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase ${meta.bg} ${meta.text}`}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-bold text-ink leading-tight">
                    {s.title}
                  </h4>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed mt-1.5">
                    {s.what}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-5 rounded-2xl border-2 border-cyan-300 bg-cyan-50/60 p-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none flex-shrink-0">🤝</span>
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-cyan-800 mb-1">
              Amazon Partner Carriers in the UK
            </p>
            <h4 className="font-display text-base font-bold text-cyan-900 leading-tight">
              Use UPS or DPD via the Partnered Carrier flow
            </h4>
            <p className="text-[0.88rem] text-cyan-900 leading-relaxed mt-2">
              Amazon's UK partner carriers are UPS and DPD. Inside the Send to
              Amazon wizard, both appear under 'Partnered Carrier' and both
              ship at a rate Amazon has negotiated, materially cheaper than
              what you would pay buying the same service at retail. Tracking
              also feeds back into Seller Central automatically so you do not
              need to manually update inbound status. Use Partnered Carrier
              for every v1 shipment unless you have a personal courier account
              that beats Amazon's rate, which is rare for shipments under 50
              kg.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
