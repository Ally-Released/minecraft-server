/**
 * The rank emblem.
 *
 * The store has no product artwork, so this stands in for it — and it is not
 * decoration: the emblem's complexity is derived from the tier index, so the
 * top rank is visibly the most elaborate object in the catalogue and you can
 * read the ladder from the shapes alone.
 */
export default function RankEmblem({
  tier,
  accent,
  size = 220,
  className = "",
}: {
  /** 0-based position in the ladder. */
  tier: number;
  accent: string;
  size?: number;
  className?: string;
}) {
  const rings = Math.min(tier, 3);
  const pips = 4 + tier * 2;
  const id = `emb-${tier}-${accent.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-core`} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="42%" stopColor={accent} stopOpacity="0.85" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.12" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* pips around the rim — one pair added per tier */}
      {Array.from({ length: pips }, (_, i) => {
        const a = (i / pips) * Math.PI * 2 - Math.PI / 2;
        const r = 92;
        return (
          <rect
            key={i}
            x={100 + Math.cos(a) * r - 3}
            y={100 + Math.sin(a) * r - 3}
            width="6"
            height="6"
            fill={accent}
            opacity={i % 2 === 0 ? 0.85 : 0.35}
          />
        );
      })}

      {/* outer dashed orbit, only once the ladder gets serious */}
      {tier >= 2 && (
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          strokeDasharray="3 9"
          opacity="0.5"
          className="origin-center animate-spin [animation-duration:60s]"
        />
      )}

      {/* stacked frames: one per tier, rotated 45° apart */}
      {Array.from({ length: rings + 1 }, (_, i) => {
        const inset = 26 + i * 9;
        return (
          <rect
            key={i}
            x={inset}
            y={inset}
            width={200 - inset * 2}
            height={200 - inset * 2}
            fill="none"
            stroke={accent}
            strokeWidth={i === 0 ? 2 : 1}
            opacity={i === 0 ? 0.9 : 0.35}
            transform={`rotate(${i * 45} 100 100)`}
          />
        );
      })}

      {/* the block itself */}
      <g transform="translate(100 100)">
        <path d="M0 -44L38 -22V22L0 44L-38 22V-22Z" fill={`url(#${id}-core)`} />
        <path
          d="M0 -44L38 -22V22L0 44L-38 22V-22Z"
          fill="none"
          stroke={`url(#${id}-edge)`}
          strokeWidth="2"
        />
        <path d="M0 -44L38 -22L0 0L-38 -22Z" fill="#ffffff" opacity="0.18" />
        <path d="M0 0L38 -22V22L0 44Z" fill="#000000" opacity="0.22" />
      </g>

      {/* crown notch for the final rank */}
      {tier >= 5 && (
        <path
          d="M78 24h8v-8h8v8h8v-8h8v8h8v8H78z"
          fill={accent}
          opacity="0.9"
        />
      )}
    </svg>
  );
}
