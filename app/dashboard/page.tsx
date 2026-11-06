import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AppShell } from "./_components/app-shell";
import { FirstSteps, type FirstStep } from "./_components/first-steps";
import {
  ComingSoon,
  ContactCard,
  ContinueCard,
  DailyTerm,
  DashHero,
  JourneyStrip,
  MissionsPanel,
  ToolsGrid,
} from "./_components/home";
import { Welcome } from "./_components/welcome";
import { WhatsNewStrip } from "./_components/whats-new";
import { formatIssued, ukDay } from "./_lib/certificate-defs";
import { liveEntries, recentEntries, unseenIds } from "./_lib/changelog";
import { whatsappLink } from "./_lib/contact";
import { getCourse, getGameStats } from "./_lib/course";
import { getCurrentStudent } from "./_lib/get-student";
import { memberNumber, memberSinceLabel } from "./_lib/member";
import { MISSIONS, missionState } from "./_lib/missions";
import { COOKIES } from "./_lib/welcome";
import { getMyWinCount, getWinsTotal } from "./_lib/wins";

export const metadata: Metadata = {
  title: "Dashboard - EliteFBA",
  description: "Your EliteFBA mentorship dashboard.",
};

const rise = (i: number) => ({ ["--i" as string]: i });

export default async function DashboardPage() {
  const student = await getCurrentStudent();
  const [course, game, myWins, winsTotal, jar] = await Promise.all([getCourse(), getGameStats(), getMyWinCount(), getWinsTotal(), cookies()]);
  // The wins wall is live once its database objects exist.
  const winsReady = winsTotal !== null;

  const number = memberNumber(student.id);
  const missionStarted = MISSIONS.some((m) => missionState(game.progress, m).started);
  const firstLesson = course.modules[0]?.lessons[0]?.href ?? "/dashboard/modules";

  // First visit: nothing started yet and this device hasn't seen the welcome.
  const showWelcome = course.lessonsDone === 0 && !missionStarted && jar.get(COOKIES.welcomed)?.value !== number;

  const steps: FirstStep[] = [
    { id: "name", label: "Add your name", detail: "It goes on your certificates.", href: "/dashboard/certificates", done: student.nameIsSet },
    { id: "lesson", label: "Finish your first lesson", detail: "About ten minutes to read.", href: course.next?.lesson.href ?? firstLesson, done: course.lessonsDone > 0 },
    { id: "mission", label: "Play your first mission", detail: "Quick, game-style practice.", href: "/dashboard/missions", done: missionStarted },
    { id: "certificate", label: "Earn your first certificate", detail: "Pass the Module 1 exam.", href: `/dashboard/modules/${course.modules[0]?.id ?? ""}`, done: course.modulesPassed > 0 },
    {
      id: "hello",
      label: "Say hello to Jakub",
      detail: "Opens WhatsApp with a hello typed out.",
      href: whatsappLink(student.nameIsSet ? `Hi Jakub, it's ${student.firstName} 👋 I've just joined Elite FBA and I'm getting started!` : "Hi Jakub 👋 I've just joined Elite FBA and I'm getting started!"),
      done: jar.get(COOKIES.saidHi)?.value === "1",
      external: true,
    },
    ...(winsReady && myWins !== null
      ? [{ id: "win", label: "Share your first win", detail: "Post it on the wins wall.", href: "/dashboard/wins", done: myWins > 0 }]
      : []),
  ];
  const showSteps = jar.get(COOKIES.stepsHidden)?.value !== "1";

  const today = ukDay(new Date());
  const live = liveEntries({ winsReady });
  const seenCookie = jar.get(COOKIES.newsSeen)?.value;
  const unseen = unseenIds(seenCookie, today, live);
  // Recent updates, plus any older ones this member hasn't seen (e.g. a feature that went live later).
  const recent = new Set(recentEntries(today, 21, live).map((e) => e.id));
  const news = live.filter((e) => recent.has(e.id) || unseen.has(e.id)).map((e) => ({ ...e, added: formatIssued(e.date) }));

  return (
    <AppShell student={student}>
      <Welcome
        show={showWelcome}
        firstName={student.nameIsSet ? student.firstName : null}
        card={{ name: student.nameIsSet ? student.fullName : "Elite FBA member", number, since: memberSinceLabel(student.memberSince), tier: student.hasAccess ? "Mentorship" : "Member" }}
        firstLessonHref={firstLesson}
      />
      <div className="mx-auto max-w-[1240px] space-y-10 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <DashHero student={student} course={course} game={game} />

        {showSteps && (
          <div className="dash-rise" style={rise(1)}>
            <FirstSteps steps={steps} />
          </div>
        )}

        <div className="dash-rise grid gap-4 lg:grid-cols-[1.6fr_1fr]" style={rise(2)}>
          <ContinueCard course={course} />
          <ContactCard />
        </div>

        {news.length > 0 && (
          <div className="dash-rise" style={rise(3)}>
            <WhatsNewStrip entries={news} unseen={[...unseen]} liveIds={live.map((e) => e.id)} firstVisit={!seenCookie} />
          </div>
        )}

        <JourneyStrip course={course} />

        <div className="dash-rise grid gap-4 md:grid-cols-2" style={rise(4)}>
          <MissionsPanel game={game} />
          <DailyTerm />
        </div>

        <div className="dash-rise" style={rise(5)}>
          <ToolsGrid />
        </div>

        <div className="dash-rise" style={rise(6)}>
          <ComingSoon winsReady={winsReady} />
        </div>

        <p className="pb-4 text-center text-[0.8125rem] font-medium text-ink-muted">EliteFBA · Built by a real seller</p>
      </div>
    </AppShell>
  );
}
