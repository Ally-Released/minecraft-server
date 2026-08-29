import Icon, { type IconName } from "@/components/ui/Icon";
import { RARITY, type RarityKey } from "@/lib/store";

/** The rarity chip. Same ladder everywhere: chip, card edge, progression node. */
export function RarityBadge({ rarity, className = "" }: { rarity: RarityKey; className?: string }) {
  const r = RARITY[rarity];
  return (
    <span
      className={`hud inline-flex items-center gap-1.5 px-2 py-1 text-[0.55rem] uppercase tracking-[0.22em] ${className}`}
      style={{ color: r.accent, background: r.soft }}
    >
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: r.accent }} />
      {r.label}
    </span>
  );
}

/**
 * A Minecraft item stat line: icon, what it is, and the level in the display
 * face. Reads as item metadata rather than a spec-sheet row.
 */
export function StatRow({
  icon,
  label,
  value,
  accent,
  delta,
}: {
  icon: IconName;
  label: string;
  value: string;
  accent?: string;
  delta?: string;
}) {
  return (
    <div className="flex items-center gap-3.5 py-2.5">
      <span
        className="slot grid h-9 w-9 shrink-0 place-items-center"
        style={{ color: accent ?? "var(--color-ice)" }}
      >
        <Icon name={icon} size={17} />
      </span>
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

/** A command, its icon and what it actually does. Never a comma-separated dump. */
export function CommandBadge({
  cmd,
  label,
  icon,
  accent,
}: {
  cmd: string;
  label: string;
  icon: IconName;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-hair/60 py-2.5 last:border-b-0">
      <span className="grid h-7 w-7 shrink-0 place-items-center text-ink-2" style={{ color: accent }}>
        <Icon name={icon} size={15} />
      </span>
      <code className="hud shrink-0 bg-void/70 px-2 py-1 text-[0.74rem] text-ice">{cmd}</code>
      {/* Never truncate: a half-shown perk description is worse than a wrap. */}
      <span className="min-w-0 text-[0.82rem] leading-snug text-ink-3">{label}</span>
    </div>
  );
}

/** Included / not included, drawn rather than spelled. */
export function Availability({ on, accent }: { on: boolean; accent?: string }) {
  return on ? (
    <Icon name="check" size={16} style={{ color: accent ?? "var(--color-glow)" }} aria-label="Included" />
  ) : (
    <Icon name="minus" size={16} className="text-ink-3/50" aria-label="Not included" />
  );
}

/** Difficulty / intensity meter — four blocks, filled to level. */
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
