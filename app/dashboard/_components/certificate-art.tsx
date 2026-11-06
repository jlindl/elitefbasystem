import type { CSSProperties, ReactNode } from "react";
import { ISSUER, MODULE_CERTIFICATES, countWord, formatIssued, type CertificateDef, type QrPath } from "../_lib/certificate-defs";

/*
 * The certificate artwork. Written with inline styles and flexbox only so the exact
 * same component renders on screen (sized in container-query units), in print (A4)
 * and as a PNG through next/og (sized in pixels). Every div with more than one child
 * sets display: flex, which the image renderer requires.
 *
 * Coordinates use "u": 1u = 1% of the certificate's width. The sheet is A4 landscape,
 * so it is 100u wide and ~70.7u tall.
 */

export type ArtFonts = { serif: string; sans: string; script: string };

export type CertificateArtProps = {
  variant: "module" | "programme";
  headline: string;
  lead: string;
  focus: string;
  tail: string;
  recipient: string;
  issued: string;
  certId: string | null;
  seal: { top: string; main: string; bottom: string };
  issuer: { name: string; role: string };
  qr: QrPath | null;
  /** Converts u to a CSS length, e.g. n => `${n}cqw` or n => `${n * 20}px`. */
  u: (n: number) => string;
  fonts: ArtFonts;
  /** Set when rendering to an image: the sheet width in px (SVG sizes must be numbers there). */
  px?: number;
  /** On screen, load the linework as one cached SVG file instead of inlining it in every certificate. */
  patternUrl?: string;
  /**
   * Image output only: the seal pre-rendered on its own (see certificate-image.tsx). The image
   * renderer rounds rotations in page coordinates, which scrambles the ring lettering when the
   * seal is drawn in place; drawn at the origin it stays sharp.
   */
  sealImage?: { src: string; size: number; pad: number };
};

/** Seal diameter in u (1u = 1% of the sheet width). */
export const SEAL_U = 12.4;

const THEMES = {
  module: {
    paper: "#fffdf8",
    ink: "#1b1915",
    muted: "rgba(27,25,21,0.64)",
    faint: "rgba(27,25,21,0.16)",
    accent: "#ff6b1a",
    accentText: "#c2410c",
    pattern: "#ff6b1a",
    patternOpacity: 0.085,
    sealFrom: "#ff7a2e",
    sealTo: "#ffb14f",
    sealInk: "#ffffff",
    qrTile: "#ffffff",
    glow: "radial-gradient(ellipse 70% 60% at 50% 45%, #fffdf8 0%, #fffdf8 42%, rgba(255,253,248,0) 78%)",
  },
  programme: {
    paper: "#12110e",
    ink: "#f7f1e3",
    muted: "rgba(247,241,227,0.68)",
    faint: "rgba(247,241,227,0.18)",
    accent: "#e2b45e",
    accentText: "#ebc479",
    pattern: "#e2b45e",
    patternOpacity: 0.13,
    sealFrom: "#f7dc93",
    sealTo: "#b5832c",
    sealInk: "#2a1d06",
    qrTile: "#fbf6ea",
    glow: "radial-gradient(ellipse 70% 60% at 50% 45%, #12110e 0%, #12110e 40%, rgba(18,17,14,0) 80%)",
  },
} as const;

/* Flowing guilloché linework, generated once (viewBox 1000 x 707). */
const GUILLOCHE: string[] = (() => {
  const out: string[] = [];
  for (let family = 0; family < 2; family++) {
    for (let k = 0; k < 14; k++) {
      let d = "";
      for (let x = 0; x <= 1000; x += 10) {
        const t = (x / 1000) * Math.PI * 2;
        const amp = 70 + k * 15;
        const y = 353.5 + amp * Math.sin(t * 1.5 + k * 0.32 + family * Math.PI) * Math.cos(t * 0.5 - k * 0.11);
        d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
      }
      out.push(d);
    }
  }
  return out;
})();

/** The linework as a standalone SVG document, for the cached pattern file. */
export function guillocheSvg(variant: "module" | "programme") {
  const stroke = THEMES[variant].pattern;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 707" preserveAspectRatio="none">${GUILLOCHE.map((d) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.1"/>`).join("")}</svg>`;
}

const RING_TEXT = "ELITE FBA • CERTIFIED • ELITE FBA • CERTIFIED • ";

function abs(style: CSSProperties): CSSProperties {
  return { position: "absolute", display: "flex", ...style };
}

function Seal({ u, theme, seal, fonts }: { u: CertificateArtProps["u"]; theme: (typeof THEMES)[keyof typeof THEMES]; seal: CertificateArtProps["seal"]; fonts: ArtFonts }) {
  const size = SEAL_U;
  const letters = RING_TEXT.split("");
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: u(size),
        height: u(size),
        borderRadius: "50%",
        backgroundImage: `linear-gradient(145deg, ${theme.sealFrom} 0%, ${theme.sealTo} 100%)`,
        boxShadow: `0 ${u(0.5)} ${u(1.6)} rgba(0,0,0,0.18), inset 0 ${u(0.15)} 0 rgba(255,255,255,0.45)`,
      }}
    >
      {letters.map((ch, i) => (
        <div
          key={i}
          style={abs({
            top: 0,
            left: 0,
            width: u(size),
            height: u(size),
            justifyContent: "center",
            transform: `rotate(${(i * 360) / letters.length}deg)`,
          })}
        >
          <span
            style={{
              marginTop: u(0.62),
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: u(0.74),
              lineHeight: 1,
              color: theme.sealInk,
              opacity: 0.92,
            }}
          >
            {ch === " " ? " " : ch}
          </span>
        </div>
      ))}
      <div
        style={abs({
          top: u(2.05),
          left: u(2.05),
          width: u(size - 4.1),
          height: u(size - 4.1),
          borderRadius: "50%",
          border: `${u(0.09)} solid ${theme.sealInk === "#ffffff" ? "rgba(255,255,255,0.6)" : "rgba(42,29,6,0.45)"}`,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: u(0.66), letterSpacing: "0.28em", color: theme.sealInk, marginLeft: "0.28em" }}>
          {seal.top}
        </span>
        <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: seal.main.length > 2 ? u(2.1) : u(3.4), lineHeight: 1, color: theme.sealInk, marginTop: u(0.25) }}>
          {seal.main}
        </span>
        <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: u(0.62), letterSpacing: "0.28em", color: theme.sealInk, marginTop: u(0.35), marginLeft: "0.28em" }}>
          {seal.bottom}
        </span>
      </div>
    </div>
  );
}

function Corner({ u, color, pos }: { u: CertificateArtProps["u"]; color: string; pos: "tl" | "tr" | "bl" | "br" }) {
  const len = u(3.2);
  const w = u(0.22);
  const inset = u(3.55);
  const v = pos[0] === "t" ? { top: inset } : { bottom: inset };
  const h = pos[1] === "l" ? { left: inset } : { right: inset };
  return (
    <div style={abs({ ...v, ...h, width: len, height: len })}>
      <div style={abs({ ...(pos[0] === "t" ? { top: 0 } : { bottom: 0 }), left: 0, width: len, height: w, backgroundColor: color })} />
      <div style={abs({ top: 0, ...(pos[1] === "l" ? { left: 0 } : { right: 0 }), width: w, height: len, backgroundColor: color })} />
    </div>
  );
}

function Rule({ u, color, width }: { u: CertificateArtProps["u"]; color: string; width: string }) {
  return <div style={{ display: "flex", width, height: u(0.08), backgroundColor: color }} />;
}

function Label({ u, fonts, color, children, size = 0.74 }: { u: CertificateArtProps["u"]; fonts: ArtFonts; color: string; children: ReactNode; size?: number }) {
  return (
    <span style={{ fontFamily: fonts.sans, fontWeight: 500, fontSize: u(size), letterSpacing: "0.26em", textTransform: "uppercase", color, marginLeft: "0.26em" }}>
      {children}
    </span>
  );
}

export function CertificateArt(p: CertificateArtProps) {
  const { u, fonts } = p;
  // SVG width/height attributes: numbers for the image renderer, CSS lengths on screen.
  const svgLen = (n: number) => (p.px ? (n * p.px) / 100 : u(n));
  const t = THEMES[p.variant];
  // Long names shrink to stay on one line.
  const nameScale = Math.max(0.58, Math.min(1, 24 / Math.max(1, p.recipient.length)));

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: t.paper,
        color: t.ink,
        fontFamily: fonts.sans,
      }}
    >
      {/* Linework, faded out behind the text */}
      {p.patternUrl ? (
        <div
          style={abs({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: t.patternOpacity,
            backgroundImage: `url(${p.patternUrl})`,
            backgroundSize: "100% 100%",
          })}
        />
      ) : (
      <svg
        viewBox="0 0 1000 707"
        preserveAspectRatio="none"
        width={svgLen(100)}
        height={svgLen(70.71)}
        style={{ position: "absolute", top: 0, left: 0, opacity: t.patternOpacity }}
      >
        {GUILLOCHE.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={t.pattern} strokeWidth={1.1} />
        ))}
      </svg>
      )}
      <div style={abs({ top: 0, left: 0, right: 0, bottom: 0, backgroundImage: t.glow })} />

      {/* Frames */}
      <div style={abs({ top: u(2.1), left: u(2.1), right: u(2.1), bottom: u(2.1), border: `${u(0.12)} solid ${t.faint}` })} />
      <div style={abs({ top: u(2.75), left: u(2.75), right: u(2.75), bottom: u(2.75), border: `${u(0.07)} solid ${t.accent}`, opacity: 0.55 })} />
      <Corner u={u} color={t.accent} pos="tl" />
      <Corner u={u} color={t.accent} pos="tr" />
      <Corner u={u} color={t.accent} pos="bl" />
      <Corner u={u} color={t.accent} pos="br" />

      {/* Wordmark */}
      <div style={abs({ top: u(6.3), left: u(6.8), flexDirection: "column" })}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: u(2.2), lineHeight: 1, letterSpacing: "-0.02em", color: t.ink }}>EliteFBA</span>
          <span
            style={{
              display: "flex",
              width: u(0.5),
              height: u(0.5),
              borderRadius: "50%",
              backgroundColor: t.accent,
              marginLeft: u(0.18),
              marginBottom: u(0.22),
            }}
          />
        </div>
        <div style={{ display: "flex", marginTop: u(0.7) }}>
          <Label u={u} fonts={fonts} color={t.muted} size={0.7}>
            The Elite FBA System
          </Label>
        </div>
      </div>

      {/* QR */}
      {p.qr && (
        <div style={abs({ top: u(5.6), right: u(6.8), flexDirection: "column", alignItems: "center" })}>
          <div
            style={{
              display: "flex",
              padding: u(0.5),
              backgroundColor: t.qrTile,
              borderRadius: u(0.35),
              border: `${u(0.06)} solid ${t.faint}`,
            }}
          >
            <svg width={svgLen(5.6)} height={svgLen(5.6)} viewBox={`0 0 ${p.qr.size} ${p.qr.size}`} shapeRendering="crispEdges">
              <path d={p.qr.d} fill="#1b1915" />
            </svg>
          </div>
          <div style={{ display: "flex", marginTop: u(0.6) }}>
            <Label u={u} fonts={fonts} color={t.muted} size={0.62}>
              Scan to verify
            </Label>
          </div>
        </div>
      )}

      {/* Citation */}
      <div style={abs({ top: u(10.8), left: u(14), right: u(14), flexDirection: "column", alignItems: "center" })}>
        <span style={{ fontFamily: fonts.serif, fontWeight: 400, fontSize: u(6.3), lineHeight: 1, letterSpacing: "-0.01em", color: t.ink }}>
          Certificate
        </span>
        <span style={{ fontFamily: fonts.serif, fontStyle: "italic", fontWeight: 400, fontSize: u(3), lineHeight: 1.1, color: t.accentText, marginTop: u(0.3) }}>
          {p.headline}
        </span>

        <div style={{ display: "flex", alignItems: "center", marginTop: u(1.6) }}>
          <Rule u={u} color={t.accent} width={u(4.5)} />
          <div style={{ display: "flex", width: u(0.62), height: u(0.62), backgroundColor: t.accent, transform: "rotate(45deg)", marginLeft: u(0.9), marginRight: u(0.9) }} />
          <Rule u={u} color={t.accent} width={u(4.5)} />
        </div>

        <div style={{ display: "flex", marginTop: u(1.5) }}>
          <Label u={u} fonts={fonts} color={t.muted} size={0.86}>
            This is to certify that
          </Label>
        </div>

        <span
          style={{
            fontFamily: fonts.serif,
            fontWeight: 400,
            fontSize: u(5.7 * nameScale),
            lineHeight: 1.08,
            color: t.ink,
            marginTop: u(1.15),
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {p.recipient}
        </span>
        <div
          style={{
            display: "flex",
            width: u(44),
            height: u(0.08),
            marginTop: u(0.8),
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${t.accent} 50%, rgba(0,0,0,0) 100%)`,
          }}
        />

        <span style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: u(1.3), lineHeight: 1.4, color: t.muted, marginTop: u(2.1), textAlign: "center" }}>
          {p.lead}
        </span>
        <span style={{ fontFamily: fonts.serif, fontWeight: 400, fontSize: u(2.6), lineHeight: 1.15, color: t.ink, marginTop: u(0.5), textAlign: "center" }}>
          {p.focus}
        </span>
        <span style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: u(1.3), lineHeight: 1.4, color: t.muted, marginTop: u(0.55), textAlign: "center" }}>
          {p.tail}
        </span>
      </div>

      {/* Date, seal, signature */}
      <div style={abs({ left: u(9.5), right: u(9.5), bottom: u(6.3), justifyContent: "space-between", alignItems: "flex-end" })}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: u(24) }}>
          <span style={{ fontFamily: fonts.serif, fontWeight: 400, fontSize: u(1.85), lineHeight: 1.1, color: t.ink }}>{p.issued}</span>
          <div style={{ display: "flex", marginTop: u(0.7) }}>
            <Rule u={u} color={t.faint} width={u(22)} />
          </div>
          <div style={{ display: "flex", marginTop: u(0.75) }}>
            <Label u={u} fonts={fonts} color={t.muted}>
              Date issued
            </Label>
          </div>
          {p.certId && (
            <span style={{ fontFamily: fonts.sans, fontWeight: 500, fontSize: u(0.72), letterSpacing: "0.08em", color: t.muted, marginTop: u(0.45) }}>
              {p.certId}
            </span>
          )}
        </div>

        {p.sealImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- image renderer input, not a page element
          <img
            src={p.sealImage.src}
            alt=""
            width={p.sealImage.size + 2 * p.sealImage.pad}
            height={p.sealImage.size + 2 * p.sealImage.pad}
            style={{ margin: -p.sealImage.pad }}
          />
        ) : (
          <Seal u={u} theme={t} seal={p.seal} fonts={fonts} />
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: u(24) }}>
          <span
            style={{
              fontFamily: fonts.script,
              fontWeight: 400,
              // Script faces run wide: shrink longer signatures so they stay on their line.
              fontSize: u(p.issuer.name.length > 10 ? 3.5 : 4.2),
              lineHeight: 0.95,
              color: t.ink,
              marginBottom: u(-0.55),
              whiteSpace: "nowrap",
            }}
          >
            {p.issuer.name}
          </span>
          <div style={{ display: "flex", marginTop: u(0.7) }}>
            <Rule u={u} color={t.faint} width={u(22)} />
          </div>
          <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: u(0.9), color: t.ink, marginTop: u(0.7) }}>{p.issuer.name}</span>
          <div style={{ display: "flex", marginTop: u(0.3) }}>
            <Label u={u} fonts={fonts} color={t.muted} size={0.68}>
              {p.issuer.role}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export type ArtContent = Omit<CertificateArtProps, "u" | "fonts" | "px">;

/** Everything printed on a certificate, from its definition and who earned it. */
export function artContent(
  def: CertificateDef,
  opts: {
    recipient: string;
    day: string | null;
    certId: string | null;
    qr: QrPath | null;
    /** As issued: the module's number at the time (module certificates). */
    number?: number | null;
    /** As issued: how many modules the programme covered. */
    count?: number | null;
  },
): ArtContent {
  const number = opts.number ?? def.number;
  const count = opts.count ?? MODULE_CERTIFICATES.length;
  return {
    variant: def.kind,
    headline: def.headline,
    lead: def.kind === "programme" ? `has completed all ${countWord(count)} core modules of` : def.lead,
    focus: def.kind === "programme" ? def.focus : `Module ${number} · ${def.title}`,
    tail: def.tail,
    recipient: opts.recipient,
    issued: opts.day ? formatIssued(opts.day) : "Not yet issued",
    certId: opts.certId,
    seal: def.kind === "programme" ? { top: "ELITE FBA", main: "CORE", bottom: "PROGRAMME" } : { top: "MODULE", main: String(number), bottom: "PASSED" },
    issuer: { name: ISSUER.name, role: `${ISSUER.role}, ${ISSUER.org}` },
    qr: opts.qr,
  };
}

/** Plain-language description for screen readers and image alt text. */
export function describeCertificate(c: Pick<ArtContent, "headline" | "recipient" | "focus" | "issued" | "certId">) {
  return `Certificate ${c.headline}, awarded to ${c.recipient} for ${c.focus}. Issued ${c.issued}.${c.certId ? ` Certificate ID ${c.certId}.` : ""}`;
}

/** The seal on its own, for pre-rendering at the origin (image output). */
export function SealArt({ variant, seal, u, fonts }: { variant: CertificateArtProps["variant"]; seal: CertificateArtProps["seal"]; u: CertificateArtProps["u"]; fonts: ArtFonts }) {
  return <Seal u={u} theme={THEMES[variant]} seal={seal} fonts={fonts} />;
}
