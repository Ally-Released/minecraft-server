"use client";

import { useState, useEffect, useRef } from "react";
import { SURVIVAL_KIT_ITEMS, type MinecraftItem, getItemTextureUrl } from "@/lib/minecraft-items";
import MinecraftSlot from "./MinecraftSlot";

export default function MinecraftInventory({
  rankId,
  title,
}: {
  rankId: string;
  title?: string;
}) {
  const items: MinecraftItem[] = SURVIVAL_KIT_ITEMS[rankId] || [];
  
  // Dynamically compute exact row count needed (2 rows for VIP, 3 rows for higher tiers)
  const rowCount = Math.max(1, Math.ceil(items.length / 9));
  const totalSlots = rowCount * 9;
  const displayItems = Array.from({ length: totalSlots }, (_, i) => items[i] || null);

  const [hoveredItem, setHoveredItem] = useState<MinecraftItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<MinecraftItem | null>(items[0] || null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Update default selected item when rank changes
  useEffect(() => {
    queueMicrotask(() => {
      setSelectedItem(items[0] || null);
      setHoveredItem(null);
      setShowTooltip(false);
    });
  }, [rankId, items]);

  const handleHover = (item: MinecraftItem, e: React.MouseEvent) => {
    setHoveredItem(item);
    setSelectedItem(item);
    setMousePos({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleLeave = () => {
    setHoveredItem(null);
    setShowTooltip(false);
  };

  const activeInspectItem = hoveredItem || selectedItem;

  // Viewport-clamped tooltip coordinates
  const tooltipX = typeof window !== "undefined"
    ? Math.min(mousePos.x + 18, window.innerWidth - 230)
    : mousePos.x + 18;
  const tooltipY = typeof window !== "undefined"
    ? Math.min(Math.max(mousePos.y - 25, 20), window.innerHeight - 130)
    : mousePos.y - 25;

  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <h4 className="hud text-xs uppercase tracking-widest text-foreground font-semibold">
            {title || `${rankId.toUpperCase()} Kit Inventory`}
          </h4>
        </div>
        <span className="text-[11px] text-muted-foreground hud bg-muted/60 px-2 py-0.5 rounded border border-border/50">
          {items.length} items · {rowCount}×9 Grid
        </span>
      </div>

      {/* Outer Premium Container Frame */}
      <div
        className="p-3 sm:p-4 rounded-lg border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#404040] border-r-[#404040] inline-block w-full overflow-hidden shadow-2xl transition-all duration-200"
        style={{
          backgroundColor: "#c6c6c6",
          boxShadow: "0 16px 36px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* Minecraft Container Header Label */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span
            className="text-[12px] font-bold tracking-wider select-none uppercase"
            style={{
              color: "#353535",
              fontFamily: "var(--font-mono), monospace",
              textShadow: "1px 1px 0px rgba(255,255,255,0.7)",
            }}
          >
            {rankId.toUpperCase()} CHEST
          </span>
          <span
            className="text-[10px] font-semibold tracking-wider select-none text-[#505050]"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            {rowCount} × 9 SLOTS
          </span>
        </div>

        {/* Dynamic Grid Slot Well */}
        <div
          className="p-2 border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] bg-[#8b8b8b] overflow-x-auto scrollbar-hide rounded-sm"
        >
          <div className="grid grid-cols-9 gap-1 min-w-[420px] sm:min-w-0">
            {displayItems.map((item, idx) => (
              <MinecraftSlot
                key={idx}
                item={item}
                size={46}
                isActive={selectedItem?.name === item?.name && selectedItem?.id === item?.id}
                onHover={handleHover}
                onMouseMove={handleMouseMove}
                onLeave={handleLeave}
                onClick={(it) => setSelectedItem(it)}
              />
            ))}
          </div>
        </div>

        {/* Live Item Inspector Bar (Below Grid) */}
        {activeInspectItem && (
          <div
            className="mt-3 p-3 rounded border-2 border-t-[#222222] border-l-[#222222] border-b-[#444444] border-r-[#444444] bg-[#0c101c] text-white flex items-center gap-3.5 transition-all duration-150 shadow-inner"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getItemTextureUrl(activeInspectItem)}
              alt={activeInspectItem.name}
              width={36}
              height={36}
              className="w-9 h-9 shrink-0 drop-shadow-[0_0_8px_rgba(77,163,255,0.4)] transition-transform duration-100 group-hover:scale-105"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className="font-bold text-sm text-white tracking-wide"
                  style={{
                    textShadow: "1px 1px 0px #000000",
                  }}
                >
                  {activeInspectItem.name}
                </span>
                {activeInspectItem.count && activeInspectItem.count > 1 && (
                  <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    ×{activeInspectItem.count}
                  </span>
                )}
              </div>

              {activeInspectItem.enchants && activeInspectItem.enchants.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {activeInspectItem.enchants.map((ench) => (
                    <span
                      key={ench}
                      className="text-xs text-[#a5b4fc] bg-[#1e1b4b]/80 px-2 py-0.5 rounded border border-indigo-500/20 font-mono"
                    >
                      {ench}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                  Standard Kit Item · Instant Delivery
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Smooth Non-Clipped Floating Tooltip (Fixed to Viewport) */}
      {showTooltip && hoveredItem && (
        <div
          ref={tooltipRef}
          className="fixed pointer-events-none z-[99999] px-3 py-2 text-left shadow-2xl transition-opacity duration-75 animate-in fade-in zoom-in-95"
          style={{
            left: `${tooltipX}px`,
            top: `${tooltipY}px`,
            backgroundColor: "rgba(12, 4, 20, 0.98)",
            border: "2px solid #2b005f",
            boxShadow: "0 0 0 1.5px #5400ba, 0 12px 28px rgba(0,0,0,0.9)",
            borderRadius: "4px",
            maxWidth: "230px",
          }}
        >
          <div
            className="font-bold text-sm leading-tight tracking-wide text-white"
            style={{
              textShadow: "1px 1px 0px #000000",
            }}
          >
            {hoveredItem.name}
          </div>

          {hoveredItem.enchants && hoveredItem.enchants.length > 0 && (
            <div className="mt-1.5 space-y-0.5 border-t border-[#5400ba]/40 pt-1.5">
              {hoveredItem.enchants.map((ench) => (
                <div
                  key={ench}
                  className="text-xs font-medium"
                  style={{
                    color: "#a5b4fc",
                    textShadow: "1px 1px 0px #000000",
                  }}
                >
                  {ench}
                </div>
              ))}
            </div>
          )}

          {hoveredItem.count && hoveredItem.count > 1 && (
            <div
              className="mt-1.5 text-xs font-mono font-semibold"
              style={{
                color: "#4ade80",
                textShadow: "1px 1px 0px #000000",
              }}
            >
              Count: {hoveredItem.count}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
