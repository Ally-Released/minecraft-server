"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SERVER_CONFIG, fill } from "@/lib/config";
import Action from "@/components/ui/Action";
import CopyIp from "@/components/ui/CopyIp";
import Reveal from "@/components/ui/Reveal";

export default function HowToPlay() {
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 72%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const glowY = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section id="how-to-play" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 42% at 12% 22%, rgba(20,64,111,0.34), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
              <span className="eyebrow">Joining the server</span>
            </div>
            <h2 className="display mt-7 text-[clamp(2.4rem,6.4vw,5.4rem)] text-paper">
              Four steps
              <span className="block text-ice/85">and you are in.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="prose-lede max-w-sm text-[1.02rem]">
              Works on {SERVER_CONFIG.editions.join(" and ")}. {SERVER_CONFIG.accounts} accounts are
              both welcome. If you have joined any Minecraft server before, this will take under a
              minute.
            </p>
          </Reveal>
        </div>

        {/* ── The line ─────────────────────────────────────── */}
        <ol ref={track} className="relative mt-20 sm:mt-28">
          {/* unlit rail */}
          <span
            aria-hidden
            className="absolute bottom-10 left-[13px] top-2 w-px bg-hair sm:left-[17px] lg:left-[21px]"
          />
          {/* lit rail, filled by scroll */}
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-10 left-[13px] top-2 w-px origin-top bg-gradient-to-b from-glow via-electric to-azure sm:left-[17px] lg:left-[21px]"
          />
          {/* travelling light */}
          <motion.span
            aria-hidden
            style={{ top: glowY }}
            className="absolute left-[13px] h-24 w-px -translate-x-px bg-gradient-to-b from-glow/0 via-glow to-glow/0 blur-[3px] sm:left-[17px] lg:left-[21px]"
          />

          {SERVER_CONFIG.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative pb-16 pl-12 last:pb-0 sm:pl-16 lg:pl-24"
              style={{ marginLeft: `${i * 1.6}%` }}
            >
              <motion.span
                aria-hidden
                initial={{ opacity: 0.25, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-1 grid h-[27px] w-[27px] place-items-center sm:h-[35px] sm:w-[35px] lg:h-[43px] lg:w-[43px]"
              >
                <span className="absolute inset-0 rotate-45 border border-steel bg-abyss" />
                <span className="absolute inset-[6px] rotate-45 bg-glow/80 shadow-[0_0_16px_3px_rgba(134,229,255,0.45)]" />
              </motion.span>

              <Reveal delay={0.05}>
                <div className="group flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <span
                    className="display text-[2.6rem] leading-none text-transparent sm:text-[3.4rem]"
                    style={{ WebkitTextStroke: "1px var(--color-steel)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-tight text-[1.6rem] text-paper sm:text-[2.1rem]">
                    {step.title}
                  </h3>
                </div>
                <p className="prose-lede mt-4 max-w-lg text-[0.98rem]">{fill(step.body)}</p>
                <p className="hud mt-4 inline-flex items-center gap-2 border-l border-steel/70 pl-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink-3">
                  {fill(step.hint)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* ── Arrival ──────────────────────────────────────── */}
        <Reveal className="mt-16 lg:ml-24">
          <div className="slab max-w-3xl" style={{ ["--edge-angle" as string]: "120deg" }}>
            <div className="slab-face relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(77,163,255,0.28),transparent_68%)] blur-2xl"
              />
              <p className="eyebrow relative">The only thing you need</p>
              <div className="relative mt-5">
                <CopyIp />
              </div>
              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <Action variant="discord" href={SERVER_CONFIG.discord} external>
                  Get help in Discord
                </Action>
                <p className="hud text-[0.68rem] uppercase tracking-[0.2em] text-ink-3">
                  Port {SERVER_CONFIG.port} · Bedrock players enter this separately
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
