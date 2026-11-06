// Tiny dependency-free confetti. Draws on a temporary full-screen canvas and
// removes itself when the last piece has fallen.

const COLOURS = ["#ff6b1a", "#ffb347", "#0a0a0a", "#1f7a4d", "#00a8e1", "#ffd166"];

export function fireConfetti({ big = false, originY = 0.6, container = null }: { big?: boolean; originY?: number; container?: HTMLElement | null } = {}) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "100",
  });
  (container ?? document.body).appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const w = window.innerWidth;
  const h = window.innerHeight;
  const count = big ? 220 : 90;
  const bursts = big ? [0.2, 0.5, 0.8] : [0.5];
  const pieces = Array.from({ length: count }, (_, i) => {
    const ox = bursts[i % bursts.length] * w;
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * (big ? 1.6 : 1.2);
    const speed = (big ? 11 : 9) + Math.random() * 7;
    return {
      x: ox,
      y: h * originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      colour: COLOURS[i % COLOURS.length],
      round: Math.random() < 0.3,
    };
  });

  const start = performance.now();
  const frame = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, w, h);
    let alive = 0;
    for (const p of pieces) {
      p.vy += 0.32;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y < h + 40) alive++;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - 1800) / 900);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.colour;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }
    if (alive && t < 2800) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

/** A light buzz on phones that support it. */
export function buzz(pattern: number | number[] = 12) {
  try {
    navigator.vibrate?.(pattern);
  } catch {}
}
