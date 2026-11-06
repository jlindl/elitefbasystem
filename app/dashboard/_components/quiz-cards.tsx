import type { Card, ImageMock } from "../_lib/mission-quizzes";

/** Renders any quiz card: a product fact card, a line of copy, or a mock listing image. */
export function QuizCard({ card, compact = false }: { card: Card; compact?: boolean }) {
  if (card.kind === "image") return <MockImage mock={card} />;
  if (card.kind === "text") {
    return (
      <span className="block text-left">
        <span className={`block leading-snug text-ink ${compact ? "text-[0.95rem]" : "text-[1.02rem]"}`}>{card.text}</span>
        {card.note && <span className="mt-1 block text-[0.8rem] text-ink-subtle">{card.note}</span>}
      </span>
    );
  }
  return (
    <span className="block text-left">
      <span className="flex items-center gap-3">
        <span aria-hidden className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-[1.5rem]">
          {card.emoji}
        </span>
        <span className="font-display text-[1rem] font-semibold leading-tight text-ink">{card.name}</span>
      </span>
      <span className="mt-3 grid gap-1.5">
        {card.facts.map((f) => (
          <span key={f.label} className="flex items-baseline justify-between gap-3 border-t border-line-soft pt-1.5 text-[0.88rem]">
            <span className="text-ink-muted">{f.label}</span>
            <span className="text-right font-semibold text-ink tabular-nums">{f.value}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Mock product photo - three tubes of hand cream, drawn in SVG       */
/* ------------------------------------------------------------------ */

function Tube({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="2" y="0" width="22" height="10" rx="2" fill="#2f3b4c" />
      <path d="M0 10 h26 v58 q0 8 -6 10 h-14 q-6 -2 -6 -10z" fill="#fbf6ef" stroke="#e3d9cc" strokeWidth="1" />
      <rect x="0" y="30" width="26" height="22" fill="#ff6b1a" />
      <rect x="4" y="36" width="18" height="3" rx="1.5" fill="#fff" opacity="0.9" />
      <rect x="6" y="42" width="14" height="2" rx="1" fill="#fff" opacity="0.7" />
      <rect x="0" y="12" width="6" height="56" fill="#fff" opacity="0.45" />
    </g>
  );
}

export function MockImage({ mock }: { mock: ImageMock }) {
  // Tube group is 86 x 80 units; scale it so it spans `fill` of the 100-unit frame.
  const scale = (mock.fill * 100) / 86;
  const w = 86 * scale;
  const h = 80 * scale;
  const tx = (100 - w) / 2 - (mock.infographic ? 18 : 0);
  const ty = (100 - h) / 2;

  return (
    <span className="relative block w-full overflow-hidden rounded-xl border border-line">
      <svg viewBox="0 0 100 100" className="block aspect-square w-full" role="img" aria-label={describe(mock)}>
        {mock.bg === "white" ? (
          <rect width="100" height="100" fill="#ffffff" />
        ) : (
          <>
            <defs>
              <pattern id="tiles" width="12.5" height="12.5" patternUnits="userSpaceOnUse">
                <rect width="12.5" height="12.5" fill="#d9cbb8" />
                <rect width="12" height="12" fill="#e9dccb" />
              </pattern>
            </defs>
            <rect width="100" height="72" fill="url(#tiles)" />
            <rect y="72" width="100" height="28" fill="#a98d6d" />
            <rect y="72" width="100" height="2" fill="#8a7155" />
          </>
        )}

        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          <Tube x={0} />
          <Tube x={30} />
          <Tube x={60} />
        </g>

        {mock.props?.map((p, i) => (
          <text key={i} x={i === 0 ? 4 : 78} y={i === 0 ? 92 : 30} fontSize="16">
            {p}
          </text>
        ))}

        {mock.hand && (
          <text x="62" y="98" fontSize="30" transform="rotate(-20 75 85)">
            ✋
          </text>
        )}

        {mock.watermark && (
          <text x="50" y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0a0a0a" opacity="0.18" transform="rotate(-28 50 50)">
            © SAMPLE PHOTO
          </text>
        )}

        {mock.badge && (
          <g transform="rotate(-12 22 16)">
            <rect x="3" y="8" width="40" height="14" rx="3" fill="#e11d48" />
            <text x="23" y="17.6" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff">
              {mock.badge}
            </text>
          </g>
        )}

        {mock.infographic?.map((label, i) => {
          const y = 22 + i * 24;
          return (
            <g key={label}>
              <line x1="60" y1={y + 4} x2="70" y2={y + 4} stroke="#ff6b1a" strokeWidth="0.8" />
              <rect x="70" y={y - 3} width="28" height="14" rx="3" fill="#fff1e8" stroke="#ff6b1a" strokeWidth="0.6" />
              <text x="84" y={y + 5.6} textAnchor="middle" fontSize="4.6" fontWeight="700" fill="#0a0a0a">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      {mock.caption && (
        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white">
          {mock.caption}
        </span>
      )}
    </span>
  );
}

function describe(m: ImageMock) {
  const parts = [m.bg === "white" ? "White background" : "Lifestyle background", `product fills about ${Math.round(m.fill * 100)}%`];
  if (m.badge) parts.push(`"${m.badge}" badge`);
  if (m.hand) parts.push("a hand in shot");
  if (m.watermark) parts.push("watermark");
  if (m.props?.length) parts.push("props");
  if (m.infographic) parts.push(`callouts: ${m.infographic.join(", ")}`);
  return parts.join(", ");
}
