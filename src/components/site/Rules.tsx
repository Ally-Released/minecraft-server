"use client";

import { SERVER_CONFIG, type RuleCategory } from "@/lib/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CATEGORIES: { key: RuleCategory; label: string; caption: string }[] = [
  { key: "general", label: "General", caption: "How we treat each other" },
  { key: "gameplay", label: "Gameplay", caption: "Playing fair" },
  { key: "building", label: "Building", caption: "Other people's work" },
  { key: "chat", label: "Chat", caption: "Keeping the channel usable" },
];

export default function Rules({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section
      id="rules"
      className={`relative isolate overflow-hidden bg-background ${
        standalone ? "pb-24 pt-32 min-h-screen" : "py-24 border-t border-border"
      }`}
    >
      <div className="container-base max-w-3xl">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-9 bg-primary/50" />
            <span className="eyebrow text-primary">The codex</span>
          </div>
          <Heading className="display text-4xl sm:text-5xl text-foreground">
            Short list. Taken seriously.
          </Heading>
          <p className="prose-lede mt-4 max-w-lg text-base text-muted-foreground">
            Twenty lines, four categories. Read them once and you will never think about them
            again. Break them and staff will.
          </p>
        </div>

        <div className="space-y-20">
          {CATEGORIES.map((cat, i) => {
            const rules = SERVER_CONFIG.rules[cat.key];

            return (
              <div key={cat.key}>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="display text-3xl text-primary opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display-tight text-3xl text-foreground">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">{cat.caption}</p>
                  </div>
                </div>

                <ol className="space-y-4 border-l border-border pl-6 sm:pl-8">
                  {rules.map((rule, r) => (
                    <li key={rule} className="flex gap-4">
                      <span className="hud shrink-0 pt-1.5 text-[0.65rem] tracking-widest text-muted-foreground font-semibold">
                        {String(r + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base leading-relaxed text-muted-foreground">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        <div className="mt-24 border-t border-border pt-12">
          <p className="display-tight text-2xl text-foreground mb-6">
            Ready to enter?
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/how-to-play">Play Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={SERVER_CONFIG.discord} target="_blank" rel="noopener noreferrer">Ask a question</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
