import Link from "next/link";
import { SERVER_CONFIG, fill } from "@/lib/config";
import { MODES } from "@/lib/modes";
import { CATALOGUES, RARITY, price } from "@/lib/store";
import { PVP_MODE_COUNT } from "@/lib/pvp";
import Icon, { type IconName } from "@/components/ui/Icon";
import CopyIp from "@/components/ui/CopyIp";
import { Button } from "@/components/ui/button";

export function ModesStrip() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 bg-background border-t border-border">
      <div className="container-base">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-primary/50" />
              <span className="eyebrow text-primary">Where you land</span>
            </div>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] text-foreground">
              Four worlds,
              <span className="text-muted-foreground"> one address.</span>
            </h2>
          </div>
          <Button variant="ghost" asChild className="h-auto uppercase tracking-widest text-xs">
            <Link href="/modes">
              All worlds <Icon name="arrow" size={14} className="ml-2" />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 flex flex-col">
          {MODES.map((m, i) => (
            <li key={m.slug} className="group relative border-b border-border transition-colors hover:bg-muted/30">
              <Link
                href={`/modes/${m.slug}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 px-4"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase w-6">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground tracking-wide">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground max-w-lg">
                      {m.tagline}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary transition-transform duration-300 group-hover:translate-x-2 flex items-center gap-2">
                  Explore <Icon name="arrow" size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="prose-lede mt-10 max-w-2xl text-sm">
          Practice also runs {PVP_MODE_COUNT} duel types and five free-for-all arenas —{" "}
          <Link href="/pvp" className="text-primary underline decoration-primary/50 underline-offset-4 hover:text-primary/80">
            browse them
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export function StoreCta() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 bg-background border-t border-border">
      <div className="container-base">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-primary/50" />
              <span className="eyebrow text-primary">The armory</span>
            </div>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] text-foreground">
              Ranks that change
              <span className="block text-muted-foreground">how you play.</span>
            </h2>
            <p className="prose-lede mt-6 max-w-md text-base">
              Stronger gear, portable stations, flight and more room to build. Every purchase goes
              back into keeping the worlds online.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/store">Open the store</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/store/survival">Survival ranks</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4 lg:pl-12">
            {CATALOGUES.map((cat) => {
              const hasSale = cat.ranks.some((r) => r.originalPrice && r.originalPrice > r.price);
              return (
                <Link
                  key={cat.id}
                  href={cat.slug}
                  className="group flex items-center justify-between p-6 rounded-lg border border-border bg-card transition-colors hover:border-primary/50 hover:bg-card/80"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="display-tight text-2xl text-foreground">
                        {cat.name}
                      </h3>
                      {hasSale && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/15 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-red-400 shadow-sm shadow-red-500/15">
                          <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                          Sale
                        </span>
                      )}
                    </div>
                    <p className="hud mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                      {cat.ranks.length} tiers · from {price(Math.min(...cat.ranks.map((r) => r.price)))}
                    </p>
                  </div>
                  <Icon
                    name="arrow"
                    size={20}
                    className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowToPlayStrip() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 bg-card border-t border-border">
      <div className="container-base">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-primary/50" />
              <span className="eyebrow text-primary">Joining the server</span>
            </div>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.4rem)] text-foreground">
              Under a minute
              <span className="text-muted-foreground"> from here.</span>
            </h2>
          </div>
          <Button variant="ghost" asChild className="h-auto uppercase tracking-widest text-xs">
            <Link href="/how-to-play">
              Full walkthrough <Icon name="arrow" size={14} className="ml-2" />
            </Link>
          </Button>
        </div>

        <ol className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVER_CONFIG.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="hud text-xs tracking-widest text-primary font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-tight mt-3 text-xl text-foreground">{step.title}</h3>
              <p className="hud mt-3 text-xs tracking-wider text-muted-foreground leading-relaxed">
                {fill(step.hint)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 max-w-lg">
          <CopyIp />
        </div>
      </div>
    </section>
  );
}
