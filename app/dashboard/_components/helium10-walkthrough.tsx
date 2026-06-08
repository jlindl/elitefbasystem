"use client";

import { useState } from "react";

type Metric = {
  id: string;
  icon: string;
  name: string;
  what: string;
  howToRead: string;
  greenZone: string;
  redZone: string;
};

const METRICS: Metric[] = [
  {
    id: "monthly-sales",
    icon: "📦",
    name: "Monthly Sales (units)",
    what:
      "Helium 10's estimate of how many units of this exact listing sold in the last 30 days, calculated from Amazon's public sales-velocity signals.",
    howToRead:
      "Look at the average across the top 10 listings for your target keyword, not just one. A single anomaly listing tells you nothing; the median across competitors tells you the market size.",
    greenZone:
      "Top single-unit listing in your niche is doing 300+ units/month. Your bundle does not need to match that; even 20% of that velocity translates to 60 units/month, which clears the floor rule.",
    redZone:
      "Top single-unit listing under 60 units/month. The whole niche is too small. Your bundle will not earn enough sales to cover its own storage fees.",
  },
  {
    id: "monthly-revenue",
    icon: "💷",
    name: "Monthly Revenue (£)",
    what:
      "Estimated monthly revenue for the listing: units × current price.",
    howToRead:
      "Quick sanity check. If a listing shows £20k/month revenue and your bundle would sell at twice the price, you can capture even a small percentage and clear the floor.",
    greenZone:
      "Total revenue across the top 5 single-unit listings is over £30k/month. There is real money on the table.",
    redZone:
      "Top 5 single-unit listings combined do under £5k/month revenue. Even taking 10% of that with your bundle gives you under £500/month, well below the compounding threshold.",
  },
  {
    id: "bsr",
    icon: "📊",
    name: "Best Seller Rank (BSR)",
    what:
      "Amazon's ranking of how well this ASIN sells in its main category. Updated hourly. Lower number = more sales.",
    howToRead:
      "Look at the BSR of the top single-unit listing in your category. A BSR under 5,000 in Beauty means the product sells 50+ units/day. A BSR over 50,000 means it sells maybe 1-5 units/day.",
    greenZone:
      "Top single-unit BSR under 20,000 in a broad category (Beauty, Grocery, Pet). The listing sells at least 10 units/day, which is plenty of market for a bundle to take 10-20% from.",
    redZone:
      "Top single-unit BSR above 100,000 in the main category. The listing barely moves; building a bundle around it is sourcing capital you will never see again.",
  },
  {
    id: "reviews",
    icon: "⭐",
    name: "Review Count",
    what:
      "How many reviews the listing has accumulated since launch.",
    howToRead:
      "A proxy for how long the listing has been live AND how much real demand exists. Cross-reference with the launch date if Helium 10 shows it.",
    greenZone:
      "Top single-unit listings have 200+ reviews each. This indicates a mature market with real consumer demand, not a fad that already peaked.",
    redZone:
      "Top listings have under 20 reviews despite high BSR. This is a brand-new listing that may be running launch promotions; the real demand has not stabilised yet.",
  },
  {
    id: "price-trend",
    icon: "📉",
    name: "Price Trend",
    what:
      "Historical price chart for the listing over the last 3, 6, or 12 months.",
    howToRead:
      "Check for stability. A flat price line means the listing is in healthy demand at that price point. A consistently dropping line means sellers are racing to the floor.",
    greenZone:
      "Flat or slightly upward price trend over 6 months. The listing has stable margins. Your bundle can sit at a similar price band without immediately getting undercut.",
    redZone:
      "Sharply dropping price line, especially in the last 3 months. Existing sellers are panic-pricing because demand has dropped or supply has flooded in. Avoid bundling against a falling market.",
  },
  {
    id: "lqs",
    icon: "🎯",
    name: "Listing Quality Score",
    what:
      "Helium 10's proprietary score (0-10) of how well the listing is optimised: title, bullets, images, A+ content, keywords.",
    howToRead:
      "Not for evaluating your own bundle; for evaluating competitor weakness. A category dominated by listings with LQS under 6 means you can win by simply optimising properly.",
    greenZone:
      "Top single-unit listings have LQS under 7. Plenty of room for a well-optimised bundle to rank above them.",
    redZone:
      "All top listings have LQS 9+. The market is dominated by professional sellers with strong listings. Hard to break in without significant ad spend.",
  },
];

type Step = {
  num: number;
  title: string;
  detail: string;
};

const SETUP_STEPS: Step[] = [
  {
    num: 1,
    title: "Install the extension",
    detail:
      "Go to the Chrome Web Store and search 'Helium 10'. Install the official extension. It is free for unlimited use on the X-Ray feature and gives you a daily quota on the other tools.",
  },
  {
    num: 2,
    title: "Create a free Helium 10 account",
    detail:
      "Open helium10.com, sign up with the same email as your Seller Central account. The free Starter plan is enough for everything we use in this module. No payment details required.",
  },
  {
    num: 3,
    title: "Connect to Seller Central (optional but useful)",
    detail:
      "From the Helium 10 dashboard, click Connections > Amazon Seller Central > Authorize. This lets H10 read your own sales data later, which is useful in Module 4 for keyword research. Skip for now if you have not finished verification yet.",
  },
  {
    num: 4,
    title: "Pin the extension to your browser bar",
    detail:
      "Click the puzzle-piece icon in Chrome, find Helium 10, and click the pin. The H10 icon now sits in your toolbar, ready to fire on any Amazon page.",
  },
];

export function Helium10Walkthrough() {
  const [activeId, setActiveId] = useState<string>(METRICS[0].id);
  const active = METRICS.find((m) => m.id === activeId) ?? METRICS[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-lime-50/40 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        🧪 Helium 10 X-Ray, Section by Section
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        The free Chrome extension overlays sales estimates, BSR, revenue, and
        listing quality on any Amazon search page. Tap a metric to see how to
        read it.
      </p>

      <div className="rounded-2xl border-2 border-lime-200 bg-white p-5 mb-5">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-lime-700 mb-3">
          Four-step setup
        </p>
        <ol className="space-y-2.5">
          {SETUP_STEPS.map((s) => (
            <li key={s.num} className="flex items-start gap-3">
              <span className="flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-lime-500 text-white font-display text-sm font-bold">
                {s.num}
              </span>
              <div className="flex-1">
                <p className="font-display font-semibold text-ink leading-tight">
                  {s.title}
                </p>
                <p className="text-[0.85rem] text-ink-muted leading-relaxed mt-0.5">
                  {s.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-5">
        {METRICS.map((m) => {
          const isActive = activeId === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveId(m.id)}
              className={`rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                isActive
                  ? "border-lime-500 bg-lime-50 ring-4 ring-lime-300/30 -translate-y-0.5 shadow-md"
                  : "border-line bg-surface hover:border-ink/30 hover:-translate-y-0.5"
              }`}
            >
              <span className="text-2xl leading-none">{m.icon}</span>
              <p
                className={`mt-2 font-display text-[0.8rem] font-bold leading-tight ${
                  isActive ? "text-lime-900" : "text-ink"
                }`}
              >
                {m.name}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-lime-300 bg-white p-5 md:p-6">
        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-line">
          <span className="text-3xl leading-none flex-shrink-0">
            {active.icon}
          </span>
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-lime-700">
              X-Ray metric
            </p>
            <h4 className="font-display text-lg font-bold text-ink leading-tight">
              {active.name}
            </h4>
          </div>
        </div>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-lime-700 mb-1.5">
          What it shows
        </p>
        <p className="text-[0.9rem] text-ink leading-relaxed">{active.what}</p>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-lime-700 mt-4 mb-1.5">
          How to read it
        </p>
        <p className="text-[0.9rem] text-ink leading-relaxed">
          {active.howToRead}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700 mb-1.5">
              🟢 Healthy market
            </p>
            <p className="text-[0.85rem] text-emerald-900 leading-relaxed">
              {active.greenZone}
            </p>
          </div>
          <div className="rounded-lg border-2 border-rose-200 bg-rose-50 px-4 py-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1.5">
              🔴 Skip the niche
            </p>
            <p className="text-[0.85rem] text-rose-900 leading-relaxed">
              {active.redZone}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[0.75rem] text-ink-subtle italic leading-snug">
        Free tier gives unlimited X-Ray on Amazon search pages. We do not use
        the paid features, the keyword tools, or any other plan upgrade.
      </p>
    </div>
  );
}
