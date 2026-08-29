import Link from "next/link";
import { SERVER_CONFIG, fill } from "@/lib/config";
import { MODES } from "@/lib/modes";
import { CATALOGUES, RARITY, price } from "@/lib/store";
import { PVP_MODE_COUNT } from "@/lib/pvp";
import Icon, { type IconName } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import CopyIp from "@/components/ui/CopyIp";
import Action from "@/components/ui/Action";

/* ── Worlds ───────────────────────────────────────────────────
   The home page's job is to show that there is more than one place
   to go, not to explain each of them. Detail lives on /modes.      */

export function ModesStrip() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(58% 44% at 20% 0%, rgba(24,74,128,0.3), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-hair pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
                <span className="eyebrow">Where you land</span>
              </div>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] text-paper">
                Four worlds,
                <span className="text-ice/85"> one address.</span>
              </h2>
            </div>
            <Link
              href="/modes"
              className="hud inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-ink-2 transition-colors hover:text-glow"
            >
              All worlds
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.07}>
              <li className="h-full">
                <Link
                  href={`/modes/${m.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden border border-hair p-6 transition-colors duration-500 hover:border-steel"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(70% 60% at 50% 0%, color-mix(in srgb, ${m.accent} 22%, transparent), transparent 70%)`,
                    }}
                  />
                  <span
                    className="slot relative grid h-12 w-12 place-items-center transition-transform duration-500 group-hover:scale-105"
                    style={{ ["--slot-accent" as string]: m.accent, color: m.accent }}
                  >
                    <Icon name={m.icon} size={22} />
                  </span>
                  <h3 className="display relative mt-8 text-[1.7rem] leading-none text-paper">
                    {m.name}
                  </h3>
                  <p className="prose-lede relative mt-2.5 flex-1 text-[0.88rem]">{m.tagline}</p>
                  <span className="hud relative mt-6 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-ink-3 transition-colors duration-300 group-hover:text-ice">
                    Explore
                    <Icon
                      name="arrow"
                      size={12}
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="prose-lede mt-8 max-w-2xl text-[0.9rem]">
            Practice also runs {PVP_MODE_COUNT} duel types and five free-for-all arenas —{" "}
            <Link href="/pvp" className="text-ice underline decoration-steel underline-offset-2 hover:text-glow">
              browse them
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Store ────────────────────────────────────────────────────
   Positioned as part of the world rather than a bolted-on shop.   */

const ARMORY_ICONS: IconName[] = ["chestplate", "sword", "pickaxe", "key", "fly", "home"];

export function StoreCta() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="block-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.2]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(52% 50% at 78% 50%, rgba(45,120,205,0.28), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
              <span className="eyebrow">The armory</span>
            </div>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] text-paper">
              Ranks that change
              <span className="block lit">how you play.</span>
            </h2>
            <p className="prose-lede mt-6 max-w-md text-[1rem]">
              Stronger gear, portable stations, flight and more room to build. Every purchase goes
              back into keeping the worlds online.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Action variant="primary" href="/store">
                Open the store
              </Action>
              <Action variant="ghost" href="/store/survival">
                <span className="text-[0.8rem]">Survival ranks</span>
              </Action>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div className="space-y-3">
              {CATALOGUES.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.slug}
                  className="slot group flex items-center gap-5 p-5 transition-all duration-500 hover:brightness-125"
                  style={{ ["--slot-accent" as string]: cat.accent }}
                >
                  <span className="min-w-0 flex-1">
                    <span className="display-tight block text-[1.4rem] leading-none text-paper">
                      {cat.name}
                    </span>
                    <span className="hud mt-1.5 block text-[0.58rem] uppercase tracking-[0.2em] text-ink-3">
                      {cat.ranks.length} tiers · from {price(Math.min(...cat.ranks.map((r) => r.price)))}
                    </span>
                    <span className="mt-3 flex gap-1">
                      {cat.ranks.map((r) => (
                        <span
                          key={r.id}
                          className="h-1 flex-1"
                          style={{ background: RARITY[r.rarity].accent, opacity: 0.8 }}
                        />
                      ))}
                    </span>
                  </span>
                  <Icon
                    name="arrow"
                    size={16}
                    className="shrink-0 text-steel transition-all duration-500 group-hover:translate-x-1 group-hover:text-glow"
                  />
                </Link>
              ))}

              <div className="grid grid-cols-6 gap-2 pt-1">
                {ARMORY_ICONS.map((icon, i) => (
                  <span
                    key={icon}
                    className="slot grid aspect-square place-items-center text-ink-2"
                    style={{ opacity: 0.5 + (i % 3) * 0.2 }}
                  >
                    <Icon name={icon} size={18} />
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Joining ──────────────────────────────────────────────────
   A condensed version of /how-to-play: enough to act on, not the
   whole tutorial.                                                 */

export function HowToPlayStrip() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
                <span className="eyebrow">Joining the server</span>
              </div>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] text-paper">
                Under a minute
                <span className="text-ice/85"> from here.</span>
              </h2>
            </div>
            <Link
              href="/how-to-play"
              className="hud inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-ink-2 transition-colors hover:text-glow"
            >
              Full walkthrough
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVER_CONFIG.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -top-6 left-0 h-px w-full bg-gradient-to-r from-steel to-transparent"
                />
                <span className="hud text-[0.62rem] tracking-[0.26em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-tight mt-3 text-[1.35rem] text-paper">{step.title}</h3>
                <p className="hud mt-3 text-[0.68rem] tracking-[0.12em] text-ink-3">
                  {fill(step.hint)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-12 max-w-lg">
            <CopyIp />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Rules ────────────────────────────────────────────────────
   Four counts and a link. The codex itself lives on /rules.       */

const RULE_META: { key: keyof typeof SERVER_CONFIG.rules; label: string; icon: IconName }[] = [
  { key: "general", label: "General", icon: "player" },
  { key: "gameplay", label: "Gameplay", icon: "sword" },
  { key: "building", label: "Building", icon: "block" },
  { key: "chat", label: "Chat", icon: "nick" },
];

export function RulesStrip() {
  const total = Object.values(SERVER_CONFIG.rules).reduce((n, list) => n + list.length, 0);

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(50% 44% at 12% 40%, rgba(20,64,111,0.3), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
              <span className="eyebrow">The codex</span>
            </div>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] text-paper">
              {total} rules.
              <span className="block text-ice/85">All of them short.</span>
            </h2>
            <p className="prose-lede mt-6 max-w-sm text-[0.98rem]">
              Read them once and you will never think about them again. Break them and staff will.
            </p>
            <Action variant="ghost" href="/rules" className="mt-8">
              <span className="text-[0.8rem]">Read the rules</span>
            </Action>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-px border border-hair bg-hair sm:grid-cols-2">
              {RULE_META.map((r) => (
                <li key={r.key}>
                  <Link
                    href="/rules"
                    className="group flex items-center gap-4 bg-abyss px-6 py-6 transition-colors duration-400 hover:bg-void"
                  >
                    <Icon name={r.icon} size={18} className="shrink-0 text-steel transition-colors group-hover:text-glow" />
                    <span className="min-w-0 flex-1">
                      <span className="display-tight block text-[1.25rem] text-paper">{r.label}</span>
                      <span className="hud block text-[0.58rem] uppercase tracking-[0.2em] text-ink-3">
                        {SERVER_CONFIG.rules[r.key].length} rules
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
