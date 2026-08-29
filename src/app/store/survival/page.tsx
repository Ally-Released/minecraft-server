import type { Metadata } from "next";
import { catalogue, price } from "@/lib/store";
import PageHeader from "@/components/site/PageHeader";
import Reveal from "@/components/ui/Reveal";
import RankComparison from "@/components/store/RankComparison";
import RankExperience from "@/components/store/RankExperience";
import StoreSidebar from "@/components/store/StoreSidebar";

const CAT = catalogue("survival")!;

export const metadata: Metadata = {
  title: "Survival ranks",
  description: `${CAT.blurb} Six tiers from ${price(CAT.ranks[0].price)}, with gear levels, portable stations, flight and extra homes.`,
  alternates: { canonical: "/store/survival" },
};

export default function SurvivalStorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Survival · Ranks & progression"
        title={
          <>
            Survival <span className="lit">ranks</span>
          </>
        }
        lede={CAT.blurb}
        accent={CAT.accent}
        seed={3391}
        aside={
          <dl className="slot p-6">
            {[
              ["Tiers", `${CAT.ranks.length}`],
              ["From", price(CAT.ranks[0].price)],
              ["Top tier", CAT.ranks[CAT.ranks.length - 1].name],
              ["Homes", "2 → 15"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-1.5">
                <dt className="hud text-[0.58rem] uppercase tracking-[0.22em] text-ink-3">{k}</dt>
                <dd className="display-tight text-[1.05rem] text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <div className="mx-auto max-w-[92rem] px-5 pb-28 sm:px-8">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <aside className="lg:col-span-2">
            <StoreSidebar />
          </aside>

          <div className="lg:col-span-10">
            <section id="ranks" className="scroll-mt-28">
              <RankExperience catalogue={CAT} layout="rail" />
            </section>

            <section id="compare" className="mt-24 scroll-mt-28">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-6 border-b border-hair pb-6">
                  <div>
                    <p className="eyebrow">Side by side</p>
                    <h2 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-paper">
                      Every tier, one screen
                    </h2>
                  </div>
                  <p className="prose-lede max-w-sm text-[0.9rem]">
                    Select a column to keep a rank highlighted while you scan the rows.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-10">
                  <RankComparison catalogue={CAT} />
                </div>
              </Reveal>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
