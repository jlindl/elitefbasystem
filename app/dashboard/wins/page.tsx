import type { Metadata } from "next";
import { AppShell } from "../_components/app-shell";
import type { WinCardData } from "../_components/win-card";
import { ComposerFold, WinsFeed } from "../_components/wins-feed";
import { WinsComposer, type WinSuggestion } from "../_components/wins-composer";
import { getMyCertificates } from "../_lib/certificates";
import { getGameStats } from "../_lib/course";
import { getCurrentStudent } from "../_lib/get-student";
import { MISSIONS_BY_ID, missionState } from "../_lib/missions";
import { getWinsFeed, getWinsTotal } from "../_lib/wins";

export const metadata: Metadata = {
  title: "Wins wall - EliteFBA",
  description: "Wins shared by Elite FBA members.",
};

export default async function WinsPage() {
  const student = await getCurrentStudent();
  const [feed, certs, game, total] = await Promise.all([getWinsFeed(), getMyCertificates(), getGameStats(), getWinsTotal()]);
  const wins = feed.status === "ready" ? feed.wins : [];
  const cards: WinCardData[] = wins;
  const myHeadlines = new Set(wins.filter((w) => w.mine).map((w) => w.headline.toLowerCase()));

  // One-tap ideas from the member's real progress (never invented).
  const ideas: WinSuggestion[] = [];
  const done = (id: string) => {
    const m = MISSIONS_BY_ID.get(id);
    return !!m && missionState(game.progress, m).complete;
  };
  if (done("first-sale")) ideas.push({ key: "first-sale", kind: "first_sale", headline: "I made my first sale on Amazon!", label: "You completed the First Sale mission" });
  if (done("first-box")) ideas.push({ key: "first-box", kind: "shipment", headline: "My first box of stock is on its way to Amazon", label: "You completed First Box Shipped" });
  const programme = certs.find((c) => c.kind === "programme");
  if (programme?.earned) ideas.push({ key: "programme", kind: "milestone", headline: "Completed the Elite FBA Core Programme!", label: "You finished the whole Core Programme" });
  for (const c of [...certs].reverse()) {
    if (c.kind === "module" && c.earned) ideas.push({ key: c.slug, kind: "exam", headline: `Passed the Module ${c.number} exam: ${c.title}`, label: `You passed the Module ${c.number} exam` });
  }
  const suggestions = ideas.filter((s) => !myHeadlines.has(s.headline.toLowerCase())).slice(0, 3);

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <header className="dash-rise relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8 lg:p-10" style={{ ["--i" as string]: 0 }}>
          <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-60" />
          <div aria-hidden className="absolute -right-20 -top-28 h-[380px] w-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.35), transparent 65%)" }} />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.9375rem] font-semibold text-[#ffb27a]">Community</p>
              <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">Wins wall</h1>
              <p className="mt-3 max-w-[56ch] text-[1.0625rem] leading-relaxed text-white/80">
                First sales, first shipments, exams passed. Post your wins and cheer on other members. Every post here comes from a member.
              </p>
            </div>
            {feed.status === "ready" && wins.length > 0 && (
              <dl className="flex gap-3">
                {[["Wins shared", total ?? wins.length]].map(([k, v]) => (
                  <div key={k} className="min-w-[88px] rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                    <dt className="text-[0.8125rem] font-medium text-white/75">{k}</dt>
                    <dd className="mt-0.5 font-display text-[1.5rem] font-semibold tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="dash-rise lg:col-start-2 lg:row-start-1" style={{ ["--i" as string]: 1 }}>
            <ComposerFold startOpen={feed.status === "ready" && wins.length === 0}>
              <WinsComposer fullName={student.fullName} nameIsSet={student.nameIsSet} suggestions={suggestions} disabled={feed.status !== "ready"} />
            </ComposerFold>
          </div>

          <div className="dash-rise lg:col-start-1 lg:row-start-1" style={{ ["--i" as string]: 2 }}>
            <h2 className="sr-only">Latest wins</h2>
            {feed.status === "setup" ? (
              <div className="rounded-3xl border border-dashed border-line bg-surface p-8 text-center">
                <p className="text-[2rem]" aria-hidden>
                  🏗️
                </p>
                <p className="mt-2 font-display text-[1.25rem] font-semibold text-ink">The wins wall is nearly ready</p>
                <p className="mx-auto mt-1 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-muted">
                  It&rsquo;s being switched on. Check back soon to post your first win.
                </p>
              </div>
            ) : feed.status === "error" ? (
              <div role="alert" className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-[0.9375rem] font-medium text-rose-800">
                The wins wall couldn&rsquo;t load right now. Refresh the page to try again.
              </div>
            ) : (
              // The feed shows its own empty state, so it stays mounted (with focus) when the last post goes.
              <WinsFeed
                wins={cards}
                empty={
                  <div className="rounded-3xl border border-dashed border-line bg-surface p-8 text-center">
                    <p className="text-[2rem]" aria-hidden>
                      🏆
                    </p>
                    <p className="mt-2 font-display text-[1.25rem] font-semibold text-ink">No wins yet. Yours could be the first.</p>
                    <p className="mx-auto mt-1 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-muted">
                      Passed an exam? Found your first product? Share it and start the wall.
                    </p>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
