import { Card } from "./ui/card";

export function AiPartnerCard() {
  return (
    <section
      id="ai-partner"
      className="dash-fade scroll-mt-20"
      style={{ ["--dash-delay" as string]: "180ms" }}
    >
      <Card className="!p-0 overflow-hidden flex flex-col h-[600px] md:h-[640px]">
        {/* Header */}
        <header className="flex items-center justify-between gap-3 px-5 md:px-6 py-4 border-b border-line bg-surface">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
              <span className="font-display text-[0.85rem] font-semibold tracking-tight">
                EF
              </span>
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.9rem] font-medium text-ink">
                Elite FBA AI Partner
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink-subtle">
                Private · Trained on the Elite FBA system
              </span>
            </div>
          </div>
        </header>

        {/* Coming soon body */}
        <div
          className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10"
          style={{
            background:
              "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-alt) 100%)",
          }}
        >
          <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.7rem] font-medium tracking-wide text-accent">
            Coming soon
          </span>
          <h3 className="mt-5 font-display text-[1.5rem] md:text-[1.75rem] font-medium tracking-[-0.015em] leading-[1.2] text-ink">
            Your AI partner is on the way
          </h3>
          <p className="mt-3 text-[0.975rem] text-ink-muted leading-[1.65] max-w-[480px]">
            An AI partner trained on the Elite FBA system, curriculum, SOPs,
            and Jakub&rsquo;s playbook is in the works. Check back here soon.
          </p>
        </div>
      </Card>
    </section>
  );
}
