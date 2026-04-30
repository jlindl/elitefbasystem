import { Check } from "./icons";
import { Reveal } from "./reveal";

const items = [
  "Weekly 1-to-1 calls",
  "Direct messaging access",
  "Full-time support — fast responses",
];

export function Mentorship() {
  return (
    <section id="mentorship" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal as="div" className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden hairline shadow-[var(--shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://placehold.co/800x1000/F4F2EC/0A0A0A/png?text=Jakub+portrait"
                alt="[IMAGE: Jakub portrait]"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <p className="label-mono">05 / Mentorship</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.2vw,3.5rem)]">
                You&rsquo;re not buying a course. You&rsquo;re hiring a partner.
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-[1rem] md:text-[1.05rem] leading-[1.7] text-ink-muted max-w-[640px]">
              <Reveal delay={140}>
                <p>
                  When I say &ldquo;1-to-1,&rdquo; I mean it literally. We jump
                  on a call every week to look at your business &mdash; your
                  products, your numbers, your blockers. Between calls, you can
                  message me directly, and you&rsquo;ll get a real reply from
                  the person who built the system.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  &ldquo;Full-time support&rdquo; isn&rsquo;t a tagline. It
                  means I work on this every weekday. Most messages get a
                  response in under a few hours. Supplier negotiations, listing
                  reviews, PPC reports, customs panic &mdash; that&rsquo;s
                  what I&rsquo;m here for.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p>
                  This is also exactly why I keep the program small. I will
                  not take more students than I can give real attention to. If
                  spots are full, you&rsquo;ll go on a waiting list &mdash;
                  not be talked into joining anyway.
                </p>
              </Reveal>
            </div>

            <Reveal delay={320}>
              <ul className="mt-9 space-y-3">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check size={14} />
                    </span>
                    <span className="text-[0.975rem] text-ink">{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
