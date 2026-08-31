"use client";

import { useState } from "react";

import {
  CHECKOUT,
  RARITY,
  price,
  upgradesFrom,
  type Catalogue,
  type Rank,
} from "@/lib/store";
import { useCart } from "./cart";
import { CommandBadge, RarityBadge, StatRow } from "./Bits";
import PurchaseDialog from "./PurchaseDialog";
import { Button } from "@/components/ui/button";
import MinecraftInventory from "./MinecraftInventory";

function effectiveRank(cat: Catalogue, index: number) {
  // Simple helper if we need cascading ranks, but for now we'll just return the rank
  return cat.ranks[index];
}

function RankSelector({
  ranks,
  selected,
  onSelect,
  layout,
}: {
  ranks: Rank[];
  selected: number;
  onSelect: (i: number) => void;
  layout: "grid" | "tower";
}) {
  return (
    <div className={layout === "grid" ? "flex gap-2 overflow-x-auto pb-4 scrollbar-hide" : "flex flex-col gap-2"}>
      {ranks.map((rank, i) => {
        const r = RARITY[rank.rarity];
        const on = i === selected;
        return (
          <button
            key={rank.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={on ? "true" : undefined}
            className={`flex items-center gap-4 border px-4 py-3 text-left transition-colors rounded-md ${
              layout === "grid" ? "min-w-[10rem] flex-col text-center" : "w-full"
            } ${
              on ? "bg-card border-border shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50"
            }`}
            style={{
              borderColor: on ? `color-mix(in srgb, ${r.accent} 40%, transparent)` : undefined,
            }}
          >
            <div className="flex-1 min-w-0">
              <span className={`display-tight block text-lg transition-colors ${on ? "text-foreground" : "text-muted-foreground"}`}>
                {rank.name}
              </span>
              <span className="hud mt-1 block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                {price(rank.price)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Detail({ cat, index }: { cat: Catalogue; index: number }) {
  const rank = effectiveRank(cat, index);
  const previous = index > 0 ? effectiveRank(cat, index - 1) : undefined;
  const upgrades = upgradesFrom(previous, rank);
  const r = RARITY[rank.rarity];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        <div className="flex-1 min-w-0">
          {rank.badge && (
            <div className="mb-4">
              <span className="hud border border-primary/40 bg-primary/10 px-2.5 py-1 rounded text-[0.65rem] uppercase tracking-widest text-primary font-semibold">
                {rank.badge}
              </span>
            </div>
          )}
          <h3 className="display text-4xl sm:text-5xl text-foreground">
            {rank.name}
          </h3>
          <p className="prose-lede mt-3 max-w-lg text-base text-muted-foreground">
            {rank.tagline}
          </p>
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <section>
          <p className="eyebrow border-b border-border pb-3 text-primary">Key Highlights</p>
          <div className="mt-4 space-y-3">
            {rank.stats.map((s) => (
              <StatRow key={s.label} {...s} accent={r.accent} />
            ))}
          </div>
        </section>

        {rank.extras.length > 0 && (
          <section>
            <p className="eyebrow border-b border-border pb-3 text-primary">Economy & Limits</p>
            <div className="mt-4 space-y-3">
              {rank.extras.map((s) => (
                <StatRow key={s.label} {...s} accent={r.accent} />
              ))}
            </div>
          </section>
        )}

        {/* Minecraft Kit Inventory GUI Preview */}
        {cat.id === "survival" && (
          <section className="sm:col-span-2 pt-2 border-t border-border/60">
            <MinecraftInventory
              rankId={rank.id}
              title={`${rank.name} Kit Gear & Items`}
            />
          </section>
        )}

        <section className="sm:col-span-2">
          <p className="eyebrow border-b border-border pb-3 text-primary">Included Commands</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {rank.commands.map((c) => (
              <CommandBadge key={c.cmd} {...c} accent={r.accent} />
            ))}
          </div>
        </section>
      </div>

      {upgrades.length > 0 && previous && (
        <section className="mt-12 border-t border-border pt-8">
          <p className="eyebrow mb-6 text-foreground">Compared to {previous.name}</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {upgrades.map((u) => (
              <li key={`${u.kind}-${u.label}-${u.to}`} className="flex items-center gap-3">
                <span className="text-primary font-bold text-xs">■</span>
                <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{u.label}</span>
                {u.kind === "changed" ? (
                  <span className="hud shrink-0 text-xs">
                    <span className="text-muted-foreground/60">{u.from}</span>
                    <span className="px-1.5 text-border">→</span>
                    <span style={{ color: u.direction === "up" ? r.accent : "currentColor" }}>
                      {u.to}
                    </span>
                  </span>
                ) : (
                  <span className="hud shrink-0 text-xs font-semibold" style={{ color: r.accent }}>
                    + {u.to}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Purchase({ cat, index }: { cat: Catalogue; index: number }) {
  const rank = cat.ranks[index];
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
    <div className="lg:sticky lg:top-28 border border-border rounded-lg bg-card p-6 sm:p-8">
      <p className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        {cat.name} rank
      </p>
      <p className="display mt-2 text-4xl text-foreground">{price(rank.price)}</p>
      <p className="hud mt-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        One-time payment
      </p>

      <div className="mt-8 space-y-3">
        <Button
          onClick={() => setDialog(true)}
          className="w-full"
        >
          Buy {rank.name}
        </Button>

        <Button
          variant="outline"
          onClick={addToCart}
          disabled={inCart}
          className="w-full"
        >
          {inCart ? "In cart" : "Add to cart"}
        </Button>
      </div>

      <dl className="mt-8 space-y-4 border-t border-border pt-6">
        {[
          ["Delivery", "In game, instantly"],
          ["Applies to", cat.name],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4">
            <dt className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">{k}</dt>
            <dd className="text-right text-sm text-foreground">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
        {CHECKOUT.deliveryNote}
      </p>

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

export default function RankExperience({
  catalogue,
  layout = "grid",
}: {
  catalogue: Catalogue;
  layout?: "grid" | "tower";
}) {
  const [selected, setSelected] = useState(
    Math.max(catalogue.ranks.findIndex((r) => r.badge), 0)
  );

  if (layout === "grid") {
    return (
      <div>
        <RankSelector ranks={catalogue.ranks} selected={selected} onSelect={setSelected} layout="grid" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <Detail key={selected} cat={catalogue} index={selected} />
          </div>
          <div className="min-w-0 lg:col-span-4">
            <Purchase cat={catalogue} index={selected} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-3">
        <p className="eyebrow mb-4">The ladder</p>
        <RankSelector ranks={catalogue.ranks} selected={selected} onSelect={setSelected} layout="tower" />
      </div>
      <div className="min-w-0 lg:col-span-6">
        <Detail key={selected} cat={catalogue} index={selected} />
      </div>
      <div className="min-w-0 lg:col-span-3">
        <Purchase cat={catalogue} index={selected} />
      </div>
    </div>
  );
}
