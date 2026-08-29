import { SERVER_CONFIG, fill } from "@/lib/config";
import { Button } from "@/components/ui/button";
import CopyIp from "@/components/ui/CopyIp";

export default function HowToPlay({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section
      id="how-to-play"
      className={`relative isolate overflow-hidden bg-background ${
        standalone ? "pb-24 pt-32" : "py-24 border-t border-border"
      }`}
    >
      <div className="container-base max-w-3xl">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-9 bg-primary/50" />
            <span className="eyebrow text-primary">Joining the server</span>
          </div>
          <Heading className="display text-4xl sm:text-5xl text-foreground">
            Four steps to join
          </Heading>
          <p className="prose-lede mt-4 text-base text-muted-foreground">
            Works on {SERVER_CONFIG.editions.join(" and ")}. {SERVER_CONFIG.accounts} accounts are
            both welcome. If you have joined any Minecraft server before, this will take under a
            minute.
          </p>
        </div>

        <ol className="space-y-12">
          {SERVER_CONFIG.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 sm:gap-8">
              <div className="flex-shrink-0 pt-1">
                <span className="display text-3xl text-primary opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="display-tight text-2xl text-foreground">
                  {step.title}
                </h3>
                <p className="prose-lede mt-3 text-base leading-relaxed text-muted-foreground">
                  {fill(step.body)}
                </p>
                <div className="mt-4 font-mono text-sm text-muted-foreground/80">
                  {fill(step.hint)}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 border-t border-border pt-12">
          <h3 className="display-tight text-2xl text-foreground mb-6">Server Details</h3>
          <div className="max-w-md">
            <CopyIp />
          </div>
          <dl className="mt-6 max-w-md divide-y divide-border border border-border rounded-lg bg-card overflow-hidden">
            {[
              ["Port", SERVER_CONFIG.port],
              ["Version", SERVER_CONFIG.version],
              ["Editions", SERVER_CONFIG.editions.join(" · ")],
              ["Accounts", SERVER_CONFIG.accounts],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between px-5 py-4">
                <dt className="hud text-xs uppercase tracking-widest text-muted-foreground">
                  {k}
                </dt>
                <dd className="hud text-right text-sm text-foreground font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          
          <div className="mt-8 max-w-md">
            <Button asChild size="lg" className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4]">
              <a href={SERVER_CONFIG.discord} target="_blank" rel="noopener noreferrer">
                Get help in Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
