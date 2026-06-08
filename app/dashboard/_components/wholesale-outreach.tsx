"use client";

import { useState } from "react";

type Template = {
  id: string;
  label: string;
  scenario: string;
  subject: string;
  body: string[];
  annotations: { line: number; note: string }[];
};

const TEMPLATES: Template[] = [
  {
    id: "first-contact",
    label: "First Contact",
    scenario:
      "You found the brand at retail, located the UK distributor by Googling 'BRAND wholesale UK' or by checking the back of the product packaging. You have an email address and you need to start a conversation.",
    subject: "Wholesale enquiry – {Your Trading Name}",
    body: [
      "Hi {First name},",
      "",
      "I run {Your Trading Name}, a UK Amazon retailer focused on {Specific niche}. I have been stocking {Brand Name} from retail and the response from my customers has been strong, so I am looking to open a direct wholesale account to grow the listing.",
      "",
      "Could I ask three quick questions?",
      "",
      "1. Do you currently supply UK Amazon sellers, and if so, do you have any restrictions on the brands or SKUs available for that channel?",
      "2. What does your minimum order quantity look like for a first order?",
      "3. Could you send across a current wholesale price list?",
      "",
      "Happy to share my company registration details and Amazon account history on request.",
      "",
      "Best,",
      "{Your Name}",
      "{Your Company} · {Company Number}",
      "{Phone} · {Trading Email}",
    ],
    annotations: [
      {
        line: 0,
        note: "Use the first name from the website's contact page or LinkedIn. Generic 'Dear Sir/Madam' goes straight to delete. If you don't know the first name, you can use their company name instead.",
      },
      {
        line: 2,
        note: "Open with a clear, specific reason you are reaching out. 'I love your brand' reads as a beg. 'My customers have responded strongly' reads as a buyer.",
      },
      {
        line: 5,
        note: "Three questions only. More than three signals you have no idea what you are doing. The three you pick should answer: can we work together, at what scale, at what price.",
      },
      {
        line: 11,
        note: "Pre-empt their next question. Distributors always ask for company details and Amazon history before quoting; offering proactively shortens the cycle by a week.",
      },
      {
        line: 14,
        note: "Sign off with full registration details. This is a credibility signal that you are a real UK business, not a hobbyist asking for samples.",
      },
    ],
  },
  {
    id: "follow-up",
    label: "Follow-up",
    scenario:
      "Seven business days have passed since your first contact and you have heard nothing. About 60% of cold wholesale emails never get a first reply; a polite, commercial follow-up doubles your response rate.",
    subject: "Re: Wholesale enquiry – {Your Trading Name}",
    body: [
      "Hi {First name, or 'Account Team'},",
      "",
      "I'm following up on my email from last week regarding stock availability and trading terms for {Brand Name}.",
      "",
      "We are currently allocating our inventory budget for the upcoming month.",
      "",
      "Could you let me know if you currently have capacity for a new independent retail account, or if your books are closed to online stockists at this moment?",
      "",
      "Either way helps us update our sourcing ledger for this quarter.",
      "",
      "Best regards,",
      "",
      "{Your Name}",
      "{Your Trading Name}",
      "{Contact Number}",
    ],
    annotations: [
      {
        line: 0,
        note: "If you have a first name from the website or LinkedIn, use it. If not, 'Account Team' is the cleanest fallback. It reads as professional outreach to a business address rather than a personal cold email, and keeps the door open if the inbox is shared.",
      },
      {
        line: 4,
        note: "Signal active commercial intent. Mentioning that you are allocating your monthly inventory budget tells the supplier this is a live procurement window with a soft clock attached, not an open-ended enquiry. People reply faster when there is a deadline implied.",
      },
      {
        line: 6,
        note: "Frame the question as binary: open or closed. This is easier to answer in one line than 'tell me about your account opening process'. Suppliers will type 'we are open' faster than they will write a paragraph, and you have a foot in the door either way.",
      },
      {
        line: 8,
        note: "Give them permission to say no. The phrase 'either way helps us' explicitly invites a closed-doors reply, which is what generates response. A no you can act on beats a maybe that drags.",
      },
    ],
  },
  {
    id: "place-order",
    label: "Placing an Order",
    scenario:
      "The supplier has replied with their price list. You have checked the numbers against your Bundle Scorecard and the bundle still clears. Now you place the first order, get a proforma invoice back, pay it, and start the lead time to your first wholesale-sourced inventory.",
    subject: "Order request – {Your Trading Name}",
    body: [
      "Hi {First name, or 'Account Team'},",
      "",
      "Thank you for sending across the price list, that is exactly what I needed. The pricing works for our model, so I would like to go ahead and place a first order.",
      "",
      "Order details:",
      "- {SKU / Product 1}: {Quantity} units",
      "- {SKU / Product 2}: {Quantity} units",
      "- {SKU / Product 3}: {Quantity} units",
      "",
      "Delivery address:",
      "{Your Trading Name}",
      "{Your Address Line 1}",
      "{Your Address Line 2, if applicable}",
      "{Town and Postcode}",
      "",
      "Could you confirm the following so I can get payment over to you:",
      "",
      "1. A proforma invoice with the order total and your payment details.",
      "2. Your standard lead time from cleared payment to despatch.",
      "3. Whether the order will arrive boxed or palletised, so I can plan reception this end.",
      "",
      "Happy to pay by BACS or card as soon as the proforma is through. Looking forward to building this into a regular order rhythm.",
      "",
      "Best regards,",
      "",
      "{Your Name}",
      "{Your Trading Name}",
      "{Contact Number}",
    ],
    annotations: [
      {
        line: 2,
        note: "Open by confirming you read the price list and that the numbers work. Suppliers send price lists to filter; reacting decisively (rather than asking ten clarifying questions) signals you are a buyer not a tyre-kicker, which is exactly the impression you want as a first-time account.",
      },
      {
        line: 4,
        note: "Be specific. List the exact SKUs and quantities you want. Vague order requests ('a few of each, can you advise') push the supplier to chase you for detail and slow the conversation by a week. Decide in advance, write it once.",
      },
      {
        line: 16,
        note: "The three confirmation asks are deliberate. The proforma is what unlocks payment, the lead time is what tells you when stock can be inbound to FBA, and the delivery format (boxed vs palletised) decides whether you need someone home to receive it. Asking all three at once means one round-trip rather than three.",
      },
      {
        line: 22,
        note: "Stating your payment readiness up front is a credibility signal. 'As soon as the proforma is through' tells the supplier money is queued, which materially shortens the gap between order and despatch. Suppliers prioritise accounts that pay on the proforma over accounts that ask for terms.",
      },
    ],
  },
];

export function WholesaleOutreach() {
  const [activeId, setActiveId] = useState<string>(TEMPLATES[0].id);
  const active = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];
  const [showAnnotations, setShowAnnotations] = useState(true);

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-cyan-50/30 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        🤝 Wholesale Outreach Templates
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        Three templates that walk the full supplier conversation from cold
        contact to first order. Tap one, toggle the annotations to see why
        each line is there.
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {TEMPLATES.map((t) => {
          const isActive = activeId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`px-4 py-2 rounded-full font-display font-semibold text-[0.85rem] transition-all duration-200 ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "bg-surface border-2 border-line text-ink-muted hover:border-ink/30 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-cyan-300 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-line bg-cyan-50/40">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-cyan-700">
            When to send this
          </p>
          <p className="text-[0.88rem] text-ink leading-relaxed mt-1">
            {active.scenario}
          </p>
        </div>

        <div className="px-5 py-4 border-b border-line bg-slate-50">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle">
              Subject
            </p>
            <button
              type="button"
              onClick={() => setShowAnnotations((v) => !v)}
              className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-cyan-700 hover:text-cyan-800 transition-colors"
            >
              {showAnnotations ? "Hide" : "Show"} annotations
            </button>
          </div>
          <p className="font-mono text-[0.88rem] text-ink mt-1 break-words">
            {active.subject}
          </p>
        </div>

        <div className="px-5 py-5 font-mono text-[0.88rem] leading-relaxed text-ink whitespace-pre-line">
          {active.body.map((line, i) => {
            const annotation = active.annotations.find((a) => a.line === i);
            return (
              <div key={i} className="relative">
                <p className={line === "" ? "h-4" : ""}>{line || " "}</p>
                {showAnnotations && annotation && (
                  <div className="my-2 rounded-lg border-l-4 border-cyan-500 bg-cyan-50/70 px-3 py-2">
                    <p className="font-mono text-[0.55rem] tracking-[0.14em] uppercase text-cyan-700 mb-0.5">
                      💡 Why this line
                    </p>
                    <p className="font-sans text-[0.82rem] text-cyan-900 leading-snug">
                      {annotation.note}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-[0.75rem] text-ink-subtle italic leading-snug">
        Swap the placeholders in braces for your own details before sending.
      </p>
    </div>
  );
}
