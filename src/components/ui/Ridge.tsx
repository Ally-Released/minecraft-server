import { ridge } from "@/lib/terrain";

/**
 * The horizon, continued.
 *
 * The same terrain generator that draws the hero draws these dividers, so the
 * silhouette running behind the page never breaks — sections are vantage
 * points on one landscape, not separate pages stacked together.
 */
export default function Ridge({
  seed,
  className = "",
  flip = false,
  fill = "#020a15",
  rim = 0.4,
  lightX = 68,
  block = 22,
  amplitude = 0.4,
  base = 0.72,
}: {
  seed: number;
  className?: string;
  flip?: boolean;
  fill?: string;
  rim?: number;
  lightX?: number;
  block?: number;
  amplitude?: number;
  base?: number;
}) {
  const r = ridge({ seed, height: 600, block, amplitude, base, octaves: 4, cliffs: 0.08 });
  const id = `ridge-${seed}`;

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 w-full ${flip ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <radialGradient id={id} cx={`${lightX}%`} cy="30%" r="42%">
          <stop offset="0%" stopColor="#8fdcff" stopOpacity={rim} />
          <stop offset="100%" stopColor="#8fdcff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={r.fill} fill={fill} />
      {rim > 0 && <path d={r.line} fill="none" stroke={`url(#${id})`} strokeWidth="3" />}
    </svg>
  );
}
