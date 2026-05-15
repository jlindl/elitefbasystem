import { ArrowRight } from "@/app/components/icons";
import { progress, student, upNext } from "../_lib/mock-data";
import { Card } from "./ui/card";
import { ProgressBar } from "./ui/progress-bar";

export function WelcomeCard() {
  const next = upNext[0];

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
            You&rsquo;re {progress.modulesCompleted} modules in. Let&rsquo;s
            keep building.
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <ProgressBar
              percent={progress.percentComplete}
              className="w-[240px] max-w-full"
              ariaLabel="Course progress"
            />
            <span className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle">
              {progress.modulesCompleted} / {progress.modulesTotal} Modules ·{" "}
              {progress.percentComplete}% Complete
            </span>
          </div>
        </div>

        {/* right 40% */}
        <div className="md:col-span-2">
          <a
            href="#continue"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-white font-medium text-[0.9375rem] transition-colors duration-150 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Continue where you left off
            <ArrowRight
              size={16}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
          <p className="mt-3 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle text-center md:text-left">
            Module {next.moduleNumber} · Lesson {next.lessonNumber} -{" "}
            {next.lessonTitle}
          </p>
        </div>
      </div>
    </Card>
  );
}
