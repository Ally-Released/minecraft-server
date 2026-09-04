import { climbDetail, climbHeadline, climbProgress, rankTone } from "@/lib/leaderboard";

export function ClimbMeter({
  division,
  lp,
  placementPlayed = 0,
  compact = false,
}: {
  division?: string | null;
  lp?: number;
  placementPlayed?: number;
  compact?: boolean;
}) {
  const state = climbProgress(division, lp ?? 0, placementPlayed);
  const tone = rankTone(division);
  const fill =
    state.kind === "apex"
      ? "#ffc53f"
      : state.kind === "placement"
        ? "#e7c163"
        : tone.bar;

  return (
    <div className={compact ? "" : "space-y-2"}>
      <div className="flex items-baseline justify-between gap-3">
        <div className={`font-bold text-lb-hi ${compact ? "text-[13px]" : "text-[15px]"}`}>
          {climbHeadline(state)}
        </div>
        {state.kind === "climb" || state.kind === "gate" || state.kind === "apex" ? (
          <div className="lb-stat text-[12px] text-lb-brand">{Math.round(state.progress * 100)}%</div>
        ) : (
          <div className="lb-stat text-[12px] text-lb-brand">
            {state.played}/{state.needed}
          </div>
        )}
      </div>
      <div className="lb-climb-track" aria-hidden>
        <div className="lb-climb-fill" style={{ width: `${Math.max(2, state.progress * 100)}%`, background: fill }} />
      </div>
      {!compact && <p className="text-[12.5px] leading-relaxed text-lb-mid">{climbDetail(state)}</p>}
    </div>
  );
}
