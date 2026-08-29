"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SERVER_CONFIG, type RuleCategory } from "@/lib/config";
import Action from "@/components/ui/Action";
import Reveal from "@/components/ui/Reveal";

const CATEGORIES: { key: RuleCategory; label: string; caption: string }[] = [
  { key: "general", label: "General", caption: "How we treat each other" },
  { key: "gameplay", label: "Gameplay", caption: "Playing fair" },
  { key: "building", label: "Building", caption: "Other people's work" },
  { key: "chat", label: "Chat", caption: "Keeping the channel usable" },
];

export default function Rules({ standalone = false }: { standalone?: boolean }) {
  const [open, setOpen] = useState<RuleCategory | null>("general");
  const Heading = standalone ? "h1" : "h2";

  return (
    <section
      id="rules"
      className={`relative isolate overflow-hidden ${
        standalone ? "pb-28 pt-36 sm:pb-36 sm:pt-44" : "py-28 sm:py-36"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(52% 40% at 18% 8%, rgba(20,64,111,0.32), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
              <span className="eyebrow">The codex</span>
            </div>
            <Heading className="display mt-7 text-[clamp(2.4rem,6.4vw,5.4rem)] text-paper">
              Short list.
              <span className="block text-ice/85">Taken seriously.</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="prose-lede max-w-sm text-[1.02rem]">
              Twenty lines, four categories. Read them once and you will never think about them
              again. Break them and staff will.
            </p>
          </Reveal>
        </div>

        {/* ── Codex ────────────────────────────────────────── */}
        <div className="mt-16 border-t border-hair sm:mt-20">
          {CATEGORIES.map((cat, i) => {
            const rules = SERVER_CONFIG.rules[cat.key];
            const isOpen = open === cat.key;
            const panelId = `rules-${cat.key}`;

            return (
              <Reveal key={cat.key} delay={i * 0.06}>
                <div className="border-b border-hair">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : cat.key)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group relative flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
                    >
                      {/* rail that lights when the entry is open */}
                      <span
                        aria-hidden
                        className={`absolute left-0 top-0 h-full w-px transition-all duration-500 ${
                          isOpen
                            ? "bg-gradient-to-b from-glow via-electric to-transparent opacity-100"
                            : "bg-steel opacity-0 group-hover:opacity-60"
                        }`}
                      />
                      <span
                        className={`display pl-5 text-[2.2rem] leading-none transition-colors duration-500 sm:text-[3.2rem] ${
                          isOpen ? "text-glow" : "text-transparent"
                        }`}
                        style={
                          isOpen ? undefined : { WebkitTextStroke: "1px var(--color-steel)" }
                        }
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`display-tight block text-[1.7rem] transition-colors duration-300 sm:text-[2.3rem] ${
                            isOpen ? "text-paper" : "text-ink group-hover:text-paper"
                          }`}
                        >
                          {cat.label}
                        </span>
                        <span className="mt-1.5 block text-[0.86rem] text-ink-3">{cat.caption}</span>
                      </span>

                      <span className="hud hidden shrink-0 text-[0.62rem] uppercase tracking-[0.24em] text-ink-3 sm:block">
                        {rules.length} rules
                      </span>

                      {/* a plus that becomes a minus, drawn not iconified */}
                      <span aria-hidden className="relative grid h-9 w-9 shrink-0 place-items-center">
                        <span
                          className={`absolute h-px w-4 transition-colors duration-300 ${
                            isOpen ? "bg-glow" : "bg-ink-2 group-hover:bg-ice"
                          }`}
                        />
                        <span
                          className={`absolute h-4 w-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? "rotate-90 bg-glow opacity-0" : "bg-ink-2 group-hover:bg-ice"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={`${cat.label} rules`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { type: "spring", stiffness: 180, damping: 26, mass: 0.7 },
                          opacity: { duration: 0.25 },
                        }}
                        className="overflow-hidden"
                      >
                        <ol className="grid gap-x-10 gap-y-1 pb-9 pl-5 sm:grid-cols-2 lg:pl-[6.5rem]">
                          {rules.map((rule, r) => (
                            <motion.li
                              key={rule}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.08 + r * 0.045,
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="flex gap-4 border-b border-hair/50 py-3.5 last:border-b-0 sm:border-b-0"
                            >
                              <span className="hud shrink-0 pt-0.5 text-[0.66rem] tracking-[0.18em] text-steel">
                                {String(r + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[0.95rem] leading-relaxed text-ink-2">
                                {rule}
                              </span>
                            </motion.li>
                          ))}
                        </ol>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="display-tight text-[1.6rem] text-ink sm:text-[2rem]">
              Ready to enter?
            </p>
            <div className="flex flex-wrap gap-3">
              <Action variant="primary" href="/how-to-play">
                Play Now
              </Action>
              <Action variant="ghost" href={SERVER_CONFIG.discord} external>
                Ask a question
              </Action>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
