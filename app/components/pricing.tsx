import { ArrowRight, Check } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

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
      className="scroll-mt-20 md:scroll-mt-24 relative overflow-hidden bg-surface-alt py-16 md:py-36 border-y border-line"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-orb left-1/2 top-1/3 h-[480px] w-[680px] -translate-x-1/2 bg-accent/[0.12]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <SectionHeading
          align="center"
          index="09"
          eyebrow="Apply"
          title="One program. Limited spots. No upsells."
          intro="Because mentorship is real, I can only take a small number of students at a time. Apply below - if it’s a fit, we’ll talk."
        />

        <Reveal delay={160} variant="scale">
          <div className="mx-auto mt-14 md:mt-16 max-w-[1040px] rounded-[28px] bg-gradient-to-b from-white to-white/40 p-px shadow-[var(--shadow-float)]">
            <div className="grid overflow-hidden rounded-[27px] bg-surface md:grid-cols-2">
              <div className="flex flex-col p-7 sm:p-10 md:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[0.75rem] font-medium text-accent-deep">
                  <span className="live-dot !h-1.5 !w-1.5" />
                  Limited spots
                </span>
                <h3 className="mt-6 font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.035em] leading-[1.05]">
                  The Elite FBA Mentorship
                </h3>
                <p className="mt-4 text-[1rem] leading-[1.65] text-ink-muted">
                  Direct 1-to-1 mentorship from a full-time Amazon seller, plus
                  a hand-picked team you&rsquo;ll actually want to work
                  alongside.
                </p>

                <div className="mt-auto pt-10">
                  <a href="/checkout" className="btn btn-primary btn-lg w-full">
                    Enroll Now
                    <ArrowRight size={18} className="btn-arrow" />
                  </a>
                  <p className="mt-4 text-center font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-subtle">
                    Application required · Starts with a WhatsApp chat
                  </p>
                </div>
              </div>

              <div className="border-t border-line bg-surface-alt/60 p-7 sm:p-10 md:border-l md:border-t-0 md:p-12">
                <p className="label-mono">Everything included</p>
                <ul className="mt-6 space-y-3.5">
                  {includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                        <Check size={12} />
                      </span>
                      <span className="text-[0.95rem] leading-[1.5] text-ink">
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
