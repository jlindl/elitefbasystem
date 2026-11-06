import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Library, Lock, Package, Sparkles, Truck } from "@/app/components/icons";
import type { Course, ModuleInfo } from "../_lib/course";
import type { Student } from "../_lib/get-student";
import dictionary from "../_lib/dictionary.json";
import suppliers from "../_lib/suppliers.json";
import usefulLinks from "../_lib/useful-links.json";
import { SUPPLIES } from "../_lib/supplies";
import { MISSIONS, missionState, nextMission, type Progress } from "../_lib/missions";
import { MissionCard } from "./mission-map";
import { TermOfDay } from "./term-of-day";
import { ProgressBar } from "./ui/progress-bar";
import { ProgressRing } from "./ui/progress-ring";

type Game = {
  progress: Progress;
  xp: number;
  level: { index: number; name: string; emoji: string; next: { name: string; emoji: string } | null; pct: number; toNext: number };
  streak: { days: number; today: boolean };
};

const WHATSAPP = "https://wa.me/447765977085";
const QUICK = [
  { label: "I'm stuck on a lesson", text: "Hi Jakub, I'm stuck on a lesson: " },
  { label: "Check my product idea", text: "Hi Jakub, can you sanity-check this product idea? " },
  { label: "Review my listing", text: "Hi Jakub, could you look over my listing draft? " },
];

function londonNow() {
  const now = new Date();
  const hour = Number(now.toLocaleString("en-GB", { timeZone: "Europe/London", hour: "numeric", hour12: false }));
  const date = now.toLocaleDateString("en-GB", { timeZone: "Europe/London", weekday: "long", day: "numeric", month: "long" });
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return { greeting, date, dayIndex: Math.floor(now.getTime() / 86400000) };
}

const rise = (i: number) => ({ ["--i" as string]: i });

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

export function DashHero({ student, course, game }: { student: Student; course: Course; game: Game }) {
  const { greeting, date } = londonNow();
  const left = course.lessonsTotal - course.lessonsDone;
  const badges = MISSIONS.filter((m) => missionState(game.progress, m).complete).length;

  return (
    <section className="dash-rise relative overflow-hidden rounded-[2rem] border border-line bg-surface" style={rise(0)}>
      <div aria-hidden className="dash-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,107,26,0.16), transparent 65%)" }}
      />
      <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div className="min-w-0">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-subtle">{date}</p>
          <h1 className="mt-3 font-display text-[2.25rem] font-medium leading-[1.02] tracking-[-0.04em] text-ink sm:text-[3rem] md:text-[3.5rem]">
            {greeting}, <span className="font-serif text-accent">{student.firstName}.</span>
          </h1>
          <p className="mt-3 max-w-[520px] text-[1.05rem] leading-relaxed text-ink-muted">
            {course.lessonsDone === 0
              ? "Your first lesson takes about ten minutes. Let's get the foundations in."
              : left === 0
                ? "Every open lesson is done. Time to put it into action with your missions."
                : `You're ${course.lessonsDone} lessons in, with ${left} to go. Keep the streak alive today.`}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { k: "streak", label: `${game.streak.days} day streak`, emoji: game.streak.days > 0 ? "🔥" : "🪵" },
              { k: "xp", label: `${game.xp} XP · ${game.level.name}`, emoji: game.level.emoji },
              { k: "badges", label: `${badges}/${MISSIONS.length} badges`, emoji: "🏅" },
              { k: "exams", label: `${course.modulesPassed} exam${course.modulesPassed === 1 ? "" : "s"} passed`, emoji: "🎓" },
            ].map((c) => (
              <li
                key={c.k}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/80 px-3.5 py-2 text-[0.85rem] font-medium text-ink backdrop-blur"
              >
                <span aria-hidden>{c.emoji}</span>
                <span className="tabular-nums">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5 md:flex-col md:gap-3">
          <span className="md:hidden">
            <ProgressRing value={course.percent} size={96} stroke={9} label={`${course.percent}% of the course complete`}>
              <span className="font-display text-[1.5rem] font-semibold tracking-[-0.04em] text-ink tabular-nums">{course.percent}%</span>
            </ProgressRing>
          </span>
          <span className="hidden md:inline-flex">
            <ProgressRing value={course.percent} size={148} stroke={12} label={`${course.percent}% of the course complete`}>
              <span className="text-center">
                <span className="block font-display text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
                  {course.percent}%
                </span>
                <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-subtle">complete</span>
              </span>
            </ProgressRing>
          </span>
          <p className="text-[0.9rem] text-ink-muted md:text-center tabular-nums">
            <span className="block font-semibold text-ink md:inline">
              {course.lessonsDone}/{course.lessonsTotal} lessons
            </span>
            <span className="md:hidden"> of the open course complete</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Continue                                                           */
/* ------------------------------------------------------------------ */

export function ContinueCard({ course }: { course: Course }) {
  const queue = course.modules
    .filter((m) => !m.locked)
    .flatMap((m) => m.lessons.filter((l) => !l.done).map((l) => ({ m, l })))
    .slice(0, 3);
  const [first, ...rest] = queue;

  if (!first) {
    return (
      <div className="spot spot-dark flex h-full flex-col justify-between rounded-[1.75rem] bg-ink p-7 text-white">
        <p className="text-[2.5rem]" aria-hidden>
          🏆
        </p>
        <div>
          <h2 className="font-display text-[1.75rem] font-semibold tracking-[-0.03em]">Every open lesson done.</h2>
          <p className="mt-2 text-white/65">Head to your missions and put it into practice.</p>
          <Link href="/dashboard/missions" className="btn btn-primary mt-5">
            Go to missions <ArrowRight size={16} className="btn-arrow" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="spot spot-dark relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink text-white">
      <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.35), transparent 65%)" }} />
      <Link href={first.l.href} className="group relative flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent">▶ Continue learning</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[0.75rem] text-white/75">
            <Clock size={13} /> {first.l.minutes} min
          </span>
        </div>
        <div className="mt-6 flex items-start gap-4">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[1.75rem] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            {first.l.icon}
          </span>
          <div className="min-w-0">
            <p className="text-[0.85rem] text-white/55">
              Module {first.m.number} · Lesson {first.l.number} of {first.m.total}
            </p>
            <h2 className="mt-1 font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[1.9rem]">
              {first.l.label}
            </h2>
          </div>
        </div>
        {first.l.description && <p className="mt-4 max-w-[520px] text-[0.95rem] leading-relaxed text-white/65 line-clamp-2">{first.l.description}</p>}

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-[0.75rem] text-white/55 tabular-nums">
            <span>{first.m.title}</span>
            <span>
              {first.m.done}/{first.m.total}
            </span>
          </div>
          <ProgressBar percent={(first.m.done / first.m.total) * 100} tone="light" ariaLabel={`Module ${first.m.number} progress`} />
        </div>

        <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-[#c2410c] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,107,26,0.8)] transition-transform duration-300 group-hover:-translate-y-0.5">
          {first.l.number === 1 && first.m.done === 0 ? "Start lesson" : "Resume"} <ArrowRight size={16} className="nudge" />
        </span>
      </Link>

      {rest.length > 0 && (
        <ul className="relative border-t border-white/10">
          {rest.map(({ m, l }) => (
            <li key={l.href} className="border-b border-white/10 last:border-b-0">
              <Link href={l.href} className="group flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-white/5 sm:px-8">
                <span aria-hidden className="text-[1.1rem]">
                  {l.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9rem] font-medium">{l.label}</span>
                  <span className="block text-[0.72rem] text-white/45">
                    Module {m.number} · Lesson {l.number} · {l.minutes} min
                  </span>
                </span>
                <ArrowRight size={15} className="nudge shrink-0 text-white/40" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                            */
/* ------------------------------------------------------------------ */

export function ContactCard() {
  return (
    <div className="spot lift group/card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-ink to-ink-dark font-display text-[0.95rem] font-semibold text-white">
          J
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-[#25D366]" />
        </span>
        <div>
          <p className="font-display text-[1.05rem] font-semibold text-ink">Jakub</p>
          <p className="text-[0.78rem] text-ink-subtle">Your mentor · Usually replies the same day</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl rounded-tl-md bg-surface-alt p-4 text-[0.95rem] leading-relaxed text-ink">
        Stuck on a product, a listing or your next step? Message me - send the lesson you&rsquo;re on and I&rsquo;ll point
        you straight to it.
      </div>
      <p className="mt-5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-subtle">One-tap questions</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <a
            key={q.label}
            href={`${WHATSAPP}?text=${encodeURIComponent(q.text)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line bg-bg px-3 py-1.5 text-[0.8rem] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-[#25D366] hover:text-[#128c4a]"
          >
            {q.label}
          </a>
        ))}
      </div>
      <div className="mt-auto pt-5">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(37,211,102,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1da851]"
        >
          <WhatsAppIcon /> Message on WhatsApp
        </a>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.768-.978zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Journey strip                                                      */
/* ------------------------------------------------------------------ */

function moduleStatus(m: ModuleInfo) {
  if (m.locked) return { label: "Locked", tone: "text-ink-subtle" };
  if (m.passed) return { label: "Exam passed", tone: "text-emerald-700" };
  if (m.done === m.total && m.total > 0) return { label: m.hasExam ? "Exam ready" : "Complete", tone: "text-orange-800" };
  if (m.done > 0) return { label: "In progress", tone: "text-orange-800" };
  return { label: "Not started", tone: "text-ink-subtle" };
}

export function JourneyStrip({ course }: { course: Course }) {
  const current = course.next?.module.id;
  const open = course.modules.filter((m) => !m.locked);
  const locked = course.modules.filter((m) => m.locked);
  return (
    <section className="dash-rise" style={rise(3)} aria-labelledby="journey">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-subtle">The course</p>
          <h2 id="journey" className="mt-1 font-display text-[1.5rem] font-medium tracking-[-0.025em] text-ink">
            Your journey
          </h2>
        </div>
        <Link href="/dashboard/modules" className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-muted hover:text-ink">
          All modules <span aria-hidden className="nudge">→</span>
        </Link>
      </div>

      <ol className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 xl:grid-cols-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {open.map((m) => {
          const s = moduleStatus(m);
          const pct = m.total ? (m.done / m.total) * 100 : 0;
          const isCurrent = m.id === current;
          return (
            <li key={m.id} className="w-[68%] shrink-0 snap-start sm:w-[44%] md:w-auto">
              <Link
                href={`/dashboard/modules/${m.id}`}
                className={`spot lift group flex h-full flex-col rounded-2xl border p-4 ${
                  m.locked
                    ? "border-dashed border-line bg-surface-alt/50"
                    : isCurrent
                      ? "border-accent/50 bg-surface ring-4 ring-accent/10"
                      : m.passed
                        ? "border-emerald-200 bg-emerald-50/40"
                        : "border-line bg-surface"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl font-display text-[0.95rem] font-semibold tabular-nums ${
                      m.passed ? "bg-emerald-500 text-white" : isCurrent ? "bg-[#c2410c] text-white" : m.locked ? "bg-surface text-ink-subtle" : "bg-surface-alt text-ink"
                    }`}
                  >
                    {m.passed ? "✓" : m.locked ? <Lock size={15} /> : m.number}
                  </span>
                  {isCurrent && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.1em] text-orange-800">
                      You&rsquo;re here
                    </span>
                  )}
                </div>
                <p className={`mt-3 line-clamp-2 font-display text-[0.98rem] font-semibold leading-snug ${m.locked ? "text-ink-subtle" : "text-ink"}`}>
                  {m.title}
                </p>
                <div className="mt-auto pt-4">
                  {!m.locked && (
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-deep">
                      <div className={`bar-grow h-full rounded-full ${m.passed ? "bg-emerald-500" : "bg-accent"}`} style={{ width: `${pct}%` }} />
                    </div>
                  )}
                  <p className={`mt-2 text-[0.75rem] font-medium ${s.tone}`}>
                    {s.label}
                    {!m.locked && m.total > 0 && <span className="text-ink-subtle"> · {m.done}/{m.total}</span>}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
        {locked.length > 0 && (
          <li className="w-[68%] shrink-0 snap-start sm:w-[44%] md:w-auto">
            <Link
              href="/dashboard/modules#advanced"
              className="spot lift group flex h-full flex-col rounded-2xl border border-dashed border-line bg-surface-alt/50 p-4"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-ink-subtle">
                <Lock size={15} />
              </span>
              <p className="mt-3 font-display text-[0.98rem] font-semibold leading-snug text-ink">
                Modules {locked[0].number}-{locked[locked.length - 1].number}
              </p>
              <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-ink-subtle">
                {locked.map((m) => m.title).join(", ")}
              </p>
              <p className="mt-auto pt-4 text-[0.75rem] font-medium text-ink-subtle">Unlocks with a password from Jakub</p>
            </Link>
          </li>
        )}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Missions panel                                                     */
/* ------------------------------------------------------------------ */

export function MissionsPanel({ game }: { game: Game }) {
  const next = nextMission(game.progress);
  const lvl = game.level;
  return (
    <div className="spot lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-subtle">🎯 Missions</p>
        <Link href="/dashboard/missions" className="group inline-flex items-center gap-1 text-[0.8rem] font-medium text-ink-muted hover:text-ink">
          Map <span aria-hidden className="nudge">→</span>
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-[1.75rem]" aria-hidden>
          {lvl.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[1.3rem] font-semibold leading-tight text-ink">
            Level {lvl.index + 1} · {lvl.name}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-deep">
            <div className="bar-grow h-full rounded-full bg-gradient-to-r from-accent to-[#ffb347]" style={{ width: `${Math.max(4, lvl.pct * 100)}%` }} />
          </div>
          <p className="mt-1.5 text-[0.75rem] text-ink-subtle tabular-nums">
            ⚡ {game.xp} XP{lvl.next ? ` · ${lvl.toNext} to ${lvl.next.emoji} ${lvl.next.name}` : " · top level"}
          </p>
        </div>
      </div>
      <div className="mt-5">
        {next ? (
          <MissionCard mission={next} progress={game.progress} label={missionState(game.progress, next).started ? "Continue" : "Up next"} />
        ) : (
          <p className="rounded-2xl bg-surface-alt p-4 text-[0.95rem] text-ink-muted">Every mission complete. 🏆</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Term of the day + tools                                            */
/* ------------------------------------------------------------------ */

export function DailyTerm() {
  const { dayIndex } = londonNow();
  const entries = dictionary as { term: string; acronymFor: string; definition: string; category: string }[];
  const e = entries[dayIndex % entries.length];
  return <TermOfDay {...e} />;
}

const TOOLS = [
  {
    href: "/dashboard/tools/dictionary",
    title: "Jargon Dictionary",
    body: "Every term and acronym from the course, in plain English.",
    stat: `${dictionary.length} terms`,
    Icon: Library,
    tint: "from-sky-100 to-sky-50 text-sky-700",
  },
  {
    href: "/dashboard/tools/suppliers",
    title: "Wholesale Suppliers",
    body: "UK wholesalers, B2B marketplaces, liquidation and overseas.",
    stat: `${suppliers.length} suppliers`,
    Icon: Package,
    tint: "from-amber-100 to-amber-50 text-amber-700",
  },
  {
    href: "/dashboard/tools/supplies",
    title: "Supplies Checklist",
    body: "Every label, bag and box for your first shipment, with Amazon's rules.",
    stat: `${SUPPLIES.length} items`,
    Icon: Truck,
    tint: "from-orange-100 to-orange-50 text-orange-800",
  },
  {
    href: "/dashboard/tools/links",
    title: "Useful Links",
    body: "Every tool and resource referenced across the course.",
    stat: `${usefulLinks.length} resources`,
    Icon: BookOpen,
    tint: "from-emerald-100 to-emerald-50 text-emerald-700",
  },
];

export function ToolsGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section aria-labelledby={heading ? "tools" : undefined}>
      {heading && (
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-subtle">Use while you learn</p>
            <h2 id="tools" className="mt-1 font-display text-[1.5rem] font-medium tracking-[-0.025em] text-ink">
              Your toolkit
            </h2>
          </div>
          <Link href="/dashboard/tools" className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-muted hover:text-ink">
            All tools <span aria-hidden className="nudge">→</span>
          </Link>
        </div>
      )}
      <div className={`grid gap-3 sm:grid-cols-2 xl:grid-cols-4 ${heading ? "mt-4" : ""}`}>
        {TOOLS.map(({ href, title, body, stat, Icon, tint }) => (
          <Link key={href} href={href} className="spot lift group flex flex-col rounded-3xl border border-line bg-surface p-5">
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tint} transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}>
              <Icon size={22} />
            </span>
            <h3 className="mt-4 font-display text-[1.1rem] font-semibold text-ink">{title}</h3>
            <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-muted">{body}</p>
            <div className="mt-auto flex items-center justify-between pt-5">
              <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-subtle">{stat}</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-alt text-ink transition-colors group-hover:bg-ink group-hover:text-white">
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Coming soon                                                        */
/* ------------------------------------------------------------------ */

export function ComingSoon({ winsReady = true }: { winsReady?: boolean }) {
  return (
    <section id="ai-partner" className="grid gap-3 sm:grid-cols-2" aria-label="Community">
      <Link href="/dashboard/wins" className="spot lift group relative overflow-hidden rounded-3xl border border-line bg-surface p-5">
        <div className="flex items-start gap-4">
          <span aria-hidden className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#ffb347] text-[1.25rem] shadow-sm">
            🏆
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[1.05rem] font-semibold text-ink">The wins wall</h3>
              {winsReady ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.75rem] font-semibold text-emerald-800 ring-1 ring-emerald-200">New</span>
              ) : (
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.75rem] font-semibold text-orange-800">Coming soon</span>
              )}
            </div>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
              {winsReady
                ? "Wins and milestones from other members, so you're never building alone. Post yours and cheer theirs."
                : "Wins and milestones from other members, so you're never building alone. Opening very soon."}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink">
              Visit the wall <ArrowRight size={15} className="nudge" />
            </span>
          </div>
        </div>
      </Link>
      <div className="spot relative overflow-hidden rounded-3xl border border-dashed border-line bg-surface-alt/40 p-5">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface text-ink-muted shadow-sm">
            <Sparkles size={20} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[1.05rem] font-semibold text-ink">Elite FBA AI Partner</h3>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.75rem] font-semibold text-orange-800">Coming soon</span>
            </div>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
              An assistant trained on the course, the SOPs and Jakub&rsquo;s playbook. Ask it anything, any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
