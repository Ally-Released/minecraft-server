"use client";

import React, { useState } from "react";
import { Gamepad2, Store, Copy, RefreshCcw, Info } from "lucide-react";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText("play.clashernetwork.fun");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/cn_hero_bg.jpg" 
          alt="Hero Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Content */}
        <div className="flex-1 max-w-2xl mt-12 md:mt-0">
          <p className="text-brand font-bold text-xs tracking-[0.2em] uppercase mb-6">Oceanic Survival Server</p>
          <h1 className="font-vampire text-6xl md:text-8xl leading-[0.85] text-white mb-8 drop-shadow-lg">
            Rule the<br />
            Network.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
            A focused survival SMP for builders, teams, and players who want a world worth returning to.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 bg-accent-blue hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Gamepad2 size={20} />
              Play now
            </button>
            <button className="flex items-center gap-2 bg-transparent border border-gray-600 hover:border-gray-400 hover:bg-white/5 text-white px-6 py-3 rounded-lg font-bold transition-all">
              <Store size={20} />
              View store
            </button>
          </div>
        </div>

        {/* Right Content - Server Card */}
        <div className="w-full max-w-md relative">
          {/* Floating Icon Decoration */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <img src="/assets/java-server-entry.png" alt="Decoration" className="w-48 h-auto drop-shadow-2xl animate-pulse" />
          </div>

          <div className="bg-bg-card border border-border-card rounded-2xl p-6 shadow-2xl relative z-10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              <span className="text-sm font-bold text-white">Server offline</span>
            </div>

            <div className="mb-6 border-b border-border-card pb-6">
              <p className="text-xs font-bold text-gray-400 tracking-wider mb-2">SERVER ADDRESS</p>
              <div className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight">play.clashernetwork.fun</div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider mb-1">PLAYERS</p>
                <p className="text-sm text-gray-200 font-semibold">Not available</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider mb-1">ACCESS</p>
                <p className="text-sm text-gray-200 font-semibold">Premium and cracked accounts</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider mb-1">PORT</p>
                <p className="text-sm text-gray-200 font-semibold">8000</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider mb-1">COMPATIBILITY</p>
                <p className="text-sm text-gray-200 font-semibold">Java and Bedrock</p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 mb-6">
              <Info size={16} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-200/80 leading-relaxed">The server may be restarting. Check Discord for an update.</p>
            </div>

            <div className="flex gap-3 mb-4">
              <button 
                onClick={copyIp}
                className="flex-1 flex justify-center items-center gap-2 bg-accent-blue hover:bg-blue-400 text-white py-3 rounded-lg font-bold transition-all text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy IP"}
              </button>
              <button className="flex-1 flex justify-center items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-lg font-bold transition-all text-sm shadow-[0_0_15px_rgba(88,101,242,0.2)]">
                <img src="/assets/discord-logo.svg" alt="Discord" className="w-5 h-5 invert" />
                Join Discord
              </button>
            </div>

            <button className="flex items-center gap-2 text-accent-blue text-xs font-bold hover:text-blue-300 transition-colors">
              <RefreshCcw size={12} />
              Check again
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
