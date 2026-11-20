"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { useRef } from "react";

const NUM_SLICES = 7;

interface TerrainSliceProps {
  index: number;
  smoothProgress: MotionValue<number>;
}

const TerrainSlice = ({ index: i, smoothProgress }: TerrainSliceProps) => {
  // Center slice moves the least, outer slices move the most
  const normalizedIndex = i - (NUM_SLICES - 1) / 2;

  const targetY = normalizedIndex * 12; // vertical spread
  const targetX = (i % 2 === 0 ? 1 : -1) * Math.abs(normalizedIndex) * 1.5; // horizontal shift
  const targetRotate = (i % 2 === 0 ? -1 : 1) * Math.abs(normalizedIndex) * 1; // slight rotation
  const targetZ = Math.abs(normalizedIndex) * 40; // 3D depth

  const initialX = i % 2 === 0 ? 100 : -100;

  // 0.0 to 0.3: Slide in from left/right to assemble
  // 0.3 to 0.5: Hold as a complete image
  // 0.5 to 0.9: Break apart into tectonic plates
  const y = useTransform(smoothProgress, [0, 0.3, 0.5, 0.9], ["0vh", "0vh", "0vh", `${targetY}vh`]);
  const x = useTransform(smoothProgress, [0, 0.3, 0.5, 0.9], [`${initialX}vw`, "0vw", "0vw", `${targetX}vw`]);
  const rotateZ = useTransform(smoothProgress, [0, 0.3, 0.5, 0.9], [0, 0, 0, targetRotate]);
  const z = useTransform(smoothProgress, [0, 0.3, 0.5, 0.9], [0, 0, 0, targetZ]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, zIndex: 50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        top: `${(i / NUM_SLICES) * 100}%`,
        height: `${100 / NUM_SLICES}%`,
        y, x, rotateZ, z,
        // Higher z-index for top slices so their shadows fall on the slices below
        zIndex: NUM_SLICES - i,
        willChange: "transform"
      }}
      className="absolute left-0 w-full overflow-hidden shadow-2xl border-y border-white/20 bg-[#1A1A1A] cursor-crosshair"
    >
      <div
        className="absolute left-0 w-full"
        style={{
          // Offset the image perfectly so it aligns across all slices
          top: `-${i * 100}%`,
          height: `${NUM_SLICES * 100}%`
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalMJvDuqeufjdTQhVPZuDclz8K6bfrB90aA&s"
          alt="Topographic landscape"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
    </motion.div>
  );
};

export const FluidTopography = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for a fluid, organic feel
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const fluidTitleY = useTransform(smoothProgress, [0, 1], [150, -150]);
  const terrainTitleY = useTransform(smoothProgress, [0, 1], [-150, 150]);

  // Fade in the text only when the terrain has shifted
  const textOpacity = useTransform(smoothProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(smoothProgress, [0.6, 1], [20, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#EAE9E4] text-[#1A1A1A]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[2000px]">

        {/* Background Typography - Massive and subtle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
          <motion.h2
            style={{ y: fluidTitleY }}
            className="text-[22vw] leading-[0.75] font-serif italic tracking-tighter text-[#1A1A1A] opacity-5"
          >
            FLUID
          </motion.h2>
          <motion.h2
            style={{ y: terrainTitleY }}
            className="text-[20vw] leading-[0.75] font-sans font-bold tracking-tighter text-[#1A1A1A] opacity-5"
          >
            TERRAIN
          </motion.h2>
        </div>

        {/* Sliced Image Container - The "Shifting Tectonic Plates" */}
        <div className="relative w-[90vw] h-[60vh] md:w-[60vw] md:h-[70vh] max-w-[1200px] z-10">
          {Array.from({ length: NUM_SLICES }).map((_, i) => (
            <TerrainSlice key={i} index={i} smoothProgress={smoothProgress} />
          ))}
        </div>

        {/* Foreground Content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-12 right-6 md:right-12 max-w-sm text-right z-20 pointer-events-none"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-[#1A1A1A]/50 mb-4">05 // Adaptation</p>
          <p className="text-[#1A1A1A] text-lg md:text-xl font-medium leading-relaxed">
            The earth is not static. Our routes adapt to the shifting terrain, offering a unique expedition every time you step into the wild.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
