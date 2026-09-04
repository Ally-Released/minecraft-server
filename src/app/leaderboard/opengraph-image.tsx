import { ImageResponse } from "next/og";
import { SERVER_CONFIG } from "@/lib/config";

export const alt = "Clasher Network live ranked ladder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#07080d",
          color: "#eef1f7",
          padding: 64,
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(80% 120% at 90% 10%, rgba(231,193,99,0.2), transparent 55%)",
          }}
        />
        <div style={{ display: "flex", color: "#e7c163", letterSpacing: 6, fontSize: 22, fontWeight: 800 }}>
          CLASHER NETWORK
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1, color: "#eef1f7" }}>
            Live ranked ladder
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#aeb6c6" }}>
            100 LP a division. BO5 at LT1 and MT1. Flex #1.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700, color: "#e7c163" }}>
          <span>clashernetwork.fun/leaderboard</span>
          <span>{SERVER_CONFIG.ip}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
