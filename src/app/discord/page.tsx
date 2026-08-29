import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_CONFIG } from "@/lib/config";
import Discord from "@/components/site/Discord";

export const metadata: Metadata = {
  title: "Discord",
  description: `The ${SERVER_CONFIG.name} community. Announcements, support, teammates and events — the server's conversation happens here.`,
  alternates: { canonical: "/discord" },
};

const BEFORE = [
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

      <section className="border-t border-hair pb-24">
        <div className="mx-auto max-w-[56rem] px-5 pt-20 sm:px-8">
          <div className="mb-12">
            <p className="eyebrow text-electric">Before you post</p>
          </div>
          
          <ul className="space-y-10">
            {BEFORE.map((b, i) => (
              <li key={b.title} className="flex gap-6">
                <span className="hud text-ink-3 pt-1">0{i + 1}</span>
                <div>
                  <h3 className="display-tight text-[1.2rem] text-white">{b.title}</h3>
                  <p className="prose-lede mt-2 text-[1rem] leading-relaxed max-w-lg">{b.body}</p>
                  <Link href={b.href} className="mt-3 inline-block font-mono text-[0.8rem] text-electric uppercase tracking-widest hover:text-white">
                    {b.cta} →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
