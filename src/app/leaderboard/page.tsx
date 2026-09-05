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
  playerSharePath,
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

  // Old ?player= links redirect to canonical /u/username
  useEffect(() => {
    if (!playerParam) return;
    router.replace(playerSharePath(playerParam));
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

  const openProfile = (player: PlayerStats) => {
    router.push(playerSharePath(player.username));
  };

  const titleMode = modeLabel(activeView);

  if (playerParam) {
    return (
      <div className="relative z-10 mx-auto min-h-[40vh] max-w-[1320px] px-4 py-24 text-lb-mid">
        Opening profile…
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto min-h-[70vh] max-w-[1320px] px-4 py-6 pt-24 lg:px-6 lg:pt-28">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6">
        <div className="group relative z-20 rounded-[16px] border border-lb-line bg-lb-surface/80 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-lb-brand/30">
          {/* Inner background wrapper with overflow-hidden so gradients stay within rounded bounds without clipping dropdowns */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
            {/* Animated gradient background */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
              style={{
                background:
                  "radial-gradient(80% 120% at 85% 40%, rgba(231,193,99,0.15), transparent 50%), radial-gradient(40% 60% at 15% 90%, rgba(77,163,255,0.08), transparent 50%), linear-gradient(90deg, rgba(7,8,13,0.92) 0%, rgba(7,8,13,0.75) 48%, rgba(7,8,13,0.45) 100%)",
              }}
            />
            {/* Subtle grid pattern overlay */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Glowing edge light */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-lb-brand/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 px-6 py-7 sm:px-8 sm:py-9">
            <div className="flex-1 min-w-0 pr-0 md:pr-4">
              <div className="lb-eyebrow mb-3 flex items-center gap-2 text-lb-brand">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lb-brand opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lb-brand"></span>
                </span>
                Live ranked · 100 LP a division · cloud-synced
              </div>
              <h1 className="bg-gradient-to-br from-white via-lb-hi to-lb-mid bg-clip-text text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-transparent drop-shadow-sm">
                {titleMode} <span className="text-lb-brand drop-shadow-[0_0_12px_rgba(231,193,99,0.3)]">Ladder</span>
              </h1>
              <p className="mt-3 max-w-[44rem] text-[15px] leading-relaxed text-lb-body/90">
                {isLoading
                  ? "Syncing live ranked data…"
                  : activeView === "hours"
                    ? `${players.length} players with tracked hours. Time on the server is the other flex.`
                    : players[0]
                      ? `${players[0].username} holds #1. ${players.length} placed. Click a name to open their /u profile and flex card.`
                      : `Nobody is placed on ${titleMode} yet. Be the first name on this board.`}
              </p>
            </div>
            <div className="flex flex-wrap items-center md:items-end gap-5 md:shrink-0">
              <PlayerSearch onSelect={openProfile} />
              <CopyPlayIp />
              <div className="relative ml-1 flex h-11 flex-row items-center justify-center gap-2 rounded-xl bg-white/5 px-4 border border-white/10 backdrop-blur-md shadow-inner">
                <span className="lb-stat text-[18px] leading-none text-lb-hi tracking-tight shadow-black drop-shadow-md">{players.length}</span>
                <span className="lb-eyebrow text-[10px] text-lb-low font-bold uppercase tracking-widest mt-0.5">Placed</span>
              </div>
            </div>
          </div>
        </div>

        <SearchFilterBar activeView={activeView} onViewChange={setActiveView} />

        <TopPodium players={players} onPlayerClick={openProfile} view={activeView} />
        <LeaderboardGrid
          players={players}
          onPlayerClick={openProfile}
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
