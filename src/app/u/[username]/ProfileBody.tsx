"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { KitIcon } from "@/components/leaderboard/KitIcon";
import { RankBadge } from "@/components/leaderboard/RankBadge";
import {
  KITS,
  PLACEMENT_NEEDED,
  formatMatchDate,
  formatRecord,
  isPlaced,
  modeLabel,
  rankTone,
  type LeaderboardView,
} from "@/lib/leaderboard";
import { perspective, type RankedMatchSeries } from "@/lib/ranked-public";

interface KitRow {
  id: string;
  label: string;
  division: string;
  lp: number;
  placement_played: number;
  ranked_wins: number;
  ranked_losses: number;
  placed: boolean;
  started: boolean;
}

interface ProfileBodyProps {
  kitRows: KitRow[];
  matches: RankedMatchSeries[];
  uuid: string;
  username: string;
}

function matchKindLabel(m: RankedMatchSeries): string {
  if (m.promotion) return "Promotion";
  if (m.placement) return "Placement";
  return "Ranked";
}

export function ProfileBody({ kitRows, matches, uuid, username }: ProfileBodyProps) {
  const [selectedKit, setSelectedKit] = useState<string | null>(null);

  const filteredMatches = useMemo(() => {
    if (!selectedKit) return matches;
    return matches.filter((m) => m.kit === selectedKit);
  }, [matches, selectedKit]);

  const selectedKitRow = kitRows.find((k) => k.id === selectedKit);

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[240px_1fr]">
      {/* ── Kits sidebar ──────────────────────────────────────────── */}
      <aside className="border border-lb-line-strong bg-lb-surface">
        <div className="lb-eyebrow border-b border-white/[0.05] px-3 py-2.5 text-lb-low">
          Kits started
        </div>
        <div className="flex max-h-[640px] flex-col overflow-y-auto py-1">
          {kitRows.length === 0 ? (
            <p className="px-3 py-4 text-[12px] text-lb-mid">
              No kits started. Queue ranked on play.clashernetwork.fun.
            </p>
          ) : (
            <>
              {/* "All kits" row */}
              <button
                type="button"
                onClick={() => setSelectedKit(null)}
                className={`group flex w-full items-center gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors ${
                  !selectedKit
                    ? "border-lb-brand bg-white/[0.04]"
                    : "border-transparent hover:bg-white/[0.03]"
                }`}
              >
                <KitIcon
                  id="overall"
                  size={18}
                  className={!selectedKit ? "text-lb-brand" : "text-lb-mid"}
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[12px] font-bold uppercase tracking-wide ${
                      !selectedKit ? "text-lb-hi" : "text-lb-body group-hover:text-lb-hi"
                    }`}
                  >
                    All kits
                  </span>
                  <span className="block font-mono text-[10px] text-lb-low">
                    {matches.length} matches
                  </span>
                </span>
              </button>

              {kitRows.map((kit) => {
                const current = selectedKit === kit.id;
                const tone = rankTone(kit.division);
                return (
                  <button
                    key={kit.id}
                    type="button"
                    aria-current={current ? "true" : undefined}
                    onClick={() => setSelectedKit(current ? null : kit.id)}
                    className={`group flex w-full items-center gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors ${
                      current
                        ? "border-lb-brand bg-white/[0.04]"
                        : "border-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    <KitIcon
                      id={kit.id}
                      size={18}
                      className={current ? "text-lb-brand" : "text-lb-mid"}
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-[12px] font-bold uppercase tracking-wide ${
                          current ? "text-lb-hi" : "text-lb-body group-hover:text-lb-hi"
                        }`}
                      >
                        {kit.label}
                      </span>
                      <span className="block font-mono text-[10px] text-lb-low">
                        {kit.placed
                          ? `${kit.division} · ${kit.lp} LP`
                          : `Placement ${Math.min(kit.placement_played, PLACEMENT_NEEDED)}/${PLACEMENT_NEEDED}`}
                      </span>
                    </span>
                    {kit.placed ? (
                      <span
                        className="shrink-0 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none"
                        style={{ background: tone.bg, color: tone.fg }}
                      >
                        {kit.division}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </aside>

      {/* ── Match history ─────────────────────────────────────────── */}
      <section className="border border-lb-line-strong bg-lb-surface">
        <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3">
          <div>
            <div className="lb-eyebrow text-lb-low">
              {selectedKit ? `${selectedKitRow?.label ?? selectedKit} matches` : "Recent matches"}
            </div>
            {selectedKitRow && isPlaced(selectedKitRow.division) && (
              <div className="mt-1 flex items-center gap-2">
                <RankBadge division={selectedKitRow.division} />
                <span className="font-mono text-[13px] font-bold text-lb-brand">
                  {selectedKitRow.lp} LP
                </span>
                {selectedKitRow.ranked_wins + selectedKitRow.ranked_losses > 0 && (
                  <span className="text-[12px] text-lb-mid">
                    {formatRecord(selectedKitRow.ranked_wins, selectedKitRow.ranked_losses)}
                  </span>
                )}
              </div>
            )}
          </div>
          <span className="lb-eyebrow text-lb-low">
            {filteredMatches.length} {filteredMatches.length === 1 ? "series" : "series"}
          </span>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
            <div className="text-[13px] font-bold text-lb-mid">No ranked series synced yet</div>
            <p className="max-w-[320px] text-[12px] leading-relaxed text-lb-low">
              {selectedKit
                ? `No ${selectedKitRow?.label ?? selectedKit} series recorded. Queue this kit on play.clashernetwork.fun.`
                : "No ranked series recorded. Queue ranked on play.clashernetwork.fun to appear here."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/[0.04]">
            {filteredMatches.map((match) => {
              const pov = perspective(match, uuid);
              const kitLabel = modeLabel(match.kit as LeaderboardView);
              const kind = matchKindLabel(match);
              const rankChanged = pov.rankBefore !== pov.rankAfter;

              return (
                <Link
                  key={match.matchId}
                  href={`/u/${encodeURIComponent(username)}/match/${match.matchId}`}
                  className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.03]"
                >
                  {/* W/L badge */}
                  <span
                    className={`w-7 shrink-0 py-1 text-center text-[11px] font-extrabold uppercase leading-none ${
                      match.voided
                        ? "bg-white/[0.06] text-lb-low"
                        : pov.won === true
                          ? "bg-[#24b35e]/10 text-[#24b35e]"
                          : pov.won === false
                            ? "bg-[#e05252]/10 text-[#e05252]"
                            : "bg-white/[0.06] text-lb-low"
                    }`}
                  >
                    {match.voided ? "–" : pov.won === true ? "W" : pov.won === false ? "L" : "?"}
                  </span>

                  {/* Kit + kind */}
                  <div className="flex w-24 shrink-0 flex-col gap-0.5">
                    <span className="truncate text-[12px] font-bold uppercase tracking-wide text-lb-hi">
                      {kitLabel}
                    </span>
                    <span className="text-[10px] text-lb-low">{kind}</span>
                  </div>

                  {/* Score */}
                  <div className="flex w-10 shrink-0 items-center justify-center">
                    <span className="font-mono text-[13px] font-bold text-lb-hi">
                      {pov.myRounds}–{pov.oppRounds}
                    </span>
                  </div>

                  {/* vs opponent */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[12px] text-lb-low">vs </span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/u/${encodeURIComponent(pov.opponentName)}`;
                      }}
                      className="cursor-pointer text-[12px] font-bold text-lb-body transition-colors hover:text-lb-brand"
                    >
                      {pov.opponentName}
                    </span>
                    {rankChanged && !match.voided && (
                      <span className="ml-2 text-[10px] text-lb-low">
                        {pov.rankBefore} → {pov.rankAfter}
                      </span>
                    )}
                  </div>

                  {/* LP delta */}
                  <div className="w-16 shrink-0 text-right">
                    {!match.voided && pov.lpDelta !== 0 ? (
                      <span
                        className={`font-mono text-[13px] font-bold ${
                          pov.lpDelta > 0 ? "text-[#24b35e]" : "text-[#e05252]"
                        }`}
                      >
                        {pov.lpDelta > 0 ? "+" : ""}
                        {pov.lpDelta} LP
                      </span>
                    ) : null}
                  </div>

                  {/* Date */}
                  <div className="w-14 shrink-0 text-right text-[11px] text-lb-low">
                    {formatMatchDate(match.createdAt)}
                  </div>

                  <ChevronRight
                    size={14}
                    className="shrink-0 text-lb-low transition-colors group-hover:text-lb-mid"
                  />
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
