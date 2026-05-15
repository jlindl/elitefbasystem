import { teamMoments, type TeamMoment } from "../_lib/mock-data";
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamMoments.map((moment) => (
          <MomentCard key={moment.name + moment.timestamp} moment={moment} />
        ))}
      </div>

      <a
        href="#team"
        className="mt-5 inline-flex items-center text-[0.875rem] text-ink-muted hover:text-ink transition-colors duration-150"
      >
        Open The Team <span aria-hidden className="ml-1">→</span>
      </a>
    </Card>
  );
}

function MomentCard({ moment }: { moment: TeamMoment }) {
  return (
    <article className="rounded-xl bg-surface-alt p-4 flex flex-col gap-3">
      <header className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent text-[0.7rem] font-medium shrink-0"
        >
          {moment.initials}
        </span>
        <div className="min-w-0">
          <p className="text-[0.8rem] text-ink-subtle truncate">{moment.name}</p>
          <p className="text-[0.9375rem] font-medium text-ink truncate">
            {moment.headline}
          </p>
        </div>
      </header>
      <p className="italic text-[0.875rem] text-ink-muted leading-[1.5] line-clamp-2">
        “{moment.quote}”
      </p>
      <footer className="flex items-center justify-between gap-2 mt-auto">
        <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-ink-subtle">
          {moment.timestamp}
        </span>
        {typeof moment.replies === "number" && (
          <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-ink-subtle">
            {moment.replies} Replies
          </span>
        )}
      </footer>
    </article>
  );
}
