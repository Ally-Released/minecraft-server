"use client";

import React, { useState, useCallback } from "react";
import { Shield, Gamepad2, Hammer, MessageSquare, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVER_CONFIG } from "@/lib/config";

const CATEGORIES = [
  { key: "general" as const, label: "General", icon: Shield, description: "Community standards and behavior" },
  { key: "gameplay" as const, label: "Gameplay", icon: Gamepad2, description: "Fair play and game integrity" },
  { key: "building" as const, label: "Building", icon: Hammer, description: "Construction and land rights" },
  { key: "chat" as const, label: "Chat", icon: MessageSquare, description: "Communication guidelines" },
];

export default function Rules() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = useCallback((key: string) => {
    setOpenCategory((prev) => (prev === key ? null : key));
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_CONFIG.ip);
  };

  return (
    <section id="rules" className="relative z-10 py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <p className="text-[11px] font-bold tracking-[0.3em] text-emerald-accent uppercase mb-4">
          Server Rules
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-text-primary mb-4 leading-[0.9]">
          Play fair.<br />Build trust.
        </h2>
        <p className="text-text-secondary text-lg max-w-lg mb-6">
          These rules exist to keep the server enjoyable and fair for everyone. Read them once, respect them always.
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-emerald-accent/40 mb-12" />

        {/* Accordion */}
        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isOpen = openCategory === cat.key;
            const rules = SERVER_CONFIG.rules[cat.key];

            return (
              <div
                key={cat.key}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-surface-1 border-emerald-accent/20 shadow-lg shadow-emerald-accent/5"
                    : "bg-surface-1/50 border-surface-border hover:border-surface-3"
                }`}
              >
                {/* Accordion trigger */}
                <button
                  onClick={() => toggle(cat.key)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`rules-${cat.key}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? "bg-emerald-accent/10" : "bg-surface-2"
                  }`}>
                    <Icon size={20} className={`transition-colors duration-300 ${isOpen ? "text-emerald-accent" : "text-text-muted"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-text-primary">{cat.label}</h3>
                    <p className="text-xs text-text-muted">{cat.description}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-accent" : ""}`}
                  />
                </button>

                {/* Accordion content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`rules-${cat.key}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-surface-border pt-4">
                          <ol className="space-y-3">
                            {rules.map((rule: string, i: number) => (
                              <li key={i} className="flex gap-3 items-start">
                                <span className="shrink-0 w-6 h-6 rounded-md bg-surface-2 flex items-center justify-center text-[10px] font-bold text-text-muted mt-0.5">
                                  {i + 1}
                                </span>
                                <p className="text-sm text-text-secondary leading-relaxed">{rule}</p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-muted text-sm mb-4">Understand the rules?</p>
          <button
            onClick={copyIp}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-accent text-surface-0 font-bold text-sm tracking-wide hover:bg-emerald-dim transition-all duration-200 shadow-[0_0_25px_rgba(45,212,160,0.15)] hover:shadow-[0_0_40px_rgba(45,212,160,0.25)] active:scale-[0.98]"
          >
            Enter the Server →
          </button>
        </div>
      </div>
    </section>
  );
}
