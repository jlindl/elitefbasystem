import localFont from "next/font/local";
import { CertificateArt, describeCertificate, type ArtContent } from "./certificate-art";

// The signature face only loads on pages that show a certificate.
const signature = localFont({
  src: "../../../assets/fonts/MrsSaintDelafield-Regular.ttf",
  variable: "--font-signature",
  display: "swap",
});

const HTML_FONTS = {
  serif: "var(--font-serif), Georgia, 'Times New Roman', serif",
  sans: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
  script: "var(--font-signature), 'Brush Script MT', cursive",
};

/**
 * A certificate that scales to any width (container-query units), so the same
 * markup works as a thumbnail, full-size on screen and on an A4 print-out.
 */
export function Certificate({
  content,
  className = "",
  decorative = false,
  earned = true,
}: {
  content: ArtContent;
  className?: string;
  decorative?: boolean;
  /** False for the faded preview of a certificate that hasn't been earned. */
  earned?: boolean;
}) {
  const label = earned ? describeCertificate(content) : `Preview of the ${content.focus} certificate ${content.headline}. Not earned yet.`;
  return (
    <div
      className={`${signature.variable} certificate-sheet @container relative aspect-[297/210] w-full overflow-hidden ${className}`}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    >
      <CertificateArt {...content} u={(n) => `${n}cqw`} fonts={HTML_FONTS} patternUrl={`/certificate-pattern/${content.variant}.svg`} />
    </div>
  );
}
