import type { IconName } from "@/components/ui/Icon";

/* ══════════════════════════════════════════════════════════════
   GAME MODES

   The four worlds the network runs, plus the free-for-all arenas.

   Descriptions below define what each *genre* is, so a first-time
   visitor knows what they are queueing into. They deliberately make
   no claims about this server's specific plugins, economy, rewards
   or population — edit them freely, they are copy, not data.

   Player counts are null on purpose: the status API reports one
   network-wide figure, not a per-world breakdown. Wire a per-world
   query up and the UI will show it.
   ══════════════════════════════════════════════════════════════ */

export type Mode = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  accent: string;
  /** Short, scannable facts about how the world plays. */
  traits: { icon: IconName; label: string; value: string }[];
  highlights: string[];
  /** TODO: per-world player counts once a per-server query exists. */
  players: number | null;
  /** Store category this world sells ranks for, if any. */
  store?: string;
};

export const MODES: Mode[] = [
  {
    slug: "lifesteal",
    name: "Lifesteal",
    tagline: "Every heart you take is a heart you keep.",
    description:
      "Lifesteal turns the health bar into currency. Land the killing blow and you take a heart from your opponent permanently; lose your last one and you are out of the world until you find a way back in. It makes every fight a decision rather than a reflex — the players with the longest health bars are the ones who picked their fights well.",
    icon: "heart",
    accent: "#6f6cf5",
    traits: [
      { icon: "heart", label: "Stakes", value: "Hearts transfer on kill" },
      { icon: "pvp", label: "Combat", value: "Always enabled" },
      { icon: "world", label: "World", value: "Shared, persistent" },
    ],
    highlights: [
      "Kills take a heart from the loser and give it to the winner",
      "Run out of hearts and you lose access until you recover one",
      "Alliances matter more than aim",
    ],
    players: null,
  },
  {
    slug: "survival",
    name: "Survival",
    tagline: "Build something that outlasts you.",
    description:
      "The long game. A persistent overworld where the map is shaped entirely by the people on it — roads between bases, farms that outgrew their owners, ruins nobody has cleared. Nothing resets on a timer, so the things you build are still standing the next time you log in.",
    icon: "world",
    accent: "#4da3ff",
    traits: [
      { icon: "home", label: "Homes", value: "Set with /home" },
      { icon: "chest", label: "Progression", value: "Gear and ranks" },
      { icon: "world", label: "World", value: "Persistent" },
    ],
    highlights: [
      "A world that keeps whatever you leave in it",
      "Rank kits, portable stations and extra homes",
      "Room to build far from anyone else",
    ],
    players: null,
    store: "survival",
  },
  {
    slug: "boxpvp",
    name: "Box PvP",
    tagline: "One box. Everything you own inside it.",
    description:
      "Box PvP compresses a whole survival server into a single plot. You mine, sell, upgrade and fortify inside your box while everyone around you does the same — and then you go and take theirs. Progression is measured in tiers, and the tier ladder is public, so everyone can see exactly how far ahead you are.",
    icon: "block",
    accent: "#7fa2ff",
    traits: [
      { icon: "tier", label: "Progression", value: "Ranked tiers" },
      { icon: "key", label: "Loot", value: "Void and daily keys" },
      { icon: "pvp", label: "Combat", value: "Raid and defend" },
    ],
    highlights: [
      "Fortify a plot, then break into everyone else's",
      "Tier ladder from 13 up to 18",
      "Key crates and private vault expansion",
    ],
    players: null,
    store: "boxpvp",
  },
  {
    slug: "practice",
    name: "PvP Practice",
    tagline: "Thirty ways to lose a fight, and learn from it.",
    description:
      "A dedicated practice server: no gear grind, no travel, no consequences. Pick a kit, get queued, fight, requeue. Every duel type the network runs lives here — pot, axe, crystal, ranged, mace, objective modes and the ones that exist purely because they are funny.",
    icon: "sword",
    accent: "#55d6ff",
    traits: [
      { icon: "sword", label: "Duel types", value: "7 categories" },
      { icon: "chest", label: "Kits", value: "Provided" },
      { icon: "arena", label: "Arenas", value: "Instant queue" },
    ],
    highlights: [
      "Sword, axe, crystal, ranged, mace and objective duels",
      "Kits handed to you — nothing to farm",
      "Free-for-all arenas when you want chaos instead",
    ],
    players: null,
  },
];

export function mode(slug: string) {
  return MODES.find((m) => m.slug === slug);
}

/* ── Free for all ─────────────────────────────────────────────── */

export type FfaMode = {
  id: string;
  name: string;
  blurb: string;
  icon: IconName;
  /** 1 casual → 4 brutal. Drives the pressure meter, nothing else. */
  intensity: 1 | 2 | 3 | 4;
  kit: string;
};

export const FFA_MODES: FfaMode[] = [
  {
    id: "mace",
    name: "Mace FFA",
    blurb:
      "Wind charges up, mace down. Height is the whole game — everyone in the arena is looking for someone below them.",
    icon: "mace",
    intensity: 4,
    kit: "Mace, wind charges, light armour",
  },
  {
    id: "nethpot",
    name: "NethPot FFA",
    blurb:
      "Netherite and splash healing in an open arena. Sustain wins fights that raw damage cannot.",
    icon: "potion",
    intensity: 3,
    kit: "Netherite, sword, splash Instant Health",
  },
  {
    id: "manhunt",
    name: "Manhunt",
    blurb:
      "One runner, the rest of the lobby hunting. The runner wins by surviving; everyone else wins by not being last.",
    icon: "player",
    intensity: 2,
    kit: "Compass for hunters, head start for the runner",
  },
  {
    id: "cart",
    name: "Cart PvP FFA",
    blurb:
      "Fights fought from minecarts. You cannot strafe, so positioning happens before the fight starts.",
    icon: "minecart",
    intensity: 2,
    kit: "Minecart, sword, rails",
  },
  {
    id: "diamond-smp",
    name: "Diamond SMP FFA",
    blurb:
      "Diamond gear, SMP rules, no potions. The purest read on who is actually better at clicking.",
    icon: "crystal",
    intensity: 3,
    kit: "Diamond armour, sword, golden apples",
  },
];
