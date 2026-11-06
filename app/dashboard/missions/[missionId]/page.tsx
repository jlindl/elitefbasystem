import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MissionPlayer } from "../../_components/mission-player";
import { QuizPlayer } from "../../_components/quiz-player";
import { getCurrentStudent } from "../../_lib/get-student";
import { getMyProgress } from "../../_lib/mission-progress";
import { MISSIONS, MISSIONS_BY_ID, isUnlocked, stepKey, totalXp } from "../../_lib/missions";

type Params = { missionId: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const m = MISSIONS_BY_ID.get((await params).missionId);
  return { title: m ? `${m.title} - EliteFBA` : "Mission - EliteFBA" };
}

export default async function MissionPage({ params }: { params: Promise<Params> }) {
  const { missionId } = await params;
  const mission = MISSIONS_BY_ID.get(missionId);
  if (!mission) notFound();

  // Signs the visitor in or redirects; the player itself is full-screen.
  await getCurrentStudent();
  const progress = await getMyProgress();

  if (!isUnlocked(progress, mission)) {
    const req = mission.unlock ? MISSIONS_BY_ID.get(mission.unlock.mission) : null;
    return (
      <main className="dash-theme flex min-h-[100svh] flex-col items-center justify-center bg-bg px-6 text-center">
        <span className="text-[4rem]" aria-hidden>
          🔒
        </span>
        <h1 className="mt-4 font-display text-[1.75rem] font-semibold text-ink">{mission.title} is locked</h1>
        <p className="mt-2 max-w-[380px] text-ink-muted">
          {req
            ? `${mission.unlock?.when === "started" ? "Start" : "Finish"} ${req.badge.emoji} ${req.title} to unlock it.`
            : "Keep going to unlock it."}
        </p>
        <Link
          href={req ? `/dashboard/missions/${req.id}` : "/dashboard/missions"}
          className="mt-8 inline-flex h-14 items-center rounded-2xl bg-accent px-8 font-semibold text-white shadow-[0_5px_0_0_#c2410c]"
        >
          {req ? `Go to ${req.title}` : "Back to the map"}
        </Link>
      </main>
    );
  }

  const initial = Object.fromEntries(
    mission.steps.flatMap((s) => {
      const r = progress.steps[stepKey(mission.id, s.id)];
      return r ? [[s.id, r]] : [];
    }),
  );

  const i = MISSIONS.findIndex((m) => m.id === mission.id);
  const nextM = MISSIONS[i + 1];
  // After finishing this one the next is usually unlocked - check optimistically.
  const assumeDone = {
    steps: {
      ...progress.steps,
      ...Object.fromEntries(mission.steps.map((s) => [stepKey(mission.id, s.id), { data: {}, completedAt: "x" }])),
    },
  };

  const next = nextM
    ? { id: nextM.id, title: nextM.title, emoji: nextM.badge.emoji, unlocked: isUnlocked(assumeDone, nextM) }
    : null;

  if (mission.steps[0]?.type === "quiz") {
    return <QuizPlayer mission={mission} initial={initial.quiz} totalXp={totalXp(progress)} next={next} />;
  }
  return <MissionPlayer mission={mission} initial={initial} totalXp={totalXp(progress)} next={next} />;
}
