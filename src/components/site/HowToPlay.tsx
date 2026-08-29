"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SERVER_CONFIG, fill } from "@/lib/config";
import Action from "@/components/ui/Action";
import CopyIp from "@/components/ui/CopyIp";
import Reveal from "@/components/ui/Reveal";

/**
 * The Add Server dialog, redrawn.
 *
 * A real screenshot would show someone else's server; this shows *this*
 * server's values, stays sharp at any size, and reads as Minecraft without
 * copying a single asset.
 */
function AddServerDialog() {
  const fields: [string, string][] = [
    ["Server Name", SERVER_CONFIG.name],
    ["Server Address", SERVER_CONFIG.ip],
  ];

  return (
    <div className="slab" style={{ ["--edge-angle" as string]: "120deg" }}>
      <div
        className="slab-face relative overflow-hidden p-6 sm:p-7"
        style={{
          ["--slab-fill" as string]: "linear-gradient(150deg, #0a1e3a 0%, #05121f 100%)",
        }}
      >
        <div aria-hidden className="block-grid pointer-events-none absolute inset-0 opacity-[0.15]" />

        <p className="eyebrow relative">In game · Add Server</p>

        <div className="relative mt-6 space-y-5">
          {fields.map(([label, value], i) => (
            <div key={label}>
              <p className="hud text-[0.7rem] tracking-[0.08em] text-ink-2">{label}</p>
              <div className="mt-1.5 border border-ink-3/45 bg-abyss/85 px-3 py-2.5">
                <p className="hud flex items-center text-[0.82rem] text-paper">
                  <span className="break-all">{value}</span>
                  {i === 1 && (
                    <span
                      aria-hidden
                      className="ml-0.5 inline-block h-[1.05em] w-[0.5em] shrink-0 bg-paper/90"
                      style={{ animation: "halo-breathe 1.1s steps(1, end) infinite" }}
                    />
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-2.5">
          <span className="border border-glow/45 bg-steel/25 py-2.5 text-center text-[0.72rem] uppercase tracking-[0.18em] text-ice">
            Done
          </span>
          <span className="border border-hair bg-void/60 py-2.5 text-center text-[0.72rem] uppercase tracking-[0.18em] text-ink-3">
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HowToPlay({ standalone = false }: { standalone?: boolean }) {
  // On its own route this section owns the page's h1; on the home page it is
  // one chapter among several and must not outrank the hero.
  const Heading = standalone ? "h1" : "h2";
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 72%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const glowY = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section
      id="how-to-play"
      className={`relative isolate overflow-hidden ${
        standalone ? "pb-28 pt-36 sm:pb-36 sm:pt-44" : "py-28 sm:py-36"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(58% 42% at 12% 22%, rgba(20,64,111,0.34), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
              <span className="eyebrow">Joining the server</span>
            </div>
            <Heading className="display mt-7 text-[clamp(2.3rem,5.8vw,4.8rem)] text-paper">
              Four steps
              <span className="block text-ice/85">and you are in.</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-8 lg:self-end">
            <p className="prose-lede max-w-sm text-[1.02rem]">
              Works on {SERVER_CONFIG.editions.join(" and ")}. {SERVER_CONFIG.accounts} accounts are
              both welcome. If you have joined any Minecraft server before, this will take under a
              minute.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-14 sm:mt-24 lg:grid-cols-12">
          {/* ── The line ───────────────────────────────────── */}
          <ol ref={track} className="relative lg:col-span-7">
            <span
              aria-hidden
              className="absolute bottom-10 left-[13px] top-2 w-px bg-hair sm:left-[17px]"
            />
            <motion.span
              aria-hidden
              style={{ scaleY: progress }}
              className="absolute bottom-10 left-[13px] top-2 w-px origin-top bg-gradient-to-b from-glow via-electric to-azure sm:left-[17px]"
            />
            <motion.span
              aria-hidden
              style={{ top: glowY }}
              className="absolute left-[13px] h-24 w-px -translate-x-px bg-gradient-to-b from-glow/0 via-glow to-glow/0 blur-[3px] sm:left-[17px]"
            />

            {SERVER_CONFIG.steps.map((step, i) => (
              <li key={step.title} className="relative pb-14 pl-12 last:pb-0 sm:pl-16">
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0.25, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-1 grid h-[27px] w-[27px] place-items-center sm:h-[35px] sm:w-[35px]"
                >
                  <span className="absolute inset-0 rotate-45 border border-steel bg-abyss" />
                  <span className="absolute inset-[6px] rotate-45 bg-glow/80 shadow-[0_0_16px_3px_rgba(134,229,255,0.45)]" />
                </motion.span>

                <Reveal delay={0.05}>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <span
                      className="display text-[2.4rem] leading-none text-transparent sm:text-[3rem]"
                      style={{ WebkitTextStroke: "1px var(--color-steel)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display-tight text-[1.5rem] text-paper sm:text-[1.95rem]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="prose-lede mt-3.5 max-w-lg text-[0.98rem]">{fill(step.body)}</p>
                  {/* not uppercased: one of these hints is a server address */}
                  <p className="hud mt-4 inline-flex items-center gap-2 border-l border-steel/70 pl-3 text-[0.7rem] tracking-[0.14em] text-ink-3">
                    {fill(step.hint)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* ── What you actually type ─────────────────────── */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-32">
                <AddServerDialog />

                <div className="mt-4">
                  <CopyIp size="sm" />
                </div>

                <dl className="mt-4 divide-y divide-hair border border-hair">
                  {[
                    ["Port", SERVER_CONFIG.port],
                    ["Version", SERVER_CONFIG.version],
                    ["Editions", SERVER_CONFIG.editions.join(" · ")],
                    ["Accounts", SERVER_CONFIG.accounts],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                      <dt className="hud text-[0.6rem] uppercase tracking-[0.24em] text-ink-3">
                        {k}
                      </dt>
                      <dd className="hud text-right text-[0.78rem] text-ice">{v}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-3">
                  Bedrock players enter the address and the port in separate fields. Stuck anywhere?
                  Staff answer faster in Discord than anywhere else.
                </p>

                <div className="mt-5">
                  <Action variant="discord" href={SERVER_CONFIG.discord} external className="w-full">
                    <span className="text-[0.8rem]">Get help in Discord</span>
                  </Action>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
