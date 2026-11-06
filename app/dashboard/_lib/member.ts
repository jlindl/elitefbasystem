import "server-only";
import { createHash } from "node:crypto";

const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/** A short, stable member number derived from the account id, e.g. "EF-7Q2K-91XD". */
export function memberNumber(userId: string) {
  const h = createHash("sha256").update(`elitefba/member/${userId}`).digest();
  let bits = 0;
  for (const b of h.subarray(0, 5)) bits = bits * 256 + b;
  let out = "";
  for (let i = 7; i >= 0; i--) out += CROCKFORD[Math.floor(bits / 2 ** (i * 5)) % 32];
  return `EF-${out.slice(0, 4)}-${out.slice(4)}`;
}

/** "September 2026" in UK time. */
export function memberSinceLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "Europe/London" });
}
