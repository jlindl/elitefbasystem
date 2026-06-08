"use client";

import { useState } from "react";

type Step = {
  num: number;
  icon: string;
  title: string;
  summary: string;
  detail: string;
  watchOut?: string;
};

const STEPS: Step[] = [
  {
    num: 1,
    icon: "🧭",
    title: "Confirm Your Category Is Eligible",
    summary: "Not every category accepts Generic listings.",
    detail:
      "Open Seller Central and go to Catalog → Add Products → Apply for a GTIN exemption. Search for the most accurate category for your bundle (for example 'Beauty', 'Pet Supplies', 'Grocery'). Amazon will tell you immediately whether that category supports a GTIN exemption. Beauty, Home, Pet, Grocery, Personal Care, and Toys are all eligible. Medical, dietary supplements, and a small handful of restricted categories are not.",
    watchOut:
      "Pick the category your bundle actually belongs in, not the easiest one to qualify for. Amazon checks the category against your photos at review stage and rejects mismatches.",
  },
  {
    num: 2,
    icon: "🖼️",
    title: "Prepare Your Product Photos",
    summary: "A few photos of the product and packaging showing your brand name. No PDF letter required.",
    detail:
      "The application is entirely photo-based. There is no PDF letter, no brand authorisation document, no signature scan. Amazon needs to see two things: the product itself from a couple of angles, and clear evidence that your brand name is permanently part of the packaging. The brand name has to be visibly attached to the packaging in a way that cannot be peeled or removed. The simplest method, and the one I use: take a plain polybag or kraft box, print a sticker carrying your chosen brand name, and place that sticker INSIDE the bag with the product so it is sealed in when the bag is closed. Three or four photos cover the application: one of the bundle, one of the packaging showing the brand sticker visible through or inside the bag, and one of the back of the packaging confirming there is no existing barcode.",
    watchOut:
      "A sticker stuck to the outside of the polybag is the single most common reason for rejection. Amazon's reviewer assumes anything that can be peeled off is temporary and not really the brand. Always seal the brand-name sticker inside the bag with the product, where it cannot be removed without opening the packaging.",
  },
  {
    num: 3,
    icon: "📝",
    title: "Submit the Application",
    summary: "Fill the form in Seller Central, upload your photos, click submit.",
    detail:
      "Brand name field: type the brand name you have used on your packaging sticker. For most v1 bundles this is 'Generic', but it can be your own chosen name if you have written it on the sticker. Number of GTIN exemption requests: one per ASIN you intend to create. Upload the two to nine product photos. There is no separate letter or PDF to upload at any stage; the entire application is photo-based. The form takes about ten minutes once your photos are ready, and you receive an automated confirmation immediately.",
    watchOut:
      "Apply for one exemption per bundle you intend to launch. Bulk applications are possible but tend to get scrutinised harder, which slows everything down.",
  },
  {
    num: 4,
    icon: "⏳",
    title: "Wait for Review",
    summary: "Approval usually arrives in 24 to 72 hours.",
    detail:
      "Amazon's catalogue team reviews the application. A typical approval comes through inside three working days, often inside 24 hours. You get an email confirmation; the approval also appears in your case log inside Seller Central. There is nothing useful you can do during this window; do not chase.",
    watchOut:
      "If you are rejected, the email tells you which check failed. The fix is almost always to move the brand-name sticker from the outside of the bag to the inside, re-photograph, and re-submit. Second applications succeed 90% of the time.",
  },
  {
    num: 5,
    icon: "🚀",
    title: "Create the Listing",
    summary: "Catalog → Add Products → start from scratch.",
    detail:
      "Once approved, you start a new listing under the Generic brand without entering a barcode. The form will look exactly like a normal listing creation flow from here on. The remaining lessons in this module walk through filling that form in detail: copy, images, dimensions, and the rest.",
    watchOut:
      "GTIN exemption is granted per-brand, per-category. If you change either later (different category, different brand name once you trademark), you reapply.",
  },
];

export function GtinStepper() {
  const [activeNum, setActiveNum] = useState<number>(1);

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-amber-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          🏷️ GTIN Exemption Walkthrough
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {STEPS.length} steps · about 30 minutes
        </p>
      </div>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Tap a step to see what to do and the common pitfall to avoid. The whole
        application takes about half an hour of focused work and usually
        approves within 24 to 72 hours.
      </p>

      <div className="space-y-3">
        {STEPS.map((s, idx) => {
          const isActive = activeNum === s.num;
          const isLast = idx === STEPS.length - 1;
          return (
            <div key={s.num} className="relative">
              <button
                type="button"
                onClick={() => setActiveNum(isActive ? 0 : s.num)}
                aria-expanded={isActive}
                className={`w-full text-left rounded-2xl border-2 transition-all duration-200 ${
                  isActive
                    ? "border-amber-400 bg-amber-50 ring-2 ring-amber-200"
                    : "border-line bg-surface hover:border-ink/30"
                }`}
              >
                <div className="flex items-start gap-4 p-4 md:p-5">
                  <div
                    className={`flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full font-display font-bold border-2 ${
                      isActive
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-surface border-ink/20 text-ink-muted"
                    }`}
                  >
                    {s.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-display text-lg font-bold leading-tight ${
                        isActive ? "text-amber-900" : "text-ink"
                      }`}
                    >
                      {s.icon} {s.title}
                    </h4>
                    <p className="text-[0.85rem] text-ink-muted leading-snug mt-1">
                      {s.summary}
                    </p>
                  </div>
                </div>
              </button>

              {isActive && (
                <div className="mt-2 rounded-2xl border-2 border-amber-200 bg-white p-5">
                  <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mb-1.5">
                    What to do
                  </p>
                  <p className="text-[0.9rem] text-ink leading-relaxed">
                    {s.detail}
                  </p>
                  {s.watchOut && (
                    <div className="mt-4 rounded-lg border-l-4 border-rose-500 bg-rose-50 px-4 py-3">
                      <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1">
                        ⚠️ Watch out
                      </p>
                      <p className="text-[0.85rem] text-rose-900 leading-relaxed">
                        {s.watchOut}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!isLast && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-line"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
