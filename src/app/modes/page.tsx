import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { MODES } from "@/lib/modes";
import CopyIp from "@/components/ui/CopyIp";

export const metadata: Metadata = {
  title: "Game modes",
  description: `Four worlds on ${SERVER_CONFIG.name}: Lifesteal, Survival, Box PvP and PvP Practice. One address, ${SERVER_CONFIG.ip}.`,
  alternates: { canonical: "/modes" },
};

export default function ModesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-16 bg-background">
        <div className="container-base max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-9 bg-primary/50" />
            <span className="eyebrow text-primary">Choose a world</span>
          </div>
          <h1 className="display text-5xl md:text-6xl text-foreground">
            Four worlds.
            <span className="block text-primary opacity-90">One address.</span>
          </h1>
          <p className="prose-lede mt-5 max-w-lg text-base">
            Every world runs off the same connection — join once and pick where you are going from the hub. Nothing here needs a separate install.
          </p>
          <div className="mt-8 max-w-sm">
            <CopyIp />
          </div>
        </div>
      </section>

      <section className="relative container-base max-w-3xl pb-28">
        <ul className="space-y-12 border-t border-border pt-12">
          {MODES.map((m, i) => (
            <li key={m.slug} className="group relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
                {/* Emblem */}
                <div className="flex-shrink-0 pt-1">
                  <span className="display text-3xl text-primary opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1">
                  <h2 className="display-tight text-3xl text-foreground">
                    <Link href={`/modes/${m.slug}`} className="hover:text-primary transition-colors">
                      {m.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground max-w-lg">
                    {m.tagline}
                  </p>

                  {/* Traits */}
                  <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {m.traits.map((t) => (
                      <div key={t.label}>
                        <dt className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                          {t.label}
                        </dt>
                        <dd className="mt-1 text-sm text-foreground">{t.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8">
                    <Link
                      href={`/modes/${m.slug}`}
                      className="inline-block text-xs font-semibold text-primary uppercase tracking-widest hover:text-foreground transition-colors"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="prose-lede mt-16 max-w-2xl text-sm border-t border-border pt-12">
          Worlds are selected from the in-game hub after you connect. If a world is down for
          maintenance it will say so on the selector — announcements go out in Discord first.
        </p>
      </section>
    </>
  );
}
