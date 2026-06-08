"use client";

import { useState } from "react";

type Step = {
  num: number;
  icon: string;
  title: string;
  subtitle: string;
  body: string;
  fields: string[];
  watchOut?: string;
  duration: string;
};

const STEPS: Step[] = [
  {
    num: 1,
    icon: "🌐",
    title: "Open the right marketplace",
    subtitle: "sell.amazon.co.uk",
    body:
      "Go to sell.amazon.co.uk and click Sign Up. Do not use sell.amazon.com or any other regional link, even if you already have a US Amazon shopper account. The wizard you start here decides which marketplace your future listings live on.",
    fields: [
      "Use a fresh business email, not the one tied to your shopper account",
      "Pick a strong password and enable two-step verification immediately",
    ],
    watchOut:
      "If you accidentally start the US wizard first, you cannot move it later. Close the tab and restart on sell.amazon.co.uk.",
    duration: "2 minutes",
  },
  {
    num: 2,
    icon: "🧑",
    title: "Business location and seller type",
    subtitle: "Sole trader or limited company",
    body:
      "Amazon asks where your business is based and whether you are an individual (sole trader) or a privately-owned business (limited company). Choose what is actually true for you on Companies House. If you are not yet registered with Companies House, pick Individual.",
    fields: [
      "Business location: United Kingdom",
      "Business type: Privately-owned business (Ltd) or Individual (sole trader)",
      "Trading name (optional but recommended)",
    ],
    watchOut:
      "Switching from Individual to a limited company structure later requires Amazon to re-verify the account from scratch. If you know you are going to incorporate, do it before this step.",
    duration: "3 minutes",
  },
  {
    num: 3,
    icon: "🪪",
    title: "Personal information",
    subtitle: "Identity of the account holder",
    body:
      "Provide the full name, date of birth, nationality, and residential address of the primary account holder exactly as they appear on your photo ID. The match has to be character-perfect, including middle names and any accented letters.",
    fields: [
      "Full legal name as on passport or driving licence",
      "Date of birth and nationality",
      "Residential address (the address Amazon ships your verification postcard to)",
    ],
    watchOut:
      "Use a residential address you actually live at. The PIN postcard in Step 7 is the most common point of failure when sellers use an old address.",
    duration: "5 minutes",
  },
  {
    num: 4,
    icon: "🏦",
    title: "Billing and deposit details",
    subtitle: "Card to charge, bank to deposit to",
    body:
      "Enter the debit or credit card Amazon will charge for the monthly subscription and any advertising, and the UK bank account where your disbursements will land. Both must be in the legal name of the account holder.",
    fields: [
      "Card number, expiry, CVV, billing address",
      "Bank: account holder name, sort code, account number",
      "Currency: GBP",
    ],
    watchOut:
      "Prepaid cards (Revolut Prepaid, Curve) and virtual cards from challenger banks are sometimes silently rejected. Use a standard issuer (Barclays, HSBC, Lloyds, Starling, Monzo, Wise Business) for the smoothest path.",
    duration: "4 minutes",
  },
  {
    num: 5,
    icon: "🏬",
    title: "Store information",
    subtitle: "Public-facing seller details",
    body:
      "Choose your seller display name (this is what customers see on every listing), confirm you have products to sell, and tell Amazon whether you own a Universal Product Code (UPC) for your products. For our bundles, the answer is no, and you will apply for a GTIN exemption later.",
    fields: [
      "Store name (changeable later)",
      "Do you have UPCs / EANs for your products? No",
      "Are you the manufacturer or brand owner? Yes (you are bundling)",
    ],
    watchOut:
      "Do not pick a store name that sounds like a different brand. Amazon flags it and you spend a fortnight in support replying to questions.",
    duration: "3 minutes",
  },
  {
    num: 6,
    icon: "📄",
    title: "Document upload",
    subtitle: "Photo ID + proof of address",
    body:
      "Upload a colour scan or photo of your passport (or driving licence), and a recent (within 90 days) bank statement or utility bill showing the same address you gave in Step 3. The image must be the whole document, in colour, sharp, and unedited.",
    fields: [
      "Front and back of ID (or photo page for passport)",
      "Bank statement or utility bill, last 90 days",
      "Same name, same address, no obstructions",
    ],
    watchOut:
      "Phone camera photos with finger shadows, glare, or any cropping get rejected. Lay the document flat on a dark surface, even lighting, no glare. If it looks suspicious, retake it.",
    duration: "5 minutes",
  },
  {
    num: 7,
    icon: "🔐",
    title: "Identity verification (video call)",
    subtitle: "30-minute booking with a verifier",
    body:
      "Amazon schedules a video call with a verification agent. You hold your ID up to the camera, answer a few sourcing questions, and the agent confirms you are the person who filled in the form. Slots typically open within 2 to 5 business days.",
    fields: [
      "30-minute slot, English-language verifier",
      "Same person who registered the account must attend",
      "Same ID document used in Step 6 visible during the call",
    ],
    watchOut:
      "Miss the slot and you wait another week. Add the calendar invite and set two reminders.",
    duration: "30 minutes",
  },
  {
    num: 8,
    icon: "📮",
    title: "Address verification postcard",
    subtitle: "PIN delivered by Royal Mail",
    body:
      "After the video call, Amazon posts a verification postcard to the residential address from Step 3. It contains a 5-digit PIN. Enter the PIN in Seller Central within 30 days to fully activate the account.",
    fields: [
      "Arrives via Royal Mail, usually 5 to 10 business days",
      "Enter the PIN under Account Information > Business Information",
      "If lost: request a re-send (delays activation by another two weeks)",
    ],
    watchOut:
      "If you move house between registration and postcard arrival, the verification fails and the whole account is suspended. Wait until you are settled before applying.",
    duration: "5 to 10 business days",
  },
];

export function RegistrationWizard() {
  const [activeNum, setActiveNum] = useState<number>(1);
  const active = STEPS.find((s) => s.num === activeNum) ?? STEPS[0];
  const totalDays = "30 minutes of form-filling + 5 to 10 days of waiting";

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-amber-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          ✍️ The Registration Wizard
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          Step {activeNum} of {STEPS.length}
        </p>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 mb-5">
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
              Step {active.num} · {active.duration}
            </p>
            <h4 className="font-display text-xl font-bold text-ink leading-tight mt-1">
              {active.title}
            </h4>
            <p className="text-[0.85rem] text-ink-muted mt-0.5">
              {active.subtitle}
            </p>
          </div>
        </div>

        <p className="text-ink leading-relaxed">{active.body}</p>

        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mt-5 mb-2">
          What you fill in
        </p>
        <ul className="space-y-1.5">
          {active.fields.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[0.9rem] text-ink leading-snug"
            >
              <span className="flex-shrink-0 mt-0.5 text-amber-600">→</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {active.watchOut && (
          <div className="mt-5 rounded-lg border-l-4 border-rose-500 bg-rose-50 px-4 py-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1">
              ⚠️ Watch out
            </p>
            <p className="text-[0.88rem] text-rose-900 leading-relaxed">
              {active.watchOut}
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-[0.75rem] text-ink-subtle italic leading-snug">
        Total time end to end: {totalDays}.
      </p>
    </div>
  );
}
