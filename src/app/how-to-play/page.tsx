import type { Metadata } from "next";
import { SERVER_CONFIG } from "@/lib/config";
import HowToPlay from "@/components/site/HowToPlay";
import Ridge from "@/components/ui/Ridge";
import Reveal from "@/components/ui/Reveal";
import Action from "@/components/ui/Action";
import Icon, { type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "How to play",
  description: `Join ${SERVER_CONFIG.name} in four steps. Server address ${SERVER_CONFIG.ip}, port ${SERVER_CONFIG.port}, Minecraft ${SERVER_CONFIG.version} on Java and Bedrock.`,
  alternates: { canonical: "/how-to-play" },
};

const TROUBLE: { icon: IconName; title: string; body: string }[] = [
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
    <>
      <HowToPlay standalone />

      <section className="relative isolate overflow-hidden pb-28">
        <Ridge seed={4820} className="top-0 h-24 rotate-180 opacity-40" height={130} block={14} rim={0.2} />
        <div className="mx-auto max-w-[92rem] px-5 pt-24 sm:px-8">
          <Reveal>
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow">If it does not work</p>
                <h2 className="display mt-5 text-[clamp(1.9rem,4vw,3rem)] text-paper">
                  Three things it usually is
                </h2>
              </div>
              <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
                {TROUBLE.map((t) => (
                  <li key={t.title}>
                    <span className="slot grid h-10 w-10 place-items-center text-ice">
                      <Icon name={t.icon} size={18} />
                    </span>
                    <h3 className="display-tight mt-4 text-[1.05rem] text-paper">{t.title}</h3>
                    <p className="prose-lede mt-2 text-[0.86rem]">{t.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-hair pt-10">
              <p className="display-tight mr-auto text-[1.5rem] text-ink">Once you are in</p>
              <Action variant="ghost" href="/rules">
                <span className="text-[0.78rem]">Read the rules</span>
              </Action>
              <Action variant="ghost" href="/modes">
                <span className="text-[0.78rem]">Pick a world</span>
              </Action>
              <Action variant="discord" href={SERVER_CONFIG.discord} external>
                <span className="text-[0.78rem]">Say hello</span>
              </Action>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
