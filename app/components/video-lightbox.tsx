"use client";

import { Photo } from "./photo";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "./icons";

const ZOOM_MS = 560;

type VideoLightboxProps = {
  youtubeId: string;
  poster: string;
  title: string;
  /** Where the thumbnail sat on the page, so the player can grow out of it. */
  origin: DOMRect | null;
  onClose: () => void;
};

/** Full-screen player that zooms out of (and back into) the thumbnail it was opened from. */
export function VideoLightbox({ youtubeId, poster, title, origin, onClose }: VideoLightboxProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [closing, setClosing] = useState(false);

  const toOrigin = () => {
    const el = frameRef.current;
    if (!el || !origin) return "scale(0.92)";
    const t = el.getBoundingClientRect();
    return `translate(${origin.left - t.left}px, ${origin.top - t.top}px) scale(${origin.width / t.width})`;
  };

  // FLIP: start at the thumbnail's position, then animate to the centre.
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.transformOrigin = "0 0";
    el.style.transform = toOrigin();
    el.getBoundingClientRect();
    el.style.transition = `transform ${ZOOM_MS}ms var(--ease-out-expo)`;
    el.style.transform = "none";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const close = () => {
    if (closing) return;
    setClosing(true);
    const el = frameRef.current;
    if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = toOrigin();
      window.setTimeout(onClose, ZOOM_MS - 80);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      <button
        type="button"
        aria-label="Close video"
        tabIndex={-1}
        onClick={close}
        className={`absolute inset-0 bg-ink/85 backdrop-blur-md transition-opacity duration-500 ${
          closing ? "opacity-0" : "lightbox-fade"
        }`}
      />

      <div ref={frameRef} className="relative w-full max-w-[min(1200px,calc((100svh-7rem)*16/9))]">
        <div className="relative aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
          <Photo src={poster} alt="" fill sizes="100vw" className="object-cover" />
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close video"
          className={`absolute -top-12 right-0 inline-flex h-10 items-center gap-2 rounded-full bg-white/10 pl-3 pr-4 text-[0.875rem] text-white backdrop-blur transition-[background-color,opacity] duration-300 hover:bg-white/20 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
        >
          <X size={16} />
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
