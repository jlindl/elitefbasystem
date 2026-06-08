import type { Metadata } from "next";
import { AppShell } from "../../_components/app-shell";
import { BackToTop } from "../../_components/back-to-top";
import { LinkDirectory, type DirectoryItem } from "../../_components/link-directory";
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
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <div>
          <h1 className="font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
            Wholesale Suppliers
          </h1>
          <p className="mt-2 text-[1rem] text-ink-muted max-w-[680px]">
            Online places to source stock: general B2B marketplaces and
            directories, specific UK wholesalers, liquidation stock, and
            overseas/Chinese suppliers. Search or browse by type; links open in
            a new tab.
          </p>
          <p className="mt-3 rounded-lg border border-line bg-surface-alt px-4 py-3 text-[0.85rem] text-ink-muted">
            Tip: the course&rsquo;s lean approach is to validate a product with
            small retail-bought test stock first, then move to wholesale to cut
            costs once it sells. Overseas/Chinese suppliers are best left until a
            product is proven and you can meet their minimum orders.
          </p>
        </div>

        <LinkDirectory
          items={suppliers as DirectoryItem[]}
          noun="supplier"
          placeholder="Search a supplier or marketplace…"
        />
      </div>
      <BackToTop />
    </AppShell>
  );
}
