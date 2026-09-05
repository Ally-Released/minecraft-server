import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Minecraft resource-pack clients need a direct zip download (no HTML challenge).
        source: "/packs/integrity.zip",
        headers: [
          { key: "Content-Type", value: "application/zip" },
          { key: "Cache-Control", value: "public, max-age=300" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
