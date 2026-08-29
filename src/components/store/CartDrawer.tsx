"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";
import { SERVER_CONFIG } from "@/lib/config";
import { writeClipboard } from "@/lib/clipboard";
import { CHECKOUT, RARITY, price } from "@/lib/store";
import { useCart } from "./cart";
import Icon from "@/components/ui/Icon";
import Action from "@/components/ui/Action";

/**
 * The cart, shaped like an inventory rather than a checkout page.
 *
 * No payment provider is configured yet (see CHECKOUT in lib/store), so instead
 * of pretending to take money it produces a copyable order summary and hands
 * the player to staff in Discord — the one fulfilment route known to exist.
 */
export default function CartDrawer() {
  const cart = useCart();
  const [copied, setCopied] = useState(false);
  const nameOk = /^[A-Za-z0-9_]{3,16}$/.test(cart.username.trim());

  const summary = [
    `Order for ${cart.username.trim() || "<minecraft username>"}`,
    ...cart.items.map((i) => `- ${i.catalogueName}: ${i.rankName} (${price(i.price)})`),
    `Total: ${price(cart.subtotal)}`,
  ].join("\n");

  const copySummary = async () => {
    setCopied(await writeClipboard(summary));
    window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <Dialog.Root open={cart.open} onOpenChange={cart.setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-90 bg-abyss/75 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-90 flex w-full max-w-md flex-col border-l border-hair bg-void shadow-[-30px_0_80px_-30px_rgba(0,0,0,0.9)] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(80% 40% at 100% 0%, rgba(45,120,205,0.28), transparent 70%)",
            }}
          />

          <header className="relative flex items-center justify-between border-b border-hair px-6 py-5">
            <div>
              <Dialog.Title className="display-tight text-[1.3rem] text-paper">Your cart</Dialog.Title>
              <Dialog.Description className="hud mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-ink-3">
                {cart.count === 0 ? "Empty" : `${cart.count} item${cart.count === 1 ? "" : "s"}`}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close cart"
              className="slot grid h-9 w-9 place-items-center text-ink-2 transition-colors hover:text-glow"
            >
              <Icon name="plus" size={16} className="rotate-45" />
            </Dialog.Close>
          </header>

          <div className="relative flex-1 overflow-y-auto px-6 py-5">
            {cart.count === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="slot grid h-16 w-16 place-items-center text-steel">
                  <Icon name="chest" size={28} />
                </span>
                <p className="prose-lede mt-5 max-w-[16rem] text-[0.9rem]">
                  Nothing here yet. Ranks you add from the store will show up in this slot.
                </p>
                <Action variant="ghost" href="/store" className="mt-6" onClick={() => cart.setOpen(false)}>
                  <span className="text-[0.78rem]">Open the store</span>
                </Action>
              </div>
            ) : (
              <ul className="space-y-3">
                {cart.items.map((item) => {
                  const r = RARITY[item.rarity];
                  return (
                    <li
                      key={item.key}
                      className="slot flex items-center gap-4 p-4"
                      style={{ ["--slot-accent" as string]: r.accent }}
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center"
                        style={{ background: r.soft, color: r.accent }}
                      >
                        <Icon name="block" size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="display-tight block text-[1.05rem] text-paper">
                          {item.rankName}
                        </span>
                        <span className="hud block text-[0.58rem] uppercase tracking-[0.22em] text-ink-3">
                          {item.catalogueName}
                        </span>
                      </span>
                      <span className="hud shrink-0 text-[0.95rem] text-ice">{price(item.price)}</span>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.key)}
                        aria-label={`Remove ${item.rankName}`}
                        className="grid h-8 w-8 shrink-0 place-items-center text-ink-3 transition-colors hover:text-electric"
                      >
                        <Icon name="plus" size={14} className="rotate-45" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {cart.count > 0 && (
              <div className="mt-7">
                <label htmlFor="mc-username" className="eyebrow block">
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
                  className="hud mt-2 w-full border border-hair bg-abyss/80 px-4 py-3 text-[0.95rem] text-paper outline-none transition-colors placeholder:text-ink-3/60 focus:border-electric"
                />
                <p id="mc-username-help" className="mt-2 text-[0.76rem] leading-relaxed text-ink-3">
                  Make sure this is the account that should receive the purchase. Ranks are applied
                  to this name exactly as written.
                  {cart.username.trim() && !nameOk && (
                    <span className="mt-1 block text-electric">
                      Minecraft names are 3–16 characters, letters, numbers and underscores.
                    </span>
                  )}
                </p>

                <ol className="mt-8 space-y-px border-t border-hair pt-6">
                  {[
                    "Name the account the rank should go to",
                    "Send the order to staff in Discord",
                    "Staff confirm payment and apply the rank in game",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3.5 py-2.5">
                      <span className="hud shrink-0 pt-0.5 text-[0.6rem] tracking-[0.18em] text-steel">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.82rem] leading-snug text-ink-2">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {cart.count > 0 && (
            <footer className="relative border-t border-hair px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="hud text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">
                  Subtotal
                </span>
                <span className="display-tight text-[1.7rem] text-paper">{price(cart.subtotal)}</span>
              </div>

              {CHECKOUT.url ? (
                <Action
                  variant="primary"
                  href={CHECKOUT.url}
                  external
                  className="mt-4 w-full"
                  ariaLabel="Continue to checkout"
                >
                  Checkout
                </Action>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-[0.78rem] leading-relaxed text-ink-3">
                    Online checkout is not connected yet. Copy your order and send it to staff in
                    Discord — they will confirm the payment method and apply the rank.
                  </p>
                  <button
                    type="button"
                    onClick={copySummary}
                    disabled={!nameOk}
                    className="slot flex w-full items-center justify-center gap-2.5 py-3 text-[0.78rem] uppercase tracking-[0.18em] text-ice transition-colors hover:text-glow disabled:cursor-not-allowed disabled:text-ink-3/60"
                  >
                    <Icon name={copied ? "check" : "cart"} size={15} />
                    {copied ? "Order copied" : "Copy order summary"}
                  </button>
                  {!nameOk && (
                    <p className="hud text-center text-[0.6rem] uppercase tracking-[0.16em] text-ink-3">
                      Enter a username to copy the order
                    </p>
                  )}
                  <Action
                    variant="discord"
                    href={SERVER_CONFIG.discord}
                    external
                    className="w-full"
                    onClick={() => cart.setOpen(false)}
                  >
                    Send it in Discord
                  </Action>
                </div>
              )}

              <p className="hud mt-4 text-center text-[0.58rem] uppercase tracking-[0.2em] text-ink-3">
                {CHECKOUT.deliveryNote}
              </p>
            </footer>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
