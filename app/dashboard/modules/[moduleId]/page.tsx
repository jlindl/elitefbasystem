import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/app/components/icons";
import { AppShell } from "../../_components/app-shell";
import { AskJakubCard, AskJakubProvider, SelectionAsk } from "../../_components/ask-jakub";
import { LessonRow } from "../../_components/lesson-row";
import { MissionCard } from "../../_components/mission-map";
import { ModuleExamCard } from "../../_components/module-exam-card";
import { ModuleLock } from "../../_components/module-lock";
import { ModuleTabs } from "../../_components/module-tabs";
import { ProgressBar } from "../../_components/ui/progress-bar";
import { getCourse, getGameStats, moduleTitle, tabsForModule } from "../../_lib/course";
import { getCurrentStudent } from "../../_lib/get-student";
import { missionsForModule } from "../../_lib/missions";
import { MODULE_EXAM_PASS_THRESHOLD, MODULE_QUIZZES } from "../../_lib/module-quizzes";
import { firstUnfinished, formatDuration, lessonCount, moduleMinutes, moduleStatus } from "../../_lib/module-status";
import { createGlossaryRun, lessonKey } from "../../_lib/glossary";
import { renderBlock, renderBlocks, splitVideoFromBlocks, type Block } from "../../_lib/modules-render";
import modulesData from "../../_lib/modules_content.json";

type Params = Promise<{ moduleId: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = modulesData.find((m) => m.id === moduleId);
  return { title: mod ? `${moduleTitle(mod.name)} - EliteFBA` : "Modules - EliteFBA" };
}

export default async function ModulePage({ params }: { params: Params }) {
  const student = await getCurrentStudent();
  const { moduleId } = await params;
  const index = modulesData.findIndex((m) => m.id === moduleId);
  if (index === -1) notFound();

  const [course, game] = await Promise.all([getCourse(), getGameStats()]);
  const m = course.modules[index];
  const prevM = course.modules[index - 1] ?? null;
  const nextM = course.modules[index + 1] ?? null;

  const s = moduleStatus(m);
  const total = lessonCount(m);
  const minutes = moduleMinutes(m);
  const pct = s.key === "passed" ? 100 : total ? Math.round((m.done / total) * 100) : 0;
  const upNext = m.structured ? firstUnfinished(m) : null;
  const quiz = MODULE_QUIZZES[m.id];
  const missions = missionsForModule(m.id);
  const videos = m.structured ? splitVideoFromBlocks(modulesData[index].blocks as Block[]).videos : [];

  // The one obvious next action for this module.
  const cta = m.locked
    ? null
    : upNext
      ? { href: upNext.href, label: m.done === 0 ? "Start lesson 1" : `Continue with lesson ${upNext.number}` }
      : quiz && !m.passed
        ? { href: `/dashboard/modules/${m.id}/exam`, label: "Take the final exam" }
        : nextM && !nextM.locked
          ? { href: `/dashboard/modules/${nextM.id}`, label: `Go to module ${nextM.number}` }
          : null;

  const facts = [
    total > 0 ? `${total} lessons` : null,
    minutes > 0 ? formatDuration(minutes).replace("About", "about") : null,
    quiz ? "final exam" : null,
    missions.length ? `${missions.length} practice ${missions.length === 1 ? "mission" : "missions"}` : null,
  ].filter(Boolean);

  let reading: React.ReactNode = null;
  if (!m.structured) {
    const tabs = tabsForModule(index);
    const body =
      tabs.length === 1 ? (
        <div className="lesson-prose text-ink-muted">{renderBlocks(tabs[0].blocks, { glossary: createGlossaryRun(lessonKey(m.id, tabs[0].id)) })}</div>
      ) : (
        <ModuleTabs
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            icon: tab.icon,
            content: <div className="lesson-prose text-ink-muted">{renderBlocks(tab.blocks, { glossary: createGlossaryRun(lessonKey(m.id, tab.id)) })}</div>,
          }))}
        />
      );
    const withAsk = (
      <AskJakubProvider lesson={{ firstName: student.nameIsSet ? student.firstName : null, moduleNumber: m.number, lessonNumber: null, lessonTitle: m.title }}>
        <SelectionAsk>{body}</SelectionAsk>
        <AskJakubCard />
      </AskJakubProvider>
    );
    reading = m.locked ? <ModuleLock>{withAsk}</ModuleLock> : withAsk;
  }

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[960px] px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <nav aria-label="Breadcrumb" className="dash-rise" style={{ ["--i" as string]: 0 }}>
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.9375rem]">
            <li>
              <Link href="/dashboard/modules" className="font-medium text-ink-muted underline decoration-ink/25 underline-offset-4 hover:text-ink hover:decoration-ink">
                All modules
              </Link>
            </li>
            <li aria-hidden className="text-ink-muted">
              <ChevronRight size={14} />
            </li>
            <li>
              <span aria-current="page" className="font-semibold text-ink">
                Module {m.number}
              </span>
            </li>
          </ol>
        </nav>

        <header className="dash-rise mt-6" style={{ ["--i" as string]: 1 }}>
          <p className="text-[0.9375rem] font-semibold text-orange-800">
            Module {m.number} of {course.modules.length}
          </p>
          <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.5rem] text-balance">
            {m.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[1rem] text-ink-muted">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.9375rem] font-semibold ${s.cls}`}>
              <span aria-hidden>{s.glyph}</span>
              {s.label}
            </span>
            {facts.length > 0 && <span>{facts.join(" · ").replace(/^./, (c) => c.toUpperCase())}</span>}
          </div>

          {total > 0 && (
            <div className="mt-6 max-w-[520px]">
              <div className="flex items-baseline justify-between text-[0.9375rem]">
                <span className="font-medium text-ink">
                  {m.done} of {total} lessons done
                </span>
                <span className="text-ink-muted tabular-nums">{pct}%</span>
              </div>
              <ProgressBar
                percent={pct}
                className="mt-2 h-2.5"
                ariaLabel={`Module ${m.number} progress`}
                tone={s.key === "passed" || s.key === "complete" ? "success" : "accent"}
              />
            </div>
          )}

          {cta && (
            <div className="mt-6">
              <Link href={cta.href} className="btn btn-primary btn-aa btn-lg">
                {cta.label} <ArrowRight size={17} className="btn-arrow" />
              </Link>
            </div>
          )}
        </header>

        <div className="mt-12 space-y-12">
          {videos.length > 0 && (
            <section aria-labelledby="intro-heading" className="dash-rise" style={{ ["--i" as string]: 2 }}>
              <h2 id="intro-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
                Intro video
              </h2>
              <p className="mt-1 text-[1rem] text-ink-muted">Watch this first for an overview of the module.</p>
              <div className="mt-5 [&>div]:my-0">{videos.map((v, i) => renderBlock(v, i))}</div>
            </section>
          )}

          {m.structured && (
            <section aria-labelledby="lessons-heading" className="dash-rise" style={{ ["--i" as string]: 3 }}>
              <h2 id="lessons-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
                Lessons
              </h2>
              <p className="mt-1 text-[1rem] text-ink-muted">Work through them in order. Each one takes a few minutes to read.</p>
              <ol className="mt-6 space-y-3">
                {m.lessons.map((l, i) => (
                  <LessonRow key={l.id} lesson={l} next={upNext?.id === l.id} last={i === m.lessons.length - 1} />
                ))}
              </ol>
            </section>
          )}

          {quiz && (
            <section aria-labelledby="exam-heading" className="dash-rise" style={{ ["--i" as string]: 4 }}>
              <h2 id="exam-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
                Final exam
              </h2>
              <p className="mt-1 text-[1rem] text-ink-muted">
                Unlocks when every lesson is marked complete. Pass it to finish the module.
              </p>
              <div className="mt-5">
                <ModuleExamCard
                  moduleId={m.id}
                  moduleNumeral={String(m.number)}
                  questionCount={quiz.length}
                  passPercent={Math.round(MODULE_EXAM_PASS_THRESHOLD * 100)}
                  completed={m.done}
                  total={m.total}
                  passed={m.passed}
                />
              </div>
              {m.passed && (
                <Link
                  href={`/dashboard/certificates/module-${m.number}`}
                  className="group mt-3 inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink/30"
                >
                  <span aria-hidden>🏅</span> View your Module {m.number} certificate
                  <ArrowRight size={16} className="nudge" />
                </Link>
              )}
            </section>
          )}

          {missions.length > 0 && (
            <section aria-labelledby="missions-heading" className="dash-rise" style={{ ["--i" as string]: 5 }}>
              <h2 id="missions-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
                Practice missions
              </h2>
              <p className="mt-1 text-[1rem] text-ink-muted">Put this module into practice and earn XP.</p>
              <div className="mt-5 space-y-3">
                {missions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} progress={game.progress} />
                ))}
              </div>
            </section>
          )}

          {reading && (
            <section aria-labelledby="reading-heading" className="dash-rise" style={{ ["--i" as string]: 2 }}>
              <h2 id="reading-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
                Module content
              </h2>
              {m.locked && (
                <p className="mt-1 max-w-[60ch] text-[1rem] text-ink-muted">
                  This is an advanced module. Enter the password from Jakub to read it.
                </p>
              )}
              <div className="mt-5">{reading}</div>
            </section>
          )}
        </div>

        <nav aria-label="Other modules" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          {prevM ? (
            <Link
              href={`/dashboard/modules/${prevM.id}`}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-ink/30"
            >
              <ChevronLeft size={20} className="shrink-0 text-ink-muted transition-transform group-hover:-translate-x-1" />
              <span className="min-w-0">
                <span className="block text-[0.875rem] text-ink-muted">Previous: Module {prevM.number}</span>
                <span className="block font-display text-[1rem] font-semibold leading-snug text-ink">{prevM.title}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {nextM && (
            <Link
              href={`/dashboard/modules/${nextM.id}`}
              className="group flex items-center justify-end gap-3 rounded-2xl border border-line bg-surface p-4 text-right transition-colors hover:border-ink/30"
            >
              <span className="min-w-0">
                <span className="block text-[0.875rem] text-ink-muted">
                  Next: Module {nextM.number}
                  {nextM.locked ? " (locked)" : ""}
                </span>
                <span className="block font-display text-[1rem] font-semibold leading-snug text-ink">{nextM.title}</span>
              </span>
              <ChevronRight size={20} className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </nav>

        <p className="mt-6 text-center">
          <Link href="/dashboard/modules" className="text-[0.9375rem] font-medium text-ink-muted underline decoration-ink/25 underline-offset-4 hover:text-ink">
            Back to all modules
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
