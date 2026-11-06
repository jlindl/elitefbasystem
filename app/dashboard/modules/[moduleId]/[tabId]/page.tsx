import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronLeft, Clock } from "@/app/components/icons";
import { AskJakubButton, AskJakubCard, SelectionAsk } from "../../../_components/ask-jakub";
import { LessonComplete } from "../../../_components/lesson-complete";
import {
  LessonAskProvider,
  LessonNav,
  LessonOverview,
  LessonPlayerProvider,
  LessonProgressBar,
  LessonStep,
  PartsRecap,
  ReadInstead,
  LessonBackToTop,
  ReadingOptions,
  type LessonStepMeta,
} from "../../../_components/lesson-player";
import { LessonQuiz } from "../../../_components/lesson-quiz";
import { LessonVideoPlayer } from "../../../_components/lesson-video";
import { ModuleLock } from "../../../_components/module-lock";
import { SkipLink } from "../../../_components/skip-link";
import { Term } from "../../../_components/term";
import { getCourse, tabsForModule } from "../../../_lib/course";
import { getCurrentStudent } from "../../../_lib/get-student";
import { createGlossaryRun, lessonKey } from "../../../_lib/glossary";
import { splitLessonParts, WRAP_UP_ID } from "../../../_lib/lesson-parts";
import { LESSON_QUIZZES } from "../../../_lib/lesson-quizzes";
import { lessonVideo } from "../../../_lib/lesson-videos";
import { renderBlocks } from "../../../_lib/modules-render";
import modulesData from "../../../_lib/modules_content.json";
import { COOKIES } from "../../../_lib/welcome";

// The "Easy-read" font in Reading options (designed by the Braille Institute for low-vision readers).
// Not preloaded: browsers only fetch it once someone chooses it.
const easyRead = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-easy", display: "swap", preload: false });

type Params = Promise<{ moduleId: string; tabId: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { moduleId, tabId } = await params;
  const index = modulesData.findIndex((m) => m.id === moduleId);
  if (index === -1) return { title: "Modules - EliteFBA" };
  const tab = tabsForModule(index).find((t) => t.id === tabId);
  return { title: `${tab?.label ?? "Lesson"} - EliteFBA` };
}

export default async function LessonPage({ params }: { params: Params }) {
  const student = await getCurrentStudent();
  const { moduleId, tabId } = await params;

  const index = modulesData.findIndex((m) => m.id === moduleId);
  if (index === -1) notFound();
  const tabs = tabsForModule(index);
  const tab = tabs.find((t) => t.id === tabId);
  if (!tab) notFound();

  const [course, jar] = await Promise.all([getCourse(), cookies()]);
  const mod = course.modules[index];
  const lesson = mod.lessons.find((l) => l.id === tabId)!;
  const position = mod.lessons.findIndex((l) => l.id === tabId);
  const prev = mod.lessons[position - 1] ?? null;
  const nextLesson = mod.lessons[position + 1] ?? null;
  const nextModule = course.modules[index + 1];

  // Where "Next" goes from here: the next lesson, the exam, or the next module.
  const next = nextLesson
    ? { href: nextLesson.href, label: nextLesson.label, kind: "lesson" as const }
    : mod.hasExam
      ? { href: `/dashboard/modules/${mod.id}/exam`, label: `Module ${mod.number} final exam`, kind: "exam" as const }
      : nextModule && !nextModule.locked && nextModule.lessons[0]
        ? { href: nextModule.lessons[0].href, label: nextModule.title, kind: "module" as const }
        : { href: "/dashboard/modules", label: "All modules", kind: "modules" as const };

  const key = lessonKey(moduleId, tabId);
  const parts = splitLessonParts(tab.blocks, tab.label);
  // Rendered in order, so each dictionary term is linked where the lesson first uses it.
  const glossary = createGlossaryRun(key);
  const bodies = parts.map((part) => renderBlocks(part.blocks, { glossary }));
  const keyTerms = glossary.used;
  const quiz = LESSON_QUIZZES[key];
  const tools = parts.reduce((a, p) => a + p.interactive, 0);
  const video = lessonVideo(mod.number, tabId);

  const steps: LessonStepMeta[] = [
    ...parts.map(({ id, kicker, title, minutes, interactive, readable }) => ({ id, kicker, title, minutes, interactive, readable })),
    {
      id: WRAP_UP_ID,
      kicker: null,
      title: "Wrap up",
      minutes: 0,
      interactive: 0,
      wrapUp: true,
      blurb: quiz?.length ? `Wrap up: key terms and a ${quiz.length}-question check` : keyTerms.length ? "Wrap up: key terms and finish" : "Wrap up and finish",
    },
  ];

  const facts = [
    video ? "Video lesson" : null,
    `${lesson.minutes} min read`,
    `${parts.length} ${parts.length === 1 ? "part" : "parts"}`,
    tools ? `${tools} hands-on ${tools === 1 ? "tool" : "tools"}` : null,
    quiz?.length ? `${quiz.length}-question check` : null,
  ].filter((f): f is string => !!f);

  const content = (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12 xl:gap-16">
      <article className="min-w-0">
        <header className="dash-rise relative overflow-hidden rounded-[2rem] bg-ink p-5 text-white sm:p-8 lg:p-10" style={{ ["--i" as string]: 0 }}>
          <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="absolute -right-24 -top-36 h-[440px] w-[440px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,107,26,0.3), transparent 65%)" }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[0.8125rem] font-semibold text-[#ffb27a] ring-1 ring-white/15">
                Module {mod.number} · Lesson {lesson.number} of {mod.total}
              </span>
              {lesson.done && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[0.8125rem] font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
                  <Check size={14} strokeWidth={2.4} /> Completed
                </span>
              )}
            </div>
            <div className="mt-5 flex items-start gap-4">
              <span aria-hidden className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[1.75rem] ring-1 ring-white/15">
                {tab.icon}
              </span>
              <h1 className="pt-1 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-balance md:text-[2.75rem]">{tab.label}</h1>
            </div>
            {lesson.description && <p className="mt-4 max-w-[60ch] text-[1.0625rem] leading-relaxed text-white/80 md:text-[1.125rem]">{lesson.description}</p>}
            <ul aria-label="About this lesson" className="mt-5 flex flex-wrap gap-2">
              {facts.map((f, i) => (
                <li key={f} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-[0.875rem] text-white/85 ring-1 ring-white/10">
                  {i === (video ? 1 : 0) && <Clock size={14} />}
                  {f}
                </li>
              ))}
            </ul>
            {video ? (
              <>
                <LessonVideoPlayer video={video} title={tab.label} storageKey={key} />
                <ReadInstead minutes={lesson.minutes} />
              </>
            ) : (
              <LessonOverview />
            )}
          </div>
        </header>

        {/* Without JavaScript every part shows, one after another. */}
        <noscript>
          <style>{"@layer base{section[data-lesson-step][hidden]{display:block!important}.lesson-print-hide{display:none!important}}"}</style>
        </noscript>
        <SelectionAsk>
          <div className="mt-12 sm:mt-16">
            {parts.map((part, i) => (
              <LessonStep key={part.id} index={i}>
                <div className="lesson-prose lesson-lead text-ink-muted">{bodies[i]}</div>
              </LessonStep>
            ))}
          </div>
        </SelectionAsk>

        <LessonStep index={parts.length}>
          <PartsRecap />

          {keyTerms.length > 0 && (
            <section aria-labelledby="key-terms" className="mt-8 rounded-3xl border border-line bg-surface p-5 sm:p-7">
              <h3 id="key-terms" className="font-display text-[1.25rem] font-semibold tracking-[-0.015em] text-ink">
                <span aria-hidden>📖 </span>Key terms in this lesson
              </h3>
              <p className="mt-1 text-[0.9375rem] text-ink-muted">Tap a term for a quick definition. Underlined words in the lesson work the same way.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {keyTerms.map((t) => (
                  <li key={t.term}>
                    <Term entry={t} variant="chip">
                      {t.term}
                    </Term>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {quiz && quiz.length > 0 && <LessonQuiz questions={quiz} headingLevel={3} />}

          <LessonComplete moduleId={moduleId} tabId={tabId} initialCompleted={lesson.done} next={next} headingLevel={3} />

          <AskJakubCard headingLevel={3} />

          <nav aria-label="Lesson navigation" className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link href={prev.href} className="spot lift group flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
                <ChevronLeft size={18} className="shrink-0 text-ink-subtle transition-transform group-hover:-translate-x-1" />
                <span className="min-w-0">
                  <span className="block text-[0.8125rem] font-medium text-ink-muted">Previous lesson</span>
                  <span className="block truncate font-display text-[0.98rem] font-semibold text-ink">{prev.label}</span>
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            <Link href={next.href} className="spot lift group flex items-center justify-end gap-3 rounded-2xl border border-line bg-surface p-4 text-right">
              <span className="min-w-0">
                <span className="block text-[0.8125rem] font-medium text-orange-800">
                  {next.kind === "exam" ? "Final exam" : next.kind === "module" ? "Next module" : next.kind === "modules" ? "Done" : "Next lesson"}
                </span>
                <span className="block truncate font-display text-[0.98rem] font-semibold text-ink">{next.label}</span>
              </span>
              <ArrowRight size={18} className="nudge shrink-0 text-orange-800" />
            </Link>
          </nav>
        </LessonStep>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] space-y-8 overflow-y-auto overscroll-contain pb-6 pr-1">
          <LessonNav />
          <nav aria-label={`Module ${mod.number} lessons`}>
            <p className="mb-2.5 px-2.5 text-[0.875rem] font-semibold text-ink">Module {mod.number}</p>
            <ol className="space-y-0.5">
              {mod.lessons.map((l) => {
                const on = l.id === tabId;
                return (
                  <li key={l.id}>
                    <Link
                      href={l.href}
                      aria-current={on ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[0.84rem] transition-colors ${
                        on ? "bg-ink text-white" : "text-ink-muted hover:bg-surface hover:text-ink"
                      }`}
                    >
                      <span
                        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.62rem] font-bold ${
                          l.done ? "bg-emerald-600 text-white" : on ? "bg-[#c2410c] text-white" : "bg-surface-deep text-ink"
                        }`}
                      >
                        {l.done ? "✓" : l.number}
                      </span>
                      <span className="line-clamp-1">{l.label}</span>
                      {l.done && <span className="sr-only"> (completed)</span>}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </aside>
    </div>
  );

  return (
    <div className={`dash-theme min-h-screen bg-bg ${easyRead.variable}`}>
      <LessonPlayerProvider
        lessonKey={key}
        steps={steps}
        lessonDone={lesson.done}
        initial={{
          mode: jar.get(COOKIES.lessonMode)?.value ?? null,
          size: jar.get(COOKIES.lessonSize)?.value ?? null,
          font: jar.get(COOKIES.lessonFont)?.value ?? null,
        }}
      >
        <LessonAskProvider lesson={{ firstName: student.nameIsSet ? student.firstName : null, moduleNumber: mod.number, lessonNumber: lesson.number, lessonTitle: tab.label }}>
          <SkipLink />
          <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 md:px-8">
              <Link
                href={`/dashboard/modules/${mod.id}`}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface pl-2 pr-3.5 text-[0.85rem] font-medium text-ink transition-colors hover:border-ink/25"
              >
                <ChevronLeft size={16} /> Module {mod.number}
              </Link>
              <p className="hidden min-w-0 truncate text-[0.85rem] text-ink-muted md:block">{mod.title}</p>
              <div className="ml-auto flex items-center gap-2">
                <ReadingOptions />
                <AskJakubButton />
              </div>
              <ol className="hidden items-center gap-1 sm:flex" aria-label={`Module ${mod.number}: lesson ${lesson.number} of ${mod.total}`}>
                {mod.lessons.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={l.href}
                      aria-label={`Lesson ${l.number}: ${l.label}${l.done ? " (completed)" : ""}`}
                      aria-current={l.id === tabId ? "page" : undefined}
                      className={`block h-2 rounded-full transition-all duration-300 hover:opacity-80 ${
                        l.id === tabId ? "w-6 bg-accent" : l.done ? "w-2 bg-emerald-500" : "w-2 bg-surface-deep"
                      }`}
                    />
                  </li>
                ))}
              </ol>
            </div>
            <LessonProgressBar />
          </header>

          <main id="main" tabIndex={-1} className="mx-auto max-w-[1240px] px-4 pb-24 pt-5 outline-none sm:px-6 md:px-8 md:pt-10">
            {mod.locked ? <ModuleLock>{content}</ModuleLock> : content}
          </main>
          <LessonBackToTop />
        </LessonAskProvider>
      </LessonPlayerProvider>
    </div>
  );
}
