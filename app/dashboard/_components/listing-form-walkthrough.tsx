"use client";

import { useState } from "react";

type Section = {
  id: string;
  icon: string;
  title: string;
  summary: string;
  fields: Field[];
};

type Field = {
  name: string;
  whatItIs: string;
  howToFill: string;
  watchOut?: string;
};

const SECTIONS: Section[] = [
  {
    id: "dimensions",
    icon: "📐",
    title: "Item & Package Dimensions",
    summary:
      "Two sets of measurements. The item itself, and the bundle as it physically ships.",
    fields: [
      {
        name: "Item Length / Width / Height",
        whatItIs:
          "The physical dimensions of a single unit inside the bundle, in centimetres.",
        howToFill:
          "Measure one unit with a tape measure. Round up by 1mm to be safe. These numbers feed product comparison tools and customer expectation, not the FBA fee calculation.",
      },
      {
        name: "Package Length / Width / Height",
        whatItIs:
          "The physical dimensions of the bundle as it ships, polybagged and labelled.",
        howToFill:
          "Pack the bundle, tape it shut, then measure the outside with a tape measure. Round up by 2mm on each axis. This number drives the Amazon size tier and therefore the FBA fee.",
        watchOut:
          "Amazon's Cubiscan in the warehouse re-measures every inbound box. If your figures are smaller than what they measure, you get re-categorised into a higher size tier and the fee jumps without warning. Always measure with the polybag fully on.",
      },
      {
        name: "Item Weight",
        whatItIs: "Weight of a single unit inside the bundle, in grams.",
        howToFill:
          "Kitchen scale, one unit on, read the number. Use grams for items under 1kg, kilograms for items over.",
      },
      {
        name: "Package Weight",
        whatItIs:
          "Weight of the bundle as it ships, polybagged and labelled, in grams.",
        howToFill:
          "Place the finished bundle on the scale. Include any padding, the polybag, and the FNSKU label. The total is what Amazon uses for the weight half of the size tier calculation.",
      },
    ],
  },
  {
    id: "compliance",
    icon: "✅",
    title: "Compliance Declarations",
    summary:
      "A handful of yes-or-no questions that determine whether the listing can publish.",
    fields: [
      {
        name: "Country of Origin",
        whatItIs: "Where the product was manufactured, not where it was packed.",
        howToFill:
          "Read the back of the packaging. 'Made in Australia' on the bottle means Australia, even if your bundle is packed in the UK. If the bundle contains products from multiple countries, list the country of the highest-value component or 'Various'.",
      },
      {
        name: "Hazmat / Dangerous Goods",
        whatItIs:
          "Whether any component is classified as a dangerous good for transport (aerosols, liquids over a certain volume, flammables, batteries).",
        howToFill:
          "For most bundles, the answer is 'No'. If your bundle contains aerosols (deodorant, hairspray), batteries (any electronic), or large-volume liquids (over 500ml of flammable liquid), declare yes and Amazon walks you through the additional disclosure form.",
        watchOut:
          "Misdeclaring hazmat as 'No' when it is 'Yes' is an account-health failure when Amazon catches it inbound. Always declare honestly, even if it means the listing takes an extra day to approve.",
      },
      {
        name: "Material / Ingredient List",
        whatItIs:
          "What the product is made of (for non-food) or what it contains (for food, supplements, cosmetics).",
        howToFill:
          "Copy directly from the back of the product. Do not summarise or omit. Amazon's compliance team cross-checks this against the photos and rejects listings that disagree with the packaging.",
      },
    ],
  },
  {
    id: "search-terms",
    icon: "🔍",
    title: "Backend Search Terms",
    summary:
      "Invisible to customers, indexed by Amazon's search algorithm. 250 bytes total.",
    fields: [
      {
        name: "Search Terms field",
        whatItIs:
          "A single string of search keywords separated by spaces. Up to 250 bytes (roughly 250 characters of plain text).",
        howToFill:
          "Use the keywords that did not fit naturally into the title or bullets. Common spelling variants, alternate phrasings, related-product terms. Separate with spaces, not commas. Do not include any word that already appears in your title.",
      },
      {
        name: "What to avoid",
        whatItIs: "Words and patterns Amazon explicitly does not index.",
        howToFill:
          "No competitor brand names. No subjective claims like 'best' or 'top-rated'. No misspellings of major brands. No phone numbers, URLs, or email addresses. No repeated words. Each violates Amazon's keyword policy and gets the field stripped without notice.",
        watchOut:
          "Amazon does not warn you when it strips your search terms. The field will simply show as if it published, but no traffic comes from it. Audit yours every few weeks by searching the keywords and confirming you appear.",
      },
    ],
  },
  {
    id: "pricing",
    icon: "💷",
    title: "Pricing & Offer",
    summary:
      "Set on a separate page from the listing details, but happens before you click publish.",
    fields: [
      {
        name: "Your Price",
        whatItIs: "The sale price the customer sees on the buy box.",
        howToFill:
          "Use the pricing formula from Module 3 Lesson 5: single-unit Amazon price × bundle count, minus 10 to 15%. This is your launch price. You can adjust later based on real conversion data.",
      },
      {
        name: "Automated Pricing (skip this)",
        whatItIs:
          "An optional Amazon feature that lets the platform (or a third-party tool) automatically raise and lower your price in response to competitor moves. The form will offer to set you up; do not enable it.",
        howToFill:
          "Leave automated pricing off and price the listing manually using the formula in Module 3 Lesson 5. Auto-pricing tools tend to race competitors to the bottom on a new listing with no review velocity yet, which trains Amazon's algorithm to treat your price band as low. Manual control gives you predictable economics while you are still validating.",
        watchOut:
          "If you do explore auto-pricing later (once the listing has 50+ reviews and steady velocity), always set hard minimum and maximum price rails first so a misbehaving tool cannot accidentally list you at £0.99 or £999.",
      },
      {
        name: "Fulfilment Channel",
        whatItIs: "FBA (Amazon ships) or FBM (you ship).",
        howToFill:
          "Select FBA. This is the whole point of the course.",
      },
    ],
  },
];

export function ListingFormWalkthrough() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [activeField, setActiveField] = useState<number>(0);
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];
  const field = active.fields[activeField] ?? active.fields[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-orange-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        📋 The Remaining Form Fields
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        Once your copy, images, and brand are in place, there are four sections
        left on the listing form. Tap a section, then tap a field for what it
        is and how to fill it.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveId(s.id);
                setActiveField(0);
              }}
              className={`text-left rounded-xl border-2 px-3 py-3 transition-all duration-150 ${
                isActive
                  ? "border-orange-400 bg-orange-50 ring-2 ring-orange-200"
                  : "border-line bg-surface hover:border-ink/30"
              }`}
            >
              <span className="text-xl leading-none">{s.icon}</span>
              <p
                className={`font-display font-semibold text-[0.85rem] leading-tight mt-1 ${
                  isActive ? "text-orange-900" : "text-ink"
                }`}
              >
                {s.title}
              </p>
            </button>
          );
        })}
      </div>

      <p className="text-[0.85rem] text-ink-muted leading-relaxed mb-3">
        {active.summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3">
        <nav className="rounded-xl border-2 border-line bg-surface p-2 space-y-1">
          {active.fields.map((f, idx) => {
            const isActiveField = activeField === idx;
            return (
              <button
                key={f.name}
                type="button"
                onClick={() => setActiveField(idx)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-150 ${
                  isActiveField
                    ? "bg-orange-50 text-orange-900"
                    : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                }`}
              >
                <span className="font-display font-semibold text-[0.82rem] leading-tight">
                  {f.name}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="rounded-2xl border-2 border-orange-300 bg-white p-5">
          <h4 className="font-display text-lg font-bold text-ink leading-tight">
            {field.name}
          </h4>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-orange-700 mt-3 mb-1">
            What it is
          </p>
          <p className="text-[0.9rem] text-ink leading-relaxed">
            {field.whatItIs}
          </p>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-orange-700 mt-3 mb-1">
            How to fill it
          </p>
          <p className="text-[0.9rem] text-ink leading-relaxed">
            {field.howToFill}
          </p>

          {field.watchOut && (
            <div className="mt-4 rounded-lg border-l-4 border-rose-500 bg-rose-50 px-4 py-3">
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1">
                ⚠️ Watch out
              </p>
              <p className="text-[0.85rem] text-rose-900 leading-relaxed">
                {field.watchOut}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
