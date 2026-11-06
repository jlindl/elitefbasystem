import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "@/app/components/icons";
import { SmoothScroll } from "@/app/components/smooth-scroll";
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
    redirect(`/dashboard/modules/${moduleId}`);
  }

  return (
    <div className="dash-theme min-h-screen bg-bg">
      <SmoothScroll />
      <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[860px] items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href={`/dashboard/modules/${moduleId}`}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface pl-2 pr-3.5 text-[0.85rem] font-medium text-ink transition-colors hover:border-ink/25"
          >
            <ChevronLeft size={16} /> Module {moduleIndex + 1}
          </Link>
          <p className="min-w-0 truncate text-[0.85rem] text-ink-muted">
            <span className="text-ink-subtle">Module {moduleIndex + 1} ·</span> Final exam
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-[860px] px-4 pb-24 pt-8 sm:px-6 md:pt-12">
        <ModuleExam
          questions={quiz}
          moduleId={moduleId}
          moduleName={mod.name}
          moduleNumber={moduleIndex + 1}
          passThreshold={MODULE_EXAM_PASS_THRESHOLD}
        />
      </main>
    </div>
  );
}
