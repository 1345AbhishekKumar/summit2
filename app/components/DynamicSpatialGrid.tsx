"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useRef } from "react";
import { FadeUp } from "./ui/FadeUp";
import { AnimatedTitle } from "./ui/AnimatedTitle";

export const DynamicSpatialGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Map mouse position to grid column fractions
  const col1 = useTransform(smoothX, [0, 0.5, 1], [3, 1, 0.5]);
  const col2 = useTransform(smoothX, [0, 0.5, 1], [0.5, 2, 0.5]);
  const col3 = useTransform(smoothX, [0, 0.5, 1], [0.5, 1, 3]);

  // Map mouse position to grid row fractions
  const row1 = useTransform(smoothY, [0, 0.5, 1], [3, 1, 0.5]);
  const row2 = useTransform(smoothY, [0, 0.5, 1], [0.5, 2, 0.5]);
  const row3 = useTransform(smoothY, [0, 0.5, 1], [0.5, 1, 3]);

  const gridTemplateColumns = useMotionTemplate`${col1}fr ${col2}fr ${col3}fr`;
  const gridTemplateRows = useMotionTemplate`${row1}fr ${row2}fr ${row3}fr`;

  return (
    <section className="py-32 md:py-48 bg-[#EAE9E4] px-6 md:px-12 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full">
        <FadeUp>
          <p className="font-mono text-sm uppercase tracking-widest text-[#1A1A1A]/50 mb-4">Routes & Navigation</p>
        </FadeUp>
        <AnimatedTitle text="Dynamic\nTrails." className="text-5xl md:text-7xl font-serif tracking-tight mb-16 text-[#1A1A1A]" />
        
        <motion.div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ gridTemplateColumns, gridTemplateRows }}
          className="grid w-full h-[60vh] md:h-[80vh] gap-2 md:gap-4 cursor-crosshair"
        >
          {/* Cell 1: Image */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A]">
            <SafeImage src="https://picsum.photos/seed/adv1/800/800" alt="Mountain trail overview" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          {/* Cell 2: Text */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A] flex items-center justify-center p-6">
            <h3 className="text-[#F5F5F0] font-serif text-4xl md:text-6xl italic">01</h3>
          </div>

          {/* Cell 3: Image */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A]">
            <SafeImage src="https://picsum.photos/seed/adv2/800/800" alt="Forest path exploration" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Cell 4: Text */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A] flex items-center justify-center p-6">
            <h3 className="text-[#F5F5F0] font-serif text-3xl md:text-5xl tracking-tighter uppercase break-all text-center leading-none">Explore</h3>
          </div>

          {/* Cell 5: Center Focal Image */}
          <div className="relative rounded-sm overflow-hidden bg-white border border-[#1A1A1A]/10 p-2 md:p-4">
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <SafeImage src="https://picsum.photos/seed/adv3/800/800" alt="Summit view focal point" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>

          {/* Cell 6: Text */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A] flex items-center justify-center p-6">
            <h3 className="text-[#F5F5F0] font-serif text-3xl md:text-5xl tracking-tighter uppercase break-all text-center leading-none">Unknown</h3>
          </div>

          {/* Cell 7: Image */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A]">
            <SafeImage src="https://picsum.photos/seed/adv4/800/800" alt="River crossing adventure" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Cell 8: Text */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A] flex items-center justify-center p-6">
            <h3 className="text-[#F5F5F0] font-serif text-4xl md:text-6xl italic">02</h3>
          </div>

          {/* Cell 9: Image */}
          <div className="relative rounded-sm overflow-hidden bg-[#1A1A1A]">
            <SafeImage src="https://picsum.photos/seed/adv5/800/800" alt="Camping under the stars" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
        
        <div className="mt-6 flex justify-between items-center text-[#1A1A1A]/50 font-mono text-xs uppercase tracking-widest">
          <span>Interactive Map</span>
          <span>Hover to explore</span>
        </div>
      </div>
    </section>
  );
};
