"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { MONOLITH, ridge, stars, treeline } from "@/lib/terrain";
import Motes from "./Motes";

/* Generated once per module load — deterministic, so SSR and hydration agree. */
const FAR = ridge({ seed: 20481, height: 600, block: 22, amplitude: 0.46, base: 0.62, octaves: 5, cliffs: 0.05 });
const MID = ridge({ seed: 71209, height: 600, block: 18, amplitude: 0.38, base: 0.7, octaves: 4, cliffs: 0.09 });
const NEAR = ridge({ seed: 33117, height: 600, block: 26, amplitude: 0.3, base: 0.78, octaves: 3, cliffs: 0.12 });
const TREES = treeline({ seed: 90210, height: 240, block: 11, density: 0.82 });
const STARS = stars(4242, 90);

/** Horizontal position of the only light source in this world. */
const LIGHT_X = 68; // %

function depth(x: number): CSSProperties {
  return {
    transform: `translate3d(calc(var(--px, 0) * ${x}px), calc(var(--py, 0) * ${(x * 0.4).toFixed(2)}px), 0)`,
    willChange: "transform",
  };
}

export default function WorldScene({
  mode = "hero",
  className = "",
}: {
  mode?: "hero" | "closing";
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const closing = mode === "closing";

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let t = Math.random() * 100;
    let visible = true;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      // The world breathes even when the pointer is still.
      t += 0.0035;
      const driftX = Math.sin(t) * 0.26;
      const driftY = Math.cos(t * 0.73) * 0.16;
      curX += (targetX * 0.7 + driftX - curX) * 0.04;
      curY += (targetY * 0.7 + driftY - curY) * 0.04;
      el.style.setProperty("--px", curX.toFixed(4));
      el.style.setProperty("--py", curY.toFixed(4));
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      <div className={`absolute inset-0 ${closing ? "scale-x-[-1]" : ""}`}>
        {/* ── Sky ─────────────────────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(120% 78% at ${LIGHT_X}% 62%, rgba(45,120,205,${closing ? 0.4 : 0.28}) 0%, rgba(10,34,70,0.18) 32%, transparent 62%),
              radial-gradient(85% 55% at 22% 8%, rgba(20,64,111,0.28) 0%, transparent 60%),
              linear-gradient(180deg, #01040c 0%, #020714 34%, #041028 62%, #061834 84%, #08203f 100%)
            `,
          }}
        />

        {/* Stars */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={depth(5)}
        >
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r * 0.08}
              fill="#dbecff"
              opacity={s.o}
              style={{ animation: `halo-breathe ${5 + (i % 5)}s ease-in-out ${s.delay}s infinite` }}
            />
          ))}
        </svg>

        {/* Moon */}
        <div className="absolute left-[14%] top-[13%]" style={depth(9)}>
          <div className="relative">
            <div className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(150,200,255,0.22),transparent_68%)] blur-xl" />
            <div className="h-14 w-14 rounded-full bg-[radial-gradient(circle_at_34%_30%,#f2f8ff,#a9c8ec_58%,#5f86b5)] shadow-[0_0_60px_rgba(160,205,255,0.35)] sm:h-16 sm:w-16" />
          </div>
        </div>

        {/* ── Far range ───────────────────────────────────────── */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[58%] w-full opacity-70 blur-[2.5px]"
          viewBox="0 0 1600 600"
          preserveAspectRatio="xMidYMax slice"
          style={depth(11)}
        >
          <defs>
            <linearGradient id="farFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c2444" />
              <stop offset="100%" stopColor="#05101f" />
            </linearGradient>
            <radialGradient id="farRim" cx={`${LIGHT_X}%`} cy="30%" r="46%">
              <stop offset="0%" stopColor="#7fd4ff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7fd4ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={FAR.fill} fill="url(#farFill)" />
          <path d={FAR.line} fill="none" stroke="url(#farRim)" strokeWidth="3" />
        </svg>

        {/* ── The structure + its light ───────────────────────── */}
        <div
          className="absolute bottom-[34%] h-[46%] w-[26%] max-w-[420px] min-w-[190px] -translate-x-1/2"
          style={{ ...depth(16), left: `${LIGHT_X}%` }}
        >
          {/* volumetric shaft */}
          <div className="absolute bottom-[62%] left-1/2 h-[190vh] w-[38%] -translate-x-1/2 origin-bottom">
            <div
              className="animate-beacon absolute inset-0 blur-[14px]"
              style={{
                background:
                  "linear-gradient(to top, rgba(134,229,255,0.5), rgba(77,163,255,0.16) 38%, transparent 82%)",
                clipPath: "polygon(38% 100%, 62% 100%, 96% 0%, 4% 0%)",
              }}
            />
            <div
              className="animate-beacon absolute inset-x-[42%] bottom-0 top-0 blur-[3px]"
              style={{
                background:
                  "linear-gradient(to top, rgba(198,244,255,0.9), rgba(134,229,255,0.4) 30%, transparent 72%)",
                animationDelay: "-2s",
              }}
            />
          </div>

          {/* ground halo */}
          <div className="animate-halo absolute -inset-x-[70%] bottom-[-14%] h-[62%] rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(77,163,255,0.42),transparent_70%)] blur-2xl" />

          <svg viewBox="0 0 200 340" className="relative h-full w-full" preserveAspectRatio="xMidYMax meet">
            <defs>
              <linearGradient id="towerFill" x1="0" y1="0" x2="1" y2="0.4">
                <stop offset="0%" stopColor="#020a16" />
                <stop offset="62%" stopColor="#061a33" />
                <stop offset="100%" stopColor="#0e3159" />
              </linearGradient>
            </defs>
            {MONOLITH.wings.map((d, i) => (
              <path key={i} d={d} fill="#020b17" />
            ))}
            <path d={MONOLITH.body} fill="url(#towerFill)" />
            {/* edge turned toward the beam */}
            <path
              d={MONOLITH.body}
              fill="none"
              stroke="#8fdcff"
              strokeWidth="1.4"
              opacity="0.5"
              strokeDasharray="1 0"
            />
            {MONOLITH.windows.map(([x, y, w, h], i) => (
              <rect
                key={i}
                x={x}
                y={y}
                width={w}
                height={h}
                fill="#9fe6ff"
                opacity={0.5 + (i % 3) * 0.16}
                style={{ animation: `halo-breathe ${4 + (i % 4)}s ease-in-out ${i * 0.6}s infinite` }}
              />
            ))}
          </svg>
        </div>

        {/* ── Mid range ───────────────────────────────────────── */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[42%] w-full"
          viewBox="0 0 1600 600"
          preserveAspectRatio="xMidYMax slice"
          style={depth(27)}
        >
          <defs>
            <linearGradient id="midFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#061527" />
              <stop offset="100%" stopColor="#020a15" />
            </linearGradient>
            <radialGradient id="midRim" cx={`${LIGHT_X}%`} cy="34%" r="40%">
              <stop offset="0%" stopColor="#b6ecff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4da3ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={MID.fill} fill="url(#midFill)" />
          <path d={MID.line} fill="none" stroke="url(#midRim)" strokeWidth="3.5" />
        </svg>

        {/* Valley mist */}
        <div
          className="animate-mist absolute inset-x-[-30%] bottom-[24%] h-[16%] opacity-55 blur-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(63,130,200,0.28) 22%, rgba(120,190,240,0.14) 52%, rgba(63,130,200,0.24) 78%, transparent)",
          }}
        />

        {/* ── Near range + treeline ───────────────────────────── */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[27%] w-full"
          viewBox="0 0 1600 600"
          preserveAspectRatio="xMidYMax slice"
          style={depth(46)}
        >
          <defs>
            <radialGradient id="nearRim" cx={`${LIGHT_X}%`} cy="28%" r="34%">
              <stop offset="0%" stopColor="#7fd4ff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#7fd4ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={NEAR.fill} fill="#010810" />
          <path d={NEAR.line} fill="none" stroke="url(#nearRim)" strokeWidth="4" />
        </svg>

        <svg
          className="absolute inset-x-0 bottom-0 h-[17%] w-full"
          viewBox="0 0 1600 240"
          preserveAspectRatio="xMidYMax slice"
          style={depth(62)}
        >
          <path d={TREES} fill="#00050c" />
        </svg>

        {/* Low mist, in front of the trees */}
        <div
          className="animate-mist-slow absolute inset-x-[-30%] bottom-[3%] h-[13%] opacity-45 blur-3xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(90,160,220,0.3) 30%, rgba(150,215,255,0.16) 60%, transparent)",
          }}
        />

        {/* ── Foreground outcrops — the camera is behind something ─ */}
        <div className="absolute inset-x-0 bottom-0 h-[34%]" style={depth(96)}>
          <svg
            className="absolute bottom-0 left-[-6%] h-full w-[46%] blur-[9px]"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMinYMax meet"
          >
            <path
              d="M0,300 L0,120 L54,120 L54,86 L108,86 L108,132 L150,132 L150,170 L196,170 L196,224 L240,224 L240,300 Z"
              fill="#00030a"
            />
          </svg>
          <svg
            className="absolute bottom-0 right-[-8%] h-[88%] w-[40%] blur-[11px]"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMaxYMax meet"
          >
            <path
              d="M400,300 L400,140 L340,140 L340,104 L286,104 L286,158 L232,158 L232,206 L182,206 L182,300 Z"
              fill="#00030a"
            />
          </svg>
        </div>
      </div>

      {/* ── Air ──────────────────────────────────────────────── */}
      <Motes count={closing ? 34 : 52} className="absolute inset-0 h-full w-full" />

      {/* ── Grade ────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(140% 105% at 50% 42%, transparent 42%, rgba(1,4,12,0.55) 78%, rgba(1,4,12,0.92) 100%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-abyss" />
    </div>
  );
}
