import type { IconName } from "@/components/ui/Icon";

/* ══════════════════════════════════════════════════════════════
   STORE CATALOGUE

   Every price, perk, command and stat on the store comes from this
   file. Nothing is hardcoded in a component.

   The perk lists are transcribed *literally* from the server's own
   rank descriptions. They are deliberately not "filled in" upward:
   if a tier does not list /feed, the store does not promise /feed.
   See CUMULATIVE_PERKS below.
   ══════════════════════════════════════════════════════════════ */

/**
 * Minecraft rank ladders usually inherit everything from the tier below, but
 * the supplied rank lists do not read that way (e.g. /feed appears on VIP and
 * VIP+ but not on LEGEND). Rather than guess, the store shows exactly what was
 * supplied. Flip this to `true` only once the in-game ranks really are
 * cumulative — the comparison table and product pages both respect it.
 */
export const CUMULATIVE_PERKS = false;

export type RarityKey =
  | "uncommon"
  | "rare"
  | "epic"
  | "electric"
  | "cyan"
  | "legendary";

/**
 * A rarity ladder, not a set of brand colours. Everything stays inside the
 * site's blue system; the ramp climbs from cold teal to a white-hot ice.
 */
export const RARITY: Record<RarityKey, { label: string; accent: string; soft: string }> = {
  uncommon: { label: "Uncommon", accent: "#2fb9a4", soft: "rgba(47,185,164,0.16)" },
  rare: { label: "Rare", accent: "#2b7fd4", soft: "rgba(43,127,212,0.18)" },
  epic: { label: "Epic", accent: "#6f6cf5", soft: "rgba(111,108,245,0.18)" },
  electric: { label: "Electric", accent: "#4da3ff", soft: "rgba(77,163,255,0.2)" },
  cyan: { label: "Radiant", accent: "#55d6ff", soft: "rgba(85,214,255,0.2)" },
  legendary: { label: "Legendary", accent: "#dcefff", soft: "rgba(220,239,255,0.22)" },
};

export type Stat = { icon: IconName; label: string; value: string };
export type Command = { cmd: string; label: string; icon: IconName };

export type Rank = {
  id: string;
  name: string;
  price: number;
  rarity: RarityKey;
  tagline: string;
  /** Headline metadata — rendered as Minecraft item stats. */
  stats: Stat[];
  commands: Command[];
  /** Everything that is neither gear nor a command. */
  extras: Stat[];
  badge?: string;
};

export type CompareRow = {
  label: string;
  icon: IconName;
  group: string;
  /** One entry per rank, in catalogue order. `true` = included, `null` = not included. */
  values: (string | number | true | null)[];
};

export type Catalogue = {
  id: string;
  name: string;
  slug: string;
  eyebrow: string;
  headline: string;
  blurb: string;
  /** Drives the section's environmental tint without leaving the blue system. */
  accent: string;
  ranks: Rank[];
  compare: CompareRow[];
};

/* ── Survival ─────────────────────────────────────────────────── */

const SURVIVAL_RANKS: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    price: 140,
    rarity: "uncommon",
    tagline: "The first step off the ground floor.",
    stats: [
      { icon: "chestplate", label: "Protection", value: "IV" },
      { icon: "sword", label: "Sharpness", value: "V" },
      { icon: "pickaxe", label: "Efficiency", value: "V" },
    ],
    commands: [
      { cmd: "/kit vip", label: "Rank kit", icon: "chest" },
      { cmd: "/feed", label: "Refill hunger", icon: "feed" },
      { cmd: "/echest", label: "Ender chest anywhere", icon: "enderchest" },
    ],
    extras: [
      { icon: "helmet", label: "Armour tier", value: "Diamond" },
      { icon: "home", label: "Homes", value: "2" },
    ],
  },
  {
    id: "vip-plus",
    name: "VIP+",
    price: 250,
    rarity: "rare",
    tagline: "Better gear, and a forge in your pocket.",
    stats: [
      { icon: "chestplate", label: "Protection", value: "V" },
      { icon: "sword", label: "Sharpness", value: "VI" },
      { icon: "pickaxe", label: "Efficiency", value: "VI" },
    ],
    commands: [
      { cmd: "/kit vip+", label: "Rank kit", icon: "chest" },
      { cmd: "/feed", label: "Refill hunger", icon: "feed" },
      { cmd: "/echest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/anvil", label: "Portable anvil", icon: "anvil" },
    ],
    extras: [
      { icon: "helmet", label: "Armour tier", value: "Diamond" },
      { icon: "home", label: "Homes", value: "3" },
    ],
  },
  {
    id: "royal",
    name: "ROYAL",
    price: 390,
    rarity: "epic",
    tagline: "A full workshop, wherever you are standing.",
    stats: [
      { icon: "chestplate", label: "Protection", value: "VI" },
      { icon: "sword", label: "Sharpness", value: "VII" },
      { icon: "pickaxe", label: "Efficiency", value: "VII" },
    ],
    commands: [
      { cmd: "/kit royal", label: "Rank kit", icon: "chest" },
      { cmd: "/echest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/anvil", label: "Portable anvil", icon: "anvil" },
      { cmd: "/craft", label: "Portable crafting", icon: "crafting" },
    ],
    extras: [
      { icon: "helmet", label: "Armour tier", value: "Diamond" },
      { icon: "home", label: "Homes", value: "5" },
    ],
  },
  {
    id: "royal-plus",
    name: "ROYAL+",
    price: 550,
    rarity: "electric",
    tagline: "Netherite on your back and the sky opened up.",
    badge: "Most popular",
    stats: [
      { icon: "chestplate", label: "Protection", value: "V" },
      { icon: "sword", label: "Sharpness", value: "VIII" },
      { icon: "pickaxe", label: "Efficiency", value: "VIII" },
    ],
    commands: [
      { cmd: "/kit royal+", label: "Rank kit", icon: "chest" },
      { cmd: "/fly", label: "Creative flight", icon: "fly" },
      { cmd: "/echest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/anvil", label: "Portable anvil", icon: "anvil" },
      { cmd: "/nick", label: "Change nickname", icon: "nick" },
    ],
    extras: [
      { icon: "helmet", label: "Armour tier", value: "Netherite" },
      { icon: "home", label: "Homes", value: "7" },
    ],
  },
  {
    id: "royal-plus-plus",
    name: "ROYAL++",
    price: 730,
    rarity: "cyan",
    tagline: "Repair on demand and eyes on everyone nearby.",
    stats: [
      { icon: "chestplate", label: "Protection", value: "VI" },
      { icon: "sword", label: "Sharpness", value: "IX" },
      { icon: "pickaxe", label: "Efficiency", value: "IX" },
    ],
    commands: [
      { cmd: "/kit royal++", label: "Rank kit", icon: "chest" },
      { cmd: "/fly", label: "Creative flight", icon: "fly" },
      { cmd: "/echest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/anvil", label: "Portable anvil", icon: "anvil" },
      { cmd: "/repair", label: "Repair held item", icon: "repair" },
      { cmd: "/near", label: "Players nearby", icon: "player" },
    ],
    extras: [
      { icon: "helmet", label: "Armour tier", value: "Netherite" },
      { icon: "home", label: "Homes", value: "10" },
    ],
  },
  {
    id: "legend",
    name: "LEGEND",
    price: 910,
    rarity: "legendary",
    tagline: "The ceiling of the survival ladder.",
    stats: [
      { icon: "chestplate", label: "Protection", value: "VII" },
      { icon: "sword", label: "Sharpness", value: "X" },
      { icon: "pickaxe", label: "Efficiency", value: "X" },
    ],
    commands: [
      { cmd: "/kit legend", label: "Rank kit", icon: "chest" },
      { cmd: "/fly", label: "Creative flight", icon: "fly" },
      { cmd: "/echest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/anvil", label: "Portable anvil", icon: "anvil" },
      { cmd: "/repair all", label: "Repair full inventory", icon: "repair" },
      { cmd: "/craft", label: "Portable crafting", icon: "crafting" },
      { cmd: "/nick", label: "Change nickname", icon: "nick" },
    ],
    extras: [
      { icon: "helmet", label: "Armour tier", value: "Netherite" },
      { icon: "home", label: "Homes", value: "15" },
    ],
  },
];

const SURVIVAL_COMPARE: CompareRow[] = [
  {
    label: "Armour tier",
    icon: "helmet",
    group: "Gear",
    values: ["Diamond", "Diamond", "Diamond", "Netherite", "Netherite", "Netherite"],
  },
  { label: "Protection", icon: "chestplate", group: "Gear", values: ["IV", "V", "VI", "V", "VI", "VII"] },
  { label: "Sharpness", icon: "sword", group: "Gear", values: ["V", "VI", "VII", "VIII", "IX", "X"] },
  { label: "Efficiency", icon: "pickaxe", group: "Gear", values: ["V", "VI", "VII", "VIII", "IX", "X"] },
  {
    label: "Kit",
    icon: "chest",
    group: "Gear",
    values: ["/kit vip", "/kit vip+", "/kit royal", "/kit royal+", "/kit royal++", "/kit legend"],
  },
  { label: "Homes", icon: "home", group: "World", values: [2, 3, 5, 7, 10, 15] },
  { label: "Flight", icon: "fly", group: "World", values: [null, null, null, true, true, true] },
  { label: "Nearby players", icon: "player", group: "World", values: [null, null, null, null, true, null] },
  { label: "Ender chest", icon: "enderchest", group: "Utility", values: [true, true, true, true, true, true] },
  { label: "Portable anvil", icon: "anvil", group: "Utility", values: [null, true, true, true, true, true] },
  { label: "Portable crafting", icon: "crafting", group: "Utility", values: [null, null, true, null, null, true] },
  {
    label: "Repair",
    icon: "repair",
    group: "Utility",
    values: [null, null, null, null, "/repair", "/repair all"],
  },
  { label: "Feed", icon: "feed", group: "Utility", values: [true, true, null, null, null, null] },
  { label: "Nickname", icon: "nick", group: "Identity", values: [null, null, null, true, null, true] },
];

/* ── Box PvP ──────────────────────────────────────────────────── */

const BOXPVP_RANKS: Rank[] = [
  {
    id: "dragon",
    name: "DRAGON",
    price: 299,
    rarity: "rare",
    tagline: "Entry to the tier ladder.",
    stats: [
      { icon: "tier", label: "Tier", value: "13" },
      { icon: "key", label: "Void keys", value: "3" },
      { icon: "chest", label: "Extra PV", value: "3" },
    ],
    commands: [
      { cmd: "/kit Dragon", label: "Rank kit", icon: "chest" },
      { cmd: "/feed", label: "Refill hunger", icon: "feed" },
      { cmd: "/enderchest", label: "Ender chest anywhere", icon: "enderchest" },
    ],
    extras: [],
  },
  {
    id: "demon",
    name: "DEMON",
    price: 449,
    rarity: "epic",
    tagline: "More keys, more vaults, more pressure.",
    stats: [
      { icon: "tier", label: "Tier", value: "14" },
      { icon: "key", label: "Void keys", value: "5" },
      { icon: "chest", label: "Extra PV", value: "5" },
    ],
    commands: [
      { cmd: "/kit Demon", label: "Rank kit", icon: "chest" },
      { cmd: "/enderchest", label: "Ender chest anywhere", icon: "enderchest" },
    ],
    extras: [],
  },
  {
    id: "emperor",
    name: "EMPEROR",
    price: 599,
    rarity: "electric",
    tagline: "Daily keys start stacking in your favour.",
    badge: "Most popular",
    stats: [
      { icon: "tier", label: "Tier", value: "15" },
      { icon: "key", label: "Void keys", value: "10" },
      { icon: "chest", label: "Extra PV", value: "8" },
    ],
    commands: [
      { cmd: "/kit Emperor", label: "Rank kit", icon: "chest" },
      { cmd: "/enderchest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/anvil", label: "Portable anvil", icon: "anvil" },
    ],
    extras: [{ icon: "ticket", label: "Daily keys", value: "5×" }],
  },
  {
    id: "immortal",
    name: "IMMORTAL",
    price: 749,
    rarity: "cyan",
    tagline: "Double earnings and the ability to leave the ground.",
    stats: [
      { icon: "tier", label: "Tier", value: "16" },
      { icon: "key", label: "Void keys", value: "14" },
      { icon: "chest", label: "Extra PV", value: "8" },
    ],
    commands: [
      { cmd: "/kit Immortal", label: "Rank kit", icon: "chest" },
      { cmd: "/enderchest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/fly", label: "Creative flight", icon: "fly" },
    ],
    extras: [{ icon: "coin", label: "In-game money", value: "2×" }],
  },
  {
    id: "supreme",
    name: "SUPREME",
    price: 999,
    rarity: "legendary",
    tagline: "Everything the arena has to give.",
    stats: [
      { icon: "tier", label: "Tier", value: "18" },
      { icon: "key", label: "Void keys", value: "30" },
      { icon: "chest", label: "Extra PV", value: "10" },
    ],
    commands: [
      { cmd: "/kit Supreme", label: "Rank kit", icon: "chest" },
      { cmd: "/feed", label: "Refill hunger", icon: "feed" },
      { cmd: "/enderchest", label: "Ender chest anywhere", icon: "enderchest" },
      { cmd: "/anvil", label: "Portable anvil", icon: "anvil" },
      { cmd: "/craft", label: "Portable crafting", icon: "crafting" },
      { cmd: "/repair", label: "Repair held item", icon: "repair" },
      { cmd: "/fly", label: "Creative flight", icon: "fly" },
    ],
    extras: [
      { icon: "ticket", label: "Daily keys", value: "6×" },
      { icon: "speed", label: "Speed", value: "VI" },
      { icon: "tag", label: "Prefix", value: "Exclusive Supreme" },
      // Listed on the rank as simply "Infinite" — kept verbatim rather than
      // guessing what it applies to. TODO: confirm and expand this label.
      { icon: "void", label: "Infinite", value: "Included" },
    ],
  },
];

const BOXPVP_COMPARE: CompareRow[] = [
  { label: "Tier", icon: "tier", group: "Standing", values: [13, 14, 15, 16, 18] },
  {
    label: "Kit",
    icon: "chest",
    group: "Standing",
    values: ["/kit Dragon", "/kit Demon", "/kit Emperor", "/kit Immortal", "/kit Supreme"],
  },
  { label: "Void keys", icon: "key", group: "Loot", values: [3, 5, 10, 14, 30] },
  { label: "Daily keys", icon: "ticket", group: "Loot", values: [null, null, "5×", null, "6×"] },
  { label: "In-game money", icon: "coin", group: "Loot", values: [null, null, null, "2×", null] },
  { label: "Extra PV", icon: "chest", group: "Storage", values: [3, 5, 8, 8, 10] },
  { label: "Ender chest", icon: "enderchest", group: "Storage", values: [true, true, true, true, true] },
  { label: "Portable anvil", icon: "anvil", group: "Utility", values: [null, null, true, null, true] },
  { label: "Portable crafting", icon: "crafting", group: "Utility", values: [null, null, null, null, true] },
  { label: "Repair", icon: "repair", group: "Utility", values: [null, null, null, null, true] },
  { label: "Feed", icon: "feed", group: "Utility", values: [true, null, null, null, true] },
  { label: "Flight", icon: "fly", group: "Combat", values: [null, null, null, true, true] },
  { label: "Speed", icon: "speed", group: "Combat", values: [null, null, null, null, "VI"] },
  { label: "Prefix", icon: "tag", group: "Identity", values: [null, null, null, null, "Supreme"] },
];

export const CATALOGUES: Catalogue[] = [
  {
    id: "survival",
    name: "Survival",
    slug: "/store/survival",
    eyebrow: "Ranks & progression",
    headline: "Survival ranks",
    blurb:
      "Upgrade your gameplay with stronger gear, expanded utility and exclusive commands.",
    accent: "#4da3ff",
    ranks: SURVIVAL_RANKS,
    compare: SURVIVAL_COMPARE,
  },
  {
    id: "boxpvp",
    name: "Box PvP",
    slug: "/store/boxpvp",
    eyebrow: "Competitive ranks & perks",
    headline: "Box PvP",
    blurb: "Push higher. Fight harder. Own the arena.",
    accent: "#7fa2ff",
    ranks: BOXPVP_RANKS,
    compare: BOXPVP_COMPARE,
  },
];

export function catalogue(id: string) {
  return CATALOGUES.find((c) => c.id === id);
}

export function findRank(catalogueId: string, rankId: string) {
  return catalogue(catalogueId)?.ranks.find((r) => r.id === rankId);
}

export const CURRENCY = { code: "INR", symbol: "₹" };

export function price(amount: number) {
  return `${CURRENCY.symbol}${amount.toLocaleString("en-IN")}`;
}

/* ── Upgrade diffing ──────────────────────────────────────────
   Powers the "compared to the rank below" panel. Derived rather than
   duplicated, so it can never drift from the catalogue above.        */

export type Upgrade =
  | {
      kind: "changed";
      label: string;
      icon: IconName;
      from: string;
      to: string;
      /** Whether the number actually went up. Not every change is an upgrade —
       *  moving Diamond → Netherite resets the Protection level, and the store
       *  should not paint that as an improvement it cannot verify. */
      direction: "up" | "down" | "none";
    }
  | { kind: "added"; label: string; icon: IconName; to: string };

const ROMAN: Record<string, number> = {
  I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10,
};

/** Reads "VII", "15" or "2×" as a number; anything else (e.g. "Netherite") is null. */
function magnitude(value: string): number | null {
  const roman = ROMAN[value.trim().toUpperCase()];
  if (roman) return roman;
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

function direction(from: string, to: string): "up" | "down" | "none" {
  const a = magnitude(from);
  const b = magnitude(to);
  if (a === null || b === null || a === b) return "none";
  return b > a ? "up" : "down";
}

export function upgradesFrom(previous: Rank | undefined, rank: Rank): Upgrade[] {
  if (!previous) return [];
  const out: Upgrade[] = [];

  const before = new Map<string, Stat>();
  for (const s of [...previous.stats, ...previous.extras]) before.set(s.label, s);

  for (const s of [...rank.stats, ...rank.extras]) {
    const old = before.get(s.label);
    if (!old) out.push({ kind: "added", label: s.label, icon: s.icon, to: s.value });
    else if (old.value !== s.value)
      out.push({
        kind: "changed",
        label: s.label,
        icon: s.icon,
        from: old.value,
        to: s.value,
        direction: direction(old.value, s.value),
      });
  }

  const hadCommand = new Set(previous.commands.map((c) => c.cmd));
  for (const c of rank.commands) {
    if (!hadCommand.has(c.cmd))
      out.push({ kind: "added", label: c.label, icon: c.icon, to: c.cmd });
  }

  return out;
}

/** Resolves a rank's effective perks, honouring {@link CUMULATIVE_PERKS}. */
export function effectiveRank(cat: Catalogue, index: number): Rank {
  const rank = cat.ranks[index];
  if (!CUMULATIVE_PERKS || index === 0) return rank;

  const commands = new Map<string, Command>();
  for (let i = 0; i <= index; i++) {
    for (const c of cat.ranks[i].commands) commands.set(c.cmd, c);
  }
  return { ...rank, commands: [...commands.values()] };
}

/* ── Checkout ─────────────────────────────────────────────────── */

export const CHECKOUT = {
  /**
   * TODO: point this at the real payment/fulfilment page (Tebex, Craftingstore,
   * a self-hosted checkout — whatever the network uses). Until it is set the
   * cart completes by handing the order over to staff in Discord, which is the
   * only fulfilment route that is known to exist today.
   */
  url: null as string | null,
  /** How long staff say delivery takes. TODO: confirm before publishing. */
  deliveryNote: "Purchases are applied to the account you name at checkout.",
  /**
   * TODO: write the network's actual refund terms here. Left null rather than
   * invented — the block only renders once there is a real policy to show.
   */
  refundPolicy: null as string | null,
};
