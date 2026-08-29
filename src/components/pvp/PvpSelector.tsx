"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { DIFFICULTY_LABEL, PVP_CATEGORIES, type PvpCategory } from "@/lib/pvp";
import Icon from "@/components/ui/Icon";
import CopyIp from "@/components/ui/CopyIp";
import { Meter } from "@/components/store/Bits";

/**
 * The in-game selector, rebuilt for the web.
 *
 * Three columns: where you are in the game, what you can queue for, and what
 * you are actually signing up to. Selecting never navigates — the point is to
 * compare modes quickly, not to load a page per duel type.
 */
export default function PvpSelector({ category }: { category: PvpCategory }) {
  const [index, setIndex] = useState(0);
  const mode = category.modes[index];
  const accent = category.accent;

  return (
    <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
      {/* Categories */}
      <nav aria-label="Duel categories" className="lg:col-span-2">
        <p className="eyebrow border-b border-hair pb-3">Categories</p>
        <ul className="scroll-x -mx-5 mt-3 flex gap-1 px-5 lg:mx-0 lg:block lg:space-y-0.5 lg:px-0">
          {PVP_CATEGORIES.map((c) => {
            const on = c.slug === category.slug;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/pvp/${c.slug}`}
                  aria-current={on ? "page" : undefined}
                  className={`flex items-center gap-2.5 whitespace-nowrap px-3 py-2.5 text-[0.82rem] transition-colors duration-300 lg:px-0 ${
                    on ? "text-paper" : "text-ink-2 hover:text-ice"
                  }`}
                >
                  <Icon
                    name={c.icon}
                    size={15}
                    className="shrink-0"
                    style={{ color: on ? c.accent : "var(--color-steel)" }}
                  />
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Modes in this category */}
      <div className="lg:col-span-3">
        <p className="eyebrow border-b border-hair pb-3">{category.name}</p>
        <ul
          className="scroll-x -mx-5 mt-3 flex gap-2 px-5 lg:mx-0 lg:block lg:space-y-1.5 lg:px-0"
          role="tablist"
          aria-label={`${category.name} modes`}
        >
          {category.modes.map((m, i) => {
            const on = i === index;
            return (
              <li key={m.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="pvp-mode-panel"
                  onClick={() => setIndex(i)}
                  className="slot group flex w-full min-w-[9rem] items-center gap-3 px-3.5 py-3 text-left transition-all duration-300"
                  style={
                    on
                      ? {
                          ["--slot-accent" as string]: accent,
                          boxShadow: `inset 1.5px 1.5px 0 ${accent}, inset -1.5px -1.5px 0 rgba(0,0,0,.55)`,
                        }
                      : undefined
                  }
                >
                  <Icon
                    name={m.icon}
                    size={16}
                    className="shrink-0 transition-colors duration-300"
                    style={{ color: on ? accent : "var(--color-steel)" }}
                  />
                  <span
                    className={`display-tight truncate text-[0.98rem] transition-colors duration-300 ${
                      on ? "text-paper" : "text-ink-2 group-hover:text-ice"
                    }`}
                  >
                    {m.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The mode itself */}
      <div className="lg:col-span-7" id="pvp-mode-panel" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden border border-hair p-7 sm:p-9">
              <span aria-hidden className="arena-grid pointer-events-none absolute inset-0" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(70% 90% at 88% 0%, color-mix(in srgb, ${accent} 20%, transparent), transparent 68%)`,
                }}
              />

              <div className="relative flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0">
                  <span className="hud text-[0.55rem] uppercase tracking-[0.26em] text-ink-3">
                    {category.name}
                  </span>
                  <h2 className="display mt-2.5 text-[clamp(2rem,5vw,3.2rem)] leading-none text-paper">
                    {mode.name}
                  </h2>
                </div>
                <span
                  className="slot slot-lit grid h-16 w-16 shrink-0 place-items-center"
                  style={{ ["--slot-accent" as string]: accent, color: accent }}
                >
                  <Icon name={mode.icon} size={28} />
                </span>
              </div>

              <p className="prose-lede relative mt-5 max-w-xl text-[1rem]">{mode.blurb}</p>

              <div className="relative mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-hair pt-6">
                <div>
                  <p className="hud text-[0.55rem] uppercase tracking-[0.22em] text-ink-3">
                    Difficulty
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <Meter
                      level={mode.difficulty}
                      accent={accent}
                      label={DIFFICULTY_LABEL[mode.difficulty]}
                    />
                    <span className="hud text-[0.72rem] text-ice">
                      {DIFFICULTY_LABEL[mode.difficulty]}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="hud text-[0.55rem] uppercase tracking-[0.22em] text-ink-3">
                    Objective
                  </p>
                  <p className="mt-2 text-[0.88rem] text-ice">{mode.objective}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <section className="border border-hair p-6">
                <p className="eyebrow flex items-center gap-2.5">
                  <Icon name="chest" size={14} style={{ color: accent }} />
                  Equipment
                </p>
                <ul className="mt-4 space-y-2.5">
                  {mode.equipment.map((e) => (
                    <li key={e} className="flex items-start gap-3 text-[0.86rem] text-ink-2">
                      <span
                        aria-hidden
                        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45"
                        style={{ background: accent }}
                      />
                      {e}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="border border-hair p-6">
                <p className="eyebrow flex items-center gap-2.5">
                  <Icon name="shield" size={14} style={{ color: accent }} />
                  Rules
                </p>
                <ol className="mt-4 space-y-2.5">
                  {mode.rules.map((r, i) => (
                    <li key={r} className="flex items-start gap-3 text-[0.86rem] text-ink-2">
                      <span className="hud shrink-0 pt-0.5 text-[0.62rem] text-steel">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {r}
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border border-hair p-6">
              <div className="min-w-[14rem] flex-1">
                <p className="eyebrow">Queue for {mode.name}</p>
                <p className="mt-2 text-[0.82rem] text-ink-3">
                  Join the network, open the practice hub and pick {category.name} → {mode.name}.
                </p>
              </div>
              <div className="w-full sm:w-auto sm:min-w-[18rem]">
                <CopyIp size="sm" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
