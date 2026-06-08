import Link from "next/link";
import { ArrowRight } from "@/app/components/icons";
import type { Student } from "../_lib/get-student";
import { getPassedModules } from "../_lib/module-exam-results";
import { getNextLesson } from "../_lib/next-lesson";
import modulesData from "../_lib/modules_content.json";
import { Card } from "./ui/card";
import { ProgressBar } from "./ui/progress-bar";

export async function WelcomeCard({ student }: { student: Student }) {
  const next = await getNextLesson();

  const passedModules = await getPassedModules();
  const modulesTotal = modulesData.length;
  const modulesCompleted = modulesData.filter((mod) =>
    passedModules.has(mod.id),
  ).length;
  const percentComplete =
    modulesTotal > 0
      ? Math.round((modulesCompleted / modulesTotal) * 100)
      : 0;

  return (
    <Card className="dash-fade" style={{ ["--dash-delay" as string]: "0ms" }}>
      <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-center">
        {/* left 60% */}
        <div className="md:col-span-3">
          <p className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-subtle">
            Welcome back
          </p>
          <h1 className="mt-2 font-display text-[1.5rem] md:text-[1.875rem] font-medium tracking-[-0.02em] leading-[1.15]">
            Hi, {student.firstName}.
          </h1>
          <p className="mt-2 text-[0.9375rem] text-ink-muted">
            {`You’re ${modulesCompleted} ${
              modulesCompleted === 1 ? "module" : "modules"
            } in. Let’s keep building.`}
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <ProgressBar
              percent={percentComplete}
              className="w-[240px] max-w-full"
              ariaLabel="Course progress"
            />
            <span className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle">
              {modulesCompleted} / {modulesTotal} Modules ·{" "}
              {percentComplete}% Complete
            </span>
          </div>
        </div>

        {/* right 40% */}
        <div className="md:col-span-2">
          <Link
            href={next ? next.href : "/dashboard/modules"}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-white font-medium text-[0.9375rem] transition-colors duration-150 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {next ? "Continue where you left off" : "Review your modules"}
            <ArrowRight
              size={16}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
          <p className="mt-3 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle text-center md:text-left">
            {next
              ? `Module ${next.moduleNumber} · Lesson ${next.lessonNumber} - ${next.lessonTitle}`
              : "All lessons complete - nice work."}
          </p>
        </div>
      </div>
    </Card>
  );
}
