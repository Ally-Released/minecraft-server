import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VisualShowcase from "@/components/VisualShowcase";
import JoinInstructions from "@/components/JoinInstructions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <VisualShowcase />
      <JoinInstructions />
      <Footer />
    </main>
  );
}
