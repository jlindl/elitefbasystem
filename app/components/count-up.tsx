"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /**
   * If set, replaces the live count with this string once the animation
   * completes. Useful for showing a range like "3,000–5,000" after counting
   * up to the upper bound.
   */
  displayFinal?: string;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  to,
  duration = 2000,
  prefix = "",
  suffix = "",
  displayFinal,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValue(to);
      setDone(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              setValue(Math.round(easeOutCubic(t) * to));
              if (t < 1) {
                requestAnimationFrame(tick);
              } else {
                setDone(true);
              }
            };
            requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  const body =
    done && displayFinal ? displayFinal : value.toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {body}
      {suffix}
    </span>
  );
}
