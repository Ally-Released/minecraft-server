import Image from "next/image";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { CATALOGUES } from "@/lib/store";
import { MODES } from "@/lib/modes";
import Icon from "@/components/ui/Icon";

const COLUMNS = [
  {
    title: "Play",
    links: [
      { href: "/", label: "Home" },
      { href: "/modes", label: "Game modes" },
      { href: "/pvp", label: "PvP practice" },
      { href: "/ffa", label: "Free for all" },
    ],
  },
  {
    title: "Get started",
    links: [
      { href: "/how-to-play", label: "How to play" },
      { href: "/rules", label: "Rules" },
      { href: "/discord", label: "Discord" },
    ],
  },
  {
    title: "Store",
    links: [
      { href: "/store", label: "Armory" },
      ...CATALOGUES.map((c) => ({ href: c.slug, label: c.name })),
    ],
  },
  {
    title: "Worlds",
    links: MODES.map((m) => ({ href: `/modes/${m.slug}`, label: m.name })),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-hair bg-abyss">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="slab slab-sm block h-10 w-10">
                <span className="slab-face block h-full w-full overflow-hidden">
                  <Image
                    src={SERVER_CONFIG.logo}
                    alt=""
                    width={80}
                    height={80}
                    className="h-full w-full object-cover opacity-85"
                  />
                </span>
              </span>
              <span>
                <span className="display-tight block text-[1.1rem] leading-none tracking-[0.14em] text-ink">
                  {SERVER_CONFIG.name}
                </span>
                <span className="hud mt-1.5 block text-[0.6rem] tracking-[0.18em] text-ink-3">
                  {SERVER_CONFIG.ip}
                </span>
              </span>
            </Link>
            <p className="prose-lede mt-6 max-w-xs text-[0.88rem]">{SERVER_CONFIG.description}</p>
            <a
              href={SERVER_CONFIG.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 text-[0.84rem] text-ink-2 transition-colors hover:text-glow"
            >
              <Icon name="discord" size={16} />
              Join the Discord
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-[0.84rem] text-ink-2 transition-colors duration-200 hover:text-glow"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hair pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="hud text-[0.62rem] uppercase tracking-[0.2em] text-ink-3">
            © {new Date().getFullYear()} {SERVER_CONFIG.name}
          </p>
          <p className="text-[0.72rem] text-ink-3">
            Not affiliated with Mojang Studios or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
