import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

const stats = [
  { value: 10, prefix: "£", suffix: "k+", label: "Monthly revenue" },
  { value: 130, prefix: "£", suffix: "k+", label: "Annual sales" },
  { value: 10000, prefix: "", suffix: "+", label: "Products sold" },
];

const highlights = [
  "Weekly 1-to-1 calls",
  "Direct messaging access",
  "9 learning modules",
  "40+ SOPs & templates",
  "Small, hand-picked team",
  "Live listing teardowns",
  "In-person meetups",
  "Lifetime updates",
];

export function SocialProof() {
  return (
    <section aria-label="Results in numbers" className="relative border-y border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 py-12 md:py-20">
        <Reveal>
          <p className="label-mono text-center">My numbers. From my own business.</p>
        </Reveal>

        <dl className="mt-8 md:mt-12 grid grid-cols-3 divide-x divide-line">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 110} className="px-2 sm:px-6 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display font-medium tracking-[-0.04em] leading-none text-ink text-[clamp(1.6rem,6.4vw,4.25rem)] tabular-nums">
                <CountUp
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2200}
                />
              </dd>
              <dd
                aria-hidden
                className="mt-3 md:mt-4 font-mono text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.12em] text-ink-subtle"
              >
                {stat.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="marquee-mask overflow-hidden border-t border-line py-4 md:py-5">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center whitespace-nowrap px-5 md:px-8 font-display text-[0.95rem] md:text-[1.05rem] tracking-[-0.01em] text-ink-muted"
                >
                  <span aria-hidden className="mr-5 md:mr-8 h-1 w-1 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
