import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "@/app/components/icons";
import { AppShell } from "../../_components/app-shell";
import { SuppliesChecklist } from "../../_components/supplies-checklist";
import { getCurrentStudent } from "../../_lib/get-student";
import { SUPPLIES, SUPPLIES_SHOP_URL, SUPPLY_CATEGORIES } from "../../_lib/supplies";
import { COOKIES } from "../../_lib/welcome";

export const metadata: Metadata = {
  title: "Supplies checklist - EliteFBA",
  description: "Everything you need to prep and ship your first box to Amazon FBA.",
};

const MODULE_5 = "/dashboard/modules/29b20c1c-884d-8036-b117-fb46fa089178";

export default async function SuppliesPage() {
  const student = await getCurrentStudent();
  const saved = (await cookies()).get(COOKIES.supplies)?.value ?? "";
  const valid = new Set(SUPPLIES.map((s) => s.id));
  // cookies() has already URL-decoded the value; decoding again would throw on a stray "%".
  const owned = saved.split(".").filter((id) => valid.has(id));
  const essentials = SUPPLIES.filter((s) => s.need === "essential").length;

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1120px] space-y-10 px-4 py-6 sm:px-6 md:px-10 md:py-10 print:max-w-none print:p-0">
        <nav aria-label="Breadcrumb" className="dash-rise print:hidden" style={{ ["--i" as string]: 0 }}>
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.9375rem]">
            <li>
              <Link href="/dashboard/tools" className="font-medium text-ink-muted underline decoration-ink/25 underline-offset-4 hover:text-ink hover:decoration-ink">
                My tools
              </Link>
            </li>
            <li aria-hidden className="text-ink-muted">
              ›
            </li>
            <li>
              <span aria-current="page" className="font-semibold text-ink">
                Supplies
              </span>
            </li>
          </ol>
        </nav>

        <header className="dash-rise grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end" style={{ ["--i" as string]: 1 }}>
          <div>
            <p className="text-[0.9375rem] font-semibold text-orange-800">Toolkit</p>
            <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.5rem]">Supplies checklist</h1>
            <p className="mt-3 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              Every label, bag and box you need to prep and ship your first box to Amazon, with Amazon&rsquo;s rules and the course&rsquo;s packing
              tips. Everything here comes from the course.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3">
            {[
              ["Starter kit", "£30-£50", "for a first 5-10 unit shipment"],
              ["Essentials", String(essentials), "items to get"],
              ["First time", "2 hours", "to prep and pack"],
            ].map(([k, v, d]) => (
              <div key={k} className="rounded-2xl border border-line bg-surface p-4">
                <dt className="text-[0.8125rem] font-medium text-ink-muted">{k}</dt>
                <dd className="mt-1 font-display text-[1.375rem] font-semibold leading-none tracking-[-0.02em] text-ink tabular-nums">{v}</dd>
                <dd className="mt-1.5 text-[0.8125rem] leading-snug text-ink-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section
          aria-labelledby="shop-h"
          className="dash-rise relative overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-7 print:hidden"
          style={{ ["--i" as string]: 2 }}
        >
          <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-60" />
          <div aria-hidden className="absolute -right-16 -top-24 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.35), transparent 65%)" }} />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <span aria-hidden className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[1.75rem] ring-1 ring-white/15">
              🛒
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="shop-h" className="font-display text-[1.25rem] font-semibold">
                {SUPPLIES_SHOP_URL ? "Get the exact kit from the Elite FBA shop" : "The Elite FBA supplies shop is on its way"}
              </h2>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/80">
                {SUPPLIES_SHOP_URL
                  ? "The exact polybags, labels and boxes the course uses, in one place."
                  : "Jakub is setting up a shop with the exact polybags, labels and boxes the course uses. Until then, any UK packaging supplier stocks equivalents. Use the search links on each item."}
              </p>
            </div>
            {SUPPLIES_SHOP_URL && (
              <a href={SUPPLIES_SHOP_URL} target="_blank" rel="noopener noreferrer" className="btn h-12 shrink-0 bg-white text-ink hover:bg-white/90">
                Visit the shop<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </section>

        <div className="dash-rise" style={{ ["--i" as string]: 3 }}>
          <SuppliesChecklist items={SUPPLIES} categories={SUPPLY_CATEGORIES} initialOwned={owned} />
        </div>

        <section aria-labelledby="next-h" className="dash-rise grid gap-4 md:grid-cols-2 print:hidden" style={{ ["--i" as string]: 4 }}>
          <h2 id="next-h" className="sr-only">
            Keep going
          </h2>
          <Link href={MODULE_5} className="spot lift group flex flex-col rounded-3xl border border-line bg-surface p-6">
            <span className="text-[0.875rem] font-medium text-ink-muted">Learn the steps</span>
            <span className="mt-1 font-display text-[1.25rem] font-semibold text-ink">Module 5: Sending to Amazon</span>
            <span className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">Bag, label, pack and ship your first box, one lesson at a time.</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.9375rem] font-semibold text-ink">
              Open Module 5 <ArrowRight size={15} className="nudge" />
            </span>
          </Link>
          <Link href="/dashboard/tools/suppliers" className="spot lift group flex flex-col rounded-3xl border border-line bg-surface p-6">
            <span className="text-[0.875rem] font-medium text-ink-muted">Need the stock itself?</span>
            <span className="mt-1 font-display text-[1.25rem] font-semibold text-ink">Wholesale suppliers</span>
            <span className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">UK wholesalers, B2B marketplaces and more, for the products in your bundles.</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.9375rem] font-semibold text-ink">
              Browse suppliers <ArrowRight size={15} className="nudge" />
            </span>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
