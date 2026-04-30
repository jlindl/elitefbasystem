import { mentorship } from "../_lib/mock-data";
import { Card } from "./ui/card";

export function MentorshipCard() {
  return (
    <Card
      className="h-full dash-fade flex flex-col"
      style={{ ["--dash-delay" as string]: "120ms" }}
    >
      {/* Top half */}
      <div>
        <h2 className="font-display text-[1rem] font-medium tracking-[-0.01em]">
          Your mentorship with Jakub
        </h2>
        <p className="mt-3 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-subtle">
          Next 1-to-1 call
        </p>
        <p className="mt-2 font-display text-[1.125rem] font-medium tracking-[-0.01em] text-ink">
          {mentorship.nextCall.date} · {mentorship.nextCall.time}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <GhostButton>Reschedule</GhostButton>
          <GhostButton>Add to calendar</GhostButton>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-line-soft" />

      {/* Bottom half */}
      <div className="flex-1 flex flex-col">
        <p className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-subtle">
          Direct message
        </p>
        <p className="mt-3 italic text-[0.9375rem] text-ink-muted leading-[1.55] line-clamp-2">
          “Last message from Jakub: {mentorship.lastMessageFromJakub}”
        </p>
        <p className="mt-2 font-mono text-[0.65rem] tracking-[0.08em] uppercase text-ink-subtle">
          {mentorship.lastMessageTimestamp}
        </p>

        <a
          href="#chat"
          className="mt-auto pt-5 inline-flex items-center text-[0.9375rem] font-medium text-accent hover:text-accent-deep transition-colors duration-150"
        >
          Open chat <span aria-hidden className="ml-1">→</span>
        </a>
      </div>
    </Card>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-lg border border-line bg-transparent px-4 py-2 text-[0.875rem] text-ink hover:bg-surface-alt transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {children}
    </button>
  );
}
