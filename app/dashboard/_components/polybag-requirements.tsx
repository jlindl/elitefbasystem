"use client";

import { useState } from "react";

type Requirement = {
  id: string;
  num: number;
  icon: string;
  title: string;
  required: boolean;
  what: string;
  where: string;
  watchOut?: string;
};

const REQUIREMENTS: Requirement[] = [
  {
    id: "fnsku",
    num: 1,
    icon: "🏷️",
    title: "FNSKU Label",
    required: true,
    what: "The barcode-and-text label Amazon generates for your specific SKU. It encodes which seller, which product, and which condition. Every individual sellable unit needs one.",
    where:
      "Stuck to the outside of the polybag on the flattest face, clearly visible and not obscured by folds, tape, or other labels. The barcode must scan flat.",
    watchOut:
      "Do not cover any existing barcode on the product (if one happens to be visible through the bag) with the FNSKU label. Amazon's scanner can pick up the wrong code. Position the FNSKU so it is the only scannable barcode on the package.",
  },
  {
    id: "suffocation",
    num: 2,
    icon: "⚠️",
    title: "Suffocation Warning",
    required: true,
    what: "A printed warning notice required on every polybag with an opening 12.5 cm or wider. The exact wording is mandated by Amazon: 'WARNING: To avoid danger of suffocation, keep this plastic bag away from babies and children. Do not use this bag in cribs, beds, carriages or playpens. This bag is not a toy.'",
    where:
      "Either pre-printed directly onto the polybag (the easiest route, sold this way on most supply stores), or as a separate printed label attached to the bag. Front face, large enough to read at arm's length.",
    watchOut:
      "Pre-printed bags are about 10p more expensive per bag but save you a label-printing step every time. For a first shipment of 25 to 50 units, pre-printed is the cleaner choice.",
  },
  {
    id: "do-not-separate",
    num: 3,
    icon: "🔗",
    title: "Do Not Separate Label",
    required: true,
    what: "A bright label, usually red with bold black text reading 'DO NOT SEPARATE - SOLD AS SET', required on every bundle that contains more than one physical unit sold under a single SKU (a 3-pack, a 2-pack, a complementary pair).",
    where:
      "Front of the polybag, clearly visible alongside the FNSKU. Amazon's warehouse staff need to see it at a glance so they pick the whole bundle together.",
    watchOut:
      "If your bundle is a single unit (one shampoo bottle, one set of cutlery in one box), this label is not required. It is mandatory for any multi-unit single-SKU bundle, which is most of what we sell in this course.",
  },
  {
    id: "brand-sticker",
    num: 4,
    icon: "🎨",
    title: "Brand or Shop Sticker",
    required: false,
    what: "A small adhesive sticker with your trading name, logo, or shop name. Often a 30 to 50 mm circle or square in a brand colour. Adds a finished feel and signals to the customer that someone actually packed this.",
    where:
      "Anywhere visible on the polybag. Front face works well; some sellers put it on the back so it does not compete with the FNSKU label for visual attention.",
    watchOut:
      "Optional from Amazon's perspective, but this same sticker doubles as the permanent brand marker that satisfies the GTIN exemption requirement from Module 4 Lesson 2. Worth applying for that reason alone.",
  },
];

export function PolybagRequirements() {
  const [activeId, setActiveId] = useState<string>(REQUIREMENTS[0].id);
  const active =
    REQUIREMENTS.find((r) => r.id === activeId) ?? REQUIREMENTS[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-amber-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🛍️ The Polybag Anatomy
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          3 required · 1 optional
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Every polybagged bundle you send into FBA carries the same set of
        labels and markings. Three are required by Amazon for the bundle to
        pass receiving; one is optional but worth doing. Tap a requirement
        below for what it is, where it goes, and the gotcha to avoid.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {REQUIREMENTS.map((r) => {
          const isActive = activeId === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveId(r.id)}
              className={`text-left rounded-xl border-2 px-3 py-3 transition-all duration-150 ${
                isActive
                  ? "border-amber-400 bg-amber-50 ring-2 ring-amber-200"
                  : "border-line bg-surface hover:border-ink/30"
              }`}
            >
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-xl leading-none">{r.icon}</span>
                <span className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-ink-subtle">
                  #{r.num}
                </span>
              </div>
              <p
                className={`font-display font-semibold text-[0.8rem] leading-tight mt-1 ${
                  isActive ? "text-amber-900" : "text-ink"
                }`}
              >
                {r.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-line">
          <span className="text-4xl leading-none flex-shrink-0">
            {active.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <h4 className="font-display text-xl font-bold text-ink leading-tight">
                {active.title}
              </h4>
              <span
                className={`inline-flex h-5 px-2 items-center rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase ${
                  active.required
                    ? "bg-rose-100 text-rose-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {active.required ? "Required" : "Optional"}
              </span>
            </div>
          </div>
        </div>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-amber-700 mb-1.5">
          What it is
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed">{active.what}</p>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-amber-700 mt-4 mb-1.5">
          Where it goes
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed">
          {active.where}
        </p>

        {active.watchOut && (
          <div className="mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mb-1">
              ⚠️ Watch out
            </p>
            <p className="text-[0.85rem] text-amber-900 leading-relaxed">
              {active.watchOut}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
