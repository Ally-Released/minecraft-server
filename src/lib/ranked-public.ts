import {
  KITS,
  PlayerRow,
  PlayerStats,
  climbHeadline,
  climbProgress,
  compareLadder,
  flexCaption,
  formatRecord,
  gamesPlayed,
  isPlaced,
  mapPlayerRow,
  modeLabel,
  withLadderRanks,
  type KitId,
} from "@/lib/leaderboard";

export type FlexCardData = {
  username: string;
  uuid: string;
  division: string;
  lp: number;
  place: number | null;
  fieldSize: number;
  ranked_wins: number;
  ranked_losses: number;
  win_streak: number;
  peak_rank: string;
  hours_played: number;
  placement_played: number;
  skin_url?: string;
  kitsRanked: number;
  bestKit?: { id: string; label: string; division: string; lp: number };
  climbLine: string;
  caption: string;
  sharePath: string;
};

/** CamelCase view of Supabase ranked_rounds (cloud source of truth). */
export type RankedRound = {
  matchId: string;
  roundIndex: number;
  winnerUuid: string;
  loserUuid: string;
  winnerHearts: number;
  loserHearts: number;
  durationMs: number;
  createdAt: string;
};

/** CamelCase view of Supabase ranked_matches. */
export type RankedMatchSeries = {
  matchId: string;
  kit: string;
  kind: string;
  playerAUuid: string;
  playerAName: string;
  playerBUuid: string;
  playerBName: string;
  winnerUuid: string | null;
  aLpDelta: number;
  bLpDelta: number;
  aRankBefore: string;
  aRankAfter: string;
  bRankBefore: string;
  bRankAfter: string;
  roundsA: number;
  roundsB: number;
  placement: boolean;
  promotion: boolean;
  voided: boolean;
  createdAt: string;
  rounds?: RankedRound[];
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
    next: { revalidate: 15 },
  });
  if (!res.ok) {
    throw new Error(`Supabase query failed (${res.status}): ${query.slice(0, 80)}`);
  }
  return (await res.json()) as T;
}

function normalizeName(raw: string): string {
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw.trim();
  }
}

export async function fetchPlayerRowsByUsername(rawName: string): Promise<PlayerStats[]> {
  const username = normalizeName(rawName);
  if (!username) return [];
  const encoded = encodeURIComponent(username);
  let rows = await rest<PlayerRow[]>(`players?username=eq.${encoded}&select=*`);
  if (!rows.length) {
    const escaped = username.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
    rows = await rest<PlayerRow[]>(`players?username=ilike.${encodeURIComponent(escaped)}&select=*`);
  }
  return rows.map((row) => mapPlayerRow(row));
}

export async function fetchOverallLadder(): Promise<PlayerStats[]> {
  const rows = await rest<PlayerRow[]>(
    "players?game_mode=eq.overall&rank=neq.UNRATED&select=uuid,username,rank,lp,ranked_wins,ranked_losses,game_mode,skin_url,peak_rank,win_streak,hours_played,placement_played,kills,deaths,points,kd,last_active",
  );
  return withLadderRanks(rows.map((row) => mapPlayerRow(row)).sort(compareLadder));
}

export async function fetchFlexCard(rawName: string): Promise<FlexCardData | null> {
  const ladders = await fetchPlayerRowsByUsername(rawName);
  if (!ladders.length) return null;

  const overall = ladders.find((row) => row.game_mode === "overall") ?? ladders[0];
  const kitOrder = KITS.map((kit) => kit.id);
  const placedKits = ladders
    .filter((row) => row.game_mode !== "overall" && isPlaced(row.division))
    .sort((a, b) => kitOrder.indexOf(a.game_mode as KitId) - kitOrder.indexOf(b.game_mode as KitId));

  let place: number | null = null;
  let fieldSize = 0;
  if (overall.game_mode === "overall" && isPlaced(overall.division)) {
    const board = await fetchOverallLadder();
    fieldSize = board.length;
    place = board.find((row) => row.uuid === overall.uuid)?.rank ?? null;
  }

  const best = [...placedKits].sort(compareLadder)[0];
  const games = gamesPlayed(overall);
  const climb = climbProgress(overall.division, overall.lp, overall.placement_played);
  const caption = flexCaption({
    username: overall.username,
    division: overall.division,
    lp: overall.lp,
    place,
    kitLabel: "Overall",
    record: games > 0 ? formatRecord(overall.ranked_wins, overall.ranked_losses) : null,
  });

  return {
    username: overall.username,
    uuid: overall.uuid,
    division: overall.division,
    lp: overall.lp,
    place,
    fieldSize,
    ranked_wins: overall.ranked_wins,
    ranked_losses: overall.ranked_losses,
    win_streak: overall.win_streak,
    peak_rank: overall.peak_rank,
    hours_played: overall.hours_played,
    placement_played: overall.placement_played,
    skin_url: overall.skin_url,
    kitsRanked: placedKits.length,
    bestKit: best
      ? {
          id: best.game_mode,
          label: modeLabel(best.game_mode as KitId),
          division: best.division,
          lp: best.lp,
        }
      : undefined,
    climbLine: climbHeadline(climb),
    caption,
    sharePath: `/u/${encodeURIComponent(overall.username)}`,
  };
}

type MatchRow = Record<string, unknown>;
type RoundRow = Record<string, unknown>;

function mapMatch(row: MatchRow): RankedMatchSeries {
  return {
    matchId: String(row.match_id ?? ""),
    kit: String(row.kit ?? ""),
    kind: String(row.kind ?? "NORMAL"),
    playerAUuid: String(row.player_a_uuid ?? ""),
    playerAName: String(row.player_a_name ?? "?"),
    playerBUuid: String(row.player_b_uuid ?? ""),
    playerBName: String(row.player_b_name ?? "?"),
    winnerUuid: row.winner_uuid ? String(row.winner_uuid) : null,
    aLpDelta: Number(row.a_lp_delta ?? 0),
    bLpDelta: Number(row.b_lp_delta ?? 0),
    aRankBefore: String(row.a_rank_before ?? "UNRATED"),
    aRankAfter: String(row.a_rank_after ?? "UNRATED"),
    bRankBefore: String(row.b_rank_before ?? "UNRATED"),
    bRankAfter: String(row.b_rank_after ?? "UNRATED"),
    roundsA: Number(row.rounds_a ?? 0),
    roundsB: Number(row.rounds_b ?? 0),
    placement: Boolean(row.placement),
    promotion: Boolean(row.promotion),
    voided: Boolean(row.voided),
    createdAt: String(row.created_at ?? ""),
  };
}

function mapRound(row: RoundRow): RankedRound {
  return {
    matchId: String(row.match_id ?? ""),
    roundIndex: Number(row.round_index ?? 0),
    winnerUuid: String(row.winner_uuid ?? ""),
    loserUuid: String(row.loser_uuid ?? ""),
    winnerHearts: Number(row.winner_hearts ?? 0),
    loserHearts: Number(row.loser_hearts ?? 0),
    durationMs: Number(row.duration_ms ?? 0),
    createdAt: String(row.created_at ?? ""),
  };
}

/** Live series from Supabase — cloud is the durable source of truth. */
export async function fetchMatchesForUuid(uuid: string, kit?: string | null): Promise<RankedMatchSeries[]> {
  if (!uuid) return [];
  const encoded = encodeURIComponent(uuid);
  let query =
    `ranked_matches?or=(player_a_uuid.eq.${encoded},player_b_uuid.eq.${encoded})&order=created_at.desc&limit=50`;
  if (kit) query += `&kit=eq.${encodeURIComponent(kit)}`;
  const rows = await rest<MatchRow[]>(query);
  return rows.map(mapMatch);
}

export async function fetchMatch(matchId: string): Promise<RankedMatchSeries | null> {
  if (!matchId) return null;
  const rows = await rest<MatchRow[]>(
    `ranked_matches?match_id=eq.${encodeURIComponent(matchId)}&select=*&limit=1`,
  );
  return rows[0] ? mapMatch(rows[0]) : null;
}

export async function fetchRounds(matchId: string): Promise<RankedRound[]> {
  if (!matchId) return [];
  const rows = await rest<RoundRow[]>(
    `ranked_rounds?match_id=eq.${encodeURIComponent(matchId)}&order=round_index.asc`,
  );
  return rows.map(mapRound);
}

export async function fetchMatchWithRounds(matchId: string): Promise<RankedMatchSeries | null> {
  const match = await fetchMatch(matchId);
  if (!match) return null;
  match.rounds = await fetchRounds(matchId);
  return match;
}

export function perspective(
  match: RankedMatchSeries,
  uuid: string,
): {
  won: boolean | null;
  lpDelta: number;
  rankBefore: string;
  rankAfter: string;
  opponentName: string;
  opponentUuid: string;
  myRounds: number;
  oppRounds: number;
} {
  const isA = match.playerAUuid === uuid;
  const isB = match.playerBUuid === uuid;
  if (!isA && !isB) {
    return {
      won: null,
      lpDelta: 0,
      rankBefore: "UNRATED",
      rankAfter: "UNRATED",
      opponentName: "?",
      opponentUuid: "",
      myRounds: 0,
      oppRounds: 0,
    };
  }
  const won = match.winnerUuid ? match.winnerUuid === uuid : null;
  return {
    won,
    lpDelta: isA ? match.aLpDelta : match.bLpDelta,
    rankBefore: isA ? match.aRankBefore : match.bRankBefore,
    rankAfter: isA ? match.aRankAfter : match.bRankAfter,
    opponentName: isA ? match.playerBName : match.playerAName,
    opponentUuid: isA ? match.playerBUuid : match.playerAUuid,
    myRounds: isA ? match.roundsA : match.roundsB,
    oppRounds: isA ? match.roundsB : match.roundsA,
  };
}
