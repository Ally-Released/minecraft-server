import type { Metadata } from "next";
import { catalogue, price } from "@/lib/store";
import RankComparison from "@/components/store/RankComparison";
import RankExperience from "@/components/store/RankExperience";

const CAT = catalogue("survival")!;

export const metadata: Metadata = {
  title: "Survival ranks",
  description: `${CAT.blurb} Five tiers from ${price(CAT.ranks[0].price)}, with gear kits, player vaults, commands and extra homes.`,
  alternates: { canonical: "/store/survival" },
};

export default function SurvivalStorePage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative isolate overflow-hidden pt-32 pb-12">
        <div className="container-base max-w-5xl">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span aria-hidden className="h-px w-9" style={{ backgroundColor: CAT.accent }} />
            <span className="eyebrow" style={{ color: CAT.accent }}>Survival · Ranks & progression</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-red-400 shadow-sm shadow-red-500/15">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Limited Time Sale · Up to 29% Off
            </span>
          </div>
          <h1 className="display text-5xl md:text-6xl text-foreground">
            Survival ranks
          </h1>
          <p className="prose-lede mt-5 max-w-lg text-base text-muted-foreground">
            {CAT.blurb}
          </p>

          <dl className="mt-10 flex gap-8 border-l border-border pl-6">
            {[
              ["Tiers", `${CAT.ranks.length}`],
              ["From", price(CAT.ranks[0].price)],
              ["Top tier", CAT.ranks[CAT.ranks.length - 1].name],
              ["Homes", "2 → 15"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="hud text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="display-tight mt-2 text-lg text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container-base max-w-5xl pb-28 border-t border-border pt-12">
        <div className="min-w-0">
          <section id="ranks" className="scroll-mt-28">
            <RankExperience catalogue={CAT} layout="grid" />
          </section>

          <section id="compare" className="mt-24 scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
              <div>
                <p className="eyebrow text-primary">Side by side</p>
                <h2 className="display mt-4 text-4xl text-foreground">
                  Every tier, one screen
                </h2>
              </div>
              <p className="prose-lede max-w-sm text-sm text-muted-foreground">
                Select a column to keep a rank highlighted while you scan the rows.
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
