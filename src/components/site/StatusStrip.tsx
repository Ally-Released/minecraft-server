"use client";

import { SERVER_CONFIG } from "@/lib/config";
import type { ServerStatus } from "@/lib/status";
import { useLiveStatus } from "@/lib/useLiveStatus";

const LIGHT = {
  online: { dot: "bg-glow", ring: "border-glow/50", label: "Online", text: "text-glow" },
  offline: { dot: "bg-ink-3", ring: "border-ink-3/40", label: "Offline", text: "text-ink-2" },
  unknown: { dot: "bg-steel", ring: "border-steel/40", label: "Checking", text: "text-ink-2" },
} as const;

/**
 * In-world instrument panel. Reads like something bolted to the rock face,
 * not like a dashboard card — and it never shows a number it did not receive.
 */
export default function StatusStrip({ initial }: { initial: ServerStatus }) {
  const status = useLiveStatus(initial);
  const light = LIGHT[status.state];

  const rows: [string, string][] = [
    [
      "Players",
      status.players ? `${status.players.online} / ${status.players.max}` : "—",
    ],
    // The query API reports the proxy build string, which is not the version a
    // player types into their launcher — so the configured value leads.
    ["Version", SERVER_CONFIG.version],
    ["Edition", SERVER_CONFIG.editions.join(" · ")],
  ];

  return (
    <div className="slab slab-sm w-full max-w-[19rem]" style={{ ["--edge-angle" as string]: "200deg" }}>
      <div className="slab-face relative overflow-hidden bg-abyss/70 px-5 py-4 backdrop-blur-md">
        <div
          aria-hidden
          className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-glow/12 to-transparent"
        />

        <div className="relative flex items-center justify-between border-b border-hair/80 pb-3">
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              {status.state === "online" && (
                <span
                  className={`absolute inset-0 rounded-full border ${light.ring}`}
                  style={{ animation: "pulse-ring 2.4s var(--ease-out-quart) infinite" }}
                />
              )}
              <span className={`h-2 w-2 rounded-full ${light.dot}`} />
            </span>
            <span className={`display-tight text-[0.82rem] tracking-[0.22em] ${light.text}`}>
              {light.label}
            </span>
          </span>
          <span className="hud text-[0.55rem] uppercase tracking-[0.28em] text-ink-3">Live</span>
        </div>

        <dl className="relative mt-3 space-y-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4">
              <dt className="hud text-[0.58rem] uppercase tracking-[0.26em] text-ink-3">{k}</dt>
              <dd className="hud truncate text-[0.82rem] font-medium text-ice">{v}</dd>
            </div>
          ))}
        </dl>

        {status.motd && (
          <p className="relative mt-3 border-t border-hair/80 pt-3 text-[0.7rem] leading-snug text-ink-2">
            {status.motd}
          </p>
        )}
      </div>
    </div>
  );
}
