"use client";

import { useState } from "react";

type Slot = {
  id: string;
  num: number;
  icon: string;
  title: string;
  required: boolean;
  rules: string[];
  contentIdea: string;
  aiPrompt: string;
};

const SLOTS: Slot[] = [
  {
    id: "main",
    num: 1,
    icon: "🎯",
    title: "Main Image",
    required: true,
    rules: [
      "Pure white background (RGB 255, 255, 255). Off-white fails.",
      "Product fills at least 85% of the frame.",
      "No text, badges, logos, watermarks, props, or models touching the product.",
      "Square 1:1 ratio, minimum 1600x1600 px (for zoom).",
      "JPEG or PNG, sRGB colour space.",
    ],
    contentIdea:
      "A clean studio shot of the bundle laid out. For a 3-pack, the three units arranged in a row or pyramid with no overlap. No human hands, no shopping bag, no shelf. This single image carries the click-through rate of the entire listing.",
    aiPrompt:
      "A professional product photography shot of {DETAILED PRODUCT DESCRIPTION, including colour, material, finish, and exact quantity}. Pure white background, RGB 255 255 255, no gradient. Soft studio lighting from the upper-left with a faint contact shadow directly underneath the product. Product centred and filling roughly 85% of the frame. Square 1:1 aspect ratio. Photorealistic, sharp focus, high detail. No text, no logos, no badges, no human elements, no props, no background objects of any kind.",
  },
  {
    id: "lifestyle-1",
    num: 2,
    icon: "🏡",
    title: "Lifestyle Shot",
    required: false,
    rules: [
      "Background can be anything in-context.",
      "Product still needs to be clearly visible and identifiable.",
      "Same square 1600x1600 px minimum.",
    ],
    contentIdea:
      "Show the product in use. A pet treat bundle: the dog mid-treat. A protein bar 3-pack: gym bag setting with one bar unwrapped. A cutlery set: laid on a set dining table. This is where you communicate who the product is for.",
    aiPrompt:
      "A natural lifestyle photograph showing {PRODUCT} in {USE CONTEXT, e.g. a bright modern dining room mid-evening, place settings on a wooden table}. Product clearly visible and identifiable in the foreground. Soft natural daylight from a window, real-world setting, shallow depth of field, warm tones. Square 1:1 aspect ratio. Photorealistic, candid framing. No text overlays, no text on the product.",
  },
  {
    id: "infographic",
    num: 3,
    icon: "📊",
    title: "Benefits Infographic",
    required: false,
    rules: [
      "Mix of product imagery and short text callouts.",
      "Use brand-consistent colours and typography.",
      "Avoid text smaller than 50px on a 1600px canvas; it will not be legible on mobile.",
    ],
    contentIdea:
      "Three to four icon-and-text callouts surrounding the product, each highlighting one benefit (e.g. 'Dishwasher-safe', '24 pieces', 'Stainless steel', 'Sets for 6'). AI can generate the base layout; if the text comes out garbled (a common AI weakness), redo the text layer in Canva on top of the AI-generated background.",
    aiPrompt:
      "A clean Amazon listing infographic with {PRODUCT} centred on a soft neutral background. Arrange four icon-and-text callouts around the product highlighting these benefits: {BENEFIT 1}, {BENEFIT 2}, {BENEFIT 3}, {BENEFIT 4}. Use minimal flat icons in a single accent colour, large sans-serif typography (text at least 50 pixels tall), generous spacing between elements. Square 1:1 aspect ratio. Modern, premium, magazine-style design. Ensure all text is sharp and legible.",
  },
  {
    id: "use-case",
    num: 4,
    icon: "🎬",
    title: "Use Case Demonstration",
    required: false,
    rules: [
      "Show the product being used in two to four numbered steps.",
      "Each step in its own panel with a numbered badge in the corner.",
      "Steps should make sense without reading any text.",
    ],
    contentIdea:
      "A sequence showing the product being used in 2-4 numbered steps. For a cutlery set: 1) take from the box, 2) lay on the table, 3) eat, 4) put in dishwasher. For a snack multipack: 1) tear open, 2) eat, 3) reseal for later. Removes the 'how do I actually use this' hesitation that kills conversion on first-time-buyer products.",
    aiPrompt:
      "An Amazon listing image showing {PRODUCT} being used in three sequential steps, arranged either horizontally as three panels or as a 2x2 grid with the product hero in one quadrant. Step 1: {ACTION 1}. Step 2: {ACTION 2}. Step 3: {ACTION 3}. Each step in its own clearly defined panel with a small circular numbered badge in the top-left corner. Soft neutral background, consistent lighting across panels, clean modern design with sans-serif typography. Square 1:1 aspect ratio. Photorealistic product shots, illustration-style numbered overlays.",
  },
  {
    id: "feature-detail",
    num: 5,
    icon: "🔬",
    title: "Feature Detail",
    required: false,
    rules: [
      "Close-up macro shot of one key feature (texture, material, finish).",
      "High resolution; this is where customers zoom.",
      "Stay away from any feature that requires legible text (AI handles small text poorly).",
    ],
    contentIdea:
      "A macro shot of the one feature that most justifies the price. For a cutlery set: the polished edge of a knife or the satin finish of a fork handle. For a skincare bundle: the cream's texture as it is squeezed from the bottle. Choose a feature where material and finish do the talking, not text.",
    aiPrompt:
      "An extreme macro close-up photograph of {SPECIFIC FEATURE, e.g. the polished edge and satin handle of a stainless steel knife}. Razor-sharp focus on the texture and finish being highlighted. Soft side-lighting at roughly 45 degrees to bring out surface detail. Neutral background, completely out of focus. Square 1:1 aspect ratio. Photorealistic, high microcontrast. No text, no labels, no overlays.",
  },
  {
    id: "bundle-contents",
    num: 6,
    icon: "🎁",
    title: "What's In The Bundle",
    required: false,
    rules: [
      "Overhead flat-lay showing every item in the bundle.",
      "Items arranged neatly so quantities are obvious.",
      "Pure white or soft neutral background.",
    ],
    contentIdea:
      "An overhead flat-lay of every item in the bundle, arranged so the customer can count what they are getting. For a 24-piece cutlery set: 6 knives, 6 forks, 6 spoons, 6 teaspoons in four neat rows. For a snack 12-pack: three rows of four bars. Pre-empts the 'how many did I just buy and what exactly is included' confusion.",
    aiPrompt:
      "A clean overhead flat-lay product photograph showing every item included in the bundle: {LIST EVERY ITEM WITH EXACT QUANTITY, e.g. 6 dinner knives, 6 dinner forks, 6 dessert spoons, 6 teaspoons}. Arrange the items in neat rows or a grid with even spacing on a pure white background. Soft diffused top-down lighting with minimal shadows. All items clearly separated, none overlapping. Square 1:1 aspect ratio. Photorealistic, sharp focus throughout the frame. No text overlays.",
  },
  {
    id: "lifestyle-2",
    num: 7,
    icon: "👤",
    title: "Target Customer Scene",
    required: false,
    rules: [
      "A second lifestyle slot showing a different use case or customer.",
      "Same in-context background freedom as slot 2.",
    ],
    contentIdea:
      "If slot 2 was 'family dining', slot 7 might be 'dinner party with friends'. Two different lifestyle contexts widen the customer who recognises themselves in the listing. Optional, but uses a free slot.",
    aiPrompt:
      "A natural lifestyle photograph showing {TARGET CUSTOMER, e.g. a small group of friends in their late twenties} using {PRODUCT} in {SETTING, e.g. a relaxed dinner party at home with candles on the table}. Product clearly visible. Real-world context, warm natural lighting, candid framing, shallow depth of field. Square 1:1 aspect ratio. Photorealistic. No text overlays.",
  },
];

export function ListingImagesGuide() {
  const [activeId, setActiveId] = useState<string>(SLOTS[0].id);
  const active = SLOTS.find((s) => s.id === activeId) ?? SLOTS[0];
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(active.aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available, silently ignore
    }
  }

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-pink-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          📷 The Seven Image Slots
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          1 required · 6 optional
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Amazon gives you seven image slots per listing. Slot one is required
        and has strict rules; the other six are where you tell the story. Every
        slot can be generated with AI; tap a slot to see the rules, the content
        idea, and the exact prompt to paste into your image generator.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {SLOTS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`text-left rounded-xl border-2 px-3 py-3 transition-all duration-150 ${
                isActive
                  ? "border-pink-400 bg-pink-50 ring-2 ring-pink-200"
                  : "border-line bg-surface hover:border-ink/30"
              }`}
            >
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-xl leading-none">{s.icon}</span>
                <span className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-ink-subtle">
                  #{s.num}
                </span>
              </div>
              <p
                className={`font-display font-semibold text-[0.8rem] leading-tight mt-1 ${
                  isActive ? "text-pink-900" : "text-ink"
                }`}
              >
                {s.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-pink-300 bg-white p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-line">
          <span className="text-4xl leading-none flex-shrink-0">
            {active.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <h4 className="font-display text-xl font-bold text-ink leading-tight">
                Slot {active.num}: {active.title}
              </h4>
              <span
                className={`inline-flex h-5 px-2 items-center rounded-full font-mono text-[0.55rem] font-semibold tracking-[0.1em] uppercase ${
                  active.required
                    ? "bg-rose-100 text-rose-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {active.required ? "Required" : "Optional"}
              </span>
            </div>
          </div>
        </div>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-pink-700 mb-2">
          Rules
        </p>
        <ul className="space-y-1.5 mb-4">
          {active.rules.map((r) => (
            <li
              key={r}
              className="text-[0.88rem] text-ink leading-relaxed flex items-start gap-2"
            >
              <span className="text-pink-500 flex-shrink-0">▸</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-pink-700 mb-2">
          What to put in this slot
        </p>
        <p className="text-[0.92rem] text-ink leading-relaxed mb-5">
          {active.contentIdea}
        </p>

        <div className="rounded-xl border-2 border-violet-200 bg-violet-50/60 p-4">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-violet-700">
              🤖 AI Prompt
            </p>
            <button
              type="button"
              onClick={copyPrompt}
              className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-violet-700 hover:text-violet-900 transition-colors"
            >
              {copied ? "✓ Copied" : "Copy prompt"}
            </button>
          </div>
          <p className="font-mono text-[0.8rem] text-ink leading-relaxed whitespace-pre-wrap">
            {active.aiPrompt}
          </p>
          <p className="text-[0.75rem] text-violet-800 italic leading-snug mt-3">
            Paste into ChatGPT (with image generation), Midjourney, Google
            Gemini, or Bing Image Creator. Fill the placeholders in curly
            braces before sending.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border-2 border-line bg-surface p-5">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle mb-3">
          Universal image specs (all seven slots)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-line bg-white px-3 py-2.5">
            <p className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-ink-subtle">
              Dimensions
            </p>
            <p className="text-[0.88rem] text-ink font-semibold mt-0.5">
              1600 × 1600 px minimum
            </p>
            <p className="text-[0.75rem] text-ink-muted mt-1">
              2000 × 2000 ideal. Unlocks zoom, which materially lifts
              conversion.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white px-3 py-2.5">
            <p className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-ink-subtle">
              Aspect ratio
            </p>
            <p className="text-[0.88rem] text-ink font-semibold mt-0.5">
              1:1 (square)
            </p>
            <p className="text-[0.75rem] text-ink-muted mt-1">
              Non-square images crop, often badly. Square keeps you in control.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white px-3 py-2.5">
            <p className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-ink-subtle">
              File format
            </p>
            <p className="text-[0.88rem] text-ink font-semibold mt-0.5">
              JPEG or PNG, sRGB
            </p>
            <p className="text-[0.75rem] text-ink-muted mt-1">
              File size under 10MB. Name the file with the SKU and slot number
              for sanity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
