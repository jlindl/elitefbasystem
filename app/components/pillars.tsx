import { Compass, MessageCircle, Users } from "./icons";
import { Reveal } from "./reveal";

const pillars = [
  {
    n: "01",
    icon: Compass,
    title: "A system I built. Not a recycled playbook.",
    body: "Elite FBA is the exact framework I use to run my own Amazon business in 2026. Not theory. Not a five-year-old course. The same product research, sourcing, listing, and scaling moves I'm making this month.",
    tag: "Built from a live business",
  },
  {
    n: "02",
    icon: MessageCircle,
    title: "Real 1-to-1 mentorship. From me. Full-time.",
    body: "You get me. Not a “certified coach.” Not a virtual assistant. Direct access to the person who built the system, with full-time support - so when you're stuck on a supplier negotiation at 11pm, you actually get help.",
    tag: "Direct access · Fast responses",
  },
  {
    n: "03",
    icon: Users,
    title: "A team of sellers. Friends, not strangers.",
    body: "This isn't a 5,000-person Discord. It's a small, tight team where everyone knows your name. We share suppliers, celebrate wins, and catch each other when products flop. Real friendships, built through business.",
    tag: "Small · Intentional · Loyal",
  },
];

export function Pillars() {
  return (
    <section
      id="method"
      className="scroll-mt-20 md:scroll-mt-24 bg-surface-alt py-24 md:py-32 border-y border-line"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-[760px]">
          <Reveal>
            <p className="label-mono">02 / What makes this different</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              A system. A mentor. A team.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              Three things you don&rsquo;t get anywhere else in the FBA coaching
              world. Together, they&rsquo;re why this works.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-16 grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.n} delay={i * 120}>
                <article className="group relative h-full flex flex-col rounded-2xl bg-surface hairline p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <span className="font-display text-[5rem] leading-none font-light text-ink-subtle">
                    {p.n}
                  </span>
                  <Icon size={22} className="mt-6 text-accent" />
                  <h3 className="mt-5 font-display text-[1.5rem] md:text-[1.625rem] font-semibold tracking-[-0.015em] leading-[1.15]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[0.975rem] text-ink-muted leading-[1.6] flex-1">
                    {p.body}
                  </p>
                  <p className="mt-7 pt-5 border-t border-line label-mono">
                    {p.tag}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={240}>
          <div className="mt-20 md:mt-24 text-center max-w-[820px] mx-auto">
            <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.015em] leading-[1.25]">
              &ldquo;I&rsquo;d rather have ten students I actually know than a
              thousand I&rsquo;ll never meet.&rdquo;
            </p>
            <p className="mt-4 label-mono">- Jakub</p>
            <a
              href="#curriculum"
              className="mt-10 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-6 text-[0.9rem] font-medium text-ink transition-all duration-200 hover:-translate-y-px hover:border-ink/20"
            >
              See how it works
              <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
