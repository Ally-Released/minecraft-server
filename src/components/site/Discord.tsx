import { SERVER_CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Discord({ standalone = false }: { standalone?: boolean }) {
  const { community } = SERVER_CONFIG;
  const Heading = standalone ? "h1" : "h2";

  return (
    <section
      id="discord"
      className={`relative isolate overflow-hidden bg-background ${
        standalone ? "pb-24 pt-32" : "py-24 border-t border-border"
      }`}
    >
      <div className="container-base max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-9 bg-primary/50" />
            <span className="eyebrow text-primary">The community</span>
          </div>
          <Heading className="display text-4xl sm:text-5xl text-foreground">
            {community.headline[0]} {community.headline[1]}
          </Heading>
          <p className="prose-lede mt-4 max-w-lg text-base">
            {community.body}
          </p>
        </div>

        <ul className="mb-12 space-y-4 border-l-2 border-primary/20 pl-6">
          {community.reasons.map((r) => (
            <li key={r} className="flex gap-4">
              <span className="hud shrink-0 pt-1 text-xs tracking-widest text-primary">
                ■
              </span>
              <span className="text-base leading-relaxed text-muted-foreground">
                {r}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-8 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-[#5865F2] text-white hover:bg-[#4752C4]">
            <a href={SERVER_CONFIG.discord} target="_blank" rel="noopener noreferrer">
              Join Discord
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/rules">Read the rules</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
