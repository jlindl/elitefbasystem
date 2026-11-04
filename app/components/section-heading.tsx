import type { ReactNode } from "react";
import { Reveal, RevealWords } from "./reveal";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} max-w-[780px] ${className}`.trim()}
    >
      <Reveal>
        <p className={`eyebrow ${dark ? "text-white/60" : ""}`}>
          {index && <span className="eyebrow-index">{index}</span>}
          <span className="eyebrow-rule" />
          {eyebrow}
        </p>
      </Reveal>
      <RevealWords
        as="h2"
        text={title}
        delay={60}
        className={`mt-5 block font-display font-medium tracking-[-0.03em] leading-[1.04] text-balance text-[clamp(2.125rem,4.6vw,3.75rem)] ${
          dark ? "text-white" : "text-ink"
        }`}
      />
      {intro && (
        <Reveal delay={180}>
          <p
            className={`mt-6 text-pretty text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] ${
              centered ? "mx-auto" : ""
            } max-w-[640px] ${dark ? "text-white/60" : "text-ink-muted"}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
