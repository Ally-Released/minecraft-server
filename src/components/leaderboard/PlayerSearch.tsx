"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { RankBadge } from "@/components/leaderboard/RankBadge";
import { createClient } from "@/utils/supabase/client";
import { mapPlayerRow, type PlayerRow, type PlayerStats } from "@/lib/leaderboard";

export function PlayerSearch({
  onSelect,
  className = "",
}: {
  onSelect: (player: PlayerStats) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<PlayerStats[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      return;
    }
    let cancelled = false;
    const handle = window.setTimeout(async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("game_mode", "overall")
        .ilike("username", `%${q}%`)
        .limit(8);
      if (cancelled) return;
      if (error) {
        console.error("Search failed:", error);
        return;
      }
      setHits(((data ?? []) as PlayerRow[]).map((row) => mapPlayerRow(row)));
      setActive(0);
      setOpen(true);
    }, 160);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [query, supabase]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (player: PlayerStats) => {
    onSelect(player);
    setQuery("");
    setHits([]);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (hits[active]) choose(hits[active]);
        }}
      >
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 text-lb-low" size={15} aria-hidden />
          <input
            type="search"
            role="combobox"
            aria-expanded={open && hits.length > 0}
            aria-autocomplete="list"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => hits.length > 0 && setOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => Math.min(i + 1, Math.max(0, hits.length - 1)));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (event.key === "Escape") {
                setOpen(false);
              }
            }}
            placeholder="Search players…"
            className="h-10 w-52 rounded-full border border-lb-line bg-white/5 pl-9 pr-4 text-[14px] text-lb-hi placeholder:text-lb-low transition-all focus:border-lb-brand/60 focus:bg-white/[0.08] focus:outline-none"
          />
        </div>
      </form>

      {open && query.trim().length >= 2 && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-[12px] border border-lb-line-strong bg-lb-surface shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)]">
          {hits.length === 0 ? (
            <p className="px-3 py-3 text-[13px] text-lb-mid">No players match that name.</p>
          ) : (
            <ul role="listbox">
              {hits.map((player, index) => (
                <li key={player.uuid}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => choose(player)}
                    className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                      index === active ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <PlayerAvatar username={player.username} skinUrl={player.skin_url} size={28} mode="face" />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-bold text-lb-hi">
                      {player.username}
                    </span>
                    <RankBadge division={player.division} size="sm" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
