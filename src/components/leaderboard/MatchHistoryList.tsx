"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { RankBadge } from "@/components/leaderboard/RankBadge";
import { KitIcon } from "@/components/leaderboard/KitIcon";
import { modeLabel, formatMatchDate, type LeaderboardView } from "@/lib/leaderboard";
import { perspective, type RankedMatchSeries } from "@/lib/ranked-public";

export function MatchHistoryList({
  matches,
  uuid,
  username,
  kitFilter,
}: {
  matches: RankedMatchSeries[];
  uuid: string;
  username: string;
  kitFilter?: string | null;
}) {
  const rows = useMemo(() => {
    if (!kitFilter) return matches;
    return matches.filter((m) => m.kit === kitFilter);
  }, [matches, kitFilter]);

  if (rows.length === 0) {
    return (
      <p className="px-4 py-8 text-[13px] leading-relaxed text-lb-mid">
        No ranked series synced to the cloud yet for this view. Every finished duel pushes to Supabase —
        play one and it will land here. Nothing is invented.
      </p>
    );
  }

  return (
    <div>
      {rows.map((match) => {
        const view = perspective(match, uuid);
        const lp =
          view.lpDelta === 0
            ? "0"
            : view.lpDelta > 0
              ? `+${view.lpDelta}`
              : String(view.lpDelta);
        return (
          <Link
            key={match.matchId}
            href={`/u/${encodeURIComponent(username)}/match/${encodeURIComponent(match.matchId)}`}
            className="group flex items-center gap-3 border-b border-white/[0.05] px-3 py-3 transition-colors hover:bg-white/[0.03] last:border-0"
          >
            <span
              className="w-10 shrink-0 text-center text-[11px] font-extrabold uppercase"
              style={{
                color:
                  view.won === true
                    ? "var(--color-lb-pos)"
                    : view.won === false
                      ? "var(--color-lb-neg)"
                      : "var(--color-lb-mid)",
              }}
            >
              {match.voided ? "VOID" : view.won === true ? "WIN" : view.won === false ? "LOSS" : "—"}
            </span>
            <KitIcon id={match.kit} size={20} className="text-lb-mid" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold text-lb-hi group-hover:text-lb-brand">
                vs {view.opponentName}
              </span>
              <span className="block text-[11px] text-lb-low">
                {modeLabel(match.kit as LeaderboardView)}
                {view.myRounds + view.oppRounds > 0 ? ` · ${view.myRounds}–${view.oppRounds}` : ""}
                {match.promotion ? " · Promo" : ""}
                {match.placement ? " · Placement" : ""}
              </span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <RankBadge division={view.rankBefore} size="sm" />
              <span className="text-lb-low text-[11px]">→</span>
              <RankBadge division={view.rankAfter} size="sm" />
            </span>
            <span
              className="w-12 text-right font-mono text-[12px] font-bold"
              style={{
                color: view.lpDelta > 0 ? "var(--color-lb-pos)" : view.lpDelta < 0 ? "var(--color-lb-neg)" : "var(--color-lb-mid)",
              }}
            >
              {lp}
            </span>
            <span className="w-14 text-right font-mono text-[11px] text-lb-low">
              {formatMatchDate(match.createdAt)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function MatchHistoryPanel({
  matches,
  uuid,
  username,
  kits,
}: {
  matches: RankedMatchSeries[];
  uuid: string;
  username: string;
  kits: string[];
}) {
  const [kit, setKit] = useState<string | null>(null);
  return (
    <section className="border border-lb-line-strong bg-lb-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.05] px-4 py-3">
        <div className="lb-eyebrow text-lb-low">Match history · live from Supabase</div>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip label="All" active={!kit} onClick={() => setKit(null)} />
          {kits.map((id) => (
            <FilterChip
              key={id}
              label={modeLabel(id as LeaderboardView)}
              active={kit === id}
              onClick={() => setKit(id)}
            />
          ))}
        </div>
      </div>
      <MatchHistoryList matches={matches} uuid={uuid} username={username} kitFilter={kit} />
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-7 px-2.5 text-[10px] font-bold uppercase tracking-wide ${
        active ? "bg-lb-brand text-lb-brand-on" : "border border-lb-line-strong text-lb-mid hover:text-lb-hi"
      }`}
    >
      {label}
    </button>
  );
}
