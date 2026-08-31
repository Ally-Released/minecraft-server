"use client";

import { getItemTextureUrl, type MinecraftItem } from "@/lib/minecraft-items";

export default function MinecraftSlot({
  item,
  size = 48,
  isActive = false,
  onHover,
  onLeave,
  onMouseMove,
  onClick,
}: {
  item?: MinecraftItem | null;
  size?: number;
  isActive?: boolean;
  onHover?: (item: MinecraftItem, e: React.MouseEvent) => void;
  onLeave?: () => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onClick?: (item: MinecraftItem) => void;
}) {
  if (!item) {
    return (
      <div
        className="relative flex items-center justify-center select-none"
        style={{
          width: size,
          height: size,
          backgroundColor: "#8b8b8b",
          boxShadow: "inset 2px 2px 0px #373737, inset -2px -2px 0px #ffffff",
        }}
      />
    );
  }

  const textureUrl = getItemTextureUrl(item);
  const isEnchanted = Boolean(item.enchants && item.enchants.length > 0);

  return (
    <div
      role="button"
      tabIndex={0}
      className={`relative flex items-center justify-center select-none group cursor-pointer transition-transform duration-75 active:scale-95 ${
        isActive ? "ring-2 ring-electric ring-offset-1 ring-offset-[#c6c6c6]" : ""
      }`}
      style={{
        width: size,
        height: size,
        backgroundColor: "#8b8b8b",
        boxShadow: isActive
          ? "inset 2px 2px 0px #ffffff, inset -2px -2px 0px #373737"
          : "inset 2px 2px 0px #373737, inset -2px -2px 0px #ffffff",
      }}
      onMouseEnter={(e) => onHover?.(item, e)}
      onMouseLeave={() => onLeave?.()}
      onMouseMove={(e) => onMouseMove?.(e)}
      onClick={() => onClick?.(item)}
    >
      {/* Vanilla Slot Hover Overlay */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors pointer-events-none" />

      {/* Item Sprite */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={textureUrl}
        alt={item.name}
        width={32}
        height={32}
        className={`w-8 h-8 pointer-events-none transition-transform duration-100 group-hover:scale-110 ${
          isEnchanted ? "drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]" : ""
        }`}
        style={{
          imageRendering: "pixelated",
        }}
        loading="lazy"
      />

      {/* Stack Count in Bottom Right */}
      {item.count && item.count > 1 && (
        <span
          className="absolute bottom-0.5 right-1 font-mono text-[11px] font-extrabold leading-none text-white pointer-events-none select-none"
          style={{
            textShadow: "1px 1px 0px #3f3f3f, 2px 2px 0px #000000",
          }}
        >
          {item.count}
        </span>
      )}
    </div>
  );
}
