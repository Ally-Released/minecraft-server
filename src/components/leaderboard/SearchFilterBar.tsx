"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { KIT_GROUPS, KITS, LeaderboardView, modeLabel } from "@/lib/leaderboard";
import { KitIcon } from "@/components/leaderboard/KitIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active && buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-2 rounded-full pl-3.5 pr-5 h-11 text-[14px] font-bold transition-all duration-200 select-none ${
        active
          ? "bg-lb-brand text-lb-brand-on shadow-[0_4px_20px_-4px_rgba(231,193,99,0.5)] scale-[1.02]"
          : "bg-lb-surface/90 text-lb-mid hover:text-lb-hi hover:bg-lb-card2/90 border border-white/5 hover:border-white/15"
      }`}
    >
      <KitIcon
        id={id === "overall" || id === "hours" ? id : id}
        size={17}
        className={active ? "text-lb-brand-on" : "text-lb-brand"}
      />
      <span>{label}</span>
    </button>
  );
}

export function SearchFilterBar({ activeView, onViewChange }: SearchFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const unique = Array.from(new Set(PILL_ORDER));

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);

    // Native non-passive wheel event to enable smooth horizontal mouse-wheel scrolling on Windows
    const handleNativeWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleNativeWheel, { passive: false });

    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", handleNativeWheel);
    };
  }, [updateScrollState]);

  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="group/filter relative w-full">
      {/* Left scroll fade & chevron */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-3 z-10 flex w-12 items-center justify-start transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollByAmount(-280)}
          aria-label="Scroll left"
          className="pointer-events-auto ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-lb-surface/95 text-lb-hi shadow-xl backdrop-blur-md transition-transform hover:scale-110 hover:border-lb-brand/50 active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Pill container */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-2.5 overflow-x-auto pb-3 pt-1 px-4 hide-scrollbar scroll-smooth"
      >
        {unique.map((id) => {
          if (id !== "overall" && id !== "hours" && !KITS.some((kit) => kit.id === id)) return null;
          return (
            <Pill
              key={id}
              id={id}
              active={activeView === id}
              onClick={() => onViewChange(id)}
            />
          );
        })}
        {/* Right spacer to ensure the very last item is never clipped */}
        <div className="w-6 shrink-0" aria-hidden="true" />
      </div>

      {/* Right scroll fade & chevron */}
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-3 z-10 flex w-12 items-center justify-end transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollByAmount(280)}
          aria-label="Scroll right"
          className="pointer-events-auto mr-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-lb-surface/95 text-lb-hi shadow-xl backdrop-blur-md transition-transform hover:scale-110 hover:border-lb-brand/50 active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
