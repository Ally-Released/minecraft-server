"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SERVER_CONFIG } from "@/lib/config";
import Action from "@/components/ui/Action";
import CopyIp from "@/components/ui/CopyIp";

const DESTINATIONS = [
  { id: "home", label: "Home" },
  { id: "how-to-play", label: "How to Play" },
  { id: "rules", label: "Rules" },
  { id: "discord", label: "Discord" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);

      // Sections between two destinations belong to the one above them, so
      // the indicator never blanks out mid-journey.
      const line = window.scrollY + 140;
      let current = DESTINATIONS[0].id;
      for (const d of DESTINATIONS) {
        const el = document.getElementById(d.id);
        if (el && el.offsetTop <= line) current = d.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-60 transition-all duration-500 ${
          scrolled
            ? "bg-abyss/78 py-2.5 backdrop-blur-xl"
            : "bg-transparent py-5 backdrop-blur-0"
        }`}
      >
        {/* luminous hairline, lit only once the bar becomes a surface */}
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(77,163,255,0.35) 22%, rgba(134,229,255,0.6) 50%, rgba(77,163,255,0.35) 78%, transparent)",
          }}
        />

        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8"
        >
          {/* Identity */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="slab slab-sm block h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-3">
              <span className="slab-face block h-full w-full overflow-hidden">
                <Image
                  src={SERVER_CONFIG.logo}
                  alt=""
                  width={72}
                  height={72}
                  className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  priority
                />
              </span>
            </span>
            <span className="hidden sm:block">
              <span className="display-tight block text-[1.05rem] leading-none tracking-[0.14em] text-ink transition-colors duration-300 group-hover:text-paper">
                {SERVER_CONFIG.name}
              </span>
              <span className="hud mt-1 block text-[0.58rem] uppercase leading-none tracking-[0.3em] text-ink-3">
                Survival Network
              </span>
            </span>
          </a>

          {/* Destinations */}
          <ul className="hidden items-center gap-1 md:flex">
            {DESTINATIONS.map((d) => {
              const on = active === d.id;
              return (
                <li key={d.id}>
                  <a
                    href={`#${d.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(d.id);
                    }}
                    aria-current={on ? "true" : undefined}
                    className={`relative block px-4 py-2.5 text-[0.82rem] font-medium tracking-wide transition-colors duration-300 ${
                      on ? "text-paper" : "text-ink-2 hover:text-ice"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-lit"
                        aria-hidden
                        className="absolute inset-x-3 top-0 h-px bg-glow shadow-[0_0_12px_2px_rgba(134,229,255,0.55)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {d.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Entry */}
          <div className="flex shrink-0 items-center gap-3">
            <Action
              variant="primary"
              className="hidden md:inline-block"
              onClick={() => go("how-to-play")}
              ariaLabel="How to join the server"
            >
              <span className="text-[0.8rem]">Play Now</span>
            </Action>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center md:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-ink transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-ink transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-abyss/97 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(90% 55% at 70% 82%, rgba(45,120,205,0.35), transparent 70%)",
              }}
            />
            <ul className="relative space-y-1">
              {DESTINATIONS.map((d, i) => (
                <motion.li
                  key={d.id}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-hair/70"
                >
                  <a
                    href={`#${d.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(d.id);
                    }}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="hud text-[0.65rem] text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display text-4xl ${
                        active === d.id ? "text-glow" : "text-ink"
                      }`}
                    >
                      {d.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative space-y-4"
            >
              <CopyIp size="sm" />
              <Action
                variant="discord"
                href={SERVER_CONFIG.discord}
                external
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Join Discord
              </Action>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
