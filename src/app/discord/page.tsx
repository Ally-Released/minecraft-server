import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import Discord from "@/components/site/Discord";
import Reveal from "@/components/ui/Reveal";
import Icon, { type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Discord",
  description: `The ${SERVER_CONFIG.name} community. Announcements, support, teammates and events — the server's conversation happens here.`,
  alternates: { canonical: "/discord" },
};

const BEFORE: { icon: IconName; title: string; body: string; href: string; cta: string }[] = [
  {
    icon: "chest",
    title: "Not joined the server yet?",
    body: "The address and the four steps to get in are on the how to play page.",
    href: "/how-to-play",
    cta: "How to play",
  },
  {
    icon: "shield",
    title: "Reporting someone?",
    body: "Read the rules first so you know which one was broken, then post in the support channel.",
    href: "/rules",
    cta: "Read the rules",
  },
  {
    icon: "cart",
    title: "Question about an order?",
    body: "Staff handle store questions in Discord. Bring your Minecraft username and what you bought.",
    href: "/store",
    cta: "Open the store",
  },
];

export default function DiscordPage() {
  return (
    <>
      <Discord standalone />

      <section className="relative mx-auto max-w-[92rem] px-5 pb-28 sm:px-8">
        <Reveal>
          <div className="border-t border-hair pt-12">
            <p className="eyebrow">Before you post</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {BEFORE.map((b) => (
                <li key={b.title}>
                  <Link
                    href={b.href}
                    className="group flex h-full flex-col border border-hair p-6 transition-colors duration-500 hover:border-steel"
                  >
                    <span className="slot grid h-10 w-10 place-items-center text-ice">
                      <Icon name={b.icon} size={18} />
                    </span>
                    <h2 className="display-tight mt-5 text-[1.15rem] text-paper">{b.title}</h2>
                    <p className="prose-lede mt-2.5 flex-1 text-[0.88rem]">{b.body}</p>
                    <span className="hud mt-5 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-ink-2 transition-colors duration-300 group-hover:text-glow">
                      {b.cta}
                      <Icon
                        name="arrow"
                        size={13}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
