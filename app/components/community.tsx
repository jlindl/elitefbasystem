import { Check } from "./icons";
import { Reveal } from "./reveal";

const items = [
  "Curated, small group",
  "Real friendships, not networking",
  "Suppliers, wins, and losses shared openly",
  "In-person meetups (not just online)",
];

export function Community() {
  return (
    <section
      id="community"
      className="bg-surface-alt py-24 md:py-32 border-y border-line"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="label-mono">06 / The team</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              Business is lonely. Doing it together isn&rsquo;t.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              The hardest part of building an Amazon business isn&rsquo;t the
              work. It&rsquo;s doing it alone - at your laptop, at
              midnight, wondering if anyone else is figuring this out too. So
              we built a team.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5">
              <Reveal delay={100}>
                <div className="h-full rounded-2xl bg-surface hairline p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent mb-6">
                    <Check size={20} />
                  </div>
                  <h4 className="font-display text-[1.25rem] font-semibold tracking-[-0.015em] mb-3">
                    No Gatekeeping
                  </h4>
                  <p className="text-[0.95rem] text-ink-muted leading-[1.6]">
                    If a supplier is good, the team knows. We share contact
                    info, negotiation threads, and pricing openly.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="h-full rounded-2xl bg-surface hairline p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent mb-6">
                    <Check size={20} />
                  </div>
                  <h4 className="font-display text-[1.25rem] font-semibold tracking-[-0.015em] mb-3">
                    Real-Time Support
                  </h4>
                  <p className="text-[0.95rem] text-ink-muted leading-[1.6]">
                    Launch day jitters or customs hold-ups? The group is active
                    daily to troubleshoot problems in minutes, not days.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="h-full rounded-2xl bg-surface hairline p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent mb-6">
                    <Check size={20} />
                  </div>
                  <h4 className="font-display text-[1.25rem] font-semibold tracking-[-0.015em] mb-3">
                    Shared Wins
                  </h4>
                  <p className="text-[0.95rem] text-ink-muted leading-[1.6]">
                    We celebrate every milestone - from your first unit sold to
                    your first £10k month. Business is better together.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="h-full rounded-2xl bg-surface hairline p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent mb-6">
                    <Check size={20} />
                  </div>
                  <h4 className="font-display text-[1.25rem] font-semibold tracking-[-0.015em] mb-3">
                    Direct Feedback
                  </h4>
                  <p className="text-[0.95rem] text-ink-muted leading-[1.6]">
                    Get honest eyes on your product candidates and listings
                    before you spend a penny on inventory.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="space-y-5 text-[1rem] md:text-[1.05rem] leading-[1.7] text-ink-muted">
                <p>
                  Every member is hand-picked. We keep the group small on
                  purpose - small enough that I know everyone&rsquo;s
                  name, what they&rsquo;re selling, and where they&rsquo;re
                  stuck. There&rsquo;s no pyramid, no upsells, no
                  &ldquo;tiers.&rdquo;
                </p>
                <p>
                  What you actually get: people who&rsquo;ll text you when your
                  launch goes live, share suppliers without gatekeeping, and
                  pick you up when a product flops. We meet up occasionally in
                  person too - because the best stuff happens offline.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-8 space-y-3">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check size={14} />
                    </span>
                    <span className="text-[0.975rem] text-ink">{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <figure className="mt-20 md:mt-24 max-w-[820px]">
            <blockquote className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.015em] leading-[1.3] text-ink">
              &ldquo;I joined for the system. I stayed for the team.&rdquo;
            </blockquote>
            <figcaption className="mt-4 label-mono">
              - Placeholder testimonial, to be replaced with a real one
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
