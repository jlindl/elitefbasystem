"use client";

import { useState } from "react";

type Section = {
  id: string;
  menu: string;
  icon: string;
  title: string;
  oneLiner: string;
  whatItDoes: string;
  whenYouUseIt: string;
  watchOut?: string;
};

const SECTIONS: Section[] = [
  {
    id: "catalogue",
    menu: "Catalog",
    icon: "📚",
    title: "Catalog",
    oneLiner: "Where you create and edit product listings.",
    whatItDoes:
      "Houses the Add a Product flow, the Edit Listing wizard, and your list of draft listings. This is also where you apply for GTIN exemptions and request approval to sell in gated categories.",
    whenYouUseIt:
      "Every time you launch a new bundle. You will spend significant time here during Module 4 (Listing Creation).",
    watchOut:
      "Edits to live listings can take up to 24 hours to propagate to the customer-facing page. Do not panic-edit if a price looks wrong; one careful edit beats five rushed ones.",
  },
  {
    id: "inventory",
    menu: "Inventory",
    icon: "📦",
    title: "Inventory",
    oneLiner: "Where you see what stock is where, and replenish it.",
    whatItDoes:
      "Shows your active SKUs, their stock level (Available, Inbound, Reserved), the warehouse each unit is at, and your sales rank. This is also where you create FBA shipments to send stock in.",
    whenYouUseIt:
      "Every day once you are live. The Inventory Performance Index (IPI) score lives here and decides your storage limits.",
    watchOut:
      "Stranded Inventory is the silent killer. Stock that has lost its listing (typo in the description, suspended ASIN) sits in this view and accumulates storage fees until you fix it.",
  },
  {
    id: "orders",
    menu: "Orders",
    icon: "🧾",
    title: "Orders",
    oneLiner: "Every sale, every refund, every return.",
    whatItDoes:
      "Live feed of incoming orders, refunds, and returns. Filter by date, status, or ASIN. Each order shows the customer's marketplace, the price paid, the fees deducted, and the disbursement that pays it out.",
    whenYouUseIt:
      "Daily during the validation phase to confirm the bundle is moving. Weekly after that to spot return patterns or customer concerns.",
  },
  {
    id: "pricing",
    menu: "Pricing",
    icon: "💷",
    title: "Pricing",
    oneLiner: "Set, automate, and review your retail prices.",
    whatItDoes:
      "Manual price changes, Automate Pricing rules, fee preview tools, and historical price logs. You can set a floor and ceiling for any SKU so an automated rule never goes out of bounds.",
    whenYouUseIt:
      "When you launch a new bundle (set the floor), when Amazon revises fees, and when planning Q4 promotions.",
    watchOut:
      "Automate Pricing is a powerful tool that can also obliterate margins if you misconfigure the floor. Set it manually for the first three months on every new listing.",
  },
  {
    id: "advertising",
    menu: "Advertising",
    icon: "📣",
    title: "Advertising",
    oneLiner: "Amazon's pay-per-click platform.",
    whatItDoes:
      "Create Sponsored Products, Sponsored Brands, and Sponsored Display campaigns. Budgets are set per campaign per day; bids are set per keyword or per ASIN.",
    whenYouUseIt:
      "Not in Module 2. We cover this in detail in Module 7 (Marketing). For now, just confirm the section exists.",
    watchOut:
      "Sponsored Ads only appear once your Professional plan is active. If you stay on the Individual plan you will not see this menu.",
  },
  {
    id: "reports",
    menu: "Reports",
    icon: "📊",
    title: "Reports",
    oneLiner: "Every number Amazon will let you download.",
    whatItDoes:
      "Sales reports, payments reports, return reports, fee reports, business reports. Export to CSV for your accountant or paste into your own spreadsheet.",
    whenYouUseIt:
      "Monthly close. Pull the Payments report and the Detailed Sales Report and reconcile against your bank.",
  },
  {
    id: "performance",
    menu: "Performance",
    icon: "💚",
    title: "Performance",
    oneLiner: "Account Health, customer feedback, and policy compliance.",
    whatItDoes:
      "Shows your Account Health rating, your Order Defect Rate (ODR), Late Shipment Rate, and any policy warnings. Bookmark this page.",
    whenYouUseIt:
      "Check weekly. If anything turns amber or red, fix it the same day. Suspensions happen here.",
    watchOut:
      "A single negative review or a late shipment can spike your metrics. Respond to performance notifications within 24 hours, even if the answer is short.",
  },
  {
    id: "help",
    menu: "Help",
    icon: "🆘",
    title: "Help",
    oneLiner: "Seller Support, ticket history, and the policy library.",
    whatItDoes:
      "Search the help library, open a support case, view your case history. Cases can be Buy-Box, Listing, Account, or Performance related and are routed accordingly.",
    whenYouUseIt:
      "When something does not work and the answer is not in the policy docs. Always open the case via the relevant ASIN or order ID, never just generally.",
    watchOut:
      "Front-line Seller Support is hit and miss. If the first reply is unhelpful, reply 'please escalate to a senior associate' and you usually get someone competent within 24 hours.",
  },
];

export function SellerCentralTour() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-rose-50/20 p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        🗺️ Seller Central, Section by Section
      </p>
      <p className="text-center text-[0.85rem] text-ink-muted mb-5">
        The eight top-level menus you will actually use. Tap one to see what
        lives inside and when you reach for it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-5">
        <nav className="rounded-xl border-2 border-line bg-surface p-2 space-y-1">
          {SECTIONS.map((s) => {
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ${
                  isActive
                    ? "bg-rose-50 text-rose-900"
                    : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                }`}
              >
                <span className="text-lg leading-none">{s.icon}</span>
                <span className="font-display font-semibold text-[0.95rem] leading-tight">
                  {s.menu}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="rounded-2xl border-2 border-rose-300 bg-white p-5 md:p-6">
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-line">
            <span className="text-4xl leading-none flex-shrink-0">
              {active.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700">
                Top-level menu
              </p>
              <h4 className="font-display text-xl font-bold text-ink leading-tight mt-1">
                {active.title}
              </h4>
              <p className="text-[0.85rem] text-ink-muted mt-0.5 italic">
                {active.oneLiner}
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1.5">
              What lives here
            </p>
            <p className="text-[0.92rem] text-ink leading-relaxed">
              {active.whatItDoes}
            </p>
          </div>

          <div className="mt-4">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-rose-700 mb-1.5">
              When you reach for it
            </p>
            <p className="text-[0.92rem] text-ink leading-relaxed">
              {active.whenYouUseIt}
            </p>
          </div>

          {active.watchOut && (
            <div className="mt-5 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mb-1">
                ⚠️ Watch out
              </p>
              <p className="text-[0.88rem] text-amber-900 leading-relaxed">
                {active.watchOut}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
