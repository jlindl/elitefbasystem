import { Reveal } from "./reveal";

// Jakub's own milestones on the road from a 9-5 to full-time Amazon income.
// These are personal results, not student results. Swap each `img` for a real
// screenshot (Seller Central payouts, sales dashboards, bank transfers, etc.)
// when you have them — keep the 4:3 aspect ratio for a clean, even grid.
const milestones = [
  {
    metric: "£600",
    period: "in a single day",
    title: "The first £600 day",
    blurb:
      "The day the side hustle out-earned the day job. One day of Amazon payouts beat a full week of my old salary - that's the moment I knew the 9-5 had an exit.",
    img: "https://placehold.co/640x480/F4F2EC/0A0A0A/png?text=%C2%A3600+day+%E2%80%94+screenshot",
  },
  {
    metric: "£3,000",
    period: "in a week",
    title: "£3k weeks became normal",
    blurb:
      "Once the system was dialled in, £3,000 weeks stopped being a lucky spike and became the baseline I could actually plan my life around.",
    img: "https://placehold.co/640x480/F4F2EC/0A0A0A/png?text=%C2%A33k+week+%E2%80%94+screenshot",
  },
  {
    metric: "£10,000",
    period: "in a month",
    title: "The £10k month",
    blurb:
      "Proof the model scales. A full month of FBA revenue that replaced my salary several times over - built on bundles and wholesale, not gambling on hype products.",
    img: "https://placehold.co/640x480/F4F2EC/0A0A0A/png?text=%C2%A310k+month+%E2%80%94+screenshot",
  },
];

export function Proof() {
  return (
    <section id="results" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="label-mono">03 / Proof, not promises</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              I won&rsquo;t fake student results. So here are mine.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              This mentorship is new, so I&rsquo;m not going to parade screenshots
              from &ldquo;students&rdquo; you&rsquo;ve never met. Instead,
              here&rsquo;s the honest version - the exact numbers that took me from
              a 9-5 to running Amazon full-time, and the financial freedom that
              came with it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {milestones.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 100}>
              <article className="group h-full flex flex-col rounded-2xl bg-surface hairline p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-alt">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={`Screenshot: ${m.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-white backdrop-blur-sm">
                    Screenshot
                  </span>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-[2rem] font-semibold tracking-[-0.02em] leading-none text-ink">
                    {m.metric}
                  </span>
                  <span className="text-[0.85rem] text-ink-muted">
                    {m.period}
                  </span>
                </div>

                <p className="mt-3 text-[0.95rem] font-medium text-ink">
                  {m.title}
                </p>
                <p className="mt-2 text-[0.95rem] text-ink-muted leading-[1.6] flex-1">
                  {m.blurb}
                </p>

                <p className="mt-5 pt-4 border-t border-line label-mono">
                  My own Amazon results
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[0.75rem] tracking-[0.1em] uppercase text-ink-subtle">
          Income disclaimer: These are my own personal results, not typical and
          not a guarantee of what you&rsquo;ll earn. Individual results vary.
        </p>
      </div>
    </section>
  );
}
