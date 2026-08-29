"use client";

import { Calendar, Globe, Hammer, Shield, Sword, Users, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { SERVER_CONFIG } from "@/lib/config";
import Reveal from "@/components/ui/Reveal";
import Ridge from "@/components/ui/Ridge";

const ICONS: Record<string, LucideIcon> = { Sword, Globe, Hammer, Calendar, Shield, Users };

/** Panel spans, keyed by index — an asymmetric mosaic rather than a grid of clones. */
const SPAN = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

function Panel({
  index,
  icon,
  label,
  description,
  tall,
  seed,
}: {
  index: number;
  icon: string;
  label: string;
  description: string;
  tall: boolean;
  seed: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[icon] ?? Globe;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className="slab group h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "0%" }}
    >
      <div
        className={`slab-face relative flex h-full flex-col overflow-hidden p-7 sm:p-8 ${
          tall ? "min-h-[17rem] lg:min-h-[23rem]" : "min-h-[13.5rem]"
        }`}
      >
        <div aria-hidden className="block-grid pointer-events-none absolute inset-0 opacity-[0.13]" />

        {/* every panel gets its own patch of the same landscape */}
        <Ridge
          seed={seed}
          className="bottom-0 h-[46%] opacity-80 transition-opacity duration-700 group-hover:opacity-100"
          fill="#0d2a4e"
          rim={0.35}
          lightX={24}
          height={150}
          block={14}
          amplitude={0.62}
          base={0.94}
          peaks={2.6}
          octaves={2}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
          style={{
            background:
              "linear-gradient(to top, rgba(4,16,31,0.92) 26%, rgba(4,16,31,0.55) 60%, transparent 100%)",
          }}
        />
        {/* the panel is lit by wherever the cursor is */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(28rem 20rem at var(--mx) var(--my), rgba(77,163,255,0.20), transparent 62%)",
          }}
        />

        <div className="relative flex items-start justify-between">
          <span className="slab slab-sm inline-block">
            <span className="slab-face grid h-11 w-11 place-items-center bg-void/80 text-ice transition-colors duration-500 group-hover:text-glow">
              <Icon size={19} strokeWidth={1.6} />
            </span>
          </span>
          <span className="hud text-[0.6rem] tracking-[0.3em] text-steel">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="relative mt-auto pt-10">
          <h3
            className={`display-tight text-paper ${
              tall ? "text-[2.1rem] sm:text-[2.9rem]" : "text-[1.7rem]"
            }`}
          >
            {label}
          </h3>
          <p className={`prose-lede mt-3 ${tall ? "max-w-sm text-[1.02rem]" : "text-[0.94rem]"}`}>
            {description}
          </p>
        </div>

        {/* light gathering along the bottom edge on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-glow via-electric to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 44% at 88% 14%, rgba(24,74,128,0.3), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-gradient-to-r from-glow to-transparent" />
              <span className="eyebrow">The experience</span>
            </div>
            <h2 className="display mt-7 text-[clamp(2.4rem,6.4vw,5.4rem)] text-paper">
              What&apos;s waiting
              <span className="block text-ice/85">on the other side.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="prose-lede max-w-sm text-[1.02rem]">
              Everything below is running on {SERVER_CONFIG.name} right now — no roadmap items, no
              coming-soon banners.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-12">
          {SERVER_CONFIG.features.map((f, i) => (
            <Reveal key={f.label} delay={(i % 3) * 0.08} className={SPAN[i] ?? "lg:col-span-4"}>
              <Panel
                index={i}
                icon={f.icon}
                label={f.label}
                description={f.description}
                tall={i === 0}
                seed={1301 + i * 977}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
