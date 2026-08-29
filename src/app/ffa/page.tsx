import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { FFA_MODES } from "@/lib/modes";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import CopyIp from "@/components/ui/CopyIp";
import { Meter } from "@/components/store/Bits";

export const metadata: Metadata = {
  title: "Free for all",
  description: `Open arenas on ${SERVER_CONFIG.name}: Mace FFA, NethPot FFA, Manhunt, Cart PvP and Diamond SMP. No queue, no teams.`,
  alternates: { canonical: "/ffa" },
};

const INTENSITY_LABEL = ["", "Warm-up", "Busy", "Loud", "Chaos"];

/** Deliberately uneven — an arena board, not a product grid. */
const SPAN = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
];

/** Fills the featured tile with the thing it is describing: a ring of players. */
function ArenaMotif() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(60%,17rem)] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
    >
      <polygon
        points="100,18 158,42 182,100 158,158 100,182 42,158 18,100 42,42"
        fill="none"
        stroke="#7fe4ff"
        strokeWidth="1.5"
      />
      <polygon
        points="100,48 137,63 152,100 137,137 100,152 63,137 48,100 63,63"
        fill="none"
        stroke="#4da3ff"
        strokeWidth="1"
        strokeDasharray="4 6"
        className="origin-center animate-spin [animation-duration:48s]"
      />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        return (
          <rect
            key={i}
            x={100 + Math.cos(a) * 82 - 4}
            y={100 + Math.sin(a) * 82 - 4}
            width="8"
            height="8"
            fill="#a8ecff"
            opacity={i % 2 ? 0.4 : 0.9}
          />
        );
      })}
      <rect x="94" y="94" width="12" height="12" fill="#e6f6ff" />
    </svg>
  );
}

export default function FfaPage() {
  return (
    <div className="bg-[#01060f]">
      <header className="relative isolate overflow-hidden border-b border-hair pb-14 pt-36 sm:pt-44">
        <div aria-hidden className="arena-grid animate-arena pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 60% at 50% 110%, rgba(127,228,255,0.3), transparent 68%)",
          }}
        />
        {/* Faint combatants around the edge of the floor. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.13]">
          {[
            [8, 74],
            [22, 86],
            [78, 70],
            [91, 88],
            [58, 92],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute text-ice"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animation: `hint-fall ${3 + i}s var(--ease-in-out-soft) ${i * 0.4}s infinite`,
              }}
            >
              <Icon name="player" size={i % 2 ? 26 : 34} />
            </span>
          ))}
        </div>

        <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Icon name="arena" size={15} className="text-glow" />
            <span className="eyebrow">Free for all</span>
          </div>
          <h1 className="display mt-6 text-[clamp(3rem,12vw,9rem)] leading-[0.8] text-paper">
            No teams.
            <span className="block lit">No queue.</span>
          </h1>
          <p className="prose-lede mt-7 max-w-lg text-[1.05rem]">
            Walk into an arena and you are already fighting. Everyone in the room is a target,
            including the person you were fighting alongside a second ago.
          </p>
        </div>
      </header>

      <section className="relative mx-auto max-w-[92rem] px-5 pb-24 pt-14 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {FFA_MODES.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.07} className={SPAN[i] ?? "lg:col-span-4"}>
              <article className="group relative flex h-full flex-col overflow-hidden border border-hair p-7 transition-colors duration-500 hover:border-steel">
                <span
                  aria-hidden
                  className="arena-grid pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(60% 80% at 80% 10%, rgba(85,214,255,0.18), transparent 70%)",
                  }}
                />

                {i === 0 && <ArenaMotif />}

                <div className="relative flex items-start justify-between gap-4">
                  <span className="slot grid h-12 w-12 shrink-0 place-items-center text-glow">
                    <Icon name={m.icon} size={24} />
                  </span>
                  <span className="hud text-[0.55rem] uppercase tracking-[0.22em] text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2
                  className={`display relative mt-auto pt-10 leading-none text-paper ${
                    i === 0 ? "text-[clamp(2.2rem,5vw,3.4rem)]" : "text-[1.8rem]"
                  }`}
                >
                  {m.name}
                </h2>
                <p className={`prose-lede relative mt-3 text-[0.92rem] ${i === 0 ? "max-w-sm" : ""}`}>
                  {m.blurb}
                </p>

                <dl className="relative mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hair pt-5">
                  <div>
                    <dt className="hud text-[0.52rem] uppercase tracking-[0.22em] text-ink-3">
                      Pressure
                    </dt>
                    <dd className="mt-2 flex items-center gap-3">
                      <Meter level={m.intensity} label={INTENSITY_LABEL[m.intensity]} />
                      <span className="hud text-[0.68rem] text-ice">
                        {INTENSITY_LABEL[m.intensity]}
                      </span>
                    </dd>
                  </div>
                  <div className="min-w-0 flex-1">
                    <dt className="hud text-[0.52rem] uppercase tracking-[0.22em] text-ink-3">
                      Kit
                    </dt>
                    <dd className="mt-2 truncate text-[0.82rem] text-ink-2">{m.kit}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-6 border border-hair p-7">
            <div className="min-w-[16rem] flex-1">
              <p className="eyebrow">Get into an arena</p>
              <p className="prose-lede mt-2 text-[0.9rem]">
                FFA arenas live inside the practice server. Connect, open the hub and walk in — no
                queue to wait for.
              </p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[20rem]">
              <CopyIp size="sm" />
            </div>
            <Link
              href="/pvp"
              className="hud inline-flex items-center gap-2 border border-hair px-5 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-ink-2 transition-colors hover:border-steel hover:text-paper"
            >
              Duel types
              <Icon name="arrow" size={13} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
