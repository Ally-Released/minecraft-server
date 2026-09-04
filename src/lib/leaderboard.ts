export const PLACEMENT_NEEDED = 5;

export const RANK_ORDER = [
  "HT1",
  "HT2",
  "HT3",
  "HT4",
  "MT1",
  "MT2",
  "MT3",
  "MT4",
  "LT1",
  "LT2",
  "LT3",
  "LT4",
] as const;

export type RankId = (typeof RANK_ORDER)[number] | "UNRATED";

export const KITS = [
  { id: "nethpot", label: "NethPot" },
  { id: "ironpot", label: "Iron Pot" },
  { id: "diamondpot", label: "Diamond Pot" },
  { id: "classic", label: "Classic" },
  { id: "boxing", label: "Boxing" },
  { id: "sumo", label: "Sumo" },
  { id: "fighter", label: "Fighter" },
  { id: "axeandshield", label: "Axe & Shield" },
  { id: "beast", label: "Beast" },
  { id: "tank", label: "Tank" },
  { id: "speedtank", label: "Speed Tank" },
  { id: "optank", label: "OP Tank" },
  { id: "cpvpffa", label: "Crystal" },
  { id: "totembreaker", label: "Totem Breaker" },
  { id: "smpkit", label: "SMP" },
  { id: "diasmp", label: "Dia SMP" },
  { id: "bowpvp", label: "Bow" },
  { id: "spearelytra", label: "Spear Elytra" },
  { id: "macepvp", label: "Mace" },
  { id: "macerocket", label: "Mace Rocket" },
  { id: "spearmace", label: "Spear Mace" },
  { id: "spearhorse", label: "Spear Horse" },
  { id: "bedwars", label: "Bedwars" },
  { id: "thebridge", label: "The Bridge" },
  { id: "spleef", label: "Spleef" },
  { id: "mlgrush", label: "MLG Rush" },
  { id: "manhunt", label: "Manhunt" },
  { id: "fireball", label: "Fireball" },
  { id: "lifesteal", label: "Lifesteal" },
  { id: "cartpvp", label: "Cart" },
  { id: "doorpvp", label: "Door" },
  { id: "builduhc", label: "Build UHC" },
] as const;

export type KitId = (typeof KITS)[number]["id"];
export type GameMode = "overall" | KitId;
export type LeaderboardView = "hours" | GameMode;

export const KIT_GROUPS: { label: string; ids: KitId[] }[] = [
  { label: "Pots", ids: ["nethpot", "ironpot", "diamondpot"] },
  { label: "Melee", ids: ["classic", "boxing", "sumo", "fighter"] },
  { label: "Axe", ids: ["axeandshield", "beast", "tank", "speedtank", "optank"] },
  { label: "Crystal / SMP", ids: ["cpvpffa", "totembreaker", "smpkit", "diasmp"] },
  { label: "Ranged / Mace", ids: ["bowpvp", "spearelytra", "macepvp", "macerocket", "spearmace", "spearhorse"] },
  { label: "Objective", ids: ["bedwars", "thebridge", "spleef", "mlgrush"] },
  { label: "Fun", ids: ["manhunt", "fireball", "lifesteal", "cartpvp", "doorpvp", "builduhc"] },
];

const KIT_LABELS: Record<string, string> = Object.fromEntries(
  KITS.map((kit) => [kit.id, kit.label]),
);

export interface KitChip {
  id: string;
  label: string;
  rank: string;
}

export interface RankedMatch {
  id: string;
  opponentName: string;
  opponentUuid?: string;
  opponentSkinUrl?: string;
  kit: string;
  win: boolean;
  lpDelta?: number;
  createdAt: string;
}

export interface PlayerStats {
  id: string;
  username: string;
  uuid: string;
  points: number;
  rank: number;
  division: string;
  kills: number;
  deaths: number;
  wlr: number;
  lp: number;
  ranked_wins: number;
  ranked_losses: number;
  win_streak: number;
  peak_rank: string;
  kd: number;
  hours_played: number;
  placement_played: number;
  skin_url?: string;
  lastActive: string;
  game_mode: string;
  kitRanks?: KitChip[];
}

export interface PlayerRow {
  uuid?: string;
  username?: string;
  game_mode?: string;
  rank?: string;
  lp?: number;
  ranked_wins?: number;
  ranked_losses?: number;
  win_streak?: number;
  peak_rank?: string;
  kills?: number;
  deaths?: number;
  points?: number;
  kd?: number;
  hours_played?: number;
  placement_played?: number;
  skin_url?: string | null;
  last_active?: string;
}

export function modeLabel(mode: LeaderboardView): string {
  if (mode === "hours") return "Hours";
  if (mode === "overall") return "Overall";
  return KIT_LABELS[mode] ?? mode;
}

export function isKitMode(mode: LeaderboardView): mode is KitId {
  return mode !== "hours" && mode !== "overall";
}

export function isPlaced(division?: string | null): boolean {
  return Boolean(division && division.toUpperCase() !== "UNRATED");
}

export function rankIndex(rank?: string | null): number {
  const i = RANK_ORDER.indexOf((rank ?? "").toUpperCase() as (typeof RANK_ORDER)[number]);
  return i === -1 ? 99 : i;
}

export function compareLadder(a: PlayerStats, b: PlayerStats): number {
  const byRank = rankIndex(a.division) - rankIndex(b.division);
  if (byRank !== 0) return byRank;
  if (b.lp !== a.lp) return b.lp - a.lp;
  return b.ranked_wins - a.ranked_wins;
}

export function compareHours(a: PlayerStats, b: PlayerStats): number {
  return b.hours_played - a.hours_played;
}

export function mapPlayerRow(row: PlayerRow, ladderIndex = 0): PlayerStats {
  const division = (row.rank || "UNRATED").toUpperCase();
  const kills = Number(row.kills ?? 0);
  const deaths = Number(row.deaths ?? 0);
  const rankedWins = Number(row.ranked_wins ?? 0);
  const rankedLosses = Number(row.ranked_losses ?? 0);
  const kd =
    row.kd !== undefined && row.kd !== null
      ? Number(row.kd)
      : kills / Math.max(1, deaths);
  const wlr = rankedLosses > 0 ? rankedWins / rankedLosses : rankedWins;
  const gameMode = row.game_mode || "overall";
  return {
    id: `${row.uuid ?? "unknown"}-${gameMode}`,
    username: row.username || "Unknown",
    uuid: row.uuid || "",
    points: Number(row.points ?? 0),
    rank: ladderIndex + 1,
    division,
    kills,
    deaths,
    wlr,
    lp: Number(row.lp ?? 0),
    ranked_wins: rankedWins,
    ranked_losses: rankedLosses,
    win_streak: Number(row.win_streak ?? 0),
    peak_rank: row.peak_rank || division,
    kd,
    hours_played: Number(row.hours_played ?? 0),
    placement_played: Number(row.placement_played ?? 0),
    skin_url: row.skin_url || undefined,
    lastActive: row.last_active || "",
    game_mode: gameMode,
  };
}

export function withLadderRanks(players: PlayerStats[]): PlayerStats[] {
  return players.map((player, index) => ({ ...player, rank: index + 1 }));
}

export const PLACEMENT_COPY =
  "This player has to complete placement matches for information to be displayed.";

export function rankTone(rank?: string | null): {
  bg: string;
  fg: string;
  ring: string;
  bar: string;
  text: string;
} {
  const r = (rank ?? "").toUpperCase();
  if (r.startsWith("HT")) {
    return { bg: "#dd7e46", fg: "#0a0b10", ring: "#dd7e46", bar: "#ffc53f", text: "#dd7e46" };
  }
  if (r.startsWith("MT")) {
    return { bg: "#6ea0ff", fg: "#0a0b10", ring: "#6ea0ff", bar: "#6ea0ff", text: "#8eb4ff" };
  }
  if (r.startsWith("LT")) {
    return { bg: "#8b93a7", fg: "#0a0b10", ring: "#8b93a7", bar: "#8b93a7", text: "#a8b0c2" };
  }
  return { bg: "transparent", fg: "#727c92", ring: "#ffffff21", bar: "#ffffff21", text: "#727c92" };
}

export function placeTone(place: number): string {
  if (place === 1) return "#ffc53f";
  if (place === 2) return "#cad3df";
  if (place === 3) return "#c47a48";
  return "#4d566b";
}

export const LP_PER_DIVISION = 100;
export const PROMOTION_FIRST_TO = 3;
export const PROMOTION_TARGET: Record<string, string> = { LT1: "MT4", MT1: "HT4" };

export type ClimbState =
  | { kind: "placement"; played: number; needed: number; progress: number }
  | { kind: "apex"; lp: number; progress: number }
  | { kind: "gate"; division: string; target: string; lp: number; ready: boolean; progress: number }
  | { kind: "climb"; division: string; next: string; lp: number; needed: number; progress: number };

export function nextDivision(rank?: string | null): string | null {
  const i = rankIndex(rank);
  if (i <= 0 || i === 99) return null;
  return RANK_ORDER[i - 1];
}

export function climbProgress(
  division?: string | null,
  lp = 0,
  placementPlayed = 0,
): ClimbState {
  const d = (division ?? "UNRATED").toUpperCase();
  if (!isPlaced(d)) {
    const played = Math.max(0, Math.min(PLACEMENT_NEEDED, placementPlayed));
    return {
      kind: "placement",
      played,
      needed: PLACEMENT_NEEDED,
      progress: played / PLACEMENT_NEEDED,
    };
  }
  const currentLp = Math.max(0, Math.min(LP_PER_DIVISION, Number(lp) || 0));
  const progress = currentLp / LP_PER_DIVISION;
  if (d === "HT1") return { kind: "apex", lp: currentLp, progress };
  if (d === "LT1" || d === "MT1") {
    return {
      kind: "gate",
      division: d,
      target: PROMOTION_TARGET[d],
      lp: currentLp,
      ready: currentLp >= LP_PER_DIVISION,
      progress,
    };
  }
  const next = nextDivision(d) ?? d;
  return {
    kind: "climb",
    division: d,
    next,
    lp: currentLp,
    needed: Math.max(0, LP_PER_DIVISION - currentLp),
    progress,
  };
}

export function climbHeadline(state: ClimbState): string {
  switch (state.kind) {
    case "placement":
      return `Placement ${state.played}/${state.needed}`;
    case "apex":
      return "HT1 · Apex";
    case "gate":
      return state.ready
        ? `Promotion series → ${state.target}`
        : `${state.lp} / ${LP_PER_DIVISION} LP to series`;
    case "climb":
      return `${state.lp} / ${LP_PER_DIVISION} LP · ${state.needed} to ${state.next}`;
  }
}

export function climbDetail(state: ClimbState): string {
  switch (state.kind) {
    case "placement":
      return "Win 5 placement matches on this kit. Then you hit the board.";
    case "apex":
      return "Highest division. Every ranked loss is a chance for someone else to take it.";
    case "gate":
      return state.ready
        ? `First to ${PROMOTION_FIRST_TO} in a best-of-5. Ladder LP pauses until the series is over.`
        : `Hit ${LP_PER_DIVISION} LP, then win a best-of-5 to reach ${state.target}.`;
    case "climb":
      return `100 LP promotes you to ${state.next}. This bar is the grind.`;
  }
}

export function gamesPlayed(player: Pick<PlayerStats, "ranked_wins" | "ranked_losses">): number {
  return Math.max(0, player.ranked_wins + player.ranked_losses);
}

export function formatRecord(wins: number, losses: number): string {
  return `${wins}–${losses}`;
}

export function formatWinRate(wins: number, losses: number): string | null {
  const total = wins + losses;
  if (total <= 0) return null;
  const pct = (wins / total) * 100;
  return `${pct >= 10 ? pct.toFixed(0) : pct.toFixed(1)}%`;
}

export function hasTrackedCombat(player: Pick<PlayerStats, "kills" | "deaths">): boolean {
  return player.kills > 0 || player.deaths > 0;
}

export function playerSharePath(username: string): string {
  return `/u/${encodeURIComponent(username)}`;
}

export function flexCaption(input: {
  username: string;
  division: string;
  lp: number;
  place?: number | null;
  kitLabel?: string;
  record?: string | null;
}): string {
  const kit = input.kitLabel ?? "Overall";
  const place = input.place ? `#${input.place} ` : "";
  const rankLine = isPlaced(input.division)
    ? `${input.division} · ${input.lp} LP`
    : "Unrated · finishing placement";
  const rec = input.record ? `\n${input.record}` : "";
  return `${input.username} is ${place}${kit} on Clasher Network\n${rankLine}${rec}\nplay.clashernetwork.fun`.replace(
    / {2,}/g,
    " ",
  );
}

export function formatRelativeTime(iso?: string): string {
  if (!iso) return "—";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "—";
  const seconds = Math.max(0, (Date.now() - t) / 1000);
  if (seconds < 45) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 86400 * 14) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatMatchDate(iso?: string): string {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatHours(hours?: number): string {
  if (!hours || hours <= 0) return "—";
  return hours >= 10 ? `${hours.toFixed(0)}` : hours.toFixed(1);
}

export function attachKitRanks(players: PlayerStats[], rows: PlayerRow[]): PlayerStats[] {
  const order = KITS.map((kit) => kit.id);
  const byUuid = new Map<string, KitChip[]>();
  for (const row of rows) {
    if (!row.uuid || !row.game_mode || row.game_mode === "overall") continue;
    if (!isPlaced(row.rank)) continue;
    const list = byUuid.get(row.uuid) ?? [];
    list.push({
      id: row.game_mode,
      label: modeLabel(row.game_mode as LeaderboardView),
      rank: (row.rank || "").toUpperCase(),
    });
    byUuid.set(row.uuid, list);
  }
  return players.map((player) => {
    const chips = [...(byUuid.get(player.uuid) ?? [])].sort(
      (a, b) => order.indexOf(a.id as KitId) - order.indexOf(b.id as KitId),
    );
    return { ...player, kitRanks: chips };
  });
}

export function mapMatchRow(row: Record<string, unknown>): RankedMatch {
  return {
    id: String(row.id ?? row.match_id ?? crypto.randomUUID()),
    opponentName: String(row.opponent_name ?? row.opponentName ?? "Unknown"),
    opponentUuid: row.opponent_uuid ? String(row.opponent_uuid) : undefined,
    opponentSkinUrl: row.opponent_skin_url ? String(row.opponent_skin_url) : undefined,
    kit: String(row.kit ?? row.game_mode ?? ""),
    win: Boolean(row.win),
    lpDelta: row.lp_delta == null ? undefined : Number(row.lp_delta),
    createdAt: String(row.created_at ?? row.createdAt ?? ""),
  };
}
