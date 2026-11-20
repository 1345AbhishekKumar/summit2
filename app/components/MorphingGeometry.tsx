"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useRef, useEffect } from "react";
import { AnimatedTitle } from "./ui/AnimatedTitle";

let sharedAudioCtx: AudioContext | null = null;

const playGlassSound = () => {
  try {
    if (!sharedAudioCtx) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      sharedAudioCtx = new AudioContext();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }

    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, sharedAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, sharedAudioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, sharedAudioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, sharedAudioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, sharedAudioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(sharedAudioCtx.destination);
    osc.start();
    osc.stop(sharedAudioCtx.currentTime + 0.3);
  } catch (e) {
    // Ignore audio errors
  }
};

export const MorphingGeometry = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for fluid glass movement
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Mouse tracking for the "alive" feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 100;
      const y = (e.clientY / innerHeight - 0.5) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Background scale
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);

  // Typography movement (extreme parallax)
  const text1X = useTransform(smoothProgress, [0, 1], ["-30%", "30%"]);
  const text2X = useTransform(smoothProgress, [0, 1], ["30%", "-30%"]);

  const handleInteract = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }
    playGlassSound();
  };

  // Glass Shard 1 (Tall Rectangle)
  const shard1Y = useTransform(smoothProgress, [0, 1], ["100%", "-100%"]);
  const shard1Rotate = useTransform(smoothProgress, [0, 1], [0, 90]);

  // Glass Shard 2 (Circle Lens)
  const shard2X = useTransform(smoothProgress, [0, 1], ["-100%", "100%"]);
  const shard2Y = useTransform(smoothProgress, [0, 1], ["50%", "-50%"]);
  const shard2Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 2, 0.5]);

  // Glass Shard 3 (Diamond)
  const shard3Y = useTransform(smoothProgress, [0, 1], ["-50%", "150%"]);
  const shard3RotateX = useTransform(smoothProgress, [0, 1], [0, 180]);
  const shard3RotateZ = useTransform(smoothProgress, [0, 1], [-45, 135]);

  // Glass Shard 4 (Pill)
  const shard4X = useTransform(smoothProgress, [0, 1], ["100%", "-100%"]);
  const shard4Rotate = useTransform(smoothProgress, [0, 1], [45, -45]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505] text-[#F5F5F0]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-[1000px]">

        {/* Background Landscape */}
        <motion.div style={{ scale: bgScale, willChange: "transform" }} className="absolute inset-0 opacity-40">
          <SafeImage src="https://picsum.photos/seed/landscape/1920/1080" alt="" fill sizes="100vw" className="object-cover grayscale" />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* Massive Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none overflow-hidden">
          <motion.div
            style={{ WebkitTextStroke: "2px rgba(245,245,240,0.8)", x: text1X }}
          >
            <AnimatedTitle text="SHIFTING" className="text-[18vw] font-serif tracking-tighter leading-none text-transparent whitespace-nowrap" />
          </motion.div>
          <motion.div
            style={{ x: text2X }}
          >
            <AnimatedTitle text="HORIZONS." className="text-[18vw] font-serif tracking-tighter leading-none text-[#F5F5F0] whitespace-nowrap" />
          </motion.div>
        </div>

        {/* Glassmorphic Lenses (The "Shifting" Elements) */}
        <div className="absolute inset-0 z-20 pointer-events-none">

          {/* Shard 1: Tall Rectangle */}
          <motion.div
            onMouseEnter={handleInteract}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(40px) brightness(1.2)" }}
            style={{ 
              y: shard1Y, 
              rotateZ: shard1Rotate,
              x: useTransform(smoothMouseX, v => v * 1.5)
            }}
            className="absolute left-[20%] top-[20%] w-[20vw] h-[70vh] backdrop-blur-2xl bg-white/5 border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] mix-blend-hard-light pointer-events-auto cursor-crosshair transition-colors duration-300"
          />

          {/* Shard 2: Circle Lens */}
          <motion.div
            onMouseEnter={handleInteract}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(60px) brightness(1.2)" }}
            style={{ 
              x: shard2X, 
              y: shard2Y, 
              scale: shard2Scale,
              translateX: useTransform(smoothMouseX, v => -v * 2),
              translateY: useTransform(smoothMouseY, v => -v * 2)
            }}
            className="absolute right-[30%] top-[40%] w-[35vw] h-[35vw] rounded-full backdrop-blur-3xl bg-black/10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mix-blend-overlay pointer-events-auto cursor-crosshair transition-colors duration-300"
          />

          {/* Shard 3: Diamond */}
          <motion.div
            onMouseEnter={handleInteract}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(30px) brightness(1.2)" }}
            className="absolute left-[60%] top-[10%] w-[40vw] h-[40vw] backdrop-blur-xl bg-white/10 border-t border-l border-white/30 shadow-2xl pointer-events-auto cursor-crosshair transition-colors duration-300"
            style={{ 
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              y: shard3Y, 
              rotateX: shard3RotateX, 
              rotateZ: shard3RotateZ,
              x: useTransform(smoothMouseX, v => v * 0.8),
              translateY: useTransform(smoothMouseY, v => v * 0.8)
            }}
          />

          {/* Shard 4: Pill */}
          <motion.div
            onMouseEnter={handleInteract}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(40px) brightness(1.2)" }}
            style={{ 
              x: shard4X, 
              rotateZ: shard4Rotate,
              y: useTransform(smoothMouseY, v => -v * 1.5)
            }}
            className="absolute left-[10%] bottom-[10%] w-[50vw] h-[15vw] rounded-full backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl mix-blend-difference pointer-events-auto cursor-crosshair transition-colors duration-300"
          />

        </div>

        {/* Foreground Text */}
        <div className="absolute bottom-10 left-6 md:left-12 z-30">
          <p className="font-mono text-sm uppercase tracking-widest text-white/50 mb-2">Uncharted Territories</p>
          <p className="text-white/80 max-w-sm text-sm md:text-base">
            Nature as a lens. We manipulate spatial perception through vast landscapes and shifting geographic paradigms.
          </p>
        </div>

      </div>
    </section>
  );
};
