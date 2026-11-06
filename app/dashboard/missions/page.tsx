import type { Metadata } from "next";
import { AppShell } from "../_components/app-shell";
import { MissionHud, MissionMap } from "../_components/mission-map";
import { PageHeader } from "../_components/ui/page-header";
import { getCurrentStudent } from "../_lib/get-student";
import { getMyProgress } from "../_lib/mission-progress";

export const metadata: Metadata = {
  title: "Missions - EliteFBA",
  description: "Real-world missions that turn the course into a business.",
};

export default async function MissionsPage() {
  const [student, progress] = await Promise.all([getCurrentStudent(), getMyProgress()]);

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1040px] px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader
          eyebrow="Missions"
          title="Learn it. Then do it for real."
          description="Each mission is a few quick steps in your own business. Earn XP, keep your streak alive, and collect a badge for every milestone - from your first numbers to your first sale."
        />

        <div className="dash-rise mt-8" style={{ ["--i" as string]: 1 }}>
          <MissionHud progress={progress} />
        </div>

        <div className="mt-6 rounded-[2rem] border border-line bg-[radial-gradient(circle_at_50%_0%,rgba(255,107,26,0.07),transparent_60%)] px-4 pb-6 pt-14">
          <MissionMap progress={progress} />
        </div>
      </div>
    </AppShell>
  );
}
