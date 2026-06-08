import { Card } from "./ui/card";

export function TeamPanel() {
  return (
    <Card
      className="dash-fade"
      style={{ ["--dash-delay" as string]: "240ms" }}
    >
      <div>
        <h2 className="font-display text-[1.125rem] font-medium tracking-[-0.01em]">
          The team this week
        </h2>
        <p className="mt-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-subtle">
          Live from the community
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center text-center py-12">
        <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.7rem] font-medium tracking-wide text-accent">
          Coming soon
        </span>
        <p className="mt-4 text-[0.95rem] text-ink-muted leading-[1.6] max-w-[420px]">
          A space to see wins, questions, and milestones from other EliteFBA
          members is on the way. Check back here soon.
        </p>
      </div>
    </Card>
  );
}
