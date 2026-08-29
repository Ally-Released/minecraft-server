/**
 * Procedural blocky terrain.
 *
 * Everything in the environment is generated as stepped (axis-aligned) paths
 * rather than smooth curves — that stepping is what makes the silhouettes read
 * as Minecraft without a single block texture or logo. Deterministic from a
 * seed so server and client render identical markup.
 */

/** mulberry32 — small, fast, stable across runtimes. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type RidgeOptions = {
  seed: number;
  /** viewBox dimensions */
  width?: number;
  height?: number;
  /** quantisation step — the "block" size of this layer */
  block?: number;
  /** vertical span of the range, 0–1 of height */
  amplitude?: number;
  /** where the average ridgeline sits, 0–1 from the top */
  base?: number;
  /** number of overlapping frequencies; more = more jagged */
  octaves?: number;
  /** chance per column of a sheer cliff step */
  cliffs?: number;
};

export type Ridge = {
  /** closed path, for filling the mass of the mountain */
  fill: string;
  /** open polyline along the crest, for rim lighting */
  line: string;
};

export function ridge({
  seed,
  width = 1600,
  height = 600,
  block = 16,
  amplitude = 0.34,
  base = 0.55,
  octaves = 4,
  cliffs = 0.06,
}: RidgeOptions): Ridge {
  const rand = rng(seed);
  const cols = Math.ceil(width / block);

  // Layered sines stand in for noise: cheap, deterministic, and the sum of a
  // few octaves is indistinguishable from real noise at silhouette scale.
  const waves = Array.from({ length: octaves }, (_, k) => ({
    freq: (k + 1) * (0.6 + rand() * 1.5),
    phase: rand() * Math.PI * 2,
    amp: 1 / (k + 1.35),
  }));
  const norm = waves.reduce((s, w) => s + w.amp, 0);

  let steps = "";
  let prevY = NaN;
  let drift = 0;

  for (let i = 0; i <= cols; i++) {
    const t = i / cols;
    let h = 0;
    for (const w of waves) h += Math.sin(t * Math.PI * 2 * w.freq + w.phase) * w.amp;
    h /= norm;

    // occasional sheer face — natural ranges are not evenly noisy
    if (rand() < cliffs) drift += (rand() - 0.5) * amplitude * 0.9;
    drift *= 0.92;

    const raw = base * height - (h * 0.5 + drift) * amplitude * height;
    const y = Math.round(Math.min(height, Math.max(0, raw)) / block) * block;
    const x = i * block;

    if (i === 0) {
      steps += `M${x},${y}`;
    } else {
      // vertical face first, then the flat top: the classic Minecraft step
      if (y !== prevY) steps += `V${y}`;
      steps += `H${x}`;
    }
    prevY = y;
  }

  const end = cols * block;
  return {
    fill: `${steps}L${end},${height}L0,${height}Z`,
    line: steps,
  };
}

/**
 * A row of blocky conifers. Used as the near silhouette so the foreground has
 * organic rhythm the mountain ranges lack.
 */
export function treeline({
  seed,
  width = 1600,
  height = 240,
  block = 10,
  density = 0.85,
}: {
  seed: number;
  width?: number;
  height?: number;
  block?: number;
  density?: number;
}): string {
  const rand = rng(seed);
  let d = `M0,${height}`;
  let x = 0;

  while (x < width) {
    const gap = block * (1 + Math.floor(rand() * 3));
    if (rand() > density) {
      x += gap;
      d += `L${x},${height}`;
      continue;
    }

    const tiers = 3 + Math.floor(rand() * 3);
    const trunkH = Math.round((height * (0.35 + rand() * 0.5)) / block) * block;
    const halfW = block * (1 + Math.floor(rand() * 2));
    const top = height - trunkH;
    const cx = x + halfW * tiers * 0.5;

    // step up the left flank, across the crown, back down the right flank
    d += `L${x},${height}`;
    for (let k = tiers; k >= 1; k--) {
      const w = halfW * k * 0.55;
      const y = top + ((height - top) / tiers) * (k - 1);
      d += `L${cx - w},${y + (height - top) / tiers}L${cx - w},${y}`;
    }
    d += `L${cx},${top - block}L${cx + halfW * 0.55},${top}`;
    for (let k = 1; k <= tiers; k++) {
      const w = halfW * k * 0.55;
      const y = top + ((height - top) / tiers) * (k - 1);
      d += `L${cx + w},${y}L${cx + w},${y + (height - top) / tiers}`;
    }
    x = cx + halfW * tiers * 0.55 + gap;
    d += `L${x},${height}`;
  }

  return `${d}L${width},${height}L${width},${height}Z`;
}

/**
 * The structure. Hand-authored rather than generated — nature is procedural,
 * but something built by hand has to *look* built, and that contrast is the
 * whole story of the hero image.
 */
export const MONOLITH = {
  /** viewBox 200x340, anchored bottom-centre */
  body: [
    "M62,340 L62,150 L74,150 L74,116 L86,116 L86,86 L96,86 L96,54 L104,54",
    "L104,86 L114,86 L114,116 L126,116 L126,150 L138,150 L138,340 Z",
  ].join(" "),
  /** buttresses / outbuildings that give it scale */
  wings: [
    "M28,340 L28,214 L46,214 L46,190 L62,190 L62,340 Z",
    "M138,340 L138,196 L154,196 L154,224 L172,224 L172,340 Z",
    "M8,340 L8,258 L28,258 L28,340 Z",
    "M172,340 L172,272 L190,272 L190,340 Z",
  ],
  /** lit apertures — the only warm-ish points in the scene */
  windows: [
    [96, 62, 8, 10],
    [80, 126, 6, 8],
    [114, 126, 6, 8],
    [68, 176, 6, 8],
    [126, 176, 6, 8],
    [36, 226, 6, 8],
    [158, 236, 6, 8],
    [96, 96, 8, 12],
  ] as [number, number, number, number][],
};

/** Deterministic star field for the sky. */
export function stars(seed: number, count: number) {
  const rand = rng(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    // keep them out of the bottom third where the terrain sits
    y: rand() * 62,
    r: 0.4 + rand() * 1.1,
    o: 0.18 + rand() * 0.6,
    delay: rand() * 6,
  }));
}
