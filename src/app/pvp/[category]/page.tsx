import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PVP_CATEGORIES, pvpCategory } from "@/lib/pvp";
import { fetchLivePulse, categoryLive } from "@/lib/live-pulse";
import Icon from "@/components/ui/Icon";
import PvpSelector from "@/components/pvp/PvpSelector";
import { CategoryLiveLine } from "@/components/pvp/PracticeLive";

type Params = { params: Promise<{ category: string }> };

export const revalidate = 15;

export function generateStaticParams() {
  return PVP_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cat = pvpCategory((await params).category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `${cat.blurb} ${cat.modes.map((m) => m.name).join(", ")}.`,
    alternates: { canonical: `/pvp/${cat.slug}` },
  };
}

export default async function PvpCategoryPage({ params }: Params) {
  const cat = pvpCategory((await params).category);
  if (!cat) notFound();

  const pulse = await fetchLivePulse().catch(() => null);
  const live = pulse ? categoryLive(pulse, cat.slug) : null;

  return (
    <div className="bg-background min-h-screen">
      <header className="relative isolate overflow-hidden border-b border-border pb-12 pt-36 sm:pt-44">
        <div className="relative container-base max-w-5xl">
          <Link
            href="/pvp"
            className="hud inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="arrow" size={13} className="rotate-180" />
            All duel types
          </Link>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-primary">{cat.eyebrow}</span>
              <h1 className="display mt-4 text-5xl md:text-6xl text-foreground">
                {cat.name}
              </h1>
              {live && (
                <div className="mt-4">
                  <CategoryLiveLine live={live} />
                </div>
              )}
            </div>
            <p className="prose-lede max-w-md text-base text-muted-foreground">{cat.blurb}</p>
          </div>

          {live && (
            <dl className="mt-8 grid grid-cols-3 gap-px border border-border bg-border rounded-lg overflow-hidden max-w-lg">
              {[
                ["Fighting now", live.fighting],
                ["In queue", live.queued],
                ["Series / 7 days", live.plays7d],
              ].map(([label, value]) => (
                <div key={String(label)} className="bg-card px-4 py-4">
                  <dt className="hud text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="display-tight mt-2 text-2xl text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <section className="relative container-base max-w-5xl pb-28 pt-12">
        <PvpSelector category={cat} />
      </section>
    </div>
  );
}
