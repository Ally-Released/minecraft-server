/**
 * Single source of truth for everything server-specific.
 * Change values here — never inside components.
 */
export const SERVER_CONFIG = {
  /* ── Identity ─────────────────────────────────────────── */
  name: "Clasher Network",
  shortName: "Clasher",
  logo: "/assets/cn-logo.jpg",
  url: "https://clashernetwork.fun",

  /* ── Connection ───────────────────────────────────────── */
  ip: "play.clashernetwork.fun",
  port: "8000",
  version: "1.21.x",
  maxPlayers: 500,
  editions: ["Java", "Bedrock"] as const,
  accounts: "Premium and cracked",

  /* ── Community ────────────────────────────────────────── */
  discord: "https://discord.gg/clashernetwork",

  /* ── Copy ─────────────────────────────────────────────── */
  description: "Build your story. Explore a world shaped by its players.",

  hero: {
    eyebrow: "A world shaped by its players",
    /** Rendered as separate lines of key art. */
    headline: ["Every block here", "was placed", "by someone."],
  },

  intro: {
    eyebrow: "The world",
    headline: ["You arrive.", "The world is already alive."],
    body: "No tutorial island. No empty lobby. You spawn into terrain that other people have already walked through, mined out, fought over and rebuilt. Whatever you do next becomes part of it.",
    pillars: [
      {
        key: "explore",
        label: "Explore",
        line: "Walk far enough and the builds stop. That is where it gets interesting.",
      },
      {
        key: "create",
        label: "Create",
        line: "Claim your ground and put something on the map that outlasts you.",
      },
      {
        key: "belong",
        label: "Belong",
        line: "Trade, argue, team up. The server is the people on it.",
      },
    ],
  },

  /* ── Join flow ────────────────────────────────────────── */
  steps: [
    {
      title: "Get Minecraft ready",
      body: "Launch Minecraft on Java or Bedrock. Any recent release works — the server runs {version}. Premium and cracked accounts are both welcome.",
      hint: "Java Edition · Bedrock Edition",
    },
    {
      title: "Open Multiplayer",
      body: "From the main menu choose Multiplayer, then Add Server. Name it anything you like — you will only ever see it in your own list.",
      hint: "Multiplayer → Add Server",
    },
    {
      title: "Enter the address",
      body: "Paste the address below into the Server Address field, then save. Bedrock players enter the address and port separately.",
      hint: "Address {ip} · Port {port}",
    },
    {
      title: "Begin your story",
      body: "Join the server, pick a direction and start walking. Read the rules once — they are short — and say hello in Discord if you want people to build with.",
      hint: "See you out there",
    },
  ],

  /* ── Real server features (do not invent) ─────────────── */
  features: [
    { icon: "Sword", label: "Survival", description: "Classic survival with real stakes" },
    { icon: "Globe", label: "Custom World", description: "Hand-crafted terrain and biomes" },
    { icon: "Hammer", label: "Player Builds", description: "Build anything, claim everything" },
    { icon: "Calendar", label: "Events", description: "Weekly tournaments and challenges" },
    { icon: "Shield", label: "Active Staff", description: "Moderation around the clock" },
    { icon: "Users", label: "Community", description: "Friendly players from everywhere" },
  ],

  /* ── Rules ────────────────────────────────────────────── */
  rules: {
    general: [
      "Treat all players with respect — no harassment, bullying, or discrimination.",
      "Follow staff instructions at all times.",
      "No impersonating staff members or other players.",
      "Keep conversations appropriate for all ages.",
      "Report issues through the proper channels on Discord.",
    ],
    gameplay: [
      "No cheating, hacking, or using exploits of any kind.",
      "No X-ray, fly hacks, kill aura, or auto-clickers.",
      "No abusing game-breaking bugs — report them instead.",
      "PvP is allowed only in designated areas unless mutually agreed upon.",
      "No AFK machines that impact server performance.",
    ],
    building: [
      "No griefing or destroying other players' builds.",
      "No stealing from other players' chests or storage.",
      "No inappropriate, offensive, or NSFW builds.",
      "Claim your land to protect your builds.",
      "Do not build within 100 blocks of another player's base without permission.",
    ],
    chat: [
      "No spamming, flooding, or excessive caps in chat.",
      "No advertising other servers or services.",
      "No sharing personal information in public chat.",
      "Keep political and religious debates out of chat.",
      "English is the primary language in global chat.",
    ],
  },

  /* ── Discord section ──────────────────────────────────── */
  community: {
    headline: ["The world", "doesn't end here."],
    body: "Most of what happens on the server starts in Discord — trades, builds, raids, arguments about where the next town goes.",
    reasons: [
      "Meet players before you meet them in game",
      "Follow announcements and downtime notices",
      "Find teammates for events and builds",
      "Get support directly from staff",
    ],
  },

  /* ── Live status adapter ──────────────────────────────── */
  status: {
    /** Third-party query API. Swap freely — see src/lib/status.ts. */
    endpoint: "https://api.mcstatus.io/v2/status/java",
    /** Seconds between refreshes of the cached server response. */
    revalidate: 60,
  },
} as const;

export type RuleCategory = keyof typeof SERVER_CONFIG.rules;

/** Fills {ip} / {port} / {version} placeholders in config copy. */
export function fill(template: string): string {
  return template
    .replace(/\{ip\}/g, SERVER_CONFIG.ip)
    .replace(/\{port\}/g, SERVER_CONFIG.port)
    .replace(/\{version\}/g, SERVER_CONFIG.version);
}
