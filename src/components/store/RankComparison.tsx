"use client";

import { useState } from "react";
import { RARITY, price, type Catalogue } from "@/lib/store";
import { Availability } from "./Bits";

export default function RankComparison({ catalogue }: { catalogue: Catalogue }) {
  const [pinned, setPinned] = useState(
    Math.max(catalogue.ranks.findIndex((r) => r.badge), 0)
  );

  const groups = [...new Set(catalogue.compare.map((r) => r.group))];

  return (
    <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">
          {catalogue.name} rank comparison. Select a column to highlight a rank.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 bg-background pb-4 pr-6 align-bottom border-b border-border">
              <span className="eyebrow text-primary">Perk</span>
            </th>
            {catalogue.ranks.map((rank, i) => {
              const r = RARITY[rank.rarity];
              const on = i === pinned;
              return (
                <th key={rank.id} scope="col" className="px-2 pb-4 align-bottom border-b border-border">
                  <button
                    type="button"
                    onClick={() => setPinned(i)}
                    aria-pressed={on}
                    className="group flex w-full flex-col items-center gap-2"
                  >
                    <span
                      className="h-1.5 w-full rounded-full transition-opacity duration-200"
                      style={{ background: r.accent, opacity: on ? 1 : 0.2 }}
                    />
                    <span
                      className={`display-tight mt-1 text-base leading-none transition-colors duration-200 ${
                        on ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {rank.name}
                    </span>
                    <span className="hud text-[0.65rem] tracking-widest text-muted-foreground">
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
                className="sticky left-0 bg-background pb-3 pt-8 text-left"
              >
                <span className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  {group}
                </span>
              </th>
            </tr>
            {catalogue.compare
              .filter((row) => row.group === group)
              .map((row) => (
                <tr key={row.label} className="border-t border-border/50">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-background py-4 pr-6 text-left font-normal"
                  >
                    <span className="flex items-center gap-3">
                      <span className="whitespace-nowrap text-sm text-muted-foreground">
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
                        className="px-2 py-4 text-center transition-colors duration-200"
                        style={{
                          background: on
                            ? `color-mix(in srgb, ${r.accent} 10%, transparent)`
                            : undefined,
                        }}
                      >
                        {value === true ? (
                          <span className="inline-flex justify-center">
                            <Availability on accent={on ? r.accent : "currentColor"} />
                          </span>
                        ) : value === null ? (
                          <span className="inline-flex justify-center">
                            <Availability on={false} />
                          </span>
                        ) : typeof value === "string" && value.startsWith("/") ? (
                          <code className="hud whitespace-nowrap text-xs text-muted-foreground">
                            {value}
                          </code>
                        ) : (
                          <span
                            className="display-tight text-base leading-none"
                            style={{ color: on ? r.accent : "currentColor" }}
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
