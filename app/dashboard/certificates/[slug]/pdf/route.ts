import { PDFDocument } from "pdf-lib";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { artContent } from "../../../_components/certificate-art";
import { certificatePng } from "../../../_lib/certificate-image";
import { qrPath } from "../../../_lib/certificate-token";
import { getMyCertificate } from "../../../_lib/certificates";
import { getCurrentStudent } from "../../../_lib/get-student";
import { requestOrigin } from "../../../_lib/request-origin";

// A4 landscape in PDF points.
const PAGE = { width: 841.89, height: 595.28 };

// Rendering is the slow part, so keep recent PDFs: repeat downloads are instant on a warm server.
const cache = new Map<string, Uint8Array>();
const CACHE_MAX = 40;

/**
 * The certificate as a real one-page A4 landscape PDF, rendered on the server, so it
 * comes out the same in every browser (Safari and iOS ignore print page orientation).
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Check the session without redirect(): a fetch would follow it and save the homepage as a ".pdf".
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Sign in to download your certificate.", { status: 401 });
  const [cert, student] = await Promise.all([getMyCertificate(slug), getCurrentStudent()]);
  if (!cert || !cert.earned) return new Response("Certificate not found", { status: 404 });
  if (!student.nameIsSet) return new Response("Add your name before downloading your certificate.", { status: 409 });

  const origin = await requestOrigin();
  const verifyUrl = cert.token ? `${origin}/verify/${cert.token}` : null;
  const content = artContent(cert, { recipient: cert.recipient, day: cert.issuedOn, certId: cert.certId, qr: verifyUrl ? qrPath(verifyUrl) : null });

  const cacheKey = [slug, cert.recipient, cert.issuedOn, cert.certId, cert.token ?? ""].join("|");
  let bytes = cache.get(cacheKey);
  if (!bytes) {
    // ~170 dpi on A4: sharp in print, without a slow render.
    const png = await (await certificatePng(content, 2000)).arrayBuffer();
    const pdf = await PDFDocument.create();
    pdf.setTitle(`Elite FBA certificate - ${content.focus} - ${cert.recipient}`);
    pdf.setAuthor("Elite FBA");
    pdf.setCreator("Elite FBA");
    pdf.setSubject(`Certificate ${content.headline} awarded to ${cert.recipient}${cert.certId ? ` (${cert.certId})` : ""}`);
    const image = await pdf.embedPng(png);
    pdf.addPage([PAGE.width, PAGE.height]).drawImage(image, { x: 0, y: 0, ...PAGE });
    bytes = await pdf.save();
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
    cache.set(cacheKey, bytes);
  }

  const label = cert.kind === "programme" ? "Core Programme" : `Module ${cert.number}`;
  const filename = `EliteFBA Certificate - ${label} - ${cert.recipient}.pdf`;
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename.replace(/[^\x20-\x7e]/g, "").replace(/"/g, "")}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
    },
  });
}
