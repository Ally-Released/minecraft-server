"use client";

import { useEffect, useRef, useState } from "react";

interface PlayerAvatarProps {
  username: string;
  skinUrl?: string;
  size?: number;
  mode?: "cube" | "face";
  className?: string;
  alt?: string;
}

// In-memory cache for rendered avatar data URLs so we never re-render the same skin
const avatarCache = new Map<string, string>();

/**
 * Extracts and renders a 2.5D isometric head cube or 2D front face from any
 * Minecraft skin texture (including cracked/TLauncher/SkinsRestorer skins).
 */
export function PlayerAvatar({
  username,
  skinUrl,
  size = 64,
  mode = "cube",
  className = "",
  alt,
}: PlayerAvatarProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const cacheKey = `${username.toLowerCase()}:${skinUrl || ""}:${size}:${mode}`;
    const cached = avatarCache.get(cacheKey);
    if (cached) {
      setDataUrl(cached);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";

    const skinEndpoint = skinUrl
      ? `/api/skin/${encodeURIComponent(username)}?url=${encodeURIComponent(skinUrl)}`
      : `/api/skin/${encodeURIComponent(username)}`;

    img.onload = () => {
      if (!isMounted) return;

      try {
        const rendered = renderHead(img, size, mode);
        avatarCache.set(cacheKey, rendered);
        setDataUrl(rendered);
      } catch (err) {
        console.error("Failed to render player head avatar:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    img.onerror = () => {
      if (!isMounted) return;
      // Fallback to Crafthead if custom skin fails to load
      const fallbackUrl = `https://crafthead.net/${mode === "cube" ? "cube" : "avatar"}/${encodeURIComponent(username)}/${size}`;
      setDataUrl(fallbackUrl);
      setLoading(false);
    };

    img.src = skinEndpoint;

    return () => {
      isMounted = false;
    };
  }, [username, skinUrl, size, mode]);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dataUrl}
          alt={alt || username}
          width={size}
          height={size}
          className="w-full h-full object-contain [image-rendering:pixelated] select-none"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-white/5 animate-pulse rounded" />
      )}
    </div>
  );
}

/**
 * Renders an isometric 3D head cube or a 2D composite face with hair/hat overlay onto a 2D Canvas.
 */
function renderHead(skin: HTMLImageElement, targetSize: number, mode: "cube" | "face"): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Output higher resolution for crisp display
  const scale = 4; // High DPI
  const canvasSize = targetSize * scale;
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  ctx.imageSmoothingEnabled = false;

  if (mode === "face") {
    // 2D Front Face with Hat / Hair overlay
    // 1. Base Face: sx=8, sy=8, sw=8, sh=8
    ctx.drawImage(skin, 8, 8, 8, 8, 0, 0, canvasSize, canvasSize);
    // 2. Hat / Hair Layer: sx=40, sy=8, sw=8, sh=8
    ctx.drawImage(skin, 40, 8, 8, 8, 0, 0, canvasSize, canvasSize);
  } else {
    // Isometric 3D Cube Head (matching Crafthead / Namemc cube)
    const patch = document.createElement("canvas");
    patch.width = 8;
    patch.height = 8;
    const pCtx = patch.getContext("2d")!;
    pCtx.imageSmoothingEnabled = false;

    const getFacePatch = (bx: number, by: number, hx: number, hy: number): HTMLCanvasElement => {
      pCtx.clearRect(0, 0, 8, 8);
      // Base layer
      pCtx.drawImage(skin, bx, by, 8, 8, 0, 0, 8, 8);
      // Hat / hair layer overlay
      pCtx.drawImage(skin, hx, hy, 8, 8, 0, 0, 8, 8);
      const copy = document.createElement("canvas");
      copy.width = 8;
      copy.height = 8;
      const cCtx = copy.getContext("2d")!;
      cCtx.imageSmoothingEnabled = false;
      cCtx.drawImage(patch, 0, 0);
      return copy;
    };

    const frontPatch = getFacePatch(8, 8, 40, 8);
    const sidePatch = getFacePatch(16, 8, 48, 8);
    const topPatch = getFacePatch(8, 0, 40, 0);

    // Cube projection parameters
    // Center intersection of the 3 faces
    const cx = canvasSize * 0.5;
    const cy = canvasSize * 0.52;
    const r = canvasSize * 0.44; // Edge length
    const rH = r * 0.866025; // cos(30 deg) * r
    const rV = r * 0.5; // sin(30 deg) * r

    // 1. FRONT FACE (Viewer's left, 88% brightness)
    ctx.save();
    ctx.setTransform(rH / 8, rV / 8, 0, r / 8, cx - rH, cy - rV);
    ctx.drawImage(frontPatch, 0, 0, 8, 8);
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, 8, 8);
    ctx.restore();

    // 2. SIDE FACE (Viewer's right, 72% brightness)
    ctx.save();
    ctx.setTransform(rH / 8, -rV / 8, 0, r / 8, cx, cy);
    ctx.drawImage(sidePatch, 0, 0, 8, 8);
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.fillRect(0, 0, 8, 8);
    ctx.restore();

    // 3. TOP FACE (Facing up, 100% brightness)
    ctx.save();
    ctx.setTransform(rH / 8, rV / 8, -rH / 8, rV / 8, cx, cy - 2 * rV);
    ctx.drawImage(topPatch, 0, 0, 8, 8);
    ctx.restore();
  }

  return canvas.toDataURL("image/png");
}
