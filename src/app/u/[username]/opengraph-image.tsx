import type { CSSProperties, ReactNode } from "react";
import { ImageResponse } from "next/og";
import { fetchFlexCard } from "@/lib/ranked-public";
import { isPlaced, rankTone } from "@/lib/leaderboard";
import { SERVER_CONFIG } from "@/lib/config";

export const runtime = "nodejs";
export const alt = "Clasher Network rank flex card";
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

async function loadHeadDataUrl(username: string, skinUrl?: string): Promise<string | null> {
  const candidates = [
    skinUrl,
    `https://mc-heads.net/avatar/${encodeURIComponent(username)}/128`,
    `https://minotar.net/helm/${encodeURIComponent(username)}/128`,
  ].filter(Boolean) as string[];

  for (const url of candidates) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) continue;
      const buf = await res.arrayBuffer();
      if (buf.byteLength < 200) continue;
      const ct = res.headers.get("content-type") || "image/png";
      // If raw skin texture (64x64+), we still show it — mc-heads/minotar already face.
      const b64 = Buffer.from(buf).toString("base64");
      return `data:${ct};base64,${b64}`;
    } catch {
      /* try next */
    }
  }
  return null;
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
  const head = await loadHeadDataUrl(name, card?.skin_url);

  return new ImageResponse(
    (
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#07080d",
          color: "#eef1f7",
          padding: 52,
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <Box
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(70% 100% at 100% 0%, rgba(231,193,99,0.22), transparent 55%), radial-gradient(50% 80% at 0% 100%, rgba(110,160,255,0.12), transparent 50%)",
          }}
        />

        <Box style={{ justifyContent: "space-between", alignItems: "center", zIndex: 1 }}>
          <Box style={{ color: "#e7c163", letterSpacing: 5, fontSize: 22, fontWeight: 800 }}>
            CLASHER NETWORK
          </Box>
          <Box style={{ color: "#727c92", fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>
            LIVE FLEX
          </Box>
        </Box>

        <Box style={{ alignItems: "center", gap: 36, zIndex: 1 }}>
          <Box
            style={{
              width: 168,
              height: 168,
              border: `4px solid ${placed ? tone.bg : "#e7c163"}`,
              background: "#11131b",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {head ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={head}
                width={160}
                height={160}
                alt=""
                style={{ imageRendering: "pixelated", objectFit: "cover" }}
              />
            ) : (
              <Box style={{ fontSize: 64, fontWeight: 800, color: "#e7c163" }}>
                {name.slice(0, 1).toUpperCase()}
              </Box>
            )}
          </Box>

          <Box style={{ flexDirection: "column", gap: 14, flex: 1 }}>
            <Box style={{ fontSize: 64, fontWeight: 800, color: "#e7c163", lineHeight: 1.02 }}>
              {name}
            </Box>
            {card ? (
              <Box style={{ gap: 16, alignItems: "center" }}>
                {card.place ? (
                  <Box style={{ color: "#ffc53f", fontSize: 36, fontWeight: 800, alignItems: "baseline" }}>
                    <Box>#{card.place}</Box>
                    {card.fieldSize ? (
                      <Box style={{ color: "#727c92", marginLeft: 8, fontSize: 22 }}>/ {card.fieldSize}</Box>
                    ) : null}
                  </Box>
                ) : null}
                <Box
                  style={{
                    background: placed ? tone.bg : "#ffffff14",
                    color: placed ? tone.fg : "#aeb6c6",
                    padding: "10px 18px",
                    fontSize: 28,
                    fontWeight: 800,
                  }}
                >
                  {placed ? card.division : "UNRATED"}
                </Box>
                {placed ? (
                  <Box style={{ color: "#eef1f7", fontSize: 34, fontWeight: 800 }}>{card.lp} LP</Box>
                ) : null}
              </Box>
            ) : (
              <Box style={{ color: "#aeb6c6", fontSize: 26 }}>Not on the live board yet.</Box>
            )}
            {card?.bestKit ? (
              <Box style={{ color: "#aeb6c6", fontSize: 22 }}>
                Best · {card.bestKit.label} {card.bestKit.division} · {card.bestKit.lp} LP
              </Box>
            ) : null}
          </Box>
        </Box>

        <Box style={{ justifyContent: "space-between", alignItems: "flex-end", zIndex: 1 }}>
          <Box style={{ flexDirection: "column", gap: 6 }}>
            {card && card.ranked_wins + card.ranked_losses > 0 ? (
              <Box style={{ fontSize: 24, fontWeight: 700, color: "#aeb6c6" }}>
                {card.ranked_wins}–{card.ranked_losses}
                {card.win_streak > 1 ? ` · ${card.win_streak} streak` : ""}
              </Box>
            ) : null}
            <Box style={{ fontSize: 20, color: "#727c92" }}>{card?.climbLine ?? "Queue ranked. Take #1."}</Box>
          </Box>
          <Box
            style={{
              background: "#e7c163",
              color: "#1b1303",
              padding: "14px 22px",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            {SERVER_CONFIG.ip}
          </Box>
        </Box>
      </Box>
    ),
    { ...size },
  );
}
