import type { Metadata } from "next";
import { Search } from "@/app/components/icons";
import { AppShell } from "../_components/app-shell";
import { DailyTerm, ToolsGrid } from "../_components/home";
import { OpenSearch } from "../_components/open-search";
import { PageHeader } from "../_components/ui/page-header";
import { getCurrentStudent } from "../_lib/get-student";

export const metadata: Metadata = {
  title: "My Tools - EliteFBA",
  description: "Operational tools to use while you build your FBA business.",
};

export default async function ToolsPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1240px] space-y-8 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader
          eyebrow="Toolkit"
          title="My tools"
          description="Everything you need open while you work: plain-English definitions, vetted suppliers and every resource the course mentions."
        />

        <div className="dash-rise" style={{ ["--i" as string]: 1 }}>
          <ToolsGrid heading={false} />
        </div>

        <div className="dash-rise grid gap-4 md:grid-cols-2" style={{ ["--i" as string]: 2 }}>
          <OpenSearch className="spot spot-dark lift group relative flex flex-col overflow-hidden rounded-3xl bg-ink p-6 text-left text-white">
            <span aria-hidden className="dash-grid-dark absolute inset-0 opacity-70" />
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Search size={22} />
            </span>
            <span className="relative mt-4 font-display text-[1.4rem] font-semibold tracking-[-0.02em]">Search everything</span>
            <span className="relative mt-1 text-[0.92rem] leading-relaxed text-white/65">
              Lessons, dictionary terms, suppliers and links in one box. Press <kbd className="rounded border border-white/20 px-1.5 font-mono text-[0.75rem]">⌘K</kbd> or{" "}
              <kbd className="rounded border border-white/20 px-1.5 font-mono text-[0.75rem]">/</kbd> on any page.
            </span>
            <span className="relative mt-auto inline-flex items-center gap-2 self-start pt-6 text-[0.9rem] font-semibold text-accent">
              Open search <span aria-hidden className="nudge">→</span>
            </span>
          </OpenSearch>
          <DailyTerm />
        </div>
      </div>
    </AppShell>
  );
}
