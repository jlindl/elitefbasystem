import type { Metadata } from "next";
import Link from "next/link";
import { LogOut } from "@/app/components/icons";
import { AppShell } from "../_components/app-shell";
import { MemberCard } from "../_components/member-card";
import { NameForm } from "../_components/name-form";
import { PageHeader } from "../_components/ui/page-header";
import { ProgressRing } from "../_components/ui/progress-ring";
import { signOut } from "../_lib/auth-actions";
import { isNameLocked } from "../_lib/certificates";
import { getCourse, getGameStats } from "../_lib/course";
import { getCurrentStudent } from "../_lib/get-student";
import { memberNumber, memberSinceLabel } from "../_lib/member";
import { CERTIFICATE_DEFS, MODULE_CERTIFICATES } from "../_lib/certificate-defs";
import { MISSIONS, missionState } from "../_lib/missions";

export const metadata: Metadata = {
  title: "Account - EliteFBA",
  description: "Manage your EliteFBA account.",
};

export default async function AccountPage() {
  const student = await getCurrentStudent();
  const [course, game, locked] = await Promise.all([getCourse(), getGameStats(), isNameLocked()]);
  const earned = MISSIONS.filter((m) => missionState(game.progress, m).complete);
  const certificates = course.modulesPassed + (course.modulesPassed >= MODULE_CERTIFICATES.length ? 1 : 0);

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[920px] space-y-6 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader eyebrow="Account" title="Your membership" description="Your details, your progress and the badges you've earned so far." />

        <section className="dash-rise relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8" style={{ ["--i" as string]: 1 }}>
          <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-70" />
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.35), transparent 65%)" }} />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-accent to-[#ffb347] font-display text-[1.75rem] font-semibold shadow-lg">
              {student.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">{student.fullName}</p>
              <p className="mt-1 truncate text-white/60">{student.email}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[0.8rem]">
                <span className="rounded-full bg-white/10 px-3 py-1">{student.plan}</span>
                <span className={`rounded-full px-3 py-1 ${student.hasAccess ? "bg-emerald-500/20 text-emerald-200" : "bg-white/10"}`}>
                  {student.hasAccess ? "● Access active" : "Full plan"}
                </span>
              </div>
            </div>
            <ProgressRing value={course.percent} size={88} stroke={8} track="rgba(255,255,255,0.12)" label={`${course.percent}% of the course complete`}>
              <span className="font-display text-[1.25rem] font-semibold tabular-nums">{course.percent}%</span>
            </ProgressRing>
          </div>
        </section>

        <section aria-labelledby="card-heading" className="dash-rise grid items-center gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" style={{ ["--i" as string]: 2 }}>
          <div>
            <h2 id="card-heading" className="font-display text-[1.25rem] font-semibold text-ink">
              Your member card
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
              Your member number is unique to your account, and so is your card. It updates if you change the name on your account.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-[0.9375rem]">
              <div>
                <dt className="text-ink-muted">Member number</dt>
                <dd className="mt-0.5 font-mono font-semibold text-ink">{memberNumber(student.id)}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Member since</dt>
                <dd className="mt-0.5 font-semibold text-ink">{memberSinceLabel(student.memberSince)}</dd>
              </div>
            </dl>
          </div>
          <div className="mx-auto w-full max-w-[420px]">
            <MemberCard name={student.fullName} number={memberNumber(student.id)} since={memberSinceLabel(student.memberSince)} tier={student.hasAccess ? "Mentorship" : "Member"} />
          </div>
        </section>

        <section className="dash-rise grid gap-3 sm:grid-cols-4" style={{ ["--i" as string]: 3 }} aria-label="Your stats">
          {[
            { emoji: "📘", value: `${course.lessonsDone}/${course.lessonsTotal}`, label: "Lessons done" },
            { emoji: "🎓", value: String(course.modulesPassed), label: "Exams passed" },
            { emoji: game.level.emoji, value: game.level.name, label: `⚡ ${game.xp} XP` },
            { emoji: game.streak.days ? "🔥" : "🪵", value: `${game.streak.days} days`, label: "Current streak" },
          ].map((s) => (
            <div key={s.label} className="spot rounded-3xl border border-line bg-surface p-5">
              <p className="text-[1.35rem]" aria-hidden>
                {s.emoji}
              </p>
              <p className="mt-2 font-display text-[1.35rem] font-semibold leading-none tracking-[-0.02em] text-ink tabular-nums">{s.value}</p>
              <p className="mt-1.5 text-[0.8rem] text-ink-subtle">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="dash-rise rounded-3xl border border-line bg-surface p-6" style={{ ["--i" as string]: 3 }} aria-labelledby="badges">
          <div className="flex items-center justify-between">
            <h2 id="badges" className="font-display text-[1.2rem] font-semibold text-ink">
              Badges
            </h2>
            <Link href="/dashboard/missions" className="group inline-flex items-center gap-1 text-[0.85rem] font-medium text-ink-muted hover:text-ink">
              Missions <span aria-hidden className="nudge">→</span>
            </Link>
          </div>
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {MISSIONS.map((m) => {
              const has = earned.includes(m);
              return (
                <li key={m.id} className={`flex flex-col items-center rounded-2xl border p-3 text-center ${has ? "border-accent/30 bg-accent-soft" : "border-line bg-surface-alt/40"}`}>
                  <span className={`text-[1.9rem] leading-none ${has ? "" : "opacity-30 grayscale"}`} aria-hidden>
                    {m.badge.emoji}
                  </span>
                  <span className={`mt-2 text-[0.72rem] font-medium leading-tight ${has ? "text-ink" : "text-ink-subtle"}`}>{m.badge.name}</span>
                  <span className="sr-only">{has ? "Earned" : "Not earned yet"}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="dash-rise rounded-3xl border border-line bg-surface p-6" style={{ ["--i" as string]: 4 }} aria-labelledby="certificates">
          <div className="flex items-center justify-between gap-3">
            <h2 id="certificates" className="font-display text-[1.2rem] font-semibold text-ink">
              Certificates
            </h2>
            <Link href="/dashboard/certificates" className="group inline-flex items-center gap-1 text-[0.9375rem] font-medium text-ink-muted hover:text-ink">
              View all <span aria-hidden className="nudge">→</span>
            </Link>
          </div>
          <p className="mt-1 text-[0.9375rem] text-ink-muted">
            {certificates} of {CERTIFICATE_DEFS.length} earned. Pass a module exam to earn its certificate.
          </p>
          <div className="mt-5 border-t border-line pt-5">
            <NameForm name={student.fullName} nameIsSet={student.nameIsSet} locked={locked} />
          </div>
        </section>

        <section className="dash-rise grid gap-3 sm:grid-cols-2" style={{ ["--i" as string]: 5 }}>
          <div className="rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-[1.1rem] font-semibold text-ink">Need to change something?</h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">
              Details, billing or membership - message Jakub directly and he&rsquo;ll sort it for you.
            </p>
            <Link href="/dashboard/help" className="btn btn-secondary mt-4">
              Get help
            </Link>
          </div>
          <form action={signOut} className="flex flex-col rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-[1.1rem] font-semibold text-ink">Sign out</h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">Your progress is saved to your account - pick up on any device.</p>
            <button type="submit" className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-[0.9rem] font-medium text-rose-700 transition-colors hover:bg-rose-100">
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
