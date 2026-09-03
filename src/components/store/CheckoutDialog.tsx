"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";
import { price } from "@/lib/store";
import { useCart } from "./cart";
import { writeClipboard } from "@/lib/clipboard";
import Icon from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { SERVER_CONFIG } from "@/lib/config";

export default function CheckoutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const cart = useCart();
  const [copied, setCopied] = useState(false);

  const orderItems = cart.items.map((i) => `- ${i.catalogueName}: ${i.rankName}`).join("\n");
  const summary = `Hi, I purchased:\n${orderItems}\nMy username is ${cart.username.trim()}`;

  const copySummary = async () => {
    setCopied(await writeClipboard(summary));
    window.setTimeout(() => setCopied(false), 2600);
  };

  const clearAndFinish = () => {
    cart.clear();
    onOpenChange(false);
    cart.setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-[100] max-h-[92vh] w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-card shadow-2xl transition-[opacity,scale] duration-200 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          
          <header className="relative flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <Dialog.Title className="display-tight text-xl text-foreground">
                Complete your order
              </Dialog.Title>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="slot grid h-8 w-8 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name="plus" size={16} className="rotate-45" />
            </Dialog.Close>
          </header>

          <div className="relative p-6">
            <div className="mb-6 flex flex-col items-center border-b border-border pb-6 text-center">
              <span className="hud text-xs uppercase tracking-widest text-muted-foreground">
                Amount to pay
              </span>
              <span className="display mt-1 text-5xl leading-none text-primary">
                {price(cart.subtotal)}
              </span>
              {cart.items.reduce((sum, item) => item.originalPrice && item.originalPrice > item.price ? sum + (item.originalPrice - item.price) : sum, 0) > 0 && (
                <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-xs font-bold text-red-400 shadow-sm shadow-red-500/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  Discount applied · Saved {price(cart.items.reduce((sum, item) => item.originalPrice && item.originalPrice > item.price ? sum + (item.originalPrice - item.price) : sum, 0))}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-5 overflow-hidden rounded-md border-2 border-border bg-white p-2">
                <img 
                  src="/assets/qr.png" 
                  alt="Payment QR Code" 
                  width={200}
                  height={200}
                  className="block h-[200px] w-[200px] object-cover" 
                />
              </div>
              <p className="max-w-[18rem] text-center text-sm font-medium leading-relaxed text-muted-foreground">
                Scan this QR to pay. It is manually confirmed, not automatic.
              </p>
            </div>

            <div className="mt-7 rounded-lg border border-border bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                After payment, go to the server{" "}
                <a 
                  href={SERVER_CONFIG.discord} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Discord
                </a>
                {" "}AND open a{" "}
                <a 
                  href={SERVER_CONFIG.discord}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  ticket
                </a>.
              </p>

              <Button
                variant="outline"
                onClick={copySummary}
                className="w-full mt-4"
              >
                <Icon name={copied ? "check" : "ticket"} size={16} className="mr-2" />
                {copied ? "Order copied!" : "Copy order template"}
              </Button>
            </div>

            <p className="mt-5 flex items-start gap-2.5 px-1 text-sm leading-relaxed text-muted-foreground">
              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>
                <strong className="font-semibold text-foreground">Final step:</strong> Attach your payment screenshot in the ticket for proof and cross-verification.
              </span>
            </p>

            <div className="mt-7 border-t border-border pt-5">
              <Button
                onClick={clearAndFinish}
                className="w-full"
                size="lg"
              >
                Finish & clear cart
              </Button>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
