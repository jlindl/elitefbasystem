"use client";

import { useState } from "react";

const STAGES = [
  {
    time: "Second 0",
    icon: "👆",
    title: "Customer Clicks Buy",
    short: "Order placed",
    detail:
      "Customer finds your listing and clicks Buy Now on Amazon.co.uk. Payment processes instantly through Amazon's checkout system.",
  },
  {
    time: "Seconds 1-5",
    icon: "🔀",
    title: "Instant Order Routing",
    short: "Backend dispatch",
    detail:
      "Amazon's backend software routes the order to the exact warehouse holding your inventory. You do not need to log in or approve a single thing.",
  },
  {
    time: "Minutes 1-30",
    icon: "🤖",
    title: "Robotic Retrieval",
    short: "Pick from shelf",
    detail:
      "High-speed automated robots and picking staff locate your specific stock items on the shelves and bring them to a packing station.",
  },
  {
    time: "Minutes 30-45",
    icon: "📦",
    title: "Quality Check and Packing",
    short: "Box and seal",
    detail:
      "Items are scanned for accuracy, placed into an official Amazon-branded cardboard box, and sealed for dispatch.",
  },
  {
    time: "Hours 1-4",
    icon: "🚛",
    title: "Sorting and Vehicle Load",
    short: "On the road",
    detail:
      "The package is automatically sorted onto a delivery vehicle within Amazon's logistics network and routed toward the customer's address.",
  },
  {
    time: "Hour 24",
    icon: "🏠",
    title: "Delivered",
    short: "On the doorstep",
    detail:
      "The package arrives on the customer's doorstep within 24 hours. You pay a predictable, flat FBA Fulfilment Fee per unit for this service, turning a major operational headache into a fixed, hands-off expense.",
  },
] as const;

export function FulfilmentTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = STAGES[activeIdx];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-blue-50/40 via-surface to-emerald-50/40 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-5">
        ⏱ 24-Hour Fulfilment Machine · Tap any stage
      </p>

      <div className="relative">
        <div
          aria-hidden
          className="hidden md:block absolute top-7 left-7 right-7 h-0.5 bg-line"
        />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative">
          {STAGES.map((s, i) => {
            const isActive = activeIdx === i;
            const isPast = i < activeIdx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                className="flex flex-col items-center text-center group focus:outline-none"
                aria-label={`${s.time}: ${s.title}`}
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl transition-all duration-200 ${
                    isActive
                      ? "border-accent bg-accent text-white shadow-lg scale-110"
                      : isPast
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-line bg-surface text-ink hover:border-ink/30 hover:bg-surface-alt"
                  }`}
                >
                  {s.icon}
                </span>
                <p
                  className={`mt-2 font-mono text-[0.6rem] tracking-[0.14em] uppercase ${
                    isActive ? "text-accent font-bold" : "text-ink-subtle"
                  }`}
                >
                  {s.time}
                </p>
                <p
                  className={`text-[0.7rem] mt-0.5 leading-tight ${
                    isActive ? "text-ink font-medium" : "text-ink-muted"
                  }`}
                >
                  {s.short}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-xl border-2 border-accent/40 bg-white/70 p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{active.icon}</span>
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent">
              {active.time}
            </p>
            <h4 className="font-display text-lg font-bold text-ink">
              {active.title}
            </h4>
          </div>
        </div>
        <p className="text-[0.95rem] text-ink leading-relaxed">
          {active.detail}
        </p>
      </div>
    </div>
  );
}
