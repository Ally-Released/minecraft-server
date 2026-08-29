import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { CATALOGUES, CHECKOUT, RARITY, price } from "@/lib/store";
import Icon, { type IconName } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Store",
  description: `Ranks and perks for ${SERVER_CONFIG.name}. Survival and Box PvP progression, delivered in game to your Minecraft account.`,
  alternates: { canonical: "/store" },
};

/** The item wall behind each category — an inventory page, not a product shot. */
const LOADOUT: Record<string, IconName[]> = {
  survival: ["chestplate", "pickaxe", "sword", "home", "enderchest", "anvil", "crafting", "fly"],
  boxpvp: ["sword", "crystal", "void", "arena", "key", "tier", "coin", "speed"],
};

function CategoryPanel({ id }: { id: string }) {
  const cat = CATALOGUES.find((c) => c.id === id)!;
  const cheapest = Math.min(...cat.ranks.map((r) => r.price));
  const icons = LOADOUT[cat.id] ?? [];

  return (
    <Link
      href={cat.slug}
      className="group relative block overflow-hidden border border-hair transition-colors duration-500 hover:border-steel"
      style={{ ["--slot-accent" as string]: cat.accent }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(85% 70% at 82% 8%, color-mix(in srgb, ${cat.accent} 24%, transparent), transparent 68%)`,
        }}
      />
      <span aria-hidden className="block-grid pointer-events-none absolute inset-0 opacity-[0.16]" />

      <span className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <span className="block">
          <span className="hud block text-[0.6rem] uppercase tracking-[0.3em] text-ink-3">
            {cat.eyebrow}
          </span>
          <span
            className="display mt-4 block text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.85] text-paper"
            style={{ textShadow: `0 0 60px color-mix(in srgb, ${cat.accent} 40%, transparent)` }}
          >
            {cat.name}
          </span>
          <span className="prose-lede mt-5 block max-w-sm text-[0.98rem]">{cat.blurb}</span>

          <span className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="block">
              <span className="hud block text-[0.55rem] uppercase tracking-[0.24em] text-ink-3">
                Tiers
              </span>
              <span className="display-tight mt-1 block text-[1.4rem] text-paper">
                {cat.ranks.length}
              </span>
            </span>
            <span className="block">
              <span className="hud block text-[0.55rem] uppercase tracking-[0.24em] text-ink-3">
                From
              </span>
              <span className="display-tight mt-1 block text-[1.4rem]" style={{ color: cat.accent }}>
                {price(cheapest)}
              </span>
            </span>
            <span className="ml-auto inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.24em] text-ink-2 transition-colors duration-300 group-hover:text-paper">
              Enter
              <Icon
                name="arrow"
                size={15}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </span>
          </span>
        </span>

        {/* The loadout wall */}
        <span className="grid grid-cols-4 gap-2">
          {icons.map((icon, i) => (
            <span
              key={icon}
              className="slot grid aspect-square place-items-center transition-all duration-500"
              style={{
                color: i === 0 ? cat.accent : "var(--color-ice)",
                opacity: i === 0 ? 1 : 0.62 + (i % 3) * 0.16,
              }}
            >
              <Icon name={icon} size={i === 0 ? 38 : 30} />
            </span>
          ))}
          {/* rarity ladder strip under the wall */}
          <span className="col-span-4 mt-1 flex gap-1">
            {cat.ranks.map((r) => (
              <span
                key={r.id}
                className="h-1.5 flex-1"
                style={{ background: RARITY[r.rarity].accent, opacity: 0.75 }}
              />
            ))}
          </span>
        </span>
      </span>
    </Link>
  );
}

const TRUST = [
  {
    icon: "server" as IconName,
    title: "It goes back into the server",
    body: "Purchases pay for the hardware, plugins and the people keeping the worlds online.",
  },
  {
    icon: "player" as IconName,
    title: "Delivered to your account",
    body: "You name the Minecraft account at checkout and the rank is applied to that name.",
  },
  {
    icon: "discord" as IconName,
    title: "Staff answer in Discord",
    body: "Anything unclear before or after an order — ask before you buy, not after.",
  },
];

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Official server store"
        title={
          <>
            The <span className="lit">Armory</span>
          </>
        }
        lede="Upgrade your experience, unlock new abilities, and support the world you play in. Two catalogues, no loot boxes, no subscriptions."
        seed={7731}
        aside={
          <dl className="slot p-6">
            {[
              ["Catalogues", String(CATALOGUES.length)],
              ["Total tiers", String(CATALOGUES.reduce((n, c) => n + c.ranks.length, 0))],
              ["Currency", "Indian Rupee (₹)"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-1.5">
                <dt className="hud text-[0.58rem] uppercase tracking-[0.22em] text-ink-3">{k}</dt>
                <dd className="display-tight text-[1.05rem] text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="relative mx-auto max-w-[92rem] px-5 pb-24 sm:px-8">
        <div className="space-y-4">
          {CATALOGUES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.08}>
              <CategoryPanel id={cat.id} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 grid gap-x-10 gap-y-10 border-t border-hair pt-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Before you buy</p>
              <h2 className="display-tight mt-4 text-[1.9rem] text-paper">
                How a purchase actually works
              </h2>
            </div>
            <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {TRUST.map((t) => (
                <li key={t.title}>
                  <span className="slot grid h-10 w-10 place-items-center text-ice">
                    <Icon name={t.icon} size={18} />
                  </span>
                  <h3 className="display-tight mt-4 text-[1.05rem] text-paper">{t.title}</h3>
                  <p className="prose-lede mt-2 text-[0.86rem]">{t.body}</p>
                </li>
              ))}
            </ul>
            {CHECKOUT.refundPolicy && (
              <p className="prose-lede text-[0.86rem] lg:col-span-8 lg:col-start-5">
                {CHECKOUT.refundPolicy}
              </p>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
