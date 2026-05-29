"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowRight } from "@/app/components/icons";
import { Card } from "./ui/card";

const suggestions = [
  "What should I focus on this week?",
  "Walk me through how PPC budget allocation should change after launch.",
  "How do I tell if a supplier quote is reasonable?",
  "Draft a polite MOQ-pushback message I can send to a supplier.",
];

export function AiPartnerCard() {
  const {
    messages,
    stop,
    setMessages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai",
    }),
  });

  const [input, setInput] = useState("");

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    void sendMessage({ text: input });
    setInput("");
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, isLoading]);

  function reset() {
    stop();
    setMessages([]);
  }

  const isEmpty = messages.length === 0;

  return (
    <section
      id="ai-partner"
      className="dash-fade scroll-mt-20"
      style={{ ["--dash-delay" as string]: "180ms" }}
    >
      <Card className="!p-0 overflow-hidden flex flex-col h-[600px] md:h-[640px]">
        {/* Header */}
        <header className="flex items-center justify-between gap-3 px-5 md:px-6 py-4 border-b border-line bg-surface">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
              <span className="font-display text-[0.85rem] font-semibold tracking-tight">
                EF
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.9rem] font-medium text-ink">
                Elite FBA AI Partner
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink-subtle">
                Private · Powered by OpenAI
              </span>
            </div>
          </div>
          {!isEmpty && (
            <button
              type="button"
              onClick={reset}
              className="text-[0.8rem] text-ink-muted hover:text-ink transition-colors"
            >
              New chat
            </button>
          )}
        </header>

        {/* Thread */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 md:px-6 py-6 space-y-5"
          style={{
            background:
              "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-alt) 100%)",
          }}
        >
          {isEmpty ? (
            <EmptyState
              onPick={(s) => void sendMessage({ text: s })}
              streaming={isLoading}
            />
          ) : (
            messages.map((m, i) => (
              <Bubble
                key={m.id || i}
                role={m.role as "user" | "assistant"}
                text={m.content}
                streaming={
                  isLoading &&
                  i === messages.length - 1 &&
                  m.role === "assistant"
                }
              />
            ))
          )}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <Bubble role="assistant" text="" thinking={true} />
          )}
          {error && (
            <div className="rounded-xl border border-line bg-surface px-4 py-3 text-[0.85rem] text-ink-muted">
              <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-accent">
                Error ·{" "}
              </span>
              {error.message || "Something went wrong."}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-line bg-surface px-4 md:px-5 py-4"
        >
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              rows={1}
              placeholder="Ask anything about your business, the program, this week…"
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent px-1 py-2 text-[0.95rem] leading-[1.5] text-ink placeholder:text-ink-subtle focus:outline-none disabled:opacity-50"
              style={{ maxHeight: 140 }}
            />
            <button
              type="submit"
              disabled={!input?.trim() || isLoading}
              aria-label="Send"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(255,107,26,0.32)] disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <p className="mt-2 px-1 font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-subtle">
            Enter to send · Shift+Enter for newline · AI may be wrong -
            confirm specifics with Jakub
          </p>
        </form>
      </Card>
    </section>
  );
}

/* ─────────────  Sub-components  ───────────── */

function EmptyState({
  onPick,
  streaming,
}: {
  onPick: (s: string) => void;
  streaming: boolean;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="space-y-4">
        <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.7rem] font-medium tracking-wide text-accent">
          Live · Ready
        </span>
        <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-medium tracking-[-0.015em] leading-[1.2] text-ink">
          Hey - how can I help today?
        </h3>
        <p className="text-[0.975rem] text-ink-muted leading-[1.65] max-w-[520px]">
          I&rsquo;m the AI partner trained on the Elite FBA system,
          curriculum, SOPs, and Jakub&rsquo;s playbook. Use me between
          1-to-1s to unblock yourself in minutes - or pick a starter
          below.
        </p>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-2.5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            disabled={streaming}
            className="group text-left rounded-xl bg-surface hairline px-4 py-3.5 transition-all duration-200 hover:-translate-y-px hover:border-ink/15 hover:shadow-[var(--shadow-soft)] disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <span className="text-[0.9rem] text-ink leading-[1.45]">{s}</span>
            <span className="mt-2 flex items-center gap-1 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle group-hover:text-accent transition-colors">
              Ask <ArrowRight size={12} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Bubble({
  role,
  text,
  streaming,
  thinking,
}: {
  role: "user" | "assistant";
  text: string;
  streaming?: boolean;
  thinking?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <span
        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-medium ${
          isUser ? "bg-accent text-white" : "bg-ink text-white"
        }`}
      >
        {isUser ? "You" : "EF"}
      </span>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-[1.6] ${
          isUser
            ? "bg-accent text-white"
            : "bg-surface hairline text-ink shadow-[var(--shadow-soft)]"
        }`}
      >
        {thinking ? (
          <ThinkingAnimation />
        ) : text ? (
          <span className="whitespace-pre-wrap">{text}</span>
        ) : null}
        
        {streaming && text && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1em] w-[2px] -mb-[2px] bg-current align-middle"
            style={{ animation: "ring-pulse 1.2s infinite" }}
          />
        )}
      </div>
    </div>
  );
}

function ThinkingAnimation() {
  return (
    <div className="flex items-center gap-2 text-ink-muted text-[0.85rem] font-medium py-0.5">
      <span className="inline-flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent/70"
            style={{
              animation: "ring-pulse 1.2s ease-in-out infinite",
              animationDelay: `${i * 160}ms`,
            }}
          />
        ))}
      </span>
      <span>Thinking...</span>
    </div>
  );
}
