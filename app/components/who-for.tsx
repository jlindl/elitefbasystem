import { ArrowRight, Check, X } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const forYou = [
  "You want an income that isn’t tied to the hours you sit at a 9-5.",
  "You’re ready to put real work in - this isn’t passive from day one.",
  "You’d rather learn from someone selling now than from a 2019 course.",
  "You want people around you who are building the same thing.",
];

const notForYou = [
  "You’re looking to get rich quick, or without effort.",
  "You’re not prepared to buy any stock to get started.",
  "You want videos to watch, not a mentor who’ll hold you to it.",
];

export function WhoFor() {
  return (
    <section className="bg-surface py-16 md:py-36 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <SectionHeading
          align="center"
          index="08"
          eyebrow="Is this for you?"
          title="I’m picky about who I take on. Here’s why."
          intro="Spots are limited, so I’d rather be straight with you now than waste your time later."
        />

        <div className="mx-auto mt-14 md:mt-16 grid max-w-[1040px] gap-4 md:grid-cols-2 md:gap-5">
          <Reveal variant="left">
            <div className="h-full rounded-3xl bg-ink p-7 sm:p-9 md:p-10 text-white shadow-[var(--shadow-lift)]">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                This is for you if
              </p>
              <ul className="mt-6 space-y-4">
                {forYou.map((t) => (
                  <li key={t} className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check size={13} />
                    </span>
                    <span className="text-[1rem] leading-[1.55] text-white/85">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <div className="h-full rounded-3xl border border-line bg-surface p-7 sm:p-9 md:p-10">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle">
                This isn&rsquo;t for you if
              </p>
              <ul className="mt-6 space-y-4">
                {notForYou.map((t) => (
                  <li key={t} className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-ink-subtle">
                      <X size={12} />
                    </span>
                    <span className="text-[1rem] leading-[1.55] text-ink-muted">{t}</span>
                  </li>
                ))}
              </ul>
              <a href="#apply" className="btn btn-primary mt-9 w-full sm:w-auto">
                Sounds like me - I&rsquo;m in
                <ArrowRight size={16} className="btn-arrow" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
