import Link from "next/link";
import type { LivePulse, CategoryLive } from "@/lib/live-pulse";
import { PVP_CATEGORIES } from "@/lib/pvp";
import Icon from "@/components/ui/Icon";

function fmt(n: number): string {
  return Number.isFinite(n) ? String(Math.max(0, Math.floor(n))) : "0";
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-4 py-3">
      <dt className="hud text-[0.6rem] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="display-tight mt-1.5 text-xl text-foreground">{value}</dd>
    </div>
  );
}

/** Top strip for /modes/practice — network-wide live + per-category rollup. */
export function PracticeLivePanel({ pulse }: { pulse: LivePulse }) {
  const liveHint = pulse.stale
    ? "Waiting for live sync from the practice server…"
    : pulse.updatedAt
      ? `Synced ${new Date(pulse.updatedAt).toLocaleTimeString()}`
      : "Live sync arms after the next server restart";

  return (
    <section className="mt-12 border border-border rounded-lg overflow-hidden bg-border">
      <div className="bg-card px-5 py-4 flex flex-wrap items-end justify-between gap-3 border-b border-border">
        <div>
          <p className="eyebrow text-primary">Live on practice</p>
          <p className="mt-1 text-sm text-muted-foreground">{liveHint}</p>
        </div>
        <Link
          href="/pvp"
          className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          Browse categories →
        </Link>
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px">
        <Stat label="Online now" value={fmt(pulse.onlinePlayers)} />
        <Stat label="In queue" value={fmt(pulse.inQueue)} />
        <Stat label="In match" value={fmt(pulse.inFight)} />
        <Stat
          label="Ranked active"
          value={fmt(pulse.rankedQueued + pulse.rankedFighting)}
        />
      </dl>

      <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-border">
        {PVP_CATEGORIES.map((cat) => {
          const live = pulse.categories[cat.slug] ?? { queued: 0, fighting: 0, plays7d: 0 };
          return (
            <li key={cat.slug} className="bg-card">
              <Link
                href={`/pvp/${cat.slug}`}
                className="group flex flex-col gap-3 p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center" style={{ color: cat.accent }}>
                    <Icon name={cat.icon} size={18} />
                  </span>
                  <span className="display-tight text-base text-foreground group-hover:text-primary">
                    {cat.name}
                  </span>
                </div>
                <CategoryLiveLine live={live} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function CategoryLiveLine({ live }: { live: CategoryLive }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
      <span>
        <span className="text-foreground">{fmt(live.fighting)}</span> fighting
      </span>
      <span>
        <span className="text-foreground">{fmt(live.queued)}</span> queued
      </span>
      <span>
        <span className="text-foreground">{fmt(live.plays7d)}</span> series / 7d
      </span>
    </div>
  );
}

/** Compact live chip for /pvp hub rows. */
export function CategoryLiveChip({ live }: { live: CategoryLive }) {
  const hot = live.fighting + live.queued > 0;
  return (
    <span
      className={`hud text-[0.65rem] uppercase tracking-widest ${
        hot ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {fmt(live.fighting)} fight · {fmt(live.queued)} queue · {fmt(live.plays7d)} /7d
    </span>
  );
}
