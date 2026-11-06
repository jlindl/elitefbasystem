import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Certificate } from "../../../_components/certificate";
import { artContent } from "../../../_components/certificate-art";
import { PrintNow } from "../../../_components/print-now";
import { CERTIFICATES_BY_SLUG } from "../../../_lib/certificate-defs";
import { qrPath } from "../../../_lib/certificate-token";
import { getMyCertificate } from "../../../_lib/certificates";
import { getCurrentStudent } from "../../../_lib/get-student";
import { requestOrigin } from "../../../_lib/request-origin";

type Params = Promise<{ slug: string }>;

// The page title becomes the default PDF file name.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const def = CERTIFICATES_BY_SLUG.get((await params).slug);
  const student = await getCurrentStudent();
  return {
    title: def ? `EliteFBA Certificate - ${def.kind === "programme" ? "Core Programme" : `Module ${def.number}`} - ${student.fullName}` : "EliteFBA Certificate",
    robots: { index: false, follow: false },
  };
}

/** Just the certificate on an A4 landscape page - what "Download PDF" prints. */
export default async function CertificatePrintPage({ params, searchParams }: { params: Params; searchParams: Promise<{ auto?: string }> }) {
  const { slug } = await params;
  const auto = (await searchParams).auto === "1";
  const [cert, student] = await Promise.all([getMyCertificate(slug), getCurrentStudent()]);
  if (!cert || !cert.earned) notFound();
  if (!student.nameIsSet) redirect(`/dashboard/certificates/${slug}`);

  const origin = await requestOrigin();
  const verifyUrl = cert.token ? `${origin}/verify/${cert.token}` : null;
  const content = artContent(cert, { recipient: cert.recipient, day: cert.issuedOn, certId: cert.certId, qr: verifyUrl ? qrPath(verifyUrl) : null });

  return (
    <div className="certificate-print min-h-screen bg-[#e9e5dc] print:min-h-0 print:bg-white">
      <style>{`@page { size: A4 landscape; margin: 0; } @media print { html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; } }`}</style>
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-5 print:hidden">
        <Link href={`/dashboard/certificates/${cert.slug}`} className="text-[0.9375rem] font-medium text-ink-muted underline decoration-ink/25 underline-offset-4 hover:text-ink">
          ← Back to your certificate
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-[0.9375rem] text-ink-muted sm:block">Choose &ldquo;Save as PDF&rdquo; as the printer, landscape, no margins.</p>
          <PrintNow auto={auto} />
        </div>
      </div>
      <div className="mx-auto w-[min(1100px,94vw)] pb-10 print:m-0 print:h-[210mm] print:w-[297mm] print:p-0">
        <div className="overflow-hidden rounded-xl shadow-[0_30px_80px_-30px_rgba(10,10,10,0.45)] print:rounded-none print:shadow-none">
          <Certificate content={content} />
        </div>
      </div>
    </div>
  );
}
