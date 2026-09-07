"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SERVER_CONFIG } from "@/lib/config";
import type { ServerStatus } from "@/lib/status";
import { useLiveStatus } from "@/lib/useLiveStatus";
import CopyIp from "@/components/ui/CopyIp";
import { useCart } from "@/components/store/cart";
import Icon from "@/components/ui/Icon";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/modes", label: "Game Modes" },
  { href: "/how-to-play", label: "How to Play" },
  { href: "/rules", label: "Rules" },
  { href: "/store", label: "Store", emphasis: true },
  { href: "/leaderboard", label: "Leaderboard" },
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid ? "bg-background/90 py-3 backdrop-blur-xl border-b border-border" : "bg-transparent py-5 backdrop-blur-0 border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-base flex items-center justify-between"
        >
          {/* Identity */}
          <Link href="/" className="group flex shrink-0 items-center gap-3.5">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
              <Image
                src={SERVER_CONFIG.logo}
                alt={SERVER_CONFIG.name}
                width={96}
                height={96}
                className="h-full w-full object-contain drop-shadow-[0_2px_10px_rgba(0,180,255,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_4px_16px_rgba(56,189,248,0.7)]"
                priority
              />
            </span>
            <span>
              <span className="display-tight block text-[1rem] leading-none tracking-[0.14em] text-foreground transition-colors duration-300 group-hover:text-white sm:text-[1.1rem]">
                {SERVER_CONFIG.name}
              </span>
            </span>
          </Link>

          {/* Destinations */}
          <ul className="hidden items-center lg:flex ml-8 xl:ml-12">
            {LINKS.map((l) => {
              const on = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={on ? "page" : undefined}
                    className={`relative block px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      on ? "text-primary" : l.emphasis ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {on && (
                      <span
                        aria-hidden
                        className="absolute inset-x-4 bottom-0 h-0.5 bg-primary"
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Instruments */}
          <div className="flex shrink-0 items-center gap-5">
            <div className="hidden items-center gap-2 xl:flex">
              <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-primary" : "bg-muted-foreground"}`} />
              <span className="text-[0.75rem] font-medium text-muted-foreground">
                {online ? "Online" : "Offline"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => cart.setOpen(true)}
              className="relative flex items-center justify-center h-10 w-10 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Cart with ${cart.count} items`}
            >
              <Icon name="cart" size={20} />
              {cart.count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-primary-foreground">
                  {cart.count}
                </span>
              )}
            </button>

            <span className="hidden md:block">
              <Link 
                href="/how-to-play" 
                className="inline-block bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold transition-colors hover:bg-primary/90"
              >
                PLAY
              </Link>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-10 w-10 place-items-center lg:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-foreground transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-foreground transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-background/95 px-6 pb-10 pt-24 backdrop-blur-md lg:hidden"
        >
          <div>
            <div className="flex items-center gap-3.5 border-b border-border pb-5 mb-2">
              <Image
                src={SERVER_CONFIG.logo}
                alt={SERVER_CONFIG.name}
                width={64}
                height={64}
                className="h-12 w-12 object-contain drop-shadow-[0_2px_10px_rgba(0,180,255,0.4)]"
              />
              <div>
                <span className="display-tight block text-xl font-bold tracking-wider text-foreground">
                  {SERVER_CONFIG.name}
                </span>
                <span className="hud block text-xs tracking-widest text-primary uppercase">
                  {SERVER_CONFIG.ip}
                </span>
              </div>
            </div>

            <ul className="relative mt-2">
            {LINKS.map((l, i) => (
              <li key={l.href} className="border-b border-border">
                <Link href={l.href} className="flex items-baseline gap-4 py-4">
                  <span className="hud text-[0.6rem] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`display text-3xl ${
                      isActive(pathname, l.href) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {l.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

          <div className="relative mt-10 space-y-4">
            <CopyIp />
            <Link 
              href={SERVER_CONFIG.discord} 
              target="_blank"
              rel="noreferrer"
              className="block w-full border border-primary text-center px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              Join Discord
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
