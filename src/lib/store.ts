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
    price: 100,
    rarity: "uncommon",
    tagline: "Starter Survival Rank with Enchanted Diamond gear, /craft, /hat, 2 homes and VIP Kit.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "VIP Kit" },
      { icon: "home", label: "Homes", value: "2" },
      { icon: "tag", label: "Prefix", value: "VIP Prefix" },
    ],
    commands: [
      { cmd: "/craft", label: "Portable 3x3 crafting grid", icon: "crafting" },
      { cmd: "/hat", label: "Wear held block/item as a hat", icon: "helmet" },
    ],
    extras: [
      { icon: "chest", label: "Armor Set", value: "Full Enchanted Diamond" },
      { icon: "sword", label: "Tools Set", value: "Enchanted Diamond Tools" },
      { icon: "home", label: "Max Homes", value: "2 Homes" },
      { icon: "tag", label: "Chat Prefix", value: "VIP Prefix" },
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: 350,
    rarity: "rare",
    tagline: "Full Netherite gear, Ender Chest, Player Vault 1, portable stations, /back and 4 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Elite Kit" },
      { icon: "home", label: "Homes", value: "4" },
      { icon: "chest", label: "Player Vaults", value: "1 Vault" },
    ],
    commands: [
      { cmd: "/craft", label: "Portable 3x3 crafting grid", icon: "crafting" },
      { cmd: "/hat", label: "Wear held block/item as a hat", icon: "helmet" },
      { cmd: "/ec", label: "Access Ender Chest anywhere", icon: "enderchest" },
      { cmd: "/pv 1", label: "Access Player Vault 1", icon: "chest" },
      { cmd: "/anvil", label: "Portable anvil station", icon: "anvil" },
      { cmd: "/grindstone", label: "Portable grindstone station", icon: "anvil" },
      { cmd: "/smithingtable", label: "Portable smithing table", icon: "hammer" },
      { cmd: "/back", label: "Teleport to previous location/death", icon: "arrow" },
    ],
    extras: [
      { icon: "chest", label: "Armor Set", value: "Full Enchanted Netherite" },
      { icon: "sword", label: "Tools Set", value: "Netherite Tools" },
      { icon: "home", label: "Max Homes", value: "4 Homes" },
      { icon: "chest", label: "Player Vault", value: "1 Vault (/pv 1)" },
      { icon: "block", label: "Claim Blocks", value: "Extra Claim Blocks" },
      { icon: "coin", label: "Auction House", value: "More Auction Slots" },
      { icon: "tag", label: "Chat Prefix", value: "Elite Prefix" },
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 500,
    rarity: "epic",
    badge: "Best value",
    tagline: "Improved Netherite gear, /heal, /feed, /repair, portable stations, 2 PVs and 6 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Premium Kit" },
      { icon: "home", label: "Homes", value: "6" },
      { icon: "chest", label: "Player Vaults", value: "2 Vaults" },
    ],
    commands: [
      { cmd: "/craft", label: "Portable 3x3 crafting grid", icon: "crafting" },
      { cmd: "/hat", label: "Wear held block/item as a hat", icon: "helmet" },
      { cmd: "/ec", label: "Access Ender Chest anywhere", icon: "enderchest" },
      { cmd: "/pv 1", label: "Access Player Vault 1", icon: "chest" },
      { cmd: "/pv 2", label: "Access Player Vault 2", icon: "chest" },
      { cmd: "/anvil", label: "Portable anvil station", icon: "anvil" },
      { cmd: "/grindstone", label: "Portable grindstone station", icon: "anvil" },
      { cmd: "/smithingtable", label: "Portable smithing table", icon: "hammer" },
      { cmd: "/back", label: "Teleport to previous location", icon: "arrow" },
      { cmd: "/heal", label: "Instant full health refill", icon: "heart" },
      { cmd: "/feed", label: "Refill hunger bar instantly", icon: "feed" },
      { cmd: "/repair", label: "Repair held item instantly", icon: "repair" },
      { cmd: "/workbench", label: "Portable crafting workbench", icon: "crafting" },
      { cmd: "/loom", label: "Portable loom station", icon: "crafting" },
      { cmd: "/stonecutter", label: "Portable stonecutter station", icon: "pickaxe" },
    ],
    extras: [
      { icon: "chest", label: "Armor Set", value: "Improved Netherite" },
      { icon: "sword", label: "Tools Set", value: "Enchanted Netherite Tools" },
      { icon: "home", label: "Max Homes", value: "6 Homes" },
      { icon: "chest", label: "Player Vaults", value: "2 Vaults (/pv 1-2)" },
      { icon: "block", label: "Claim Blocks", value: "More Claim Blocks" },
      { icon: "coin", label: "Auction House", value: "More Auction Slots" },
      { icon: "speed", label: "Server Queue", value: "Priority Queue" },
      { icon: "tag", label: "Chat Prefix", value: "Premium Prefix" },
    ],
  },
  {
    id: "galaxy",
    name: "GALAXY",
    price: 800,
    rarity: "electric",
    badge: "Most popular",
    tagline: "Creative flight, God Netherite gear, /repair all, /near, /nick, 4 PVs and 10 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Galaxy Kit" },
      { icon: "home", label: "Homes", value: "10" },
      { icon: "chest", label: "Player Vaults", value: "4 Vaults" },
    ],
    commands: [
      { cmd: "/fly", label: "Creative flight in survival", icon: "fly" },
      { cmd: "/craft", label: "Portable 3x3 crafting grid", icon: "crafting" },
      { cmd: "/hat", label: "Wear held block/item as a hat", icon: "helmet" },
      { cmd: "/ec", label: "Access Ender Chest anywhere", icon: "enderchest" },
      { cmd: "/pv 1-3", label: "Access Player Vaults 1 to 3", icon: "chest" },
      { cmd: "/anvil", label: "Portable anvil station", icon: "anvil" },
      { cmd: "/grindstone", label: "Portable grindstone station", icon: "anvil" },
      { cmd: "/smithingtable", label: "Portable smithing table", icon: "hammer" },
      { cmd: "/back", label: "Teleport to previous location", icon: "arrow" },
      { cmd: "/heal", label: "Instant full health refill", icon: "heart" },
      { cmd: "/feed", label: "Refill hunger bar instantly", icon: "feed" },
      { cmd: "/repair", label: "Repair held item instantly", icon: "repair" },
      { cmd: "/repair all", label: "Repair all inventory items", icon: "repair" },
      { cmd: "/workbench", label: "Portable crafting workbench", icon: "crafting" },
      { cmd: "/loom", label: "Portable loom station", icon: "crafting" },
      { cmd: "/stonecutter", label: "Portable stonecutter station", icon: "pickaxe" },
      { cmd: "/near", label: "Scan for nearby players", icon: "world" },
      { cmd: "/nick", label: "Change nickname & chat formatting", icon: "nick" },
      { cmd: "/ptime", label: "Set personal client time", icon: "speed" },
      { cmd: "/pweather", label: "Set personal client weather", icon: "fireball" },
    ],
    extras: [
      { icon: "chest", label: "Armor Set", value: "God Netherite" },
      { icon: "sword", label: "Tools Set", value: "God Netherite Tools" },
      { icon: "home", label: "Max Homes", value: "10 Homes" },
      { icon: "chest", label: "Player Vaults", value: "4 Vaults (/pv 1-4)" },
      { icon: "block", label: "Claim Blocks", value: "Large Claim Bonus" },
      { icon: "coin", label: "Auction House", value: "Increased Slots" },
      { icon: "speed", label: "Server Queue", value: "Priority Queue" },
      { icon: "tag", label: "Chat Prefix", value: "Galaxy Prefix" },
    ],
  },
  {
    id: "royal",
    name: "ROYAL",
    price: 1200,
    rarity: "legendary",
    badge: "Ultimate rank",
    tagline: "The supreme rank with Full Royal God Netherite, /pv 1-5, 15 homes, Daily Royal Rewards and Custom Messages.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Royal Kit" },
      { icon: "home", label: "Homes", value: "15" },
      { icon: "chest", label: "Player Vaults", value: "5 Vaults" },
    ],
    commands: [
      { cmd: "/fly", label: "Creative flight in survival", icon: "fly" },
      { cmd: "/craft", label: "Portable 3x3 crafting grid", icon: "crafting" },
      { cmd: "/ec", label: "Access Ender Chest anywhere", icon: "enderchest" },
      { cmd: "/pv 1-5", label: "Access Player Vaults 1 to 5", icon: "chest" },
      { cmd: "/heal", label: "Instant full health refill", icon: "heart" },
      { cmd: "/feed", label: "Refill hunger bar instantly", icon: "feed" },
      { cmd: "/repair", label: "Repair held item instantly", icon: "repair" },
      { cmd: "/repair all", label: "Repair all inventory items", icon: "repair" },
      { cmd: "/back", label: "Teleport to previous location", icon: "arrow" },
      { cmd: "/near", label: "Scan for nearby players", icon: "world" },
      { cmd: "/hat", label: "Wear held block/item as a hat", icon: "helmet" },
      { cmd: "/nick", label: "Change nickname & chat formatting", icon: "nick" },
      { cmd: "/anvil", label: "Portable anvil station", icon: "anvil" },
      { cmd: "/smithingtable", label: "Portable smithing table", icon: "hammer" },
      { cmd: "/workbench", label: "Portable crafting workbench", icon: "crafting" },
      { cmd: "/grindstone", label: "Portable grindstone station", icon: "anvil" },
      { cmd: "/loom", label: "Portable loom station", icon: "crafting" },
      { cmd: "/stonecutter", label: "Portable stonecutter station", icon: "pickaxe" },
      { cmd: "/ptime", label: "Set personal client time", icon: "speed" },
      { cmd: "/pweather", label: "Set personal client weather", icon: "fireball" },
    ],
    extras: [
      { icon: "chest", label: "Armor Set", value: "Full Royal God Netherite" },
      { icon: "sword", label: "Tools Set", value: "Royal God Netherite Tools" },
      { icon: "home", label: "Max Homes", value: "15 Homes" },
      { icon: "chest", label: "Player Vaults", value: "5 Vaults (/pv 1-5)" },
      { icon: "block", label: "Claim Blocks", value: "Maximum Claim Blocks" },
      { icon: "coin", label: "Auction House", value: "Maximum Slots" },
      { icon: "totem", label: "Daily Reward", value: "Daily Royal Reward" },
      { icon: "player", label: "Chat Messages", value: "Custom Join & Quit" },
      { icon: "tag", label: "Chat Prefix", value: "Royal Chat Prefix" },
      { icon: "tag", label: "Tab Prefix", value: "Royal Tab Prefix" },
      { icon: "crystal", label: "Cosmetics", value: "Royal Particle Effect" },
      { icon: "speed", label: "Server Queue", value: "Priority Queue" },
    ],
  },
];

const SURVIVAL_COMPARE: CompareRow[] = [
  {
    label: "Kit Perk",
    icon: "chestplate",
    group: "Kit & Storage",
    values: ["VIP Kit", "Elite Kit", "Premium Kit", "Galaxy Kit", "Royal Kit"],
  },
  {
    label: "Armor Tier",
    icon: "shield",
    group: "Kit & Storage",
    values: ["Enchanted Diamond", "Enchanted Netherite", "Improved Netherite", "God Netherite", "Royal God Netherite"],
  },
  {
    label: "Weapons & Tools",
    icon: "sword",
    group: "Kit & Storage",
    values: ["Enchanted Diamond", "Netherite Tools", "Enchanted Netherite", "God Netherite", "Royal God Netherite"],
  },
  {
    label: "Golden Apples",
    icon: "heart",
    group: "Kit & Storage",
    values: ["16×", "32×", "48×", "64×", "96×"],
  },
  {
    label: "Ender Pearls",
    icon: "world",
    group: "Kit & Storage",
    values: ["16×", "32×", "48×", "64×", "96×"],
  },
  {
    label: "Shulker Boxes",
    icon: "chest",
    group: "Kit & Storage",
    values: ["1 Box", "2 Boxes", "3 Boxes", "4 Boxes", "6 Boxes"],
  },
  {
    label: "Homes",
    icon: "home",
    group: "Kit & Storage",
    values: [2, 4, 6, 10, 15],
  },
  {
    label: "Player Vaults (/pv)",
    icon: "chest",
    group: "Kit & Storage",
    values: [null, "1 Vault", "2 Vaults", "4 Vaults", "5 Vaults"],
  },
  {
    label: "Claim Blocks",
    icon: "block",
    group: "Kit & Storage",
    values: [null, "Extra", "More", "Large Bonus", "Maximum"],
  },
  {
    label: "Auction Slots",
    icon: "ticket",
    group: "Kit & Storage",
    values: [null, "More", "More", "Increased", "Maximum"],
  },
  {
    label: "Priority Queue",
    icon: "speed",
    group: "Kit & Storage",
    values: [null, null, true, true, true],
  },

  // Commands
  { label: "Portable Crafting (/craft)", icon: "crafting", group: "Commands", values: [true, true, true, true, true] },
  { label: "Item as Hat (/hat)", icon: "helmet", group: "Commands", values: [true, true, true, true, true] },
  { label: "Return on Death (/back)", icon: "arrow", group: "Commands", values: [null, true, true, true, true] },
  { label: "Ender Chest Anywhere (/ec)", icon: "enderchest", group: "Commands", values: [null, true, true, true, true] },
  { label: "Portable Anvil (/anvil)", icon: "anvil", group: "Commands", values: [null, true, true, true, true] },
  { label: "Portable Grindstone (/grindstone)", icon: "anvil", group: "Commands", values: [null, true, true, true, true] },
  { label: "Portable Smithing Table (/smithingtable)", icon: "hammer", group: "Commands", values: [null, true, true, true, true] },
  { label: "Instant Health Refill (/heal)", icon: "heart", group: "Commands", values: [null, null, true, true, true] },
  { label: "Refill Hunger (/feed)", icon: "feed", group: "Commands", values: [null, null, true, true, true] },
  { label: "Repair Held Item (/repair)", icon: "repair", group: "Commands", values: [null, null, true, true, true] },
  { label: "Portable Workbench (/workbench)", icon: "crafting", group: "Commands", values: [null, null, true, true, true] },
  { label: "Portable Loom & Stonecutter", icon: "pickaxe", group: "Commands", values: [null, null, true, true, true] },
  { label: "Creative Flight (/fly)", icon: "fly", group: "Commands", values: [null, null, null, true, true] },
  { label: "Scan Nearby Players (/near)", icon: "world", group: "Commands", values: [null, null, null, true, true] },
  { label: "Nickname & Colors (/nick)", icon: "nick", group: "Commands", values: [null, null, null, true, true] },
  { label: "Client Time & Weather (/ptime, /pweather)", icon: "fireball", group: "Commands", values: [null, null, null, true, true] },
  { label: "Repair All Items (/repair all)", icon: "repair", group: "Commands", values: [null, null, null, true, true] },

  // Identity & Exclusives
  {
    label: "Rank Prefix",
    icon: "tag",
    group: "Exclusives & Perks",
    values: ["VIP Prefix", "Elite Prefix", "Premium Prefix", "Galaxy Prefix", "Royal Chat & Tab"],
  },
  { label: "Daily Royal Reward", icon: "totem", group: "Exclusives & Perks", values: [null, null, null, null, true] },
  { label: "Custom Join & Quit Messages", icon: "player", group: "Exclusives & Perks", values: [null, null, null, null, true] },
  { label: "Royal Particle Effect", icon: "crystal", group: "Exclusives & Perks", values: [null, null, null, null, true] },
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
