import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border-card bg-bg-dark pt-16 pb-8 px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div>
          <span className="font-vampire text-xl tracking-widest text-white uppercase block mb-2">CLASHER NETWORK</span>
          <p className="text-gray-500 text-sm">Build more.</p>
        </div>
        
        <div className="flex gap-12">
          <div className="flex flex-col gap-3">
            <a href="#home" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="#how-to-play" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">How to play</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#rules" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Rules</a>
            <a href="#discord" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 text-center md:text-left text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Clasher Network. All rights reserved. Not affiliated with Mojang AB.
      </div>
    </footer>
  );
}
