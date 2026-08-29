import type { ReactNode, SVGProps } from "react";

/**
 * One icon system for the whole network.
 *
 * Every glyph is drawn on the same 24-unit grid and, wherever the subject
 * allows, from axis-aligned rectangles — the shop has no product photography,
 * so these carry the entire visual identity of the catalogue.
 *
 * Rule of thumb that keeps them readable at 16px: no limb thinner than two
 * grid units, and no more than five distinct shapes per glyph. Curves appear
 * only where a blocky silhouette would stop being recognisable.
 *
 * Never render an emoji in place of one of these.
 */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "square" as const };
const CUT = "var(--color-abyss)";

const ICONS = {
  /* ── Weapons & combat ─────────────────────────────────────── */
  sword: (
    <>
      <path d="M10 1h4l1 3v10h-6V4z" />
      <path d="M6 14h12v3H6z" />
      <path d="M10 17h4v3h-4z" />
      <path d="M8 20h8v3H8z" />
    </>
  ),
  axe: (
    <>
      <path d="M10 1h4v22h-4z" />
      {/* a blade hung off the haft, not a rectangle — otherwise it reads as a flag */}
      <path d="M10 2L1 6v6l9 4z" />
    </>
  ),
  mace: (
    <>
      <path d="M10 14h4v9h-4z" />
      <path d="M6 1h12v4h2v5h-2v4H6v-4H4V5h2z" />
      <path d="M10 5h4v5h-4z" fill={CUT} />
    </>
  ),
  trident: (
    <>
      <path d="M10 8h4v15h-4z" />
      <path d="M2 1h3v8H2zM10 0h4v9h-4zM19 1h3v8h-3z" />
      <path d="M2 7h20v3H2z" />
    </>
  ),
  bow: (
    <>
      <path d="M2 5h3v14H2z" />
      <path d="M23 12l-8-6v4H6v4h9v4z" />
    </>
  ),
  crystal: (
    <>
      <path d="M12 1l7 7-7 7-7-7z" />
      <path d="M12 5l3 3-3 3-3-3z" fill={CUT} />
      <path d="M4 16h16v3H4zM7 20h10v3H7z" />
    </>
  ),
  totem: (
    <>
      <path d="M8 1h8v6H8z" />
      <path d="M4 8h16v5H4z" />
      <path d="M8 14h8v9H8z" />
      <path d="M10 3h4v2h-4z" fill={CUT} />
    </>
  ),
  fireball: (
    <>
      <path d="M13 1c0 3-1 4-2 6-1-1-2-1-2-3-3 3-4 5-4 8a7 7 0 0 0 14 0c0-4-3-7-6-11z" />
      <path d="M12 14c1.6 1.6 2.6 2.6 2.6 4.1a2.6 2.6 0 0 1-5.2 0c0-1.5 1-2.5 2.6-4.1z" fill={CUT} />
    </>
  ),
  pvp: (
    <>
      <path d="M3 1h4l14 14v4h-4L3 5z" />
      <path d="M21 1h-4L3 15v4h4L21 5z" />
    </>
  ),
  fist: (
    <>
      <path d="M4 8h11v3h5v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
      <path d="M6 4h9v4H6z" />
    </>
  ),
  sumo: (
    <>
      <path d="M8 1h8v6H8z" />
      <path d="M3 8h18v5H3z" />
      <path d="M6 14h12v4H6z" />
      <path d="M1 19h22v4H1z" />
    </>
  ),

  /* ── Armour & tools ───────────────────────────────────────── */
  chestplate: (
    <>
      <path d="M5 1h5v3h4V1h5l3 6v5h-4v11H6V12H2V7z" />
      <path d="M10 8h4v6h-4z" fill={CUT} />
    </>
  ),
  helmet: (
    <>
      <path d="M4 3h16v11h-4V9H8v5H4z" />
      <path d="M4 15h4v7H4zM16 15h4v7h-4z" />
    </>
  ),
  shield: (
    <>
      <path d="M3 2h18v10l-9 11-9-11z" />
      <path d="M10 6h4v9h-4z" fill={CUT} />
    </>
  ),
  pickaxe: (
    <>
      {/* flat crown, tips flaring down at the ends — the head reads wrong if
          the middle dips instead, which turns the whole glyph into a "Y" */}
      <path d="M2 10L4 3h16l2 7-5-2-5-1-5 1z" />
      <path d="M10 7h4v16h-4z" />
    </>
  ),
  hammer: (
    <>
      <path d="M3 2h13v6H3z" />
      <path d="M8 9h4v14H8z" />
    </>
  ),
  elytra: (
    <>
      <path d="M10 3h4v18h-4z" />
      <path d="M10 6L1 12l2 8 7-6zM14 6l9 6-2 8-7-6z" />
    </>
  ),

  /* ── Storage & stations ───────────────────────────────────── */
  chest: (
    <>
      <path d="M2 3h20v6H2z" />
      <path d="M2 10h20v11H2z" />
      <path d="M10 7h4v7h-4z" fill={CUT} />
    </>
  ),
  enderchest: (
    <>
      <path d="M2 3h20v18H2z" />
      <path d="M12 5l7 7-7 7-7-7z" fill={CUT} />
      <path d="M12 9l3 3-3 3-3-3z" />
    </>
  ),
  anvil: (
    <>
      <path d="M2 3h20v5H2z" />
      <path d="M7 9h10v3H7z" />
      <path d="M4 13h16v3H4z" />
      <path d="M2 19h20v4H2z" />
      <path d="M9 16h6v3H9z" />
    </>
  ),
  crafting: (
    <>
      <path d="M1 2h22v20H1z" />
      <path d="M4 5h5v5H4zM11 5h5v5h-5zM18 5h2v5h-2zM4 12h5v5H4zM11 12h5v5h-5zM18 12h2v5h-2z" fill={CUT} />
    </>
  ),
  key: (
    <>
      <path d="M1 5h9v9H1z" />
      <path d="M4 8h3v3H4z" fill={CUT} />
      <path d="M10 8h13v3h-3v3h-3v-3h-2v3h-3v-3h-2z" />
    </>
  ),
  ticket: (
    <>
      <path d="M1 4h22v6a2 2 0 0 0 0 4v6H1v-6a2 2 0 0 0 0-4z" />
      <path d="M10 7h4v10h-4z" fill={CUT} />
    </>
  ),
  coin: (
    <>
      <path d="M3 7h18v10H3z" />
      <path d="M6 4h12v3H6zM6 17h12v3H6z" />
      <path d="M10 10h4v4h-4z" fill={CUT} />
    </>
  ),

  /* ── Utility commands ─────────────────────────────────────── */
  home: (
    <>
      <path d="M12 1l11 10h-3v12H4V11H1z" />
      <path d="M9 15h6v8H9z" fill={CUT} />
    </>
  ),
  fly: (
    <>
      <path d="M12 1l9 9h-6v5H9v-5H3z" />
      <path d="M3 17h18v3H3zM6 21h12v2H6z" />
    </>
  ),
  feed: (
    <>
      <path d="M12 5C7 2 2 6 2 11s5 12 10 12 10-7 10-12S17 2 12 5z" />
      <path d="M11 0h3v5h-3z" fill={CUT} />
    </>
  ),
  repair: (
    <>
      <path d="M3 1h12v6H3z" />
      <path d="M7 8h4v15H7z" />
      <path d="M16 11h6v4h-6zM16 17h6v4h-6z" />
    </>
  ),
  nick: (
    <>
      <path d="M1 5h14l8 7-8 7H1z" />
      <path d="M4 10h4v4H4z" fill={CUT} />
    </>
  ),
  speed: (
    <>
      <path d="M1 5h13v3H1zM4 11h12v3H4zM1 17h10v3H1z" />
      <path d="M18 3h5v4h-5zM18 17h5v4h-5z" />
    </>
  ),
  potion: (
    <>
      <path d="M8 1h8v4H8z" />
      <path d="M7 6h10v4l3 5v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5l3-5z" />
      <path d="M6 15h12v5H6z" fill={CUT} />
    </>
  ),
  heart: (
    <>
      <path d="M3 3h6v3h6V3h6v6h-2v3h-2v3h-2v3h-2v3H9v-3H7v-3H5V9H3z" />
    </>
  ),

  /* ── Modes & places ───────────────────────────────────────── */
  bed: (
    <>
      <path d="M1 4h4v12H1z" />
      <path d="M5 9h18v7H5z" />
      <path d="M7 5h6v4H7z" />
      <path d="M1 17h4v4H1zM19 17h4v4h-4z" />
    </>
  ),
  bridge: (
    <>
      <path d="M1 7h6v4H1zM17 7h6v4h-6z" />
      <path d="M7 11h10v4H7z" />
      <path d="M3 15h3v8H3zM18 15h3v8h-3z" />
    </>
  ),
  spleef: (
    <>
      <path d="M9 1h6v9H9z" />
      <path d="M4 11h16v4l-8 8-8-8z" />
    </>
  ),
  horse: (
    <>
      <path d="M6 23V12L2 10l4-3 2-5h6l2 5v4l-2 2v10h-4v-7H10v7z" />
    </>
  ),
  minecart: (
    <>
      <path d="M1 6h22v10H1z" />
      <path d="M4 9h16v4H4z" fill={CUT} />
      <path d="M4 17h5v5H4zM15 17h5v5h-5z" />
    </>
  ),
  door: (
    <>
      <path d="M3 1h18v22H3z" />
      <path d="M6 4h12v16H6z" fill={CUT} />
      <path d="M14 11h3v3h-3z" />
    </>
  ),
  arena: (
    <>
      <path d="M1 3h22v18H1z" fill="none" stroke="currentColor" strokeWidth={2.5} />
      <path d="M1 10h6v4H1zM17 10h6v4h-6z" />
      <path d="M9 9h6v6H9z" />
    </>
  ),
  block: (
    <>
      <path d="M12 1l10 5v12l-10 5-10-5V6z" />
      <path d="M12 6l6 3v6l-6 3-6-3V9z" fill={CUT} />
    </>
  ),
  void: (
    <>
      <path d="M12 1l10 5v12l-10 5-10-5V6z" fill="none" stroke="currentColor" strokeWidth={2.5} />
      <path d="M8 9h8v6H8z" />
    </>
  ),
  world: (
    <>
      <path d="M12 1a7 11 0 0 1 0 22a7 11 0 0 1 0-22z" {...S} />
      <path d="M1 12h22M3 6h18M3 18h18" {...S} />
      <path d="M12 1v22" {...S} />
    </>
  ),

  /* ── System ───────────────────────────────────────────────── */
  player: (
    <>
      <path d="M5 2h14v13H5z" />
      <path d="M8 7h3v3H8zM13 7h3v3h-3z" fill={CUT} />
      <path d="M3 17h18v5H3z" />
    </>
  ),
  server: (
    <>
      <path d="M2 2h20v7H2zM2 11h20v7H2z" />
      <path d="M4 4h3v3H4zM4 13h3v3H4z" fill={CUT} />
      <path d="M7 20h10v3H7z" />
    </>
  ),
  cart: (
    <>
      <path d="M1 2h4l1.5 4H23l-3 10H8L6 6" {...S} />
      <path d="M8 18h4v4H8zM16 18h4v4h-4z" />
    </>
  ),
  tag: (
    <>
      <path d="M1 3h12l10 9-10 9H1z" fill="none" stroke="currentColor" strokeWidth={2.5} />
      <path d="M5 9h4v6H5z" />
    </>
  ),
  tier: (
    <>
      <path d="M1 16h5v7H1zM10 10h5v13h-5zM19 3h5v20h-5z" />
    </>
  ),
  check: <path d="M2 12l3.5-3.5L10 13l8.5-8.5L22 8 10 20z" />,
  minus: <path d="M4 11h16v3H4z" />,
  arrow: <path d="M3 10h12V5l8 7-8 7v-5H3z" />,
  chevron: <path d="M8 2l10 10-10 10-3.5-3.5L11 12 4.5 5.5z" />,
  plus: <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" />,
  discord: (
    <path d="M19.3 5.3A16 16 0 0 0 15.4 4l-.3.5a12 12 0 0 1 3.4 1.7 15 15 0 0 0-12.9 0A12 12 0 0 1 9 4.5L8.6 4a16 16 0 0 0-3.9 1.3C2.2 9 1.5 12.6 1.9 16.2A16 16 0 0 0 6.7 18l1-1.4a10 10 0 0 1-1.6-.8l.4-.3a11 11 0 0 0 9 0l.4.3a10 10 0 0 1-1.6.8l1 1.4a16 16 0 0 0 4.8-1.8c.5-4.2-.7-7.8-2.8-10.9zM8.6 14c-1 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2zm6.8 0c-1 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2z" />
  ),
} as const;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export default function Icon({
  name,
  size = 20,
  className,
  ...rest
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      shapeRendering="geometricPrecision"
      aria-hidden
      focusable="false"
      className={className}
      {...rest}
    >
      {ICONS[name] as ReactNode}
    </svg>
  );
}
