import { ImageResponse } from "next/og";
import { SERVER_CONFIG } from "@/lib/config";
import { ridge } from "@/lib/terrain";

export const alt = `${SERVER_CONFIG.name} — Minecraft survival server`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Same generator as the site, sampled into flex columns Satori can render. */
function columns(seed: number, count: number, max: number) {
  const r = ridge({ seed, width: 1600, height: 600, block: 1600 / count, peaks: 3, octaves: 3 });
  return r.points.map(([, y]) => Math.round((1 - y / 600) * max));
}

export default function Image() {
  const far = columns(20481, 60, 210);
  const near = columns(33117, 40, 150);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          backgroundColor: "#01040c",
          backgroundImage:
            "linear-gradient(160deg, #01040c 0%, #041028 46%, #0a2851 78%, #10406f 100%)",
          padding: "64px 64px 172px",
        }}
      >
        {/* the beacon, echoing the site */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 180,
            left: 812,
            width: 10,
            backgroundImage:
              "linear-gradient(to bottom, rgba(134,229,255,0) 0%, rgba(134,229,255,0.35) 60%, rgba(198,244,255,0.75) 100%)",
          }}
        />

        {/* far range */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "flex-end",
            opacity: 0.75,
          }}
        >
          {far.map((h, i) => (
            <div key={i} style={{ width: 20, height: h, backgroundColor: "#153a63" }} />
          ))}
        </div>

        {/* near range */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          {near.map((h, i) => (
            <div key={i} style={{ width: 30, height: h, backgroundColor: "#030b16" }} />
          ))}
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              color: "#86e5ff",
              textTransform: "uppercase",
            }}
          >
            {SERVER_CONFIG.hero.eyebrow}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -2,
              color: "#f4f9ff",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {SERVER_CONFIG.name}
          </div>
          <div style={{ marginTop: 22, fontSize: 30, color: "#97b3d6", maxWidth: 760 }}>
            {SERVER_CONFIG.description}
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 30,
              color: "#cde4ff",
            }}
          >
            <span style={{ color: "#5a789c", fontSize: 20, letterSpacing: 4 }}>PLAY</span>
            <span>{SERVER_CONFIG.ip}</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
