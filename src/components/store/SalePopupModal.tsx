"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { useRouter } from "next/navigation";
import { useCart } from "./cart";
import { price } from "@/lib/store";
import Icon from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cn_survival_sale_seen_v1";

export default function SalePopupModal() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        const timer = setTimeout(() => {
          setOpen(true);
        }, 750);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage disabled or private browsing
    }
  }, []);

  const handleDismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // noop
    }
  };

  const handleClaimVip = () => {
    cart.add({
      catalogueId: "survival",
      catalogueName: "Survival",
      rankId: "vip",
      rankName: "VIP",
      price: 80,
      originalPrice: 100,
      rarity: "uncommon",
    });
    handleDismiss();
    cart.setOpen(true);
  };

  const handleExploreStore = () => {
    handleDismiss();
    router.push("/store/survival#ranks");
  };

  return (
    <Dialog.Root open={open} onOpenChange={(val) => { if (!val) handleDismiss(); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[101] max-h-[92vh] w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-red-500/40 bg-[#040816] p-0 shadow-2xl shadow-red-950/60 transition-[opacity,scale] duration-300 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          
          {/* Ambient top red radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, rgba(225, 29, 72, 0.2) 60%, transparent 100%)",
            }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close sale modal"
            className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/40 text-muted-foreground transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-white cursor-pointer"
          >
            <Icon name="plus" size={16} className="rotate-45" />
          </button>

          <div className="relative px-6 pt-7 pb-6 sm:px-8 sm:pt-8 sm:pb-7">
            {/* Header pill */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-red-400 shadow-sm shadow-red-500/20">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Limited Time Store Event
              </span>
              <span className="hud text-xs font-black uppercase tracking-wider text-rose-300">
                Up to 29% Off
              </span>
            </div>

            {/* Headline */}
            <h2 className="display mt-4 text-3xl sm:text-4xl text-foreground font-black tracking-tight leading-none uppercase">
              Season Sale Is Live
            </h2>
            <p className="prose-lede mt-2 text-sm leading-relaxed text-muted-foreground">
              Level up your gameplay before the season fills up. Permanent kits, commands, and vaults at exclusive discounted rates.
            </p>

            {/* Special Spotlight Price Card */}
            <div className="mt-5 rounded-xl border border-red-500/30 bg-gradient-to-b from-red-950/30 to-black/60 p-4 sm:p-5 shadow-inner">
              <div className="flex items-baseline justify-between">
                <span className="hud text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Starter VIP Rank
                </span>
                <span className="rounded bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-red-400">
                  20% OFF
                </span>
              </div>

              <div className="mt-2.5 flex items-baseline gap-3">
                <span className="hud text-xl sm:text-2xl line-through text-muted-foreground/60 font-normal">
                  {price(100)}
                </span>
                <span className="display text-4xl sm:text-5xl font-black text-red-400 tracking-tight leading-none">
                  {price(80)}
                </span>
                <span className="hud text-xs uppercase tracking-wider text-muted-foreground">
                  only
                </span>
              </div>

              <p className="mt-1.5 text-xs text-muted-foreground">
                One-time purchase · Instant in-game delivery · Lifetime access
              </p>

              {/* Quick Perks list */}
              <ul className="mt-3.5 space-y-1.5 border-t border-red-500/20 pt-3 text-xs text-ink-2">
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✓</span>
                  <span>Full Enchanted Diamond Gear & Tools Kit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✓</span>
                  <span>Portable <code>/craft</code> & <code>/hat</code> + 2 Private SetHomes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✓</span>
                  <span>Exclusive <strong>VIP Prefix</strong> in Chat & Tab</span>
                </li>
              </ul>
            </div>

            {/* Other ranks note */}
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border/80 bg-background/50 px-3.5 py-2.5 text-xs text-muted-foreground">
              <span>Higher ranks (Elite, Premium, Galaxy, Royal)</span>
              <span className="font-bold text-red-400">Also Discounted</span>
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-2.5">
              <Button
                onClick={handleClaimVip}
                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-6 text-sm tracking-wider uppercase shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <Icon name="cart" size={16} className="mr-2" />
                Claim VIP for {price(80)} Now
              </Button>

              <Button
                variant="outline"
                onClick={handleExploreStore}
                className="w-full border-border hover:border-red-500/40 hover:bg-red-500/5 text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest font-semibold py-5 cursor-pointer"
              >
                Browse All Deals (Up to 29% Off)
              </Button>
            </div>

            <p className="mt-4 text-center text-[0.7rem] text-muted-foreground/70">
              <button
                type="button"
                onClick={handleDismiss}
                className="underline hover:text-muted-foreground transition-colors cursor-pointer"
              >
                No thanks, continue to website
              </button>
            </p>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
