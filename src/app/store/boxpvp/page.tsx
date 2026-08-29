import type { Metadata } from "next";
import { catalogue, price } from "@/lib/store";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import RankComparison from "@/components/store/RankComparison";
import RankExperience from "@/components/store/RankExperience";
import StoreSidebar from "@/components/store/StoreSidebar";

const CAT = catalogue("boxpvp")!;

export const metadata: Metadata = {
  title: "Box PvP ranks",
  description: `${CAT.blurb} Five tiers from ${price(CAT.ranks[0].price)}, with tier standing, void keys, vault expansion and combat perks.`,
  alternates: { canonical: "/store/boxpvp" },
};

/* Box PvP does not reuse the survival header. Survival opens on a horizon;
   this opens on a floor with something standing on it. */
function ArenaHeader() {
  return (
    <header className="relative isolate overflow-hidden border-b border-hair bg-[#01060f] pb-14 pt-36 sm:pt-44">
      <div aria-hidden className="arena-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 50% at 50% 108%, rgba(77,163,255,0.32), transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-electric/10 to-transparent"
      />

      <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <Icon name="pvp" size={15} className="text-electric" />
          <span className="eyebrow">Box PvP · Competitive ranks</span>
        </div>

        <h1 className="display mt-6 text-[clamp(3rem,11vw,8rem)] leading-[0.82] text-paper">
          Box
          <span className="block text-electric">PvP</span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="prose-lede text-[1.15rem] text-ice/90 lg:col-span-5">{CAT.blurb}</p>

          <dl className="grid grid-cols-2 gap-px border border-hair bg-hair sm:grid-cols-4 lg:col-span-7">
            {[
              ["Tiers", "13 → 18"],
              ["Ranks", `${CAT.ranks.length}`],
              ["Void keys", "3 → 30"],
              ["From", price(CAT.ranks[0].price)],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#01060f] px-4 py-4">
                <dt className="hud text-[0.55rem] uppercase tracking-[0.22em] text-ink-3">{k}</dt>
                <dd className="display-tight mt-2 text-[1.35rem] text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
}

export default function BoxPvpStorePage() {
  return (
    <div className="bg-[#01060f]">
      <ArenaHeader />

      <div className="mx-auto max-w-[92rem] px-5 pb-28 pt-16 sm:px-8">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <aside className="lg:col-span-2">
            <StoreSidebar />
          </aside>

          <div className="lg:col-span-10">
            <section id="ranks" className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-hair pb-5">
                <p className="eyebrow">The tier ladder</p>
                <p className="hud text-[0.62rem] uppercase tracking-[0.2em] text-ink-3">
                  Taller block = higher standing
                </p>
              </div>
              <div className="mt-10">
                <RankExperience catalogue={CAT} layout="tower" />
              </div>
            </section>

            <section id="compare" className="mt-24 scroll-mt-28">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-6 border-b border-hair pb-6">
                  <div>
                    <p className="eyebrow">Loadout comparison</p>
                    <h2 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-paper">
                      What each tier carries
                    </h2>
                  </div>
                  <p className="prose-lede max-w-sm text-[0.9rem]">
                    Scroll sideways on a phone. Select a column to pin it.
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
    </div>
  );
}
