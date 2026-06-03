"use client";

import { useState } from "react";

type Finding = { label: string; value: string; emoji: string };
type Step = { number: number; title: string; description: string; cost: string };
type Milestone = { milestone: string; timeframe: string; icon: string };

type Phase = {
  id: number;
  phase: string;
  subtitle: string;
  icon: string;
  tone: "blue" | "purple" | "emerald";
  duration: string;
  description?: string;
  findings?: Finding[];
  steps?: Step[];
  milestones?: Milestone[];
  outcomes?: string[];
  keyInsights: string[];
};

const PHASES: Phase[] = [
  {
    id: 1,
    phase: "The Discovery",
    subtitle: "Spotting the Value Gap",
    icon: "🔍",
    tone: "blue",
    duration: "1 to 2 weeks",
    description:
      "While conducting physical shelf research, we looked at high-turnover, everyday consumer products and noticed a significant value gap between retail and Amazon marketplaces.",
    findings: [
      { label: "Retail Price per Unit", value: "£1-5", emoji: "🏪" },
      { label: "Amazon Competitors", value: "30+ sellers", emoji: "⚔️" },
      { label: "Customer Demand", value: "Multi-units preferred", emoji: "📦" },
    ],
    keyInsights: [
      "Single units dominated by price wars with 30+ sellers",
      "Customers wanted convenience bundles, not individual units",
      "Opportunity existed in creating multi-unit value packs",
    ],
  },
  {
    id: 2,
    phase: "The Validation Bundle",
    subtitle: "The Strategy with 3 Key Steps",
    icon: "📋",
    tone: "purple",
    duration: "2 to 4 weeks",
    description:
      "Once we spotted the gap, we built a deliberately small, low-risk listing on a brand-new bundle ASIN. The whole point of this phase is to prove the demand before sinking real capital into stock or branding, while making sure the new SKU we publish belongs only to us.",
    steps: [
      {
        number: 1,
        title: "GTIN Exemption",
        description:
          "Applied for a free digital waiver to list the bundle without expensive barcodes.",
        cost: "FREE",
      },
      {
        number: 2,
        title: "Generic Brand Name",
        description:
          "Created the listing under the Generic brand to bypass trademark costs before validation.",
        cost: "FREE",
      },
      {
        number: 3,
        title: "Test Batch",
        description:
          "Purchased 12 units of each component from retail shelves and sent them to an Amazon fulfilment centre.",
        cost: "£60-100",
      },
    ],
    keyInsights: [
      "Risk-minimised validation approach",
      "Zero upfront branding costs",
      "Unique bundle SKU = unique ASIN = no Buy Box rotation from day one",
      "Small batch testing yields the highest signal-to-noise ratio",
    ],
  },
  {
    id: 3,
    phase: "The Result & Scale",
    subtitle: "From Test to Protected Asset",
    icon: "🚀",
    tone: "emerald",
    duration: "30+ days",
    description:
      "The test batch sold out completely within days. Because we had created a unique combination of items, we owned 100% of the Buy Box from day one.",
    milestones: [
      { milestone: "Test Batch Sold Out", timeframe: "Within days", icon: "✅" },
      { milestone: "100% Buy Box Ownership", timeframe: "Day 1-30", icon: "👑" },
      { milestone: "Scale with Wholesale", timeframe: "Day 30+", icon: "📈" },
    ],
    outcomes: [
      "Formed Limited Company and Registered Trademark",
      "Applied for Amazon Brand Registry to lock the listing",
      "Cut stock costs in half via wholesale distributors",
      "Multiplied net profit with bulk purchasing",
    ],
    keyInsights: [
      "Protection through uniqueness and brand registry",
      "50% cost reduction through wholesale scaling",
      "Automated, scalable commercial asset created",
    ],
  },
];

const TONES = {
  blue: {
    border: "border-blue-300",
    softBg: "bg-blue-50",
    midBg: "bg-blue-100/60",
    rail: "bg-blue-500",
    pill: "bg-blue-100 text-blue-800",
    text: "text-blue-900",
    sub: "text-blue-700",
    ring: "ring-blue-300/40",
    activeBorder: "border-blue-500",
    dotBg: "bg-blue-500",
  },
  purple: {
    border: "border-purple-300",
    softBg: "bg-purple-50",
    midBg: "bg-purple-100/60",
    rail: "bg-purple-500",
    pill: "bg-purple-100 text-purple-800",
    text: "text-purple-900",
    sub: "text-purple-700",
    ring: "ring-purple-300/40",
    activeBorder: "border-purple-500",
    dotBg: "bg-purple-500",
  },
  emerald: {
    border: "border-emerald-300",
    softBg: "bg-emerald-50",
    midBg: "bg-emerald-100/60",
    rail: "bg-emerald-500",
    pill: "bg-emerald-100 text-emerald-800",
    text: "text-emerald-900",
    sub: "text-emerald-700",
    ring: "ring-emerald-300/40",
    activeBorder: "border-emerald-500",
    dotBg: "bg-emerald-500",
  },
} as const;

export function CaseStudy() {
  const [activeId, setActiveId] = useState<number>(1);
  const active = PHASES.find((p) => p.id === activeId) ?? PHASES[0];
  const tone = TONES[active.tone];

  return (
    <div className="my-8 space-y-6">
      <section className="rounded-2xl bg-ink text-white p-7 md:p-9 border border-ink/80 shadow-sm">
        <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-white/50">
          📁 Case Study · Module 1 · Lesson 5
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-2">
          Our Blueprint, From Shelf to Scalable Asset
        </h2>
        <p className="text-[0.95rem] text-white/80 leading-relaxed max-w-3xl mt-4">
          To understand how this framework operates in the real world, walk
          through a concrete case study of how a simple, generic multi-item
          bundle is built from scratch.
        </p>
        <div className="mt-5 pt-5 border-t border-white/15 flex items-start gap-3">
          <span className="text-xl flex-shrink-0 leading-none">💡</span>
          <p className="text-[0.85rem] text-white/70 leading-relaxed">
            This system does not start with expensive websites, warehouses, or
            thousands in upfront investment. It starts on clearance shelves.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border-2 border-line bg-surface p-5 md:p-7 space-y-5">
        <header>
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
            ⚙️ The Blueprint Mechanic
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink mt-1.5 leading-tight">
            Why Bundling = Owning Your Own Listing
          </h3>
        </header>

        <p className="text-ink leading-relaxed">
          Every product on Amazon has a unique 10-character code called an
          ASIN (Amazon Standard Identification Number). When you list an item
          against an existing ASIN, you are not opening a shop. You are
          joining a queue of sellers all fighting over the same Buy Box for
          the same product. Amazon rotates the Buy Box between you and the
          rest of the pool roughly in line with whoever is cheapest at that
          moment, which means most days your listing earns nothing while a
          competitor undercuts you by a penny.
        </p>

        <p className="text-ink leading-relaxed">
          A bundle changes the equation completely. The moment you combine
          two or more standalone products into a single new pack, you have
          created a brand-new product as far as Amazon's catalogue is
          concerned. That new pack gets its own brand-new ASIN, you are the
          seller who built the listing, and from day one you are the only
          seller on it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl leading-none">🪤</span>
              <h4 className="font-display font-bold text-rose-900">
                The Shared ASIN Trap
              </h4>
            </div>
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-rose-700 mb-3">
              Selling on an existing listing
            </p>
            <ul className="space-y-1.5 text-[0.88rem] text-rose-900 leading-snug">
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>30+ sellers stacked on the same SKU</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Amazon rotates the Buy Box between all of them</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Prices race to the floor as sellers undercut each other</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Margins compressed to pennies for thin, unreliable returns</span>
              </li>
            </ul>
          </div>

          <div className="relative rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <span className="absolute -top-2.5 right-4 inline-flex h-5 px-2 items-center rounded-full bg-emerald-500 text-white font-mono text-[0.55rem] font-bold tracking-[0.1em] uppercase shadow-sm">
              ✓ Our Play
            </span>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl leading-none">👑</span>
              <h4 className="font-display font-bold text-emerald-900">
                Your Owned Bundle ASIN
              </h4>
            </div>
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-emerald-700 mb-3">
              Building a brand-new listing
            </p>
            <ul className="space-y-1.5 text-[0.88rem] text-emerald-900 leading-snug">
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>A unique combination earns its own brand-new ASIN</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>You listed it first, so you are the only seller on it</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>You hold your retail price with zero direct competition</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>100% Buy Box ownership on every customer visit</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-ink leading-relaxed">
          The bundle itself does not need to be clever. A 3-pack of the same
          brand of lightbulbs, or two complementary everyday items packaged
          together in a single polybag, is enough to register as a brand-new
          SKU in Amazon's catalogue. The mechanic that protects it is the
          uniqueness of the combination, not the cleverness of the idea.
          Once the listing is yours and you lock it down with the brand
          registry (Module 6), no competitor can muscle in. Every click,
          every sale, every margin point lands with you.
        </p>

        <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-100/60 px-4 py-3">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700 mb-1">
            🎯 The Core Insight
          </p>
          <p className="text-[0.9rem] text-emerald-900 leading-relaxed">
            We do not try to win a fight on a shared listing. We build a
            listing nobody else is allowed to fight on.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-slate-50/40 p-5 md:p-7">
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
            🗺️ The Journey · Tap any phase
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
            Phase {activeId} of 3
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-[16.67%] top-0 h-12 flex items-center pointer-events-none">
            <div className="relative h-1.5 w-full bg-line rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{
                  width:
                    activeId === 1 ? "0%" : activeId === 2 ? "50%" : "100%",
                }}
              />
            </div>
          </div>

          <div className="relative grid grid-cols-3">
            {PHASES.map((p) => {
              const t = TONES[p.tone];
              const isActive = activeId === p.id;
              const isPast = activeId > p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  className="group flex flex-col items-center text-center px-1"
                  aria-label={`Phase ${p.id}: ${p.phase}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div
                    className={`relative h-12 w-12 rounded-full border-2 flex items-center justify-center font-display text-lg font-bold transition-all duration-300 ${
                      isActive
                        ? `${t.dotBg} text-white ${t.activeBorder} ring-4 ${t.ring} shadow-md scale-110`
                        : isPast
                        ? `${t.dotBg} text-white ${t.activeBorder} shadow-sm`
                        : "bg-surface text-ink-muted border-line group-hover:border-ink/40 group-hover:scale-105"
                    }`}
                  >
                    {isPast ? "✓" : p.id}
                  </div>

                  <p
                    className={`mt-3.5 font-display text-[0.9rem] md:text-[1rem] font-bold leading-tight transition-colors duration-200 ${
                      isActive || isPast
                        ? t.text
                        : "text-ink-muted group-hover:text-ink"
                    }`}
                  >
                    {p.phase}
                  </p>

                  <span
                    className={`mt-1.5 inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-[0.12em] uppercase rounded-full px-2 py-0.5 transition-colors duration-200 ${
                      isActive || isPast
                        ? t.pill
                        : "bg-slate-100 text-ink-subtle"
                    }`}
                  >
                    <span aria-hidden>⏱</span>
                    <span>{p.duration}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={`rounded-2xl border-2 ${tone.border} ${tone.softBg} overflow-hidden`}
      >
        <header
          className={`flex items-start gap-4 p-5 md:p-6 border-b ${tone.border}`}
        >
          <span className="text-4xl flex-shrink-0 leading-none">
            {active.icon}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${tone.sub}`}
            >
              Phase {active.id} · {active.duration}
            </p>
            <h3 className={`font-display text-2xl font-bold mt-1 ${tone.text}`}>
              {active.phase}
            </h3>
            <p className={`text-[0.9rem] ${tone.sub} mt-0.5`}>
              {active.subtitle}
            </p>
          </div>
        </header>

        <div className="p-5 md:p-6 bg-white/50 space-y-5">
          {active.description && (
            <p className="text-ink leading-relaxed">{active.description}</p>
          )}

          {active.findings && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {active.findings.map((f, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border-2 ${tone.border} bg-white p-4`}
                >
                  <p
                    className={`font-mono text-[0.6rem] tracking-[0.12em] uppercase ${tone.sub}`}
                  >
                    {f.label}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span
                      className={`font-display text-2xl font-bold ${tone.text}`}
                    >
                      {f.value}
                    </span>
                    <span className="text-xl">{f.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {active.steps && (
            <div className="space-y-3">
              {active.steps.map((s) => (
                <div
                  key={s.number}
                  className={`rounded-xl border-2 ${tone.border} bg-white p-4 flex items-start gap-4`}
                >
                  <span
                    className={`flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full ${tone.dotBg} text-white font-display text-base font-bold`}
                  >
                    {s.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h4 className={`font-display font-bold ${tone.text}`}>
                        {s.title}
                      </h4>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em] uppercase font-semibold ${tone.pill}`}
                      >
                        Cost: {s.cost}
                      </span>
                    </div>
                    <p className="text-[0.9rem] text-ink leading-relaxed mt-1">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {active.milestones && (
            <div>
              <p
                className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${tone.sub} mb-2`}
              >
                Timeline of Success
              </p>
              <div className="space-y-2">
                {active.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border-2 ${tone.border} bg-white px-4 py-3 flex items-center gap-4`}
                  >
                    <span className="text-2xl flex-shrink-0 leading-none">
                      {m.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-display font-bold ${tone.text} leading-tight`}
                      >
                        {m.milestone}
                      </p>
                      <p
                        className={`font-mono text-[0.65rem] tracking-[0.1em] uppercase ${tone.sub} mt-0.5`}
                      >
                        {m.timeframe}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active.outcomes && (
            <div>
              <p
                className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${tone.sub} mb-2`}
              >
                Scaling Plays (Phase 4)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {active.outcomes.map((o, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border-2 ${tone.border} bg-white p-3 flex items-start gap-3`}
                  >
                    <span className="text-lg flex-shrink-0 leading-none">
                      ✅
                    </span>
                    <p className="text-[0.85rem] text-ink leading-snug">{o}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className={`rounded-xl border-l-4 ${tone.activeBorder} ${tone.midBg} px-4 py-3`}
          >
            <p
              className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${tone.sub} mb-1.5`}
            >
              🎯 Key Insights
            </p>
            <ul className="space-y-1.5">
              {active.keyInsights.map((insight, idx) => (
                <li
                  key={idx}
                  className={`text-[0.85rem] ${tone.text} flex gap-2 leading-snug`}
                >
                  <span className="flex-shrink-0">→</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {activeId === 3 && (
        <section className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-amber-50/60 to-orange-50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl leading-none">📊</span>
            <h4 className="font-display text-lg font-bold text-amber-900">
              From Experiment to Scalable Asset
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "12", label: "Units to start" },
              { value: "100%", label: "Buy Box owned" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border-2 border-amber-200 bg-white px-3 py-4 text-center"
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-amber-700">
                  {stat.value}
                </p>
                <p className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-amber-800 mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[0.85rem] text-amber-900 italic leading-relaxed mt-4">
            What began as a 12-unit experiment on a local shop shelf became a
            protected, automated, and highly scalable commercial asset.
          </p>
        </section>
      )}

      <section className="rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-slate-50/40 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl leading-none">🚀</span>
          <h4 className="font-display text-lg font-bold text-ink">
            The Framework in Action
          </h4>
        </div>
        <p className="text-ink-muted leading-relaxed">
          This case study demonstrates the entire framework working in perfect
          sequence: Discovery → Validation → Protection → Scale. Each phase
          builds on the last, with minimal risk at each step.
        </p>
        <p className="text-[0.9rem] text-ink-muted leading-relaxed mt-3">
          The key insight? You do not need capital or infrastructure upfront.
          You need{" "}
          <span className="font-semibold text-ink">
            customer validation first
          </span>
          , then you scale with confidence.
        </p>
      </section>
    </div>
  );
}
