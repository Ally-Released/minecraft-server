"use client";

import React, { useState } from "react";
import { Copy, Monitor, UserPlus, LogIn } from "lucide-react";

export default function JoinInstructions() {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText("play.clashernetwork.fun");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto" id="how-to-play">
      {/* Join Section */}
      <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
        <div className="flex-1">
          <h2 className="font-vampire text-5xl md:text-7xl text-white mb-6 leading-[0.9]">
            Join Clasher<br />Network.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
            Add the server once on Java or Bedrock, keep it in your list, and return whenever you are ready.
          </p>
          
          <div className="space-y-4 mb-10">
            <div className="flex justify-between items-center py-4 border-b border-border-card">
              <span className="text-xs font-bold text-gray-500 tracking-wider">ADDRESS</span>
              <span className="text-sm font-bold text-white">play.clashernetwork.fun</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-border-card">
              <span className="text-xs font-bold text-gray-500 tracking-wider">PORT</span>
              <span className="text-sm font-bold text-white">8000</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-border-card">
              <span className="text-xs font-bold text-gray-500 tracking-wider">ACCOUNTS</span>
              <span className="text-sm font-bold text-white">Premium and cracked accounts</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-border-card">
              <span className="text-xs font-bold text-gray-500 tracking-wider">COMPATIBILITY</span>
              <div className="flex gap-2">
                <span className="bg-bg-card border border-border-card px-3 py-1 rounded-full text-xs font-bold text-white">Java</span>
                <span className="bg-bg-card border border-border-card px-3 py-1 rounded-full text-xs font-bold text-white">Bedrock</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-border-card">
              <span className="text-xs font-bold text-gray-500 tracking-wider">CURRENT VERSION</span>
              <span className="text-sm font-bold text-white">Shown by live status when available</span>
            </div>
          </div>
          
          <button 
            onClick={copyIp}
            className="flex items-center gap-2 bg-accent-blue hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-bold transition-all text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Copy IP"}
          </button>
        </div>
        
        {/* Mockup */}
        <div className="flex-1 bg-bg-card border border-border-card p-4 rounded-3xl w-full max-w-xl shadow-2xl relative">
           <img src="/assets/night-voxel.webp" alt="Server Background" className="w-full h-auto rounded-2xl opacity-40 absolute inset-0 object-cover" />
           <div className="relative z-10 p-8 flex flex-col gap-6">
             <div>
               <p className="text-gray-400 font-mono text-sm mb-1">Server Name</p>
               <div className="bg-black/60 border-2 border-gray-600 p-3 font-mono text-white text-lg rounded-sm shadow-inner">
                 Clasher Network
               </div>
             </div>
             <div>
               <p className="text-gray-400 font-mono text-sm mb-1">Server Address</p>
               <div className="bg-black/60 border-2 border-gray-600 p-3 font-mono text-white text-lg rounded-sm shadow-inner">
                 play.clashernetwork.fun
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Start Playing Steps */}
      <div className="mb-16">
        <h2 className="font-vampire text-5xl md:text-7xl text-white mb-6 leading-[0.9]">
          Start playing<br />in minutes.
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
          Use Java or Bedrock, add the address, enter the Bedrock port when asked, and connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        <div className="bg-bg-card border border-border-card rounded-2xl p-10 flex flex-col justify-between min-h-[320px]">
          <div className="mb-8 flex justify-between items-start">
            <span className="text-sm font-bold text-gray-500">01</span>
            <Monitor className="text-accent-blue" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Open Servers</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Launch Minecraft on Java or Bedrock and open the multiplayer or servers menu.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-bg-card border border-border-card rounded-2xl p-8 flex-1 flex flex-col justify-between">
            <div className="mb-6 flex justify-between items-start">
              <span className="text-sm font-bold text-gray-500">02</span>
              <UserPlus className="text-accent-blue" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Add Clasher Network</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter play.clashernetwork.fun as the address. Bedrock players should also use port 8000.
              </p>
            </div>
          </div>

          <div className="bg-bg-card border border-border-card rounded-2xl p-8 flex-1 flex flex-col justify-between">
            <div className="mb-6 flex justify-between items-start">
              <span className="text-sm font-bold text-gray-500">03</span>
              <LogIn className="text-accent-blue" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Enter the world</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Save the server, connect, and use Discord whenever you need support.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-16 right-0">
          <button 
            onClick={copyIp}
            className="flex items-center gap-2 bg-accent-blue hover:bg-blue-400 text-white px-5 py-2.5 rounded-lg font-bold transition-all text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Copy IP"}
          </button>
        </div>
      </div>
    </section>
  );
}
