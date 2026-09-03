"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";
import { RARITY, price } from "@/lib/store";
import { useCart } from "./cart";
import Icon from "@/components/ui/Icon";
import CheckoutDialog from "./CheckoutDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartDrawer() {
  const cart = useCart();
  const nameOk = /^[A-Za-z0-9_]{3,16}$/.test(cart.username.trim());
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
    <Dialog.Root open={cart.open} onOpenChange={cart.setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-90 bg-background/80 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-90 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <header className="relative flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <Dialog.Title className="display-tight text-xl text-foreground">Your cart</Dialog.Title>
              <Dialog.Description className="hud mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {cart.count === 0 ? "Empty" : `${cart.count} item${cart.count === 1 ? "" : "s"}`}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close cart"
              className="slot grid h-9 w-9 place-items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="plus" size={16} className="rotate-45" />
            </Dialog.Close>
          </header>

          <div className="relative flex-1 overflow-y-auto px-6 py-5">
            {cart.count === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="slot grid h-16 w-16 place-items-center text-muted-foreground/30">
                  <Icon name="chest" size={32} />
                </span>
                <p className="prose-lede mt-5 max-w-[16rem] text-sm text-muted-foreground">
                  Nothing here yet. Ranks you add from the store will show up in this slot.
                </p>
                <Button asChild variant="outline" className="mt-6" onClick={() => cart.setOpen(false)}>
                  <Link href="/store">Open the store</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {cart.items.map((item) => {
                  const r = RARITY[item.rarity];
                  return (
                    <li
                      key={item.key}
                      className="slot flex items-center gap-4 p-4 border border-border rounded-lg bg-background"
                      style={{ ["--slot-accent" as string]: r.accent }}
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-md"
                        style={{ background: r.soft, color: r.accent }}
                      >
                        <Icon name="block" size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="display-tight block text-base text-foreground">
                          {item.rankName}
                        </span>
                        <span className="hud block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                          {item.catalogueName}
                        </span>
                      </span>
                      <div className="shrink-0 text-right">
                        <span className="hud block text-sm font-semibold text-foreground">{price(item.price)}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="hud block text-[0.65rem] line-through text-muted-foreground/60">
                            {price(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.key)}
                        aria-label={`Remove ${item.rankName}`}
                        className="grid h-8 w-8 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Icon name="plus" size={16} className="rotate-45" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {cart.count > 0 && (
              <div className="mt-8">
                <label htmlFor="mc-username" className="eyebrow text-primary block">
                  Minecraft username
                </label>
                <input
                  id="mc-username"
                  value={cart.username}
                  onChange={(e) => cart.setUsername(e.target.value)}
                  placeholder="Steve"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="mc-username-help"
                  className="mt-2 w-full border border-border rounded-md bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                />
                <p id="mc-username-help" className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Make sure this is the account that should receive the purchase. Ranks are applied
                  to this name exactly as written.
                  {cart.username.trim() && !nameOk && (
                    <span className="mt-2 block text-destructive font-medium">
                      Minecraft names are 3–16 characters, letters, numbers and underscores.
                    </span>
                  )}
                </p>

                <ol className="mt-8 space-y-3 border-t border-border pt-6">
                  {[
                    "Name the account the rank should go to",
                    "Send the order to staff in Discord",
                    "Staff confirm payment and apply the rank in game",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="hud shrink-0 text-[0.65rem] tracking-widest text-muted-foreground font-semibold pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-snug text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {cart.count > 0 && (
            <footer className="relative border-t border-border px-6 py-5 bg-card">
              {cart.items.reduce((sum, item) => item.originalPrice && item.originalPrice > item.price ? sum + (item.originalPrice - item.price) : sum, 0) > 0 && (
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="hud uppercase tracking-widest text-emerald-400 font-semibold">Total savings</span>
                  <span className="font-semibold text-emerald-400">
                    -{price(cart.items.reduce((sum, item) => item.originalPrice && item.originalPrice > item.price ? sum + (item.originalPrice - item.price) : sum, 0))}
                  </span>
                </div>
              )}
              <div className="flex items-baseline justify-between mb-4">
                <span className="hud text-xs uppercase tracking-widest text-muted-foreground">
                  Subtotal
                </span>
                <span className="display-tight text-3xl text-foreground">{price(cart.subtotal)}</span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setCheckoutOpen(true)}
                  disabled={!nameOk}
                  size="lg"
                  className="w-full text-sm tracking-widest uppercase font-bold"
                >
                  <Icon name="cart" size={16} className="mr-2" />
                  Purchase
                </Button>
                {!nameOk && (
                  <p className="hud text-center text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    Enter a username to proceed
                  </p>
                )}
              </div>
            </footer>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
    <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}
