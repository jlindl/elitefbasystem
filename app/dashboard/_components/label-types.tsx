"use client";

import { useState } from "react";

type Label = {
  id: string;
  icon: string;
  name: string;
  scope: "Per unit" | "Per outer box" | "Per outer box (conditional)";
  required: boolean;
  whatItIs: string;
  whereToPrint: string;
  whereItGoes: string;
  watchOut?: string;
};

const LABELS: Label[] = [
  {
    id: "fnsku",
    icon: "🏷️",
    name: "FNSKU Label",
    scope: "Per unit",
    required: true,
    whatItIs:
      "A barcode-and-text label unique to your SKU. Encodes which seller, which product, and which condition. Amazon generates one FNSKU per ASIN per seller.",
    whereToPrint:
      "Inside the Send to Amazon wizard, on the step where Amazon asks who applies the labels. Pick 'Merchant labels' and Amazon emits a PDF containing one FNSKU label for every unit in the shipment, ready to print on adhesive label paper (commonly Avery L7160 or similar 21-per-A4-sheet layout).",
    whereItGoes:
      "Stuck to the outside of each polybag on the flattest face. One label per unit. Must be visible and scannable without unfolding or opening the bag.",
    watchOut:
      "Do not cover any visible barcode on the product itself with the FNSKU. If there is one showing through the bag, position the FNSKU so it is the only barcode the scanner can pick up.",
  },
  {
    id: "shipping",
    icon: "📮",
    name: "Carrier Shipping Label",
    scope: "Per outer box",
    required: true,
    whatItIs:
      "The label the carrier uses to route your box. Contains the destination Amazon fulfilment centre address, the tracking barcode, and a small Amazon shipment ID barcode. Generated automatically when you confirm and pay for shipping inside the Seller Central wizard.",
    whereToPrint:
      "The wizard delivers it as a PDF after you confirm the carrier and pay. Print on standard A4 paper at 100% scale (never 'Fit to page', which shrinks the barcode below scanner tolerance). One sheet per outer box in the shipment.",
    whereItGoes:
      "Taped to the outside of the box on the largest flat face, away from any seams. Use clear tape, and never tape over the barcode itself; the scanner has to read it cleanly through any tape that does cross it.",
    watchOut:
      "If the box has any older shipping labels from a previous use, peel or cover them completely before applying the new one. A box with two visible barcodes confuses carrier sorting and the box gets misrouted.",
  },
  {
    id: "shipment-id",
    icon: "🆔",
    name: "Amazon Shipment ID",
    scope: "Per outer box",
    required: true,
    whatItIs:
      "A small Amazon-specific label that identifies which shipment this box belongs to. Often printed on the same PDF as the carrier shipping label, sometimes on a second sheet. Tells the receiving warehouse which inbound plan this box is part of so the units get checked into the right SKU.",
    whereToPrint:
      "Always printed together with the carrier shipping label inside the wizard. Cut along the dividing line between the two labels and apply each separately.",
    whereItGoes:
      "Taped to the outside of the box on a flat face, ideally adjacent to or just below the carrier shipping label.",
  },
  {
    id: "heavy",
    icon: "⚠️",
    name: "Heavy Package Warning",
    scope: "Per outer box (conditional)",
    required: false,
    whatItIs:
      "A bright black-and-yellow warning sticker reading 'HEAVY PACKAGE - TEAM LIFT' or similar. Required on any outer box weighing more than 15 kg. Tells the carrier and warehouse staff to treat the box as a two-person lift.",
    whereToPrint:
      "Sold as pre-printed sticker rolls from any packaging supplier. You can also print your own on A6 or A5 fluorescent label paper, but pre-printed is cheaper per unit once you ship more than a handful.",
    whereItGoes:
      "On the outside of the box, on the same face as or adjacent to the shipping label, where carrier staff will see it before lifting.",
    watchOut:
      "Conditional, not optional. If your box weighs over 15 kg and you ship it without this label, Amazon can refuse the box on arrival and charge a non-compliance fee on top of the return shipping cost.",
  },
  {
    id: "do-not-separate",
    icon: "🔗",
    name: "Do Not Separate (bundle label)",
    scope: "Per unit",
    required: false,
    whatItIs:
      "A bright yellow-and-black label reading 'DO NOT SEPARATE - SOLD AS SET'. Goes on every polybag containing a multi-unit single-SKU bundle (a 3-pack, a 2-pack, a complementary pair). Already covered in Lesson 2; printed and applied at the polybagging stage, not at the shipment-creation stage.",
    whereToPrint:
      "Sold as pre-printed sticker rolls. You can also print your own if you want a branded version on coloured label paper.",
    whereItGoes:
      "Front face of every polybag that contains more than one physical unit. Alongside the FNSKU, not covering it.",
    watchOut:
      "Mandatory for multi-unit bundles even though it is listed as 'optional' here in terms of the inbound shipment flow; the bundle itself is non-compliant without it.",
  },
];

const SCOPE_COLOR = {
  "Per unit": "bg-pink-100 text-pink-800",
  "Per outer box": "bg-blue-100 text-blue-800",
  "Per outer box (conditional)": "bg-amber-100 text-amber-800",
} as const;

export function LabelTypes() {
  const [activeId, setActiveId] = useState<string>(LABELS[0].id);
  const active = LABELS.find((l) => l.id === activeId) ?? LABELS[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-pink-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🏷️ The Five Label Types
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          3 always · 2 conditional
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        An FBA shipment uses up to five different kinds of label. Three you
        will print on every shipment; two are conditional on the bundle or
        box. Tap each below for what it is, where to print it, and where on
        the package it goes.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-5">
        {LABELS.map((l) => {
          const isActive = activeId === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setActiveId(l.id)}
              className={`text-left rounded-xl border-2 px-3 py-3 transition-all duration-150 ${
                isActive
                  ? "border-pink-400 bg-pink-50 ring-2 ring-pink-200"
                  : "border-line bg-surface hover:border-ink/30"
              }`}
            >
              <span className="text-xl leading-none">{l.icon}</span>
              <p
                className={`font-display font-semibold text-[0.8rem] leading-tight mt-1 ${
                  isActive ? "text-pink-900" : "text-ink"
                }`}
              >
                {l.name}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-pink-300 bg-white p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-line">
          <span className="text-4xl leading-none flex-shrink-0">
            {active.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <h4 className="font-display text-xl font-bold text-ink leading-tight">
                {active.name}
              </h4>
              <span
                className={`inline-flex h-5 px-2 items-center rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase ${SCOPE_COLOR[active.scope]}`}
              >
                {active.scope}
              </span>
              <span
                className={`inline-flex h-5 px-2 items-center rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase ${
                  active.required
                    ? "bg-rose-100 text-rose-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {active.required ? "Always required" : "Conditional"}
              </span>
            </div>
          </div>
        </div>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-pink-700 mb-1.5">
          What it is
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed">
          {active.whatItIs}
        </p>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-pink-700 mt-4 mb-1.5">
          How to print it
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed">
          {active.whereToPrint}
        </p>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-pink-700 mt-4 mb-1.5">
          Where it goes on the package
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed">
          {active.whereItGoes}
        </p>

        {active.watchOut && (
          <div className="mt-4 rounded-lg border-l-4 border-rose-500 bg-rose-50 px-4 py-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1">
              ⚠️ Watch out
            </p>
            <p className="text-[0.85rem] text-rose-900 leading-relaxed">
              {active.watchOut}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
