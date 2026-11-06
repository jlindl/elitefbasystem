import { artContent } from "@/app/dashboard/_components/certificate-art";
import { certificatePng } from "@/app/dashboard/_lib/certificate-image";
import { qrPath, readCertificateToken } from "@/app/dashboard/_lib/certificate-token";

/** High-resolution PNG of a verified certificate, for downloading and sharing. */
export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const cert = readCertificateToken(token);
  if (!cert) return new Response("Certificate not found", { status: 404 });

  const url = new URL(request.url);
  // One URL per certificate (with or without ?download=1), so caches can't be bypassed with junk query strings.
  const keys = [...url.searchParams.keys()];
  if (keys.length > 1 || (keys.length === 1 && (keys[0] !== "download" || url.searchParams.get("download") !== "1"))) {
    const canonical = new URL(url.pathname, url.origin);
    if (url.searchParams.has("download")) canonical.searchParams.set("download", "1");
    return Response.redirect(canonical, 308);
  }
  const verifyUrl = `${url.origin}/verify/${token}`;
  const content = artContent(cert.def, { recipient: cert.recipient, day: cert.day, certId: cert.certId, qr: qrPath(verifyUrl), number: cert.number, count: cert.count });
  const safeName = cert.recipient.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "member";
  const filename = `EliteFBA-${cert.def.code}-certificate-${safeName}.png`;

  return certificatePng(content, 1600, {
    "Content-Disposition": `${url.searchParams.has("download") ? "attachment" : "inline"}; filename="${filename.replace(/[^\x20-\x7e]/g, "")}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    // The token fully determines the image, so it never changes.
    "Cache-Control": "public, max-age=31536000, immutable",
    "CDN-Cache-Control": "public, max-age=31536000, immutable",
  });
}
