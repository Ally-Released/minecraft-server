import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODES, mode } from "@/lib/modes";
import { catalogue } from "@/lib/store";
import { fetchLivePulse } from "@/lib/live-pulse";
import { fetchServerStatus } from "@/lib/status";
import Icon from "@/components/ui/Icon";
import CopyIp from "@/components/ui/CopyIp";
import { Button } from "@/components/ui/button";
import { PracticeLivePanel } from "@/components/pvp/PracticeLive";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 15;

export function generateStaticParams() {
  return MODES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const m = mode((await params).slug);
  if (!m) return {};
  return {
    title: m.name,
    description: `${m.tagline} ${m.description.slice(0, 120)}…`,
    alternates: { canonical: `/modes/${m.slug}` },
  };
}

export default async function ModePage({ params }: Params) {
  const m = mode((await params).slug);
  if (!m) notFound();

  const store = m.store ? catalogue(m.store) : undefined;
  const others = MODES.filter((o) => o.slug !== m.slug);
  const [pulse, status] =
    m.slug === "practice"
      ? await Promise.all([
          fetchLivePulse().catch(() => null),
          fetchServerStatus().catch(() => null),
        ])
      : [null, null];

  const onlineTrait =
    status?.state === "online" && status.players
      ? `${status.players.online} online`
      : null;

  return (
    <>
      <header className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44 bg-background">
        {m.image ? (
          <div className="absolute inset-0 -z-10">
            <img
              src={m.image}
              alt={m.name}
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
            <div
              className="absolute inset-0 mix-blend-color"
              style={{ backgroundColor: m.accent }}
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(66% 58% at 78% 0%, color-mix(in srgb, ${m.accent} 20%, transparent), transparent 70%)`,
            }}
          />
        )}

        <div className="relative container-base">
          <Link
            href="/modes"
            className="hud inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="arrow" size={13} className="rotate-180" />
            All worlds
          </Link>

          <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span
                className="grid h-16 w-16 place-items-center rounded-lg bg-card border border-border"
                style={{ color: m.accent, borderColor: `color-mix(in srgb, ${m.accent} 40%, transparent)` }}
              >
                <Icon name={m.icon} size={32} />
              </span>
              <h1 className="display mt-7 text-6xl md:text-7xl text-foreground">
                {m.name}
              </h1>
              <p
                className="display-tight mt-4 text-xl md:text-2xl"
                style={{ color: m.accent }}
              >
                {m.tagline}
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <dl className="grid gap-px border border-border bg-border rounded-lg overflow-hidden">
                {onlineTrait && (
                  <div className="flex items-center gap-3 bg-card px-5 py-4">
                    <Icon name="world" size={16} className="shrink-0 text-muted-foreground" />
                    <dt className="hud text-xs uppercase tracking-widest text-muted-foreground">
                      Network
                    </dt>
                    <dd className="ml-auto text-right text-sm text-foreground">{onlineTrait}</dd>
                  </div>
                )}
                {m.traits.map((t) => (
                  <div key={t.label} className="flex items-center gap-3 bg-card px-5 py-4">
                    <Icon name={t.icon} size={16} className="shrink-0 text-muted-foreground" />
                    <dt className="hud text-xs uppercase tracking-widest text-muted-foreground">
                      {t.label}
                    </dt>
                    <dd className="ml-auto text-right text-sm text-foreground">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>

      {m.slug === "practice" && pulse && (
        <div className="relative container-base pb-4">
          <PracticeLivePanel pulse={pulse} />
        </div>
      )}

      <section className="relative container-base pb-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {m.description}
            </p>

            <ul className="mt-10 space-y-4 border-t border-border pt-8">
              {m.highlights.map((h) => (
                <li key={h} className="flex items-start gap-4">
                  <Icon
                    name="check"
                    size={15}
                    className="mt-1.5 shrink-0"
                    style={{ color: m.accent }}
                  />
                  <span className="text-base text-muted-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28 p-6 border border-border rounded-lg bg-card">
              <p className="eyebrow border-b border-border pb-4 mb-5">Join this world</p>
              <CopyIp size="sm" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Connect once, then pick {m.name} from the in-game hub.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Button variant="secondary" asChild className="w-full">
                  <Link href="/how-to-play">How to join</Link>
                </Button>
                {store && (
                  <Button asChild className="w-full">
                    <Link href={store.slug}>{store.name} ranks</Link>
                  </Button>
                )}
                {m.slug === "practice" && (
                  <Button asChild className="w-full">
                    <Link href="/pvp">Browse duel types</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-10">
          <p className="eyebrow text-primary">Other worlds</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/modes/${o.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center" style={{ color: o.accent }}>
                    <Icon name={o.icon} size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="display-tight block text-lg text-foreground">{o.name}</span>
                    <span className="hud block truncate text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                      {o.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
