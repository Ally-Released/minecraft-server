"use client";

import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { RankBadge } from "./RankBadge";
import { ClimbMeter } from "./ClimbMeter";
import {
  formatHours,
  formatRecord,
  formatWinRate,
  gamesPlayed,
  isPlaced,
} from "@/lib/leaderboard";
import type { FlexCardData } from "@/lib/ranked-public";

export function FlexRankCard({
  card,
  kitLabel = "Overall",
}: {
  card: FlexCardData;
  kitLabel?: string;
}) {
  const games = gamesPlayed(card);
  const rate = formatWinRate(card.ranked_wins, card.ranked_losses);

  return (
    <article className="relative overflow-hidden border border-lb-brand/35 bg-lb-surface">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-lb-brand" />
      <div className="flex items-start gap-4 p-4 pt-5">
        <div className="shrink-0 border border-lb-brand/40 p-1">
          <PlayerAvatar username={card.username} skinUrl={card.skin_url} size={72} mode="face" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="lb-eyebrow text-lb-brand">Clasher Network · Live</div>
          <h2 className="mt-1 truncate text-[22px] font-extrabold leading-none text-lb-hi">
            {card.username}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {card.place ? (
              <span className="text-[13px] font-extrabold text-lb-brand">
                #{card.place}
                {card.fieldSize ? <span className="text-lb-mid"> / {card.fieldSize}</span> : null}
              </span>
            ) : null}
            <span className="text-[11px] font-bold uppercase tracking-wide text-lb-mid">{kitLabel}</span>
            {isPlaced(card.division) ? <RankBadge division={card.division} /> : <RankBadge division="UNRATED" />}
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.05] px-4 py-3">
        <ClimbMeter
          compact
          division={card.division}
          lp={card.lp}
          placementPlayed={card.placement_played}
        />
      </div>
      <div className="grid grid-cols-2 gap-px border-t border-white/[0.05] bg-white/[0.04]">
        <Fact
          label="Record"
          value={games > 0 ? formatRecord(card.ranked_wins, card.ranked_losses) : "—"}
        />
        <Fact label="Win rate" value={rate ?? "—"} />
        <Fact label="Peak" value={isPlaced(card.peak_rank) ? card.peak_rank : "—"} />
        <Fact
          label={card.hours_played > 0 ? "Hours" : "Kits ranked"}
          value={card.hours_played > 0 ? formatHours(card.hours_played) : String(card.kitsRanked)}
        />
      </div>
      {card.bestKit && (
        <div className="flex items-center justify-between border-t border-white/[0.05] px-4 py-3 text-[12px]">
          <span className="lb-eyebrow text-lb-low">Best kit</span>
          <span className="flex items-center gap-2 font-bold text-lb-hi">
            {card.bestKit.label}
            <RankBadge division={card.bestKit.division} size="sm" />
            <span className="font-mono text-lb-brand">{card.bestKit.lp} LP</span>
          </span>
        </div>
      )}
      <div className="border-t border-white/[0.05] px-4 py-2.5 text-right font-mono text-[11px] text-lb-low">
        play.clashernetwork.fun
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-lb-surface px-4 py-3">
      <div className="lb-stat text-[18px] leading-none text-lb-hi">{value}</div>
      <div className="lb-eyebrow mt-1.5 text-lb-low">{label}</div>
    </div>
  );
}
