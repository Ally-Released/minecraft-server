"use client";

import Link from "next/link";
import { useState } from "react";
import { DIFFICULTY_LABEL, PVP_CATEGORIES, type PvpCategory } from "@/lib/pvp";
import Icon from "@/components/ui/Icon";
import CopyIp from "@/components/ui/CopyIp";
import { Meter } from "@/components/store/Bits";

export default function PvpSelector({ category }: { category: PvpCategory }) {
  const [index, setIndex] = useState(0);
  const mode = category.modes[index];
  const accent = category.accent;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Categories */}
      <nav aria-label="Duel categories" className="min-w-0 lg:col-span-2">
        <p className="eyebrow border-b border-border pb-3">Categories</p>
        <ul className="overflow-x-auto -mx-5 mt-3 flex gap-1 px-5 lg:mx-0 lg:block lg:space-y-1 lg:px-0 scrollbar-hide">
          {PVP_CATEGORIES.map((c) => {
            const on = c.slug === category.slug;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/pvp/${c.slug}`}
                  aria-current={on ? "page" : undefined}
                  className={`flex items-center gap-2.5 whitespace-nowrap px-3 py-2.5 text-sm transition-colors duration-200 lg:px-0 rounded-md ${
                    on ? "text-foreground bg-muted/50 lg:bg-transparent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon
                    name={c.icon}
                    size={16}
                    className="shrink-0"
                    style={{ color: on ? c.accent : "currentColor" }}
                  />
                  <span className="font-medium">{c.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Modes in this category */}
      <div className="min-w-0 lg:col-span-3">
        <p className="eyebrow border-b border-border pb-3">{category.name}</p>
        <ul
          className="overflow-x-auto -mx-5 mt-3 flex gap-2 px-5 lg:mx-0 lg:block lg:space-y-2 lg:px-0 scrollbar-hide"
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
                  className={`group flex w-full min-w-[10rem] items-center gap-3 px-4 py-3 text-left transition-all duration-200 border rounded-md ${
                    on ? "bg-card border-border shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50"
                  }`}
                  style={on ? { borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` } : undefined}
                >
                  <Icon
                    name={m.icon}
                    size={18}
                    className="shrink-0 transition-colors duration-200"
                    style={{ color: on ? accent : "currentColor" }}
                  />
                  <span
                    className={`font-medium truncate transition-colors duration-200 ${
                      on ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
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
        <div className="relative overflow-hidden border border-border rounded-lg p-6 sm:p-8 bg-card shadow-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(100% 100% at 100% 0%, ${accent}, transparent 60%)`,
            }}
          />

          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              <span className="hud text-xs uppercase tracking-widest text-muted-foreground">
                {category.name}
              </span>
              <h2 className="display mt-2 text-4xl sm:text-5xl text-foreground">
                {mode.name}
              </h2>
            </div>
            <span
              className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-background border border-border"
              style={{ color: accent, borderColor: `color-mix(in srgb, ${accent} 30%, transparent)` }}
            >
              <Icon name={mode.icon} size={28} />
            </span>
          </div>

          <p className="prose-lede relative mt-6 max-w-xl text-base text-muted-foreground">{mode.blurb}</p>

          <div className="relative mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-6">
            <div>
              <p className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Difficulty
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Meter
                  level={mode.difficulty}
                  accent={accent}
                  label={DIFFICULTY_LABEL[mode.difficulty]}
                />
                <span className="hud text-xs text-foreground font-medium">
                  {DIFFICULTY_LABEL[mode.difficulty]}
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Objective
              </p>
              <p className="mt-2 text-sm text-foreground">{mode.objective}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <section className="border border-border rounded-lg p-6 bg-card">
            <p className="eyebrow flex items-center gap-2 text-primary">
              <Icon name="chest" size={16} />
              Equipment
            </p>
            <ul className="mt-5 space-y-3">
              {mode.equipment.map((e) => (
                <li key={e} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  {e}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-border rounded-lg p-6 bg-card">
            <p className="eyebrow flex items-center gap-2 text-primary">
              <Icon name="shield" size={16} />
              Rules
            </p>
            <ol className="mt-5 space-y-3">
              {mode.rules.map((r, i) => (
                <li key={r} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="hud shrink-0 pt-0.5 text-xs text-primary font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-6 border border-border rounded-lg p-6 bg-card">
          <div className="min-w-[14rem] flex-1">
            <p className="eyebrow text-foreground">Queue for {mode.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Join the network, open the practice hub and pick {category.name} → {mode.name}.
            </p>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[18rem]">
            <CopyIp size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
