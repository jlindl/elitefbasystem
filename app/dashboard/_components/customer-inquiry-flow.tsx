import { Fragment } from "react";

const STEPS = [
  {
    num: 1,
    icon: "👤",
    title: "Customer clicks \"Contact Seller\"",
    time: "0s",
    accent: "blue",
  },
  {
    num: 2,
    icon: "🛡️",
    title: "Amazon intercepts the message",
    time: "1s",
    accent: "purple",
  },
  {
    num: 3,
    icon: "💬",
    title: "Amazon support replies using live tracking data",
    time: "2-30 min",
    accent: "amber",
  },
  {
    num: 4,
    icon: "😴",
    title: "You receive zero messages and sleep peacefully",
    time: "Always",
    accent: "emerald",
  },
] as const;

const COLORS = {
  blue: "border-blue-300 bg-blue-50",
  purple: "border-purple-300 bg-purple-50",
  amber: "border-amber-300 bg-amber-50",
  emerald: "border-emerald-300 bg-emerald-50",
} as const;

export function CustomerInquiryFlow() {
  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-surface p-5 md:p-6">
      <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-5">
        💬 The Customer Inquiry Flow
      </p>

      <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-1">
        {STEPS.map((s, i) => (
          <Fragment key={s.num}>
            <div
              className={`flex-1 rounded-2xl border-2 ${COLORS[s.accent]} p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[0.75rem] font-bold font-mono text-ink">
                  {s.num}
                </span>
                <span className="text-2xl">{s.icon}</span>
                <span className="ml-auto font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle">
                  {s.time}
                </span>
              </div>
              <p className="text-[0.85rem] text-ink leading-snug">
                {s.title}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex items-center justify-center text-ink-subtle text-2xl md:px-1"
                aria-hidden
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
