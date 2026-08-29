import type { IconName } from "@/components/ui/Icon";

/* ══════════════════════════════════════════════════════════════
   PVP PRACTICE

   Every duel type the practice server runs, grouped the way the
   in-game selector groups them.

   The objective/equipment/rules text describes what each duel type
   *is* as a format. None of it asserts server-specific tuning —
   treat it as editable copy and adjust it to match the real arenas.
   ══════════════════════════════════════════════════════════════ */

export type Difficulty = 1 | 2 | 3 | 4;

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: "Casual",
  2: "Standard",
  3: "Technical",
  4: "Brutal",
};

export type PvpMode = {
  id: string;
  name: string;
  icon: IconName;
  blurb: string;
  objective: string;
  equipment: string[];
  rules: string[];
  difficulty: Difficulty;
};

export type PvpCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  blurb: string;
  icon: IconName;
  accent: string;
  modes: PvpMode[];
};

export const PVP_CATEGORIES: PvpCategory[] = [
  {
    slug: "sword",
    name: "Sword Duels",
    eyebrow: "The foundation",
    blurb: "Where everyone starts and most people stay. Gear varies, the fundamentals do not.",
    icon: "sword",
    accent: "#4da3ff",
    modes: [
      {
        id: "netherpot",
        name: "NetherPot",
        icon: "potion",
        blurb: "Netherite armour and splash healing. The longest, most technical duels on the server.",
        objective: "Eliminate your opponent before they out-sustain you.",
        equipment: ["Netherite armour", "Enchanted sword", "Splash Instant Health II", "Ender pearls"],
        rules: [
          "Potions are the main healing source — manage the stack",
          "Pearls reposition, they do not escape",
          "No crystals or explosives",
        ],
        difficulty: 3,
      },
      {
        id: "ironpot",
        name: "IronPot",
        icon: "potion",
        blurb: "Pot fighting on iron. Lower armour means less room for a bad combo.",
        objective: "Eliminate your opponent.",
        equipment: ["Iron armour", "Enchanted sword", "Splash Instant Health II"],
        rules: ["Iron armour only", "Healing comes from potions", "No crystals"],
        difficulty: 3,
      },
      {
        id: "diamondpot",
        name: "DiamondPot",
        icon: "potion",
        blurb: "The middle ground: diamond armour, full potion pressure.",
        objective: "Eliminate your opponent.",
        equipment: ["Diamond armour", "Enchanted sword", "Splash Instant Health II"],
        rules: ["Diamond armour only", "Healing comes from potions", "No crystals"],
        difficulty: 3,
      },
      {
        id: "classic",
        name: "Classic",
        icon: "sword",
        blurb: "No potions. Golden apples, a sword, and whoever reads the fight better.",
        objective: "Eliminate your opponent.",
        equipment: ["Diamond armour", "Enchanted sword", "Golden apples"],
        rules: ["No potions", "Golden apples for healing", "Straight sword combat"],
        difficulty: 2,
      },
      {
        id: "boxing",
        name: "Boxing",
        icon: "fist",
        blurb: "Nobody dies. First to land the hit count wins — pure aim and spacing.",
        objective: "Land the target number of hits before your opponent does.",
        equipment: ["No armour", "Unenchanted sword"],
        rules: ["Damage is disabled — hits are counted", "No healing", "No knockback resistance"],
        difficulty: 2,
      },
      {
        id: "sumo",
        name: "Sumo",
        icon: "sumo",
        blurb: "A platform over nothing. No weapons, no armour, no second chances.",
        objective: "Knock your opponent off the platform.",
        equipment: ["No gear"],
        rules: ["No weapons", "Leaving the platform is a loss", "Knockback only"],
        difficulty: 1,
      },
    ],
  },
  {
    slug: "axe",
    name: "Axe Duels",
    eyebrow: "Burst and shield",
    blurb: "Higher damage, slower swings, and a shield that decides everything.",
    icon: "axe",
    accent: "#7fa2ff",
    modes: [
      {
        id: "axe-shield",
        name: "Axe & Shield",
        icon: "shield",
        blurb: "The classic axe format. Break the shield, then punish the window you made.",
        objective: "Eliminate your opponent.",
        equipment: ["Axe", "Shield", "Diamond armour"],
        rules: ["Axes disable shields on hit", "Shield timing is the whole skill", "No potions"],
        difficulty: 3,
      },
      {
        id: "beast",
        name: "Beast",
        icon: "axe",
        blurb: "Strength-boosted axe kit. Fights end in two or three clean connections.",
        objective: "Eliminate your opponent.",
        equipment: ["Enchanted axe", "Shield", "Strength effect"],
        rules: ["Very high burst damage", "No potions", "Short time to kill"],
        difficulty: 3,
      },
      {
        id: "tank",
        name: "Tank",
        icon: "chestplate",
        blurb: "Heavy armour, long fights. A war of attrition rather than a race.",
        objective: "Eliminate your opponent.",
        equipment: ["Heavily enchanted armour", "Axe", "Shield"],
        rules: ["High effective health", "Expect long fights", "Stamina and patience matter"],
        difficulty: 2,
      },
      {
        id: "speed-tank",
        name: "Speed Tank",
        icon: "speed",
        blurb: "Tank durability with movement on top. Disengaging is a real option.",
        objective: "Eliminate your opponent.",
        equipment: ["Heavy armour", "Axe", "Shield", "Speed effect"],
        rules: ["Speed effect applied", "Repositioning is free", "No potions"],
        difficulty: 3,
      },
      {
        id: "op-tank",
        name: "OP Tank",
        icon: "helmet",
        blurb: "Overpowered enchantments on both sides. The most forgiving duel on the board.",
        objective: "Eliminate your opponent.",
        equipment: ["Over-enchanted armour", "Over-enchanted axe", "Shield"],
        rules: ["Enchantments beyond survival limits", "Very long fights", "Mistakes are survivable"],
        difficulty: 4,
      },
    ],
  },
  {
    slug: "crystal",
    name: "Crystal PvP",
    eyebrow: "The hardest ceiling",
    blurb: "End crystals, obsidian and totems. The highest execution ceiling in the game.",
    icon: "crystal",
    accent: "#6f6cf5",
    modes: [
      {
        id: "crystal",
        name: "Crystal PvP",
        icon: "crystal",
        blurb: "Place, detonate, replace. Everything happens faster than you can plan it.",
        objective: "Burn through your opponent's totems, then finish them.",
        equipment: ["Netherite armour", "End crystals", "Obsidian", "Totems of Undying"],
        rules: [
          "Crystals do the damage — swords only finish",
          "Obsidian is both cover and a platform",
          "Totems make health a resource, not a limit",
        ],
        difficulty: 4,
      },
      {
        id: "totem-breaker",
        name: "Totem Breaker",
        icon: "totem",
        blurb: "A crystal fight with one win condition: run them out of totems first.",
        objective: "Force your opponent to consume every totem they carry.",
        equipment: ["Netherite armour", "End crystals", "Limited totems"],
        rules: [
          "Totem count is capped and visible",
          "Popping a totem is progress, not a reset",
          "The fight ends when the last one is gone",
        ],
        difficulty: 4,
      },
    ],
  },
  {
    slug: "ranged",
    name: "Ranged Duels",
    eyebrow: "Distance work",
    blurb: "Fights decided before anyone is close enough to swing.",
    icon: "bow",
    accent: "#55d6ff",
    modes: [
      {
        id: "bow",
        name: "Bow PvP",
        icon: "bow",
        blurb: "Bows only. Leading a moving target across an open arena.",
        objective: "Eliminate your opponent at range.",
        equipment: ["Bow", "Arrows", "Light armour"],
        rules: ["No melee weapons", "Arrow supply is limited", "Movement beats accuracy"],
        difficulty: 3,
      },
      {
        id: "spear-elytra",
        name: "Spear Elytra",
        icon: "elytra",
        blurb: "Trident in hand, elytra on your back. Combat in three dimensions.",
        objective: "Eliminate your opponent while both of you are airborne.",
        equipment: ["Trident", "Elytra", "Firework rockets"],
        rules: ["Flight is the primary movement", "Tridents can be thrown or held", "Altitude is the advantage"],
        difficulty: 4,
      },
    ],
  },
  {
    slug: "special",
    name: "Special Duels",
    eyebrow: "New tools",
    blurb: "The mace and trident formats — the newest and least solved fights on the server.",
    icon: "mace",
    accent: "#7a8cff",
    modes: [
      {
        id: "mace",
        name: "Mace PvP",
        icon: "mace",
        blurb: "Damage scales with how far you fell to deliver it. Get above them.",
        objective: "Eliminate your opponent with fall-scaled mace damage.",
        equipment: ["Mace", "Wind charges", "Light armour"],
        rules: ["Mace damage scales with fall distance", "Wind charges gain height", "Being underneath is losing"],
        difficulty: 4,
      },
      {
        id: "mace-rockets",
        name: "Mace Rockets",
        icon: "elytra",
        blurb: "Elytra and rockets for altitude, mace for the landing.",
        objective: "Gain height, then convert it into a single decisive hit.",
        equipment: ["Mace", "Elytra", "Firework rockets"],
        rules: ["Rockets are the height source", "One clean dive can end it", "Rocket supply is limited"],
        difficulty: 4,
      },
      {
        id: "spear-mace",
        name: "Spear Mace",
        icon: "trident",
        blurb: "Trident to close the gap, mace to finish. Two tools, one combo.",
        objective: "Eliminate your opponent.",
        equipment: ["Trident", "Mace", "Light armour"],
        rules: ["Riptide and mace combine", "Weather may affect riptide", "Timing over raw aim"],
        difficulty: 4,
      },
      {
        id: "spear-horse",
        name: "Spear Horse",
        icon: "horse",
        blurb: "Mounted combat. Whoever controls the spacing controls the duel.",
        objective: "Unseat or eliminate your opponent.",
        equipment: ["Horse", "Trident", "Light armour"],
        rules: ["Fought from horseback", "Dismounting is a disadvantage", "Charges and passes, not brawls"],
        difficulty: 3,
      },
    ],
  },
  {
    slug: "objective",
    name: "Objective Modes",
    eyebrow: "Win without killing",
    blurb: "Formats where the kill is a means, not the goal.",
    icon: "bed",
    accent: "#4da3ff",
    modes: [
      {
        id: "bedwars",
        name: "BedWars",
        icon: "bed",
        blurb: "Your bed is your respawn. Break theirs and they stop coming back.",
        objective: "Destroy the opposing bed, then eliminate the players.",
        equipment: ["Blocks", "Sword", "Resources from generators"],
        rules: ["Losing your bed removes respawns", "Defend with blocks", "Generators fund the fight"],
        difficulty: 2,
      },
      {
        id: "bridge",
        name: "The Bridge",
        icon: "bridge",
        blurb: "Build across the gap and score. Kills only buy you time.",
        objective: "Score in the opposing goal a set number of times.",
        equipment: ["Blocks", "Sword", "Bow", "Pickaxe"],
        rules: ["Scoring resets both players", "Blocks are unlimited", "Falling costs you the run"],
        difficulty: 3,
      },
      {
        id: "spleef",
        name: "Spleef",
        icon: "spleef",
        blurb: "No combat at all. Remove the floor under the other person.",
        objective: "Make your opponent fall through the arena floor.",
        equipment: ["Shovel"],
        rules: ["No weapons", "Breaking blocks is the only attack", "Last one standing wins"],
        difficulty: 1,
      },
      {
        id: "mlg-rush",
        name: "MLG Rush",
        icon: "block",
        blurb: "A race to the other bed with a clutch at the end of it.",
        objective: "Reach and break the opposing bed first.",
        equipment: ["Blocks", "Sword", "Pickaxe"],
        rules: ["Speed over safety", "Clutching is expected", "First bed broken wins"],
        difficulty: 3,
      },
    ],
  },
  {
    slug: "fun",
    name: "Fun Modes",
    eyebrow: "Not serious",
    blurb: "The formats that exist because somebody tried it once and it was funny.",
    icon: "fireball",
    accent: "#7fe4ff",
    modes: [
      {
        id: "manhunt",
        name: "Manhunt",
        icon: "player",
        blurb: "One runner, one hunter with a compass. Asymmetric on purpose.",
        objective: "Runner survives the timer, hunter catches them before it ends.",
        equipment: ["Compass for the hunter", "Head start for the runner"],
        rules: ["Roles are asymmetric", "The compass always points at the runner", "Timed rounds"],
        difficulty: 2,
      },
      {
        id: "fireball",
        name: "Fireball",
        icon: "fireball",
        blurb: "Fireballs and knockback over a drop. Aim at the floor, not the person.",
        objective: "Knock your opponent out of the arena.",
        equipment: ["Fireballs", "Knockback stick"],
        rules: ["Explosion knockback is the weapon", "No fall protection", "Leaving the arena is a loss"],
        difficulty: 2,
      },
      {
        id: "lifesteal",
        name: "Lifesteal",
        icon: "heart",
        blurb: "Damage you deal comes back to you as health. Aggression is sustain.",
        objective: "Eliminate your opponent while healing off the damage you deal.",
        equipment: ["Sword", "Light armour"],
        rules: ["Hits restore your own health", "No potions", "Passive play loses"],
        difficulty: 3,
      },
      {
        id: "cart",
        name: "Cart PvP",
        icon: "minecart",
        blurb: "Both players in minecarts. You cannot strafe, so commit early.",
        objective: "Eliminate your opponent from the cart.",
        equipment: ["Minecart", "Sword", "Rails"],
        rules: ["Fought from inside a cart", "No free movement", "Leaving the cart is a disadvantage"],
        difficulty: 2,
      },
      {
        id: "door",
        name: "Door PvP",
        icon: "door",
        blurb: "Doors as cover, doors as weapons. Exactly as ridiculous as it sounds.",
        objective: "Eliminate your opponent.",
        equipment: ["Doors", "Sword"],
        rules: ["Doors can be placed mid-fight", "Cover is temporary", "Nobody takes this seriously"],
        difficulty: 1,
      },
    ],
  },
];

export function pvpCategory(slug: string) {
  return PVP_CATEGORIES.find((c) => c.slug === slug);
}

export const PVP_MODE_COUNT = PVP_CATEGORIES.reduce((n, c) => n + c.modes.length, 0);
