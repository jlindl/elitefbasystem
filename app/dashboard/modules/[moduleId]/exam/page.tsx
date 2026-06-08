import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ModuleExam } from "../../../_components/module-exam";
import { getCurrentStudent } from "../../../_lib/get-student";
import {
  MODULE_EXAM_PASS_THRESHOLD,
  MODULE_QUIZZES,
  MODULE_REQUIRED_TABS,
} from "../../../_lib/module-quizzes";
import { getCompletedTabs } from "../../../_lib/tab-completions";
import modulesData from "../../../_lib/modules_content.json";

type Params = Promise<{ moduleId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = modulesData.find((m) => m.id === moduleId);
  return {
    title: mod ? `${mod.name} Final Exam - EliteFBA` : "Final Exam - EliteFBA",
  };
}

export default async function ModuleExamPage({ params }: { params: Params }) {
  await getCurrentStudent();
  const { moduleId } = await params;

  const moduleIndex = modulesData.findIndex((m) => m.id === moduleId);
  if (moduleIndex === -1) notFound();
  const mod = modulesData[moduleIndex];

  const quiz = MODULE_QUIZZES[moduleId];
  const required = MODULE_REQUIRED_TABS[moduleId];
  if (!quiz || !required) notFound();

  const completed = await getCompletedTabs();
  const missing = required.filter(
    (tabId) => !completed.has(`${moduleId}::${tabId}`),
  );
  if (missing.length > 0) {
    redirect("/dashboard/modules");
  }

  return (
    <main className="min-h-screen bg-surface-alt">
      <header className="sticky top-0 z-20 bg-bg/85 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-[860px] px-6 md:px-8 py-4 flex items-center gap-4">
          <Link
            href="/dashboard/modules"
            className="text-[0.85rem] text-ink-muted hover:text-ink transition-colors"
          >
            ← All modules
          </Link>
          <span className="text-ink-subtle text-[0.85rem]">·</span>
          <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle truncate">
            {mod.name} · Final Exam
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[860px] px-6 md:px-8 py-8 md:py-12">
        <ModuleExam
          questions={quiz}
          moduleId={moduleId}
          moduleName={mod.name}
          passThreshold={MODULE_EXAM_PASS_THRESHOLD}
        />
      </div>
    </main>
  );
}
