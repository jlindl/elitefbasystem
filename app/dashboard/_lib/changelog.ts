/**
 * What's new in the members' area, newest first. Add an entry whenever something
 * ships; the dashboard shows the last few weeks and flags anything a member hasn't seen.
 */
export type ChangelogEntry = {
  /** Stable id - used to remember which entries a member has seen. Letters, digits and "-" only. */
  id: string;
  /** "YYYY-MM-DD" */
  date: string;
  tag: "New" | "Improved";
  emoji: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  /** Only show once this part of the site is live. */
  requires?: "wins";
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    id: "2026-11-05-certificates",
    date: "2026-11-05",
    tag: "New",
    emoji: "🏅",
    title: "A certificate for every module exam",
    body: "Pass a module exam and get a certificate with your name on it. Download it as a PDF, add it to LinkedIn, and share a link anyone can check.",
    href: "/dashboard/certificates",
    cta: "See your certificates",
  },
  {
    id: "2026-11-05-ask-jakub",
    date: "2026-11-05",
    tag: "New",
    emoji: "💬",
    title: "Ask Jakub from any lesson",
    body: "Highlight a sentence or tap “Ask Jakub” in a lesson. Your question opens in WhatsApp with the lesson already mentioned.",
    href: "/dashboard/modules",
    cta: "Open a lesson",
  },
  {
    id: "2026-11-05-jargon",
    date: "2026-11-05",
    tag: "New",
    emoji: "📖",
    title: "Tap any jargon for a definition",
    body: "Terms like Buy Box, FNSKU and Cubiscan are underlined in lessons. Tap one for a plain-English definition from the dictionary.",
    href: "/dashboard/tools/dictionary",
    cta: "Browse the dictionary",
  },
  {
    id: "2026-11-05-supplies",
    date: "2026-11-05",
    tag: "New",
    emoji: "📦",
    title: "Supplies checklist",
    body: "Every label, bag and box you need for your first shipment, with the rules Amazon checks. Tick items off as you buy them.",
    href: "/dashboard/tools/supplies",
    cta: "Open the checklist",
  },
  {
    id: "2026-11-05-wins",
    date: "2026-11-05",
    tag: "New",
    emoji: "🏆",
    title: "The wins wall",
    body: "Share your wins, from first product found to first sale, and cheer on other members.",
    href: "/dashboard/wins",
    cta: "Visit the wall",
    // Hidden until the wall's tables exist. When it goes live, set the date to launch day
    // and move it to the top, so it shows as new for the next few months.
    requires: "wins",
  },
  {
    id: "2026-11-04-modules",
    date: "2026-11-04",
    tag: "Improved",
    emoji: "📘",
    title: "Clearer modules",
    body: "Each module now has its own page with its lessons, exam and missions, and everything is easier to read.",
    href: "/dashboard/modules",
    cta: "Go to modules",
  },
];

/** Entries that are live (e.g. hide the wins wall until its tables exist). */
export function liveEntries(opts: { winsReady: boolean }) {
  return CHANGELOG.filter((e) => e.requires !== "wins" || opts.winsReady);
}

/** Entries from the last `days` days (by date, UK calendar). */
export function recentEntries(today: string, days = 21, entries = CHANGELOG) {
  const cutoff = new Date(`${today}T12:00:00Z`).getTime() - days * 86400000;
  return entries.filter((e) => new Date(`${e.date}T12:00:00Z`).getTime() >= cutoff);
}

/** How long an entry can show as new to a member who hasn't opened it yet. */
const NEW_FOR_DAYS = 90;

/** The seen cookie: ids of the entries a member has seen, "."-separated. */
export function parseSeen(raw: string | null | undefined): Set<string> {
  return new Set((raw ?? "").split(".").filter(Boolean));
}

/** Adds `ids` to a seen cookie value, dropping ids that are no longer in the changelog. */
export function mergeSeen(raw: string | null | undefined, ids: string[]): string {
  const seen = parseSeen(raw);
  for (const id of ids) seen.add(id);
  return CHANGELOG.filter((e) => seen.has(e.id))
    .map((e) => e.id)
    .join(".");
}

/**
 * Ids of entries the member hasn't seen. `seenRaw` is the seen cookie. Each entry is
 * tracked by id, so one that goes live later (the wins wall) still shows as new.
 * With no cookie yet (a new member), only the last week counts as new.
 */
export function unseenIds(seenRaw: string | undefined, today: string, entries = CHANGELOG): Set<string> {
  if (!seenRaw) return new Set(recentEntries(today, 7, entries).map((e) => e.id));
  const seen = parseSeen(seenRaw);
  return new Set(
    recentEntries(today, NEW_FOR_DAYS, entries)
      .filter((e) => !seen.has(e.id))
      .map((e) => e.id),
  );
}
