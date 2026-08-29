import type { ReactNode } from "react";

/**
 * Shared page chrome. Every inner page opens on the same horizon so the site
 * reads as one continuous world; everything below the header is free to
 * compose itself however that page needs to.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  accent = "var(--color-primary)",
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
    <header className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44 border-b border-border bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(72% 58% at 72% -10%, color-mix(in srgb, ${accent} 15%, transparent), transparent 70%)`,
        }}
      />

      <div className="container-base">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-9"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              />
              <span className="eyebrow" style={{ color: accent }}>{eyebrow}</span>
            </div>
            <h1 className="display mt-6 text-5xl sm:text-6xl text-foreground">{title}</h1>
            {lede && <p className="prose-lede mt-6 max-w-xl text-base text-muted-foreground">{lede}</p>}
          </div>
          {aside && (
            <div className="lg:col-span-4 lg:col-start-9">
              {aside}
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
