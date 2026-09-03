"use client";

import { Dialog } from "@base-ui/react/dialog";
import { RARITY, price, type Catalogue, type Rank } from "@/lib/store";
import { useCart } from "./cart";
import RankEmblem from "./RankEmblem";
import { RarityBadge } from "./Bits";
import Icon from "@/components/ui/Icon";

/**
 * Confirmation before anything enters the cart — an inventory screen, not a
 * browser prompt. Lists exactly what is being bought so nobody discovers the
 * contents after paying.
 */
export default function PurchaseDialog({
  catalogue,
  rank,
  tier,
  open,
  onOpenChange,
}: {
  catalogue: Catalogue;
  rank: Rank;
  tier: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const cart = useCart();
  const r = RARITY[rank.rarity];

  const included = [
    ...rank.stats.map((s) => `${s.label} ${s.value}`),
    ...rank.extras.map((s) => `${s.label} ${s.value}`),
    ...rank.commands.map((c) => c.cmd),
  ];

  const confirm = () => {
    cart.add({
      catalogueId: catalogue.id,
      catalogueName: catalogue.name,
      rankId: rank.id,
      rankName: rank.name,
      price: rank.price,
      originalPrice: rank.originalPrice,
      rarity: rank.rarity,
    });
    onOpenChange(false);
    cart.setOpen(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-90 bg-abyss/80 backdrop-blur-sm transition-opacity duration-250 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-90 max-h-[88vh] w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-hair bg-void transition-[opacity,scale] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          style={{ ["--slot-accent" as string]: r.accent }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{ background: `linear-gradient(180deg, ${r.soft}, transparent)` }}
          />

          <header className="relative flex items-start gap-5 border-b border-hair p-6">
            <span className="slot slot-lit grid h-20 w-20 shrink-0 place-items-center">
              <RankEmblem tier={tier} accent={r.accent} size={64} />
            </span>
            <div className="min-w-0 flex-1">
              <RarityBadge rarity={rank.rarity} />
              <Dialog.Title className="display mt-2.5 text-[2rem] leading-none text-paper">
                {rank.name}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-[0.85rem] text-ink-3">
                {catalogue.name} · {rank.tagline}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center text-ink-3 transition-colors hover:text-glow"
            >
              <Icon name="plus" size={15} className="rotate-45" />
            </Dialog.Close>
          </header>

          <div className="relative p-6">
            <p className="eyebrow">Included</p>
            <ul className="mt-3.5 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
              {included.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[0.85rem] text-ink-2">
                  <Icon
                    name="check"
                    size={13}
                    className="mt-1 shrink-0"
                    style={{ color: r.accent }}
                  />
                  <span className="min-w-0">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-end justify-between border-t border-hair pt-5">
              <div>
                <div className="flex items-center gap-2">
                  <p className="hud text-[0.58rem] uppercase tracking-[0.24em] text-ink-3">Total</p>
                  {rank.saleLabel && (
                    <span className="rounded bg-red-500/20 border border-red-500/40 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-red-400 shadow-sm shadow-red-500/15">
                      {rank.saleLabel}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-baseline gap-2.5">
                  <p className="display text-[2.4rem] leading-none text-paper">{price(rank.price)}</p>
                  {rank.originalPrice && rank.originalPrice > rank.price && (
                    <span className="hud text-sm line-through text-ink-3">
                      {price(rank.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={confirm}
                className="slab"
                style={{ ["--edge-angle" as string]: "120deg" }}
              >
                <span
                  className="slab-face display-tight flex items-center gap-2.5 px-8 py-4 text-[0.9rem] tracking-[0.16em] text-paper transition-[filter] duration-300 hover:brightness-125"
                  style={{
                    ["--slab-fill" as string]: `linear-gradient(150deg, ${r.accent}44 0%, #0a2b53 60%, #061b36 100%)`,
                  }}
                >
                  Continue
                  <Icon name="arrow" size={15} />
                </span>
              </button>
            </div>

            <p className="mt-4 text-[0.74rem] leading-relaxed text-ink-3">
              You will be asked for the Minecraft username that should receive this rank on the next
              step. Nothing is charged here.
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
