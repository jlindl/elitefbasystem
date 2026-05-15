import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

const stats = [
  {
    value: 10,
    prefix: "£",
    suffix: "k+",
    label: "Monthly revenue",
    delay: 0,
  },
  {
    value: 100,
    prefix: "£",
    suffix: "k+",
    label: "Annual sales",
    delay: 100,
  },
  {
    value: 10000,
    prefix: "",
    suffix: "+",
    label: "Products sold",
    delay: 200,
  },
];

export function SocialProof() {
  return (
    <section className="border-y border-line bg-surface/50">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-12 md:py-16">
        <Reveal>
          <p className="label-mono text-center mb-10 text-ink-subtle">
            The proof in numbers
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 items-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center px-4 ${
                i !== stats.length - 1 ? "md:border-r border-line/60" : ""
              }`}
            >
              <Reveal delay={stat.delay}>
                <div className="flex flex-col items-center">
                  <span className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium tracking-tight text-ink leading-none">
                    <CountUp
                      to={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2500}
                    />
                  </span>
                  <span className="mt-4 label-mono text-ink-muted uppercase tracking-[0.1em] text-[0.7rem] md:text-[0.75rem]">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
