/**
 * One rule for what counts as a person's name, used at sign-up, when a member edits
 * their name, and before a name is signed into a certificate. Rejects symbols,
 * digits, emoji, invisible characters and text-direction tricks that could make a
 * certificate read like something it isn't.
 */
export type NameCheck = { ok: true; name: string } | { ok: false; error: string };

export const NAME_MIN = 3;
export const NAME_MAX = 60;

export function validatePersonName(raw: unknown): NameCheck {
  if (typeof raw !== "string") return { ok: false, error: "Enter your name." };
  const name = raw
    .normalize("NFC")
    // Phones and autofill type curly apostrophes and dashes: O’Brien is the same name as O'Brien.
    .replace(/[\u2018\u2019\u02BC\uFF07\u0060\u00B4]/g, "'")
    .replace(/[\u2010-\u2013]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  if (/\p{Default_Ignorable_Code_Point}/u.test(name)) return { ok: false, error: "Your name contains characters we can't print. Type it again without copying and pasting." };
  if (name.length < NAME_MIN) return { ok: false, error: `Your name needs at least ${NAME_MIN} characters.` };
  if (name.length > NAME_MAX) return { ok: false, error: `Keep your name under ${NAME_MAX} characters.` };
  if (!/^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u.test(name)) return { ok: false, error: "Use letters, spaces, hyphens and apostrophes only." };
  if ((name.match(/\p{L}/gu) ?? []).length < 2) return { ok: false, error: "Enter your name." };
  return { ok: true, name };
}
