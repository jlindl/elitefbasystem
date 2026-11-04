import { Check } from "./icons";
import { MoreOnMobile } from "./more-on-mobile";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const items = [
  "Curated, small group",
  "Real friendships, not networking",
  "Suppliers, wins, and losses shared openly",
  "In-person meetups (not just online)",
];

const cards = [
  {
    title: "No Gatekeeping",
    body: "If a supplier is good, the team knows. We share contact info, negotiation threads, and pricing openly.",
  },
  {
    title: "Real-Time Support",
    body: "Launch day jitters or customs hold-ups? The group is active daily to troubleshoot problems in minutes, not days.",
  },
  {
    title: "Shared Wins",
    body: "We celebrate every milestone - from your first unit sold to your first £10k month. Business is better together.",
  },
  {
    title: "Direct Feedback",
    body: "Get honest eyes on your product candidates and listings before you spend a penny on inventory.",
  },
];

export function Community() {
  return (
    <section
      id="community"
      className="scroll-mt-20 md:scroll-mt-24 relative overflow-hidden bg-ink py-16 md:py-36 text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-orb -top-32 left-[10%] h-[420px] w-[420px] bg-accent/25" />
        <div
          className="glow-orb bottom-[-20%] right-[-5%] h-[480px] w-[480px] bg-accent/10"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <SectionHeading
          tone="dark"
          index="06"
          eyebrow="The team"
          title="Business is lonely. Doing it together isn’t."
          intro="The hardest part of building an Amazon business isn’t the work. It’s doing it alone - at your laptop, at midnight, wondering if anyone else is figuring this out too. So we built a team."
        />

        <div className="mt-14 md:mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <article className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:border-white/20 hover:bg-white/[0.07] md:hover:-translate-y-1">
                  <div className="flex items-center gap-3.5 md:block">
                    <span className="inline-flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check size={17} />
                    </span>
                    <h3 className="md:mt-6 font-display text-[1.2rem] md:text-[1.25rem] font-medium tracking-[-0.02em]">
                      {c.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.65] text-white/60">
                    {c.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="space-y-5 text-[1rem] md:text-[1.05rem] leading-[1.75] text-white/65">
                <p>
                  Every member is hand-picked. We keep the group small on
                  purpose - small enough that I know everyone&rsquo;s
                  name, what they&rsquo;re selling, and where they&rsquo;re
                  stuck. There&rsquo;s no pyramid, no upsells, no
                  &ldquo;tiers.&rdquo;
                </p>
                <MoreOnMobile tone="dark">
                <p>
                  What you actually get: people who&rsquo;ll text you when your
                  launch goes live, share suppliers without gatekeeping, and
                  pick you up when a product flops. We meet up occasionally in
                  person too - because the best stuff happens offline.
                </p>
                </MoreOnMobile>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-9 divide-y divide-white/10 border-y border-white/10">
                {items.map((it) => (
                  <li key={it} className="flex items-center gap-3 py-4">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-[0.975rem] text-white">{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
