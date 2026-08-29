"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SERVER_CONFIG } from "@/lib/config";
import type { ServerStatus } from "@/lib/status";
import { useLiveStatus } from "@/lib/useLiveStatus";
import { useCart } from "@/components/store/cart";
import Action from "@/components/ui/Action";
import CopyIp from "@/components/ui/CopyIp";
import Icon from "@/components/ui/Icon";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/modes", label: "Game Modes" },
  { href: "/how-to-play", label: "How to Play" },
  { href: "/rules", label: "Rules" },
  { href: "/store", label: "Store", emphasis: true },
  { href: "/discord", label: "Discord" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav({ status: initial }: { status: ServerStatus }) {
  const pathname = usePathname();
  const status = useLiveStatus(initial);
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the home page has artwork worth letting the bar float over.
  const overArt = pathname === "/";
  const solid = scrolled || !overArt;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes. Adjusted during render rather than
  // in an effect so the panel never paints for a frame on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const online = status.state === "online";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-60 transition-all duration-500 ${
          solid ? "bg-abyss/82 py-2.5 backdrop-blur-xl" : "bg-transparent py-5 backdrop-blur-0"
        }`}
      >
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(77,163,255,0.32) 20%, rgba(134,229,255,0.55) 50%, rgba(77,163,255,0.32) 80%, transparent)",
          }}
        />

        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[92rem] items-center gap-6 px-5 sm:px-8"
        >
          {/* Identity */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
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
            <span>
              <span className="display-tight block text-[0.95rem] leading-none tracking-[0.14em] text-ink transition-colors duration-300 group-hover:text-paper xl:text-[1.05rem]">
                {SERVER_CONFIG.name}
              </span>
              <span className="hud mt-1 hidden text-[0.55rem] uppercase leading-none tracking-[0.3em] text-ink-3 sm:block">
                Survival Network
              </span>
            </span>
          </Link>

          {/* Destinations */}
          <ul className="mx-auto hidden items-center lg:flex">
            {LINKS.map((l) => {
              const on = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={on ? "page" : undefined}
                    className={`relative block px-3.5 py-2.5 text-[0.82rem] font-medium tracking-wide transition-colors duration-300 xl:px-4 ${
                      on ? "text-paper" : l.emphasis ? "text-ice" : "text-ink-2 hover:text-ice"
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
                    {/* The store is the only link that carries a mark of its own. */}
                    {l.emphasis && (
                      <span
                        aria-hidden
                        className="mr-2 inline-block h-1.5 w-1.5 rotate-45 bg-electric align-middle"
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Instruments */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5 lg:ml-0">
            <Link
              href="/#live"
              className="slot hidden items-center gap-2.5 px-3 py-2 transition-colors duration-300 hover:brightness-125 xl:flex"
            >
              <span className="relative flex h-2 w-2">
                {online && (
                  <span
                    className="absolute inset-0 rounded-full border border-glow/60"
                    style={{ animation: "pulse-ring 2.4s var(--ease-out-quart) infinite" }}
                  />
                )}
                <span className={`h-2 w-2 rounded-full ${online ? "bg-glow" : "bg-ink-3"}`} />
              </span>
              <span className="hud text-[0.6rem] uppercase tracking-[0.2em] text-ink-2">
                {status.players ? `${status.players.online} online` : "Checking"}
              </span>
            </Link>

            <button
              type="button"
              id="cart-anchor"
              onClick={() => cart.setOpen(true)}
              aria-label={`Open cart, ${cart.count} item${cart.count === 1 ? "" : "s"}`}
              className="slot relative grid h-10 w-10 place-items-center text-ink-2 transition-colors duration-300 hover:text-glow"
            >
              <Icon name="cart" size={18} />
              <AnimatePresence>
                {cart.count > 0 && (
                  <motion.span
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 20 }}
                    className="hud absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center bg-electric px-1 text-[0.6rem] font-semibold text-abyss"
                  >
                    {cart.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <span className="hidden md:block">
              <Action variant="primary" href="/how-to-play">
                <span className="text-[0.8rem]">Play Now</span>
              </Action>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center lg:hidden"
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
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-abyss/97 px-6 pb-10 pt-24 backdrop-blur-2xl lg:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(90% 55% at 70% 82%, rgba(45,120,205,0.35), transparent 70%)",
              }}
            />
            <ul className="relative">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-hair/70"
                >
                  <Link href={l.href} className="flex items-baseline gap-4 py-3.5">
                    <span className="hud text-[0.6rem] text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display text-[2rem] ${
                        isActive(pathname, l.href) ? "text-glow" : "text-ink"
                      }`}
                    >
                      {l.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.45 }}
              className="relative mt-10 space-y-3"
            >
              <CopyIp size="sm" />
              <Action variant="discord" href={SERVER_CONFIG.discord} external className="w-full">
                Join Discord
              </Action>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
