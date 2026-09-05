import type { Metadata } from "next";
import Link from "next/link";
import { PlayerProfilePage } from "@/components/leaderboard/PlayerProfilePage";
import { CopyPlayIp } from "@/components/leaderboard/CopyPlayIp";
import {
  fetchFlexCard,
  fetchMatchesForUuid,
  fetchPlayerRowsByUsername,
  fetchOverallLadder,
} from "@/lib/ranked-public";
import { SERVER_CONFIG } from "@/lib/config";
import { compareLadder, isPlaced, withLadderRanks } from "@/lib/leaderboard";

type Params = { params: Promise<{ username: string }> };

export const revalidate = 15;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { username: raw } = await params;
  const card = await fetchFlexCard(raw).catch(() => null);
  const name = card?.username ?? decodeURIComponent(raw);
  if (!card) {
    return {
      title: name,
      description: `${name} is not on the live Clasher Network board yet.`,
    };
  }
  const place = card.place ? `#${card.place} ` : "";
  const rank = isPlaced(card.division) ? `${card.division} · ${card.lp} LP` : "Unrated";
  const title = `${name} · ${place}${rank}`.replace(/\s+/g, " ").trim();
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RankProfilePage({ params }: Params) {
  const { username: raw } = await params;
  const ladders = await fetchPlayerRowsByUsername(raw).catch(() => []);
  const card = await fetchFlexCard(raw).catch(() => null);
  const name = card?.username ?? (ladders[0]?.username ?? decodeURIComponent(raw));

  if (!ladders.length || !card) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col justify-center gap-6 px-4 py-28">
        <p className="lb-eyebrow text-lb-brand">Live ranked</p>
        <h1 className="text-[clamp(32px,6vw,52px)] font-extrabold leading-none text-lb-hi">{name}</h1>
        <p className="text-[15px] leading-relaxed text-lb-body">
          No live ranked row for this name yet. Finish 5 placement matches on {SERVER_CONFIG.ip} and this
          profile fills from Supabase — the durable cloud copy.
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

  const overall = ladders.find((r) => r.game_mode === "overall") ?? ladders[0];
  let overallPlace: { place: number; of: number } | null = null;
  if (isPlaced(overall.division)) {
    const board = await fetchOverallLadder().catch(() => []);
    const ranked = withLadderRanks([...board].sort(compareLadder));
    const me = ranked.find((r) => r.uuid === overall.uuid);
    if (me) overallPlace = { place: me.rank, of: ranked.length };
  }

  const matches = await fetchMatchesForUuid(overall.uuid).catch(() => []);

  return (
    <PlayerProfilePage
      ladders={ladders}
      matches={matches}
      overallPlace={overallPlace}
      card={card}
    />
  );
}
