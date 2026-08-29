import type { ReactNode } from "react";
import Ridge from "@/components/ui/Ridge";
import Reveal from "@/components/ui/Reveal";

/**
 * Shared page chrome. Every inner page opens on the same horizon so the site
 * reads as one continuous world; everything below the header is free to
 * compose itself however that page needs to.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  accent = "#4da3ff",
  seed = 5150,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: string;
  seed?: number;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(72% 58% at 72% -10%, color-mix(in srgb, ${accent} 26%, transparent), transparent 70%)`,
        }}
      />
      <div aria-hidden className="block-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.18]" />
      <Ridge
        seed={seed}
        className="bottom-0 h-24 opacity-60 sm:h-32"
        height={130}
        block={14}
        rim={0.3}
      />

      <div className="mx-auto max-w-[92rem] px-5 sm:px-8">
        <div className="grid items-end gap-x-12 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-9"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1 className="display mt-6 text-[clamp(2.6rem,7vw,5.6rem)] text-paper">{title}</h1>
            {lede && <p className="prose-lede mt-6 max-w-xl text-[1.02rem]">{lede}</p>}
          </Reveal>
          {aside && (
            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              {aside}
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
