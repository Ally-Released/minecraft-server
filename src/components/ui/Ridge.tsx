import { ridge } from "@/lib/terrain";

/**
 * The horizon, continued.
 *
 * The same terrain generator that draws the hero draws these, so the
 * silhouette running behind the page never breaks — sections are vantage
 * points on one landscape, not separate pages stacked together.
 *
 * `height` is the viewBox height and must roughly match the aspect ratio of
 * the box it is dropped into: the SVG uses `slice`, so a 600-unit viewBox in a
 * 100px-tall band crops to solid rock below the crest.
 */
export default function Ridge({
  seed,
  className = "",
  flip = false,
  fill = "#0b2140",
  rim = 0.45,
  lightX = 68,
  height = 220,
  block = 18,
  amplitude = 0.66,
  base = 0.92,
  peaks = 3.2,
  octaves = 3,
}: {
  seed: number;
  className?: string;
  flip?: boolean;
  fill?: string;
  rim?: number;
  lightX?: number;
  height?: number;
  block?: number;
  amplitude?: number;
  base?: number;
  peaks?: number;
  octaves?: number;
}) {
  const r = ridge({ seed, height, block, amplitude, base, octaves, peaks, cliffs: 0.03 });
  const id = `ridge-${seed}`;

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 w-full ${flip ? "rotate-180" : ""} ${className}`}
      viewBox={`0 0 1600 ${height}`}
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
