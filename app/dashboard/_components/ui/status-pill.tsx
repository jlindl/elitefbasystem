import { Check } from "@/app/components/icons";

type Status = "locked" | "start" | "in-progress" | "complete";

const styles: Record<Status, { bg: string; text: string; label: string }> = {
  locked: {
    bg: "bg-surface-alt",
    text: "text-ink-subtle",
    label: "Locked",
  },
  start: {
    bg: "bg-surface-alt",
    text: "text-ink",
    label: "Start",
  },
  "in-progress": {
    bg: "bg-accent-soft",
    text: "text-accent",
    label: "In progress",
  },
  complete: {
    bg: "bg-success-soft",
    text: "text-success",
    label: "Complete",
  },
};

export function StatusPill({ status }: { status: Status }) {
  const { bg, text, label } = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] tracking-[0.08em] uppercase ${bg} ${text}`}
    >
      {status === "complete" && <Check size={14} />}
      {label}
    </span>
  );
}
