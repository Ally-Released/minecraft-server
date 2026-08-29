import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { PVP_CATEGORIES, PVP_MODE_COUNT, DIFFICULTY_LABEL } from "@/lib/pvp";
import Icon from "@/components/ui/Icon";
import { Meter } from "@/components/store/Bits";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "PvP practice",
  description: `${PVP_MODE_COUNT} duel types across ${PVP_CATEGORIES.length} categories on ${SERVER_CONFIG.name} — sword, axe, crystal, ranged, mace, objective and fun modes.`,
  alternates: { canonical: "/pvp" },
};

export default function PvpHubPage() {
  return (
    <div className="relative bg-background min-h-screen">
      <header className="relative isolate overflow-hidden border-b border-border pb-14 pt-36 sm:pt-44">
        <div className="relative container-base max-w-5xl">
          <div className="flex items-center gap-3">
            <Icon name="sword" size={15} className="text-primary" />
            <span className="eyebrow text-primary">PvP practice</span>
          </div>
          <h1 className="display mt-6 text-5xl sm:text-6xl text-foreground">
            Pick a fight.
            <span className="block text-muted-foreground mt-2">There are {PVP_MODE_COUNT} of them.</span>
          </h1>

          <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="prose-lede text-base lg:col-span-6">
              Kits are handed to you. Arenas are instant. Nothing you lose here costs you anything,
              which is the entire point of a practice server.
            </p>
            <div className="grid grid-cols-3 gap-px border border-border bg-border rounded-lg overflow-hidden lg:col-span-5 lg:col-start-8">
              {[
                ["Categories", String(PVP_CATEGORIES.length)],
                ["Duel types", String(PVP_MODE_COUNT)],
                ["Kits", "Provided"],
              ].map(([k, v]) => (
                <div key={k} className="bg-card px-4 py-4">
                  <dt className="hud text-[0.6rem] uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="display-tight mt-2 text-xl text-foreground">{v}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="relative container-base max-w-5xl pb-28 pt-14">
        <ul className="space-y-4">
          {PVP_CATEGORIES.map((cat, i) => (
            <li key={cat.slug}>
              <Link
                href={`/pvp/${cat.slug}`}
                className="group block"
              >
                <Card className="transition-all duration-200 hover:border-primary/50 hover:bg-card/80">
                  <CardContent className="p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                    <div className="flex items-center gap-5 w-full lg:w-1/3 shrink-0">
                      <span
                        className="grid h-14 w-14 shrink-0 place-items-center rounded bg-background border border-border transition-colors group-hover:border-primary/30"
                        style={{ color: cat.accent }}
                      >
                        <Icon name={cat.icon} size={24} />
                      </span>
                      <div className="min-w-0">
                        <span className="hud block text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                          {cat.eyebrow}
                        </span>
                        <span className="display-tight mt-1.5 block text-2xl text-foreground">
                          {cat.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-wrap gap-2">
                      {cat.modes.map((mode) => (
                        <span
                          key={mode.id}
                          className="hud rounded-full border border-border bg-background px-3 py-1 text-[0.65rem] text-muted-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:text-foreground"
                        >
                          {mode.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto lg:justify-end shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border lg:border-none mt-2 lg:mt-0">
                      <span className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        {cat.modes.length} modes
                      </span>
                      <Icon
                        name="arrow"
                        size={16}
                        className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-8">
          <p className="eyebrow text-primary">Difficulty scale</p>
          {([1, 2, 3, 4] as const).map((d) => (
            <span key={d} className="flex items-center gap-3">
              <Meter level={d} />
              <span className="hud text-xs tracking-wider text-muted-foreground">{DIFFICULTY_LABEL[d]}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
