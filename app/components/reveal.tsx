"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

/** Adds `is-visible` once the element scrolls into view (one-shot). */
export function useRevealOnScroll<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return ref;
}

type RevealVariant = "up" | "fade" | "blur" | "scale" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
  style,
}: RevealProps) {
  const ref = useRevealOnScroll<HTMLElement>();

  const mergedStyle: CSSProperties = {
    ...style,
    ...({ "--reveal-delay": `${delay}ms` } as CSSProperties),
  };

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component
      ref={ref}
      data-reveal={variant === "up" ? undefined : variant}
      className={`reveal ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
}

type WordSegment = { text: string; className?: string };

type RevealWordsProps = {
  /** Plain string, or segments when some words need their own styling. */
  text: string | WordSegment[];
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
};

/** Heading reveal where each word rises out of its own mask, staggered. */
export function RevealWords({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
}: RevealWordsProps) {
  const ref = useRevealOnScroll<HTMLElement>();
  const segments = typeof text === "string" ? [{ text }] : text;

  let index = 0;
  const Component = Tag as unknown as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`reveal-words ${className}`.trim()}
      style={{ "--rw-base": `${delay}ms` } as CSSProperties}
    >
      {segments.map((segment, s) => (
        <span key={s} className={segment.className}>
          {segment.text
            // Not \s: a non-breaking space keeps two words in one mask.
            .split(/[ \t\n]+/)
            .filter(Boolean)
            .map((word, w) => {
              const i = index++;
              return (
                <span key={w}>
                  <span className="rw-mask">
                    <span
                      className="rw-word"
                      style={{ "--rw-i": i } as CSSProperties}
                    >
                      {word}
                    </span>
                  </span>{" "}
                </span>
              );
            })}
        </span>
      ))}
    </Component>
  );
}

/**
 * Words light up from dim to full ink as the block scrolls through the
 * viewport - the reading position follows the scroll position.
 */
export function ScrollHighlight({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = text.split(/\s+/).filter(Boolean);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Under reduced motion the CSS shows every word fully lit.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top sits at 85% of the viewport, 1 at 35%.
      const start = vh * 0.85;
      const end = vh * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setLit(Math.round(progress * words.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className={`hl-word ${i < lit ? "is-lit" : ""}`}>{word}</span>{" "}
        </span>
      ))}
    </p>
  );
}
