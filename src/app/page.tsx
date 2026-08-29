import React from "react";
import Navbar from "@/components/Navbar";
import AtmosphericBackground from "@/components/AtmosphericBackground";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowToPlay from "@/components/HowToPlay";
import Rules from "@/components/Rules";
import Discord from "@/components/Discord";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AtmosphericBackground />
      <Navbar />
      <Hero />
      <Features />
      <HowToPlay />
      <Rules />
      <Discord />
      <Footer />
    </main>
  );
}
