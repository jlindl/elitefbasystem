"use client";

import { useState } from "react";

type Item = {
  id: string;
  icon: string;
  title: string;
  detail: string;
  examples: string[];
};

const ITEMS: Item[] = [
  {
    id: "id",
    icon: "🪪",
    title: "Government-issued photo ID",
    detail:
      "A valid passport or driving licence in the legal name of the person registering the account. Amazon matches this to every other field, so use the exact spelling that appears on it everywhere else.",
    examples: ["UK passport", "UK driving licence", "EU/EEA national ID card"],
  },
  {
    id: "bank",
    icon: "🏦",
    title: "UK business or personal bank account",
    detail:
      "Must be in the same legal name as the account holder. Amazon deposits your disbursements here. Online-only banks are fine (Starling, Monzo, Wise) as long as they support direct debit and BACS.",
    examples: ["Sort code (6 digits)", "Account number (8 digits)", "Account holder name as it appears on statements"],
  },
  {
    id: "card",
    icon: "💳",
    title: "Chargeable debit or credit card",
    detail:
      "Used for the monthly Professional plan fee and any advertising spend. Amazon will run a small authorisation hold to confirm it works. Prepaid cards are rejected.",
    examples: ["Visa or Mastercard", "Same billing address as the registration", "Not expiring within the next 6 months"],
  },
  {
    id: "address",
    icon: "🏠",
    title: "Verifiable address",
    detail:
      "A real, deliverable address you can prove you live or operate from. Amazon mails a verification postcard with a PIN to this address during onboarding, so use somewhere you can collect post within two weeks.",
    examples: ["Home address", "Registered company address", "Recent utility bill or bank statement showing it"],
  },
  {
    id: "tax",
    icon: "🧾",
    title: "Tax information",
    detail:
      "If you are registering as a sole trader, your National Insurance number is enough. If you are registering as a limited company, you need your company number and registered office, and your VAT number if you are registered.",
    examples: ["Sole trader: NI number", "Limited company: company number + UTR", "Optional but recommended: VAT number"],
  },
  {
    id: "phone",
    icon: "📱",
    title: "Mobile phone with SMS",
    detail:
      "Required for two-step verification at signup and on every login from a new device afterwards. Use a number you own permanently. Changing this later is painful.",
    examples: ["UK mobile (preferred)", "Reachable by SMS and voice call", "Not a VOIP or virtual number"],
  },
  {
    id: "email",
    icon: "📧",
    title: "Dedicated business email",
    detail:
      "Do not use the personal email you already shop from on Amazon. Create a fresh inbox for the seller account so notifications, performance alerts, and disbursement statements stay organised.",
    examples: ["A new Gmail or Outlook address", "Or a custom domain if you have one", "Forwarding rules optional"],
  },
];

export function PreflightChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string>("id");

  const active = ITEMS.find((i) => i.id === activeId) ?? ITEMS[0];
  const allChecked = checked.size === ITEMS.length;

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-blue-50/30 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          📋 Pre-flight Checklist
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          {checked.size} / {ITEMS.length} ready
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 md:gap-5">
        <ul className="space-y-2">
          {ITEMS.map((item) => {
            const isChecked = checked.has(item.id);
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`w-full text-left rounded-xl border-2 p-3 transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? "border-blue-400 bg-blue-50 ring-4 ring-blue-300/30"
                      : "border-line bg-surface hover:border-ink/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(item.id);
                    }}
                    aria-label={`Mark ${item.title} ${
                      isChecked ? "incomplete" : "complete"
                    }`}
                    className={`flex-shrink-0 h-6 w-6 rounded-md border-2 flex items-center justify-center transition-colors duration-150 ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-ink/20 bg-surface hover:border-ink/40"
                    }`}
                  >
                    {isChecked && (
                      <span className="text-[0.8rem] font-bold leading-none">
                        ✓
                      </span>
                    )}
                  </button>
                  <span className="text-xl leading-none flex-shrink-0">
                    {item.icon}
                  </span>
                  <span
                    className={`text-[0.9rem] font-display font-semibold leading-tight ${
                      isChecked ? "text-ink-muted line-through" : "text-ink"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="rounded-xl border-2 border-blue-200 bg-white/70 p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl leading-none">{active.icon}</span>
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-blue-700">
                What you need
              </p>
              <h4 className="font-display text-lg font-bold text-ink leading-tight">
                {active.title}
              </h4>
            </div>
          </div>
          <p className="text-[0.9rem] text-ink leading-relaxed">
            {active.detail}
          </p>
          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-subtle mt-4 mb-2">
            Acceptable formats
          </p>
          <ul className="space-y-1.5">
            {active.examples.map((ex, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[0.85rem] text-ink-muted leading-snug"
              >
                <span className="flex-shrink-0 mt-0.5">→</span>
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {allChecked && (
        <div className="mt-5 rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 flex items-start gap-3">
          <span className="text-2xl leading-none">✅</span>
          <div>
            <p className="font-display font-bold text-emerald-900">
              You are ready to start the registration
            </p>
            <p className="text-[0.85rem] text-emerald-800 leading-relaxed mt-0.5">
              Every item above is to hand. Move on to the next lesson and
              choose your selling plan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
