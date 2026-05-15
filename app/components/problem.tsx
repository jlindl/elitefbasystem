import { MessageOff, TrendingDown, XCircle } from "./icons";
import { Reveal } from "./reveal";

const cards = [
  {
    icon: XCircle,
    title: "Outdated Tactics",
    body: "The 2019 playbook doesn't work in the 2026 marketplace. New algorithms, new ad surfaces, new compliance - you'll waste money on dead strategies.",
  },
  {
    icon: MessageOff,
    title: "Zero Real Support",
    body: "You'll get a Discord invite, a few automated emails, and a coach you'll never speak to twice. When something actually breaks, you're alone.",
  },
  {
    icon: TrendingDown,
    title: "Vanity Metrics",
    body: "Revenue screenshots that hide losses. Course gurus dressed as sellers. The numbers look great because they're carefully chosen, not real.",
  },
];

export function Problem() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              Most &ldquo;FBA gurus&rdquo; stopped selling years ago.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              They sold one product in 2019, made a course, and disappeared into
              Lamborghini commercials. Their tactics are dead. Their screenshots
              are old. Their advice will lose you money - and you&rsquo;ll
              never speak to them again after you swipe your card.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-16 grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 100}>
                <article className="h-full rounded-xl bg-surface hairline p-7 md:p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]">
                  <Icon className="text-accent" />
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.01em]">
                    {card.title}
                  </h3>
                  <p
                    className="mt-3 text-[0.95rem] text-ink-muted leading-[1.6]"
                    dangerouslySetInnerHTML={{ __html: card.body }}
                  />
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={400}>
          <div className="mt-16 md:mt-24 text-center">
            <p className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight text-ink leading-[1.2]">
              This is not the case with the Elite FBA System.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
