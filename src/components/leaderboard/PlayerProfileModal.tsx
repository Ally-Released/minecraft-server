"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { SkinViewer3D } from "./SkinViewer3D";
import { RankBadge } from "./RankBadge";
import { KitIcon } from "./KitIcon";
import { PlayerSearch } from "./PlayerSearch";
import { ClimbMeter } from "./ClimbMeter";
import { FlexShare } from "./FlexShare";
import { FlexRankCard } from "./FlexRankCard";
import { CopyPlayIp } from "./CopyPlayIp";
import { createClient } from "@/utils/supabase/client";
import {
  KITS,
  PLACEMENT_COPY,
  PLACEMENT_NEEDED,
  PlayerStats,
  compareLadder,
  flexCaption,
  formatHours,
  formatRecord,
  formatRelativeTime,
  formatWinRate,
  gamesPlayed,
  hasTrackedCombat,
  isPlaced,
  mapPlayerRow,
  modeLabel,
  rankIndex,
  rankTone,
  withLadderRanks,
  type LeaderboardView,
  type PlayerRow,
} from "@/lib/leaderboard";
import type { FlexCardData } from "@/lib/ranked-public";

interface PlayerProfileModalProps {
  player: PlayerStats | null;
  selectedUuid: string | null;
  onClose: () => void;
  onSelectPlayer?: (player: PlayerStats) => void;
}

export function PlayerProfileModal({
  player,
  selectedUuid,
  onClose,
  onSelectPlayer,
}: PlayerProfileModalProps) {
  const [ladders, setLadders] = useState<PlayerStats[]>([]);
  const [laddersLoaded, setLaddersLoaded] = useState(false);
  const [overallPlace, setOverallPlace] = useState<{ place: number; of: number } | null>(null);
  const [kitPlace, setKitPlace] = useState<{ place: number; of: number } | null>(null);
  const [selectedKit, setSelectedKit] = useState<string | null>(null);
  const uuid = selectedUuid || player?.uuid || null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setSelectedKit(null);
    setKitPlace(null);
  }, [uuid]);

  useEffect(() => {
    if (!uuid) {
      setLadders([]);
      setOverallPlace(null);
      setLaddersLoaded(false);
      return;
    }
    const supabase = createClient();
    let cancelled = false;
    setLaddersLoaded(false);
    supabase
      .from("players")
      .select("*")
      .eq("uuid", uuid)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Profile fetch failed:", error);
          setLaddersLoaded(true);
          return;
        }
        setLadders(((data ?? []) as PlayerRow[]).map((row) => mapPlayerRow(row)));
        setLaddersLoaded(true);
      });

    supabase
      .from("players")
      .select("uuid, rank, lp, ranked_wins, ranked_losses, game_mode")
      .eq("game_mode", "overall")
      .neq("rank", "UNRATED")
      .then(({ data }) => {
        if (cancelled) return;
        const ranked = withLadderRanks(
          ((data ?? []) as PlayerRow[]).map((row) => mapPlayerRow(row)).sort(compareLadder),
        );
        const me = ranked.find((row) => row.uuid === uuid);
        setOverallPlace(me ? { place: me.rank, of: ranked.length } : null);
      });

    return () => {
      cancelled = true;
    };
  }, [uuid]);

  useEffect(() => {
    if (!uuid || !selectedKit) {
      setKitPlace(null);
      return;
    }
    const supabase = createClient();
    let cancelled = false;
    supabase
      .from("players")
      .select("uuid, rank, lp, ranked_wins, ranked_losses, game_mode")
      .eq("game_mode", selectedKit)
      .neq("rank", "UNRATED")
      .then(({ data }) => {
        if (cancelled) return;
        const ranked = withLadderRanks(
          ((data ?? []) as PlayerRow[]).map((row) => mapPlayerRow(row)).sort(compareLadder),
        );
        const me = ranked.find((row) => row.uuid === uuid);
        setKitPlace(me ? { place: me.rank, of: ranked.length } : null);
      });
    return () => {
      cancelled = true;
    };
  }, [uuid, selectedKit]);

  const overall = useMemo(
    () => ladders.find((row) => row.game_mode === "overall") || player,
    [ladders, player],
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

  const selectedKitRow = kitRows.find((entry) => entry.kit.id === selectedKit)?.row;

  if (!uuid || !overall) return null;

  const placedKits = kitRows.filter((entry) => entry.placed);
  const best = placedKits[0];
  const matchesPlayed = gamesPlayed(overall);
  const kitAccent = rankTone(overall.division);
  const focus = selectedKitRow ?? overall;
  const focusLabel = selectedKit ? modeLabel(selectedKit as LeaderboardView) : "Overall";
  const focusPlace = selectedKit ? kitPlace : overallPlace;
  const focusGames = gamesPlayed(focus);
  const focusRate = formatWinRate(focus.ranked_wins, focus.ranked_losses);
  const caption = flexCaption({
    username: overall.username,
    division: focus.division,
    lp: focus.lp,
    place: focusPlace?.place,
    kitLabel: focusLabel,
    record: focusGames > 0 ? formatRecord(focus.ranked_wins, focus.ranked_losses) : null,
  });

  const card: FlexCardData = {
    username: overall.username,
    uuid: overall.uuid,
    division: focus.division,
    lp: focus.lp,
    place: focusPlace?.place ?? null,
    fieldSize: focusPlace?.of ?? 0,
    ranked_wins: focus.ranked_wins,
    ranked_losses: focus.ranked_losses,
    win_streak: focus.win_streak,
    peak_rank: focus.peak_rank,
    hours_played: selectedKit ? 0 : overall.hours_played,
    placement_played: focus.placement_played,
    skin_url: overall.skin_url,
    kitsRanked: placedKits.length,
    bestKit: best
      ? { id: best.kit.id, label: best.kit.label, division: best.row?.division ?? "", lp: best.row?.lp ?? 0 }
      : undefined,
    climbLine: "",
    caption,
    sharePath: `/u/${encodeURIComponent(overall.username)}`,
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex w-fit items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-lb-mid transition-colors hover:text-lb-brand"
        >
          <ArrowLeft size={14} /> Leaderboard
        </button>
        <div className="flex items-center gap-2">
          {onSelectPlayer && <PlayerSearch onSelect={onSelectPlayer} />}
        </div>
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
              <div className="lb-eyebrow text-lb-low">Live ranked profile</div>
              <h1 className="mt-1 truncate text-[38px] font-extrabold leading-none tracking-[-0.02em] text-lb-brand">
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
                {matchesPlayed > 0 && <Stat value={formatRecord(overall.ranked_wins, overall.ranked_losses)} label="Record" />}
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
          </div>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[236px_1fr_300px]">
        <aside className="border border-lb-line-strong bg-lb-surface">
          <div className="lb-eyebrow border-b border-white/[0.05] px-3 py-2.5 text-lb-low">Kits</div>
          <div className="flex max-h-[640px] flex-col overflow-y-auto py-1">
            {laddersLoaded && kitRows.length === 0 && (
              <p className="px-3 py-4 text-[12px] text-lb-mid">{PLACEMENT_COPY}</p>
            )}
            {kitRows.map(({ kit, row, placed, started }) => {
              const current = selectedKit === kit.id;
              return (
                <button
                  key={kit.id}
                  type="button"
                  aria-current={current ? "true" : undefined}
                  onClick={() => setSelectedKit(current ? null : kit.id)}
                  className={`group flex w-full items-center gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors ${
                    current ? "border-lb-brand bg-white/[0.04]" : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <KitIcon id={kit.id} size={22} className={current ? "text-lb-brand" : "text-lb-mid"} />
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-[13px] font-bold uppercase tracking-wide ${current ? "text-lb-hi" : "text-lb-body group-hover:text-lb-hi"}`}>
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

        <section className="border border-lb-line-strong bg-lb-surface">
          <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3">
            <div>
              <div className="lb-eyebrow text-lb-low">{selectedKit ? focusLabel : "Overall grind"}</div>
              {focusPlace && (
                <div className="mt-1 text-[13px] font-extrabold text-lb-hi">
                  #{focusPlace.place} <span className="text-lb-mid font-bold">of {focusPlace.of}</span>
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
            {focusGames > 0 && <Stat value={formatRecord(focus.ranked_wins, focus.ranked_losses)} label="Record" />}
            {focusRate && <Stat value={focusRate} label="Win rate" gold />}
            {focus.win_streak > 1 && <Stat value={String(focus.win_streak)} label="Win streak" />}
            {isPlaced(focus.peak_rank) && <Stat value={focus.peak_rank} label="Peak" />}
            {hasTrackedCombat(focus) && <Stat value={String(focus.kills)} label="Kills" />}
            {hasTrackedCombat(focus) && <Stat value={String(focus.deaths)} label="Deaths" />}
          </div>

          {!isPlaced(focus.division) && (
            <p className="px-4 pb-5 text-[13px] leading-relaxed text-lb-mid">{PLACEMENT_COPY}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.05] px-4 py-4">
            <CopyPlayIp compact />
            <p className="text-[12px] text-lb-mid">Queue this kit. The board only moves when you do.</p>
          </div>
        </section>

        <div className="flex flex-col gap-5">
          <FlexRankCard card={card} kitLabel={focusLabel} />
          <FlexShare username={overall.username} caption={caption} />
          <div className="flex justify-center border border-lb-line-strong bg-lb-surface py-4">
            <SkinViewer3D
              username={overall.username}
              uuid={overall.uuid}
              skinUrl={overall.skin_url}
              width={220}
              height={280}
              emote="idle"
              enableControls
            />
          </div>
          <Link
            href={`/u/${encodeURIComponent(overall.username)}`}
            className="text-center text-[11px] font-bold uppercase tracking-wide text-lb-mid hover:text-lb-brand"
          >
            Open share page
          </Link>
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
