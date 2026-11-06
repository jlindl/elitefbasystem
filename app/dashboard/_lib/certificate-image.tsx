import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CertificateArt, SEAL_U, SealArt, type ArtContent } from "../_components/certificate-art";

/* Renders certificates to PNG with the same artwork the site shows. */

const FONT_DIR = join(process.cwd(), "assets", "fonts");
const IMAGE_FONTS = { serif: "Instrument Serif", sans: "Inter Tight", script: "Mrs Saint Delafield" };

type FontSpec = { name: string; data: Buffer; weight: 400 | 500 | 600; style: "normal" | "italic" };
let fontsPromise: Promise<FontSpec[]> | null = null;

function loadFonts() {
  fontsPromise ??= Promise.all(
    (
      [
        ["Instrument Serif", "InstrumentSerif-Regular.ttf", 400, "normal"],
        ["Instrument Serif", "InstrumentSerif-Italic.ttf", 400, "italic"],
        ["Inter Tight", "InterTight-400.ttf", 400, "normal"],
        ["Inter Tight", "InterTight-500.ttf", 500, "normal"],
        ["Inter Tight", "InterTight-600.ttf", 600, "normal"],
        ["Mrs Saint Delafield", "MrsSaintDelafield-Regular.ttf", 400, "normal"],
      ] as const
    ).map(async ([name, file, weight, style]) => ({ name, data: await readFile(join(FONT_DIR, file)), weight, style })),
  ).catch((e) => {
    fontsPromise = null;
    throw e;
  });
  return fontsPromise;
}

// The seal's ring of rotated letters is drawn on its own canvas (at the origin rotations stay
// exact), then placed into the certificate as an image. Cached per look and size.
const sealCache = new Map<string, { src: string; size: number; pad: number }>();

async function sealImage(content: ArtContent, sheetWidth: number) {
  const size = Math.round((SEAL_U * sheetWidth) / 100);
  const pad = Math.round(size * 0.14); // room for the drop shadow
  const key = [content.variant, size, content.seal.top, content.seal.main, content.seal.bottom].join("|");
  const hit = sealCache.get(key);
  if (hit) return hit;
  const box = size + 2 * pad;
  const res = new ImageResponse(
    <div style={{ display: "flex", width: box, height: box, alignItems: "center", justifyContent: "center" }}>
      <SealArt variant={content.variant} seal={content.seal} u={(n) => `${(n * sheetWidth) / 100}px`} fonts={IMAGE_FONTS} />
    </div>,
    { width: box, height: box, fonts: await loadFonts() },
  );
  const out = { src: `data:image/png;base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`, size, pad };
  if (sealCache.size >= 24) sealCache.delete(sealCache.keys().next().value!);
  sealCache.set(key, out);
  return out;
}

/** Full certificate, A4 landscape proportions. */
export async function certificatePng(content: ArtContent, width = 2400, headers?: HeadersInit) {
  const height = Math.round(width / Math.SQRT2);
  const seal = await sealImage(content, width);
  return new ImageResponse(
    <div style={{ display: "flex", width, height }}>
      <CertificateArt {...content} u={(n) => `${(n * width) / 100}px`} px={width} fonts={IMAGE_FONTS} sealImage={seal} />
    </div>,
    { width, height, fonts: await loadFonts(), headers },
  );
}

/** The token fully determines these images, so they can be cached forever (browser and CDN). */
const IMMUTABLE = { "Cache-Control": "public, max-age=31536000, immutable", "CDN-Cache-Control": "public, max-age=31536000, immutable" };

/** 1200x630 share card: the certificate on a dark stage with a verified stamp. */
export async function certificateShareCard(content: ArtContent) {
  const W = 1200;
  const H = 630;
  const sheet = 760;
  const sheetH = Math.round(sheet / Math.SQRT2);
  const seal = await sealImage(content, sheet);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: W,
        height: H,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 64px",
        backgroundColor: "#0e0d0b",
        backgroundImage: "radial-gradient(circle at 78% 30%, rgba(255,107,26,0.35) 0%, rgba(14,13,11,0) 55%)",
        fontFamily: "Inter Tight",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 300, color: "#f7f1e3" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>EliteFBA</span>
          <span style={{ display: "flex", width: 8, height: 8, borderRadius: 8, backgroundColor: "#ff6b1a", marginLeft: 3, marginBottom: 8 }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
            padding: "10px 16px",
            borderRadius: 999,
            backgroundColor: "rgba(16,185,129,0.16)",
            color: "#6ee7b7",
            fontSize: 20,
            fontWeight: 600,
            alignSelf: "flex-start",
          }}
        >
          Verified certificate
        </div>
        <span style={{ marginTop: 22, fontFamily: "Instrument Serif", fontSize: 46, lineHeight: 1.05 }}>{content.recipient}</span>
        <span style={{ marginTop: 14, fontSize: 21, lineHeight: 1.35, color: "rgba(247,241,227,0.72)" }}>{content.focus}</span>
      </div>
      <div
        style={{
          display: "flex",
          width: sheet,
          height: sheetH,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          transform: "rotate(-2deg)",
        }}
      >
        <CertificateArt {...content} u={(n) => `${(n * sheet) / 100}px`} px={sheet} fonts={IMAGE_FONTS} sealImage={seal} />
      </div>
    </div>,
    { width: W, height: H, fonts: await loadFonts(), headers: IMMUTABLE },
  );
}
