"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SERVER_CONFIG } from "@/lib/config";
import {
  CHECKOUT,
  RARITY,
  effectiveRank,
  price,
  upgradesFrom,
  type Catalogue,
  type Rank,
} from "@/lib/store";
import Icon from "@/components/ui/Icon";
import { useCart } from "./cart";
import { CommandBadge, RarityBadge, StatRow } from "./Bits";
import PurchaseDialog from "./PurchaseDialog";
import RankEmblem from "./RankEmblem";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Progression rail (Survival): a ladder you climb ─────────── */

function Rail({
  ranks,
  selected,
  onSelect,
}: {
  ranks: Rank[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <ol className="relative" aria-label="Rank progression">
      <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-hair" />
      <span
        aria-hidden
        className="absolute left-[15px] top-6 w-px origin-top bg-gradient-to-b from-glow to-electric transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ height: `calc(${(selected / Math.max(ranks.length - 1, 1)) * 100}% - 1.5rem)` }}
      />

      {ranks.map((rank, i) => {
        const r = RARITY[rank.rarity];
        const on = i === selected;
        const reached = i <= selected;
        return (
          <li key={rank.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={on ? "true" : undefined}
              className="group relative flex w-full items-center gap-4 py-3 pl-0 text-left"
            >
              <span className="relative grid h-8 w-8 shrink-0 place-items-center">
                <span
                  className="absolute inset-0 rotate-45 border transition-colors duration-400"
                  style={{
                    borderColor: reached ? r.accent : "var(--color-hair)",
                    background: "var(--color-abyss)",
                  }}
                />
                <span
                  className="absolute inset-[7px] rotate-45 transition-all duration-400"
                  style={{
                    background: reached ? r.accent : "transparent",
                    boxShadow: on ? `0 0 16px 3px ${r.soft}` : "none",
                  }}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={`display-tight block text-[1.15rem] leading-none transition-colors duration-300 ${
                    on ? "text-paper" : "text-ink-2 group-hover:text-ice"
                  }`}
                >
                  {rank.name}
                </span>
                <span className="hud mt-1 block text-[0.62rem] tracking-[0.16em] text-ink-3">
                  {price(rank.price)}
                </span>
              </span>

              {on && (
                <motion.span
                  layoutId="rail-marker"
                  aria-hidden
                  className="h-8 w-[3px] shrink-0"
                  style={{ background: r.accent }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Tier tower (Box PvP): a ladder you fight up ─────────────── */

function Tower({
  ranks,
  selected,
  onSelect,
}: {
  ranks: Rank[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="scroll-x -mx-5 px-5 py-4 sm:mx-0 sm:px-1">
      <ol
        className="flex min-w-max items-end gap-2 sm:min-w-0 sm:gap-3"
        aria-label="Tier progression"
      >
        {ranks.map((rank, i) => {
          const r = RARITY[rank.rarity];
          const on = i === selected;
          const height = 92 + i * 30;
          return (
            <li key={rank.id} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={on ? "true" : undefined}
                className="group flex w-full min-w-[7.5rem] flex-col items-stretch text-left"
              >
                <span
                  className={`hud mb-2 block text-center text-[0.6rem] tracking-[0.18em] transition-colors duration-300 ${
                    on ? "text-paper" : "text-ink-3"
                  }`}
                >
                  {price(rank.price)}
                </span>
                <span
                  className="slot relative block overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    height,
                    ["--slot-accent" as string]: r.accent,
                    boxShadow: on
                      ? `inset 1.5px 1.5px 0 ${r.accent}, inset -1.5px -1.5px 0 rgba(0,0,0,.55), 0 0 32px -6px ${r.accent}`
                      : undefined,
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 transition-all duration-700"
                    style={{
                      height: `${28 + i * 14}%`,
                      background: `linear-gradient(180deg, transparent, ${r.accent})`,
                      opacity: on ? 0.85 : 0.4,
                    }}
                  />
                  <span
                    className="hud absolute inset-x-0 top-3 text-center text-[0.58rem] tracking-[0.2em]"
                    style={{ color: r.accent }}
                  >
                    T{rank.stats[0]?.value ?? i}
                  </span>
                </span>
                <span
                  className={`display-tight mt-2.5 block text-center text-[0.98rem] leading-none transition-colors duration-300 ${
                    on ? "text-paper" : "text-ink-2 group-hover:text-ice"
                  }`}
                >
                  {rank.name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── Detail ──────────────────────────────────────────────────── */

function Detail({ cat, index }: { cat: Catalogue; index: number }) {
  const rank = effectiveRank(cat, index);
  const previous = index > 0 ? effectiveRank(cat, index - 1) : undefined;
  const upgrades = upgradesFrom(previous, rank);
  const r = RARITY[rank.rarity];

  return (
    <motion.div
      key={rank.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ ["--slot-accent" as string]: r.accent }}
    >
      <div className="flex flex-wrap items-start gap-6">
        <span className="slot slot-lit grid h-28 w-28 shrink-0 place-items-center sm:h-36 sm:w-36">
          <RankEmblem tier={index} accent={r.accent} size={112} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <RarityBadge rarity={rank.rarity} />
            {rank.badge && (
              <span className="hud border border-hair px-2 py-1 text-[0.55rem] uppercase tracking-[0.22em] text-ink-2">
                {rank.badge}
              </span>
            )}
          </div>
          <h3 className="display mt-3 text-[clamp(2.4rem,6vw,3.6rem)] leading-none text-paper">
            {rank.name}
          </h3>
          <p className="prose-lede mt-3 max-w-sm text-[0.98rem]">{rank.tagline}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <section>
          <p className="eyebrow border-b border-hair pb-3">Gear</p>
          <div className="mt-1 divide-y divide-hair/50">
            {rank.stats.map((s) => (
              <StatRow key={s.label} {...s} accent={r.accent} />
            ))}
          </div>
        </section>

        {rank.extras.length > 0 && (
          <section>
            <p className="eyebrow border-b border-hair pb-3">World & extras</p>
            <div className="mt-1 divide-y divide-hair/50">
              {rank.extras.map((s) => (
                <StatRow key={s.label} {...s} accent={r.accent} />
              ))}
            </div>
          </section>
        )}

        <section className="sm:col-span-2">
          <p className="eyebrow border-b border-hair pb-3">Commands</p>
          <div className="mt-1 grid gap-x-10 sm:grid-cols-2">
            {rank.commands.map((c) => (
              <CommandBadge key={c.cmd} {...c} accent={r.accent} />
            ))}
          </div>
        </section>
      </div>

      {upgrades.length > 0 && previous && (
        <section className="mt-10">
          <p className="eyebrow border-b border-hair pb-3">
            Compared to {previous.name}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {upgrades.map((u) => (
              <li
                key={`${u.kind}-${u.label}-${u.to}`}
                className="slot flex items-center gap-3 px-3.5 py-2.5"
              >
                <Icon name={u.icon} size={15} style={{ color: r.accent }} className="shrink-0" />
                <span className="min-w-0 flex-1 truncate text-[0.82rem] text-ink-2">{u.label}</span>
                {u.kind === "changed" ? (
                  <span className="hud shrink-0 text-[0.78rem]">
                    <span className="text-ink-3">{u.from}</span>
                    <span className="px-1.5 text-steel">→</span>
                    <span
                      style={{
                        color: u.direction === "up" ? r.accent : "var(--color-ink)",
                      }}
                    >
                      {u.to}
                    </span>
                  </span>
                ) : (
                  <span className="hud shrink-0 text-[0.78rem]" style={{ color: r.accent }}>
                    + {u.to}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </motion.div>
  );
}

/* ── Purchase panel ──────────────────────────────────────────── */

function Purchase({ cat, index }: { cat: Catalogue; index: number }) {
  const rank = cat.ranks[index];
  const r = RARITY[rank.rarity];
  const cart = useCart();
  const [dialog, setDialog] = useState(false);
  const inCart = cart.items.some((i) => i.key === `${cat.id}:${rank.id}`);

  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    cart.add(
      {
        catalogueId: cat.id,
        catalogueName: cat.name,
        rankId: rank.id,
        rankName: rank.name,
        price: rank.price,
        rarity: rank.rarity,
      },
      e.currentTarget.getBoundingClientRect()
    );
  };

  return (
    <div className="lg:sticky lg:top-28" style={{ ["--slot-accent" as string]: r.accent }}>
      <div className="slot slot-lit p-6">
        <p className="hud text-[0.58rem] uppercase tracking-[0.24em] text-ink-3">
          {cat.name} rank
        </p>
        <p className="display mt-2 text-[3rem] leading-none text-paper">{price(rank.price)}</p>
        <p className="hud mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-ink-3">
          One-time · applied to one account
        </p>

        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={() => setDialog(true)}
            className="slab block w-full"
            style={{ ["--edge-angle" as string]: "120deg" }}
          >
            <span
              className="slab-face display-tight flex items-center justify-center gap-2.5 py-4 text-[0.88rem] tracking-[0.16em] text-paper transition-[filter] duration-300 hover:brightness-125"
              style={{
                ["--slab-fill" as string]: `linear-gradient(150deg, ${r.accent}3d 0%, #0b2c55 58%, #061b36 100%)`,
              }}
            >
              <Icon name="cart" size={16} />
              Buy {rank.name}
            </span>
          </button>

          <button
            type="button"
            onClick={addToCart}
            disabled={inCart}
            className="flex w-full items-center justify-center gap-2.5 border border-hair py-3.5 text-[0.78rem] uppercase tracking-[0.18em] text-ink-2 transition-colors duration-300 hover:border-steel hover:text-ice disabled:cursor-default disabled:text-ink-3/60"
          >
            <Icon name={inCart ? "check" : "plus"} size={14} />
            {inCart ? "In cart" : "Add to cart"}
          </button>
        </div>

        <dl className="mt-6 space-y-2.5 border-t border-hair pt-5">
          {[
            ["Delivery", "In game, to the username you enter"],
            ["Applies to", cat.name],
            ["Support", "Discord"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4">
              <dt className="hud text-[0.58rem] uppercase tracking-[0.22em] text-ink-3">{k}</dt>
              <dd className="text-right text-[0.78rem] text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-[0.74rem] leading-relaxed text-ink-3">
          {CHECKOUT.deliveryNote} Anything unclear, ask staff in{" "}
          <a
            href={SERVER_CONFIG.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ice underline decoration-steel underline-offset-2 hover:text-glow"
          >
            Discord
          </a>{" "}
          before you buy.
        </p>
      </div>

      <PurchaseDialog
        catalogue={cat}
        rank={rank}
        tier={index}
        open={dialog}
        onOpenChange={setDialog}
      />
    </div>
  );
}

/* ── Composition ─────────────────────────────────────────────── */

export default function RankExperience({
  catalogue,
  layout = "rail",
}: {
  catalogue: Catalogue;
  layout?: "rail" | "tower";
}) {
  const [selected, setSelected] = useState(
    Math.max(catalogue.ranks.findIndex((r) => r.badge), 0)
  );

  if (layout === "tower") {
    return (
      <div>
        <Tower ranks={catalogue.ranks} selected={selected} onSelect={setSelected} />
        <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <Detail key={selected} cat={catalogue} index={selected} />
            </AnimatePresence>
          </div>
          <div className="lg:col-span-4">
            <Purchase cat={catalogue} index={selected} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <p className="eyebrow mb-5 border-b border-hair pb-3">The ladder</p>
        <Rail ranks={catalogue.ranks} selected={selected} onSelect={setSelected} />
      </div>
      <div className="lg:col-span-6">
        <AnimatePresence mode="wait">
          <Detail key={selected} cat={catalogue} index={selected} />
        </AnimatePresence>
      </div>
      <div className="lg:col-span-3">
        <Purchase cat={catalogue} index={selected} />
      </div>
    </div>
  );
}
