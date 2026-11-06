import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "@/app/components/icons";
import { AppShell } from "../_components/app-shell";
import { MarkNewsSeen } from "../_components/mark-news-seen";
import { formatIssued, ukDay } from "../_lib/certificate-defs";
import { liveEntries, unseenIds } from "../_lib/changelog";
import { getWinsTotal } from "../_lib/wins";
import { getCurrentStudent } from "../_lib/get-student";
import { COOKIES } from "../_lib/welcome";

export const metadata: Metadata = {
  title: "What's new - EliteFBA",
  description: "New features and improvements in the Elite FBA members' area.",
};

export default async function WhatsNewPage() {
  const student = await getCurrentStudent();
  const seen = (await cookies()).get(COOKIES.newsSeen)?.value;
  const entries = liveEntries({ winsReady: (await getWinsTotal()) !== null });
  const unseen = unseenIds(seen, ukDay(new Date()), entries);

  // Group by month, newest first.
  const months = new Map<string, typeof entries>();
  for (const e of entries) {
    const key = new Date(`${e.date}T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
    months.set(key, [...(months.get(key) ?? []), e]);
  }

  return (
    <AppShell student={student}>
      <MarkNewsSeen ids={entries.map((e) => e.id)} />
      <div className="mx-auto max-w-[880px] px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <header className="dash-rise" style={{ ["--i" as string]: 0 }}>
          <p className="text-[0.9375rem] font-semibold text-orange-800">Updates</p>
          <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.5rem]">What&rsquo;s new</h1>
          <p className="mt-3 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-muted">
            Everything added to the members&rsquo; area, newest first. The course keeps growing, so check back.
          </p>
        </header>

        <div className="mt-10 space-y-12">
          {[...months].map(([month, entries], gi) => (
            <section key={month} aria-labelledby={`m-${gi}`} className="dash-rise" style={{ ["--i" as string]: gi + 1 }}>
              <h2 id={`m-${gi}`} className="font-display text-[1.25rem] font-semibold text-ink">
                {month}
              </h2>
              <ol className="relative mt-5 space-y-4 border-l-2 border-line pl-6 sm:pl-8">
                {entries.map((e) => (
                  <li key={e.id} className="relative">
                    <span
                      aria-hidden
                      className={`absolute -left-[2.15rem] top-5 inline-flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-bg sm:-left-[2.65rem] ${
                        unseen.has(e.id) ? "bg-[#c2410c]" : "bg-ink"
                      }`}
                    />
                    <article className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[0.875rem]">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-semibold ring-1 ${
                            e.tag === "New" ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-sky-50 text-sky-900 ring-sky-200"
                          }`}
                        >
                          {e.tag}
                        </span>
                        <time dateTime={e.date} className="text-ink-muted">
                          {formatIssued(e.date)}
                        </time>
                        {unseen.has(e.id) && <span className="font-semibold text-orange-800">· New to you</span>}
                      </div>
                      <h3 className="mt-3 flex items-start gap-3 font-display text-[1.25rem] font-semibold leading-snug text-ink">
                        <span aria-hidden>{e.emoji}</span>
                        {e.title}
                      </h3>
                      <p className="mt-2 max-w-[62ch] text-[1rem] leading-relaxed text-ink-muted">{e.body}</p>
                      <Link
                        href={e.href}
                        className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                      >
                        {e.cta} <ArrowRight size={15} className="nudge" />
                      </Link>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
