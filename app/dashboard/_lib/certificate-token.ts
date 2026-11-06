import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import QRCode from "qrcode";
import { MODULE_CERTIFICATES, PROGRAMME_CERTIFICATE, type CertificateDef, type QrPath } from "./certificate-defs";
import { validatePersonName } from "./person-name";

/*
 * Certificates are verified without a database lookup: the public link carries the
 * certificate's claim plus an HMAC signature, so anyone can check it is genuine and
 * nobody can forge or edit one without the server's secret.
 *
 * The token signs the claim itself, not a pointer into today's course config: the
 * stable module id and the module's number (or, for the programme, how many modules
 * it covered). Restructuring the course later can't rewrite certificates already issued.
 *
 * Keys: CERTIFICATE_SECRET (key id 1). To rotate, add a new env var and key id below,
 * switch CURRENT_KEY, and keep the old one so existing links still verify.
 * No secret configured = no public links (fails closed).
 */

type Payload = {
  v: 2;
  /** Signing key id. */
  k: number;
  /** "M" module certificate, "P" programme certificate. */
  c: "M" | "P";
  /** Module certificates: the last 12 characters of the module's id (stable). */
  m?: string;
  /** Module number at issue (M), or number of modules covered (P). */
  o: number;
  /** Recipient name. */
  n: string;
  /** Issue day, "YYYY-MM-DD" (UK). */
  d: string;
  /** Account reference: lets Jakub trace which account a link came from. */
  u: string;
};

const KEYS: Record<number, string | undefined> = { 1: process.env.CERTIFICATE_SECRET };

// Fail closed, but loudly: a deploy without the secret ships certificates nobody can verify.
if (!KEYS[1] && process.env.VERCEL_ENV === "production") {
  console.error("[certificates] CERTIFICATE_SECRET is not set: verification links, QR codes and share images are disabled.");
}
const CURRENT_KEY = 1;
const MAX_TOKEN_LENGTH = 600;
const SIG_BYTES = 15;
const SIG_CHARS = 20; // 15 bytes in base64url, unpadded - the only accepted spelling
const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

const derived = new Map<number, Buffer>();
function keyFor(id: number): Buffer | null {
  const base = KEYS[id];
  if (!base) return null;
  let k = derived.get(id);
  if (!k) {
    k = createHmac("sha256", base).update("elitefba/certificates/v2").digest();
    derived.set(id, k);
  }
  return k;
}

export function verificationEnabled() {
  return keyFor(CURRENT_KEY) !== null;
}

function mac(key: Buffer, data: string) {
  return createHmac("sha256", key).update(data).digest().subarray(0, SIG_BYTES);
}

/** 40 bits as 8 Crockford base-32 characters, split "ABCD-EFGH". */
function base32Id(bytes: Uint8Array) {
  // 40 bits fit exactly in a JS number, so no BigInt needed.
  let bits = 0;
  for (const b of bytes.subarray(0, 5)) bits = bits * 256 + b;
  let out = "";
  for (let i = 7; i >= 0; i--) out += CROCKFORD[Math.floor(bits / 2 ** (i * 5)) % 32];
  return `${out.slice(0, 4)}-${out.slice(4)}`;
}

const moduleRef = (moduleId: string) => moduleId.replace(/-/g, "").slice(-12);

export type IssuedCertificate = { token: string | null; certId: string };

/**
 * Signs a certificate. Names that fail the person-name rules are never signed, and
 * without a secret a certificate still gets a stable ID, just no public link.
 */
export function issueCertificate(def: CertificateDef, recipient: string, day: string, userId: string): IssuedCertificate {
  const key = keyFor(CURRENT_KEY);
  const name = validatePersonName(recipient);
  if (!key || !name.ok) {
    const h = createHash("sha256").update(`${userId}|${def.slug}`).digest();
    return { token: null, certId: `EFBA-${def.code}-${base32Id(h)}` };
  }
  const payload: Payload = {
    v: 2,
    k: CURRENT_KEY,
    c: def.kind === "programme" ? "P" : "M",
    ...(def.kind === "module" && def.moduleId ? { m: moduleRef(def.moduleId) } : {}),
    o: def.kind === "programme" ? MODULE_CERTIFICATES.length : (def.number ?? 0),
    n: name.name,
    d: day,
    u: createHmac("sha256", key).update(`uid:${userId}`).digest("hex").slice(0, 8),
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = mac(key, body);
  return { token: `${body}.${sig.toString("base64url")}`, certId: `EFBA-${def.code}-${base32Id(sig)}` };
}

export type VerifiedCertificate = {
  def: CertificateDef;
  recipient: string;
  day: string;
  certId: string;
  /** Module number as issued (module certificates). */
  number: number | null;
  /** Modules covered (programme certificate). */
  count: number | null;
};

/** Returns the certificate a public link describes, or null if it was altered or is not ours. */
export function readCertificateToken(token: string): VerifiedCertificate | null {
  if (!token || token.length > MAX_TOKEN_LENGTH) return null;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot !== token.lastIndexOf(".")) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^[A-Za-z0-9_-]+$/.test(body) || sig.length !== SIG_CHARS || !/^[A-Za-z0-9_-]+$/.test(sig)) return null;

  let payload: Partial<Payload>;
  try {
    const parsed: unknown = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    // Anything but a plain object (null, a number, an array) is not one of ours.
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    payload = parsed as Partial<Payload>;
  } catch {
    return null;
  }
  const key = typeof payload.k === "number" ? keyFor(payload.k) : null;
  if (!key) return null;

  const expected = mac(key, body);
  const given = Buffer.from(sig, "base64url");
  // Exactly one spelling of a signature is valid (no padding variants).
  if (given.length !== expected.length || given.toString("base64url") !== sig || !timingSafeEqual(given, expected)) return null;

  if (payload.v !== 2 || typeof payload.n !== "string" || typeof payload.d !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(payload.d)) return null;
  if (typeof payload.o !== "number" || !Number.isInteger(payload.o) || payload.o < 1 || payload.o > 99) return null;
  const name = validatePersonName(payload.n);
  if (!name.ok || name.name !== payload.n) return null;

  let def: CertificateDef | undefined;
  if (payload.c === "P") def = PROGRAMME_CERTIFICATE;
  else if (payload.c === "M" && typeof payload.m === "string") def = MODULE_CERTIFICATES.find((d) => d.moduleId && moduleRef(d.moduleId) === payload.m);
  if (!def) return null;

  return {
    def,
    recipient: payload.n,
    day: payload.d,
    certId: `EFBA-${def.code}-${base32Id(expected)}`,
    number: payload.c === "M" ? payload.o : null,
    count: payload.c === "P" ? payload.o : null,
  };
}

/** A QR code as one SVG path (one unit per module), so it renders crisply everywhere. */
export function qrPath(text: string): QrPath {
  // Low error correction keeps the code small enough to scan when printed at ~2 cm.
  const { modules } = QRCode.create(text, { errorCorrectionLevel: "L" });
  const n = modules.size;
  let d = "";
  for (let y = 0; y < n; y++) {
    let x = 0;
    while (x < n) {
      if (modules.data[y * n + x]) {
        let w = 1;
        while (x + w < n && modules.data[y * n + x + w]) w++;
        d += `M${x} ${y}h${w}v1h-${w}z`;
        x += w;
      } else {
        x++;
      }
    }
  }
  return { size: n, d };
}
