"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useRef } from "react";

// 25 deterministic chaotic 3D offsets for the 5x5 image grid
const chaosValues25 = [
  { x: -800, y: -600, z: 500, rX: 75, rY: -80, rZ: 120 },
  { x: 400, y: -900, z: -300, rX: -45, rY: 60, rZ: -75 },
  { x: -500, y: 400, z: 600, rX: 120, rY: -45, rZ: 90 },
  { x: 900, y: 200, z: -700, rX: -90, rY: 120, rZ: -150 },
  { x: -600, y: -300, z: 200, rX: 45, rY: -60, rZ: 45 },
  { x: 700, y: -800, z: -400, rX: -120, rY: 90, rZ: -120 },
  { x: -300, y: 800, z: 300, rX: 90, rY: -120, rZ: 60 },
  { x: 500, y: 300, z: -200, rX: -60, rY: 45, rZ: -90 },
  { x: -900, y: -400, z: 700, rX: 150, rY: -90, rZ: 135 },
  { x: 600, y: -200, z: -600, rX: -45, rY: 60, rZ: -45 },
  { x: -200, y: 900, z: 400, rX: 120, rY: -45, rZ: 150 },
  { x: 800, y: 600, z: -300, rX: -90, rY: 135, rZ: -60 },
  { x: -700, y: -800, z: 600, rX: 60, rY: -60, rZ: 90 },
  { x: 300, y: -300, z: -800, rX: -135, rY: 90, rZ: -135 },
  { x: -400, y: 600, z: 200, rX: 90, rY: -135, rZ: 45 },
  { x: 900, y: 400, z: -400, rX: -60, rY: 45, rZ: -90 },
  { x: -600, y: -200, z: 800, rX: 150, rY: -90, rZ: 135 },
  { x: 500, y: -600, z: -500, rX: -45, rY: 60, rZ: -45 },
  { x: -300, y: 800, z: 300, rX: 120, rY: -45, rZ: 150 },
  { x: 700, y: 300, z: -200, rX: -90, rY: 135, rZ: -60 },
  { x: -900, y: -900, z: 400, rX: 60, rY: -60, rZ: 90 },
  { x: 600, y: -400, z: -700, rX: -135, rY: 90, rZ: -135 },
  { x: -200, y: 400, z: 600, rX: 90, rY: -135, rZ: 45 },
  { x: 800, y: 800, z: -300, rX: -60, rY: 45, rZ: -90 },
  { x: -700, y: -300, z: 200, rX: 150, rY: -90, rZ: 135 },
];

const Fragment = ({ r, c, chaos, progress }: { r: number, c: number, chaos: any, progress: any }) => {
  // Calculate the clip-path inset percentages for a 5x5 grid
  const top = r * 20;
  const bottom = 100 - (r + 1) * 20;
  const left = c * 20;
  const right = 100 - (c + 1) * 20;
  
  // Interpolate from chaotic 3D position to perfect 0,0,0 alignment
  const x = useTransform(progress, [0, 0.7], [chaos.x, 0]);
  const y = useTransform(progress, [0, 0.7], [chaos.y, 0]);
  const z = useTransform(progress, [0, 0.7], [chaos.z, 0]);
  const rotateX = useTransform(progress, [0, 0.7], [chaos.rX, 0]);
  const rotateY = useTransform(progress, [0, 0.7], [chaos.rY, 0]);
  const rotateZ = useTransform(progress, [0, 0.7], [chaos.rZ, 0]);
  const opacity = useTransform(progress, [0, 0.2, 0.7], [0, 1, 1]);

  // Fade out the borders as they assemble to create a seamless final image
  const borderOpacity = useTransform(progress, [0.6, 0.75], [1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
        x, y, z, rotateX, rotateY, rotateZ, opacity,
        transformStyle: "preserve-3d"
      }}
    >
      <SafeImage src="https://picsum.photos/seed/mountain_fragment/1600/1000" alt="" fill sizes="100vw" className="object-cover" priority />
      <motion.div 
        style={{ opacity: borderOpacity, willChange: "transform, opacity" }}
        className="absolute inset-0 border-[0.5px] border-white/30 bg-white/5" 
      />
    </motion.div>
  );
};

const AnimatedChar = ({ char, i, progress, delayOffset }: { char: string, i: number, progress: any, delayOffset: number }) => {
  const rY = ((i * 137) % 200) - 100;
  const rX = ((i * 93) % 200) - 100;
  const rRot = ((i * 47) % 180) - 90;
  
  const opacity = useTransform(progress, [0.5 + delayOffset, 0.8 + delayOffset], [0, 1]);
  const y = useTransform(progress, [0.5 + delayOffset, 0.9 + delayOffset], [rY, 0]);
  const x = useTransform(progress, [0.5 + delayOffset, 0.9 + delayOffset], [rX, 0]);
  const rotate = useTransform(progress, [0.5 + delayOffset, 0.9 + delayOffset], [rRot, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        x,
        rotate,
        display: "inline-block"
      }}
      className={`text-[12vw] md:text-[8vw] font-serif tracking-tighter leading-none text-white ${delayOffset > 0 ? 'italic' : ''}`}
    >
      {char}
    </motion.span>
  );
};

export const DeconstructedArchitecture = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Add spring physics to the scroll progress for a more organic, alive feel
  const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.8 });

  // Abstract Background Geometry Animations
  const bgRotate1 = useTransform(springProgress, [0, 1], [0, 180]);
  const bgRotate2 = useTransform(springProgress, [0, 1], [0, -120]);
  const bgScale = useTransform(springProgress, [0, 0.5, 1], [0.5, 1.2, 1]);
  const pathLength = useTransform(springProgress, [0, 0.8], [0, 1]);

  // Final assembly scale for the entire image block
  const finalScale = useTransform(springProgress, [0.7, 1], [1, 1.05]);

  const title1 = "RELENTLESS".split("");
  const title2 = "ENDURANCE.".split("");

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505] text-[#F5F5F0]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[1500px]">
        
        {/* Abstract Geometric Background Forms */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <svg className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] overflow-visible" viewBox="0 0 100 100">
            <motion.circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.1" fill="none" style={{ pathLength }} />
            <motion.circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.2" fill="none" strokeDasharray="1 2" style={{ rotate: bgRotate1, originX: "50px", originY: "50px" }} />
            <motion.rect x="15" y="15" width="70" height="70" stroke="white" strokeWidth="0.1" fill="none" style={{ rotate: bgRotate2, originX: "50px", originY: "50px" }} />
            <motion.polygon points="50,5 95,95 5,95" stroke="white" strokeWidth="0.1" fill="none" style={{ rotate: bgRotate1, originX: "50px", originY: "50px" }} />
          </svg>
        </motion.div>

        {/* The Fragmented Image Assembly */}
        <motion.div 
          style={{ scale: finalScale, transformStyle: "preserve-3d" }} 
          className="relative w-[90vw] h-[60vw] md:w-[60vw] md:h-[40vw] max-w-[1200px] max-h-[800px] shadow-2xl"
        >
          {chaosValues25.map((chaos, i) => {
            const r = Math.floor(i / 5);
            const c = i % 5;
            return <Fragment key={i} r={r} c={c} chaos={chaos} progress={springProgress} />;
          })}
        </motion.div>

        {/* Overlay Text Assembling from Chaos */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference z-20">
          <div className="flex overflow-hidden">
            {title1.map((char, i) => (
              <AnimatedChar key={i} char={char} i={i} progress={springProgress} delayOffset={0} />
            ))}
          </div>
          <div className="flex overflow-hidden">
            {title2.map((char, i) => (
              <AnimatedChar key={i} char={char} i={i} progress={springProgress} delayOffset={0.05} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-10 text-white/50 font-mono text-sm uppercase tracking-widest">
          Scroll to Conquer
        </div>
      </div>
    </section>
  );
};
