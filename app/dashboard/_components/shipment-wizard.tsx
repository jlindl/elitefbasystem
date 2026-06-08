"use client";

import { useState } from "react";

type Step = {
  num: number;
  icon: string;
  title: string;
  summary: string;
  detail: string;
  watchOut?: string;
};

const STEPS: Step[] = [
  {
    num: 1,
    icon: "🧭",
    title: "Open the Send to Amazon flow",
    summary: "Inventory → Manage FBA Inventory → Send / Replenish Inventory.",
    detail:
      "From the Seller Central home screen, hover the Inventory menu, click Manage FBA Inventory, find your SKU in the list, click the dropdown next to it, and select Send/Replenish Inventory. Amazon takes you into the multi-page shipment wizard from there. Bookmark this page; you will use it every time you reorder.",
  },
  {
    num: 2,
    icon: "🧮",
    title: "Confirm units and case-pack",
    summary: "How many units, and how they are grouped inside the box.",
    detail:
      "Enter the total number of units you are sending. For a v1 bundle shipment, choose 'Individual products' (not case-packed) because every polybagged unit is identical and Amazon receives them one by one. Case-pack mode is only useful once you ship 50+ identical units in a single inner carton, which is a later optimisation.",
    watchOut:
      "Double-check the unit count matches what you physically have in the box. A mismatch between your declared count and what arrives at the warehouse is the most common cause of a missing-inventory case.",
  },
  {
    num: 3,
    icon: "🏷️",
    title: "Print the FNSKU labels",
    summary: "Amazon offers to print the FNSKU labels at this stage.",
    detail:
      "The wizard offers two options: 'Amazon labels' (Amazon applies them for you at the warehouse, for a small per-unit fee) and 'Merchant labels' (you print and apply them yourself). Always pick Merchant labels for v1. It is cheaper, faster, and you control which face of the bag the label sits on. Print the PDF Amazon generates, peel and stick each label to a polybag, done. Covered in detail in Lesson 5.",
    watchOut:
      "Use adhesive label paper, not regular paper with sticky tape. The FNSKU has to survive the warehouse handling and the carrier's sorting belts without peeling.",
  },
  {
    num: 4,
    icon: "📏",
    title: "Confirm box dimensions and weight",
    summary: "Enter the packed outer-box L, W, H and total weight.",
    detail:
      "Once your box is packed, measure all three dimensions with a tape measure and weigh the closed box on your scale. Enter the figures into the wizard. Round up by 2mm on dimensions and to the nearest 100g on weight. Amazon uses these numbers to calculate the shipping fee, and the warehouse re-measures everything on arrival; under-declaring gets bumped to a higher tier with a non-compliance fee.",
    watchOut:
      "Stay under the limits from Lesson 3: 63.5 cm longest side, 23 kg total. If you go over either, split into two boxes; Amazon will not accept a box that breaks the limits.",
  },
  {
    num: 5,
    icon: "🚚",
    title: "Choose the carrier",
    summary: "Pick Amazon's Partnered Carrier (UPS or DPD) for discounted rates.",
    detail:
      "The wizard lets you choose between Amazon Partnered Carrier (UPS or DPD in the UK, discounted rate negotiated by Amazon) and Other Carrier (you arrange shipping yourself). Pick Partnered Carrier on every v1 shipment. The label is generated automatically, the rate is materially cheaper than buying retail postage, and the tracking is wired directly into Seller Central so you do not have to manually update anything.",
    watchOut:
      "Only switch to Other Carrier if you have a pre-existing courier account that beats Amazon's rate, which is rare for shipments under 50 kg.",
  },
  {
    num: 6,
    icon: "💷",
    title: "Confirm and pay the shipping fee",
    summary: "The wizard shows the rate; click confirm to charge it.",
    detail:
      "Amazon calculates the partnered-carrier rate based on the dimensions and weight you entered, applies the discount, and shows you the total. Confirm. The charge is debited from your seller account balance (or your linked card if the balance is low). Amazon then generates the shipping label as a PDF.",
  },
  {
    num: 7,
    icon: "📄",
    title: "Download and print the shipping label",
    summary: "One label per outer box, applied to the largest flat face.",
    detail:
      "The PDF contains the carrier shipping label (with destination FC address and tracking barcode) and Amazon's own shipment box ID label, both on a single sheet. Print on standard A4 paper, cut along the line if there are two labels, and tape each to the outside of its corresponding box. Use clear tape, never tape over the barcode itself; the scanner needs to read it cleanly.",
    watchOut:
      "Print at 100% scale, not 'Fit to page', which shrinks the barcode below the scanner's tolerance. If you have a thermal label printer, use the thermal-label format option in the wizard instead.",
  },
];

export function ShipmentWizard() {
  const [activeNum, setActiveNum] = useState<number>(1);

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-purple-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🖥️ Create the Shipment in Seller Central
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {STEPS.length} steps · about 15 minutes
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        The Send to Amazon flow walks you through the whole shipment in a
        wizard. Tap each step below to see what to click, what to enter, and
        the gotcha to avoid. End to end, with your box already packed, this is
        a 15-minute job.
      </p>

      <div className="space-y-3">
        {STEPS.map((s, idx) => {
          const isActive = activeNum === s.num;
          const isLast = idx === STEPS.length - 1;
          return (
            <div key={s.num} className="relative">
              <button
                type="button"
                onClick={() => setActiveNum(isActive ? 0 : s.num)}
                aria-expanded={isActive}
                className={`w-full text-left rounded-2xl border-2 transition-all duration-200 ${
                  isActive
                    ? "border-purple-400 bg-purple-50 ring-2 ring-purple-200"
                    : "border-line bg-surface hover:border-ink/30"
                }`}
              >
                <div className="flex items-start gap-4 p-4 md:p-5">
                  <div
                    className={`flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full font-display font-bold border-2 ${
                      isActive
                        ? "bg-purple-500 border-purple-500 text-white"
                        : "bg-surface border-ink/20 text-ink-muted"
                    }`}
                  >
                    {s.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-display text-lg font-bold leading-tight ${
                        isActive ? "text-purple-900" : "text-ink"
                      }`}
                    >
                      {s.icon} {s.title}
                    </h4>
                    <p className="text-[0.85rem] text-ink-muted leading-snug mt-1">
                      {s.summary}
                    </p>
                  </div>
                </div>
              </button>

              {isActive && (
                <div className="mt-2 rounded-2xl border-2 border-purple-200 bg-white p-5">
                  <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-purple-700 mb-1.5">
                    What to do
                  </p>
                  <p className="text-[0.9rem] text-ink leading-relaxed">
                    {s.detail}
                  </p>
                  {s.watchOut && (
                    <div className="mt-4 rounded-lg border-l-4 border-rose-500 bg-rose-50 px-4 py-3">
                      <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1">
                        ⚠️ Watch out
                      </p>
                      <p className="text-[0.85rem] text-rose-900 leading-relaxed">
                        {s.watchOut}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!isLast && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-line"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
