import { Reveal } from "./reveal";

const stats = [
  { number: "6", label: "Years e-commerce experience", accent: false },
  { number: "2", label: "Years selling on Amazon", accent: false },
  { number: "50+", label: "Active listings", accent: true },
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
                src="/jakub%20portrait.jpeg"
                alt="Jakub at the warehouse"
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
                  notices, and staring at PPC reports, the same as my students.
                  I&rsquo;m not a retired seller. I&rsquo;m not a coach
                  pretending to be one.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  I&rsquo;ve been an entrepreneur since I was a kid. If there
                  was a margin to be made, I was there, selling sweets in the
                  school corridor or flipping phone cases on eBay. I&rsquo;ve
                  cycled through 100 different business ideas, but everything
                  changed when I applied that &ldquo;buy and sell&rdquo; hustle
                  to the Amazon FBA framework.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p>
                  I started this business with capital saved from my 9-5 job. I
                  built the systems on the side, refined the sourcing model, and
                  didn&rsquo;t quit until the income was steady enough to
                  replace my salary. I didn&rsquo;t get lucky with a
                  &ldquo;viral&rdquo; product; I built a repeatable process that
                  works.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <p>
                  I&rsquo;m teaching now not because I&rsquo;ve stopped selling,
                  but because I want to build a network of sharp operators.
                  I&rsquo;m looking for people who value execution over theory.
                  That&rsquo;s why I keep the group small, and that&rsquo;s why
                  this isn&rsquo;t just a course; it&rsquo;s the blueprint I use
                  every morning.
                </p>
              </Reveal>
            </div>

            <Reveal delay={380}>
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
