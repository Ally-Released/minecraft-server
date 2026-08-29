"use client";

import { SERVER_CONFIG } from "@/lib/config";
import type { ServerStatus } from "@/lib/status";
import { useLiveStatus } from "@/lib/useLiveStatus";
import CopyIp from "@/components/ui/CopyIp";
import Reveal from "@/components/ui/Reveal";

function Readout({
  label,
  value,
  note,
  align = "left",
  accent = false,
}: {
  label: string;
  value: string;
  note?: string;
  align?: "left" | "right";
  accent?: boolean;
}) {
  return (
    <div className={align === "right" ? "lg:text-right" : ""}>
      <p className="eyebrow">{label}</p>
      <p
        className={`display-tight mt-2 text-[1.9rem] leading-none sm:text-[2.4rem] ${
          accent ? "text-glow" : "text-paper"
        }`}
      >
        {value}
      </p>
      {note && <p className="hud mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-ink-3">{note}</p>}
    </div>
  );
}

export default function StatusCore({ initial }: { initial: ServerStatus }) {
  const status = useLiveStatus(initial);

  // Server and client format this in different timezones by design — the
  // visitor should see their own clock, so the mismatch is suppressed rather
  // than deferred to an effect.
  const stamp = new Date(status.checkedAt);
  const checked =
    Number.isNaN(stamp.getTime()) || stamp.getTime() === 0
      ? ""
      : stamp.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  const online = status.state === "online";
  const stateLabel =
    status.state === "online" ? "Online" : status.state === "offline" ? "Offline" : "Unknown";

  return (
    <section id="live" className="relative isolate scroll-mt-28 overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(46% 42% at 50% 50%, rgba(30,96,170,0.32), transparent 68%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-9 bg-gradient-to-r from-transparent to-glow" />
            <span className="eyebrow">Live from the server</span>
            <span aria-hidden className="h-px w-9 bg-gradient-to-l from-transparent to-glow" />
          </div>
          <h2 className="display mx-auto mt-7 max-w-3xl text-[clamp(2.2rem,5.6vw,4.6rem)] text-paper">
            The world is <span className="lit">running right now.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 sm:mt-20">
          {/* connectors — only meaningful once the three columns line up */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#86e5ff" stopOpacity="0" />
                <stop offset="50%" stopColor="#86e5ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#86e5ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[
              [26, 26],
              [26, 74],
              [74, 26],
              [74, 74],
            ].map(([x, y], i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="url(#wire)"
                strokeWidth="1"
                strokeDasharray="1.6 2.4"
                vectorEffect="non-scaling-stroke"
                style={{ animation: `halo-breathe ${5 + i}s ease-in-out ${i * 0.5}s infinite` }}
              />
            ))}
          </svg>

          <div className="relative grid items-center gap-y-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
            {/* left */}
            <Reveal className="order-2 space-y-14 lg:order-1">
              <Readout label="Status" value={stateLabel} align="right" accent={online} />
              <Readout
                label="Version"
                value={SERVER_CONFIG.version}
                note={status.version ? `Server reports ${status.version}` : "From configuration"}
                align="right"
              />
            </Reveal>

            {/* core */}
            <div className="order-1 mx-auto lg:order-2">
              <div className="relative grid h-64 w-64 place-items-center sm:h-80 sm:w-80">
                <div
                  aria-hidden
                  className="animate-halo absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(77,163,255,0.34),transparent_66%)] blur-2xl"
                />
                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
                  <g fill="none" strokeLinecap="square">
                    <circle
                      cx="100"
                      cy="100"
                      r="94"
                      stroke="#14406f"
                      strokeWidth="1"
                      strokeDasharray="2 8"
                      className="origin-center animate-spin [animation-duration:70s]"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="76"
                      stroke="#2b7fd4"
                      strokeWidth="1"
                      strokeDasharray="34 120"
                      opacity="0.8"
                      className="origin-center animate-spin [animation-direction:reverse] [animation-duration:26s]"
                    />
                    <circle cx="100" cy="100" r="60" stroke="#14406f" strokeWidth="1" opacity="0.7" />
                    {/* blocky inner shell — an octagon, not a circle */}
                    <polygon
                      points="100,42 141,59 158,100 141,141 100,158 59,141 42,100 59,59"
                      stroke={online ? "#86e5ff" : "#14406f"}
                      strokeWidth="1.4"
                      opacity="0.9"
                      className="origin-center animate-spin [animation-duration:44s]"
                    />
                  </g>
                </svg>

                <div
                  className={`relative grid h-32 w-32 place-items-center rounded-full sm:h-40 sm:w-40 ${
                    online
                      ? "bg-[radial-gradient(circle_at_50%_38%,rgba(198,244,255,0.95),rgba(77,163,255,0.55)_42%,rgba(10,40,80,0.15)_72%)] shadow-[0_0_70px_rgba(77,163,255,0.45)]"
                      : "bg-[radial-gradient(circle,rgba(20,64,111,0.45),transparent_70%)]"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className={`display text-[2.6rem] leading-none sm:text-[3.4rem] ${
                        online ? "text-abyss" : "text-ink-2"
                      }`}
                    >
                      {status.players ? status.players.online : "—"}
                    </p>
                    <p
                      className={`hud mt-1 text-[0.55rem] uppercase tracking-[0.3em] ${
                        online ? "text-abyss/70" : "text-ink-3"
                      }`}
                    >
                      {status.players ? "Playing now" : "No data"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <Reveal className="order-3 space-y-14">
              <Readout
                label="Players"
                value={
                  status.players
                    ? `${status.players.online} / ${status.players.max}`
                    : `— / ${SERVER_CONFIG.maxPlayers}`
                }
                note={status.players ? "Live count" : "Capacity from configuration"}
                accent={online && !!status.players}
              />
              <Readout label="Edition" value={SERVER_CONFIG.editions.join(" · ")} note={SERVER_CONFIG.accounts} />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mx-auto mt-16 max-w-xl">
            <CopyIp />
            <p
              suppressHydrationWarning
              className="hud mt-4 text-center text-[0.62rem] uppercase tracking-[0.24em] text-ink-3"
            >
              {status.state === "unknown"
                ? "Status query unavailable — retrying"
                : checked
                  ? `Last checked ${checked}`
                  : "Checking…"}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
