"use client";

import { useState } from "react";

const STEPS = [
  {
    num: 1,
    icon: "📝",
    title: "List the Products",
    short: "Seller Central setup",
    detail:
      "Create your Amazon Seller account and list the items. You can either attach an offer to an existing product page (when selling established brands) or create a brand-new listing from scratch through the desktop portal.",
    color: "blue",
  },
  {
    num: 2,
    icon: "🏷️",
    title: "Prep and Label Inventory",
    short: "Strict packaging rules",
    detail:
      "Every single unit needs a scannable barcode. Amazon uses a unique identifier called an FNSKU (Fulfilment Network Stock Keeping Unit) to track items. These must be printed and applied directly over any existing retail barcodes so Amazon knows the item belongs to your specific business.",
    color: "amber",
  },
  {
    num: 3,
    icon: "📦",
    title: "Create an Inbound Shipping Plan",
    short: "Logistics routing",
    detail:
      "Through Seller Central, inform Amazon exactly what is being sent. Pack your inventory into single large cardboard boxes, print the generated FBA Box ID shipping labels from your dashboard, apply them to the outside of your delivery cartons, and post them at your local partner parcelshop. Amazon's algorithm automatically assigns the shipment to one or more fulfilment centres.",
    color: "purple",
  },
  {
    num: 4,
    icon: "🤖",
    title: "Storage and Automated Fulfilment",
    short: "The hands-off phase",
    detail:
      "Your boxes arrive at an Amazon Fulfilment Centre (FC). Warehouse staff open them, scan the item barcodes, and your stock instantly goes live for sale online. When a customer orders, Amazon's warehouse team picks, packs, and delivers the item in official Amazon-branded boxes. They also manage initial return requests.",
    color: "emerald",
  },
] as const;

const COLORS = {
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    activeBg: "bg-blue-100",
    chip: "bg-blue-200 text-blue-900",
    ring: "ring-blue-300",
  },
  amber: {
    border: "border-amber-300",
    bg: "bg-amber-50",
    activeBg: "bg-amber-100",
    chip: "bg-amber-200 text-amber-900",
    ring: "ring-amber-300",
  },
  purple: {
    border: "border-purple-300",
    bg: "bg-purple-50",
    activeBg: "bg-purple-100",
    chip: "bg-purple-200 text-purple-900",
    ring: "ring-purple-300",
  },
  emerald: {
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    activeBg: "bg-emerald-100",
    chip: "bg-emerald-200 text-emerald-900",
    ring: "ring-emerald-300",
  },
} as const;

export function InfrastructureStepper() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = STEPS[activeIdx];
  const ac = COLORS[active.color];

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {STEPS.map((s, i) => {
          const c = COLORS[s.color];
          const isActive = activeIdx === i;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-200 ${c.border} ${
                isActive
                  ? `${c.activeBg} ring-4 ${c.ring} -translate-y-0.5 shadow-md`
                  : `${c.bg} hover:-translate-y-0.5`
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${c.chip} text-[0.75rem] font-bold font-mono`}
                >
                  {s.num}
                </span>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h4 className="font-display text-[0.95rem] font-bold text-ink leading-tight">
                {s.title}
              </h4>
              <p className="text-[0.7rem] text-ink-muted mt-1 leading-snug">
                {s.short}
              </p>
            </button>
          );
        })}
      </div>

      <div className={`rounded-2xl border-2 ${ac.border} ${ac.bg} p-5 md:p-6`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{active.icon}</span>
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
              Step {active.num} of {STEPS.length}
            </p>
            <h3 className="font-display text-lg font-bold text-ink mt-0.5">
              {active.title}
            </h3>
          </div>
        </div>
        <p className="text-[0.95rem] text-ink leading-relaxed">{active.detail}</p>
      </div>
    </div>
  );
}
