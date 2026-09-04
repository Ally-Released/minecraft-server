import { isPlaced, rankTone } from "@/lib/leaderboard";

export function RankBadge({
  division,
  size = "md",
}: {
  division?: string | null;
  size?: "sm" | "md";
}) {
  const placed = isPlaced(division);
  const label = placed ? division!.toUpperCase() : "UNRATED";
  const tone = rankTone(division);
  const compact = size === "sm";

  if (!placed) {
    return (
      <span
        className={`inline-flex items-center font-bold uppercase leading-none text-lb-low border border-lb-line-strong ${
          compact ? "px-1.5 py-0.5 text-[10.5px]" : "px-2 py-1 text-[12px]"
        }`}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-bold uppercase leading-none ${
        compact ? "px-1.5 py-0.5 text-[10.5px]" : "px-2 py-1 text-[12px]"
      }`}
      style={{ background: tone.bg, color: tone.fg }}
    >
      {label}
    </span>
  );
}
