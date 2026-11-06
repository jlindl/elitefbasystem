import { artContent } from "@/app/dashboard/_components/certificate-art";
import { certificateShareCard } from "@/app/dashboard/_lib/certificate-image";
import { qrPath, readCertificateToken } from "@/app/dashboard/_lib/certificate-token";
import { requestOrigin } from "@/app/dashboard/_lib/request-origin";

export const alt = "A verified Elite FBA certificate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview LinkedIn, WhatsApp and others show when a member shares their certificate link. */
export default async function Image({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const cert = readCertificateToken(token);
  if (!cert) return new Response("Certificate not found", { status: 404 });

  const content = artContent(cert.def, {
    recipient: cert.recipient,
    day: cert.day,
    certId: cert.certId,
    number: cert.number,
    count: cert.count,
    qr: qrPath(`${await requestOrigin()}/verify/${token}`),
  });
  return certificateShareCard(content);
}
