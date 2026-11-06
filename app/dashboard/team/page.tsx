import type { Metadata } from "next";
import { AppShell } from "../_components/app-shell";
import { PageHeader } from "../_components/ui/page-header";
import { getCurrentStudent } from "../_lib/get-student";

export const metadata: Metadata = {
  title: "The Team - EliteFBA",
  description: "The EliteFBA community space.",
};

const COMING = [
  { emoji: "🏆", title: "Wins wall", body: "First sales, first £1k weeks, new listings live - shared by members as they happen." },
  { emoji: "🙋", title: "Ask the team", body: "Post a question about a supplier, a listing or a fee, and get answers from people a step ahead." },
  { emoji: "📅", title: "Meetups & calls", body: "Dates for group calls and in-person meetups, all in one place." },
];

export default async function TeamPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1040px] space-y-8 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader
          eyebrow="Community · Coming soon"
          title="The team"
          description="A space to see what other EliteFBA members are building - and to build alongside them. It's on the way."
        />

        <section className="dash-rise relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10" style={{ ["--i" as string]: 1 }}>
          <div aria-hidden className="dash-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          {/* Skeleton preview of the feed */}
          <div aria-hidden className="relative mx-auto max-w-[520px] space-y-3 opacity-70 blur-[1.5px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-4">
                <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-surface-deep to-line" />
                <div className="flex-1 space-y-2 pt-1">
                  <span className="block h-3 w-1/3 rounded-full bg-surface-deep" />
                  <span className="block h-3 w-5/6 rounded-full bg-surface-alt" />
                  <span className="block h-3 w-2/3 rounded-full bg-surface-alt" />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="rounded-3xl border border-line bg-surface/95 px-6 py-5 text-center shadow-[var(--shadow-lift)] backdrop-blur">
              <p className="text-[2rem]" aria-hidden>
                🚧
              </p>
              <p className="mt-1 font-display text-[1.25rem] font-semibold text-ink">The team feed is being built</p>
              <p className="mt-1 text-[0.9rem] text-ink-muted">Check back soon.</p>
            </div>
          </div>
        </section>

        <section className="dash-rise grid gap-3 sm:grid-cols-3" style={{ ["--i" as string]: 2 }} aria-label="What's coming">
          {COMING.map((c) => (
            <div key={c.title} className="spot rounded-3xl border border-line bg-surface p-5">
              <p className="text-[1.6rem]" aria-hidden>
                {c.emoji}
              </p>
              <h2 className="mt-3 font-display text-[1.05rem] font-semibold text-ink">{c.title}</h2>
              <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-muted">{c.body}</p>
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
