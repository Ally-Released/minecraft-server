import React from "react";
import { Store } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="font-vampire text-2xl tracking-widest text-white uppercase mt-1">CLASHER NETWORK</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#home" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Home</a>
        <a href="#how-to-play" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">How to play</a>
        <a href="#rules" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Rules</a>
        <a href="#discord" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Discord</a>
        
        <a href="#" className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-black px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,178,56,0.3)]">
          <Store size={16} className="stroke-[2.5]" />
          View store
        </a>
      </div>
    </nav>
  );
}
