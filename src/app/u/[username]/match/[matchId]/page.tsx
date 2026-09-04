import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import { RankBadge } from "@/components/leaderboard/RankBadge";
import { KitIcon } from "@/components/leaderboard/KitIcon";
import { fetchMatch, fetchRounds } from "@/lib/ranked-public";
import { isPlaced, modeLabel, rankTone, type LeaderboardView } from "@/lib/leaderboard";
import { SERVER_CONFIG } from "@/lib/config";

type Params = { params: Promise<{ username: string; matchId: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username, matchId } = await params;
  const match = await fetchMatch(matchId).catch(() => null);
  if (!match) {
    return { title: `Match · ${decodeURIComponent(username)} · Clasher Network` };
  }
  const kitLabel = modeLabel(match.kit as LeaderboardView);
  const kind = match.promotion ? "Promotion" : match.placement ? "Placement" : "Ranked";
  const score = `${match.roundsA}–${match.roundsB}`;
  return {
    title: `${match.playerAName} vs ${match.playerBName} · ${kitLabel} ${kind} ${score} · Clasher Network`,
    description: `${kind} series on ${kitLabel}. ${match.playerAName} ${match.roundsA}–${match.roundsB} ${match.playerBName} on ${SERVER_CONFIG.ip}.`,
  };
}

function formatDuration(ms: number): string {
  if (ms <= 0) return "—";
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

function formatHearts(h: number): string {
  return `${h % 1 === 0 ? h : h.toFixed(1)}♥`;
}

function RankArrow({ before, after }: { before: string; after: string }) {
  const changed = before !== after;
  const beforePlaced = isPlaced(before) && before !== "UNRATED";
  const afterPlaced = isPlaced(after) && after !== "UNRATED";
  if (!beforePlaced && !afterPlaced) return null;
  return (
    <span className="flex items-center gap-1.5">
      <RankBadge division={before} size="sm" />
      {changed && (
        <>
          <span className="text-lb-low">→</span>
          <RankBadge division={after} size="sm" />
        </>
      )}
    </span>
  );
}

export default async function MatchDetailPage({ params }: Params) {
  const { username: raw, matchId } = await params;
  const username = decodeURIComponent(raw);

  const [match, rounds] = await Promise.all([
    fetchMatch(matchId).catch(() => null),
    fetchRounds(matchId).catch(() => []),
  ]);

  if (!match) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[800px] flex-col justify-center gap-6 px-4 py-28">
        <Link
          href={`/u/${encodeURIComponent(username)}`}
          className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-lb-mid transition-colors hover:text-lb-brand"
        >
          <ArrowLeft size={13} /> {username}
        </Link>
        <h1 className="text-[32px] font-extrabold leading-none text-lb-hi">Match not found</h1>
        <p className="text-[15px] text-lb-body">
          This match series may have been voided or does not exist.
        </p>
      </main>
    );
  }

  const kitLabel = modeLabel(match.kit as LeaderboardView);
  const kind = match.promotion ? "Promotion" : match.placement ? "Placement" : "Ranked";
  const kitAccent = rankTone(match.aRankAfter || match.aRankBefore);

  const playerA = {
    name: match.playerAName,
    uuid: match.playerAUuid,
    lpDelta: match.aLpDelta,
    rankBefore: match.aRankBefore,
    rankAfter: match.aRankAfter,
    score: match.roundsA,
    won: match.winnerUuid === match.playerAUuid,
  };
  const playerB = {
    name: match.playerBName,
    uuid: match.playerBUuid,
    lpDelta: match.bLpDelta,
    rankBefore: match.bRankBefore,
    rankAfter: match.bRankAfter,
    score: match.roundsB,
    won: match.winnerUuid === match.playerBUuid,
  };

  return (
    <main className="mx-auto max-w-[900px] px-4 py-6 pt-24 lg:px-6 lg:pt-28">
      {/* Back link */}
      <Link
        href={`/u/${encodeURIComponent(username)}`}
        className="mb-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-lb-mid transition-colors hover:text-lb-brand"
      >
        <ArrowLeft size={13} /> {username}
      </Link>

      {/* ── Series header ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden border border-lb-line-strong bg-lb-surface">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: kitAccent.bg }}
        />

        <div className="p-5 lg:p-7">
          {/* Kit + kind label */}
          <div className="mb-5 flex items-center gap-2.5">
            <KitIcon id={match.kit} size={15} className="shrink-0 text-lb-low" />
            <span className="lb-eyebrow text-lb-low">
              {kitLabel} · {kind}
            </span>
            {match.voided && (
              <span className="ml-2 border border-lb-line-strong px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lb-low">
                Voided
              </span>
            )}
          </div>

          {/* Players vs */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Player A */}
            <div className={playerA.won && !match.voided ? "" : "opacity-70"}>
              <Link
                href={`/u/${encodeURIComponent(playerA.name)}`}
                className="group block"
              >
                <span className="block text-[clamp(18px,3vw,28px)] font-extrabold leading-none text-lb-hi transition-colors group-hover:text-lb-brand">
                  {playerA.name}
                </span>
                <span className="mt-2 block">
                  <RankArrow before={playerA.rankBefore} after={playerA.rankAfter} />
                </span>
              </Link>
              {!match.voided && playerA.lpDelta !== 0 && (
                <span
                  className={`mt-2 block font-mono text-[15px] font-bold ${
                    playerA.lpDelta > 0 ? "text-[#24b35e]" : "text-[#e05252]"
                  }`}
                >
                  {playerA.lpDelta > 0 ? "+" : ""}
                  {playerA.lpDelta} LP
                </span>
              )}
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-1">
              <div className="font-mono text-[clamp(28px,4vw,40px)] font-extrabold leading-none text-lb-hi">
                {playerA.score}–{playerB.score}
              </div>
              <div className="lb-eyebrow text-lb-low">rounds</div>
            </div>

            {/* Player B */}
            <div
              className={`text-right ${playerB.won && !match.voided ? "" : "opacity-70"}`}
            >
              <Link
                href={`/u/${encodeURIComponent(playerB.name)}`}
                className="group block"
              >
                <span className="block text-[clamp(18px,3vw,28px)] font-extrabold leading-none text-lb-hi transition-colors group-hover:text-lb-brand">
                  {playerB.name}
                </span>
                <span className="mt-2 flex justify-end">
                  <RankArrow before={playerB.rankBefore} after={playerB.rankAfter} />
                </span>
              </Link>
              {!match.voided && playerB.lpDelta !== 0 && (
                <span
                  className={`mt-2 block font-mono text-[15px] font-bold ${
                    playerB.lpDelta > 0 ? "text-[#24b35e]" : "text-[#e05252]"
                  }`}
                >
                  {playerB.lpDelta > 0 ? "+" : ""}
                  {playerB.lpDelta} LP
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Round detail ──────────────────────────────────────────── */}
      <div className="mt-4 border border-lb-line-strong bg-lb-surface">
        <div className="lb-eyebrow border-b border-white/[0.05] px-4 py-3 text-lb-low">
          Round detail
        </div>

        {rounds.length === 0 ? (
          <div className="px-4 py-8 text-center text-[13px] text-lb-mid">
            Round detail starts after the capture update.
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/[0.04]">
            {rounds.map((round, i) => {
              const winnerIsA = round.winnerUuid === match.playerAUuid;
              const winnerName = winnerIsA ? match.playerAName : match.playerBName;
              const loserName = winnerIsA ? match.playerBName : match.playerAName;

              return (
                <div
                  key={`${round.matchId}-${round.roundIndex}`}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  {/* Round number */}
                  <span className="w-8 shrink-0 font-mono text-[12px] font-bold text-lb-low">
                    R{i + 1}
                  </span>

                  {/* Winner */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-bold text-lb-hi">{winnerName}</span>
                    <span className="text-[12px] text-lb-low"> won vs </span>
                    <span className="text-[12px] text-lb-body">{loserName}</span>
                  </div>

                  {/* Winner hearts remaining */}
                  <div className="flex items-center gap-1 text-[12px] font-bold text-[#e05252]">
                    <Heart size={11} className="shrink-0" />
                    <span>{formatHearts(round.winnerHearts)}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1 text-[11px] text-lb-low">
                    <Clock size={11} className="shrink-0" />
                    <span>{formatDuration(round.durationMs)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[12px] text-lb-low">
        <Link href={`/u/${encodeURIComponent(username)}`} className="hover:text-lb-mid">
          ← {username}&apos;s profile
        </Link>
        <Link href="/leaderboard" className="hover:text-lb-mid">
          Full leaderboard →
        </Link>
      </div>
    </main>
  );
}
