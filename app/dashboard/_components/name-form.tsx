"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { whatsappLink } from "../_lib/contact";
import { updateDisplayName } from "../_lib/profile-actions";

/** Shows the name printed on certificates, with an inline editor. */
export function NameForm({
  name,
  nameIsSet,
  locked = false,
  tone = "light",
}: {
  name: string;
  nameIsSet: boolean;
  /** The name is on issued certificates: only Jakub can change it. */
  locked?: boolean;
  tone?: "light" | "dark";
}) {
  const router = useRouter();
  const id = useId();
  const [editing, setEditing] = useState(!nameIsSet);
  const [value, setValue] = useState(nameIsSet ? name : "");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();
  const input = useRef<HTMLInputElement>(null);
  const change = useRef<HTMLButtonElement>(null);
  const savedName = useRef<HTMLParagraphElement>(null);
  const justSaved = useRef(false);
  const wasEditing = useRef(editing);

  // Move focus into the field when editing starts, and back to "Change" when it ends.
  useEffect(() => {
    if (editing && !wasEditing.current) input.current?.focus();
    if (!editing && wasEditing.current) {
      // After a save the name may now be locked (no "Change" button), so land on the name itself.
      (justSaved.current ? savedName.current : change.current)?.focus();
      justSaved.current = false;
    }
    wasEditing.current = editing;
  }, [editing]);

  const dark = tone === "dark";

  function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await updateDisplayName(value);
      if (!res.ok) {
        setError(res.error);
        input.current?.focus();
        return;
      }
      setValue(res.name);
      setStatus(`Saved. Your certificates now show ${res.name}.`);
      justSaved.current = true;
      setEditing(false);
      router.refresh();
    });
  }

  return (
    <div>
      {/* In edit mode the visible words are the field's real label (so voice control can target it). */}
      {editing ? (
        <label htmlFor={`${id}-name`} className={`block text-[0.875rem] font-medium ${dark ? "text-white/75" : "text-ink-muted"}`}>
          Name on your certificates
        </label>
      ) : (
        <p className={`text-[0.875rem] font-medium ${dark ? "text-white/75" : "text-ink-muted"}`}>Name on your certificates</p>
      )}
      {editing ? (
        <form onSubmit={save} className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <input
              ref={input}
              id={`${id}-name`}
              name="name"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
              autoComplete="name"
              maxLength={60}
              placeholder="Your full name, e.g. Sam Taylor"
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : `${id}-hint`}
              className={`h-12 w-full rounded-xl border px-4 text-[1rem] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-700 ${
                dark
                  ? "border-white/20 bg-white/10 text-white placeholder:text-white/45"
                  : "border-line bg-surface text-ink placeholder:text-ink-subtle"
              } ${error ? "border-rose-500" : ""}`}
            />
            {error ? (
              <p id={`${id}-error`} role="alert" className={`mt-1.5 text-[0.875rem] font-medium ${dark ? "text-rose-200" : "text-rose-700"}`}>
                {error}
              </p>
            ) : (
              <p id={`${id}-hint`} className={`mt-1.5 text-[0.875rem] ${dark ? "text-white/70" : "text-ink-muted"}`}>
                Use your real name. It&rsquo;s printed on every certificate you earn.
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={pending} className="btn btn-primary btn-aa h-12 disabled:opacity-70">
              {pending ? "Saving…" : "Save name"}
            </button>
            {nameIsSet && (
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setValue(name);
                  setError(null);
                }}
                className={`h-12 rounded-full px-4 text-[0.9375rem] font-medium ${dark ? "text-white/80 hover:bg-white/10" : "text-ink-muted hover:bg-surface-alt"}`}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <p ref={savedName} tabIndex={-1} className={`font-display text-[1.25rem] font-semibold outline-none ${dark ? "text-white" : "text-ink"}`}>
            {value || name}
          </p>
          {locked ? (
            <>
              <span className={`rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold ring-1 ${dark ? "bg-white/10 text-white ring-white/20" : "bg-surface-alt text-ink-muted ring-line"}`}>
                <span aria-hidden>🔒 </span>Locked
              </span>
              <a
                href={whatsappLink(`Hi Jakub, the name on my certificates needs correcting. It currently says "${value || name}" and should say: `)}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[0.875rem] font-semibold underline decoration-current/30 underline-offset-4 ${dark ? "text-white" : "text-ink"}`}
              >
                Ask Jakub to correct it<span className="sr-only"> (opens WhatsApp)</span>
              </a>
            </>
          ) : (
          <button
            ref={change}
            type="button"
            onClick={() => {
              setStatus("");
              setEditing(true);
            }}
            className={`rounded-full px-3 py-1.5 text-[0.875rem] font-semibold underline decoration-current/30 underline-offset-4 ${
              dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-surface-alt"
            }`}
          >
            Change<span className="sr-only"> the name on your certificates</span>
          </button>
          )}
        </div>
      )}
      <p aria-live="polite" className={`text-[0.875rem] ${status ? "mt-1.5" : ""} ${dark ? "text-emerald-200" : "text-emerald-800"}`}>
        {status}
      </p>
    </div>
  );
}
