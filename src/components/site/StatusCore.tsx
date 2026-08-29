"use client";

import { SERVER_CONFIG } from "@/lib/config";
import type { ServerStatus } from "@/lib/status";
import { useLiveStatus } from "@/lib/useLiveStatus";
import CopyIp from "@/components/ui/CopyIp";

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
        className={`display-tight mt-2 text-3xl sm:text-4xl leading-none ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {note && <p className="hud mt-2 text-xs uppercase tracking-widest text-muted-foreground">{note}</p>}
    </div>
  );
}

export default function StatusCore({ initial }: { initial: ServerStatus }) {
  const status = useLiveStatus(initial);

  const stamp = new Date(status.checkedAt);
  const checked =
    Number.isNaN(stamp.getTime()) || stamp.getTime() === 0
      ? ""
      : stamp.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  const online = status.state === "online";
  const stateLabel =
    status.state === "online" ? "Online" : status.state === "offline" ? "Offline" : "Unknown";

  return (
    <section id="live" className="relative isolate scroll-mt-28 overflow-hidden py-28 sm:py-36 bg-background border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(46% 42% at 50% 50%, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent 68%)",
        }}
      />

      <div className="container-base max-w-5xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-9 bg-gradient-to-r from-transparent to-primary" />
            <span className="eyebrow text-primary">Live from the server</span>
            <span aria-hidden className="h-px w-9 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="display mx-auto mt-7 max-w-3xl text-5xl sm:text-6xl text-foreground">
            The world is <span className="text-primary">running right now.</span>
          </h2>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <div className="relative grid items-center gap-y-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
            {/* left */}
            <div className="order-2 space-y-14 lg:order-1">
              <Readout label="Status" value={stateLabel} align="right" accent={online} />
              <Readout
                label="Version"
                value={SERVER_CONFIG.version}
                note={status.version ? `Server reports ${status.version}` : "From configuration"}
                align="right"
              />
            </div>

            {/* core */}
            <div className="order-1 mx-auto lg:order-2">
              <div className="relative grid h-64 w-64 place-items-center sm:h-80 sm:w-80">
                <div
                  aria-hidden
                  className="animate-halo absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_20%,transparent),transparent_66%)] blur-2xl"
                />
                
                <div
                  className={`relative grid h-32 w-32 place-items-center rounded-full sm:h-40 sm:w-40 border transition-colors duration-1000 ${
                    online
                      ? "bg-primary border-primary shadow-[0_0_70px_var(--color-primary)] shadow-primary/30"
                      : "bg-muted border-border"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className={`display text-4xl leading-none sm:text-5xl ${
                        online ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {status.players ? status.players.online : "—"}
                    </p>
                    <p
                      className={`hud mt-2 text-[0.65rem] uppercase tracking-widest ${
                        online ? "text-primary-foreground/80" : "text-muted-foreground/80"
                      }`}
                    >
                      {status.players ? "Playing now" : "No data"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="order-3 space-y-14">
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
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-xl">
            <CopyIp />
            <p
              suppressHydrationWarning
              className="hud mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground"
            >
              {status.state === "unknown"
                ? "Status query unavailable — retrying"
                : checked
                  ? `Last checked ${checked}`
                  : "Checking…"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
