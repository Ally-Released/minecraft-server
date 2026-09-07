import Image from "next/image";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import Icon from "@/components/ui/Icon";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container-base py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-xs">
            <Link href="/" className="group flex items-center gap-4">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={SERVER_CONFIG.logo}
                  alt={SERVER_CONFIG.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-contain drop-shadow-[0_4px_16px_rgba(0,180,255,0.35)]"
                />
              </span>
              <span>
                <span className="display-tight block text-xl leading-none tracking-widest text-foreground transition-colors group-hover:text-primary font-bold">
                  {SERVER_CONFIG.name}
                </span>
                <span className="hud mt-1.5 block text-[0.68rem] tracking-widest text-muted-foreground">
                  {SERVER_CONFIG.ip}
                </span>
              </span>
            </Link>
            <p className="prose-lede mt-5 text-sm text-muted-foreground">{SERVER_CONFIG.description}</p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            <nav aria-label="Navigation">
              <p className="eyebrow text-primary">Explore</p>
              <ul className="mt-4 space-y-3">
                <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/modes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Game Modes</Link></li>
                <li><Link href="/how-to-play" className="text-sm text-muted-foreground hover:text-primary transition-colors">How to Play</Link></li>
              </ul>
            </nav>
            <nav aria-label="Resources">
              <p className="eyebrow text-primary">Resources</p>
              <ul className="mt-4 space-y-3">
                <li><Link href="/store" className="text-sm text-muted-foreground hover:text-primary transition-colors">Store</Link></li>
                <li><Link href="/rules" className="text-sm text-muted-foreground hover:text-primary transition-colors">Rules</Link></li>
                <li>
                  <a href={SERVER_CONFIG.discord} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    Discord <Icon name="discord" size={14} />
                  </a>
                </li>
              </ul>
            </nav>
            <nav aria-label="Founders">
              <p className="eyebrow text-primary">Founders</p>
              <ul className="mt-4 space-y-3">
                <li><a href="https://www.instagram.com/royalclasher__/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Prince Patel</a></li>
                <li><a href="https://www.instagram.com/__its.hxedits/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Harsh Patel</a></li>
              </ul>
            </nav>
            <nav aria-label="Credits">
              <p className="eyebrow text-primary">Site By</p>
              <ul className="mt-4 space-y-3">
                <li><a href="https://fakecrime.bio/ally" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ally (Bio)</a></li>
                <li><a href="mailto:ally.aura@icloud.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">ally.aura@icloud.com</a></li>
                <li><span className="text-sm text-muted-foreground">Discord: demons_arc</span></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {SERVER_CONFIG.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Not affiliated with Mojang Studios or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
