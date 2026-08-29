"use client";

import { useState } from "react";
import { RARITY, price, type Catalogue } from "@/lib/store";
import Icon from "@/components/ui/Icon";
import { Availability } from "./Bits";

/**
 * The whole ladder on one screen.
 *
 * Six product pages nobody opens is worse UX than one table everybody reads —
 * this is the fastest way for a player to work out which tier is worth it.
 * Pin a column to keep a candidate rank lit while scanning the rows.
 */
export default function RankComparison({ catalogue }: { catalogue: Catalogue }) {
  const [pinned, setPinned] = useState(
    Math.max(catalogue.ranks.findIndex((r) => r.badge), 0)
  );

  const groups = [...new Set(catalogue.compare.map((r) => r.group))];

  return (
    <div className="scroll-x -mx-5 px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">
          {catalogue.name} rank comparison. Select a column to highlight a rank.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 bg-abyss pb-4 pr-6 align-bottom">
              <span className="eyebrow">Perk</span>
            </th>
            {catalogue.ranks.map((rank, i) => {
              const r = RARITY[rank.rarity];
              const on = i === pinned;
              return (
                <th key={rank.id} scope="col" className="px-2 pb-4 align-bottom">
                  <button
                    type="button"
                    onClick={() => setPinned(i)}
                    aria-pressed={on}
                    className="group flex w-full flex-col items-center gap-1.5"
                  >
                    <span
                      className="h-1 w-full transition-opacity duration-300"
                      style={{ background: r.accent, opacity: on ? 1 : 0.25 }}
                    />
                    <span
                      className={`display-tight mt-1 text-[0.95rem] leading-none transition-colors duration-300 ${
                        on ? "text-paper" : "text-ink-2 group-hover:text-ice"
                      }`}
                    >
                      {rank.name}
                    </span>
                    <span className="hud text-[0.6rem] tracking-[0.14em] text-ink-3">
                      {price(rank.price)}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>

        {groups.map((group) => (
          <tbody key={group}>
            <tr>
              <th
                scope="colgroup"
                colSpan={catalogue.ranks.length + 1}
                className="sticky left-0 bg-abyss pb-2 pt-7 text-left"
              >
                <span className="hud text-[0.58rem] uppercase tracking-[0.3em] text-steel">
                  {group}
                </span>
              </th>
            </tr>
            {catalogue.compare
              .filter((row) => row.group === group)
              .map((row) => (
                <tr key={row.label} className="border-t border-hair/60">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-abyss py-3 pr-6 text-left font-normal"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={row.icon} size={15} className="shrink-0 text-steel" />
                      <span className="whitespace-nowrap text-[0.86rem] text-ink-2">
                        {row.label}
                      </span>
                    </span>
                  </th>
                  {row.values.map((value, i) => {
                    const r = RARITY[catalogue.ranks[i].rarity];
                    const on = i === pinned;
                    return (
                      <td
                        key={i}
                        className="px-2 py-3 text-center transition-colors duration-300"
                        style={{
                          background: on
                            ? `color-mix(in srgb, ${r.accent} 8%, transparent)`
                            : undefined,
                        }}
                      >
                        {value === true ? (
                          <span className="inline-flex justify-center">
                            <Availability on accent={on ? r.accent : "var(--color-ice)"} />
                          </span>
                        ) : value === null ? (
                          <span className="inline-flex justify-center">
                            <Availability on={false} />
                          </span>
                        ) : typeof value === "string" && value.startsWith("/") ? (
                          <code className="hud whitespace-nowrap text-[0.72rem] text-ice">
                            {value}
                          </code>
                        ) : (
                          <span
                            className="display-tight text-[1.05rem] leading-none"
                            style={{ color: on ? r.accent : "var(--color-paper)" }}
                          >
                            {value}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
