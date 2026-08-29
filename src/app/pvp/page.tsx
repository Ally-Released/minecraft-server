import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { PVP_CATEGORIES, PVP_MODE_COUNT, DIFFICULTY_LABEL } from "@/lib/pvp";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { Meter } from "@/components/store/Bits";

export const metadata: Metadata = {
  title: "PvP practice",
  description: `${PVP_MODE_COUNT} duel types across ${PVP_CATEGORIES.length} categories on ${SERVER_CONFIG.name} — sword, axe, crystal, ranged, mace, objective and fun modes.`,
  alternates: { canonical: "/pvp" },
};

export default function PvpHubPage() {
  return (
    <div className="relative">
      <header className="relative isolate overflow-hidden border-b border-hair bg-[#01060f] pb-14 pt-36 sm:pt-44">
        <div aria-hidden className="arena-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(50% 60% at 78% 100%, rgba(85,214,255,0.26), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Icon name="sword" size={15} className="text-glow" />
            <span className="eyebrow">PvP practice</span>
          </div>
          <h1 className="display mt-6 text-[clamp(2.8rem,8vw,6.4rem)] leading-[0.84] text-paper">
            Pick a fight.
            <span className="block text-ice/85">There are {PVP_MODE_COUNT} of them.</span>
          </h1>

          <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="prose-lede text-[1.05rem] lg:col-span-5">
              Kits are handed to you. Arenas are instant. Nothing you lose here costs you anything,
              which is the entire point of a practice server.
            </p>
            <dl className="grid grid-cols-3 gap-px border border-hair bg-hair lg:col-span-5 lg:col-start-8">
              {[
                ["Categories", String(PVP_CATEGORIES.length)],
                ["Duel types", String(PVP_MODE_COUNT)],
                ["Kits", "Provided"],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#01060f] px-4 py-4">
                  <dt className="hud text-[0.52rem] uppercase tracking-[0.22em] text-ink-3">{k}</dt>
                  <dd className="display-tight mt-2 text-[1.3rem] text-paper">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-[92rem] px-5 pb-28 pt-14 sm:px-8">
        <ul className="space-y-3">
          {PVP_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.05}>
              <li>
                <Link
                  href={`/pvp/${cat.slug}`}
                  className="group relative block overflow-hidden border border-hair transition-colors duration-500 hover:border-steel"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(50% 130% at 8% 50%, color-mix(in srgb, ${cat.accent} 22%, transparent), transparent 70%)`,
                    }}
                  />

                  <span className="relative grid items-center gap-x-8 gap-y-5 p-6 lg:grid-cols-12 lg:p-7">
                    <span className="flex items-center gap-4 lg:col-span-4">
                      <span
                        className="slot grid h-14 w-14 shrink-0 place-items-center transition-transform duration-500 group-hover:scale-105"
                        style={{ ["--slot-accent" as string]: cat.accent, color: cat.accent }}
                      >
                        <Icon name={cat.icon} size={24} />
                      </span>
                      <span className="min-w-0">
                        <span className="hud block text-[0.52rem] uppercase tracking-[0.26em] text-ink-3">
                          {cat.eyebrow}
                        </span>
                        <span className="display mt-1.5 block text-[1.8rem] leading-none text-paper">
                          {cat.name}
                        </span>
                      </span>
                    </span>

                    <span className="lg:col-span-6">
                      <span className="flex flex-wrap gap-1.5">
                        {cat.modes.map((mode) => (
                          <span
                            key={mode.id}
                            className="hud border border-hair px-2.5 py-1 text-[0.66rem] text-ink-2 transition-colors duration-500 group-hover:border-steel/70 group-hover:text-ice"
                          >
                            {mode.name}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="flex items-center gap-4 lg:col-span-2 lg:justify-end">
                      <span className="hud text-[0.58rem] uppercase tracking-[0.2em] text-ink-3">
                        {cat.modes.length} modes
                      </span>
                      <Icon
                        name="arrow"
                        size={16}
                        className="shrink-0 text-steel transition-all duration-500 group-hover:translate-x-1 group-hover:text-glow"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-hair pt-8">
            <p className="eyebrow">Difficulty scale</p>
            {([1, 2, 3, 4] as const).map((d) => (
              <span key={d} className="flex items-center gap-3">
                <Meter level={d} />
                <span className="hud text-[0.66rem] text-ink-2">{DIFFICULTY_LABEL[d]}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
