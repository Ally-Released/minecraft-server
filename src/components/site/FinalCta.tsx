"use client";

import { motion } from "motion/react";
import { SERVER_CONFIG } from "@/lib/config";
import WorldScene from "@/components/scene/WorldScene";
import Action from "@/components/ui/Action";
import CopyIp from "@/components/ui/CopyIp";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FinalCta() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden">
      {/* The same world, seen from the other side of the valley. */}
      <WorldScene mode="closing" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-abyss to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pb-24 pt-40 sm:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
            <span className="eyebrow text-ice/80">Last thing</span>
          </motion.div>

          {/* The trigger lives on the heading, not on the moving spans: a span
              parked below an overflow-hidden edge is clipped out of every
              intersection rect, so it could never observe itself into view. */}
          <motion.h2
            className="display mt-7 text-[clamp(2.8rem,9vw,7.5rem)]"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
          >
            {["Your adventure", "starts now."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "lit" : "text-paper"}`}
                  variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                  transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mt-10 max-w-lg"
          >
            <CopyIp />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <Action variant="primary" href="/how-to-play">
              Play Now
            </Action>
            <Action variant="ghost" href={SERVER_CONFIG.discord} external>
              Join Discord
            </Action>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
