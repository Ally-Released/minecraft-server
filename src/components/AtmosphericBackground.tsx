"use client";

import React, { useEffect, useState } from "react";

export default function AtmosphericBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Base deep ocean color */}
      <div className="absolute inset-0 bg-surface-0" />

      {/* SVG Deep Sea Silhouette (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-30">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full object-cover object-bottom"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--color-surface-1)"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Ambient water glow / god rays */}
      <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-cyan-accent/[0.03] blur-[120px]" />
      <div className="absolute top-[20%] -right-[20%] w-[60%] h-[80%] rounded-full bg-gold-accent/[0.02] blur-[150px]" />

      {/* CSS Bubbles */}
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 8 + 4; // 4px to 12px
          const left = Math.random() * 100;
          const duration = Math.random() * 10 + 10; // 10s to 20s
          const delay = Math.random() * -20; // Start at different times
          
          return (
            <div
              key={i}
              className="absolute bottom-[-5%] rounded-full border border-cyan-accent/20 bg-cyan-accent/5"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                animation: `floatUp ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Heavy vignette to draw focus to center and ground the UI */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-surface-0)_100%)] opacity-80" />
      
      {/* Global CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) translateX(20px) scale(1.2);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) translateX(-20px) scale(1.5);
            opacity: 0;
          }
        }
      `}} />
    </div>
  );
}
