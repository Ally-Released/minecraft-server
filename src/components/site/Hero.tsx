"use client";

import { motion } from "motion/react";
import { SERVER_CONFIG } from "@/lib/config";
import type { ServerStatus } from "@/lib/status";
import WorldScene from "@/components/scene/WorldScene";
import Action from "@/components/ui/Action";
import CopyIp from "@/components/ui/CopyIp";
import StatusStrip from "./StatusStrip";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Lines wipe up from behind a mask — key art, not a fade-in. */
function Line({ text, delay, lit }: { text: string; delay: number; lit?: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${lit ? "lit" : "text-paper"}`}
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero({ status }: { status: ServerStatus }) {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="home" className="relative isolate min-h-svh overflow-hidden">
      <WorldScene />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-[88rem] flex-col justify-end px-5 pb-20 pt-32 sm:px-8 lg:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          {/* ── Key art ─────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="mb-7 flex items-center gap-3"
            >
              <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
              <span className="eyebrow text-ice/80">{SERVER_CONFIG.hero.eyebrow}</span>
            </motion.div>

            <h1 className="display text-[clamp(2.9rem,10.5vw,9.5rem)]">
              {SERVER_CONFIG.hero.headline.map((line, i) => (
                <Line
                  key={line}
                  text={line}
                  delay={0.25 + i * 0.11}
                  lit={i === SERVER_CONFIG.hero.headline.length - 1}
                />
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="prose-lede mt-7 max-w-md text-[1.05rem] sm:text-lg"
            >
              {SERVER_CONFIG.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.82, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Action variant="primary" onClick={() => go("how-to-play")}>
                Play Now
              </Action>
              <Action variant="ghost" href={SERVER_CONFIG.discord} external>
                Join Discord
              </Action>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.94, ease: EASE }}
              className="mt-6 max-w-lg"
            >
              <CopyIp />
            </motion.div>
          </div>

          {/* ── Instrument ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
            className="lg:col-span-5 lg:justify-self-end"
          >
            <StatusStrip initial={status} />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute inset-x-0 bottom-6 z-10 hidden justify-center lg:flex"
      >
        <span className="flex flex-col items-center gap-2">
          <span className="hud text-[0.55rem] uppercase tracking-[0.4em] text-ink-3">Scroll</span>
          <span className="relative h-9 w-px bg-gradient-to-b from-transparent via-steel to-transparent">
            <span className="animate-hint absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-glow shadow-[0_0_10px_2px_rgba(134,229,255,0.6)]" />
          </span>
        </span>
      </motion.div>
    </section>
  );
}
