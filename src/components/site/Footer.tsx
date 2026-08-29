import Image from "next/image";
import { SERVER_CONFIG } from "@/lib/config";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "how-to-play", label: "How to Play" },
  { id: "rules", label: "Rules" },
  { id: "discord", label: "Discord" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-hair bg-abyss">
      <div className="mx-auto max-w-[88rem] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="slab slab-sm block h-9 w-9">
              <span className="slab-face block h-full w-full overflow-hidden">
                <Image
                  src={SERVER_CONFIG.logo}
                  alt=""
                  width={72}
                  height={72}
                  className="h-full w-full object-cover opacity-85"
                />
              </span>
            </span>
            <span>
              <span className="display-tight block text-[1.05rem] leading-none tracking-[0.14em] text-ink">
                {SERVER_CONFIG.name}
              </span>
              <span className="hud mt-1.5 block text-[0.6rem] tracking-[0.18em] text-ink-3">
                {SERVER_CONFIG.ip}
              </span>
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-[0.86rem] text-ink-2 transition-colors duration-200 hover:text-glow"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SERVER_CONFIG.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.86rem] text-ink-2 transition-colors duration-200 hover:text-glow"
                >
                  Discord invite
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hair pt-7 sm:flex-row sm:items-center sm:justify-between">
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
