import type { Metadata } from "next";
import { AppShell } from "../../_components/app-shell";
import { BackToTop } from "../../_components/back-to-top";
import { JargonDictionary } from "../../_components/jargon-dictionary";
import { PageHeader } from "../../_components/ui/page-header";
import { getCurrentStudent } from "../../_lib/get-student";
import dictionary from "../../_lib/dictionary.json";

export const metadata: Metadata = {
  title: "Jargon Dictionary - EliteFBA",
  description: "Plain-English explanations of every term and acronym used across the EliteFBA course.",
};

export default async function DictionaryPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [student, { q }] = await Promise.all([getCurrentStudent(), searchParams]);

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1240px] space-y-6 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader
          eyebrow={`Toolkit · ${dictionary.length} terms`}
          title="Jargon dictionary"
          description="Every term, acronym and bit of jargon from the course, explained in plain English. Search, browse by category, or switch to Quiz me to test yourself."
        />
        <JargonDictionary initialQuery={typeof q === "string" ? q.slice(0, 80) : ""} />
      </div>
      <BackToTop />
    </AppShell>
  );
}
