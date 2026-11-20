"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// 25 pseudo-random scatter transforms for the 5x5 grid
const scatterData = [
  { x: -800, y: -600, rZ: 45, rX: 60, rY: 30 },
  { x: 400, y: -900, rZ: -30, rX: -45, rY: 60 },
  { x: 900, y: -400, rZ: 120, rX: 30, rY: -45 },
  { x: -600, y: -800, rZ: -60, rX: 90, rY: 15 },
  { x: 700, y: -700, rZ: 85, rX: -30, rY: -60 },
  { x: -900, y: -200, rZ: -15, rX: 45, rY: 90 },
  { x: 500, y: -300, rZ: 150, rX: -60, rY: -30 },
  { x: 800, y: 100, rZ: -90, rX: 30, rY: 45 },
  { x: -400, y: -500, rZ: 30, rX: -90, rY: -15 },
  { x: 600, y: -100, rZ: -45, rX: 60, rY: 30 },
  { x: -700, y: 300, rZ: 105, rX: -30, rY: -60 },
  { x: 300, y: -600, rZ: -135, rX: 45, rY: 90 },
  { x: 900, y: 400, rZ: 60, rX: -60, rY: -30 },
  { x: -800, y: 600, rZ: -75, rX: 30, rY: 45 },
  { x: 200, y: -800, rZ: 15, rX: -90, rY: -15 },
  { x: 700, y: 600, rZ: -120, rX: 60, rY: 30 },
  { x: -500, y: 800, rZ: 45, rX: -30, rY: -60 },
  { x: 400, y: 700, rZ: -60, rX: 45, rY: 90 },
  { x: 800, y: 800, rZ: 135, rX: -60, rY: -30 },
  { x: -300, y: 900, rZ: -45, rX: 30, rY: 45 },
  { x: 600, y: 900, rZ: 90, rX: -90, rY: -15 },
  { x: -900, y: 500, rZ: -30, rX: 60, rY: 30 },
  { x: 100, y: 800, rZ: 75, rX: -30, rY: -60 },
  { x: 900, y: -800, rZ: -105, rX: 45, rY: 90 },
  { x: -600, y: 100, rZ: 165, rX: -60, rY: -30 },
];

const Fragment = ({ index, progress }: { index: number, progress: any }) => {
  const data = scatterData[index];
  const col = index % 5;
  const row = Math.floor(index / 5);

  // Map scroll progress to assembly and disassembly phases
  const x = useTransform(progress, [0, 0.4, 0.6, 1], [data.x, 0, 0, data.x * 1.5]);
  const y = useTransform(progress, [0, 0.4, 0.6, 1], [data.y, 0, 0, data.y * 1.5]);
  const rotateZ = useTransform(progress, [0, 0.4, 0.6, 1], [data.rZ, 0, 0, data.rZ * 1.5]);
  const rotateX = useTransform(progress, [0, 0.4, 0.6, 1], [data.rX, 0, 0, data.rX * 1.5]);
  const rotateY = useTransform(progress, [0, 0.4, 0.6, 1], [data.rY, 0, 0, data.rY * 1.5]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotateZ,
        rotateX,
        rotateY,
        opacity,
        backgroundImage: 'url(https://picsum.photos/seed/kinetic/1200/800)',
        backgroundSize: '500% 500%',
        backgroundPosition: `${col * 25}% ${row * 25}%`,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity"
      }}
      className="w-full h-full border-[0.5px] border-white/10 shadow-2xl"
    />
  );
};

export const KineticReassembly = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.35, 0.65], [0.8, 1.2]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#050505] text-[#F5F5F0]">
      <div 
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: 1500 }}
      >
        
        {/* Abstract background morphing shapes */}
        <motion.div 
          style={{ rotate: bgRotate }}
          className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
        >
          <div className="w-[80vw] h-[80vw] border border-white/20 rounded-full absolute mix-blend-overlay" />
          <div className="w-[60vw] h-[60vw] border border-white/20 rounded-full absolute mix-blend-overlay" />
          <div className="w-[100vw] h-[100vw] border border-white/10 absolute rotate-45 mix-blend-overlay" />
        </motion.div>

        {/* The 5x5 Fragmented Grid */}
        <div className="relative w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] max-w-[800px] max-h-[800px] grid grid-cols-5 grid-rows-5 gap-0 z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <Fragment key={i} index={i} progress={scrollYProgress} />
          ))}
        </div>

        {/* Floating Text */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mix-blend-difference"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-white/70 mb-4">Relentless Endurance</p>
          <h2 className="text-[12vw] md:text-[8vw] font-serif tracking-tighter leading-none text-white text-center">
            PUSHING<br/>LIMITS.
          </h2>
        </motion.div>

      </div>
    </section>
  );
};
