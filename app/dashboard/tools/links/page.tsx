import type { Metadata } from "next";
import { AppShell } from "../../_components/app-shell";
import { BackToTop } from "../../_components/back-to-top";
import { UsefulLinks } from "../../_components/useful-links";
import { getCurrentStudent } from "../../_lib/get-student";

export const metadata: Metadata = {
  title: "Useful Links - EliteFBA",
  description:
    "Curated tools, suppliers, and resources referenced throughout the EliteFBA course.",
};

export default async function LinksPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <div>
          <h1 className="font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
            Useful Links
          </h1>
          <p className="mt-2 text-[1rem] text-ink-muted max-w-[640px]">
            Every tool, supplier, and resource referenced throughout the
            course, in one place. Search or browse by category. Links open in
            a new tab.
          </p>
        </div>

        <UsefulLinks />
      </div>
      <BackToTop />
    </AppShell>
  );
}
