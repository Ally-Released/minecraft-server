import { SERVER_CONFIG } from "@/lib/config";
import Reveal from "@/components/ui/Reveal";

export default function WorldIntro() {
  const { intro } = SERVER_CONFIG;

  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36 lg:py-44">
      {/* ambient light still falling from the beacon, one section up */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 78% -28%, rgba(35,102,180,0.3), transparent 66%)",
        }}
      />
      <div aria-hidden className="block-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.22]" />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
            <span className="eyebrow">{intro.eyebrow}</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <h2 className="display text-[clamp(2.4rem,6.4vw,5.6rem)] lg:col-span-7">
            <Reveal>
              <span className="block text-paper">{intro.headline[0]}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="mt-1 block pl-[7%] text-ice/85">{intro.headline[1]}</span>
            </Reveal>
          </h2>

          <Reveal delay={0.16} className="lg:col-span-5 lg:pt-4">
            <p className="prose-lede max-w-md text-[1.02rem]">{intro.body}</p>
          </Reveal>
        </div>

        {/* Pillars — a band of information, not a row of cards */}
        <div className="mt-20 grid border-t border-hair sm:mt-24 md:grid-cols-3">
          {intro.pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.09}>
              <div
                className={`group relative h-full py-9 md:pr-8 ${
                  i > 0 ? "border-t border-hair md:border-l md:border-t-0 md:pl-10" : ""
                }`}
              >
                {/* the hairline above each pillar catches light on hover */}
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-0 bg-gradient-to-r from-glow to-transparent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
                <div className="flex items-baseline gap-4">
                  <span className="hud text-[0.62rem] tracking-[0.3em] text-steel transition-colors duration-500 group-hover:text-glow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-tight text-2xl text-paper sm:text-[1.7rem]">{p.label}</h3>
                </div>
                <p className="prose-lede mt-3.5 max-w-xs text-[0.95rem] md:max-w-none">{p.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
