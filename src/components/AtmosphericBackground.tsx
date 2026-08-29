"use client";

export default function AtmosphericBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1 to-surface-0" />

      {/* Subtle radial glow at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-emerald-accent/[0.03] rounded-full blur-[120px]" />

      {/* Fog layers */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='fog' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='white' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1440' height='300' fill='url(%23fog)'/%3E%3C/svg%3E")`,
            animation: "drift-left 60s linear infinite",
          }}
        />
      </div>

      {/* Terrain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] opacity-[0.06]">
        <svg
          viewBox="0 0 1440 120"
          fill="currentColor"
          className="absolute bottom-0 w-full h-full text-emerald-accent"
          preserveAspectRatio="none"
        >
          <path d="M0,120 L0,80 L40,80 L40,60 L80,60 L80,70 L120,70 L120,50 L160,50 L160,40 L200,40 L200,55 L240,55 L240,45 L280,45 L280,65 L320,65 L320,35 L360,35 L360,30 L400,30 L400,50 L440,50 L440,60 L480,60 L480,45 L520,45 L520,55 L560,55 L560,40 L600,40 L600,25 L640,25 L640,35 L680,35 L680,50 L720,50 L720,60 L760,60 L760,45 L800,45 L800,55 L840,55 L840,35 L880,35 L880,45 L920,45 L920,55 L960,55 L960,40 L1000,40 L1000,50 L1040,50 L1040,65 L1080,65 L1080,55 L1120,55 L1120,45 L1160,45 L1160,60 L1200,60 L1200,70 L1240,70 L1240,50 L1280,50 L1280,40 L1320,40 L1320,55 L1360,55 L1360,65 L1400,65 L1400,75 L1440,75 L1440,120 Z" />
        </svg>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-emerald-accent/30"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            animation: `particle-float ${15 + Math.random() * 25}s linear infinite`,
            animationDelay: `${Math.random() * 15}s`,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)",
        }}
      />
    </div>
  );
}
