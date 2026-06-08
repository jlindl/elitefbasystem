"use client";

import { useState } from "react";

type Ground = {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  format: "physical" | "online";
  bestCategories: string[];
  whatToLookFor: string;
  scanRoutine: string;
  watchOut?: string;
  highlighted?: boolean;
};

const GROUNDS: Ground[] = [
  {
    id: "boots",
    icon: "💄",
    name: "Boots / Superdrug",
    tagline: "Brand discovery in beauty, personal care, vitamins, and baby.",
    format: "physical",
    bestCategories: ["Beauty", "Vitamins", "Personal Care", "Baby"],
    whatToLookFor:
      "Walk the shelves at full retail price. The point here is brand discovery, not bargain-hunting. You are looking for third-party branded products in our target categories that you can plausibly picture as a multipack. Note the brand on the packaging, then trace it back to its UK distributor for ongoing wholesale supply. We are not buying inventory off the shelf here.",
    scanRoutine:
      "Photograph any branded product priced at £4 to £10 that you think could work in a 2-pack or 3-pack. Especially mid-sized brands like KMS, NYX, Sukin, Childs Farm, Dr. Bronner's. That evening, search the brand name on Amazon (does a multipack already exist?) and Google 'BRAND wholesale UK' (is there an accessible distributor?).",
    watchOut:
      "Boots own-brand and No7 are gated. Stick to third-party brands on the shelves.",
  },
  {
    id: "b-and-m",
    icon: "🏷️",
    name: "B&M / Home Bargains",
    tagline: "Discount retailers. Best for spotting mid-sized brands fast.",
    format: "physical",
    bestCategories: ["Beauty", "Home", "Pet", "Snacks", "Personal Care"],
    whatToLookFor:
      "These shops carry mid-sized UK brands at low retail prices. Dr. Beckmann, Vosene, Astonish, Childs Farm, Pedigree treats. These repeat-stocking brands are exactly the profile we target. Use B&M and Home Bargains as a brand discovery channel, not a one-off arbitrage opportunity. We are noting which brands to pursue at wholesale for ongoing supply, not buying stock to flip.",
    scanRoutine:
      "Walk every aisle. Note the brands that appear consistently. Photograph anything that fits a multipack candidate. That evening, search the brand on Amazon to check for an existing multipack, then Google 'BRAND wholesale UK' to find the distributor's email address.",
    watchOut:
      "B&M occasionally carries parallel-imported stock with non-English packaging. Amazon listings must show English packaging primarily, so skip non-English variants entirely.",
  },
  {
    id: "pound-shops",
    icon: "💷",
    name: "Poundland / Savers",
    tagline: "Sub-£3 branded basics. Mini-sized products that bundle naturally.",
    format: "physical",
    bestCategories: ["Beauty", "Snacks", "Pet", "Cleaning", "Personal Care"],
    whatToLookFor:
      "Mini-sized branded products that bundle naturally into 3-packs. Travel-size shampoos, mini snack bars, single deodorants, sample-sized vitamins. Customers often expect to buy these in multipacks; Amazon frequently only lists single units. Note the brand and trace it to wholesale; do not build a business on Poundland resale, because the supply is not contractually stable.",
    scanRoutine:
      "Focus on branded items priced £1 to £2. Note the brand name and SKU, then check at home: does a multipack version exist on Amazon? Does the brand have a UK distributor you can email? Brands that pass both checks are your shortlist for wholesale outreach.",
    watchOut:
      "Best-before dates are short on some Poundland stock. Even at wholesale, anything within four months of best-before is a Q4 storage trap. Skip it.",
  },
  {
    id: "mini-markets",
    icon: "🏪",
    name: "Local mini markets / corner shops",
    tagline:
      "Our standout hunting ground. Unique to every high street, broad product range, every brand maps to an accessible wholesaler.",
    format: "physical",
    bestCategories: ["Snacks", "Drinks", "Personal Care", "Cleaning", "Pet"],
    highlighted: true,
    whatToLookFor:
      "This is the single best hunting ground on the high street, and we cannot recommend it enough. Every town has its own independent mini markets and corner shops, and no two carry exactly the same brand mix, which means you have a constant flow of locally-unique candidates that operators in another town are not looking at. The product range across these shops is genuinely broad (snacks, drinks, beauty, cleaning, personal care, pet, baby), so almost any target category we work in has something on shelf. Most importantly, every brand stocked is by definition supplied by a regional cash-and-carry wholesaler (Bestway, Booker, JJ Foodservice, regional Asian and Polish cash-and-carries) who is willing to deal in small case quantities to a small business. That is precisely the supply profile we want for ongoing reorders.",
    scanRoutine:
      "Walk three to five mini markets in your area over the week. Photograph the branded products that appear repeatedly across multiple shops, because repeat presence signals a wholesaler with reliable supply. Note the brand, then Google 'BRAND wholesale UK' or 'BRAND cash and carry UK'. If you build rapport with the owner you can sometimes ask directly which cash-and-carry they buy from; most are open about it because it is not their competitive moat.",
    watchOut:
      "One rare brand sitting on a single shelf is not the signal. Look for the same brand in two or three independent shops; that consistency is what tells you the wholesale supply is steady.",
  },
  {
    id: "specialist",
    icon: "🐾",
    name: "Pet shops, health stores, specialist retailers",
    tagline: "Niche categories with strong repeat customers.",
    format: "physical",
    bestCategories: ["Pet", "Supplements", "Health", "Specialist Beauty"],
    whatToLookFor:
      "Independent pet shops, Holland & Barrett, local health food stores, small specialist beauty retailers. Categories with passionate niches: dental dog treats, plant-based protein powders, sensitive-skin skincare. Margins are higher and competition is lower than mass-market.",
    scanRoutine:
      "Look for products with cult followings (high reviews on Amazon) but low listing variety. A specialist brand of dog dental chews with 2,000 reviews and only one seller is exactly the gap you want.",
    watchOut:
      "Some specialist brands restrict third-party Amazon sales via distribution agreements. Always verify on the brand's website that they allow Amazon resale before committing to wholesale.",
  },
  {
    id: "online-amazon",
    icon: "🔍",
    name: "Amazon itself (reverse-discovery)",
    tagline: "Search Amazon to find products that need a bundle.",
    format: "online",
    bestCategories: ["Any category we already target"],
    whatToLookFor:
      "Search a broad term like 'shampoo 250ml' or 'protein bar' and sort by BSR. Find single-unit listings with high sales volume and ask: does a 3-pack or complementary bundle exist? If the answer is no or weak, you have spotted a gap. Then trace the product back to physical retail or wholesale.",
    scanRoutine:
      "Pick a category. Sort by Bestsellers. Open the top 30 listings. Note which are single units with no bundle equivalent. Cross-check the Helium 10 X-Ray sales estimate. If the single does 1000+ units/month, the bundle market is wide open.",
    watchOut:
      "Do not just copy what already exists with a slightly different photo. Amazon's bundling rules require genuinely distinct combinations.",
  },
  {
    id: "online-distributors",
    icon: "🌐",
    name: "Online distributor directories",
    tagline: "Find wholesale sources before you walk a single shop.",
    format: "online",
    bestCategories: ["Any"],
    whatToLookFor:
      "Sites like wholesaledomain.co.uk, esources.co.uk, or simply Googling 'BRAND NAME wholesale UK' often surface the regional distributor. Their websites list available SKUs and minimum order quantities. This is also where you find email addresses for cold outreach.",
    scanRoutine:
      "Pick a brand you saw at retail. Search 'BRAND NAME UK distributor' or 'BRAND NAME wholesale UK'. Open the first three results. Note the email addresses and MOQ requirements. Save them for Lesson 6.",
    watchOut:
      "esources.co.uk and similar directories sometimes list aggregators, not direct distributors. Aggregator pricing is barely below retail. Always cross-check by going one level upstream.",
  },
];

export function HuntingGrounds() {
  const initial = GROUNDS.find((g) => g.highlighted) ?? GROUNDS[0];
  const [activeId, setActiveId] = useState<string>(initial.id);
  const active = GROUNDS.find((g) => g.id === activeId) ?? initial;
  const physicalCount = GROUNDS.filter((g) => g.format === "physical").length;
  const onlineCount = GROUNDS.filter((g) => g.format === "online").length;

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-purple-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🛒 Your Hunting Grounds
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {physicalCount} physical · {onlineCount} online
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-3">
        Walk every aisle on the high street and search every directory online.
        Tap a hunting ground to see what to look for and how to scan it.
      </p>
      <div className="mb-5 rounded-xl border-2 border-amber-300 bg-amber-50/60 px-4 py-3 flex items-start gap-3">
        <span className="text-2xl leading-none flex-shrink-0">⭐</span>
        <p className="text-[0.85rem] text-amber-900 leading-relaxed">
          <span className="font-display font-bold">
            Local mini markets are our standout pick.
          </span>{" "}
          They are unique to every high street, carry a broad product range
          across our target categories, and every brand on shelf is, by
          definition, supplied by an accessible cash-and-carry wholesaler.
          Start there.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
        <nav className="rounded-xl border-2 border-line bg-surface p-2 space-y-1">
          <p className="font-mono text-[0.55rem] tracking-[0.14em] uppercase text-ink-subtle px-3 pt-2 pb-1">
            On the high street
          </p>
          {GROUNDS.filter((g) => g.format === "physical").map((g) => {
            const isActive = activeId === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveId(g.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                  isActive
                    ? g.highlighted
                      ? "bg-amber-50 text-amber-900 ring-2 ring-amber-300"
                      : "bg-purple-50 text-purple-900"
                    : g.highlighted
                    ? "bg-amber-50/40 text-amber-900 hover:bg-amber-50"
                    : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                }`}
              >
                <span className="text-lg leading-none">{g.icon}</span>
                <span className="font-display font-semibold text-[0.85rem] leading-tight flex-1 min-w-0">
                  {g.name}
                </span>
                {g.highlighted && (
                  <span
                    className="text-amber-500 text-sm leading-none flex-shrink-0"
                    title="Standout pick"
                  >
                    ⭐
                  </span>
                )}
              </button>
            );
          })}

          <p className="font-mono text-[0.55rem] tracking-[0.14em] uppercase text-ink-subtle px-3 pt-3 pb-1">
            Online
          </p>
          {GROUNDS.filter((g) => g.format === "online").map((g) => {
            const isActive = activeId === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveId(g.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 ${
                  isActive
                    ? "bg-purple-50 text-purple-900"
                    : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                }`}
              >
                <span className="text-lg leading-none">{g.icon}</span>
                <span className="font-display font-semibold text-[0.85rem] leading-tight">
                  {g.name}
                </span>
              </button>
            );
          })}
        </nav>

        <div
          className={`rounded-2xl border-2 bg-white p-5 md:p-6 ${
            active.highlighted ? "border-amber-400 shadow-md" : "border-purple-300"
          }`}
        >
          {active.highlighted && (
            <div className="mb-4 -mt-1 -mx-1 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1">
              <span className="text-amber-600 text-sm leading-none">⭐</span>
              <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-800 font-bold">
                Standout pick · Start here
              </span>
            </div>
          )}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-line">
            <span className="text-4xl leading-none flex-shrink-0">
              {active.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={`font-mono text-[0.6rem] tracking-[0.14em] uppercase ${
                  active.highlighted ? "text-amber-700" : "text-purple-700"
                }`}
              >
                {active.format === "physical" ? "On the high street" : "Online"}
              </p>
              <h4 className="font-display text-xl font-bold text-ink leading-tight mt-1">
                {active.name}
              </h4>
              <p className="text-[0.85rem] text-ink-muted italic mt-0.5">
                {active.tagline}
              </p>
            </div>
          </div>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-purple-700 mb-1.5">
            Best categories
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {active.bestCategories.map((c) => (
              <span
                key={c}
                className="inline-flex h-6 px-2.5 items-center rounded-full bg-purple-50 text-purple-800 font-mono text-[0.6rem] font-semibold tracking-[0.08em] uppercase"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-purple-700 mb-1.5">
            What to look for
          </p>
          <p className="text-[0.92rem] text-ink leading-relaxed">
            {active.whatToLookFor}
          </p>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-purple-700 mt-4 mb-1.5">
            Your scan routine
          </p>
          <p className="text-[0.92rem] text-ink leading-relaxed">
            {active.scanRoutine}
          </p>

          {active.watchOut && (
            <div className="mt-5 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mb-1">
                ⚠️ Watch out
              </p>
              <p className="text-[0.88rem] text-amber-900 leading-relaxed">
                {active.watchOut}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
