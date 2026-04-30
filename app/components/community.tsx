import { Check } from "./icons";
import { Reveal } from "./reveal";

const items = [
  "Curated, small group",
  "Real friendships, not networking",
  "Suppliers, wins, and losses shared openly",
  "In-person meetups (not just Discord)",
];

export function Community() {
  return (
    <section
      id="community"
      className="bg-surface-alt py-24 md:py-32 border-y border-line"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="label-mono">06 / The team</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              Business is lonely. Doing it together isn&rsquo;t.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              The hardest part of building an Amazon business isn&rsquo;t the
              work. It&rsquo;s doing it alone &mdash; at your laptop, at
              midnight, wondering if anyone else is figuring this out too. So
              we built a team.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-4">
            <Reveal>
              <MessageCard
                avatar="MK"
                name="Maya K."
                time="Mon · 3:42 PM"
                body="Just hit my first $5K month 🎉 honestly couldn't have done it without this group. Special thanks to whoever recommended that Yiwu rep three weeks ago."
              />
            </Reveal>
            <Reveal delay={120}>
              <PhotoCard label="[IMAGE: Community meetup, London 2026]" />
            </Reveal>
            <Reveal delay={240}>
              <MessageCard
                avatar="JR"
                name="Jordan R."
                time="Tue · 11:08 AM"
                body="Anyone got experience with this supplier in Yiwu? Got a quote that feels off and I'd rather not eat the MOQ if it's a red flag."
                replies={4}
              />
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="space-y-5 text-[1rem] md:text-[1.05rem] leading-[1.7] text-ink-muted">
                <p>
                  Every member is hand-picked. We keep the group small on
                  purpose &mdash; small enough that I know everyone&rsquo;s
                  name, what they&rsquo;re selling, and where they&rsquo;re
                  stuck. There&rsquo;s no pyramid, no upsells, no
                  &ldquo;tiers.&rdquo;
                </p>
                <p>
                  What you actually get: people who&rsquo;ll text you when your
                  launch goes live, share suppliers without gatekeeping, and
                  pick you up when a product flops. We meet up in person too
                  &mdash; because the best stuff happens off Discord.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-8 space-y-3">
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

        <Reveal delay={200}>
          <figure className="mt-20 md:mt-24 max-w-[820px]">
            <blockquote className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.015em] leading-[1.3] text-ink">
              &ldquo;I joined for the system. I stayed for the team.&rdquo;
            </blockquote>
            <figcaption className="mt-4 label-mono">
              &mdash; Placeholder testimonial, to be replaced with a real one
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function MessageCard({
  avatar,
  name,
  time,
  body,
  replies,
}: {
  avatar: string;
  name: string;
  time: string;
  body: string;
  replies?: number;
}) {
  return (
    <article className="rounded-2xl bg-surface hairline p-5 md:p-6 shadow-[var(--shadow-soft)]">
      <header className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white text-[0.7rem] font-medium">
          {avatar}
        </span>
        <div className="flex flex-col">
          <span className="text-[0.875rem] font-medium text-ink">{name}</span>
          <span className="font-mono text-[0.7rem] tracking-wide text-ink-subtle">
            {time}
          </span>
        </div>
      </header>
      <p className="mt-4 text-[0.975rem] leading-[1.6] text-ink">{body}</p>
      {typeof replies === "number" && (
        <p className="mt-4 text-[0.8rem] text-ink-muted">
          <span className="font-medium text-accent">↳ {replies} replies</span>
          <span className="mx-2 text-line">·</span>
          <span>Last reply 18m ago</span>
        </p>
      )}
    </article>
  );
}

function PhotoCard({ label }: { label: string }) {
  return (
    <article className="rounded-2xl overflow-hidden hairline">
      <div
        className="relative aspect-[16/9]"
        style={{
          background:
            "linear-gradient(135deg, #efe7d7 0%, #d8cdb6 50%, #b8ad95 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 60% 30%, rgba(0,0,0,0.25), transparent 60%)",
          }}
        />
        <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-white">
          {label}
        </span>
      </div>
    </article>
  );
}
