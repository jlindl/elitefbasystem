import type { Metadata } from "next";
import { AppShell } from "../_components/app-shell";
import { getCurrentStudent } from "../_lib/get-student";

export const metadata: Metadata = {
  title: "The Team - EliteFBA",
  description: "The EliteFBA community space.",
};

export default async function TeamPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10">
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
          <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.7rem] font-medium tracking-wide text-accent">
            Coming soon
          </span>
          <h1 className="mt-5 font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
            The Team
          </h1>
          <p className="mt-3 text-[1rem] text-ink-muted max-w-[480px]">
            A space to connect with other EliteFBA members is on the way. Check
            back here soon.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
