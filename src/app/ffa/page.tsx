import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import { FFA_MODES } from "@/lib/modes";
import Icon from "@/components/ui/Icon";
import CopyIp from "@/components/ui/CopyIp";
import { Meter } from "@/components/store/Bits";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Free for all",
  description: `Open arenas on ${SERVER_CONFIG.name}: Mace FFA, NethPot FFA, Manhunt, Cart PvP and Diamond SMP. No queue, no teams.`,
  alternates: { canonical: "/ffa" },
};

const INTENSITY_LABEL = ["", "Warm-up", "Busy", "Loud", "Chaos"];

/** Deliberately uneven — an arena board, not a product grid. */
const SPAN = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
];

export default function FfaPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="relative isolate overflow-hidden border-b border-border pb-14 pt-36 sm:pt-44">
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Icon name="arena" size={16} className="text-primary" />
            <span className="eyebrow text-primary">Free for all</span>
          </div>
          <h1 className="display mt-6 text-6xl md:text-8xl leading-[0.8] text-foreground">
            No teams.
            <span className="block text-primary">No queue.</span>
          </h1>
          <p className="prose-lede mt-7 max-w-lg text-lg text-muted-foreground">
            Walk into an arena and you are already fighting. Everyone in the room is a target,
            including the person you were fighting alongside a second ago.
          </p>
        </div>
      </header>

      <section className="relative mx-auto max-w-5xl px-5 pb-24 pt-14 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {FFA_MODES.map((m, i) => (
            <div key={m.id} className={SPAN[i] ?? "lg:col-span-4"}>
              <Card className="group relative flex h-full flex-col overflow-hidden transition-colors hover:border-primary/50 hover:bg-card/80">
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center text-primary bg-primary/10 rounded-md">
                      <Icon name={m.icon} size={24} />
                    </span>
                    <span className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2
                    className={`display relative mt-auto pt-10 leading-none text-foreground ${
                      i === 0 ? "text-5xl" : "text-3xl"
                    }`}
                  >
                    {m.name}
                  </h2>
                  <p className={`prose-lede relative mt-3 text-sm text-muted-foreground ${i === 0 ? "max-w-sm" : ""}`}>
                    {m.blurb}
                  </p>

                  <dl className="relative mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-5">
                    <div>
                      <dt className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        Pressure
                      </dt>
                      <dd className="mt-2 flex items-center gap-3">
                        <Meter level={m.intensity} label={INTENSITY_LABEL[m.intensity]} />
                        <span className="hud text-[0.65rem] font-semibold text-foreground">
                          {INTENSITY_LABEL[m.intensity]}
                        </span>
                      </dd>
                    </div>
                    <div className="min-w-0 flex-1">
                      <dt className="hud text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        Kit
                      </dt>
                      <dd className="mt-2 truncate text-[0.82rem] font-medium text-foreground">{m.kit}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Card className="bg-card">
            <CardContent className="flex flex-wrap items-center gap-6 p-7">
              <div className="min-w-[16rem] flex-1">
                <p className="eyebrow text-primary">Get into an arena</p>
                <p className="prose-lede mt-3 text-sm text-muted-foreground">
                  FFA arenas live inside the practice server. Connect, open the hub and walk in — no
                  queue to wait for.
                </p>
              </div>
              <div className="w-full sm:w-auto sm:min-w-[20rem]">
                <CopyIp size="sm" />
              </div>
              <Button asChild variant="outline">
                <Link href="/pvp">
                  Duel types
                  <Icon name="arrow" size={14} className="ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
