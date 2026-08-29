import { fetchServerStatus } from "@/lib/status";
import Hero from "@/components/site/Hero";
import Discord from "@/components/site/Discord";
import {
  HowToPlayStrip,
  ModesStrip,
  StoreCta,
} from "@/components/site/HomeSections";

export const revalidate = 60;


export default async function Home() {
  const status = await fetchServerStatus();

  return (
    <>
      <Hero status={status} />
      <ModesStrip />
      <HowToPlayStrip />
      <StoreCta />
      <Discord />
    </>
  );
}
