import { MessageOff, TrendingDown, XCircle } from "./icons";
import { Reveal, RevealWords, ScrollHighlight } from "./reveal";

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
    <section className="bg-surface py-16 md:py-36 border-y border-line">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow">
                  <span className="eyebrow-index">02</span>
                  <span className="eyebrow-rule" />
                  Why most people fail
                </p>
              </Reveal>
              <RevealWords
                as="h2"
                delay={60}
                text="Most “FBA gurus” stopped selling years ago."
                className="mt-5 block font-display font-medium tracking-[-0.03em] leading-[1.04] text-balance text-[clamp(2.125rem,5vw,3.75rem)]"
              />
              <Reveal delay={180}>
                <p className="mt-6 max-w-[520px] text-pretty text-[clamp(1.05rem,1.4vw,1.15rem)] leading-[1.65] text-ink-muted">
                  They sold one product in 2019, made a course, and disappeared
                  into Lamborghini commercials. Their tactics are dead. Their
                  screenshots are old. Their advice will lose you money - and
                  you&rsquo;ll never speak to them again after you swipe your
                  card.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal as="li" key={card.title} delay={i * 90} variant="right">
                  <article className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-surface hairline p-5 sm:p-8 md:p-10 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:shadow-[var(--shadow-lift)] md:hover:-translate-y-1">
                    <div className="flex items-start gap-4 md:gap-7">
                      <span className="inline-flex h-11 w-11 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl md:rounded-2xl bg-accent-soft text-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-6deg] group-hover:scale-105">
                        <Icon size={24} />
                      </span>
                      <div>
                        <p className="font-mono text-[0.7rem] tracking-[0.14em] text-ink-subtle">
                          0{i + 1}
                        </p>
                        <h3 className="mt-1.5 font-display text-[1.25rem] md:text-[1.5rem] font-semibold tracking-[-0.02em]">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-[0.95rem] md:text-[1rem] leading-[1.65] text-ink-muted">
                          {card.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <div className="mt-24 md:mt-36 mx-auto max-w-[1000px] text-center">
          <ScrollHighlight
            text="This is not the case with the Elite FBA System."
            className="font-display font-medium tracking-[-0.035em] leading-[1.08] text-balance text-[clamp(2rem,5.5vw,4.5rem)]"
          />
        </div>
      </div>
    </section>
  );
}
