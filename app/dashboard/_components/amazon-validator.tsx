"use client";

import { useState } from "react";

type Step = {
  num: number;
  icon: string;
  title: string;
  action: string;
  whatYouSee: string;
  greenLight: string;
  redLight: string;
};

const STEPS: Step[] = [
  {
    num: 1,
    icon: "🔎",
    title: "Search the exact product",
    action:
      "Open amazon.co.uk, type the brand name and product variant from your shop photo. For example, Garnier Ultimate Blends Honey Treasures Shampoo 400ml.",
    whatYouSee:
      "A list of listings. The top result is the active listing for that exact product. Below it, you may see other variants, multipacks, and complementary products.",
    greenLight:
      "The exact single-unit listing exists, has at least 30 reviews, and is selling at a higher per-unit price than the shop price you paid.",
    redLight:
      "No listing exists, or the listing is dormant (no sales rank shown), or fewer than 10 reviews. This is either a dead category or a brand-new product. Skip for now.",
  },
  {
    num: 2,
    icon: "👥",
    title: "Count the offers",
    action:
      "On the product page, look for the 'See All Buying Options' link or scroll to the 'Other Sellers on Amazon' section. Note how many sellers are listed.",
    whatYouSee:
      "A number ranging from 1 (only one seller) to 50+ (a crowded listing). Pay attention to whether Amazon itself is on the listing as a seller.",
    greenLight:
      "1 to 5 sellers on the single-unit listing. This is fine because we are not joining their fight; we are building a bundle listing of our own.",
    redLight:
      "Amazon Retail is on the listing (often shown as 'Sold by Amazon'). Avoid bundling around products Amazon itself sells, because Amazon's pricing is unpredictable and they often undercut bundles too.",
  },
  {
    num: 3,
    icon: "💷",
    title: "Note the single-unit price",
    action:
      "Record the current price of the single unit on Amazon. If there are multiple offers, take the Buy Box price (the price shown next to the buy button).",
    whatYouSee:
      "A single number, in pounds and pence. Sometimes a strikethrough RRP showing the discount Amazon is offering.",
    greenLight:
      "Amazon price is 2.5x to 4x your shop cost. A product at £2.50 in B&M selling at £6 to £10 on Amazon gives you room to build a profitable bundle.",
    redLight:
      "Amazon price is lower than or equal to your shop cost. This means you are too late; another seller is already arbitraging this and racing the price down.",
  },
  {
    num: 4,
    icon: "📊",
    title: "Check the Best Seller Rank (BSR)",
    action:
      "Scroll down to the Product Details section. Find the line that reads 'Best Sellers Rank' followed by a number, then a category. Note the BSR for the main category (the first one listed).",
    whatYouSee:
      "Something like '#1,247 in Beauty' or '#84,521 in Health & Personal Care'. Lower number means more sales.",
    greenLight:
      "BSR under 20,000 in a broad category like Beauty or Grocery. This indicates the product moves at least a few units a day, sometimes hundreds.",
    redLight:
      "BSR above 100,000 in the main category. This is too slow. The bundle will not sell fast enough to overcome storage and replenishment costs.",
  },
  {
    num: 5,
    icon: "📦",
    title: "Hunt for existing bundles",
    action:
      "Run a second Amazon search. Type 'BRAND PRODUCT 3-pack' or 'BRAND PRODUCT multipack' or 'BRAND PRODUCT bundle'. Compare to a search for the complementary item if you are bundling two different products.",
    whatYouSee:
      "Either an existing 3-pack listing (with its own ASIN, sellers, BSR, and reviews), or nothing relevant at all.",
    greenLight:
      "No bundle exists, or only one bundle exists and it has poor photography, missing details, or weak reviews. This is the opportunity.",
    redLight:
      "A well-established 3-pack listing already exists with 500+ reviews, multiple sellers, and an aggressive price. Your new bundle will fight for visibility against an entrenched listing. Pick a different product.",
  },
  {
    num: 6,
    icon: "📈",
    title: "Project the bundle price",
    action:
      "Work out what the bundle could realistically sell at. Take the single-unit Amazon price, multiply by the number of units in your planned bundle, then subtract a 10 to 15% multipack discount.",
    whatYouSee:
      "A target retail price. Compare against the total cost: components + FBA fees + 15% referral fee. The leftover is your gross margin.",
    greenLight:
      "Projected net profit per unit clears the £5 floor and the margin clears 30%. The bundle qualifies for sourcing.",
    redLight:
      "Projected net under £5 or margin under 30%. The bundle is too marginal; one fee revision or a Q4 storage cycle will erase the profit.",
  },
] as const;

export function AmazonValidator() {
  const [activeNum, setActiveNum] = useState<number>(1);
  const active = STEPS.find((s) => s.num === activeNum) ?? STEPS[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-amber-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🔍 The Amazon Validation Method
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          Step {activeNum} of {STEPS.length}
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mb-5">
        {STEPS.map((s) => {
          const isActive = activeNum === s.num;
          const isPast = activeNum > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveNum(s.num)}
              className={`relative rounded-lg border-2 py-2.5 transition-all duration-200 ${
                isActive
                  ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300/40 -translate-y-0.5 shadow-sm"
                  : isPast
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-line bg-surface hover:border-ink/30"
              }`}
              aria-label={`Step ${s.num}: ${s.title}`}
            >
              <p
                className={`font-display font-bold text-base leading-none ${
                  isActive
                    ? "text-amber-900"
                    : isPast
                    ? "text-emerald-700"
                    : "text-ink-muted"
                }`}
              >
                {isPast ? "✓" : s.num}
              </p>
              <p
                className={`mt-1 font-mono text-[0.55rem] tracking-[0.08em] uppercase leading-tight ${
                  isActive ? "text-amber-700" : "text-ink-subtle"
                }`}
              >
                Step
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 md:p-6">
        <div className="flex items-start gap-4 mb-4 pb-4 border-b border-line">
          <span className="text-4xl leading-none flex-shrink-0">
            {active.icon}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700">
              Step {active.num}
            </p>
            <h4 className="font-display text-xl font-bold text-ink leading-tight mt-1">
              {active.title}
            </h4>
          </div>
        </div>

        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mb-1.5">
          What you do
        </p>
        <p className="text-ink leading-relaxed">{active.action}</p>

        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mt-4 mb-1.5">
          What you see
        </p>
        <p className="text-ink leading-relaxed">{active.whatYouSee}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700 mb-1.5">
              🟢 Green light
            </p>
            <p className="text-[0.88rem] text-emerald-900 leading-relaxed">
              {active.greenLight}
            </p>
          </div>
          <div className="rounded-lg border-2 border-rose-200 bg-rose-50 px-4 py-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1.5">
              🔴 Red light
            </p>
            <p className="text-[0.88rem] text-rose-900 leading-relaxed">
              {active.redLight}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[0.75rem] text-ink-subtle italic leading-snug">
        Six steps, two to three minutes each. A full validation pass takes
        under 20 minutes per product.
      </p>
    </div>
  );
}
