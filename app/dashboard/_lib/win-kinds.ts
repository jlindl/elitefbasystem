/** The kinds of win members can post. Shared by the server actions and the composer. */
export const WIN_KINDS = [
  { id: "first_sale", label: "First sale", emoji: "💷", prompt: "e.g. First sale on my 3-pack bundle!" },
  { id: "shipment", label: "Stock sent in", emoji: "📦", prompt: "e.g. My first box is on its way to Amazon" },
  { id: "product", label: "Product found", emoji: "🔎", prompt: "e.g. Found a bundle that clears the £5 floor" },
  { id: "milestone", label: "Milestone", emoji: "🚀", prompt: "e.g. Hit 100 sales this month" },
  { id: "exam", label: "Exam passed", emoji: "🎓", prompt: "e.g. Passed the Module 3 exam" },
  { id: "other", label: "Other win", emoji: "✨", prompt: "e.g. Seller account approved first time" },
] as const;

export type WinKind = (typeof WIN_KINDS)[number]["id"];
export const WIN_KIND_IDS = WIN_KINDS.map((k) => k.id) as readonly WinKind[];
export const kindInfo = (id: string) => WIN_KINDS.find((k) => k.id === id) ?? WIN_KINDS[WIN_KINDS.length - 1];

/** How the poster chose to be named. */
export type WinNameStyle = "initial" | "first" | "anonymous";

export const HEADLINE_MAX = 120;
export const STORY_MAX = 600;

/** Length in characters as people (and the database) count them, not UTF-16 units. */
export const charLength = (s: string) => Array.from(s).length;

/** Cuts to `max` whole characters, never splitting an emoji in half. */
export const clampChars = (s: string, max: number) => {
  const chars = Array.from(s);
  return chars.length > max ? chars.slice(0, max).join("") : s;
};

// Control characters (C0/C1), soft hyphen, direction marks and overrides, invisible
// operators, BOM and blank "letters" (Hangul fillers, braille blank) - none belong in a post.
const INVISIBLE =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F­؜ᅟᅠ឴឵᠋-᠏​‌‎‏‪-‮⁠-⁤⁦-⁯⠀ㅤ﻿ﾠ]/g;

/**
 * Tidies member-written text: strips invisible and direction-changing characters,
 * keeps the zero-width joiner only inside emoji (👩‍💻), caps stacked accents, and
 * collapses blank lines and spacing.
 */
export function cleanWinText(raw: unknown, { multiline = false } = {}) {
  if (typeof raw !== "string") return "";
  let s = raw.normalize("NFC").replace(/\r\n?/g, "\n").replace(INVISIBLE, "");
  // A joiner only belongs between two emoji.
  s = s.replace(/‍(?!\p{Extended_Pictographic})/gu, "").replace(/(?<![\p{Extended_Pictographic}️\u{1F3FB}-\u{1F3FF}])‍/gu, "");
  // No towers of combining marks.
  s = s.replace(/(\p{M}{3})\p{M}+/gu, "$1");
  s = multiline
    ? s
        .replace(/[^\S\n]+/g, " ")
        .replace(/ *\n */g, "\n")
        .replace(/\n{3,}/g, "\n\n")
    : s.replace(/\s+/g, " ");
  return s.trim();
}

/** At least two real letters, digits or emoji - not just punctuation or spacing. */
export const hasVisibleText = (s: string) => (s.match(/[\p{L}\p{N}\p{Extended_Pictographic}]/gu) ?? []).length >= 2;

/** "Sam Taylor" -> "Sam T." / "Sam" / "An Elite FBA member". */
export function winDisplayName(fullName: string, style: WinNameStyle) {
  if (style === "anonymous") return "An Elite FBA member";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0] ?? "A member";
  if (style === "first" || parts.length < 2) return first;
  return `${first} ${parts[parts.length - 1][0].toUpperCase()}.`;
}
