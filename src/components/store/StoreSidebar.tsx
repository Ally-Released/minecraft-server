"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVER_CONFIG } from "@/lib/config";
import { CATALOGUES } from "@/lib/store";
import Icon, { type IconName } from "@/components/ui/Icon";
import { useCart } from "./cart";

const CATALOGUE_ICON: Record<string, IconName> = {
  survival: "world",
  boxpvp: "block",
};

/**
 * Persistent store navigation. Compact on purpose — the catalogue is two
 * categories deep, so this is a map, not a menu.
 */
export default function StoreSidebar() {
  const pathname = usePathname();
  const cart = useCart();

  return (
    <nav aria-label="Store" className="lg:sticky lg:top-28">
      <p className="eyebrow border-b border-hair pb-3">Store</p>

      <Link
        href="/store"
        aria-current={pathname === "/store" ? "page" : undefined}
        className={`mt-3 flex items-center gap-3 py-2.5 text-[0.86rem] transition-colors duration-300 ${
          pathname === "/store" ? "text-paper" : "text-ink-2 hover:text-ice"
        }`}
      >
        <Icon name="chest" size={16} className="shrink-0 text-steel" />
        Armory home
      </Link>

      <ul className="mt-4 space-y-5">
        {CATALOGUES.map((cat) => {
          const on = pathname === cat.slug;
          return (
            <li key={cat.id}>
              <Link
                href={cat.slug}
                aria-current={on ? "page" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center transition-colors duration-300"
                  style={{
                    background: on ? `color-mix(in srgb, ${cat.accent} 18%, transparent)` : "transparent",
                    color: on ? cat.accent : "var(--color-steel)",
                  }}
                >
                  <Icon name={CATALOGUE_ICON[cat.id] ?? "block"} size={16} />
                </span>
                <span
                  className={`display-tight text-[1.02rem] leading-none transition-colors duration-300 ${
                    on ? "text-paper" : "text-ink-2 group-hover:text-ice"
                  }`}
                >
                  {cat.name}
                </span>
              </Link>
              <ul className="ml-11 mt-1.5 space-y-1">
                <li>
                  <Link
                    href={`${cat.slug}#ranks`}
                    className="block py-1 text-[0.8rem] text-ink-3 transition-colors hover:text-ice"
                  >
                    Ranks
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${cat.slug}#compare`}
                    className="block py-1 text-[0.8rem] text-ink-3 transition-colors hover:text-ice"
                  >
                    Comparison
                  </Link>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 space-y-1 border-t border-hair pt-5">
        <button
          type="button"
          onClick={() => cart.setOpen(true)}
          className="flex w-full items-center gap-3 py-2 text-[0.84rem] text-ink-2 transition-colors hover:text-ice"
        >
          <Icon name="cart" size={15} className="shrink-0 text-steel" />
          Cart
          {cart.count > 0 && (
            <span className="hud ml-auto bg-electric px-1.5 text-[0.6rem] text-abyss">
              {cart.count}
            </span>
          )}
        </button>
        <a
          href={SERVER_CONFIG.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-2 text-[0.84rem] text-ink-2 transition-colors hover:text-ice"
        >
          <Icon name="discord" size={15} className="shrink-0 text-steel" />
          Support
        </a>
      </div>
    </nav>
  );
}
