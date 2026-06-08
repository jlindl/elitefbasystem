"use client";

import { useState } from "react";

type Part = {
  id: string;
  icon: string;
  title: string;
  position: string;
  job: "visibility" | "click" | "conversion";
  what: string;
  why: string;
};

const PARTS: Part[] = [
  {
    id: "title",
    icon: "🏷️",
    title: "Title",
    position: "Top of the page, big text",
    job: "visibility",
    what: "Up to 200 characters describing what the product is. The single most important field for Amazon's search algorithm because the words you put here are weighted heaviest in the keyword index.",
    why: "If a customer searches 'protein bar multipack' and your title contains those exact words in roughly that order, you appear. If not, you do not. Title is where most of the keyword optimisation work happens.",
  },
  {
    id: "main-image",
    icon: "🖼️",
    title: "Main Image",
    position: "Left of the listing, the hero shot",
    job: "click",
    what: "A single product shot on a pure white background, filling at least 85% of the frame. No text, badges, props, or lifestyle context allowed in this slot.",
    why: "The main image is what decides whether someone clicks your listing from a search results page. A clean, well-lit shot lifts click-through rate by an order of magnitude over a busy or off-brand image.",
  },
  {
    id: "bullets",
    icon: "•",
    title: "Bullet Points",
    position: "Top right, next to the main image",
    job: "conversion",
    what: "Five short benefit-led statements about the product. Each up to roughly 200 characters. Scannable, not paragraph-style.",
    why: "Most buyers do not read the description. The bullets are where they decide whether to add to basket. Lead each one with the benefit, then back it up with the spec.",
  },
  {
    id: "description",
    icon: "📝",
    title: "Description",
    position: "Below the fold, longer prose",
    job: "conversion",
    what: "A longer block of text that expands on what the bullets summarise. Allows limited HTML formatting (paragraphs, line breaks, bold) for visual structure.",
    why: "Catches the considered buyer who wants more context before committing. Also adds keyword surface area for the search index, even though it carries less weight than the title.",
  },
  {
    id: "aplus",
    icon: "🎨",
    title: "A+ Content",
    position: "Below the description, image-driven modules",
    job: "conversion",
    what: "A visual content section replacing the plain description for sellers with Brand Registry. Image-led modules, comparison charts, brand story.",
    why: "Locked behind Brand Registry, which we unlock in Module 6. For Module 4, the description does this job. Once you trademark your brand, you upgrade.",
  },
  {
    id: "price",
    icon: "💷",
    title: "Price & Offer",
    position: "Right rail, under the buy box",
    job: "click",
    what: "The current selling price, any strike-through reference price, Prime badge, and stock status. Set in Seller Central separately from the listing itself.",
    why: "Price legibility is part of the click decision. A clear, single price beats a crossed-out price with confusing discount maths. The Prime badge here is what unlocks the badge halo from Module 1.",
  },
  {
    id: "reviews",
    icon: "⭐",
    title: "Reviews & Star Rating",
    position: "Under the title, accumulates over time",
    job: "click",
    what: "Customer-generated ratings and written reviews. You do not control these directly but they are the single biggest conversion lever past launch.",
    why: "A four-star rating with 200 reviews outsells a five-star rating with 8 reviews on the same keyword almost every time. Review count signals legitimacy; the star average signals quality. Both matter.",
  },
  {
    id: "bsr",
    icon: "📊",
    title: "Best Seller Rank",
    position: "In the 'Product information' section",
    job: "visibility",
    what: "Amazon's rank of how well this listing sells inside its main category. Lower number is better. A BSR under 20,000 in a major category usually means a few hundred units per month.",
    why: "BSR is not something you set; it is something you measure. We use it across Module 3 to validate demand and across Module 4 to gauge whether the listing is gaining traction once live.",
  },
];

const JOB_META = {
  visibility: { label: "Visibility", color: "text-violet-700 bg-violet-50" },
  click: { label: "Click", color: "text-blue-700 bg-blue-50" },
  conversion: { label: "Conversion", color: "text-emerald-700 bg-emerald-50" },
} as const;

export function ListingAnatomy() {
  const [activeId, setActiveId] = useState<string>(PARTS[0].id);
  const active = PARTS.find((p) => p.id === activeId) ?? PARTS[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-blue-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🧱 Anatomy of an Amazon Listing
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {PARTS.length} parts · 3 jobs
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Every Amazon listing is made of these eight parts. Each one does one of
        three jobs: getting found (visibility), getting clicked (click), or
        getting bought (conversion). Tap any part to see what it does.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {PARTS.map((p) => {
          const isActive = activeId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`text-left rounded-xl border-2 px-3 py-3 transition-all duration-150 ${
                isActive
                  ? "border-blue-400 bg-blue-50 ring-2 ring-blue-200"
                  : "border-line bg-surface hover:border-ink/30"
              }`}
            >
              <span className="text-xl leading-none">{p.icon}</span>
              <p
                className={`font-display font-semibold text-[0.85rem] leading-tight mt-1 ${
                  isActive ? "text-blue-900" : "text-ink"
                }`}
              >
                {p.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-blue-300 bg-white p-5 md:p-6">
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
                className={`inline-flex h-5 px-2 items-center rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase ${JOB_META[active.job].color}`}
              >
                {JOB_META[active.job].label}
              </span>
            </div>
            <p className="text-[0.78rem] text-ink-subtle italic mt-1">
              {active.position}
            </p>
          </div>
        </div>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-blue-700 mb-1.5">
          What it is
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed">{active.what}</p>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-blue-700 mt-4 mb-1.5">
          Why it matters
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed">{active.why}</p>
      </div>
    </div>
  );
}
