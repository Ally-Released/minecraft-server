"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { SkinViewer3D } from "@/components/leaderboard/SkinViewer3D";
import { RankBadge } from "@/components/leaderboard/RankBadge";
import { KitIcon } from "@/components/leaderboard/KitIcon";
import { ClimbMeter } from "@/components/leaderboard/ClimbMeter";
import { FlexShare } from "@/components/leaderboard/FlexShare";
import { FlexRankCard } from "@/components/leaderboard/FlexRankCard";
import { CopyPlayIp } from "@/components/leaderboard/CopyPlayIp";
import { MatchHistoryPanel } from "@/components/leaderboard/MatchHistoryList";
import { PlayerSearch } from "@/components/leaderboard/PlayerSearch";
import {
  KITS,
  PLACEMENT_COPY,
  PLACEMENT_NEEDED,
  PlayerStats,
  formatHours,
  formatRecord,
  formatRelativeTime,
  formatWinRate,
  gamesPlayed,
  hasTrackedCombat,
  isPlaced,
  modeLabel,
  playerSharePath,
  rankIndex,
  rankTone,
  type LeaderboardView,
} from "@/lib/leaderboard";
import type { FlexCardData, RankedMatchSeries } from "@/lib/ranked-public";
import { useRouter } from "next/navigation";

export function PlayerProfilePage({
  ladders,
  matches,
  overallPlace,
  card,
}: {
  ladders: PlayerStats[];
  matches: RankedMatchSeries[];
  overallPlace: { place: number; of: number } | null;
  card: FlexCardData;
}) {
  const router = useRouter();
  const [selectedKit, setSelectedKit] = useState<string | null>(null);
  const [kitPlace, setKitPlace] = useState<{ place: number; of: number } | null>(null);

  const overall = useMemo(
    () => ladders.find((row) => row.game_mode === "overall") ?? ladders[0],
    [ladders],
  );

  const kitRows = useMemo(() => {
    const byMode = new Map(ladders.map((row) => [row.game_mode, row]));
    return KITS.map((kit) => ({ kit, row: byMode.get(kit.id) }))
      .map((entry) => {
        const placed = isPlaced(entry.row?.division);
        const started = Boolean(
          entry.row &&
            (entry.row.placement_played > 0 ||
              entry.row.ranked_wins + entry.row.ranked_losses > 0 ||
              placed),
        );
        return { ...entry, placed, started };
      })
      .filter((entry) => entry.started)
      .sort((a, b) => {
        if (a.placed !== b.placed) return a.placed ? -1 : 1;
        const rankDelta = rankIndex(a.row?.division) - rankIndex(b.row?.division);
        if (rankDelta !== 0) return rankDelta;
        return (b.row?.lp ?? 0) - (a.row?.lp ?? 0);
      });
  }, [ladders]);

  if (!overall) return null;

  const selectedKitRow = kitRows.find((entry) => entry.kit.id === selectedKit)?.row;
  const placedKits = kitRows.filter((entry) => entry.placed);
  const best = placedKits[0];
  const focus = selectedKitRow ?? overall;
  const focusLabel = selectedKit ? modeLabel(selectedKit as LeaderboardView) : "Overall";
  const focusPlace = selectedKit ? kitPlace : overallPlace;
  const focusGames = gamesPlayed(focus);
  const focusRate = formatWinRate(focus.ranked_wins, focus.ranked_losses);
  const kitAccent = rankTone(overall.division);
  const kitIds = kitRows.map((k) => k.kit.id);

  const loadKitPlace = async (kitId: string | null) => {
    setSelectedKit(kitId);
    setKitPlace(null);
    if (!kitId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/players?game_mode=eq.${encodeURIComponent(kitId)}&rank=neq.UNRATED&select=uuid,rank,lp,ranked_wins,ranked_losses`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`,
          },
        },
      );
      if (!res.ok) return;
      const rows = (await res.json()) as { uuid: string; rank: string; lp: number; ranked_wins: number; ranked_losses: number }[];
      const sorted = [...rows].sort((a, b) => {
        const ai = rankIndex(a.rank);
        const bi = rankIndex(b.rank);
        if (ai !== bi) return ai - bi;
        if (b.lp !== a.lp) return b.lp - a.lp;
        return b.ranked_wins - a.ranked_wins;
      });
      const idx = sorted.findIndex((r) => r.uuid === overall.uuid);
      if (idx >= 0) setKitPlace({ place: idx + 1, of: sorted.length });
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-5 px-4 py-24 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/leaderboard"
          className="inline-flex w-fit items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-lb-mid transition-colors hover:text-lb-brand"
        >
          <ArrowLeft size={14} /> Leaderboard
        </Link>
        <PlayerSearch
          onSelect={(player) => router.push(playerSharePath(player.username))}
        />
      </div>

      <div className="relative border border-lb-line-strong bg-lb-surface">
        <span aria-hidden className="absolute left-0 top-0 h-[2px] w-full" style={{ background: kitAccent.bg }} />
        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:p-6">
          <div className="flex min-w-0 items-start gap-5">
            <div
              className="grid shrink-0 place-items-center border p-1.5"
              style={{ borderColor: kitAccent.bg, background: "rgba(255,255,255,0.02)" }}
            >
              <PlayerAvatar username={overall.username} skinUrl={overall.skin_url} size={92} mode="face" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="lb-eyebrow text-lb-low">Live ranked profile · Supabase</div>
              <h1 className="mt-1 truncate text-[clamp(28px,5vw,42px)] font-extrabold leading-none tracking-[-0.02em] text-lb-brand">
                {overall.username}
              </h1>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {overallPlace && (
                  <span className="text-[13px] font-extrabold text-lb-brand">
                    #{overallPlace.place}
                    <span className="text-lb-mid"> / {overallPlace.of} overall</span>
                  </span>
                )}
                <RankBadge division={overall.division} />
                {isPlaced(overall.peak_rank) && overall.peak_rank !== overall.division && (
                  <span className="text-[11px] font-bold uppercase tracking-wide text-lb-mid">
                    Peak {overall.peak_rank}
                  </span>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-y-4 border-t border-white/[0.05] pt-4">
                <Stat value={`${placedKits.length} / ${KITS.length}`} label="Kits ranked" />
                {gamesPlayed(overall) > 0 && (
                  <Stat value={formatRecord(overall.ranked_wins, overall.ranked_losses)} label="Record" />
                )}
                {formatWinRate(overall.ranked_wins, overall.ranked_losses) && (
                  <Stat value={formatWinRate(overall.ranked_wins, overall.ranked_losses)!} label="Win rate" />
                )}
                {overall.hours_played > 0 && <Stat value={formatHours(overall.hours_played)} label="Hours" />}
                {overall.win_streak > 1 && <Stat value={String(overall.win_streak)} label="Streak" gold />}
                <Stat value={formatRelativeTime(overall.lastActive)} label="Last seen" />
              </div>
            </div>
          </div>
          <div className="flex min-w-[240px] flex-col justify-center gap-3 lg:border-l lg:border-white/[0.05] lg:pl-7">
            <ClimbMeter
              division={overall.division}
              lp={overall.lp}
              placementPlayed={overall.placement_played}
            />
            {best && (
              <div className="flex items-center gap-2 text-[12.5px]">
                <span className="lb-eyebrow text-lb-low">Best</span>
                <RankBadge division={best.row?.division} size="sm" />
                <span className="text-lb-body">{best.kit.label}</span>
              </div>
            )}
            <CopyPlayIp compact />
          </div>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[220px_1fr_300px]">
        <aside className="border border-lb-line-strong bg-lb-surface">
          <div className="lb-eyebrow border-b border-white/[0.05] px-3 py-2.5 text-lb-low">Kits</div>
          <div className="flex max-h-[640px] flex-col overflow-y-auto py-1">
            {kitRows.length === 0 && (
              <p className="px-3 py-4 text-[12px] text-lb-mid">{PLACEMENT_COPY}</p>
            )}
            {kitRows.map(({ kit, row, placed, started }) => {
              const current = selectedKit === kit.id;
              return (
                <button
                  key={kit.id}
                  type="button"
                  aria-current={current ? "true" : undefined}
                  onClick={() => loadKitPlace(current ? null : kit.id)}
                  className={`group flex w-full items-center gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors ${
                    current ? "border-lb-brand bg-white/[0.04]" : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <KitIcon id={kit.id} size={22} className={current ? "text-lb-brand" : "text-lb-mid"} />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[13px] font-bold uppercase tracking-wide ${
                        current ? "text-lb-hi" : "text-lb-body group-hover:text-lb-hi"
                      }`}
                    >
                      {kit.label}
                    </span>
                    <span className="block font-mono text-[10.5px] text-lb-low">
                      {placed
                        ? `${row?.lp ?? 0} LP`
                        : started
                          ? `Placement ${Math.min(row?.placement_played ?? 0, PLACEMENT_NEEDED)}/${PLACEMENT_NEEDED}`
                          : "Unrated"}
                    </span>
                  </span>
                  {placed ? <RankBadge division={row?.division} size="sm" /> : null}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex flex-col gap-5">
          <section className="border border-lb-line-strong bg-lb-surface">
            <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3">
              <div>
                <div className="lb-eyebrow text-lb-low">{selectedKit ? focusLabel : "Overall grind"}</div>
                {focusPlace && (
                  <div className="mt-1 text-[13px] font-extrabold text-lb-hi">
                    #{focusPlace.place} <span className="font-bold text-lb-mid">of {focusPlace.of}</span>
                  </div>
                )}
              </div>
              {isPlaced(focus.division) && <RankBadge division={focus.division} />}
            </div>
            <div className="border-b border-white/[0.05] px-4 py-4">
              <ClimbMeter
                division={focus.division}
                lp={focus.lp}
                placementPlayed={focus.placement_played}
              />
            </div>
            <div className="flex flex-wrap gap-6 px-4 py-4">
              {focusGames > 0 && (
                <Stat value={formatRecord(focus.ranked_wins, focus.ranked_losses)} label="Record" />
              )}
              {focusRate && <Stat value={focusRate} label="Win rate" gold />}
              {focus.win_streak > 1 && <Stat value={String(focus.win_streak)} label="Win streak" />}
              {isPlaced(focus.peak_rank) && <Stat value={focus.peak_rank} label="Peak" />}
              {hasTrackedCombat(focus) && <Stat value={String(focus.kills)} label="Kills" />}
              {hasTrackedCombat(focus) && <Stat value={String(focus.deaths)} label="Deaths" />}
            </div>
            {!isPlaced(focus.division) && (
              <p className="px-4 pb-5 text-[13px] leading-relaxed text-lb-mid">{PLACEMENT_COPY}</p>
            )}
          </section>

          <MatchHistoryPanel
            matches={matches}
            uuid={overall.uuid}
            username={overall.username}
            kits={kitIds}
          />
        </div>

        <div className="flex flex-col gap-5">
          <FlexRankCard
            card={{
              ...card,
              division: focus.division,
              lp: focus.lp,
              place: focusPlace?.place ?? card.place,
              fieldSize: focusPlace?.of ?? card.fieldSize,
              ranked_wins: focus.ranked_wins,
              ranked_losses: focus.ranked_losses,
              win_streak: focus.win_streak,
              peak_rank: focus.peak_rank,
              placement_played: focus.placement_played,
            }}
            kitLabel={focusLabel}
          />
          <FlexShare username={overall.username} caption={card.caption} />
          <div className="flex justify-center border border-lb-line-strong bg-lb-surface py-4">
            <SkinViewer3D
              username={overall.username}
              uuid={overall.uuid}
              skinUrl={overall.skin_url}
              width={220}
              height={280}
              emote="champion"
              enableControls
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, gold }: { value: string; label: string; gold?: boolean }) {
  return (
    <div className="pr-6">
      <div className={`lb-stat text-[21px] leading-none ${gold ? "text-lb-brand" : "text-lb-hi"}`}>{value}</div>
      <div className="lb-eyebrow mt-1.5 text-lb-low">{label}</div>
    </div>
  );
}
