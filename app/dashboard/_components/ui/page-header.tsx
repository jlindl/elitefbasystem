import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="dash-rise flex flex-col gap-5 md:flex-row md:items-end md:justify-between" style={{ ["--i" as string]: 0 }}>
      <div className="min-w-0">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-[2rem] md:text-[2.75rem] font-medium leading-[1.05] tracking-[-0.035em] text-ink text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-[620px] text-[1rem] md:text-[1.05rem] leading-relaxed text-ink-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2.5">{actions}</div>}
    </header>
  );
}
