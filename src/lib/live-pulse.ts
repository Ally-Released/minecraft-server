import { PVP_CATEGORIES } from "@/lib/pvp";

export type CategoryLive = {
  queued: number;
  fighting: number;
  plays7d: number;
};

export type LivePulse = {
  onlinePlayers: number;
  inQueue: number;
  inFight: number;
  rankedQueued: number;
  rankedFighting: number;
  categories: Record<string, CategoryLive>;
  updatedAt: string | null;
  stale: boolean;
};

const EMPTY_CAT: CategoryLive = { queued: 0, fighting: 0, plays7d: 0 };

/** Kit slug (plugin) → category slug (site). */
const KIT_TO_CATEGORY: Record<string, string> = {
  nethpot: "sword",
  ironpot: "sword",
  diamondpot: "sword",
  classic: "sword",
  boxing: "sword",
  sumo: "sword",
  fighter: "sword",
  axeandshield: "axe",
  beast: "axe",
  tank: "axe",
  speedtank: "axe",
  optank: "axe",
  cpvpffa: "crystal",
  totembreaker: "crystal",
  smpkit: "crystal",
  diasmp: "crystal",
  bowpvp: "ranged",
  spearelytra: "ranged",
  macepvp: "special",
  macerocket: "special",
  spearmace: "special",
  spearhorse: "special",
  bedwars: "objective",
  thebridge: "objective",
  spleef: "objective",
  mlgrush: "objective",
  manhunt: "fun",
  fireball: "fun",
  lifesteal: "fun",
  cartpvp: "fun",
  doorpvp: "fun",
  builduhc: "fun",
};

function anonHeaders(): HeadersInit {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json",
  };
}

async function rest<T>(query: string): Promise<T> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  const res = await fetch(`${base}/rest/v1/${query}`, {
    headers: anonHeaders(),
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    throw new Error(`Supabase query failed (${res.status})`);
  }
  return (await res.json()) as T;
}

function emptyCategories(): Record<string, CategoryLive> {
  const out: Record<string, CategoryLive> = {};
  for (const cat of PVP_CATEGORIES) {
    out[cat.slug] = { ...EMPTY_CAT };
  }
  return out;
}

/** Live pulse + 7-day ranked series counts rolled into PvP categories. */
export async function fetchLivePulse(): Promise<LivePulse> {
  const categories = emptyCategories();
  let onlinePlayers = 0;
  let inQueue = 0;
  let inFight = 0;
  let rankedQueued = 0;
  let rankedFighting = 0;
  let updatedAt: string | null = null;

  try {
    const rows = await rest<
      Array<{
        online_players: number;
        in_queue: number;
        in_fight: number;
        ranked_queued: number;
        ranked_fighting: number;
        categories: Record<string, { queued?: number; fighting?: number }> | null;
        updated_at: string;
      }>
    >("live_pulse?id=eq.practice&select=*&limit=1");
    const row = rows[0];
    if (row) {
      onlinePlayers = Number(row.online_players ?? 0);
      inQueue = Number(row.in_queue ?? 0);
      inFight = Number(row.in_fight ?? 0);
      rankedQueued = Number(row.ranked_queued ?? 0);
      rankedFighting = Number(row.ranked_fighting ?? 0);
      updatedAt = row.updated_at ?? null;
      const raw = row.categories ?? {};
      for (const [slug, vals] of Object.entries(raw)) {
        if (!categories[slug]) continue;
        categories[slug].queued = Number(vals?.queued ?? 0);
        categories[slug].fighting = Number(vals?.fighting ?? 0);
      }
    }
  } catch {
    // pulse table may be empty before plugin reload
  }

  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const matches = await rest<Array<{ kit: string }>>(
      `ranked_matches?created_at=gte.${encodeURIComponent(since)}&select=kit&limit=5000`,
    );
    for (const m of matches) {
      const cat = KIT_TO_CATEGORY[String(m.kit ?? "").toLowerCase()];
      if (!cat || !categories[cat]) continue;
      categories[cat].plays7d += 1;
    }
  } catch {
    // matches table empty is fine
  }

  const ageMs = updatedAt ? Date.now() - new Date(updatedAt).getTime() : Number.POSITIVE_INFINITY;
  return {
    onlinePlayers,
    inQueue,
    inFight,
    rankedQueued,
    rankedFighting,
    categories,
    updatedAt,
    stale: ageMs > 90_000,
  };
}

export function categoryLive(pulse: LivePulse, slug: string): CategoryLive {
  return pulse.categories[slug] ?? EMPTY_CAT;
}
