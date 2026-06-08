import type { Metadata } from "next";
import { AppShell } from "../../_components/app-shell";
import { BackToTop } from "../../_components/back-to-top";
import { JargonDictionary } from "../../_components/jargon-dictionary";
import { getCurrentStudent } from "../../_lib/get-student";

export const metadata: Metadata = {
  title: "Jargon Dictionary - EliteFBA",
  description:
    "Plain-English explanations of every term and acronym used across the EliteFBA course.",
};

export default async function DictionaryPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <div>
          <h1 className="font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
            Jargon Dictionary
          </h1>
          <p className="mt-2 text-[1rem] text-ink-muted max-w-[640px]">
            Every term, acronym, and bit of jargon used across the course,
            explained in plain English. Search a word or browse by category.
          </p>
        </div>

        <JargonDictionary />
      </div>
      <BackToTop />
    </AppShell>
  );
}
