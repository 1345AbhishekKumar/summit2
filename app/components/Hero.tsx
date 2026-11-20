"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useRef } from "react";
import { ease } from "@/app/lib/constants";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[#1A1A1A]">
      <motion.div 
        initial={{ scale: 1.1 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 2, ease }}
        style={{ y: yHero, opacity: opacityHero }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <SafeImage src="https://picsum.photos/seed/archhero/1920/1080" alt="Mountain Expedition Landscape" fill sizes="100vw" className="object-cover opacity-60" priority />
      </motion.div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pb-20 md:pb-32 z-10 pointer-events-none">
        <div className="overflow-visible pb-4">
          <motion.h1 
            initial={{ y: "100%", rotate: 5 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 1.5, ease, delay: 0.2 }}
            className="font-serif text-[18vw] md:text-[12vw] leading-[0.8] text-[#F5F5F0] tracking-tighter origin-bottom-left"
          >
            CONQUER
            <span className="sr-only"> THE WILD.</span>
          </motion.h1>
        </div>
        <div className="overflow-visible flex items-center gap-8 pb-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "10vw" }}
            transition={{ duration: 1.5, ease, delay: 0.8 }}
            className="hidden md:block h-[2px] bg-[#F5F5F0]"
            aria-hidden="true"
          />
          <motion.div 
            initial={{ y: "100%", rotate: 5 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 1.5, ease, delay: 0.3 }}
            className="font-serif text-[18vw] md:text-[12vw] leading-[0.8] text-[#F5F5F0] tracking-tighter italic origin-bottom-left"
            aria-hidden="true"
          >
            THE WILD.
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 right-6 md:right-12 text-[#F5F5F0] flex flex-col items-end gap-2"
      >
        <span className="hidden md:block text-xs uppercase tracking-widest font-mono">Scroll to explore</span>
        <div className="w-[1px] h-16 bg-white/30 overflow-hidden relative">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};
