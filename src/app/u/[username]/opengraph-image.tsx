import type { CSSProperties, ReactNode } from "react";
import { ImageResponse } from "next/og";
import { fetchFlexCard } from "@/lib/ranked-public";
import { isPlaced, rankTone } from "@/lib/leaderboard";
import { SERVER_CONFIG } from "@/lib/config";

export const runtime = "nodejs";
export const alt = "Clasher Network rank card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Box({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return <div style={{ display: "flex", ...style }}>{children}</div>;
}

export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const { username: raw } = await params;
  let card = null;
  try {
    card = await fetchFlexCard(raw);
  } catch {
    card = null;
  }

  const name = card?.username ?? decodeURIComponent(raw);
  const tone = rankTone(card?.division);
  const placed = card ? isPlaced(card.division) : false;

  // Build crafthead avatar URL (face, 128px, no hat so it's crisp in OG)
  const avatarSrc = card?.uuid
    ? `https://crafthead.net/avatar/${card.uuid}/128`
    : card?.skin_url
      ? card.skin_url
      : `https://minotar.net/avatar/${encodeURIComponent(name)}/128`;

  return new ImageResponse(
    (
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#07080d",
          color: "#eef1f7",
          fontFamily: "system-ui, sans-serif",
          flexDirection: "row",
          position: "relative",
        }}
      >
        {/* BG gold glow */}
        <Box
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(75% 100% at 85% 0%, rgba(231,193,99,0.18), transparent 55%)",
          }}
        />
        {/* Grid lines */}
        <Box
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Left: avatar pane */}
        <Box
          style={{
            width: 240,
            flexShrink: 0,
            background: "rgba(255,255,255,0.025)",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            padding: "0 0 24px 0",
          }}
        >
          {/* Rank accent top bar */}
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 240,
              height: 4,
              background: placed ? tone.bg : "#ffffff14",
            }}
          />

          {/* Avatar image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            width={128}
            height={128}
            style={{
              imageRendering: "pixelated",
              border: `3px solid ${placed ? tone.bg : "#ffffff22"}`,
              marginTop: 40,
            }}
            alt={name}
          />

          {/* Division badge under avatar */}
          {placed && card ? (
            <Box
              style={{
                marginTop: 20,
                background: tone.bg,
                color: tone.fg,
                padding: "6px 14px",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              {card.division}
            </Box>
          ) : (
            <Box
              style={{
                marginTop: 20,
                background: "#ffffff14",
                color: "#727c92",
                padding: "6px 14px",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              UNRATED
            </Box>
          )}

          {/* LP */}
          {placed && card ? (
            <Box
              style={{
                marginTop: 10,
                fontSize: 28,
                fontWeight: 800,
                color: "#eef1f7",
              }}
            >
              {card.lp}{" "}
              <Box style={{ fontSize: 16, fontWeight: 600, color: "#727c92", marginLeft: 4, alignSelf: "flex-end", marginBottom: 4 }}>
                LP
              </Box>
            </Box>
          ) : null}
        </Box>

        {/* Right: info pane */}
        <Box
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "44px 52px 40px 52px",
            position: "relative",
          }}
        >
          {/* Top: brand */}
          <Box style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Box
              style={{
                color: "#e7c163",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 5,
              }}
            >
              CLASHER NETWORK
            </Box>
            <Box style={{ color: "#727c92", fontSize: 15, fontWeight: 700, letterSpacing: 3 }}>
              LIVE RANKED
            </Box>
          </Box>

          {/* Middle: name + rank info */}
          <Box style={{ flexDirection: "column", gap: 16 }}>
            {/* Name */}
            <Box
              style={{
                fontSize: 68,
                fontWeight: 900,
                color: "#e7c163",
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {name}
            </Box>

            {/* Place + record */}
            {card ? (
              <Box style={{ gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                {card.place ? (
                  <Box style={{ color: "#ffc53f", fontSize: 30, fontWeight: 800, alignItems: "baseline", gap: 6 }}>
                    #{card.place}
                    {card.fieldSize ? (
                      <Box style={{ color: "#727c92", fontSize: 18, fontWeight: 600 }}>
                        {" / "}{card.fieldSize}
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
                {card.ranked_wins + card.ranked_losses > 0 ? (
                  <Box style={{ color: "#aeb6c6", fontSize: 26, fontWeight: 700 }}>
                    {card.ranked_wins}–{card.ranked_losses}
                    {card.win_streak > 1 ? (
                      <Box style={{ color: "#e7c163", fontSize: 18, marginLeft: 10, fontWeight: 700 }}>
                        {card.win_streak} streak
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
            ) : (
              <Box style={{ color: "#727c92", fontSize: 26 }}>Not on the live board yet.</Box>
            )}

            {/* Best kit */}
            {card?.bestKit ? (
              <Box style={{ color: "#727c92", fontSize: 20, gap: 10, alignItems: "center" }}>
                <Box style={{ color: "#aeb6c6", fontWeight: 700 }}>
                  Best kit
                </Box>
                <Box style={{ color: "#e7c163", fontWeight: 800 }}>
                  {card.bestKit.label}
                </Box>
                <Box
                  style={{
                    background: rankTone(card.bestKit.division).bg,
                    color: rankTone(card.bestKit.division).fg,
                    padding: "3px 10px",
                    fontSize: 16,
                    fontWeight: 800,
                  }}
                >
                  {card.bestKit.division}
                </Box>
                <Box style={{ color: "#aeb6c6", fontWeight: 700 }}>
                  {card.bestKit.lp} LP
                </Box>
              </Box>
            ) : null}
          </Box>

          {/* Bottom: server IP + kits ranked */}
          <Box style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
            <Box style={{ fontSize: 17, color: "#727c92" }}>
              {card?.kitsRanked ? `${card.kitsRanked} kits ranked` : "Queue ranked to climb."}
            </Box>
            <Box style={{ fontSize: 20, fontWeight: 800, color: "#e7c163", letterSpacing: 1 }}>
              {SERVER_CONFIG.ip}
            </Box>
          </Box>
        </Box>
      </Box>
    ),
    { ...size },
  );
}
