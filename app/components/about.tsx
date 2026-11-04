import { Photo } from "./photo";
import { ArrowRight } from "./icons";
import { MoreOnMobile } from "./more-on-mobile";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const story = [
  {
    href: "/my-story#chapter-2",
    chapter: "Chapter 02",
    title: "The 9-5",
    src: "/chapter 2 image.jpeg",
    alt: "Jakub at his desk in the office during his 9-5",
    position: "object-[50%_30%]",
  },
  {
    href: "/my-story#chapter-3",
    chapter: "Chapter 03",
    title: "Finding FBA",
    src: "/discoverfba.jpeg",
    alt: "Jakub loading boxes of stock into his car",
    position: "object-[50%_55%]",
  },
  {
    href: "/my-story#chapter-6",
    chapter: "Chapter 06",
    title: "The day I quit",
    src: "/The day i quit image.jpeg",
    alt: "Jakub on the day he quit his job",
    position: "object-[50%_35%]",
  },
  {
    href: "/my-story#chapter-7",
    chapter: "Chapter 07",
    title: "Today",
    src: "/marbella.jpeg",
    alt: "Working on a laptop by the pool in Marbella",
    position: "object-center",
  },
];

const stats = [
  { number: "6", label: "Years e-commerce experience", accent: false },
  { number: "2", label: "Years selling on Amazon", accent: false },
  { number: "50+", label: "Active listings", accent: true },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 md:scroll-mt-24 py-16 md:py-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5 md:sticky md:top-28">
            <Reveal variant="scale">
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl hairline bg-surface-alt shadow-[var(--shadow-lift)]">
                <Photo
                  src="/jakub portrait.jpeg"
                  alt="Jakub with a pallet of stock"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-[50%_62%] md:object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-16 md:p-6 md:pt-20">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/70">
                    Founder · Elite FBA
                  </p>
                  <p className="mt-1 font-display text-[1.375rem] font-medium tracking-[-0.02em] text-white">
                    Jakub
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <SectionHeading
              index="07"
              eyebrow="Who I am"
              title="I’m Jakub. I’m an Amazon seller first."
            />

            <div className="mt-8 max-w-[640px] space-y-5 text-[1rem] md:text-[1.075rem] leading-[1.75] text-ink-muted">
              <Reveal delay={140}>
                <p className="text-[1.15rem] md:text-[1.3rem] leading-[1.55] text-ink">
                  I run a real Amazon FBA business every day. I&rsquo;m
                  ordering inventory, refining listings, fighting suppression
                  notices, and staring at PPC reports, the same as my students.
                  I&rsquo;m not a retired seller. I&rsquo;m not a coach
                  pretending to be one.
                </p>
              </Reveal>
              <MoreOnMobile label="Read my story">
                <div className="space-y-5">
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
              </MoreOnMobile>
            </div>

            <Reveal delay={380}>
              <dl className="mt-12 grid max-w-[620px] grid-cols-3 gap-3 sm:gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-surface hairline p-4 sm:p-5"
                  >
                    <dt
                      className={`font-display text-[clamp(1.875rem,5vw,3rem)] font-medium tracking-[-0.04em] leading-none ${
                        s.accent ? "text-accent" : "text-ink"
                      }`}
                    >
                      {s.number}
                    </dt>
                    <dd className="mt-3 font-mono text-[0.6rem] sm:text-[0.68rem] uppercase leading-[1.5] tracking-[0.12em] text-ink-subtle">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <StoryStrip />
      </div>
    </section>
  );
}

/** Four photo chapters from /my-story; swipeable on phones, a row on desktop. */
function StoryStrip() {
  return (
    <div className="mt-24 md:mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <p className="label-mono">From the 9-5 to full-time</p>
          <p className="mt-3 font-display text-[1.5rem] md:text-[2rem] font-medium tracking-[-0.03em] leading-[1.15]">
            The story so far, in four photos.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <a
            href="/my-story"
            className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-ink"
          >
            <span className="border-b border-ink/25 pb-0.5 transition-colors group-hover:border-accent">
              Read all seven chapters
            </span>
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>

      <ol className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {story.map((item, i) => (
          <li key={item.href} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-auto">
            <Reveal delay={i * 90}>
              <a href={item.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-surface-alt hairline">
                  <Photo
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 72vw"
                    className={`object-cover ${item.position} transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/70">
                      {item.chapter}
                    </p>
                    <p className="mt-1 flex items-center justify-between gap-2 font-display text-[1.2rem] md:text-[1.3rem] font-medium tracking-[-0.02em]">
                      {item.title}
                      <ArrowRight
                        size={16}
                        className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
