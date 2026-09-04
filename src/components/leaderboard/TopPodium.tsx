"use client";

import { motion } from "framer-motion";
import {
  LeaderboardView,
  PlayerStats,
  formatHours,
  formatRecord,
  formatWinRate,
  gamesPlayed,
  isPlaced,
} from "@/lib/leaderboard";
import { SkinViewer3D } from "./SkinViewer3D";
import { RankBadge } from "./RankBadge";
import { ClimbMeter } from "./ClimbMeter";

interface TopPodiumProps {
  players: PlayerStats[];
  onPlayerClick?: (player: PlayerStats) => void;
  view?: LeaderboardView;
}

function metric(player: PlayerStats, view: LeaderboardView) {
  if (view === "hours") {
    return { value: formatHours(player.hours_played), unit: "Hours" };
  }
  return { value: String(player.lp), unit: "LP" };
}

function PodiumMark({ place }: { place: 1 | 2 | 3 }) {
  if (place === 1) {
    return (
      <svg viewBox="0 0 100 100" width="56" height="56" className="overflow-visible drop-shadow-[0_0_9px_rgba(231,193,99,0.7)]">
        <defs>
          <linearGradient id={`lb-gold-${place}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe7a3" />
            <stop offset="100%" stopColor="#d4a017" />
          </linearGradient>
        </defs>
        <polygon points="50,4 61,38 97,38 68,59 79,93 50,72 21,93 32,59 3,38 39,38" fill={`url(#lb-gold-${place})`} />
        <text x="50" y="62" textAnchor="middle" fontSize="28" fontWeight="800" fill="#1b1303">
          1
        </text>
      </svg>
    );
  }
  if (place === 2) {
    return (
      <svg viewBox="0 0 100 100" width="48" height="48" className="overflow-visible drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]">
        <polygon points="50,6 93,28 93,72 50,94 7,72 7,28" fill="#cad3df" />
        <text x="50" y="62" textAnchor="middle" fontSize="30" fontWeight="800" fill="#111318">
          2
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" width="48" height="48" className="overflow-visible drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]">
      <path d="M18 18 H82 V58 C82 78 66 90 50 94 C34 90 18 78 18 58 Z" fill="#c47a48" />
      <text x="50" y="60" textAnchor="middle" fontSize="30" fontWeight="800" fill="#1b1303">
        3
      </text>
    </svg>
  );
}

function PodiumCard({
  player,
  place,
  view,
  onClick,
}: {
  player: PlayerStats;
  place: 1 | 2 | 3;
  view: LeaderboardView;
  onClick?: () => void;
}) {
  const stats = metric(player, view);
  const champion = place === 1;
  const games = gamesPlayed(player);
  const rate = formatWinRate(player.ranked_wins, player.ranked_losses);
  const glow =
    place === 1
      ? "0 1px 0 rgba(255,255,255,0.14) inset, 0 0 0 1.5px rgba(231,193,99,0.75), 0 0 22px -6px rgba(231,193,99,0.45), 0 26px 50px -28px rgba(0,0,0,0.85)"
      : place === 2
        ? "0 1px 0 rgba(255,255,255,0.14) inset, 0 0 0 1.5px rgba(202,211,223,0.6), 0 0 22px -6px rgba(228,234,242,0.32), 0 26px 50px -28px rgba(0,0,0,0.85)"
        : "0 1px 0 rgba(255,255,255,0.14) inset, 0 0 0 1.5px rgba(196,122,72,0.7), 0 0 22px -6px rgba(196,122,72,0.32), 0 26px 50px -28px rgba(0,0,0,0.85)";
  const topLine =
    place === 1
      ? "linear-gradient(90deg, transparent, #e7c163, transparent)"
      : place === 2
        ? "linear-gradient(90deg, transparent, #cad3df, transparent)"
        : "linear-gradient(90deg, transparent, #c47a48, transparent)";

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: place === 1 ? 0.05 : place === 2 ? 0 : 0.1 }}
      onClick={onClick}
      className={`lb-rise card-hover relative flex flex-col items-center text-center px-5 pb-5 bg-lb-surface rounded-[12px] ${
        champion ? "" : "sm:mt-10"
      }`}
      style={{ paddingTop: champion ? 48 : 42, boxShadow: glow }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background:
            place === 1
              ? "radial-gradient(125% 78% at 50% 0%, rgba(231,193,99,0.16), transparent 58%)"
              : "radial-gradient(125% 78% at 50% 0%, rgba(228,234,242,0.13), transparent 58%)",
        }}
      />
      <span aria-hidden className="lb-podium-sheen absolute inset-0 rounded-[inherit]" style={{ opacity: 0.08 }} />
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit]" style={{ background: topLine }} />
      <div className="absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center" style={{ top: -28 }}>
        <PodiumMark place={place} />
      </div>
      <div className={`relative z-10 w-full ${champion ? "h-[280px]" : "h-[240px]"}`}>
        <SkinViewer3D
          username={player.username}
          uuid={player.uuid}
          skinUrl={player.skin_url}
          width={champion ? 220 : 190}
          height={champion ? 280 : 240}
          emote={place === 1 ? "champion" : place === 2 ? "combat" : "wave"}
        />
      </div>
      <div className="relative z-10 mt-1 w-full">
        <div className="truncate text-[17px] font-bold text-lb-hi">{player.username}</div>
        <div className={`mt-1 text-[11px] font-bold uppercase tracking-[0.14em] ${champion ? "text-lb-brand" : "text-lb-mid"}`}>
          {place === 1 ? "Holding #1" : place === 2 ? "2nd — one fight from gold" : "3rd — the last podium"}
        </div>
        {view !== "hours" && isPlaced(player.division) && (
          <div className="mt-2 flex justify-center">
            <RankBadge division={player.division} />
          </div>
        )}
        <div className="mt-3">
          <div className="lb-stat text-[32px] leading-none text-lb-hi">{stats.value}</div>
          <div className="lb-eyebrow mt-1.5 text-lb-low">{stats.unit}</div>
        </div>
        {view !== "hours" && games > 0 && (
          <div className="mt-2 text-[12px] font-bold text-lb-body">
            {formatRecord(player.ranked_wins, player.ranked_losses)}
            {rate ? ` · ${rate}` : ""}
            {player.win_streak > 1 ? ` · ${player.win_streak} streak` : ""}
          </div>
        )}
        {view !== "hours" && isPlaced(player.division) && (
          <div className="mx-auto mt-3 w-full max-w-[200px] text-left">
            <ClimbMeter
              compact
              division={player.division}
              lp={player.lp}
              placementPlayed={player.placement_played}
            />
          </div>
        )}
      </div>
    </motion.button>
  );
}

export function TopPodium({ players, onPlayerClick, view = "overall" }: TopPodiumProps) {
  if (!players.length) return null;
  const first = players[0];
  const second = players[1];
  const third = players[2];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
      {second ? (
        <PodiumCard player={second} place={2} view={view} onClick={() => onPlayerClick?.(second)} />
      ) : (
        <div className="hidden lg:block" />
      )}
      {first && <PodiumCard player={first} place={1} view={view} onClick={() => onPlayerClick?.(first)} />}
      {third ? (
        <PodiumCard player={third} place={3} view={view} onClick={() => onPlayerClick?.(third)} />
      ) : (
        <div className="hidden lg:block" />
      )}
    </div>
  );
}
