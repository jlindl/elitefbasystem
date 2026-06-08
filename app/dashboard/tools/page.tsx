import type { Metadata } from "next";
import { AppShell } from "../_components/app-shell";
import { ToolsRow } from "../_components/tools-row";
import { getCurrentStudent } from "../_lib/get-student";

export const metadata: Metadata = {
  title: "My Tools - EliteFBA",
  description: "Operational tools to use while you build your FBA business.",
};

export default async function ToolsPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <div>
          <h1 className="font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
            My Tools
          </h1>
          <p className="mt-2 text-[1rem] text-ink-muted">
            Operational tools to use while you build your FBA business.
          </p>
        </div>

        <ToolsRow />
      </div>
    </AppShell>
  );
}
