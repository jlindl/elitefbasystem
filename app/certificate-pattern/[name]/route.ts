import { guillocheSvg } from "@/app/dashboard/_components/certificate-art";

/** /certificate-pattern/module.svg and /certificate-pattern/programme.svg - certificate background linework. */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const variant = name === "module.svg" ? "module" : name === "programme.svg" ? "programme" : null;
  if (!variant) return new Response("Not found", { status: 404 });
  return new Response(guillocheSvg(variant), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
