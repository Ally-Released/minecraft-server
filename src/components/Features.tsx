import React from "react";
import { Gamepad2, Users, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto" id="rules">
      <div className="max-w-3xl mb-16">
        <h2 className="font-vampire text-5xl md:text-7xl text-white mb-6">
          One world. One<br />clear focus.
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Clasher Network keeps the public experience centered on survival, community, and the moments players make together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Feature Card */}
        <div className="lg:col-span-2 bg-bg-card border border-border-card rounded-2xl p-10 flex flex-col justify-between min-h-[360px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 mb-8">
            <span className="text-sm font-bold text-gray-500 mb-2 block">01</span>
            <Gamepad2 className="text-accent-blue" size={32} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Build something lasting</h3>
            <p className="text-gray-400 leading-relaxed max-w-lg">
              Claim your space, gather resources, and turn a blank area into a base your team remembers.
            </p>
          </div>
        </div>

        {/* Right side stack */}
        <div className="flex flex-col gap-6">
          <div className="bg-bg-card border border-border-card rounded-2xl p-8 flex-1 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-6 flex justify-between items-start">
              <span className="text-sm font-bold text-gray-500">02</span>
              <Users className="text-accent-blue" size={28} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3">Play with your people</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create a team, meet players on Discord, and plan your next session together.
              </p>
            </div>
          </div>

          <div className="bg-bg-card border border-border-card rounded-2xl p-8 flex-1 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 mb-6 flex justify-between items-start">
              <span className="text-sm font-bold text-gray-500">03</span>
              <ShieldCheck className="text-accent-blue" size={28} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-3">Get help quickly</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Reach staff through the official Discord or support email when something needs attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
