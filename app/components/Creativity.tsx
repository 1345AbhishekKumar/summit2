"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useRef } from "react";
import { FadeUp } from "./ui/FadeUp";
import { AnimatedTitle } from "./ui/AnimatedTitle";

export const Creativity = () => {
  const creativityRef = useRef(null);
  const { scrollYProgress: creativityProgress } = useScroll({ 
    target: creativityRef,
    offset: ["start end", "end start"]
  });
  const creativityY = useTransform(creativityProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={creativityRef} className="py-32 md:py-48 px-6 md:px-12 bg-[#F5F5F0] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <FadeUp>
            <p className="font-mono text-sm uppercase tracking-widest text-[#1A1A1A]/50 mb-4">02.5 // Exploration</p>
          </FadeUp>
          <AnimatedTitle text="Thrill follows\naction." className="text-5xl md:text-7xl font-serif tracking-tight mb-8" />
          <FadeUp delay={0.2}>
            <p className="text-xl text-[#1A1A1A]/70 max-w-md">
              Pushing the boundaries of human endurance. Our experimental approach blends raw physical challenge with fluid, contemporary routing, creating journeys that inspire and provoke the explorer within.
            </p>
          </FadeUp>
        </div>
        <div className="order-1 lg:order-2 relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-sm">
          <motion.div style={{ y: creativityY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
            <SafeImage 
              src="https://picsum.photos/seed/trekking/1200/800" 
              alt="Trekking Expedition" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
