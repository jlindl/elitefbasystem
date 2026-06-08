"use client";

import { useState } from "react";

type Template = {
  id: string;
  icon: string;
  label: string;
  goal: string;
  prompt: string;
  fillIn: string[];
  watchOut: string;
};

const TEMPLATES: Template[] = [
  {
    id: "keywords",
    icon: "🔍",
    label: "Keyword Research Prompt",
    goal: "Generate a brainstormed list of 15 to 20 realistic customer search phrases for your product, before you write any listing copy.",
    prompt:
      "You are an Amazon UK SEO keyword researcher. I am about to launch a product on Amazon UK and need to identify the search phrases real UK customers would type into the Amazon search bar to find it. The product is: {ONE-SENTENCE PRODUCT DESCRIPTION}. The target customer is: {WHO BUYS THIS}. The main use case is: {WHEN AND WHY THEY USE IT}. Produce a list of 15 to 20 distinct keyword phrases that a UK customer might realistically type. Cover three angles: (1) what the product is, (2) who or what it is for, (3) the size, quantity, material, or finish. Use British English spellings throughout. Format the output as a simple numbered list, with the shortest most-common phrases first and the longer more specific phrases last. Do not include any phrase containing a competitor brand name, and do not include marketing words like 'best' or 'amazing'.",
    fillIn: [
      "{ONE-SENTENCE PRODUCT DESCRIPTION}: e.g. a 24-piece stainless steel dining cutlery set for 6 people",
      "{WHO BUYS THIS}: e.g. UK households setting up a new kitchen or replacing worn cutlery",
      "{WHEN AND WHY THEY USE IT}: e.g. everyday meals at the dining table, dishwasher-safe",
    ],
    watchOut:
      "AI keyword lists are a brainstorm starting point, not a replacement for Helium 10. The AI cannot tell you which phrases customers actually search or how many searches each phrase gets per month. Take the AI list, cross-reference it against Helium 10 X-Ray on a top competitor, keep the phrases that show real search volume, and feed those into the Title prompt below.",
  },
  {
    id: "title",
    icon: "🏷️",
    label: "Title Prompt",
    goal: "Generate a 200-character keyword-front-loaded title for a generic-brand bundle.",
    prompt:
      "You are an Amazon listing copywriter for the UK marketplace. Write a product title for a bundle I am about to list. The bundle is {QUANTITY} units of {PRODUCT NAME} by {BRAND NAME}, weighing {SIZE PER UNIT} each. The primary search keywords I want to rank for are: {KEYWORD 1}, {KEYWORD 2}, {KEYWORD 3}. Output a single title under 200 characters, using British English. Lead with the brand, then the product, then the variant or size, then the bundle quantity, then one or two keyword phrases. Do not use marketing fluff, exclamation marks, or words like 'best' or 'amazing'.",
    fillIn: [
      "{QUANTITY}: for example, 3-Pack or 2-Pack",
      "{PRODUCT NAME}: the exact product description",
      "{BRAND NAME}: the brand on the packaging",
      "{SIZE PER UNIT}: e.g. 250ml, 60g, 100 capsules",
      "{KEYWORD 1/2/3}: the three top search terms from your Helium 10 research",
    ],
    watchOut:
      "Never paste the AI title in unedited. Always read it out loud once and adjust anything that sounds robotic. The AI cannot tell you which keyword combination converts on Amazon UK; it only gets you 80% of the way.",
  },
  {
    id: "bullets",
    icon: "•",
    label: "Bullets Prompt",
    goal: "Generate five benefit-led scannable bullet points.",
    prompt:
      "Write five bullet points for an Amazon UK listing. The product is: {ONE-SENTENCE PRODUCT DESCRIPTION}. The target customer is: {WHO BUYS THIS}. The main benefit they care about most is: {PRIMARY BENEFIT}. Each bullet should: (1) lead with a benefit in capital letters, then (2) explain it in one short sentence. Stay under 200 characters per bullet. Use British English. Do not include phone numbers, web addresses, or any reference to other brands. Cover these five themes in this order: primary benefit, bundle value, quality or ingredients, ease of use or compatibility, and packaging or guarantee.",
    fillIn: [
      "{ONE-SENTENCE PRODUCT DESCRIPTION}: what the bundle physically is",
      "{WHO BUYS THIS}: your target customer profile",
      "{PRIMARY BENEFIT}: the single most important reason someone buys",
    ],
    watchOut:
      "AI loves filler words: 'enjoy', 'experience', 'discover', 'revolutionary'. Run a find-and-strike on those exact words before you paste the bullets in. Specific verbs and nouns convert; soft adjectives do not.",
  },
  {
    id: "description",
    icon: "📝",
    label: "Description Prompt",
    goal: "Generate a 1,000 to 1,500 character product description in three short paragraphs.",
    prompt:
      "Write an Amazon UK product description for the following bundle: {ONE-SENTENCE PRODUCT DESCRIPTION}. The customer pain point this solves is: {PAIN POINT}. Structure the description as three short paragraphs of three to four sentences each. Paragraph one: open with the buyer scenario, then introduce the bundle as the solution. Paragraph two: describe the components, sizes, and what is included. Paragraph three: close on quality reassurance, the multipack value, and a soft call to add to basket. Total length should sit between 1,000 and 1,500 characters. Use British English. Do not include guarantees, comparisons to other brands, or any URL.",
    fillIn: [
      "{ONE-SENTENCE PRODUCT DESCRIPTION}: the same line used in the bullets prompt",
      "{PAIN POINT}: the specific problem your customer is trying to solve",
    ],
    watchOut:
      "Once the description is drafted, you convert it to HTML in Lesson 4 before pasting into Amazon. Drafting in plain prose first and converting after is faster than trying to write HTML directly.",
  },
];

export function AiPromptTemplates() {
  const [activeId, setActiveId] = useState<string>(TEMPLATES[0].id);
  const active = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(active.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available, silently ignore
    }
  }

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-indigo-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        🤖 AI Prompt Templates
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        Four prompts you can paste directly into ChatGPT, Claude, or any
        capable AI assistant. Start with Keyword Research, then move through
        Title, Bullets, and Description in order. Fill the placeholders with
        your product details before sending.
      </p>

      <div className="flex flex-wrap gap-2 mb-5 justify-center">
        {TEMPLATES.map((t) => {
          const isActive = activeId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`px-4 py-2 rounded-full font-display font-semibold text-[0.85rem] transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-surface border-2 border-line text-ink-muted hover:border-ink/30 hover:text-ink"
              }`}
            >
              {t.icon} {t.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-indigo-300 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-line bg-indigo-50/40">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-indigo-700">
            Goal
          </p>
          <p className="text-[0.88rem] text-ink leading-relaxed mt-1">
            {active.goal}
          </p>
        </div>

        <div className="px-5 py-4 border-b border-line bg-slate-50">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle">
              Prompt
            </p>
            <button
              type="button"
              onClick={copyPrompt}
              className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-indigo-700 hover:text-indigo-800 transition-colors"
            >
              {copied ? "✓ Copied" : "Copy prompt"}
            </button>
          </div>
          <p className="font-mono text-[0.82rem] text-ink leading-relaxed whitespace-pre-wrap">
            {active.prompt}
          </p>
        </div>

        <div className="px-5 py-4 border-b border-line">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-indigo-700 mb-2">
            Fill these in before sending
          </p>
          <ul className="space-y-1.5">
            {active.fillIn.map((f) => (
              <li
                key={f}
                className="text-[0.85rem] text-ink leading-snug flex items-start gap-2"
              >
                <span className="text-indigo-500 flex-shrink-0">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 py-4 bg-amber-50/60 border-l-4 border-amber-500">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mb-1">
            ⚠️ Watch out
          </p>
          <p className="text-[0.85rem] text-amber-900 leading-relaxed">
            {active.watchOut}
          </p>
        </div>
      </div>
    </div>
  );
}
