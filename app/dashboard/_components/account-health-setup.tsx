"use client";

import { useState } from "react";

type Task = {
  id: string;
  icon: string;
  title: string;
  what: string;
  where: string;
  why: string;
  priority: "critical" | "high" | "later";
};

const TASKS: Task[] = [
  {
    id: "2sv",
    icon: "🔐",
    title: "Enable two-step verification",
    what:
      "Switch on TOTP-based 2SV using an authenticator app (Authy, Google Authenticator, 1Password). SMS is the fallback; the app is more secure.",
    where:
      "Login & security > Two-Step Verification > Set up via authenticator app",
    why:
      "An Amazon seller account that gets hijacked stops disbursing funds and can be liquidated by the attacker. 2SV is the single highest-leverage thing you can do in your first hour.",
    priority: "critical",
  },
  {
    id: "tax-interview",
    icon: "🧾",
    title: "Complete the UK tax interview",
    what:
      "Amazon asks a short series of yes/no questions about your tax status (sole trader, limited company, VAT-registered yes/no, etc.) and generates the right tax forms.",
    where:
      "Account info > Tax Information > Tax Interview",
    why:
      "Without this, Amazon withholds 24% of every disbursement for US tax compliance. With it filled out, you get paid in full and your year-end reports are HMRC-clean.",
    priority: "critical",
  },
  {
    id: "deposit",
    icon: "🏦",
    title: "Verify the deposit bank account",
    what:
      "Amazon makes a small test deposit (under £1) into your nominated UK bank within 2 to 3 business days. You log into the bank, find the deposit, and enter the exact amount back into Seller Central to confirm.",
    where:
      "Account info > Deposit Methods > Manage > Verify",
    why:
      "Until verified, your sales accrue but never disburse. New sellers regularly find their first £500 sitting in 'Pending' for weeks because they skipped this step.",
    priority: "critical",
  },
  {
    id: "shipping",
    icon: "🚚",
    title: "Set your default shipping settings",
    what:
      "Configure FBA as your default fulfilment method and set the regions you ship to (UK only initially is fine).",
    where:
      "Settings > Shipping Settings > Fulfilment by Amazon",
    why:
      "If you accidentally publish a listing under Fulfilment by Merchant before setting this, customers can order it from you directly and you have to ship from home.",
    priority: "high",
  },
  {
    id: "return",
    icon: "↩️",
    title: "Set the return address",
    what:
      "Tell Amazon what address to send unsellable returns back to. Most operators use their home address or a small mailbox forwarding service.",
    where:
      "Settings > Return Settings > Return Address",
    why:
      "Unsellable returns (broken seals, customer-damaged units) ship back to you for liquidation. Without a return address set, Amazon disposes of them and bills you the disposal fee.",
    priority: "high",
  },
  {
    id: "notifications",
    icon: "🔔",
    title: "Configure notification preferences",
    what:
      "Pick which events trigger an email and which can wait for a Seller Central inbox message. Turn off the noisy ones (every single order email) and turn on the critical ones (account health, listing suppression).",
    where:
      "Settings > Notification Preferences",
    why:
      "The default settings flood your inbox with order confirmations and bury the one notification that actually matters (a policy warning). Tune it once and forget it.",
    priority: "high",
  },
  {
    id: "users",
    icon: "👥",
    title: "Add secondary user permissions",
    what:
      "If a virtual assistant, accountant, or partner needs access, invite them with a scoped permission set instead of sharing your login.",
    where:
      "Settings > User Permissions > Add a new user",
    why:
      "Shared logins are the fastest way to get a hijack flag, and they break two-step verification. Permissioned users are auditable and removable.",
    priority: "later",
  },
  {
    id: "brand-registry-prep",
    icon: "🛡️",
    title: "Prepare for Brand Registry (later)",
    what:
      "Make a note to come back here once your trademark application is filed. Brand Registry is covered in detail in Module 6.",
    where:
      "Account info > Brand Registry",
    why:
      "Brand Registry locks your listings against hijackers and unlocks A+ Content, Brand Stores, and Sponsored Brands ads. It requires a pending or registered trademark, so we set it up after your first bundle validates.",
    priority: "later",
  },
];

const PRIORITY_META = {
  critical: {
    pillBg: "bg-rose-100",
    pillText: "text-rose-800",
    label: "Critical · Day 1",
  },
  high: {
    pillBg: "bg-amber-100",
    pillText: "text-amber-800",
    label: "High · Week 1",
  },
  later: {
    pillBg: "bg-slate-100",
    pillText: "text-slate-700",
    label: "Later",
  },
} as const;

export function AccountHealthSetup() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string>(TASKS[0].id);

  const active = TASKS.find((t) => t.id === activeId) ?? TASKS[0];
  const criticalDone = TASKS.filter(
    (t) => t.priority === "critical" && checked.has(t.id),
  ).length;
  const criticalTotal = TASKS.filter((t) => t.priority === "critical").length;

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-emerald-50/30 via-surface to-slate-50 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          💚 Day-One Account Hygiene
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
          Critical: {criticalDone} / {criticalTotal}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-4 md:gap-5">
        <ul className="space-y-2">
          {TASKS.map((t) => {
            const isChecked = checked.has(t.id);
            const isActive = activeId === t.id;
            const meta = PRIORITY_META[t.priority];
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  className={`w-full text-left rounded-xl border-2 p-3 transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? "border-emerald-400 bg-emerald-50 ring-4 ring-emerald-300/20"
                      : "border-line bg-surface hover:border-ink/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(t.id);
                    }}
                    aria-label={`Mark ${t.title} ${
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
                    {t.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-display text-[0.88rem] font-semibold leading-tight ${
                        isChecked ? "text-ink-muted line-through" : "text-ink"
                      }`}
                    >
                      {t.title}
                    </p>
                    <span
                      className={`mt-1 inline-flex h-4 px-1.5 items-center rounded-full font-mono text-[0.5rem] font-bold tracking-[0.08em] uppercase ${meta.pillBg} ${meta.pillText}`}
                    >
                      {meta.label}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="rounded-xl border-2 border-emerald-300 bg-white p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-line">
            <span className="text-3xl leading-none flex-shrink-0">
              {active.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-emerald-700">
                Hygiene task
              </p>
              <h4 className="font-display text-lg font-bold text-ink leading-tight">
                {active.title}
              </h4>
            </div>
          </div>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-emerald-700 mb-1.5">
            What you do
          </p>
          <p className="text-[0.9rem] text-ink leading-relaxed">{active.what}</p>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-emerald-700 mt-4 mb-1.5">
            Where it lives
          </p>
          <p className="font-mono text-[0.85rem] text-ink leading-snug bg-slate-50 border border-line rounded-md px-3 py-2">
            {active.where}
          </p>

          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-emerald-700 mt-4 mb-1.5">
            Why it matters
          </p>
          <p className="text-[0.9rem] text-ink leading-relaxed">{active.why}</p>
        </div>
      </div>
    </div>
  );
}
