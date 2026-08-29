"use client";

import React, { useEffect, useRef } from "react";
import { Sword, Globe, Hammer, Calendar, Shield, Users } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/config";

const ICON_MAP: Record<string, React.ElementType> = {
  Sword, Globe, Hammer, Calendar, Shield, Users,
};

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = containerRef.current?.querySelectorAll("[data-feature]");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-center text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase mb-4">
          What Awaits You
        </p>
        <h2 className="text-center font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-text-primary mb-16">
          Everything you need. Nothing you don&apos;t.
        </h2>

        {/* Feature grid */}
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SERVER_CONFIG.features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Sword;
            return (
              <div
                key={feature.label}
                data-feature
                className="opacity-0 group flex flex-col items-center text-center p-6 rounded-2xl bg-surface-1/50 border border-surface-border hover:border-emerald-accent/30 hover:bg-surface-2/50 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mb-4 group-hover:bg-emerald-accent/10 transition-colors duration-300">
                  <Icon size={22} className="text-text-muted group-hover:text-emerald-accent transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold text-text-primary mb-1">{feature.label}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
