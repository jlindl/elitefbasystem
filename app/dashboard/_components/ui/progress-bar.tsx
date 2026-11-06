type ProgressBarProps = {
  percent: number;
  className?: string;
  ariaLabel?: string;
  tone?: "accent" | "success" | "light";
};

/** Thin progress bar; the fill grows in on first paint. */
export function ProgressBar({ percent, className = "", ariaLabel, tone = "accent" }: ProgressBarProps) {
  const target = Math.max(0, Math.min(100, percent));
  const fill =
    tone === "success"
      ? "bg-emerald-500"
      : tone === "light"
        ? "bg-gradient-to-r from-accent to-[#ffb347]"
        : "bg-gradient-to-r from-accent to-[#ff8f4d]";
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={target}
      aria-label={ariaLabel}
      className={`relative h-2 w-full overflow-hidden rounded-full ${tone === "light" ? "bg-white/12" : "bg-surface-deep"} ${className}`}
    >
      <div
        className={`bar-grow absolute inset-y-0 left-0 rounded-full ${fill}`}
        style={{ width: `${target}%` }}
      />
    </div>
  );
}
