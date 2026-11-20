"use client";

import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useState } from "react";
import { FadeUp } from "./ui/FadeUp";
import { AnimatedTitle } from "./ui/AnimatedTitle";
import { staggerContainer, staggerItem, ease } from "@/app/lib/constants";

export const Floorplans = () => {
  const [activeFloor, setActiveFloor] = useState(0);
  const floors = [
    { name: "Basecamp", size: "2,000 M", desc: "Acclimatization, Gear, Prep", img: "https://picsum.photos/seed/basecamp/800/800" },
    { name: "Camp 01", size: "4,500 M", desc: "Glacier Crossing", img: "https://picsum.photos/seed/camp1/800/800" },
    { name: "Camp 02", size: "6,000 M", desc: "Ice Wall Ascent", img: "https://picsum.photos/seed/camp2/800/800" },
    { name: "The Summit", size: "8,848 M", desc: "Peak & Glory", img: "https://picsum.photos/seed/summit/800/800" },
  ];

  return (
    <section id="routes" className="py-32 bg-[#1A1A1A] text-[#F5F5F0] px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <FadeUp>
            <p className="font-mono text-sm uppercase tracking-widest text-white/50 mb-4">04 // The Routes</p>
          </FadeUp>
          <AnimatedTitle text="The Ascent." className="text-5xl md:text-7xl font-serif tracking-tight mb-16" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col border-t border-white/20"
          >
            {floors.map((floor, idx) => (
              <motion.button 
                variants={staggerItem}
                key={idx}
                onClick={() => setActiveFloor(idx)}
                onMouseEnter={() => setActiveFloor(idx)}
                onFocus={() => setActiveFloor(idx)}
                aria-pressed={activeFloor === idx}
                className={`w-full py-8 border-b border-white/20 cursor-pointer transition-all duration-500 flex justify-between items-center group text-left ${activeFloor === idx ? 'opacity-100 pl-8' : 'opacity-50 hover:opacity-80'}`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-2xl transition-transform duration-500 ${activeFloor === idx ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:opacity-50'}`} aria-hidden="true">→</span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-serif">{floor.name}</h3>
                    <p className="font-mono text-sm mt-2 text-white/60">{floor.desc}</p>
                  </div>
                </div>
                <span className="font-mono tracking-widest text-sm">{floor.size}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        <div className="relative aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-full rounded-sm overflow-hidden bg-white/5 flex items-center justify-center p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFloor}
              initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 0.95, filter: "blur(10px)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, filter: "blur(0px)" }}
              exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease }}
              className="relative w-full h-full"
            >
              <SafeImage 
                src={floors[activeFloor].img} 
                alt={`Map showing route for ${floors[activeFloor].name}`} 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain mix-blend-screen opacity-80" 
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
