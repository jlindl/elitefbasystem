import { Reveal } from "./reveal";

const testimonials = [
  {
    name: "Sarah K.",
    initials: "SK",
    quote:
      "I'd been burned twice by other courses before this. The difference is Jakub actually picks up the phone. Six months in, it finally feels like I'm running a business, not gambling.",
    result: "$4,200/mo profit · 6 months in",
    months: "8",
    img: "https://placehold.co/640x640/F4F2EC/0A0A0A/png?text=Screenshot",
  },
  {
    name: "Marcus T.",
    initials: "MT",
    quote:
      "Hit my first profitable launch in week 11. What blew me away wasn't the system — it was the team. Three people in the group helped me debug a customs problem in one afternoon.",
    result: "$2,400/mo profit · 4 months in",
    months: "6",
    img: "https://placehold.co/640x640/F4F2EC/0A0A0A/png?text=Screenshot",
  },
  {
    name: "Elena R.",
    initials: "ER",
    quote:
      "I came in skeptical. The thing that won me over was Jakub showing me his own losses — actual screenshots, actual SKUs that flopped. Honesty I'd never seen from anyone selling FBA.",
    result: "$8,100/mo profit · 11 months in",
    months: "12",
    img: "https://placehold.co/640x640/F4F2EC/0A0A0A/png?text=Screenshot",
  },
  {
    name: "Daniel O.",
    initials: "DO",
    quote:
      "We had a meetup in Lisbon last spring. I went home with a supplier contact that has saved me about 18% on landed cost. That alone paid for the program five times over.",
    result: "$12,000/mo profit · 14 months in",
    months: "14",
    img: "https://placehold.co/640x640/F4F2EC/0A0A0A/png?text=Screenshot",
  },
  {
    name: "Priya N.",
    initials: "PN",
    quote:
      "I texted Jakub at 9pm on a Sunday because a supplier was bouncing my MOQ. He replied in twelve minutes. That's the part no other course tells you about.",
    result: "$3,800/mo profit · 7 months in",
    months: "9",
    img: "https://placehold.co/640x640/F4F2EC/0A0A0A/png?text=Screenshot",
  },
  {
    name: "Tom W.",
    initials: "TW",
    quote:
      "What I didn't expect was friendship. I joined for the system. I stayed because for the first time, I have people who actually understand what I do all day.",
    result: "$5,500/mo profit · 9 months in",
    months: "10",
    img: "https://placehold.co/640x640/F4F2EC/0A0A0A/png?text=Screenshot",
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
              Real students. Real screenshots. Real friendships.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              Modest numbers, real timelines, real people. The kind of results
              you can actually replicate &mdash; not the kind you put on a
              Lamborghini.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 100}>
              <article className="group h-full flex flex-col rounded-2xl bg-surface hairline p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-alt">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.img}
                    alt={`Screenshot from ${t.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-5 text-[0.975rem] text-ink leading-[1.6] flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white text-[0.7rem] font-medium">
                    {t.initials}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[0.875rem] font-medium text-ink">
                      {t.name}
                    </span>
                    <span className="text-[0.8rem] text-ink-muted">
                      {t.result}
                    </span>
                  </div>
                </div>
                <p className="mt-5 pt-4 border-t border-line label-mono">
                  Mentored for {t.months} months
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[0.75rem] tracking-[0.1em] uppercase text-ink-subtle">
          Income disclaimer: Individual results vary. These reflect real
          students, not averages.
        </p>
      </div>
    </section>
  );
}
