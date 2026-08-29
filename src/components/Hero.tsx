"use client";

import React, { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/config";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_CONFIG.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Subtle parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: x * 20, y: y * 15 });
    };

    const hero = heroRef.current;
    if (hero) hero.addEventListener("mousemove", handleMouseMove);
    return () => { if (hero) hero.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/cn_hero_bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center scale-110 transition-transform duration-[2000ms] ease-out"
          style={{ transform: `scale(1.1) translate(${mousePos.x}px, ${mousePos.y}px)` }}
        />
        {/* Heavy overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/70 via-surface-0/50 to-surface-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-0/60 via-transparent to-surface-0/60" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-surface-0 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2/60 border border-surface-border backdrop-blur-sm mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-accent" />
          </span>
          <span className="text-xs font-bold tracking-[0.15em] text-emerald-accent uppercase">
            Server Online
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] text-text-primary mb-6 drop-shadow-2xl tracking-tight">
          Your World.
          <br />
          <span className="text-emerald-accent">Your Adventure.</span>
        </h1>

        {/* Subtext */}
        <p className="text-text-secondary text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
          {SERVER_CONFIG.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <button
            onClick={copyIp}
            className="group relative px-10 py-4 rounded-xl bg-emerald-accent text-surface-0 font-bold text-lg tracking-wide hover:bg-emerald-dim transition-all duration-200 shadow-[0_0_30px_rgba(45,212,160,0.2)] hover:shadow-[0_0_50px_rgba(45,212,160,0.3)] active:scale-[0.98]"
          >
            {copied ? "IP Copied!" : "Play Now"}
          </button>
          <a
            href={SERVER_CONFIG.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-xl border border-surface-border text-text-primary font-semibold text-lg hover:bg-surface-2/50 hover:border-surface-3 transition-all duration-200"
          >
            Join Discord
          </a>
        </div>

        {/* Server IP component */}
        <div className="relative group">
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-surface-1/80 border border-surface-border backdrop-blur-sm">
            <span className="text-text-muted text-sm font-medium tracking-wider uppercase">
              Server IP
            </span>
            <span className="w-px h-4 bg-surface-border" />
            <code className="text-emerald-accent font-mono font-bold text-lg tracking-tight">
              {SERVER_CONFIG.ip}
            </code>
            <button
              onClick={copyIp}
              className="ml-2 p-2 rounded-lg hover:bg-surface-2 transition-colors"
              aria-label="Copy server IP"
            >
              {copied ? (
                <Check size={16} className="text-emerald-accent" />
              ) : (
                <Copy size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
              )}
            </button>
          </div>

          {/* Copy success tooltip */}
          <div
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-emerald-accent text-surface-0 text-xs font-bold transition-all duration-200 ${
              copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            Copied to clipboard!
          </div>
        </div>

        {/* Compact server info */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden border border-surface-border bg-surface-border">
          {[
            { label: "Version", value: SERVER_CONFIG.version },
            { label: "Port", value: SERVER_CONFIG.port },
            { label: "Editions", value: SERVER_CONFIG.editions.join(" & ") },
            { label: "Accounts", value: SERVER_CONFIG.accounts },
          ].map((item) => (
            <div key={item.label} className="bg-surface-1/80 backdrop-blur-sm px-6 py-4 text-center">
              <p className="text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-1">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
