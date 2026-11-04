import type { CSSProperties } from "react";
import { ArrowRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const pillars = [
  {
    n: "01",
    kicker: "The system",
    title: "A system I built. Not a recycled playbook.",
    body: "Elite FBA is the exact framework I use to run my own Amazon business in 2026. Not theory. Not a five-year-old course. The same product research, sourcing, listing, and scaling moves I'm making this month.",
    tag: "Built from a live business",
  },
  {
    n: "02",
    kicker: "The mentor",
    title: "Real 1-to-1 mentorship. From me. Full-time.",
    body: "You get me. Not a “certified coach.” Not a virtual assistant. Direct access to the person who built the system, with full-time support - so when you're stuck on a supplier negotiation at 11pm, you actually get help.",
    tag: "Direct access · Fast responses",
  },
  {
    n: "03",
    kicker: "The team",
    title: "A team of sellers. Friends, not strangers.",
    body: "This isn't a 5,000-person Discord. It's a small, tight team where everyone knows your name. We share suppliers, celebrate wins, and catch each other when products flop. Real friendships, built through business.",
    tag: "Small · Intentional · Loyal",
  },
];

export function Pillars() {
  return (
    <section
      id="method"
      className="scroll-mt-20 md:scroll-mt-24 bg-surface-alt py-16 md:py-36 border-y border-line"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Why learn from me"
          title="A system. A mentor. A team."
          intro="Three things you don’t get anywhere else in the FBA coaching world. Together, they’re why this works."
        />

        {/* Cards pin and stack as you scroll through them. */}
        <ol className="mt-14 md:mt-20 flex flex-col gap-6 md:gap-10">
          {pillars.map((p, i) => {
            return (
              <li
                key={p.n}
                className="sticky top-[calc(5.5rem+var(--i)*1rem)] md:top-[calc(7rem+var(--i)*1.75rem)]"
                style={{ "--i": i } as CSSProperties}
              >
                <Reveal variant="scale">
                  <article className="relative grid gap-5 overflow-hidden rounded-3xl bg-surface hairline p-6 sm:p-9 md:grid-cols-[200px_1fr] md:gap-12 md:p-12 shadow-[0_-12px_40px_-24px_rgba(10,10,10,0.18)]">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent/40 to-transparent" />
                    <div className="flex items-end gap-3 md:flex-col md:items-start md:gap-3">
                      <span className="font-display text-[3.25rem] md:text-[5.5rem] font-medium leading-[0.8] tracking-[-0.06em] text-accent tabular-nums">
                        {p.n}
                      </span>
                      <span className="pb-1 md:pb-0 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle">
                        {p.kicker}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-[1.5rem] sm:text-[1.875rem] md:text-[2.25rem] font-medium tracking-[-0.03em] leading-[1.12] text-balance">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-[600px] text-[0.975rem] md:text-[1.05rem] leading-[1.7] text-ink-muted">
                        {p.body}
                      </p>
                      <p className="mt-6 inline-flex items-center rounded-full bg-accent-soft px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent-deep">
                        {p.tag}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal>
          <figure className="mx-auto mt-24 md:mt-32 max-w-[880px] text-center">
            <blockquote className="font-serif text-[clamp(1.875rem,4.2vw,3.25rem)] leading-[1.18] text-ink text-balance">
              &ldquo;I&rsquo;d rather have ten students I actually know than a
              thousand I&rsquo;ll never meet.&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3 label-mono">
              <span className="h-px w-8 bg-line" />
              Jakub
              <span className="h-px w-8 bg-line" />
            </figcaption>
            <a href="#apply" className="btn btn-primary mt-10">
              Apply for mentorship
              <ArrowRight size={16} className="btn-arrow" />
            </a>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
