"use client";

import {
  KitChip,
  LeaderboardView,
  PlayerStats,
  formatHours,
  formatRecord,
  gamesPlayed,
  isPlaced,
  placeTone,
  rankTone,
} from "@/lib/leaderboard";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { RankBadge } from "./RankBadge";
import { KitIcon } from "./KitIcon";

interface LeaderboardGridProps {
  players: PlayerStats[];
  onPlayerClick?: (player: PlayerStats) => void;
  view?: LeaderboardView;
  emptyLabel?: string;
  totalCount?: number;
}

function KitChips({ chips }: { chips?: KitChip[] }) {
  if (!chips?.length) return null;
  const shown = chips.slice(0, 8);
  return (
    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
      {shown.map((chip) => (
        <span key={chip.id} title={`${chip.label}: ${chip.rank}`} className="inline-flex items-center gap-1">
          <KitIcon id={chip.id} size={15} className="text-lb-mid" />
          <span className="text-[12px] font-bold leading-none" style={{ color: rankTone(chip.rank).text }}>
            {chip.rank}
          </span>
        </span>
      ))}
      {chips.length > 8 && <span className="text-[11px] text-lb-low">+{chips.length - 8}</span>}
    </span>
  );
}

export function LeaderboardGrid({
  players,
  onPlayerClick,
  view = "overall",
  emptyLabel = "No players found.",
  totalCount,
}: LeaderboardGridProps) {
  const hoursView = view === "hours";
  const overallView = view === "overall";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[12px] text-lb-mid">
        <span>
          Showing <span className="text-lb-hi font-semibold">{players.length}</span>
          {typeof totalCount === "number" ? ` of ${totalCount}` : ""}
        </span>
        <span className="lb-eyebrow text-lb-low">{hoursView ? "Ranked by hours" : "Ranked by tier"}</span>
      </div>

      {players.length === 0 ? (
        <div className="border border-lb-line-strong bg-lb-surface px-4 py-10 text-center text-lb-mid">{emptyLabel}</div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {players.map((player, index) => {
            const tone = placeTone(player.rank);
            const ring = rankTone(player.division).ring;
            return (
              <button
                key={player.id || `${player.uuid}-${player.game_mode}-${index}`}
                type="button"
                onClick={() => onPlayerClick?.(player)}
                className="lb-rise group flex items-stretch border border-lb-line-strong bg-lb-surface text-left transition-colors hover:bg-lb-card2"
                style={{ animationDelay: `${Math.min(index, 16) * 30}ms` }}
              >
                <span aria-hidden className="w-[3px] shrink-0" style={{ background: tone }} />
                <span className="grid w-16 shrink-0 place-items-center border-r border-white/[0.05]">
                  <span className="lb-stat leading-none" style={{ fontSize: 25, color: tone }}>
                    {player.rank}
                  </span>
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-3 px-3.5 py-3">
                  <span
                    className="shrink-0 overflow-hidden rounded-[8px]"
                    style={{ boxShadow: `0 0 0 2px ${isPlaced(player.division) ? ring : "#9ca3af"}` }}
                  >
                    <PlayerAvatar username={player.username} skinUrl={player.skin_url} size={40} mode="face" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[17px] font-bold text-lb-hi transition-colors group-hover:text-lb-brand">
                      {player.username}
                    </span>
                    {overallView && <KitChips chips={player.kitRanks} />}
                    {!hoursView && !overallView && gamesPlayed(player) > 0 && (
                      <span className="mt-0.5 block text-[12px] font-bold text-lb-mid">
                        {formatRecord(player.ranked_wins, player.ranked_losses)}
                        {player.win_streak > 1 ? ` · ${player.win_streak} streak` : ""}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 flex items-center gap-3">
                    {hoursView ? (
                      <span className="text-right">
                        <span className="block lb-stat text-[22px] leading-none text-lb-hi">
                          {formatHours(player.hours_played)}
                        </span>
                        <span className="lb-eyebrow mt-1 block text-lb-low" style={{ fontSize: 9 }}>
                          HRS
                        </span>
                      </span>
                    ) : (
                      <>
                        {!overallView && <RankBadge division={player.division} />}
                        <span className="text-right">
                          <span className="block lb-stat text-[22px] leading-none text-lb-hi">{player.lp}</span>
                          <span className="lb-eyebrow mt-1 block text-lb-low" style={{ fontSize: 9 }}>
                            LP
                          </span>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
