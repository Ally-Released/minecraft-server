"use client";

import { SERVER_CONFIG } from "@/lib/config";
import type { ServerStatus } from "@/lib/status";
import { useLiveStatus } from "@/lib/useLiveStatus";
import { Button } from "@/components/ui/button";
import CopyIp from "@/components/ui/CopyIp";
import Link from "next/link";

export default function Hero({ status: initialStatus }: { status: ServerStatus }) {
  const status = useLiveStatus(initialStatus);
  const online = status.state === "online";

  return (
    <section id="home" className="relative isolate min-h-[90svh] overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/main spawn hub.png"
          alt="Main Spawn Hub"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <div className="relative z-10 container-base flex min-h-[90svh] flex-col justify-end pb-20 pt-32 lg:pb-28">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3">
            <span aria-hidden className="h-px w-9 bg-electric/50" />
            <span className="eyebrow text-electric tracking-[0.25em]">
              {SERVER_CONFIG.hero.eyebrow}
            </span>
          </div>

          <h1 className="display text-[clamp(2.5rem,7.4vw,6.5rem)] text-white">
            {SERVER_CONFIG.hero.headline.join(" ")}
          </h1>

          <p className="prose-lede mt-7 max-w-lg text-[1.05rem] text-ink-2 sm:text-lg">
            {SERVER_CONFIG.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-sm tracking-wider font-semibold rounded-none slab slab-sm bg-white text-abyss hover:bg-white/90">
              <Link href="/how-to-play">Play Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-sm tracking-wider font-semibold rounded-none">
              <a href={SERVER_CONFIG.discord} target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
          </div>

          <div className="mt-8 max-w-md">
            <CopyIp />
            <div className="mt-3 flex items-center gap-2 pl-1">
              <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-electric" : "bg-ink-3"}`} />
              <span className="hud text-[0.65rem] tracking-[0.1em] text-ink-3 uppercase">
                {online ? `${status.players?.online || 0} Online · Java + Bedrock` : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
