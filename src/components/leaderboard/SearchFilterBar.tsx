"use client";

import { KIT_GROUPS, KITS, LeaderboardView, modeLabel } from "@/lib/leaderboard";
import { KitIcon } from "@/components/leaderboard/KitIcon";

interface SearchFilterBarProps {
  activeView: LeaderboardView;
  onViewChange: (view: LeaderboardView) => void;
}

const PILL_ORDER: LeaderboardView[] = [
  "overall",
  "hours",
  ...KIT_GROUPS.flatMap((group) => group.ids),
];

function Pill({
  id,
  active,
  onClick,
}: {
  id: LeaderboardView;
  active: boolean;
  onClick: () => void;
}) {
  const label = modeLabel(id);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-2 rounded-full pl-3 pr-5 h-12 text-[15px] font-bold transition-all ${
        active
          ? "bg-lb-brand text-lb-brand-on shadow-[0_8px_18px_-8px_rgba(245,166,35,0.65)]"
          : "bg-white/5 text-lb-mid hover:text-lb-hi hover:bg-white/10 border border-lb-line"
      }`}
    >
      {id === "overall" ? (
        <KitIcon id="overall" size={18} className={active ? "text-lb-brand-on" : "text-lb-brand"} />
      ) : (
        <KitIcon id={id} size={18} className={active ? "text-lb-brand-on" : "text-lb-brand"} />
      )}
      {label}
    </button>
  );
}

export function SearchFilterBar({ activeView, onViewChange }: SearchFilterBarProps) {
  const unique = Array.from(new Set(PILL_ORDER));
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 hide-scrollbar">
      {unique.map((id) => {
        if (id !== "overall" && id !== "hours" && !KITS.some((kit) => kit.id === id)) return null;
        return (
          <Pill key={id} id={id} active={activeView === id} onClick={() => onViewChange(id)} />
        );
      })}
    </div>
  );
}
