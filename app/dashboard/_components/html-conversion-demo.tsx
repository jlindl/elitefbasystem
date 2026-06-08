"use client";

import { useState } from "react";

const PLAIN_TEXT = `Wake up to softer hair every morning. This 3-pack of the Sukin Hydrating Shampoo gives you three full 500ml bottles, enough for around four months of daily washing without running out at the worst moment.

Inside each bottle: a sulphate-free, vegan formula built around aloe vera and rosehip oil, designed for normal to dry hair that needs moisture without weight. Made in Australia, cruelty-free, and packaged in 100% recycled plastic.

Order the multipack now and stop the mid-month shampoo crisis. One delivery, three bottles, four months of consistent results.`;

const HTML_VERSION = `<p>Wake up to <b>softer hair</b> every morning. This 3-pack of the Sukin Hydrating Shampoo gives you three full 500ml bottles, enough for around four months of daily washing without running out at the worst moment.</p><p>Inside each bottle: a <b>sulphate-free, vegan formula</b> built around aloe vera and rosehip oil, designed for normal to dry hair that needs moisture without weight. Made in Australia, cruelty-free, and packaged in 100% recycled plastic.</p><p>Order the multipack now and stop the mid-month shampoo crisis. <b>One delivery, three bottles, four months of consistent results.</b></p>`;

const TAGS = [
  {
    tag: "<p>...</p>",
    purpose: "Paragraph break. Adds a clean blank line between blocks of prose. The single most important tag because plain line breaks collapse on Amazon.",
  },
  {
    tag: "<br>",
    purpose: "Single line break inside a paragraph. Use sparingly; <p> reads better for most descriptions.",
  },
  {
    tag: "<b>...</b>",
    purpose: "Bold text. Use on benefit phrases that summarise the surrounding sentence. Two or three bolds per description, not ten.",
  },
  {
    tag: "<i>...</i>",
    purpose: "Italic text. Rare in product descriptions; mostly reserved for ingredient lists or product names. Use almost never.",
  },
  {
    tag: "<ul><li>...</li></ul>",
    purpose: "Bulleted list. Amazon mostly ignores these in the description field because the main bullets are the official structured area. Skip in favour of paragraphs.",
  },
];

export function HtmlConversionDemo() {
  const [view, setView] = useState<"plain" | "rendered" | "source">("rendered");

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-violet-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        💻 Plain Text vs HTML on Amazon
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        Amazon's description field collapses plain-text line breaks into one
        wall of prose. HTML tags survive. Toggle the view to see the same
        description three ways.
      </p>

      <div className="flex justify-center gap-1 mb-5 p-1 rounded-full bg-surface border-2 border-line w-fit mx-auto">
        {(
          [
            { id: "plain", label: "Plain text on Amazon" },
            { id: "rendered", label: "HTML rendered" },
            { id: "source", label: "HTML source" },
          ] as const
        ).map((option) => {
          const isActive = view === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setView(option.id)}
              className={`px-4 py-2 rounded-full font-display font-semibold text-[0.78rem] transition-all duration-150 ${
                isActive
                  ? "bg-violet-600 text-white shadow"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-violet-300 bg-white p-5 md:p-6 min-h-[280px]">
        {view === "plain" && (
          <>
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-violet-700 mb-2">
              How Amazon renders plain text
            </p>
            <p className="text-[0.9rem] text-ink leading-relaxed">
              {PLAIN_TEXT.replace(/\n+/g, " ")}
            </p>
            <p className="text-[0.78rem] text-rose-700 italic mt-4">
              Notice the wall of prose. Customers do not read this. The eye
              bounces straight to the bullets above and the buy box on the
              right.
            </p>
          </>
        )}

        {view === "rendered" && (
          <>
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-violet-700 mb-2">
              How Amazon renders the HTML version
            </p>
            <div
              className="text-[0.9rem] text-ink leading-relaxed space-y-4 [&_p]:m-0 [&_b]:font-semibold"
              dangerouslySetInnerHTML={{ __html: HTML_VERSION }}
            />
            <p className="text-[0.78rem] text-emerald-700 italic mt-4">
              Same words. Now scannable. Paragraph breaks pull the eye through
              the buyer scenario, the spec, and the call to action.
            </p>
          </>
        )}

        {view === "source" && (
          <>
            <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-violet-700 mb-2">
              The HTML you paste into Amazon
            </p>
            <pre className="font-mono text-[0.78rem] text-ink leading-relaxed whitespace-pre-wrap break-words bg-slate-50 rounded-lg p-4 border border-line">
              {HTML_VERSION}
            </pre>
            <p className="text-[0.78rem] text-ink-muted italic mt-4">
              Use the SellerApp HTML editor to generate this from your plain
              prose: paste the plain version in, click 'Convert', copy the
              output and paste into Seller Central.
            </p>
          </>
        )}
      </div>

      <div className="mt-5 rounded-2xl border-2 border-line bg-surface p-5">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle mb-3">
          The five HTML tags Amazon actually respects
        </p>
        <ul className="space-y-2.5">
          {TAGS.map((t) => (
            <li key={t.tag} className="flex items-start gap-3">
              <code className="flex-shrink-0 font-mono text-[0.75rem] text-violet-700 bg-violet-50 px-2 py-0.5 rounded">
                {t.tag}
              </code>
              <p className="text-[0.85rem] text-ink-muted leading-relaxed">
                {t.purpose}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
