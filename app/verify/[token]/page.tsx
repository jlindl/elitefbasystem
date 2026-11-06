import type { Metadata } from "next";
import Link from "next/link";
import { Certificate } from "@/app/dashboard/_components/certificate";
import { artContent } from "@/app/dashboard/_components/certificate-art";
import { ISSUER, formatIssued } from "@/app/dashboard/_lib/certificate-defs";
import { qrPath, readCertificateToken, verificationEnabled } from "@/app/dashboard/_lib/certificate-token";
import { requestOrigin } from "@/app/dashboard/_lib/request-origin";

type Params = Promise<{ token: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { token } = await params;
  const cert = readCertificateToken(token);
  // Certificates carry a member's name, so keep them out of search engines.
  const robots = { index: false, follow: false };
  if (!cert) return { title: "Certificate not verified - EliteFBA", robots };
  const focus = cert.def.kind === "programme" ? cert.def.focus : `Module ${cert.number} · ${cert.def.title}`;
  const title = `${cert.recipient} - ${focus} - EliteFBA certificate`;
  const description = `Verified Elite FBA certificate awarded to ${cert.recipient} on ${formatIssued(cert.day)}.`;
  return { title, description, robots, openGraph: { title, description, type: "website", siteName: "EliteFBA" }, twitter: { card: "summary_large_image", title, description } };
}

function Wordmark() {
  return (
    <Link href="/" className="inline-flex items-center font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">
      EliteFBA
      <span aria-hidden className="ml-[3px] inline-block h-1.5 w-1.5 translate-y-[7px] rounded-full bg-accent" />
    </Link>
  );
}

export default async function VerifyPage({ params }: { params: Params }) {
  const { token } = await params;
  const cert = readCertificateToken(token);
  const origin = await requestOrigin();
  const content = cert
    ? artContent(cert.def, { recipient: cert.recipient, day: cert.day, certId: cert.certId, qr: qrPath(`${origin}/verify/${token}`), number: cert.number, count: cert.count })
    : null;

  return (
    <div className="min-h-screen bg-[#f1ede4] text-ink">
      <header className="border-b border-black/10 bg-[#f1ede4]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Wordmark />
          <p className="text-[0.9375rem] font-medium text-ink-muted">Certificate verification</p>
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-5 py-10 sm:px-8 md:py-14">
        {cert ? (
          <>
            <section aria-labelledby="status" className="flex flex-col gap-5 rounded-3xl border border-emerald-200 bg-white p-6 sm:flex-row sm:items-center sm:p-7">
              <span aria-hidden className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-[1.6rem] font-semibold text-white">
                ✓
              </span>
              <div className="min-w-0">
                <h1 id="status" className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                  This certificate is genuine
                </h1>
                <p className="mt-1.5 max-w-[70ch] text-[1rem] leading-relaxed text-ink-muted">
                  Elite FBA issued it to{" "}
                  <strong className="font-semibold text-ink">
                    <bdi>{cert.recipient}</bdi>
                  </strong>{" "}
                  on {formatIssued(cert.day)} for {cert.def.kind === "programme" ? "completing the Elite FBA Core Programme" : `passing the ${content!.focus} final exam`}.
                </p>
              </div>
            </section>

            <div className="mt-8 overflow-hidden rounded-[18px] shadow-[0_30px_80px_-30px_rgba(10,10,10,0.45)] ring-1 ring-black/10">
              <Certificate content={content!} />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <section aria-labelledby="details" className="rounded-3xl border border-black/10 bg-white p-6 sm:p-7">
                <h2 id="details" className="font-display text-[1.25rem] font-semibold text-ink">
                  Certificate details
                </h2>
                <dl className="mt-4 grid gap-x-6 gap-y-4 text-[1rem] sm:grid-cols-2">
                  {[
                    ["Awarded to", cert.recipient],
                    ["For", content!.focus],
                    ["Issued", formatIssued(cert.day)],
                    ["Certificate ID", cert.certId],
                    ["Issued by", `${ISSUER.name}, ${ISSUER.role}, ${ISSUER.org}`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[0.875rem] font-medium text-ink-muted">{k}</dt>
                      <dd className="mt-0.5 font-medium text-ink [overflow-wrap:anywhere]">
                        <bdi>{v}</bdi>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 border-t border-black/10 pt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                  Every Elite FBA certificate link carries a digital signature. If anything on it is changed, the link stops verifying.
                </p>
              </section>

              <aside className="flex flex-col rounded-3xl bg-ink p-6 text-white sm:p-7">
                <p className="text-[0.9375rem] font-medium text-white/75">About Elite FBA</p>
                <p className="mt-2 font-display text-[1.375rem] font-semibold leading-snug">Direct 1-to-1 mentorship from a full-time Amazon seller.</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">
                  The Elite FBA System covers everything from opening a seller account to sending stock to Amazon.
                </p>
                <div className="mt-auto pt-6">
                  <Link href="/" className="btn btn-primary btn-aa">
                    Discover Elite FBA
                  </Link>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <section aria-labelledby="status" className="mx-auto max-w-[640px] rounded-3xl border border-black/10 bg-white p-8 text-center sm:p-10">
            <span aria-hidden className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1ede4] text-[1.6rem]">
              ?
            </span>
            <h1 id="status" className="mt-5 font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-ink">
              We couldn&rsquo;t verify this certificate
            </h1>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-muted">
              {verificationEnabled()
                ? "The link may be incomplete, or something in it has been changed. Ask the certificate holder to send the link again, copied in full from their Elite FBA dashboard."
                : "Certificate verification is temporarily unavailable. Please try again later."}
            </p>
            <Link href="/" className="btn btn-secondary mt-7">
              Go to the Elite FBA website
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
