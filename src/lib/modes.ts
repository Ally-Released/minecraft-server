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
  image?: string;
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
    slug: "survival",
    name: "Survival",
    tagline: "Build something that outlasts you.",
    description:
      "The long game. A persistent overworld where the map is shaped entirely by the people on it — roads between bases, farms that outgrew their owners, ruins nobody has cleared. Nothing resets on a timer, so the things you build are still standing the next time you log in.",
    icon: "world",
    accent: "#4da3ff",
    image: "/assets/survival spawn hb.png",
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
    slug: "vanilla",
    name: "Vanilla",
    tagline: "Pure Minecraft. No custom enchants, no shortcuts.",
    description:
      "A classic vanilla survival experience. Build, explore, farm and thrive with standard vanilla mechanics, authentic progression, extra homes and player vaults.",
    icon: "world",
    accent: "#22c55e",
    image: "/assets/survival spawn hb.png",
    traits: [
      { icon: "home", label: "Homes", value: "Set with /home" },
      { icon: "chest", label: "Progression", value: "Pure Vanilla" },
      { icon: "world", label: "World", value: "Persistent" },
    ],
    highlights: [
      "Authentic vanilla survival without custom plugin enchants",
      "Rank kits, portable utilities, extra homes and vaults",
      "Build freely in an infinite persistent overworld",
    ],
    players: null,
    store: "vanilla",
  },
  {
    slug: "practice",
    name: "PvP Practice",
    tagline: "Thirty ways to lose a fight, and learn from it.",
    description:
      "A dedicated practice server: no gear grind, no travel, no consequences. Pick a kit, get queued, fight, requeue. Every duel type the network runs lives here — pot, axe, crystal, ranged, mace, objective modes and the ones that exist purely because they are funny.",
    icon: "sword",
    accent: "#55d6ff",
    image: "/assets/pvp spawn hub.png",
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
