"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopPodium } from "@/components/leaderboard/TopPodium";
import { LeaderboardGrid } from "@/components/leaderboard/LeaderboardGrid";
import { SearchFilterBar } from "@/components/leaderboard/SearchFilterBar";
import { PlayerSearch } from "@/components/leaderboard/PlayerSearch";
import { CopyPlayIp } from "@/components/leaderboard/CopyPlayIp";
import {
  LeaderboardView,
  PlayerStats,
  attachKitRanks,
  compareHours,
  compareLadder,
  mapPlayerRow,
  modeLabel,
  withLadderRanks,
  type PlayerRow,
} from "@/lib/leaderboard";
import { createClient } from "@/utils/supabase/client";

function sortBoard(view: LeaderboardView, rows: PlayerStats[]): PlayerStats[] {
  const copy = [...rows];
  if (view === "hours") {
    copy.sort(compareHours);
  } else {
    copy.sort(compareLadder);
  }
  return withLadderRanks(copy);
}

export default function LeaderboardPage() {
  const [activeView, setActiveView] = useState<LeaderboardView>("overall");
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const playerParam = searchParams.get("player");

  const supabase = useMemo(() => createClient(), []);

  // /leaderboard?player=Name → redirect to /u/Name (canonical profile URL)
  useEffect(() => {
    if (playerParam) {
      router.replace(`/u/${encodeURIComponent(playerParam)}`);
    }
  }, [playerParam, router]);

  const fetchBoard = useCallback(async () => {
    setIsLoading(true);
    const isHours = activeView === "hours";
    const mode = isHours ? "overall" : activeView;

    let query = supabase.from("players").select("*").eq("game_mode", mode);
    if (!isHours) {
      query = query.neq("rank", "UNRATED");
    }

    const { data, error } = await query.limit(500);
    if (error) {
      console.error("Error fetching leaderboard:", error);
      setIsLoading(false);
      return;
    }

    let mapped = sortBoard(activeView, ((data ?? []) as PlayerRow[]).map((row) => mapPlayerRow(row)));

    if (activeView === "overall" && mapped.length > 0) {
      const uuids = mapped.map((player) => player.uuid).filter(Boolean);
      const { data: kitRows } = await supabase
        .from("players")
        .select("uuid, game_mode, rank, lp")
        .in("uuid", uuids)
        .neq("game_mode", "overall")
        .neq("rank", "UNRATED");
      mapped = attachKitRanks(mapped, (kitRows ?? []) as PlayerRow[]);
    }

    setPlayers(mapped);
    setIsLoading(false);
  }, [activeView, supabase]);

  useEffect(() => {
    fetchBoard();
    const channel = supabase
      .channel(`leaderboard-${activeView}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
          filter: `game_mode=eq.${activeView === "hours" ? "overall" : activeView}`,
        },
        () => {
          fetchBoard();
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeView, fetchBoard, supabase]);

  // On player click → navigate to canonical /u/[username] profile
  const handleSelectPlayer = (player: PlayerStats | null) => {
    if (player) {
      router.push(`/u/${encodeURIComponent(player.username)}`);
    }
  };

  const titleMode = modeLabel(activeView);

  return (
    <div className="relative z-10 mx-auto min-h-[70vh] max-w-[1320px] px-4 py-6 pt-24 lg:px-6 lg:pt-28">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6">
        <div className="relative overflow-hidden rounded-[12px] border border-lb-line bg-lb-surface">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 120% at 85% 40%, rgba(231,193,99,0.12), transparent 55%), linear-gradient(90deg, rgba(7,8,13,0.96) 0%, rgba(7,8,13,0.82) 48%, rgba(7,8,13,0.55) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative flex flex-wrap items-end justify-between gap-5 px-6 py-7 sm:py-8">
            <div>
              <div className="lb-eyebrow mb-2 text-lb-brand">Live ranked · 100 LP a division</div>
              <h1 className="text-[clamp(32px,5vw,50px)] font-extrabold leading-none text-lb-hi">
                {titleMode}{" "}
                <span className="text-lb-brand">Ladder</span>
              </h1>
              <p className="mt-1.5 max-w-[42rem] text-[14px] text-lb-body">
                {isLoading
                  ? "Syncing live ranked data…"
                  : activeView === "hours"
                    ? `${players.length} players with tracked hours. Time on the server is the other flex.`
                    : players[0]
                      ? `${players[0].username} holds #1. ${players.length} placed. 5 placement matches, then 100 LP a rank. BO5 to leave LT1 and MT1.`
                      : `Nobody is placed on ${titleMode} yet. Be the first name on this board.`}
              </p>
            </div>
            <div className="flex flex-wrap items-end gap-4">
              <PlayerSearch onSelect={(p) => handleSelectPlayer(p)} />
              <CopyPlayIp />
              <div className="text-right">
                <div className="lb-stat text-[22px] leading-none text-lb-hi">{players.length}</div>
                <div className="lb-eyebrow mt-1.5 text-lb-low">On this board</div>
              </div>
            </div>
          </div>
        </div>

        <SearchFilterBar activeView={activeView} onViewChange={setActiveView} />

        <TopPodium players={players} onPlayerClick={handleSelectPlayer} view={activeView} />
        <LeaderboardGrid
          players={players}
          onPlayerClick={handleSelectPlayer}
          view={activeView}
          totalCount={players.length}
          emptyLabel={
            activeView === "hours"
              ? "No playtime synced yet."
              : `No placed players on ${titleMode} yet. Queue ranked on play.clashernetwork.fun and take #1.`
          }
        />
      </div>
    </div>
  );
}
