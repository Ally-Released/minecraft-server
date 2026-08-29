"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/config";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_CONFIG.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="home" className="relative min-h-screen">
      {/* Wavy Background (WebGL/Canvas) */}
      <div className="absolute inset-0 z-0">
        <WavyBackground 
          colors={["#38bdf8", "#0284c7", "#facc15", "#ca8a04", "#0f172a"]}
          waveWidth={40}
          backgroundFill="#020617"
          blur={10}
          speed="slow"
          waveOpacity={0.6}
        />
        {/* Overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/60 via-transparent to-surface-0" />
      </div>

      <div className="relative z-10 w-full min-h-screen max-w-6xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2/60 border border-surface-border backdrop-blur-sm mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-accent" />
          </span>
          <span className="text-xs font-bold tracking-[0.15em] text-cyan-accent uppercase">
            Server Online
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] text-text-primary mb-6 drop-shadow-2xl tracking-tight">
          Your World.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-accent to-cyan-dim">Your Adventure.</span>
        </h1>

        {/* Subtext */}
        <p className="text-text-secondary text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
          {SERVER_CONFIG.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <button
            onClick={copyIp}
            className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-gold-accent to-gold-dim text-surface-0 font-bold text-lg tracking-wide hover:from-gold-dim hover:to-gold-accent transition-all duration-300 shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:shadow-[0_0_50px_rgba(250,204,21,0.4)] active:scale-[0.98]"
          >
            {copied ? "IP Copied!" : "Play Now"}
          </button>
          <a
            href={SERVER_CONFIG.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-xl border border-surface-border bg-surface-1/50 backdrop-blur-sm text-text-primary font-semibold text-lg hover:bg-surface-2/80 hover:border-surface-3 transition-all duration-200"
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
            <code className="text-cyan-accent font-mono font-bold text-lg tracking-tight">
              {SERVER_CONFIG.ip}
            </code>
            <button
              onClick={copyIp}
              className="ml-2 p-2 rounded-lg hover:bg-surface-2 transition-colors"
              aria-label="Copy server IP"
            >
              {copied ? (
                <Check size={16} className="text-cyan-accent" />
              ) : (
                <Copy size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
              )}
            </button>
          </div>

          {/* Copy success tooltip */}
          <div
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-cyan-accent text-surface-0 text-xs font-bold transition-all duration-200 ${
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
