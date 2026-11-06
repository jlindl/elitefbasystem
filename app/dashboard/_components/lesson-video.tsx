"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Play } from "@/app/components/icons";
import { formatTime, toSeconds, videoSource, type LessonVideo } from "../_lib/lesson-videos";
import { readLocal, useLocalValue, writeLocal } from "../_lib/use-local-store";

/*
 * The lesson video: the player, a chapter list that jumps around the video, and (for video
 * files) resume-where-you-left-off, playback speed and a "Watched" tick. YouTube and Vimeo
 * videos get the chapters too; their own players handle speed and captions.
 */

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const COLLAPSED = 6;

/** Where the member got to (seconds), the video's length, and whether they've watched it. */
type Progress = { t: number; d: number; done: boolean };

function parseProgress(raw: string | null): Progress {
  try {
    const v = JSON.parse(raw ?? "");
    return { t: typeof v?.t === "number" ? v.t : 0, d: typeof v?.d === "number" ? v.d : 0, done: v?.done === true };
  } catch {
    return { t: 0, d: 0, done: false };
  }
}

export function LessonVideoPlayer({ video, title, storageKey }: { video: LessonVideo; title: string; storageKey: string }) {
  const source = useMemo(() => videoSource(video.src), [video.src]);
  const file = source.kind === "file";
  const chapters = useMemo(
    () => (video.chapters ?? []).map(([time, name]) => ({ at: toSeconds(time), name })).sort((a, b) => a.at - b.at),
    [video.chapters],
  );
  const key = `efba_video:${storageKey}`;
  const saved = parseProgress(useLocalValue(key));
  const watched = saved.done;

  const player = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const lastSave = useRef(0);
  const [now, setNow] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  // Offer to pick up where they left off, until they start playing or choose a chapter.
  const [dismissed, setDismissed] = useState(false);
  const resumeAt = file && !dismissed && saved.t > 15 && (!saved.d || saved.t < saved.d - 20) ? saved.t : null;
  const [rate, setRate] = useState(1);
  const [showAll, setShowAll] = useState(false);

  // Files report where they are; embeds only know which chapter you last chose.
  const currentChapter = file ? chapters.findLastIndex((c) => c.at <= now + 0.25) : picked ?? -1;

  function post(message: object) {
    const origin = source.kind === "youtube" ? "https://www.youtube-nocookie.com" : "https://player.vimeo.com";
    frame.current?.contentWindow?.postMessage(JSON.stringify(message), origin);
  }

  function playFrom(seconds: number) {
    setDismissed(true);
    if (source.kind === "file") {
      const v = player.current;
      if (!v) return;
      v.currentTime = seconds;
      void v.play().catch(() => {});
    } else if (source.kind === "youtube") {
      post({ event: "command", func: "seekTo", args: [seconds, true] });
      post({ event: "command", func: "playVideo", args: [] });
    } else {
      post({ method: "setCurrentTime", value: seconds });
      post({ method: "play" });
    }
  }

  function remember(v: HTMLVideoElement, force = false) {
    if (!v.duration) return;
    const prev = parseProgress(readLocal(key));
    const done = prev.done || v.currentTime / v.duration >= 0.9;
    if (!force && done === prev.done && Math.abs(v.currentTime - lastSave.current) < 5) return;
    lastSave.current = v.currentTime;
    // Only re-render readers when the "Watched" tick changes.
    writeLocal(key, JSON.stringify({ t: v.currentTime, d: v.duration, done }), { notify: done !== prev.done });
  }

  const shown = showAll || chapters.length <= COLLAPSED + 1 ? chapters : chapters.slice(0, COLLAPSED);

  return (
    <div className="mt-8">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        {source.kind === "file" ? (
          <video
            ref={player}
            src={source.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            crossOrigin={video.captions ? "anonymous" : undefined}
            aria-label={`Video: ${title}`}
            className="absolute inset-0 h-full w-full"
            onTimeUpdate={(e) => {
              setNow(e.currentTarget.currentTime);
              remember(e.currentTarget);
            }}
            onPlay={() => setDismissed(true)}
            onPause={(e) => remember(e.currentTarget, true)}
            onEnded={(e) => remember(e.currentTarget, true)}
          >
            {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" />}
          </video>
        ) : (
          <iframe
            ref={frame}
            src={
              source.kind === "youtube"
                ? `https://www.youtube-nocookie.com/embed/${source.id}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1`
                : `https://player.vimeo.com/video/${source.id}?${source.hash ? `h=${source.hash}&` : ""}dnt=1&title=0&byline=0&portrait=0`
            }
            title={`Video: ${title}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      {(resumeAt !== null || watched || file) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {resumeAt !== null && (
            <button type="button" onClick={() => playFrom(resumeAt)} className="btn btn-primary btn-aa h-10 px-4 text-[0.875rem]">
              <Play size={15} /> Resume from {formatTime(resumeAt)}
            </button>
          )}
          {watched && (
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 text-[0.8125rem] font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
              <Check size={14} strokeWidth={2.4} /> Watched
            </span>
          )}
          {file && (
            <div role="group" aria-label="Playback speed" className="ml-auto flex items-center gap-1 rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={rate === s}
                  onClick={() => {
                    setRate(s);
                    const v = player.current;
                    if (v) {
                      v.defaultPlaybackRate = s;
                      v.playbackRate = s;
                    }
                  }}
                  className={`min-h-9 min-w-11 rounded-full px-2.5 text-[0.8125rem] font-semibold tabular-nums transition-colors ${
                    rate === s ? "bg-white text-ink" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {s}×<span className="sr-only"> speed</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {chapters.length > 0 && (
        <div className="mt-6">
          <h2 className="text-[0.9375rem] font-semibold text-white/85">Chapters</h2>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {shown.map((c, i) => {
              const on = i === currentChapter;
              return (
                <li key={`${c.at}-${c.name}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setPicked(i);
                      playFrom(c.at);
                    }}
                    aria-current={on ? "true" : undefined}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[0.9375rem] leading-snug transition-colors ${
                      on ? "bg-white text-ink" : "text-white/85 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    <span className={`w-11 shrink-0 font-mono text-[0.8125rem] tabular-nums ${on ? "text-orange-800" : "text-[#ffb27a]"}`}>
                      <span className="sr-only">Play from </span>
                      {formatTime(c.at)}
                    </span>
                    <span className="min-w-0 flex-1">{c.name}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          {chapters.length > COLLAPSED + 1 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="mt-2 inline-flex min-h-11 items-center px-3 text-[0.875rem] font-medium text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
            >
              {showAll ? "Show fewer chapters" : `Show all ${chapters.length} chapters`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
