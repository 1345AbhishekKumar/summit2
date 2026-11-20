"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useRef } from "react";
import { FadeUp } from "./ui/FadeUp";
import { AnimatedTitle } from "./ui/AnimatedTitle";

export const Amenities = () => {
  const bentoRef = useRef(null);
  const { scrollYProgress: bentoProgress } = useScroll({ target: bentoRef, offset: ["start end", "end start"] });
  const bentoBg = useTransform(bentoProgress, [0, 0.5], ["#F5F5F0", "#EAE9E4"]);

  return (
    <motion.section id="amenities" ref={bentoRef} style={{ backgroundColor: bentoBg }} className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <FadeUp>
          <p className="font-mono text-sm uppercase tracking-widest text-[#1A1A1A]/50 mb-4">03 // Basecamps</p>
        </FadeUp>
        <AnimatedTitle text="Curated Journeys." className="text-5xl md:text-7xl font-serif tracking-tight mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          <FadeUp delay={0.1} className="md:col-span-2 relative rounded-sm overflow-hidden group bg-[#1A1A1A]">
            <SafeImage src="https://picsum.photos/seed/basecamp2/1000/800" alt="Alpine Basecamp gathering area" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
              <h3 className="text-3xl font-serif text-white mb-2">Alpine Basecamp</h3>
              <p className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">A vibrant hub for morning briefings and afternoon recovery.</p>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.2} className="relative rounded-sm overflow-hidden group bg-transparent p-8 flex flex-col justify-between border border-[#1A1A1A]/10 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-500">
            <h3 className="text-3xl font-serif">State of the art<br/>Gear Rental</h3>
            <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
              ↗
            </div>
          </FadeUp>

          <FadeUp delay={0.3} className="relative rounded-sm overflow-hidden group bg-transparent p-8 flex flex-col justify-between border border-[#1A1A1A]/10 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-500">
            <h3 className="text-3xl font-serif">Expedition &<br/>Focus Areas</h3>
            <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
              ↗
            </div>
          </FadeUp>

          <FadeUp delay={0.4} className="md:col-span-2 relative rounded-sm overflow-hidden group bg-[#1A1A1A]">
            <SafeImage src="https://picsum.photos/seed/summit2/1000/800" alt="Panoramic view from the mountain summit" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
              <h3 className="text-3xl font-serif text-white mb-2">Panoramic Summits</h3>
              <p className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">Unmatched views of the mountain ranges and untamed valleys.</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </motion.section>
  );
};
