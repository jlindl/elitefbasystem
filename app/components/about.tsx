import { Reveal } from "./reveal";

const stats = [
  { number: "7", label: "Years selling on Amazon", accent: false },
  { number: "$4.2M", label: "Lifetime revenue", accent: true },
  { number: "23", label: "Active SKUs", accent: false },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <Reveal as="div" className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden hairline shadow-[var(--shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://placehold.co/800x1000/F4F2EC/0A0A0A/png?text=Jakub+at+the+warehouse"
                alt="[IMAGE: Jakub at his desk / warehouse / packaging products]"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <p className="label-mono">07 / Who I am</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.2vw,3.5rem)]">
                I&rsquo;m Jakub. I&rsquo;m an Amazon seller first.
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-[1rem] md:text-[1.05rem] leading-[1.7] text-ink-muted max-w-[640px]">
              <Reveal delay={140}>
                <p>
                  I run a real Amazon FBA business every day. I&rsquo;m
                  ordering inventory, refining listings, fighting suppression
                  notices, and staring at PPC reports &mdash; same as my
                  students. I&rsquo;m not a retired seller. I&rsquo;m not a
                  coach pretending to be one.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  I started selling at 19 with money I&rsquo;d saved from a
                  warehouse job. It went badly. The second product went
                  worse. The system I teach now is the one I had to build
                  to survive years three through seven, and it&rsquo;s still
                  the one I trust.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p>
                  I&rsquo;m teaching now not because I stopped selling
                  &mdash; but because I want to build a team. People I
                  actually know. People I&rsquo;d call. That&rsquo;s why I
                  keep this small, and that&rsquo;s why this isn&rsquo;t a
                  course.
                </p>
              </Reveal>
            </div>

            <Reveal delay={320}>
              <dl className="mt-12 grid grid-cols-3 gap-6 md:gap-10 max-w-[600px]">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="border-t border-line pt-5 md:pt-6"
                  >
                    <dt
                      className={`font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.02em] leading-none ${
                        s.accent ? "text-accent" : "text-ink"
                      }`}
                    >
                      {s.number}
                    </dt>
                    <dd className="mt-3 label-mono">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
