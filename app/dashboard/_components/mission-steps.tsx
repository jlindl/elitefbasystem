"use client";

import { useId } from "react";
import {
  FLOOR,
  verdictReaction,
  presetNote,
  profitOf,
  shipmentIdOk,
  type MissionData,
  type Step,
  type StepData,
} from "../_lib/missions";
import { buzz } from "./confetti";
import { QuizCard } from "./quiz-cards";

type Props<S extends Step = Step> = {
  step: S;
  value: StepData;
  onChange: (v: StepData) => void;
  mission: MissionData;
  disabled?: boolean;
};

const gbp = (n: number) => n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

export function StepWidget(props: Props) {
  const { step } = props;
  switch (step.type) {
    case "checklist":
      return <Checklist {...(props as Props<typeof step>)} />;
    case "choice":
      return <Choice {...(props as Props<typeof step>)} />;
    case "verdict":
      return <Verdict {...props} />;
    case "pick-product":
      return <PickProduct {...(props as Props<typeof step>)} />;
    case "calculator":
      return <Calculator {...props} />;
    case "quiz":
      return null;
    case "shipment":
      return <Shipment {...props} />;
    case "sale":
      return <Sale {...props} />;
  }
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                        */
/* ------------------------------------------------------------------ */

const field =
  "w-full rounded-2xl border-2 border-line bg-white px-4 py-3.5 text-[1rem] text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-ink disabled:bg-surface-alt";

function Tip({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "good" | "warn" }) {
  const styles = {
    accent: "bg-accent-soft border-accent/30",
    good: "bg-emerald-50 border-emerald-200",
    warn: "bg-amber-50 border-amber-200",
  }[tone];
  return (
    <div className={`animate-in mt-5 flex gap-3 rounded-2xl border p-4 ${styles}`}>
      <span aria-hidden className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[0.7rem] font-semibold text-white">
        EF
      </span>
      <p className="text-[0.95rem] leading-relaxed text-ink">{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Widgets                                                            */
/* ------------------------------------------------------------------ */

function Checklist({ step, value, onChange, disabled }: Props<Extract<Step, { type: "checklist" }>>) {
  const done = new Set((value.done as string[]) ?? []);
  return (
    <div>
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle tabular-nums">
        {done.size} / {step.items.length} ready
      </p>
      <ul className="grid gap-2.5">
        {step.items.map((item) => {
          const on = done.has(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                disabled={disabled}
                aria-pressed={on}
                onClick={() => {
                  const next = new Set(done);
                  if (on) next.delete(item.id);
                  else {
                    next.add(item.id);
                    buzz();
                  }
                  onChange({ done: [...next] });
                }}
                className={`flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-all active:scale-[0.99] ${
                  on ? "border-emerald-400 bg-emerald-50" : "border-line bg-white hover:border-ink/25"
                }`}
              >
                <span
                  aria-hidden
                  className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[0.8rem] font-bold transition-all duration-300 ${
                    on ? "scale-110 border-emerald-500 bg-emerald-500 text-white" : "border-line text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className={`text-[0.975rem] ${on ? "text-ink" : "text-ink-muted"}`}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function OptionGrid({
  options,
  value,
  onPick,
  disabled,
}: {
  options: { value: string; label: string; emoji?: string; hint?: string }[];
  value: unknown;
  onPick: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className={`grid gap-2.5 ${options.length > 3 ? "sm:grid-cols-2" : options.length === 3 ? "sm:grid-cols-3" : "grid-cols-2"}`}>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            disabled={disabled}
            aria-pressed={on}
            onClick={() => {
              buzz();
              onPick(o.value);
            }}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 text-center transition-all active:scale-[0.97] ${
              on ? "border-ink bg-ink text-white shadow-[0_8px_0_0_#ff6b1a]" : "border-line bg-white text-ink hover:border-ink/30 shadow-[0_4px_0_0_var(--color-line)]"
            }`}
          >
            {o.emoji && <span className={`text-[2rem] leading-none transition-transform ${on ? "scale-110" : ""}`}>{o.emoji}</span>}
            <span className="font-display text-[1rem] font-semibold">{o.label}</span>
            {o.hint && <span className={`text-[0.78rem] ${on ? "text-white/70" : "text-ink-subtle"}`}>{o.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

function Choice({ step, value, onChange, disabled }: Props<Extract<Step, { type: "choice" }>>) {
  const v = value.value as string | undefined;
  return (
    <div>
      <OptionGrid options={step.options} value={v} onPick={(x) => onChange({ value: x })} disabled={disabled} />
      {v && step.reactions?.[v] && (
        <Tip key={v} tone={step.completeOn && !step.completeOn.includes(v) ? "accent" : "good"}>
          {step.reactions[v]}
        </Tip>
      )}
    </div>
  );
}

function Verdict({ value, onChange, mission, disabled }: Props) {
  const v = value.value as string | undefined;
  const reaction = verdictReaction(v, mission.numbers);
  return (
    <div>
      <OptionGrid
        options={[
          { value: "build", label: "Build it", emoji: "🏗️" },
          { value: "rework", label: "Rework it", emoji: "🔧", hint: "Different price or pack" },
          { value: "walk", label: "Walk away", emoji: "🚶" },
        ]}
        value={v}
        onPick={(x) => onChange({ value: x })}
        disabled={disabled}
      />
      {reaction && (
        <Tip key={v} tone={reaction.tone}>
          {reaction.text}
        </Tip>
      )}
    </div>
  );
}

function PickProduct({ step, value, onChange, disabled }: Props<Extract<Step, { type: "pick-product" }>>) {
  const pick = typeof value.pick === "number" ? value.pick : null;
  return (
    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
      {step.options.map((card, i) => {
        const on = pick === i;
        return (
          <button
            key={card.name}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={disabled}
            onClick={() => {
              buzz(8);
              onChange({ pick: i });
            }}
            className={`rounded-2xl border-2 p-3.5 text-left transition-all active:scale-[0.98] ${
              on ? "border-accent bg-accent-soft/60 shadow-[0_4px_0_0_#ff6b1a]" : "border-line bg-white shadow-[0_4px_0_0_var(--color-line)] hover:border-ink/25"
            }`}
          >
            <QuizCard card={card} />
          </button>
        );
      })}
    </div>
  );
}

function Slider({ label, value, max, step, onChange, disabled }: { label: string; value: number | null; max: number; step: number; onChange: (n: number) => void; disabled?: boolean }) {
  const id = useId();
  const v = value ?? 0;
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-[0.95rem] font-medium text-ink">
          {label}
        </label>
        <div className="relative w-[110px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle">£</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            disabled={disabled}
            aria-label={`${label} in pounds`}
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full rounded-xl border-2 border-line bg-white py-2 pl-7 pr-2 text-right font-display text-[1.05rem] font-semibold tabular-nums outline-none focus:border-ink"
          />
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={step}
        disabled={disabled}
        value={Math.min(v, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="money-range on-light mt-3 w-full"
        style={{ ["--fill" as string]: `${(Math.min(v, max) / max) * 100}%` }}
      />
    </div>
  );
}

function Calculator({ step, value, onChange, mission, disabled }: Props) {
  const note = presetNote(step, mission);
  const set = (k: string) => (n: number) => onChange({ ...value, [k]: Math.max(0, Math.round(n * 100) / 100) });
  const p = profitOf(value);
  const face = !p ? "🤔" : p.clears ? (p.margin >= 0.4 ? "🤑" : "🙂") : p.net > 0 ? "😬" : "💀";
  return (
    <div>
      <div className="grid gap-6 rounded-2xl border border-line bg-white p-5">
        <Slider label="You sell it for" value={(value.price as number) ?? null} max={60} step={0.5} onChange={set("price")} disabled={disabled} />
        <Slider label="It costs you" value={(value.cost as number) ?? null} max={40} step={0.25} onChange={set("cost")} disabled={disabled} />
        <Slider label="Amazon's fees" value={(value.fees as number) ?? null} max={30} step={0.25} onChange={set("fees")} disabled={disabled} />
      </div>

      <div
        className={`mt-4 rounded-2xl p-5 transition-colors duration-500 ${
          !p ? "bg-surface-alt" : p.clears ? "bg-emerald-600 text-white" : "bg-ink text-white"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] ${p ? "text-white/60" : "text-ink-subtle"}`}>Profit per bundle</p>
            <p className="mt-1 font-display text-[2.5rem] font-semibold leading-none tabular-nums">{p ? gbp(p.net) : "£-"}</p>
            <p className={`mt-1.5 text-[0.9rem] tabular-nums ${p ? "text-white/75" : "text-ink-muted"}`}>
              {p ? `${(p.margin * 100).toFixed(1)}% margin` : "Set a price to start"}
            </p>
          </div>
          <span aria-hidden className="text-[3rem] leading-none transition-transform duration-300" key={face}>
            {face}
          </span>
        </div>
        {p && (
          <div className="mt-4 grid grid-cols-2 gap-2 text-[0.8rem]">
            <span className={`rounded-full px-3 py-1.5 text-center font-medium ${p.net >= FLOOR.net ? "bg-white/20" : "bg-rose-500/80"}`}>
              {p.net >= FLOOR.net ? "✓" : "✗"} £5 net floor
            </span>
            <span className={`rounded-full px-3 py-1.5 text-center font-medium ${p.margin >= FLOOR.margin ? "bg-white/20" : "bg-rose-500/80"}`}>
              {p.margin >= FLOOR.margin ? "✓" : "✗"} 30% margin floor
            </span>
          </div>
        )}
      </div>
      {note && <Tip>{note}</Tip>}
    </div>
  );
}

function Shipment({ value, onChange, disabled }: Props) {
  const id = ((value.id as string) ?? "").toUpperCase();
  const units = (value.units as number) ?? 0;
  const ok = shipmentIdOk(id);
  return (
    <div className="grid gap-4">
      <div>
        <input
          disabled={disabled}
          value={id}
          onChange={(e) => onChange({ ...value, id: e.target.value.toUpperCase() })}
          placeholder="Shipment ID, e.g. FBA15XXXXXXX"
          aria-label="Shipment ID"
          className={`${field} font-mono uppercase tracking-[0.06em]`}
        />
        {id && (
          <p className={`mt-2 text-[0.85rem] ${ok ? "text-emerald-700" : "text-amber-700"}`}>
            {ok ? "✓ Looks like a valid Amazon shipment ID" : "Shipment IDs start with FBA - copy it from Send to Amazon"}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between rounded-2xl border-2 border-line bg-white p-3 pl-5">
        <span className="text-[0.95rem] font-medium text-ink">Units in the box</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled || units <= 0}
            aria-label="One fewer"
            onClick={() => onChange({ ...value, units: Math.max(0, units - 1) })}
            className="h-11 w-11 rounded-xl border-2 border-line text-[1.25rem] font-semibold text-ink active:scale-95 disabled:opacity-40"
          >
            −
          </button>
          <span className="w-12 text-center font-display text-[1.5rem] font-semibold tabular-nums" aria-live="polite">
            {units}
          </span>
          <button
            type="button"
            disabled={disabled}
            aria-label="One more"
            onClick={() => onChange({ ...value, units: units + 1 })}
            className="h-11 w-11 rounded-xl border-2 border-line text-[1.25rem] font-semibold text-ink active:scale-95 disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function Sale({ value, onChange, disabled }: Props) {
  return (
    <div className="grid gap-3">
      <input
        disabled={disabled}
        value={(value.product as string) ?? ""}
        onChange={(e) => onChange({ ...value, product: e.target.value })}
        placeholder="Which product sold?"
        aria-label="Product"
        className={field}
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle">£</span>
          <input
            disabled={disabled}
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={(value.price as number) ?? ""}
            onChange={(e) => onChange({ ...value, price: Number(e.target.value) })}
            placeholder="Sale price"
            aria-label="Sale price"
            className={`${field} pl-8`}
          />
        </div>
        <input
          disabled={disabled}
          type="date"
          value={(value.date as string) ?? ""}
          onChange={(e) => onChange({ ...value, date: e.target.value })}
          aria-label="Date of the sale"
          className={field}
        />
      </div>
    </div>
  );
}
