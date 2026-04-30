"use client";

import { useEffect, useState, type CSSProperties } from "react";

type ProgressBarProps = {
  percent: number;
  className?: string;
  ariaLabel?: string;
};

export function ProgressBar({
  percent,
  className = "",
  ariaLabel,
}: ProgressBarProps) {
  const target = Math.max(0, Math.min(100, percent));
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => setWidth(target)),
    );
    return () => window.cancelAnimationFrame(id);
  }, [target]);

  const fillStyle: CSSProperties = {
    width: `${width}%`,
    transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={target}
      aria-label={ariaLabel}
      className={`relative h-1 w-full rounded-full bg-line overflow-hidden ${className}`}
    >
      <div className="absolute inset-y-0 left-0 bg-accent" style={fillStyle} />
    </div>
  );
}
