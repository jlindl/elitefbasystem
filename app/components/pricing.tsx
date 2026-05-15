import { Check } from "./icons";
import { Reveal } from "./reveal";

const includes = [
  "Full access to the Elite FBA course",
  "9 learning modules & video walkthroughs",
  "Weekly 1-to-1 calls with Jakub",
  "Direct messaging - full-time support",
  "Live launches & listing teardowns",
  "Every SOP, script & template I use",
  "Private team community + meetups",
  "Lifetime updates as Amazon evolves",
];

export function Pricing() {
  return (
    <section
      id="apply"
      className="bg-surface-alt py-24 md:py-32 border-y border-line"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="text-center max-w-[760px] mx-auto">
          <Reveal>
            <p className="label-mono">08 / Apply</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              One program. Limited spots. No upsells.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              Because mentorship is real, I can only take a small number of
              students at a time. Apply below - if it&rsquo;s a fit,
              we&rsquo;ll talk.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-14 mx-auto max-w-[480px]">
            <div className="rounded-2xl bg-surface hairline p-8 md:p-12 shadow-[var(--shadow-lift)]">
              <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.75rem] font-medium tracking-wide text-accent">
                Limited spots
              </span>
              <h3 className="mt-6 font-display text-[1.875rem] md:text-[2.125rem] font-semibold tracking-[-0.02em] leading-[1.1]">
                The Elite FBA Mentorship
              </h3>
              <p className="mt-3 text-[0.975rem] text-ink-muted leading-[1.55]">
                Direct 1-to-1 mentorship from a full-time Amazon seller, plus
                a hand-picked team you&rsquo;ll actually want to work
                alongside.
              </p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-[3rem] md:text-[3.5rem] font-semibold tracking-[-0.025em] leading-none">
                  £600
                </span>
              </div>
              <p className="mt-2 text-[0.85rem] text-ink-subtle">
                or 3 × £200 · interest-free
              </p>

              <ul className="mt-8 space-y-3">
                {includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent shrink-0">
                      <Check size={14} />
                    </span>
                    <span className="text-[0.95rem] text-ink leading-[1.5]">
                      {inc}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#apply-form"
                className="mt-10 flex h-12 items-center justify-center rounded-full bg-accent px-7 text-[0.95rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(255,107,26,0.32)]"
              >
                Apply Now
              </a>

              <p className="mt-5 text-center font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
                Application required
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
