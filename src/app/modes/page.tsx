import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { MODES } from "@/lib/modes";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import CopyIp from "@/components/ui/CopyIp";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Game modes",
  description: `Four worlds on ${SERVER_CONFIG.name}: Lifesteal, Survival, Box PvP and PvP Practice. One address, ${SERVER_CONFIG.ip}.`,
  alternates: { canonical: "/modes" },
};

export default function ModesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Choose a world"
        title={
          <>
            Four worlds.
            <span className="block lit">One address.</span>
          </>
        }
        lede="Every world runs off the same connection — join once and pick where you are going from the hub. Nothing here needs a separate install."
        seed={6120}
        aside={<CopyIp />}
      />

      <section className="relative mx-auto max-w-[92rem] px-5 pb-28 sm:px-8">
        <ul className="border-t border-hair">
          {MODES.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.06}>
              <li className="group relative border-b border-hair">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(60% 120% at 12% 50%, color-mix(in srgb, ${m.accent} 20%, transparent), transparent 70%)`,
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  style={{ background: m.accent }}
                />

                <div className="relative grid items-center gap-x-8 gap-y-6 py-9 lg:grid-cols-12 lg:py-11">
                  {/* Emblem */}
                  <div className="flex items-center gap-5 lg:col-span-4">
                    <span className="hud text-[0.62rem] tracking-[0.24em] text-steel">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="slot grid h-16 w-16 shrink-0 place-items-center transition-all duration-500 group-hover:scale-105"
                      style={{ ["--slot-accent" as string]: m.accent, color: m.accent }}
                    >
                      <Icon name={m.icon} size={28} />
                    </span>
                    <span className="min-w-0">
                      <Link
                        href={`/modes/${m.slug}`}
                        className="display block text-[clamp(1.9rem,4.4vw,2.9rem)] leading-none text-paper transition-colors duration-300 group-hover:text-white"
                      >
                        {/* the whole row is clickable through this link's overlay */}
                        <span className="absolute inset-0 z-10" aria-hidden />
                        {m.name}
                      </Link>
                      <span className="hud mt-2 block text-[0.6rem] uppercase tracking-[0.22em] text-ink-3">
                        {m.tagline}
                      </span>
                    </span>
                  </div>

                  {/* Traits */}
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-3 lg:col-span-6">
                    {m.traits.map((t) => (
                      <div key={t.label} className="flex items-center gap-3">
                        <Icon
                          name={t.icon}
                          size={17}
                          className="shrink-0 text-steel transition-colors duration-500 group-hover:text-ice"
                        />
                        <div className="min-w-0">
                          <dt className="hud text-[0.52rem] uppercase tracking-[0.22em] text-ink-3">
                            {t.label}
                          </dt>
                          <dd className="truncate text-[0.84rem] text-ink-2">{t.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  {/* Entry */}
                  <div className="flex items-center gap-4 lg:col-span-2 lg:justify-end">
                    <span className="hud flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-ink-3">
                      {/* No per-world query exists yet, so no number is claimed. */}
                      {m.players === null ? "Live in hub" : `${m.players} playing`}
                    </span>
                    <span className="relative z-20 inline-flex items-center gap-2 border border-hair px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-ink-2 transition-colors duration-300 group-hover:border-steel group-hover:text-paper">
                      Explore
                      <Icon
                        name="arrow"
                        size={13}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="prose-lede mt-10 max-w-2xl text-[0.92rem]">
            Worlds are selected from the in-game hub after you connect. If a world is down for
            maintenance it will say so on the selector — announcements go out in Discord first.
          </p>
        </Reveal>
      </section>
    </>
  );
}
