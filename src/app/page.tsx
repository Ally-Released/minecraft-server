import { fetchServerStatus } from "@/lib/status";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import WorldIntro from "@/components/site/WorldIntro";
import HowToPlay from "@/components/site/HowToPlay";
import Experience from "@/components/site/Experience";
import StatusCore from "@/components/site/StatusCore";
import Rules from "@/components/site/Rules";
import Discord from "@/components/site/Discord";
import FinalCta from "@/components/site/FinalCta";
import Footer from "@/components/site/Footer";
import Ridge from "@/components/ui/Ridge";

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
      <Ridge seed={seed} className="bottom-0 h-full" />
    </div>
  );
}

export default async function Home() {
  const status = await fetchServerStatus();

  return (
    <>
      <Nav />
      <main>
        <Hero status={status} />
        <WorldIntro />
        <Horizon seed={8123} />
        <HowToPlay />
        <Experience />
        <Horizon seed={4471} glow={0.16} />
        <StatusCore initial={status} />
        <Rules />
        <Discord />
        <FinalCta />
      </main>
      <Footer />
      <div aria-hidden className="grain-overlay" />
    </>
  );
}
