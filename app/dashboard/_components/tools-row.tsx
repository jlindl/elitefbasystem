import Link from "next/link";
import { BookOpen, Library, Search } from "@/app/components/icons";
import dictionary from "../_lib/dictionary.json";
import usefulLinks from "../_lib/useful-links.json";
import suppliers from "../_lib/suppliers.json";
import { Card } from "./ui/card";

export function ToolsRow() {
  return (
    <section className="dash-fade" style={{ ["--dash-delay" as string]: "180ms" }}>
      <div>
        <h2 className="font-display text-[1.25rem] font-medium tracking-[-0.015em]">
          Your tools
        </h2>
        <p className="mt-3 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-subtle">
          Operational · Use while you learn
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <DictionaryCard />
        <UsefulLinksCard />
        <SuppliersCard />
      </div>
    </section>
  );
}

function SuppliersCard() {
  return (
    <Card className="h-full flex flex-col">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-alt text-ink">
        <Search size={20} />
      </span>
      <h3 className="mt-3 font-display text-[1rem] font-medium tracking-[-0.01em]">
        Wholesale Suppliers
      </h3>
      <p className="mt-1 text-[0.875rem] text-ink-muted leading-[1.55]">
        Online places to source stock: UK wholesalers, B2B marketplaces,
        liquidation, and overseas suppliers.
      </p>
      <p className="mt-4 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle">
        {suppliers.length} SUPPLIERS · BY TYPE
      </p>
      <div className="mt-auto pt-4">
        <Link
          href="/dashboard/tools/suppliers"
          className="flex w-full items-center justify-center rounded-lg border border-line bg-transparent px-4 py-2 text-[0.875rem] text-ink hover:bg-surface-alt transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Open suppliers <span aria-hidden className="ml-1">→</span>
        </Link>
      </div>
    </Card>
  );
}

function UsefulLinksCard() {
  return (
    <Card className="h-full flex flex-col">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-alt text-ink">
        <Library size={20} />
      </span>
      <h3 className="mt-3 font-display text-[1rem] font-medium tracking-[-0.01em]">
        Useful Links
      </h3>
      <p className="mt-1 text-[0.875rem] text-ink-muted leading-[1.55]">
        Every tool, supplier, and resource referenced across the course, in one
        searchable place.
      </p>
      <p className="mt-4 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle">
        {usefulLinks.length} RESOURCES · CURATED
      </p>
      <div className="mt-auto pt-4">
        <Link
          href="/dashboard/tools/links"
          className="flex w-full items-center justify-center rounded-lg border border-line bg-transparent px-4 py-2 text-[0.875rem] text-ink hover:bg-surface-alt transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Open links <span aria-hidden className="ml-1">→</span>
        </Link>
      </div>
    </Card>
  );
}

function DictionaryCard() {
  return (
    <Card className="h-full flex flex-col">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-alt text-ink">
        <BookOpen size={20} />
      </span>
      <h3 className="mt-3 font-display text-[1rem] font-medium tracking-[-0.01em]">
        Jargon Dictionary
      </h3>
      <p className="mt-1 text-[0.875rem] text-ink-muted leading-[1.55]">
        Every term and acronym from the course, explained in plain English.
        Searchable.
      </p>
      <p className="mt-4 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle">
        {dictionary.length} TERMS · A-Z
      </p>
      <div className="mt-auto pt-4">
        <Link
          href="/dashboard/tools/dictionary"
          className="flex w-full items-center justify-center rounded-lg border border-line bg-transparent px-4 py-2 text-[0.875rem] text-ink hover:bg-surface-alt transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Open dictionary <span aria-hidden className="ml-1">→</span>
        </Link>
      </div>
    </Card>
  );
}
