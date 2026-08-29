"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SERVER_CONFIG } from "@/lib/config";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How to Play", href: "#how-to-play" },
  { label: "Rules", href: "#rules" },
  { label: "Discord", href: "#discord" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href) as HTMLElement | null
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-6 py-3 rounded-2xl border transition-all duration-300 max-w-5xl w-[calc(100%-2rem)] ${
          scrolled
            ? "bg-surface-1/90 backdrop-blur-xl border-surface-border shadow-lg shadow-black/20 py-2.5"
            : "bg-surface-1/50 backdrop-blur-md border-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="font-[family-name:var(--font-display)] text-lg tracking-widest text-text-primary uppercase shrink-0 hover:text-emerald-accent transition-colors"
          aria-label={`${SERVER_CONFIG.name} - go to home`}
        >
          {SERVER_CONFIG.name}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1" role="menubar">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              role="menuitem"
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === item.href.slice(1)
                  ? "text-emerald-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2/50"
              }`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={SERVER_CONFIG.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent text-sm font-semibold hover:bg-emerald-accent/20 transition-all"
        >
          Join Discord
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-surface-0/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-3xl font-[family-name:var(--font-heading)] font-bold text-text-primary hover:text-emerald-accent transition-colors animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {item.label}
            </button>
          ))}
          <a
            href={SERVER_CONFIG.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 rounded-xl bg-emerald-accent text-surface-0 font-bold text-lg animate-fade-in-up"
            style={{ animationDelay: `${NAV_ITEMS.length * 80}ms` }}
          >
            Join Discord
          </a>
        </div>
      )}
    </>
  );
}
