import type { Metadata } from "next";
import { AppShell } from "../../_components/app-shell";
import { BackToTop } from "../../_components/back-to-top";
import { LinkDirectory, type DirectoryItem } from "../../_components/link-directory";
import { PageHeader } from "../../_components/ui/page-header";
import { getCurrentStudent } from "../../_lib/get-student";
import suppliers from "../../_lib/suppliers.json";

export const metadata: Metadata = {
  title: "Wholesale Suppliers - EliteFBA",
  description:
    "Online wholesale suppliers and marketplaces: general directories, UK wholesalers, liquidation stock, and overseas/Chinese suppliers.",
};

export default async function SuppliersPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1240px] space-y-6 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader
          eyebrow={`Toolkit · ${suppliers.length} suppliers`}
          title="Wholesale suppliers"
          description="B2B marketplaces, directories, UK wholesalers by category, liquidation stock and overseas suppliers. Links open in a new tab."
        />
        <aside className="dash-rise flex gap-4 rounded-2xl border border-accent/25 bg-accent-soft/60 p-5" style={{ ["--i" as string]: 1 }}>
          <span aria-hidden className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 text-[1.2rem] shadow-sm">
            💡
          </span>
          <p className="text-[0.92rem] leading-relaxed text-ink">
            <b>The lean way:</b> validate a product with a small batch of retail-bought test stock first, then move to wholesale once it sells.
            Overseas suppliers are best left until a product is proven and you can meet their minimum orders.
          </p>
        </aside>
        <LinkDirectory items={suppliers as DirectoryItem[]} noun="supplier" placeholder="Search a supplier or marketplace…" />
      </div>
      <BackToTop />
    </AppShell>
  );
}
