"use client";

import { useEffect, useRef } from "react";

/**
 * Airborne motes. One canvas, one rAF loop, no per-particle DOM.
 * Pauses when off-screen or when the tab is hidden.
 */
export default function Motes({
  count = 46,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    type Mote = { x: number; y: number; r: number; vy: number; drift: number; phase: number; a: number };
    let motes: Mote[] = [];

    const seed = () => {
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (0.5 + Math.random() * 1.4) * dpr,
        vy: (0.06 + Math.random() * 0.22) * dpr,
        drift: (0.1 + Math.random() * 0.35) * dpr,
        phase: Math.random() * Math.PI * 2,
        a: 0.15 + Math.random() * 0.5,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      seed();
    };

    let t = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      t += 0.006;
      ctx.clearRect(0, 0, w, h);

      for (const m of motes) {
        m.y -= m.vy;
        m.x += Math.sin(t + m.phase) * m.drift * 0.35;
        if (m.y < -4) {
          m.y = h + 4;
          m.x = Math.random() * w;
        }
        // brighter the higher they climb toward the beacon light
        const lift = 1 - m.y / h;
        ctx.globalAlpha = m.a * (0.35 + lift * 0.75);
        ctx.fillStyle = lift > 0.55 ? "#a8ecff" : "#7fb6ee";
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    resize();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting && !document.hidden;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
