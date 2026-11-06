import type { Metadata } from "next";
import { AppShell } from "../../_components/app-shell";
import { BackToTop } from "../../_components/back-to-top";
import { LinkDirectory, type DirectoryItem } from "../../_components/link-directory";
import { PageHeader } from "../../_components/ui/page-header";
import { getCurrentStudent } from "../../_lib/get-student";
import links from "../../_lib/useful-links.json";

export const metadata: Metadata = {
  title: "Useful Links - EliteFBA",
  description: "Curated tools, suppliers, and resources referenced throughout the EliteFBA course.",
};

export default async function LinksPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1240px] space-y-6 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader
          eyebrow={`Toolkit · ${links.length} resources`}
          title="Useful links"
          description="Every tool and resource referenced throughout the course, in one place. Links open in a new tab."
        />
        <LinkDirectory items={links as DirectoryItem[]} noun="resource" placeholder="Search a tool or resource…" />
      </div>
      <BackToTop />
    </AppShell>
  );
}
