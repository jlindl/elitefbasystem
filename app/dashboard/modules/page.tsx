import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "@/app/components/icons";
import { AppShell } from "../_components/app-shell";
import { ModuleExamCard } from "../_components/module-exam-card";
import { ModuleLock } from "../_components/module-lock";
import { ModuleTabs } from "../_components/module-tabs";
import { getCurrentStudent } from "../_lib/get-student";
import { Accordion } from "@/app/components/accordion";
import { getPassedModules } from "../_lib/module-exam-results";
import {
  MODULE_EXAM_PASS_THRESHOLD,
  MODULE_QUIZZES,
} from "../_lib/module-quizzes";
import {
  groupBlocksIntoTabs,
  hasLessonMarkers,
  renderBlock,
  splitVideoFromBlocks,
  type Block,
  type TabColor,
} from "../_lib/modules-render";
import { getCompletedTabs } from "../_lib/tab-completions";
import modulesData from "../_lib/modules_content.json";

export const metadata: Metadata = {
  title: "Modules - EliteFBA",
  description: "Your EliteFBA learning modules.",
};

const COLOR_STYLES: Record<
  TabColor,
  { card: string; iconBox: string; numeral: string }
> = {
  blue: {
    card: "border-blue-200 bg-blue-50 hover:border-blue-300",
    iconBox: "bg-blue-100 text-blue-700",
    numeral: "text-blue-600",
  },
  purple: {
    card: "border-purple-200 bg-purple-50 hover:border-purple-300",
    iconBox: "bg-purple-100 text-purple-700",
    numeral: "text-purple-600",
  },
  amber: {
    card: "border-amber-200 bg-amber-50 hover:border-amber-300",
    iconBox: "bg-amber-100 text-amber-700",
    numeral: "text-amber-600",
  },
  lime: {
    card: "border-lime-200 bg-lime-50 hover:border-lime-300",
    iconBox: "bg-lime-100 text-lime-700",
    numeral: "text-lime-600",
  },
  rose: {
    card: "border-rose-200 bg-rose-50 hover:border-rose-300",
    iconBox: "bg-rose-100 text-rose-700",
    numeral: "text-rose-600",
  },
  cyan: {
    card: "border-cyan-200 bg-cyan-50 hover:border-cyan-300",
    iconBox: "bg-cyan-100 text-cyan-700",
    numeral: "text-cyan-600",
  },
};

const DONE_CARD =
  "border-emerald-400 bg-emerald-50 hover:border-emerald-500 ring-2 ring-emerald-400/40";
const DONE_ICON_BOX = "bg-emerald-500 text-white";
const DONE_NUMERAL = "text-emerald-600";
const NEUTRAL_CARD = "border-line bg-surface hover:border-ink/20";
const NEUTRAL_ICON_BOX = "bg-surface-alt text-ink";
const NEUTRAL_NUMERAL = "text-ink-subtle";

export default async function ModulesPage() {
  const student = await getCurrentStudent();
  const completed = await getCompletedTabs();
  const passedModules = await getPassedModules();

  const items = modulesData.map((mod, index) => {
    const base = {
      id: mod.id,
      title: mod.name,
      numeral: (index + 1).toString().padStart(2, "0"),
      completed: passedModules.has(mod.id),
    };

    // JSON imports infer the colour as `string`; narrow to Block[] so the
    // splitter/grouper types are happy. Runtime values are validated by the
    // lesson_marker renderer if any unknown colour ever slips in.
    const blocks = mod.blocks as Block[];

    // Video + lesson-cards layout: used for Module 1 (legacy hardcoded
    // sentinels) and for any module whose JSON contains lesson_marker blocks.
    if (index === 0 || hasLessonMarkers(blocks)) {
      const { videos, rest } = splitVideoFromBlocks(blocks);
      const tabs = groupBlocksIntoTabs(rest);
      const completedTabs = tabs.filter((t) =>
        completed.has(`${mod.id}::${t.id}`),
      ).length;
      const moduleQuiz = MODULE_QUIZZES[mod.id];
      const hasExam = !!moduleQuiz;

      return {
        ...base,
        body: (
          <div className="space-y-8">
            {videos.map((v, i) => renderBlock(v, i))}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tabs.map((tab, tabIndex) => {
                const isDone = completed.has(`${mod.id}::${tab.id}`);
                const palette = tab.color ? COLOR_STYLES[tab.color] : null;

                const cardClass = isDone
                  ? DONE_CARD
                  : palette
                  ? palette.card
                  : NEUTRAL_CARD;
                const iconBoxClass = isDone
                  ? DONE_ICON_BOX
                  : palette
                  ? palette.iconBox
                  : NEUTRAL_ICON_BOX;
                const numeralClass = isDone
                  ? DONE_NUMERAL
                  : palette
                  ? palette.numeral
                  : NEUTRAL_NUMERAL;

                return (
                  <a
                    key={tab.id}
                    href={`/dashboard/modules/${mod.id}/${tab.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex flex-col gap-3 rounded-2xl border-2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] ${cardClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex h-6 items-center rounded-full bg-white/80 px-2.5 font-mono text-[0.65rem] font-bold tracking-[0.14em] uppercase ${numeralClass}`}
                      >
                        Lesson {tabIndex + 1}
                      </span>
                      {isDone && (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[0.8rem] text-white">
                          ✓
                        </span>
                      )}
                    </div>

                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-[1.25rem] ${iconBoxClass}`}
                    >
                      {tab.icon}
                    </span>

                    <div>
                      <h3 className="font-display text-[1.05rem] font-semibold text-ink leading-snug">
                        {tab.label}
                      </h3>
                      {tab.description && (
                        <p className="mt-2 text-[0.85rem] text-ink-muted leading-relaxed">
                          {tab.description}
                        </p>
                      )}
                    </div>

                    <span
                      className={`mt-3 inline-flex items-center gap-1.5 self-start h-9 px-4 rounded-full font-mono text-[0.7rem] tracking-[0.1em] uppercase font-bold transition-all duration-200 group-hover:gap-2.5 ${
                        isDone
                          ? "bg-emerald-500 text-white"
                          : "bg-ink text-white"
                      }`}
                    >
                      {isDone ? "Review lesson" : "Start lesson"}
                      <span aria-hidden>→</span>
                    </span>
                  </a>
                );
              })}
            </div>

            {hasExam && (
              <ModuleExamCard
                moduleId={mod.id}
                moduleNumeral={(index + 1).toString()}
                questionCount={moduleQuiz.length}
                passPercent={Math.round(MODULE_EXAM_PASS_THRESHOLD * 100)}
                completed={completedTabs}
                total={tabs.length}
              />
            )}
          </div>
        ),
      };
    }

    const tabs = groupBlocksIntoTabs(blocks);
    const tabsBody = (
      <ModuleTabs
        tabs={tabs.map((tab) => ({
          id: tab.id,
          label: tab.label,
          icon: tab.icon,
          content: (
            <div className="space-y-6 text-ink-muted">
              {tab.blocks.map((block, i) => renderBlock(block, i))}
            </div>
          ),
        }))}
      />
    );

    // Modules 6-9 (index 5+) are gated behind a password.
    return {
      ...base,
      body:
        index >= 5 ? (
          <ModuleLock>{tabsBody}</ModuleLock>
        ) : (
          tabsBody
        ),
    };
  });

  return (
    <AppShell student={student}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
              Learning Modules
            </h1>
            <p className="mt-2 text-[1rem] text-ink-muted">
              Access all course content and track your progress.
            </p>
          </div>
          <Link
            href="/dashboard/tools/dictionary"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-[0.9rem] font-medium text-ink transition-colors duration-150 hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <BookOpen size={18} className="text-accent" />
            Jargon Dictionary
            <span
              aria-hidden
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        <div className="rounded-2xl bg-surface hairline shadow-[var(--shadow-lift)] overflow-hidden">
          <Accordion items={items} showNumeral />
        </div>
      </div>
    </AppShell>
  );
}
