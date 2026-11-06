import modulesData from "./modules_content.json";
import { MODULE_QUIZZES } from "./module-quizzes";

/** Who signs the certificates. */
export const ISSUER = { name: "Jakub Wawrzyniak", role: "Founder & Mentor", org: "Elite FBA" } as const;

/** A QR code as a single SVG path, one unit per module. */
export type QrPath = { size: number; d: string };

export type CertificateDef = {
  /** URL slug, e.g. "module-3" or "core-programme". */
  slug: string;
  kind: "module" | "programme";
  /** Short code used in certificate IDs, e.g. "M3" or "CP". */
  code: string;
  moduleId: string | null;
  number: number | null;
  /** Short title, e.g. "Product Research". */
  title: string;
  /** How the certificate is referred to in the UI, e.g. "Module 3 certificate". */
  label: string;
  /** Second line of the heading: "of Completion" / "of Achievement". */
  headline: string;
  /** The three lines of the citation printed under the recipient's name. */
  lead: string;
  focus: string;
  tail: string;
};

const cleanTitle = (name: string) => name.replace(/^Module\s+\d+\s*[-:]\s*/i, "").trim() || name;

/** Formal titles for certificates where the lesson-style module name doesn't read well on one. */
const CERTIFICATE_TITLES: Record<string, string> = {
  "29b20c1c-884d-8066-a004-d51fa41bb93d": "Opening a Seller Account",
};

/** One certificate per module that has a final exam (Modules 1-5). */
export const MODULE_CERTIFICATES: CertificateDef[] = modulesData.flatMap((m, i) => {
  if (!MODULE_QUIZZES[m.id]) return [];
  const n = i + 1;
  const title = CERTIFICATE_TITLES[m.id] ?? cleanTitle(m.name);
  return [
    {
      slug: `module-${n}`,
      kind: "module" as const,
      code: `M${n}`,
      moduleId: m.id,
      number: n,
      title,
      label: `Module ${n} certificate`,
      headline: "of Completion",
      lead: "has completed",
      focus: `Module ${n} · ${title}`,
      tail: "of the Elite FBA System and passed its final exam",
    },
  ];
});

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
/** 5 -> "five" (up to nine), otherwise digits. */
export const countWord = (n: number) => WORDS[n] ?? String(n);
const count = countWord(MODULE_CERTIFICATES.length);

/** Earned by passing every module exam. */
export const PROGRAMME_CERTIFICATE: CertificateDef = {
  slug: "core-programme",
  kind: "programme",
  code: "CP",
  moduleId: null,
  number: null,
  title: "Elite FBA Core Programme",
  label: "Core Programme certificate",
  headline: "of Achievement",
  lead: `has completed all ${count} core modules of`,
  focus: "The Elite FBA Core Programme",
  tail: "and passed every final exam along the way",
};

export const CERTIFICATE_DEFS: CertificateDef[] = [...MODULE_CERTIFICATES, PROGRAMME_CERTIFICATE];
export const CERTIFICATES_BY_SLUG = new Map(CERTIFICATE_DEFS.map((d) => [d.slug, d]));

/** "2026-11-04" -> "4 November 2026" */
export function formatIssued(isoDay: string) {
  const [y, m, d] = isoDay.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** A timestamp as a calendar day in UK time, e.g. "2026-11-04". */
export function ukDay(timestamp: string | Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(timestamp));
}
