import type { Metadata } from "next";
import { SERVER_CONFIG } from "@/lib/config";
import HowToPlay from "@/components/site/HowToPlay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to play",
  description: `Join ${SERVER_CONFIG.name} in four steps. Server address ${SERVER_CONFIG.ip}, port ${SERVER_CONFIG.port}, Minecraft ${SERVER_CONFIG.version} on Java and Bedrock.`,
  alternates: { canonical: "/how-to-play" },
};

const TROUBLE = [
  {
    icon: "server",
    title: "Connection timed out",
    body: "Usually a typo in the address or an old Minecraft version. Copy the address rather than typing it, and check you are on a recent release.",
  },
  {
    icon: "block",
    title: "Bedrock cannot find it",
    body: `Bedrock asks for the address and the port in two separate fields. The port is ${SERVER_CONFIG.port} — it does not go on the end of the address.`,
  },
  {
    icon: "player",
    title: "Something else",
    body: "Ask in Discord. Include what you typed and what the error said — staff can usually spot it immediately.",
  },
];

export default function HowToPlayPage() {
  return (
    <div className="bg-background min-h-screen">
      <HowToPlay standalone />

      <section className="border-t border-border pb-24 bg-card">
        <div className="container-base max-w-3xl pt-20">
          <div className="mb-12">
            <p className="eyebrow text-primary">If it does not work</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl text-foreground">
              Three things it usually is
            </h2>
          </div>
          
          <ul className="space-y-10">
            {TROUBLE.map((t, i) => (
              <li key={t.title} className="flex gap-6 sm:gap-8">
                <span className="hud text-muted-foreground pt-1 text-sm font-semibold">0{i + 1}</span>
                <div>
                  <h3 className="display-tight text-xl text-foreground">{t.title}</h3>
                  <p className="prose-lede mt-2 text-base leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-20 flex flex-wrap items-center gap-4 border-t border-border pt-12">
            <Button asChild variant="outline">
              <Link href="/rules">Read the rules</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/modes">Pick a world</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
