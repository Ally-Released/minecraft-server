import { fetchServerStatus } from "@/lib/status";
import Hero from "@/components/site/Hero";
import WorldIntro from "@/components/site/WorldIntro";
import Experience from "@/components/site/Experience";
import StatusCore from "@/components/site/StatusCore";
import Discord from "@/components/site/Discord";
import FinalCta from "@/components/site/FinalCta";
import Ridge from "@/components/ui/Ridge";
import {
  HowToPlayStrip,
  ModesStrip,
  RulesStrip,
  StoreCta,
} from "@/components/site/HomeSections";

export const revalidate = 60;

/** The horizon reappearing between chapters — one landscape, many vantage points. */
function Horizon({ seed, glow = 0.22 }: { seed: number; glow?: number }) {
  return (
    <div aria-hidden className="relative h-28 w-full sm:h-40">
      <div
        className="absolute inset-x-0 bottom-0 h-full"
        style={{
          background: `radial-gradient(60% 90% at 68% 100%, rgba(45,120,205,${glow}), transparent 70%)`,
        }}
      />
      <Ridge seed={seed} className="bottom-0 h-full" height={170} block={16} />
    </div>
  );
}

export default async function Home() {
  const status = await fetchServerStatus();

  return (
    <>
      <Hero status={status} />
      <WorldIntro />
      <Experience />
      <Horizon seed={8123} />
      <ModesStrip />
      <StatusCore initial={status} />
      <StoreCta />
      <Horizon seed={4471} glow={0.16} />
      <HowToPlayStrip />
      <RulesStrip />
      <Discord />
      <FinalCta />
    </>
  );
}
