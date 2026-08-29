import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PVP_CATEGORIES, pvpCategory } from "@/lib/pvp";
import Icon from "@/components/ui/Icon";
import PvpSelector from "@/components/pvp/PvpSelector";

type Params = { params: Promise<{ category: string }> };

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

  return (
    <div className="bg-[#01060f]">
      <header className="relative isolate overflow-hidden border-b border-hair pb-12 pt-36 sm:pt-44">
        <div aria-hidden className="arena-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(52% 62% at 80% 100%, color-mix(in srgb, ${cat.accent} 26%, transparent), transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8">
          <Link
            href="/pvp"
            className="hud inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-ink-3 transition-colors hover:text-ice"
          >
            <Icon name="arrow" size={13} className="rotate-180" />
            All duel types
          </Link>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">{cat.eyebrow}</span>
              <h1 className="display mt-4 text-[clamp(2.4rem,7vw,5rem)] leading-[0.86] text-paper">
                {cat.name}
              </h1>
            </div>
            <p className="prose-lede max-w-md text-[0.98rem]">{cat.blurb}</p>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-[92rem] px-5 pb-28 pt-12 sm:px-8">
        <PvpSelector category={cat} />
      </section>
    </div>
  );
}
