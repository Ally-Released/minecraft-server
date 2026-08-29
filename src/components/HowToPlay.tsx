"use client";

import React, { useState, useEffect, useRef } from "react";
import { Gamepad2, MonitorSmartphone, ServerCog, Rocket, Copy, Check } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/config";

const STEPS = [
  {
    icon: Gamepad2,
    title: "Get Minecraft",
    description: `You need Minecraft ${SERVER_CONFIG.editions.join(" or ")} Edition. Any recent version (${SERVER_CONFIG.version}) works.`,
  },
  {
    icon: MonitorSmartphone,
    title: "Open Multiplayer",
    description: "Launch the game and navigate to the Multiplayer menu. Click \"Add Server\" to enter the server details.",
  },
  {
    icon: ServerCog,
    title: "Add the Server",
    description: `Enter the server address and port. Bedrock players use port ${SERVER_CONFIG.port}.`,
    hasIp: true,
  },
  {
    icon: Rocket,
    title: "Join the Adventure",
    description: "Save the server, select it from your list, and click Join. Welcome to the world.",
    isFinal: true,
  },
];

export default function HowToPlay() {
  const [copied, setCopied] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_CONFIG.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const steps = stepsRef.current?.querySelectorAll("[data-step]");
    steps?.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-to-play" className="relative z-10 py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <p className="text-[11px] font-bold tracking-[0.3em] text-cyan-accent uppercase mb-4">
          Getting Started
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-text-primary mb-4 leading-[0.9]">
          Join in<br />minutes.
        </h2>
        <p className="text-text-secondary text-lg max-w-lg mb-20">
          Four steps between you and the world. No mods, no launchers, no complications.
        </p>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-accent/40 via-surface-border to-transparent" />

          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  data-step
                  className="opacity-0 relative flex gap-6 md:gap-8 items-start"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {/* Step indicator */}
                  <div className="relative z-10 shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-surface-1 border border-surface-border flex items-center justify-center">
                    <Icon size={24} className="text-cyan-accent" />
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-10">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-lg">
                      {step.description}
                    </p>

                    {/* IP copy for step 3 */}
                    {step.hasIp && (
                      <div className="mt-4 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-1 border border-surface-border">
                        <code className="text-cyan-accent font-mono font-bold">
                          {SERVER_CONFIG.ip}
                        </code>
                        <button
                          onClick={copyIp}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-accent/10 text-cyan-accent text-xs font-bold hover:bg-cyan-accent/20 transition-colors"
                          aria-label="Copy server IP"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? "Copied!" : "Copy IP"}
                        </button>
                      </div>
                    )}

                    {/* Final CTA for step 4 */}
                    {step.isFinal && (
                      <button
                        onClick={copyIp}
                        className="mt-6 px-8 py-3.5 rounded-xl bg-cyan-accent text-surface-0 font-bold text-sm tracking-wide hover:bg-cyan-dim transition-all duration-200 shadow-[0_0_25px_rgba(45,212,160,0.15)] hover:shadow-[0_0_40px_rgba(45,212,160,0.25)] active:scale-[0.98]"
                      >
                        Copy IP &amp; Join →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
