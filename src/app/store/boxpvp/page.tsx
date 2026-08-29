import type { Metadata } from "next";
import { catalogue, price } from "@/lib/store";
import RankComparison from "@/components/store/RankComparison";
import RankExperience from "@/components/store/RankExperience";

const CAT = catalogue("boxpvp")!;

export const metadata: Metadata = {
  title: "Box PvP ranks",
  description: `${CAT.blurb} Five tiers from ${price(CAT.ranks[0].price)}, with tier standing, void keys, vault expansion and combat perks.`,
  alternates: { canonical: "/store/boxpvp" },
};

function ArenaHeader() {
  return (
    <header className="relative isolate overflow-hidden pt-32 pb-12">
      <div className="container-base max-w-5xl">
        <div className="flex items-center gap-3 mb-6">
          <span aria-hidden className="h-px w-9" style={{ backgroundColor: CAT.accent }} />
          <span className="eyebrow" style={{ color: CAT.accent }}>Box PvP · Competitive ranks</span>
        </div>
        <h1 className="display text-5xl md:text-6xl text-foreground">
          Box PvP ranks
        </h1>
        <p className="prose-lede mt-5 max-w-lg text-base text-muted-foreground">
          {CAT.blurb}
        </p>

        <dl className="mt-10 flex flex-wrap gap-8 border-l border-border pl-6">
          {[
            ["Tiers", "13 → 18"],
            ["Ranks", `${CAT.ranks.length}`],
            ["Void keys", "3 → 30"],
            ["From", price(CAT.ranks[0].price)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="hud text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
              <dd className="display-tight mt-2 text-lg text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

export default function BoxPvpStorePage() {
  return (
    <div className="bg-background min-h-screen">
      <ArenaHeader />

      <div className="container-base max-w-5xl pb-28 border-t border-border pt-12">
        <div className="min-w-0">
          <section id="ranks" className="scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-5">
              <p className="eyebrow text-primary">The tier ladder</p>
              <p className="hud text-xs uppercase tracking-widest text-muted-foreground">
                Taller block = higher standing
              </p>
            </div>
            <div className="mt-10">
              <RankExperience catalogue={CAT} layout="grid" />
            </div>
          </section>

          <section id="compare" className="mt-24 scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
              <div>
                <p className="eyebrow text-primary">Loadout comparison</p>
                <h2 className="display mt-4 text-4xl text-foreground">
                  What each tier carries
                </h2>
              </div>
              <p className="prose-lede max-w-sm text-sm text-muted-foreground">
                Scroll sideways on a phone. Select a column to pin it.
              </p>
            </div>
            <div className="mt-10">
              <RankComparison catalogue={CAT} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
