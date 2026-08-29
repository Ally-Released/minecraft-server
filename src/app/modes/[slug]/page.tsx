import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODES, mode } from "@/lib/modes";
import { catalogue } from "@/lib/store";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import CopyIp from "@/components/ui/CopyIp";
import Action from "@/components/ui/Action";
import Ridge from "@/components/ui/Ridge";

type Params = { params: Promise<{ slug: string }> };

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

  return (
    <>
      <header className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(66% 58% at 78% 0%, color-mix(in srgb, ${m.accent} 30%, transparent), transparent 70%)`,
          }}
        />
        <div aria-hidden className="block-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
        <Ridge seed={9002} className="bottom-0 h-28 opacity-55" height={130} block={14} rim={0.28} />

        <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8">
          <Link
            href="/modes"
            className="hud inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-ink-3 transition-colors hover:text-ice"
          >
            <Icon name="arrow" size={13} className="rotate-180" />
            All worlds
          </Link>

          <div className="mt-8 grid items-end gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span
                className="slot slot-lit grid h-20 w-20 place-items-center"
                style={{ ["--slot-accent" as string]: m.accent, color: m.accent }}
              >
                <Icon name={m.icon} size={36} />
              </span>
              <h1 className="display mt-7 text-[clamp(2.8rem,8vw,6rem)] leading-[0.85] text-paper">
                {m.name}
              </h1>
              <p
                className="display-tight mt-4 text-[clamp(1.1rem,2.4vw,1.6rem)]"
                style={{ color: m.accent }}
              >
                {m.tagline}
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <dl className="grid gap-px border border-hair bg-hair">
                {m.traits.map((t) => (
                  <div key={t.label} className="flex items-center gap-3 bg-abyss px-5 py-4">
                    <Icon name={t.icon} size={16} className="shrink-0 text-steel" />
                    <dt className="hud text-[0.55rem] uppercase tracking-[0.22em] text-ink-3">
                      {t.label}
                    </dt>
                    <dd className="ml-auto text-right text-[0.85rem] text-ice">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-[92rem] px-5 pb-24 sm:px-8">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[1.05rem] leading-relaxed text-ink-2 sm:text-[1.15rem]">
              {m.description}
            </p>

            <ul className="mt-10 space-y-px border-t border-hair">
              {m.highlights.map((h) => (
                <li key={h} className="flex items-start gap-4 border-b border-hair py-4">
                  <Icon
                    name="check"
                    size={15}
                    className="mt-1 shrink-0"
                    style={{ color: m.accent }}
                  />
                  <span className="text-[0.95rem] text-ink-2">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow border-b border-hair pb-3">Join this world</p>
              <div className="mt-5">
                <CopyIp />
              </div>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-3">
                Connect once, then pick {m.name} from the in-game hub.
              </p>

              <div className="mt-6 space-y-2.5">
                <Action variant="ghost" href="/how-to-play" className="w-full">
                  <span className="text-[0.78rem]">How to join</span>
                </Action>
                {store && (
                  <Action variant="primary" href={store.slug} className="w-full">
                    <span className="text-[0.78rem]">{store.name} ranks</span>
                  </Action>
                )}
                {m.slug === "practice" && (
                  <Action variant="primary" href="/pvp" className="w-full">
                    <span className="text-[0.78rem]">Browse duel types</span>
                  </Action>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-20 border-t border-hair pt-10">
            <p className="eyebrow">Other worlds</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/modes/${o.slug}`}
                    className="slot group flex items-center gap-4 p-4 transition-all duration-400 hover:brightness-125"
                    style={{ ["--slot-accent" as string]: o.accent }}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center" style={{ color: o.accent }}>
                      <Icon name={o.icon} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="display-tight block text-[1.05rem] text-paper">{o.name}</span>
                      <span className="hud block truncate text-[0.58rem] uppercase tracking-[0.18em] text-ink-3">
                        {o.tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
