"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const mergedStyle: CSSProperties = {
    ...style,
    ...({ "--reveal-delay": `${delay}ms` } as CSSProperties),
  };

  const Component = Tag as unknown as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
}
