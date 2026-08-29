import { RARITY, type RarityKey } from "@/lib/store";

export function RarityBadge({ rarity, className = "" }: { rarity: RarityKey; className?: string }) {
  const r = RARITY[rarity];
  return (
    <span
      className={`hud inline-flex items-center gap-1.5 px-2 py-1 text-[0.55rem] uppercase tracking-[0.22em] ${className}`}
      style={{ color: r.accent, background: r.soft }}
    >
      <span className="text-[0.45rem]">■</span>
      {r.label}
    </span>
  );
}

export function StatRow({
  label,
  value,
  accent,
  delta,
}: {
  label: string;
  value: string;
  accent?: string;
  delta?: string;
}) {
  return (
    <div className="flex items-center gap-3.5 py-2.5">
      <span className="hud min-w-0 flex-1 text-[0.62rem] uppercase tracking-[0.24em] text-ink-3">
        {label}
      </span>
      {delta && (
        <span className="hud text-[0.66rem] text-ink-3">
          {delta}
          <span className="px-1.5 text-steel">→</span>
        </span>
      )}
      <span
        className="display-tight shrink-0 text-[1.15rem] leading-none"
        style={{ color: accent ?? "var(--color-paper)" }}
      >
        {value}
      </span>
    </div>
  );
}

export function CommandBadge({
  cmd,
  label,
  accent,
}: {
  cmd: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <code className="hud shrink-0 bg-white/5 border border-white/10 px-2 py-1 text-[0.74rem] text-electric">{cmd}</code>
      <span className="min-w-0 text-[0.82rem] leading-snug text-ink-2">{label}</span>
    </div>
  );
}

export function Availability({ on, accent }: { on: boolean; accent?: string }) {
  return on ? (
    <span style={{ color: accent ?? "var(--color-electric)" }} aria-label="Included">
      Yes
    </span>
  ) : (
    <span className="text-ink-3/50" aria-label="Not included">
      No
    </span>
  );
}

export function Meter({
  level,
  max = 4,
  accent = "var(--color-glow)",
  label,
}: {
  level: number;
  max?: number;
  accent?: string;
  label?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2" role="img" aria-label={label}>
      <span className="flex gap-1">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className="h-2.5 w-4"
            style={{ background: i < level ? accent : "rgba(90,120,156,0.22)" }}
          />
        ))}
      </span>
    </span>
  );
}
