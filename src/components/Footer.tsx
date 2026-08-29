import React from "react";
import { SERVER_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How to Play", href: "#how-to-play" },
  { label: "Rules", href: "#rules" },
  { label: "Discord", href: "#discord" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-surface-border bg-surface-0 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded border border-surface-border overflow-hidden shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                <img src="/assets/cn-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-2xl tracking-widest text-text-primary uppercase">
                {SERVER_CONFIG.name}
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-xs">
              {SERVER_CONFIG.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-1">
                Navigation
              </span>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-cyan-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-1">
                Connect
              </span>
              <a
                href={SERVER_CONFIG.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-cyan-accent transition-colors"
              >
                Discord
              </a>
              <span className="text-sm text-text-muted">
                {SERVER_CONFIG.ip}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-surface-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {SERVER_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Not affiliated with Mojang Studios or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
