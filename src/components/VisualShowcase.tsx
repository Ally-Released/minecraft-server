import React from "react";

export default function VisualShowcase() {
  return (
    <section className="py-12 px-8 max-w-7xl mx-auto">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden group shadow-2xl">
        <img 
          src="/assets/cn_showcase_bg.jpg" 
          alt="Clasher Network Spawn" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent"></div>
        
        <div className="absolute bottom-10 left-10 max-w-xl z-10">
          <h2 className="font-vampire text-5xl md:text-7xl text-white mb-4 leading-none">
            Your<br />next base<br />starts here.
          </h2>
          <p className="text-gray-300 text-lg">
            Explore, build, and protect your progress in a shared survival world.
          </p>
        </div>
      </div>
    </section>
  );
}
