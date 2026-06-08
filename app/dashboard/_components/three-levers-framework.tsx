"use client";

import { useState } from "react";

type LeverTone = "blue" | "purple" | "amber";

type Lever = {
  id: string;
  icon: string;
  title: string;
  sub: string;
  definition: string;
  moves: string[];
  mistake: string;
  tone: LeverTone;
};

const LEVERS: Lever[] = [
  {
    id: "price",
    icon: "💷",
    title: "Price",
    sub: "What the bundle commands",
    definition:
      "The retail figure the customer pays at checkout. The lever you have the most direct control over, because you set it.",
    moves: [
      "Build a unique combination so no other seller can race you to the floor",
      "Position the bundle as a multi-pack premium, not a discounted stack of singles",
      "Polish the title, main image, and A+ content to justify the higher number",
    ],
    mistake:
      "Pricing the bundle at the literal sum of its component parts. You are paid for the convenience and for owning the listing, not for adding up retail tickets.",
    tone: "blue",
  },
  {
    id: "procurement",
    icon: "🏭",
    title: "Procurement",
    sub: "What each component costs",
    definition:
      "The wholesale or retail price you pay per unit of every item that goes into the bundle. The lever that moves the most as you scale.",
    moves: [
      "Step up from retail sourcing to a regional distributor the moment Phase 2 validates",
      "Negotiate volume tiers once monthly velocity is established and predictable",
      "Combine inbound shipments and consolidate suppliers to dilute per-unit logistics",
    ],
    mistake:
      "Staying on retail-shelf sourcing past the validation phase. Wholesale usually cuts component cost by 30 to 50%, which lands directly in net profit.",
    tone: "purple",
  },
  {
    id: "packaging",
    icon: "📦",
    title: "Packaging",
    sub: "What the bundle physically is",
    definition:
      "The outer dimensions, weight, and material of the finished pack you send into Amazon. The lever that decides your size tier, and therefore your FBA fee.",
    moves: [
      "Wrap the bundle tight; eliminate every millimetre of slack and floppy plastic",
      "Choose components that nest together cleanly, not awkwardly",
      "Measure the prototype with calipers before sending in, so the tier is confirmed",
    ],
    mistake:
      "Bagging the bundle loosely. Amazon's Cubiscan measures the empty plastic flagging as part of the bundle and bumps you into the next size tier instantly.",
    tone: "amber",
  },
];

const TONES = {
  blue: {
    border: "border-blue-300",
    softBg: "bg-blue-50",
    pill: "bg-blue-100 text-blue-800",
    text: "text-blue-900",
    sub: "text-blue-700",
    activeBorder: "border-blue-500",
    ring: "ring-blue-300/40",
    rail: "bg-blue-500",
  },
  purple: {
    border: "border-purple-300",
    softBg: "bg-purple-50",
    pill: "bg-purple-100 text-purple-800",
    text: "text-purple-900",
    sub: "text-purple-700",
    activeBorder: "border-purple-500",
    ring: "ring-purple-300/40",
    rail: "bg-purple-500",
  },
  amber: {
    border: "border-amber-300",
    softBg: "bg-amber-50",
    pill: "bg-amber-100 text-amber-800",
    text: "text-amber-900",
    sub: "text-amber-700",
    activeBorder: "border-amber-500",
    ring: "ring-amber-300/40",
    rail: "bg-amber-500",
  },
} as const;

export function ThreeLeversFramework() {
  const [activeId, setActiveId] = useState<string>("price");
  const active = LEVERS.find((l) => l.id === activeId) ?? LEVERS[0];
  const tone = TONES[active.tone];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-slate-50/40 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-4">
        🎚️ The Three Levers · Tap one
      </p>

      <div className="grid grid-cols-3 gap-2.5 md:gap-3 mb-5">
        {LEVERS.map((lever) => {
          const t = TONES[lever.tone];
          const isActive = activeId === lever.id;
          return (
            <button
              key={lever.id}
              type="button"
              onClick={() => setActiveId(lever.id)}
              className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                isActive
                  ? `${t.activeBorder} ${t.softBg} ring-4 ${t.ring} -translate-y-0.5 shadow-md`
                  : "border-line bg-surface hover:border-ink/30 hover:-translate-y-0.5"
              }`}
            >
              <span className="text-2xl leading-none">{lever.icon}</span>
              <p
                className={`mt-2 font-display font-bold leading-tight ${
                  isActive ? t.text : "text-ink"
                }`}
              >
                {lever.title}
              </p>
              <p className="mt-0.5 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-ink-subtle leading-tight">
                {lever.sub}
              </p>
            </button>
          );
        })}
      </div>

      <div
        className={`rounded-xl border-2 ${tone.activeBorder} bg-white/70 p-5 md:p-6`}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl leading-none">{active.icon}</span>
          <div>
            <p
              className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${tone.sub}`}
            >
              Lever
            </p>
            <h4 className={`font-display text-xl font-bold ${tone.text} leading-tight`}>
              {active.title}
            </h4>
          </div>
        </div>

        <p className="text-ink leading-relaxed text-[0.95rem]">
          {active.definition}
        </p>

        <div className="mt-5">
          <p
            className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${tone.sub} mb-2`}
          >
            Move it in your favour
          </p>
          <ul className="space-y-2">
            {active.moves.map((m, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[0.9rem] text-ink leading-snug"
              >
                <span
                  className={`flex-shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full ${tone.pill} font-mono text-[0.65rem] font-bold`}
                >
                  {i + 1}
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-5 rounded-lg border-l-4 ${tone.activeBorder} bg-rose-50/50 border-y border-r border-rose-200 px-4 py-3`}
        >
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1">
            ⚠️ Common Mistake
          </p>
          <p className="text-[0.88rem] text-rose-900 leading-relaxed">
            {active.mistake}
          </p>
        </div>
      </div>
    </div>
  );
}
