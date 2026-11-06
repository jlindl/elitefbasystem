/**
 * Jakub's welcome note on a member's first visit. Written in his voice as a draft -
 * edit freely. Keep it short: it is the first thing a new member reads.
 */
export const WELCOME_NOTE = [
  "Welcome to Elite FBA. I'm really glad you're here.",
  "Everything you need to get your first bundle live on Amazon is here: the lessons, the tools and the missions. Work through it in order, one lesson at a time.",
  "Whenever you get stuck, message me on WhatsApp. That's what I'm here for.",
];

export const WELCOME_SIGNOFF = "Jakub";

/** Cookie names for small per-device dashboard preferences (read on the server, so nothing flickers). */
export const COOKIES = {
  welcomed: "efba_welcomed",
  stepsHidden: "efba_steps_hidden",
  saidHi: "efba_said_hi",
  newsSeen: "efba_news_seen",
  supplies: "efba_supplies",
  // Lesson reading options: one part at a time or the whole lesson, text size, font.
  lessonMode: "efba_lesson_mode",
  lessonSize: "efba_lesson_size",
  lessonFont: "efba_lesson_font",
} as const;

/** Reads a preference cookie in the browser (null on the server or if unset). */
export function readPrefCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  if (!hit) return null;
  try {
    return decodeURIComponent(hit.slice(name.length + 1));
  } catch {
    return null;
  }
}

/** Writes a year-long, site-wide preference cookie from the browser. */
export function setPrefCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
}
