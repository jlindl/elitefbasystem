import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompletionCheckbox } from "../../../_components/completion-checkbox";
import { LessonQuiz } from "../../../_components/lesson-quiz";
import { ModuleLock } from "../../../_components/module-lock";
import { TableOfContents } from "../../../_components/table-of-contents";
import { getCurrentStudent } from "../../../_lib/get-student";
import { LESSON_QUIZZES } from "../../../_lib/lesson-quizzes";
import {
  extractTocHeadings,
  groupBlocksIntoTabs,
  renderBlock,
  splitVideoFromBlocks,
} from "../../../_lib/modules-render";
import { isTabCompleted } from "../../../_lib/tab-completions";
import modulesData from "../../../_lib/modules_content.json";

type Params = Promise<{ moduleId: string; tabId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { moduleId, tabId } = await params;
  const moduleIndex = modulesData.findIndex((m) => m.id === moduleId);
  if (moduleIndex === -1) return { title: "Modules - EliteFBA" };

  const mod = modulesData[moduleIndex];
  const { rest } = splitVideoFromBlocks(mod.blocks);
  const tab = groupBlocksIntoTabs(rest).find((t) => t.id === tabId);
  const tabLabel = tab?.label ?? "Module";
  return { title: `${tabLabel} - ${mod.name}` };
}

export default async function ModuleTabPage({
  params,
}: {
  params: Params;
}) {
  await getCurrentStudent();
  const { moduleId, tabId } = await params;

  const moduleIndex = modulesData.findIndex((m) => m.id === moduleId);
  if (moduleIndex === -1) notFound();

  const mod = modulesData[moduleIndex];

  // Gate: same rule as the modules listing. Module 1 (index 0) is open,
  // everything else needs the unlock cookie.
  if (moduleIndex >= 1) {
    const cookieStore = await cookies();
    const unlocked = cookieStore.get("modules_unlocked")?.value === "1";
    if (!unlocked) {
      return (
        <main className="min-h-screen bg-surface-alt pt-16 pb-20 px-6">
          <div className="mx-auto max-w-[460px]">
            <ModuleLock />
          </div>
        </main>
      );
    }
  }

  const { rest } = splitVideoFromBlocks(mod.blocks);
  const tab = groupBlocksIntoTabs(rest).find((t) => t.id === tabId);
  if (!tab) notFound();

  const completed = await isTabCompleted(moduleId, tabId);
  const headings = extractTocHeadings(tab.blocks);
  const quiz = LESSON_QUIZZES[`${moduleId}::${tabId}`];

  return (
    <main className="min-h-screen bg-surface-alt">
      <header className="sticky top-0 z-10 bg-bg/85 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-[1180px] px-6 md:px-8 py-4 flex items-center gap-4">
          <Link
            href="/dashboard/modules"
            className="text-[0.85rem] text-ink-muted hover:text-ink transition-colors"
          >
            ← All modules
          </Link>
          <span className="text-ink-subtle text-[0.85rem]">·</span>
          <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle truncate">
            {mod.name}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-6 md:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10 xl:gap-14">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{tab.icon}</span>
              <h1 className="font-display text-[1.875rem] md:text-[2.25rem] font-medium tracking-[-0.025em] text-ink leading-[1.1]">
                {tab.label}
              </h1>
            </div>

            <div className="mt-8 space-y-6 text-ink-muted">
              {tab.blocks.map((block, i) => renderBlock(block, i))}
            </div>

            {quiz && quiz.length > 0 && <LessonQuiz questions={quiz} />}

            <CompletionCheckbox
              moduleId={moduleId}
              tabId={tabId}
              initialCompleted={completed}
            />
          </div>

          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </main>
  );
}
