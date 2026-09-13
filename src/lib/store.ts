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
  originalPrice?: number;
  saleLabel?: string;
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
    price: 80,
    originalPrice: 100,
    saleLabel: "20% OFF",
    rarity: "uncommon",
    tagline: "Starter Survival Rank with VIP Diamond gear, Custom Enchants, /craft, /hat, 2 homes and VIP Kit.",
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
      { icon: "chest", label: "Armor Set", value: "VIP Diamond (Prot 4, Unb 2)" },
      { icon: "sword", label: "Tools & Weapons", value: "Custom VIP Diamond Tools" },
      { icon: "block", label: "Materials", value: "128 Logs, Iron, Gold, Coal, Gems" },
      { icon: "home", label: "Max Homes", value: "2 Homes" },
      { icon: "tag", label: "Chat Prefix", value: "VIP Prefix" },
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: 250,
    originalPrice: 350,
    saleLabel: "29% OFF",
    rarity: "rare",
    tagline: "Full Netherite gear, Spear, 4 Totems of Undying, Ender Chest, /back and 4 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Elite Kit" },
      { icon: "totem", label: "Totems", value: "4× Totem" },
      { icon: "home", label: "Homes", value: "4" },
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
      { icon: "chest", label: "Armor Set", value: "Full Elite Netherite" },
      { icon: "sword", label: "Weapons", value: "Netherite Sword & Spear" },
      { icon: "pickaxe", label: "Custom Tools", value: "Vein Miner & Telekinesis" },
      { icon: "totem", label: "Totems", value: "4× Totem of Undying" },
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
    price: 400,
    originalPrice: 500,
    saleLabel: "20% OFF",
    rarity: "epic",
    badge: "Best value",
    tagline: "Protection V Netherite gear, Trident, Dragon Heart, Fire Shield, 4 Totems, 2 PVs and 6 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Premium Kit" },
      { icon: "totem", label: "Totems", value: "4× Totem" },
      { icon: "home", label: "Homes", value: "6" },
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
      { icon: "chest", label: "Armor Set", value: "Protection V Netherite (Dragon Heart)" },
      { icon: "sword", label: "Weapons", value: "Netherite Sword & Trident" },
      { icon: "totem", label: "Totems", value: "4× Totem of Undying" },
      { icon: "heart", label: "God Apples", value: "4× Enchanted Golden Apple" },
      { icon: "home", label: "Max Homes", value: "6 Homes" },
      { icon: "chest", label: "Player Vaults", value: "2 Vaults (/pv 1-2)" },
      { icon: "block", label: "Claim Blocks", value: "More Claim Blocks" },
      { icon: "coin", label: "Auction House", value: "More Auction Slots" },
      { icon: "speed", label: "Server Queue", value: "Priority Queue" },
      { icon: "tag", label: "Chat Prefix", value: "Premium Prefix" },
    ],
  },
  {
    id: "titan",
    name: "TITAN",
    price: 650,
    originalPrice: 800,
    saleLabel: "19% OFF",
    rarity: "electric",
    badge: "Most popular",
    tagline: "Creative flight, Titan Netherite, Bane of Netherspawn VI, Spear & Trident, 4 PVs and 10 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Titan Kit" },
      { icon: "fly", label: "Flight", value: "Flight Perk" },
      { icon: "home", label: "Homes", value: "10" },
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
      { icon: "chest", label: "Armor Set", value: "Full Titan Netherite" },
      { icon: "sword", label: "Weapons", value: "Titan Sword, Spear & Trident" },
      { icon: "home", label: "Max Homes", value: "10 Homes" },
      { icon: "chest", label: "Player Vaults", value: "4 Vaults (/pv 1-4)" },
      { icon: "block", label: "Claim Blocks", value: "Large Claim Bonus" },
      { icon: "coin", label: "Auction House", value: "Increased Slots" },
      { icon: "speed", label: "Server Queue", value: "Priority Queue" },
      { icon: "tag", label: "Chat Prefix", value: "Titan Prefix" },
    ],
  },
  {
    id: "royal",
    name: "ROYAL",
    price: 1000,
    originalPrice: 1200,
    saleLabel: "17% OFF",
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
    values: ["VIP Kit", "Elite Kit", "Premium Kit", "Titan Kit", "Royal Kit"],
  },
  {
    label: "Armor Tier",
    icon: "shield",
    group: "Kit & Storage",
    values: ["VIP Diamond (Prot 4)", "Elite Netherite (Prot 4)", "Premium Netherite (Prot 5)", "Titan Netherite", "Royal God Netherite"],
  },
  {
    label: "Weapons & Tools",
    icon: "sword",
    group: "Kit & Storage",
    values: ["VIP Diamond Tools", "Netherite Tools + Spear", "Netherite + Trident", "Titan Sword, Spear & Trident", "Royal God Netherite"],
  },
  {
    label: "Shield",
    icon: "shield",
    group: "Kit & Storage",
    values: ["VIP Shield", "Elite Shield (Restore I)", "Premium Shield (Restore II)", "Titan Shield", null],
  },
  {
    label: "Totem of Undying",
    icon: "totem",
    group: "Kit & Storage",
    values: [null, "4×", "4×", "1×", null],
  },
  {
    label: "God Apples",
    icon: "heart",
    group: "Kit & Storage",
    values: [null, "1×", "4×", "1×", null],
  },
  {
    label: "Golden Apples",
    icon: "heart",
    group: "Kit & Storage",
    values: ["2×", "8×", "32×", "1×", "96×"],
  },
  {
    label: "Golden Carrots",
    icon: "feed",
    group: "Kit & Storage",
    values: ["8×", "64×", "64×", "1×", null],
  },
  {
    label: "Ender Pearls",
    icon: "world",
    group: "Kit & Storage",
    values: [null, null, null, null, "96×"],
  },
  {
    label: "Shulker Boxes",
    icon: "chest",
    group: "Kit & Storage",
    values: [null, null, null, null, "6 Boxes"],
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
    values: ["VIP Prefix", "Elite Prefix", "Premium Prefix", "Titan Prefix", "Royal Chat & Tab"],
  },
  { label: "Daily Royal Reward", icon: "totem", group: "Exclusives & Perks", values: [null, null, null, null, true] },
  { label: "Custom Join & Quit Messages", icon: "player", group: "Exclusives & Perks", values: [null, null, null, null, true] },
  { label: "Royal Particle Effect", icon: "crystal", group: "Exclusives & Perks", values: [null, null, null, null, true] },
];

/* ── Vanilla ──────────────────────────────────────────────────── */

const VANILLA_RANKS: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    price: 80,
    originalPrice: 100,
    saleLabel: "20% OFF",
    rarity: "uncommon",
    tagline: "Starter Vanilla Rank with VIP Diamond gear, /craft, /hat, 2 homes and VIP Kit.",
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
      { icon: "chest", label: "Armor Set", value: "VIP Diamond (Prot 4, Unb 2)" },
      { icon: "sword", label: "Tools & Weapons", value: "VIP Diamond Tools" },
      { icon: "block", label: "Materials", value: "128 Logs, Iron, Gold, Coal, Gems" },
      { icon: "home", label: "Max Homes", value: "2 Homes" },
      { icon: "tag", label: "Chat Prefix", value: "VIP Prefix" },
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: 250,
    originalPrice: 350,
    saleLabel: "29% OFF",
    rarity: "rare",
    tagline: "Full Netherite gear, Spear, 4 Totems of Undying, Ender Chest, /back and 4 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Elite Kit" },
      { icon: "totem", label: "Totems", value: "4× Totem" },
      { icon: "home", label: "Homes", value: "4" },
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
      { icon: "chest", label: "Armor Set", value: "Full Elite Netherite" },
      { icon: "sword", label: "Weapons", value: "Netherite Sword & Spear" },
      { icon: "pickaxe", label: "Tools", value: "Netherite Tools (Eff 5, Fortune 3)" },
      { icon: "totem", label: "Totems", value: "4× Totem of Undying" },
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
    price: 400,
    originalPrice: 500,
    saleLabel: "20% OFF",
    rarity: "epic",
    badge: "Best value",
    tagline: "Protection V Netherite gear, Trident, 4 Totems, 2 PVs and 6 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Premium Kit" },
      { icon: "totem", label: "Totems", value: "4× Totem" },
      { icon: "home", label: "Homes", value: "6" },
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
      { icon: "chest", label: "Armor Set", value: "Protection V Netherite" },
      { icon: "sword", label: "Weapons", value: "Netherite Sword & Trident" },
      { icon: "totem", label: "Totems", value: "4× Totem of Undying" },
      { icon: "heart", label: "God Apples", value: "4× Enchanted Golden Apple" },
      { icon: "home", label: "Max Homes", value: "6 Homes" },
      { icon: "chest", label: "Player Vaults", value: "2 Vaults (/pv 1-2)" },
      { icon: "block", label: "Claim Blocks", value: "More Claim Blocks" },
      { icon: "coin", label: "Auction House", value: "More Auction Slots" },
      { icon: "speed", label: "Server Queue", value: "Priority Queue" },
      { icon: "tag", label: "Chat Prefix", value: "Premium Prefix" },
    ],
  },
  {
    id: "titan",
    name: "TITAN",
    price: 650,
    originalPrice: 800,
    saleLabel: "19% OFF",
    rarity: "electric",
    badge: "Most popular",
    tagline: "Creative flight, Titan Netherite, Spear & Trident, 4 PVs and 10 homes.",
    stats: [
      { icon: "chestplate", label: "Kit Perk", value: "Titan Kit" },
      { icon: "fly", label: "Flight", value: "Flight Perk" },
      { icon: "home", label: "Homes", value: "10" },
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
      { icon: "chest", label: "Armor Set", value: "Full Titan Netherite" },
      { icon: "sword", label: "Weapons", value: "Titan Sword, Spear & Trident" },
      { icon: "home", label: "Max Homes", value: "10 Homes" },
      { icon: "chest", label: "Player Vaults", value: "4 Vaults (/pv 1-4)" },
      { icon: "block", label: "Claim Blocks", value: "Large Claim Bonus" },
      { icon: "coin", label: "Auction House", value: "Increased Slots" },
      { icon: "speed", label: "Server Queue", value: "Priority Queue" },
      { icon: "tag", label: "Chat Prefix", value: "Titan Prefix" },
    ],
  },
  {
    id: "royal",
    name: "ROYAL",
    price: 1000,
    originalPrice: 1200,
    saleLabel: "17% OFF",
    rarity: "legendary",
    badge: "Ultimate rank",
    tagline: "The supreme rank with Full Royal Netherite, /pv 1-5, 15 homes, Daily Royal Rewards and Custom Messages.",
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
      { icon: "chest", label: "Armor Set", value: "Full Royal Netherite" },
      { icon: "sword", label: "Tools Set", value: "Royal Netherite Tools" },
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

const VANILLA_COMPARE: CompareRow[] = [
  {
    label: "Kit Perk",
    icon: "chestplate",
    group: "Kit & Storage",
    values: ["VIP Kit", "Elite Kit", "Premium Kit", "Titan Kit", "Royal Kit"],
  },
  {
    label: "Armor Tier",
    icon: "shield",
    group: "Kit & Storage",
    values: ["VIP Diamond (Prot 4)", "Elite Netherite (Prot 4)", "Premium Netherite (Prot 5)", "Titan Netherite (Prot 6)", "Royal Netherite (Prot 7)"],
  },
  {
    label: "Weapons & Tools",
    icon: "sword",
    group: "Kit & Storage",
    values: ["VIP Diamond Tools", "Netherite Tools + Spear", "Netherite + Trident", "Titan Sword, Spear & Trident", "Royal Netherite Gear"],
  },
  {
    label: "Shield",
    icon: "shield",
    group: "Kit & Storage",
    values: ["VIP Shield", "Elite Shield (Mending)", "Premium Shield (Mending)", "Titan Shield (Mending)", "Royal Shield (Mending)"],
  },
  {
    label: "Totem of Undying",
    icon: "totem",
    group: "Kit & Storage",
    values: [null, "4×", "4×", "3×", "2×"],
  },
  {
    label: "God Apples",
    icon: "heart",
    group: "Kit & Storage",
    values: [null, "1×", "4×", "8×", "14×"],
  },
  {
    label: "Golden Apples",
    icon: "heart",
    group: "Kit & Storage",
    values: ["2×", "8×", "32×", "64×", "96×"],
  },
  {
    label: "Golden Carrots",
    icon: "feed",
    group: "Kit & Storage",
    values: ["8×", "64×", "64×", "128×", "128×"],
  },
  {
    label: "Ender Pearls",
    icon: "world",
    group: "Kit & Storage",
    values: [null, null, null, null, null],
  },
  {
    label: "Shulker Boxes",
    icon: "chest",
    group: "Kit & Storage",
    values: [null, null, null, null, null],
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
    values: ["VIP Prefix", "Elite Prefix", "Premium Prefix", "Titan Prefix", "Royal Chat & Tab"],
  },
  { label: "Daily Royal Reward", icon: "totem", group: "Exclusives & Perks", values: [null, null, null, null, true] },
  { label: "Custom Join & Quit Messages", icon: "player", group: "Exclusives & Perks", values: [null, null, null, null, true] },
  { label: "Royal Particle Effect", icon: "crystal", group: "Exclusives & Perks", values: [null, null, null, null, true] },
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
    id: "vanilla",
    name: "Vanilla",
    slug: "/store/vanilla",
    eyebrow: "Pure Survival · Ranks & progression",
    headline: "Vanilla ranks",
    blurb:
      "Classic vanilla survival experience. Upgrade your gameplay with gear, expanded utility and exclusive commands.",
    accent: "#22c55e",
    ranks: VANILLA_RANKS,
    compare: VANILLA_COMPARE,
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
