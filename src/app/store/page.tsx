import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { CATALOGUES, CHECKOUT, price } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Store",
  description: `Ranks and perks for ${SERVER_CONFIG.name}. Survival and Box PvP progression, delivered in game to your Minecraft account.`,
  alternates: { canonical: "/store" },
};

function CategoryPanel({ id }: { id: string }) {
  const cat = CATALOGUES.find((c) => c.id === id)!;
  const cheapest = Math.min(...cat.ranks.map((r) => r.price));
  const hasSale = cat.ranks.some((r) => r.originalPrice && r.originalPrice > r.price);

  return (
    <Link href={cat.slug} className="group block">
      <Card className="transition-all duration-200 hover:border-primary/50 hover:bg-card/80">
        <CardContent className="p-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="hud block text-xs uppercase tracking-widest text-primary font-bold">
                {cat.eyebrow}
              </span>
              {hasSale && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-emerald-400">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                  Sale Active
                </span>
              )}
            </div>
            <span className="display mt-3 block text-4xl sm:text-5xl text-foreground">
              {cat.name}
            </span>
            <span className="prose-lede mt-4 block max-w-lg text-base text-muted-foreground">
              {cat.blurb}
            </span>
          </div>

          <div className="flex flex-wrap gap-8 items-end shrink-0">
            <div>
              <span className="hud block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Tiers
              </span>
              <span className="display-tight mt-1 block text-2xl text-foreground">
                {cat.ranks.length}
              </span>
            </div>
            <div>
              <span className="hud block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                From
              </span>
              <span className="display-tight mt-1 block text-2xl text-primary">
                {price(cheapest)}
              </span>
            </div>
            <span className="ml-4 flex items-center text-xs font-bold uppercase tracking-widest text-primary transition-transform duration-200 group-hover:translate-x-1">
              Enter <Icon name="arrow" size={14} className="ml-2" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

const TRUST = [
  {
    title: "It goes back into the server",
    body: "Purchases pay for the hardware, plugins and the people keeping the worlds online.",
  },
  {
    title: "Delivered to your account",
    body: "You name the Minecraft account at checkout and the rank is applied to that name.",
  },
  {
    title: "Staff answer in Discord",
    body: "Anything unclear before or after an order — ask before you buy, not after.",
  },
];

export default function StorePage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative isolate overflow-hidden pt-32 pb-12">
        <div className="container-base max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-9 bg-primary/50" />
            <span className="eyebrow text-primary">Official server store</span>
          </div>
          <h1 className="display text-5xl md:text-6xl text-foreground">
            The Armory
          </h1>
          <p className="prose-lede mt-5 max-w-lg text-base text-muted-foreground">
            Upgrade your experience, unlock new abilities, and support the world you play in. Two catalogues, no loot boxes, no subscriptions.
          </p>

          <dl className="mt-10 flex flex-wrap gap-8 border-l border-border pl-6">
            {[
              ["Catalogues", String(CATALOGUES.length)],
              ["Total tiers", String(CATALOGUES.reduce((n, c) => n + c.ranks.length, 0))],
              ["Currency", "Indian Rupee (₹)"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="hud text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="display-tight mt-2 text-lg text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative container-base max-w-3xl pb-24">
        <div className="mt-8 flex flex-col gap-4">
          {CATALOGUES.map((cat) => (
            <CategoryPanel key={cat.id} id={cat.id} />
          ))}
        </div>

        <div className="mt-24 border-t border-border pt-16">
          <p className="eyebrow text-primary mb-8">Before you buy</p>
          <ul className="space-y-10">
            {TRUST.map((t, i) => (
              <li key={t.title} className="flex gap-6 sm:gap-8">
                <span className="hud text-muted-foreground pt-1 text-sm font-semibold">0{i + 1}</span>
                <div>
                  <h3 className="display-tight text-xl text-foreground">{t.title}</h3>
                  <p className="prose-lede mt-2 text-base leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
          {CHECKOUT.refundPolicy && (
            <p className="prose-lede mt-10 text-sm text-muted-foreground border-t border-border pt-8">
              {CHECKOUT.refundPolicy}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
