import Image from "next/image";
import { SERVER_CONFIG } from "@/lib/config";
import Action from "@/components/ui/Action";
import Reveal from "@/components/ui/Reveal";

export default function Discord() {
  const { community } = SERVER_CONFIG;
  const invite = SERVER_CONFIG.discord.replace(/^https?:\/\//, "");

  return (
    <section id="discord" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 108%, rgba(47,127,212,0.34), transparent 68%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
                <span className="eyebrow">The community</span>
              </div>
              <h2 className="display mt-7 text-[clamp(2.4rem,6.4vw,5.4rem)] text-paper">
                {community.headline[0]}
                <span className="block lit">{community.headline[1]}</span>
              </h2>
              <p className="prose-lede mt-7 max-w-md text-[1.02rem]">{community.body}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-9 grid gap-px border border-hair bg-hair sm:grid-cols-2">
                {community.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3 bg-abyss px-5 py-4">
                    <span
                      aria-hidden
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-electric"
                    />
                    <span className="text-[0.92rem] leading-snug text-ink-2">{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* The door */}
          <Reveal delay={0.16} className="lg:col-span-5 lg:col-start-8">
            <a
              href={SERVER_CONFIG.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="slab group block"
              style={{ ["--bevel" as string]: "22px", ["--edge-angle" as string]: "155deg" }}
            >
              <div
                className="slab-face relative overflow-hidden px-8 py-12 sm:px-10 sm:py-16"
                style={{
                  ["--slab-fill" as string]:
                    "linear-gradient(155deg, #103a6d 0%, #0a2447 48%, #050f22 100%)",
                  ["--bevel" as string]: "22px",
                }}
              >
                <div
                  aria-hidden
                  className="block-grid pointer-events-none absolute inset-0 opacity-[0.16]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,180,255,0.4),transparent_66%)] blur-2xl transition-transform duration-700 group-hover:scale-125"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[440%]"
                />

                <div className="relative flex flex-col items-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
                    <Image
                      src="/assets/discord-logo.svg"
                      alt=""
                      width={34}
                      height={34}
                      className="h-8 w-8"
                    />
                  </span>
                  <p className="display mt-7 text-[2.2rem] leading-none text-paper sm:text-[2.8rem]">
                    Join the Discord
                  </p>
                  <p className="hud mt-4 text-[0.72rem] tracking-[0.14em] text-ice/80 break-all">
                    {invite}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 border-t border-white/15 pt-5 text-[0.72rem] uppercase tracking-[0.28em] text-ice/70 transition-colors duration-300 group-hover:text-paper">
                    Open invite
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </a>

            <div className="mt-4 flex justify-center">
              <Action variant="ghost" href={SERVER_CONFIG.discord} external className="w-full">
                <span className="text-[0.78rem]">Having trouble joining? Ask staff</span>
              </Action>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
