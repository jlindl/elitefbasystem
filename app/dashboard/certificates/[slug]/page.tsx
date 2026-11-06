import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "@/app/components/icons";
import { AppShell } from "../../_components/app-shell";
import { Certificate } from "../../_components/certificate";
import { CertificateActions, Celebrate, ShareCaption } from "../../_components/certificate-actions";
import { artContent } from "../../_components/certificate-art";
import { NameForm } from "../../_components/name-form";
import { CERTIFICATES_BY_SLUG, ISSUER, formatIssued } from "../../_lib/certificate-defs";
import { qrPath } from "../../_lib/certificate-token";
import { getMyCertificate, getMyCertificates, isNameLocked } from "../../_lib/certificates";
import { getCurrentStudent } from "../../_lib/get-student";
import { requestOrigin } from "../../_lib/request-origin";

type Params = Promise<{ slug: string }>;
type Search = Promise<{ new?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const def = CERTIFICATES_BY_SLUG.get((await params).slug);
  return { title: def ? `${def.label} - EliteFBA` : "Certificate - EliteFBA" };
}

function linkedInUrl(opts: { name: string; day: string; verifyUrl: string; certId: string }) {
  const [year, month] = opts.day.split("-");
  const url = new URL("https://www.linkedin.com/profile/add");
  url.searchParams.set("startTask", "CERTIFICATION_NAME");
  url.searchParams.set("name", opts.name);
  url.searchParams.set("organizationName", ISSUER.org);
  url.searchParams.set("issueYear", year);
  url.searchParams.set("issueMonth", String(Number(month)));
  url.searchParams.set("certUrl", opts.verifyUrl);
  url.searchParams.set("certId", opts.certId);
  return url.toString();
}

export default async function CertificatePage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const { slug } = await params;
  const isNew = (await searchParams).new === "1";
  const student = await getCurrentStudent();
  const cert = await getMyCertificate(slug);
  if (!cert) notFound();

  const origin = await requestOrigin();
  const verifyUrl = cert.earned && cert.token ? `${origin}/verify/${cert.token}` : null;
  const content = artContent(cert, {
    recipient: cert.recipient,
    day: cert.issuedOn,
    certId: cert.earned ? cert.certId : null,
    qr: verifyUrl ? qrPath(verifyUrl) : null,
  });
  const [all, locked] = await Promise.all([getMyCertificates(), isNameLocked()]);
  const others = all.filter((c) => c.slug !== cert.slug);
  const credentialName = cert.kind === "programme" ? "Elite FBA Core Programme" : `Elite FBA - Module ${cert.number}: ${cert.title}`;
  const shareText =
    cert.kind === "programme"
      ? `I've completed the Elite FBA Core Programme 🎓\n\nAll ${cert.progress.total} core modules done and every final exam passed, from opening a seller account to sending stock to Amazon.`
      : `I've just earned my Elite FBA certificate for Module ${cert.number}: ${cert.title} 🎓\n\nFinal exam passed. One more step towards running my own Amazon FBA business.`;
  const caption = verifyUrl ? `${shareText}\n\nVerify it here: ${verifyUrl}` : shareText;

  return (
    <AppShell student={student}>
      <Celebrate active={isNew && cert.earned} />
      <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <nav aria-label="Breadcrumb" className="dash-rise" style={{ ["--i" as string]: 0 }}>
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.9375rem]">
            <li>
              <Link href="/dashboard/certificates" className="font-medium text-ink-muted underline decoration-ink/25 underline-offset-4 hover:text-ink hover:decoration-ink">
                Certificates
              </Link>
            </li>
            <li aria-hidden className="text-ink-muted">
              <ChevronRight size={14} />
            </li>
            <li>
              <span aria-current="page" className="font-semibold text-ink">
                {cert.kind === "programme" ? "Core Programme" : `Module ${cert.number}`}
              </span>
            </li>
          </ol>
        </nav>

        <header className="dash-rise mt-6" style={{ ["--i" as string]: 1 }}>
          {cert.earned && cert.issuedOn ? (
            <p className="text-[0.9375rem] font-semibold text-emerald-800">
              <span aria-hidden>✓ </span>
              {isNew ? `Congratulations, ${student.firstName}! ` : ""}Earned {formatIssued(cert.issuedOn)}
            </p>
          ) : (
            <p className="text-[0.9375rem] font-semibold text-ink-muted">
              <span aria-hidden>🔒 </span>Not earned yet
            </p>
          )}
          <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.5rem] text-balance">
            {cert.kind === "programme" ? "Core Programme certificate" : cert.title}
          </h1>
          <p className="mt-2 text-[1.0625rem] text-ink-muted">
            {cert.kind === "programme" ? "Certificate of Achievement · Elite FBA" : `Module ${cert.number} certificate of completion`}
          </p>
        </header>

        <div className="dash-rise mt-8" style={{ ["--i" as string]: 2 }}>
          <div
            className={`overflow-hidden rounded-[14px] shadow-[0_40px_90px_-40px_rgba(10,10,10,0.55)] ring-1 ring-black/10 ${cert.earned ? "" : "opacity-55 grayscale-[0.6]"}`}
          >
            <Certificate content={content} earned={cert.earned} />
          </div>
        </div>

        {cert.earned ? (
          <>
            {/* One name card in a fixed spot: saving re-renders it in place, so focus and the "Saved" message survive. */}
            <section
              aria-labelledby="name-heading"
              className={`dash-rise mt-6 rounded-3xl border p-5 sm:p-6 ${student.nameIsSet ? "border-line bg-surface" : "border-amber-200 bg-amber-50"}`}
              style={{ ["--i" as string]: 3 }}
            >
              <h2 id="name-heading" className={student.nameIsSet ? "sr-only" : "font-display text-[1.25rem] font-semibold text-amber-950"}>
                {student.nameIsSet ? "The name on this certificate" : "Add your name to download and share it"}
              </h2>
              {!student.nameIsSet && (
                <p className="mt-1 max-w-[62ch] text-[0.9375rem] leading-relaxed text-amber-950/80">
                  Your certificate needs your real name before you can save it as a PDF, add it to LinkedIn or share its link. Once you&rsquo;ve earned a
                  certificate the name is locked, so check the spelling.
                </p>
              )}
              <div className={`max-w-[560px] ${student.nameIsSet ? "" : "mt-4"}`}>
                <NameForm name={student.fullName} nameIsSet={student.nameIsSet} locked={locked} />
              </div>
            </section>

            {student.nameIsSet && (
            <div className="dash-rise mt-6" style={{ ["--i" as string]: 3 }}>
              <CertificateActions
                pdfHref={`/dashboard/certificates/${cert.slug}/pdf`}
                pdfName={`EliteFBA Certificate - ${cert.kind === "programme" ? "Core Programme" : `Module ${cert.number}`} - ${cert.recipient}.pdf`}
                printHref={`/dashboard/certificates/${cert.slug}/print`}
                imageHref={cert.token ? `/verify/${cert.token}/image?download=1` : null}
                verifyUrl={verifyUrl}
                linkedInUrl={verifyUrl && cert.issuedOn && cert.certId ? linkedInUrl({ name: credentialName, day: cert.issuedOn, verifyUrl, certId: cert.certId }) : null}
                shareTitle={`${cert.recipient}'s Elite FBA certificate`}
                shareText={shareText}
              />
            </div>
            )}

            {student.nameIsSet && (
            <div className="dash-rise mt-10 grid gap-4 lg:grid-cols-2" style={{ ["--i" as string]: 4 }}>
              <section aria-labelledby="details-heading" className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <h2 id="details-heading" className="font-display text-[1.25rem] font-semibold text-ink">
                  Certificate details
                </h2>
                <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.875rem] font-medium text-ink-muted">Issued</dt>
                    <dd className="mt-0.5 font-medium text-ink">{cert.issuedOn ? formatIssued(cert.issuedOn) : "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.875rem] font-medium text-ink-muted">Certificate ID</dt>
                    <dd className="mt-0.5 font-mono text-[0.9375rem] font-medium text-ink">{cert.certId}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[0.875rem] font-medium text-ink-muted">Verification link</dt>
                    <dd className="mt-0.5">
                      {verifyUrl ? (
                        <a href={verifyUrl} target="_blank" rel="noopener noreferrer" className="break-all text-[0.9375rem] font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                          {verifyUrl.replace(/^https?:\/\//, "").slice(0, 46)}…<span className="sr-only"> (opens your public verification page in a new tab)</span>
                        </a>
                      ) : (
                        <span className="text-[0.9375rem] text-ink-muted">Verification isn&rsquo;t switched on for this site yet.</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </section>

              <section aria-labelledby="share-heading" className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <h2 id="share-heading" className="font-display text-[1.25rem] font-semibold text-ink">
                  Share your win
                </h2>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                  A ready-made caption for LinkedIn or anywhere else. Paste it with your certificate image or link.
                </p>
                <div className="mt-4">
                  <ShareCaption caption={caption} />
                </div>
              </section>
            </div>
            )}
          </>
        ) : (
          <section className="dash-rise mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-7" style={{ ["--i" as string]: 3 }}>
            <h2 className="font-display text-[1.25rem] font-semibold text-ink">How to earn it</h2>
            <p className="mt-2 max-w-[62ch] text-[1rem] leading-relaxed text-ink-muted">
              {cert.kind === "programme"
                ? `Pass all ${cert.progress.total} module exams. You've passed ${cert.progress.done} so far.`
                : `Finish the ${cert.progress.total} lessons in Module ${cert.number}, then pass its final exam. You've done ${cert.progress.done} of ${cert.progress.total} lessons.`}
            </p>
            <Link href={cert.href} className="btn btn-primary btn-aa mt-5">
              {cert.kind === "programme" ? "Go to your next module" : `Go to Module ${cert.number}`} <ArrowRight size={16} className="btn-arrow" />
            </Link>
          </section>
        )}

        <nav aria-label="Your other certificates" className="dash-rise mt-12 border-t border-line pt-8" style={{ ["--i" as string]: 5 }}>
          <h2 className="font-display text-[1.125rem] font-semibold text-ink">Your other certificates</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/dashboard/certificates/${o.slug}`}
                  className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                    o.earned ? "border-line bg-surface text-ink hover:border-ink/30" : "border-dashed border-line text-ink-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  <span aria-hidden>{o.earned ? "🏅" : "🔒"}</span>
                  {o.kind === "programme" ? "Core Programme" : `Module ${o.number}`}
                  <span className="sr-only">{o.earned ? " (earned)" : " (not earned yet)"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </AppShell>
  );
}
