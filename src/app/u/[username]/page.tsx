import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FlexRankCard } from "@/components/leaderboard/FlexRankCard";
import { FlexShare } from "@/components/leaderboard/FlexShare";
import { CopyPlayIp } from "@/components/leaderboard/CopyPlayIp";
import { SkinViewer3D } from "@/components/leaderboard/SkinViewer3D";
import { ClimbMeter } from "@/components/leaderboard/ClimbMeter";
import { RankBadge } from "@/components/leaderboard/RankBadge";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { fetchFlexCard, fetchMatchesForUuid, fetchPlayerRowsByUsername } from "@/lib/ranked-public";
import {
  KITS,
  flexCaption,
  formatHours,
  formatRecord,
  formatRelativeTime,
  formatWinRate,
  gamesPlayed,
  isPlaced,
  rankIndex,
  rankTone,
} from "@/lib/leaderboard";
import { SERVER_CONFIG } from "@/lib/config";
import { ProfileBody } from "./ProfileBody";

type Params = { params: Promise<{ username: string }> };

export const revalidate = 20;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username: raw } = await params;
  const card = await fetchFlexCard(raw).catch(() => null);
  const name = card?.username ?? decodeURIComponent(raw);
  if (!card) {
    return {
      title: `${name} · Clasher Network`,
      description: `${name} is not on the live Clasher Network board yet.`,
    };
  }
  const place = card.place ? `#${card.place} ` : "";
  const rank = isPlaced(card.division) ? `${card.division} · ${card.lp} LP` : "Unrated";
  const title = `${name} · ${place}${rank} · Clasher Network`.replace(/\s+/g, " ").trim();
  const description = card.caption.replace(/\n/g, " · ");
  return {
    title,
    description,
    alternates: { canonical: card.sharePath },
    openGraph: {
      title,
      description,
      url: `${SERVER_CONFIG.url}${card.sharePath}`,
      type: "profile",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProfilePage({ params }: Params) {
  const { username: raw } = await params;

  // Parallel fetch of flex card + kit rows
  const [card, allRows] = await Promise.all([
    fetchFlexCard(raw).catch(() => null),
    fetchPlayerRowsByUsername(raw).catch(() => []),
  ]);

  const name = card?.username ?? decodeURIComponent(raw);

  // Build started kit list
  const kitRows = KITS.map((kit) => {
    const row = allRows.find((r) => r.game_mode === kit.id);
    if (!row) return null;
    const placed = isPlaced(row.division);
    const started =
      placed || row.placement_played > 0 || row.ranked_wins + row.ranked_losses > 0;
    if (!started) return null;
    return {
      id: kit.id,
      label: kit.label,
      division: row.division,
      lp: row.lp,
      placement_played: row.placement_played,
      ranked_wins: row.ranked_wins,
      ranked_losses: row.ranked_losses,
      placed,
      started,
    };
  })
    .filter((k): k is NonNullable<typeof k> => k !== null)
    .sort((a, b) => {
      if (a.placed !== b.placed) return a.placed ? -1 : 1;
      const rd = rankIndex(a.division) - rankIndex(b.division);
      if (rd !== 0) return rd;
      return b.lp - a.lp;
    });

  if (!card) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[800px] flex-col justify-center gap-6 px-4 py-28">
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-lb-mid transition-colors hover:text-lb-brand"
        >
          <ArrowLeft size={13} /> Leaderboard
        </Link>
        <p className="lb-eyebrow text-lb-brand">Live ranked</p>
        <h1 className="text-[clamp(32px,6vw,52px)] font-extrabold leading-none text-lb-hi">
          {name}
        </h1>
        <p className="max-w-[480px] text-[15px] leading-relaxed text-lb-body">
          No ranked row found for this name. Play 5 placement matches on{" "}
          <span className="font-bold text-lb-hi">{SERVER_CONFIG.ip}</span> and this profile fills
          in from live data.
        </p>
        <div className="flex flex-wrap gap-3">
          <CopyPlayIp />
          <Link
            href="/leaderboard"
            className="inline-flex h-12 items-center border border-lb-line-strong px-4 text-[13px] font-bold text-lb-body hover:text-lb-hi"
          >
            Open the ladder
          </Link>
        </div>
      </main>
    );
  }

  // Now we have UUID — fetch match history
  const realMatches = await fetchMatchesForUuid(card.uuid).catch(() => []);

  const overallRow = allRows.find((r) => r.game_mode === "overall") ?? null;
  const overallGames = gamesPlayed(card);
  const winRate = formatWinRate(card.ranked_wins, card.ranked_losses);
  const kitAccent = rankTone(card.division);

  const caption = flexCaption({
    username: card.username,
    division: card.division,
    lp: card.lp,
    place: card.place,
    kitLabel: "Overall",
    record: overallGames > 0 ? formatRecord(card.ranked_wins, card.ranked_losses) : null,
  });

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-6 pt-24 lg:px-6 lg:pt-28">
      {/* Back link */}
      <Link
        href="/leaderboard"
        className="mb-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-lb-mid transition-colors hover:text-lb-brand"
      >
        <ArrowLeft size={13} /> Leaderboard
      </Link>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border border-lb-line-strong bg-lb-surface">
        {/* Rank-toned top accent */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: kitAccent.bg }}
        />
        {/* Subtle gold glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 100% at 90% 0%, rgba(231,193,99,0.08), transparent 55%)",
          }}
        />

        <div className="relative grid gap-6 p-5 lg:grid-cols-[auto_1fr_300px] lg:p-7">
          {/* Avatar + 3D skin */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="grid place-items-center border p-1.5"
              style={{ borderColor: kitAccent.bg, background: "rgba(255,255,255,0.02)" }}
            >
              <PlayerAvatar
                username={card.username}
                skinUrl={card.skin_url}
                size={96}
                mode="face"
              />
            </div>
            <SkinViewer3D
              username={card.username}
              uuid={card.uuid}
              skinUrl={card.skin_url}
              width={160}
              height={200}
              emote="champion"
            />
          </div>

          {/* Identity + stats */}
          <div className="min-w-0">
            <div className="lb-eyebrow text-lb-low">Clasher Network · Live ranked profile</div>
            <h1 className="mt-1 truncate text-[clamp(30px,4.5vw,50px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-lb-brand">
              {card.username}
            </h1>

            {/* Place + division badge */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {card.place ? (
                <span className="font-mono text-[15px] font-extrabold text-lb-brand">
                  #{card.place}
                  {card.fieldSize ? (
                    <span className="font-bold text-lb-mid"> / {card.fieldSize}</span>
                  ) : null}
                </span>
              ) : null}
              <RankBadge division={card.division} />
              {isPlaced(card.peak_rank) && card.peak_rank !== card.division && (
                <span className="text-[11px] font-bold uppercase tracking-wide text-lb-low">
                  Peak {card.peak_rank}
                </span>
              )}
            </div>

            {/* Climb meter */}
            <div className="mt-5 max-w-[420px]">
              <ClimbMeter
                division={card.division}
                lp={card.lp}
                placementPlayed={card.placement_played}
              />
            </div>

            {/* Stats row */}
            <div className="mt-5 flex flex-wrap gap-y-4 border-t border-white/[0.05] pt-4">
              {overallGames > 0 && (
                <StatBlock
                  value={formatRecord(card.ranked_wins, card.ranked_losses)}
                  label="Record"
                />
              )}
              {winRate && <StatBlock value={winRate} label="Win rate" gold />}
              {card.win_streak > 1 && (
                <StatBlock value={`${card.win_streak}×`} label="Streak" gold />
              )}
              {card.hours_played > 0 && (
                <StatBlock value={formatHours(card.hours_played)} label="Hours" />
              )}
              <StatBlock
                value={`${kitRows.filter((k) => k.placed).length} / ${KITS.length}`}
                label="Kits ranked"
              />
              {overallRow && (
                <StatBlock value={formatRelativeTime(overallRow.lastActive)} label="Last seen" />
              )}
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyPlayIp />
            </div>
          </div>

          {/* Flex card + share */}
          <div className="flex flex-col gap-4">
            <FlexRankCard card={card} />
            <FlexShare username={card.username} caption={caption} />
          </div>
        </div>
      </div>

      {/* ── Kits sidebar + Match history (client) ────────────────────── */}
      <ProfileBody
        kitRows={kitRows}
        matches={realMatches}
        uuid={card.uuid}
        username={card.username}
      />
    </main>
  );
}

function StatBlock({
  value,
  label,
  gold = false,
}: {
  value: string;
  label: string;
  gold?: boolean;
}) {
  return (
    <div className="pr-6">
      <div className={`lb-stat text-[22px] leading-none ${gold ? "text-lb-brand" : "text-lb-hi"}`}>
        {value}
      </div>
      <div className="lb-eyebrow mt-1.5 text-lb-low">{label}</div>
    </div>
  );
}
