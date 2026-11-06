import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { getCourse, getGameStats, getSearchIndex } from "../_lib/course";
import type { Student } from "../_lib/get-student";
import { CERTIFICATE_DEFS, MODULE_CERTIFICATES, ukDay } from "../_lib/certificate-defs";
import { CHANGELOG, liveEntries, unseenIds } from "../_lib/changelog";
import { MISSIONS, missionState } from "../_lib/missions";
import { COOKIES } from "../_lib/welcome";
import { getWinsTotal } from "../_lib/wins";
import { ShellFrame, type ShellSummary } from "./shell-frame";

/** Unseen What's new entries. Only checks whether the wins wall is live if that entry is in play. */
async function unseenNews(seen: string | undefined) {
  const today = ukDay(new Date());
  const all = unseenIds(seen, today);
  const needsWins = CHANGELOG.some((e) => e.requires === "wins" && all.has(e.id));
  if (!needsWins) return all;
  return unseenIds(seen, today, liveEntries({ winsReady: (await getWinsTotal()) !== null }));
}

/** Gathers the data every dashboard page shows in its chrome, then hands off to the client frame. */
export async function AppShell({ children, student }: { children: ReactNode; student: Student }) {
  const [course, game, index, jar] = await Promise.all([getCourse(), getGameStats(), getSearchIndex(), cookies()]);

  const summary: ShellSummary = {
    percent: course.percent,
    lessonsDone: course.lessonsDone,
    lessonsTotal: course.lessonsTotal,
    xp: game.xp,
    levelName: game.level.name,
    levelEmoji: game.level.emoji,
    streak: game.streak.days,
    badges: MISSIONS.filter((m) => missionState(game.progress, m).complete).length,
    badgesTotal: MISSIONS.length,
    // One certificate per passed module exam, plus the programme one once all are passed.
    certificates: course.modulesPassed + (course.modulesPassed >= MODULE_CERTIFICATES.length ? 1 : 0),
    certificatesTotal: CERTIFICATE_DEFS.length,
    newsUnseen: [...(await unseenNews(jar.get(COOKIES.newsSeen)?.value))],
    nextHref: course.next?.lesson.href ?? "/dashboard/modules",
  };

  return (
    <ShellFrame student={student} summary={summary} index={index}>
      {children}
    </ShellFrame>
  );
}
