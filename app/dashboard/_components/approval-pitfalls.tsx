"use client";

import { useState } from "react";

type Pitfall = {
  id: string;
  icon: string;
  title: string;
  symptom: string;
  cause: string;
  fix: string;
  preventable: boolean;
};

const PITFALLS: Pitfall[] = [
  {
    id: "name-mismatch",
    icon: "🪪",
    title: "Name mismatch between ID and bank",
    symptom:
      "Verification email reads 'the documents you submitted do not match the account details'.",
    cause:
      "Common when middle names appear on the passport but not the bank statement, or when the bank holds an abbreviated form. Amazon's matcher is character-strict.",
    fix:
      "Update the bank account to your full legal name with your bank first (takes 1 to 3 business days), then resubmit the same document. Do not edit the passport name to match the bank.",
    preventable: true,
  },
  {
    id: "blurry-doc",
    icon: "📸",
    title: "Document quality rejection",
    symptom:
      "'The image you submitted is not clear enough.' Sometimes accompanied by 'document edges not visible'.",
    cause:
      "Phone photo with glare, finger in frame, or shadow across the MRZ (machine-readable zone) on a passport.",
    fix:
      "Retake the photo on a dark flat surface in indirect natural light. Include all four corners of the document, no cropping, no filters. Submit as JPG or PNG, under 5MB.",
    preventable: true,
  },
  {
    id: "old-address",
    icon: "🏠",
    title: "Address verification failure",
    symptom:
      "The postcard never arrives, or arrives but the PIN does not work when entered.",
    cause:
      "The address on file no longer matches where you live, or the postcard was thrown out with junk mail.",
    fix:
      "Request a re-send from Account Information. If you have moved, update your address with HMRC and your bank first, then submit the change in Seller Central with a fresh proof of address.",
    preventable: true,
  },
  {
    id: "video-noshow",
    icon: "🎥",
    title: "Missed video verification",
    symptom:
      "Account status shows 'Pending verification' for weeks with no progress.",
    cause:
      "You missed your scheduled video call slot, or the verifier could not match the person on camera to the ID.",
    fix:
      "Book a new slot from the verification banner at the top of Seller Central. Show up early, sit in good light, have your physical ID ready and the camera at eye level.",
    preventable: true,
  },
  {
    id: "card-rejected",
    icon: "💳",
    title: "Charge card rejected",
    symptom:
      "'We were unable to charge the card on file' notification on Day 2.",
    cause:
      "Prepaid, virtual, or 3DS-blocked card. Or your bank blocked the £1 authorisation hold as suspicious.",
    fix:
      "Add a different card from a high-street issuer or a major neobank. Call your bank first to whitelist Amazon if you stay with the same card.",
    preventable: true,
  },
  {
    id: "linked-account",
    icon: "🔗",
    title: "Suspected linked account",
    symptom:
      "Account suspended within 48 hours of registration with reference to Section 3 of the seller agreement.",
    cause:
      "Amazon detected an overlap (browser fingerprint, household IP, payment card, bank account) with an existing seller account that may have been previously suspended.",
    fix:
      "Open a Plan of Action case explaining the relationship (e.g. spouse, business partner). Be honest. Hiding linked accounts gets the new one banned too.",
    preventable: false,
  },
] as const;

export function ApprovalPitfalls() {
  const [activeId, setActiveId] = useState<string>(PITFALLS[0].id);
  const active = PITFALLS.find((p) => p.id === activeId) ?? PITFALLS[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-rose-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        ⚠️ Common Approval Pitfalls · Tap one
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        The six failure modes that account for almost every rejection during
        verification. Five are preventable.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 mb-5">
        {PITFALLS.map((p) => {
          const isActive = activeId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`relative rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                isActive
                  ? "border-rose-400 bg-rose-50 ring-4 ring-rose-300/30 -translate-y-0.5 shadow-md"
                  : "border-line bg-surface hover:border-ink/30 hover:-translate-y-0.5"
              }`}
            >
              <span className="text-2xl leading-none">{p.icon}</span>
              <p
                className={`mt-2 font-display text-[0.85rem] font-bold leading-tight ${
                  isActive ? "text-rose-900" : "text-ink"
                }`}
              >
                {p.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border-2 border-rose-300 bg-white p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-line">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span className="text-3xl leading-none flex-shrink-0">
              {active.icon}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700">
                Failure mode
              </p>
              <h4 className="font-display text-lg font-bold text-ink leading-tight mt-1">
                {active.title}
              </h4>
            </div>
          </div>
          <span
            className={`flex-shrink-0 inline-flex h-6 px-2 items-center rounded-full font-mono text-[0.55rem] font-bold tracking-[0.1em] uppercase ${
              active.preventable
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {active.preventable ? "✓ Preventable" : "⚠ Out of your control"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1.5">
              Symptom
            </p>
            <p className="text-[0.88rem] text-ink leading-relaxed">
              {active.symptom}
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1.5">
              Root cause
            </p>
            <p className="text-[0.88rem] text-ink leading-relaxed">
              {active.cause}
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700 mb-1.5">
              Fix
            </p>
            <p className="text-[0.88rem] text-ink leading-relaxed">
              {active.fix}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
