import "server-only";
import { cache } from "react";
import { CERTIFICATE_DEFS, MODULE_CERTIFICATES, PROGRAMME_CERTIFICATE, ukDay, type CertificateDef } from "./certificate-defs";
import { issueCertificate } from "./certificate-token";
import { getCourse } from "./course";
import { getExamPasses } from "./exam-passes";
import { getCurrentStudent } from "./get-student";

export type MyCertificate = CertificateDef & {
  earned: boolean;
  /** UK calendar day it was earned, "YYYY-MM-DD". */
  issuedOn: string | null;
  recipient: string;
  /** Signed token for the public /verify link (null when verification is not configured). */
  token: string | null;
  certId: string | null;
  /** Where to go to earn it. */
  href: string;
  /** Progress towards it while it is still locked. */
  progress: { done: number; total: number; unit: "lessons" | "exams" };
};

/** Every certificate for the signed-in student, earned or not. Shared within one request. */
export const getMyCertificates = cache(async (): Promise<MyCertificate[]> => {
  const [student, passes, course] = await Promise.all([getCurrentStudent(), getExamPasses(), getCourse()]);
  const passedOn = new Map(passes.map((p) => [p.moduleId, ukDay(p.passedAt)]));

  const modules = MODULE_CERTIFICATES.map((def): MyCertificate => {
    const day = def.moduleId ? passedOn.get(def.moduleId) ?? null : null;
    const mod = course.modules.find((m) => m.id === def.moduleId);
    // No signed link until the member has saved a real name (never their email username).
    const issued = day ? issueCertificate(def, student.nameIsSet ? student.fullName : "", day, student.id) : null;
    return {
      ...def,
      earned: !!day,
      issuedOn: day,
      recipient: student.fullName,
      token: issued?.token ?? null,
      certId: issued?.certId ?? null,
      href: `/dashboard/modules/${def.moduleId}`,
      progress: { done: mod?.done ?? 0, total: mod?.total ?? 0, unit: "lessons" },
    };
  });

  const earnedDays = modules.filter((c) => c.issuedOn).map((c) => c.issuedOn!);
  const allPassed = earnedDays.length === modules.length && modules.length > 0;
  const programmeDay = allPassed ? earnedDays.sort().at(-1)! : null;
  const programmeIssued = programmeDay ? issueCertificate(PROGRAMME_CERTIFICATE, student.nameIsSet ? student.fullName : "", programmeDay, student.id) : null;
  const nextLocked = modules.find((c) => !c.earned);

  const programme: MyCertificate = {
    ...PROGRAMME_CERTIFICATE,
    earned: allPassed,
    issuedOn: programmeDay,
    recipient: student.fullName,
    token: programmeIssued?.token ?? null,
    certId: programmeIssued?.certId ?? null,
    href: nextLocked?.href ?? "/dashboard/modules",
    progress: { done: earnedDays.length, total: modules.length, unit: "exams" },
  };

  return [...modules, programme];
});

export async function getMyCertificate(slug: string) {
  const all = await getMyCertificates();
  return all.find((c) => c.slug === slug) ?? null;
}

export const CERTIFICATE_COUNT = CERTIFICATE_DEFS.length;

/** True once the member holds a certificate under a real name: the name can then only be changed by Jakub. */
export async function isNameLocked() {
  const [student, passes] = await Promise.all([getCurrentStudent(), getExamPasses()]);
  return student.nameIsSet && passes.length > 0;
}
