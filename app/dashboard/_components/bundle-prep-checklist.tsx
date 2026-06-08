"use client";

import { useState } from "react";

type Group = {
  id: string;
  icon: string;
  title: string;
  items: { id: string; label: string; detail: string }[];
};

const GROUPS: Group[] = [
  {
    id: "stock",
    icon: "📦",
    title: "Stock",
    items: [
      {
        id: "stock-bundles",
        label: "Your finished bundles",
        detail:
          "However many units you plan to send. For a first inbound shipment, 5 to 10 units is a sensible range while you validate sell-through speed.",
      },
      {
        id: "stock-spares",
        label: "One or two spare bundles",
        detail:
          "Useful as test units for measuring the final packed dimensions and weight, and to keep at home in case you ever need to re-photograph the product.",
      },
    ],
  },
  {
    id: "polybag",
    icon: "🛍️",
    title: "Polybag supplies",
    items: [
      {
        id: "polybag-bags",
        label: "Clear polybags sized to your bundle",
        detail:
          "Slightly larger than the bundle so the bag closes flat without straining. Polythene, transparent, at least 38 microns thick for FBA.",
      },
      {
        id: "polybag-fnsku",
        label: "FNSKU labels (1 per unit)",
        detail:
          "The barcode-and-text label Amazon generates for your SKU. Printed on adhesive label paper. Covered in detail in Lesson 5.",
      },
      {
        id: "polybag-suffocation",
        label: "Suffocation warning text on the bag",
        detail:
          "Required on every poly bag over 12.5 cm wide. Either buy bags with the warning pre-printed, or print and apply the warning yourself.",
      },
      {
        id: "polybag-do-not-separate",
        label: "Do Not Separate labels (multi-unit bundles only)",
        detail:
          "Required if your single SKU contains more than one unit (e.g. a 3-pack). Tells Amazon's warehouse to keep the units together as one sellable unit.",
      },
      {
        id: "polybag-brand-sticker",
        label: "Brand or shop sticker (optional)",
        detail:
          "A small sticker with your trading name on it adds a professional touch. Not required by Amazon but doubles as the permanent brand marker for your GTIN exemption (Module 4 Lesson 2).",
      },
    ],
  },
  {
    id: "box",
    icon: "📦",
    title: "Outer box supplies",
    items: [
      {
        id: "box-carton",
        label: "Cardboard outer box",
        detail:
          "Double-walled corrugated cardboard, large enough to hold all your polybagged units with a little padding around them. Sized to stay under Amazon's box limits (covered in Lesson 3).",
      },
      {
        id: "box-tape",
        label: "Strong packing tape",
        detail:
          "50mm-wide brown or clear parcel tape. Avoid masking tape or any tape that peels in transit.",
      },
      {
        id: "box-fill",
        label: "Void fill (kraft paper or air pillows)",
        detail:
          "Anything that fills empty space inside the box so the contents do not move during transit. Paper is cheaper, air pillows are lighter.",
      },
      {
        id: "box-heavy-warning",
        label: "Heavy package warning label (if over 15kg)",
        detail:
          "A black-and-yellow sticker stating the package weighs over 15kg, applied to the outside of any box that does. Covered in Lesson 3.",
      },
    ],
  },
  {
    id: "tools",
    icon: "🧰",
    title: "Tools",
    items: [
      {
        id: "tools-scale",
        label: "Kitchen or parcel scale",
        detail:
          "Anything that reads up to 25kg accurately. You will weigh both individual units and the finished outer box.",
      },
      {
        id: "tools-tape",
        label: "Tape measure or 30cm ruler",
        detail:
          "For measuring the outer box dimensions before you create the shipment in Seller Central.",
      },
      {
        id: "tools-printer",
        label: "Printer + adhesive label paper",
        detail:
          "Any inkjet or laser printer that can handle 100g+ adhesive label paper. A dedicated thermal label printer makes this easier long-term but is not required to start.",
      },
    ],
  },
];

export function BundlePrepChecklist() {
  const [done, setDone] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const total = GROUPS.reduce((acc, g) => acc + g.items.length, 0);
  const cleared = done.size;

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-blue-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🧰 Pre-Inbound Supplies Checklist
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {cleared} / {total} ready
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Everything you need on the table before you start polybagging. Tick
        each item as you confirm you have it.
      </p>

      <div className="space-y-4">
        {GROUPS.map((g) => (
          <div
            key={g.id}
            className="rounded-2xl border-2 border-line bg-surface p-4"
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-xl leading-none">{g.icon}</span>
              <h4 className="font-display text-base font-bold text-ink leading-tight">
                {g.title}
              </h4>
            </div>
            <ul className="space-y-2">
              {g.items.map((item) => {
                const isDone = done.has(item.id);
                return (
                  <li key={item.id}>
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        aria-pressed={isDone}
                        className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors duration-150 ${
                          isDone
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-ink/20 bg-white hover:border-ink/40"
                        }`}
                      >
                        {isDone && (
                          <span className="text-[0.7rem] font-bold leading-none">
                            ✓
                          </span>
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[0.9rem] leading-snug ${
                            isDone
                              ? "text-ink-muted line-through"
                              : "text-ink"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p className="text-[0.82rem] text-ink-muted leading-relaxed mt-1.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
