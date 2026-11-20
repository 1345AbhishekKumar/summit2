"use client";

import { motion } from "motion/react";
import { AnimatedTitle } from "./ui/AnimatedTitle";
import { staggerContainer, staggerItem, ease } from "@/app/lib/constants";

const blurReveal = {
  hidden: { opacity: 0, filter: "blur(20px)", scale: 0.8 },
  show: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 1.5, ease } }
};

export const Editorial = () => {
  return (
    <section id="editorial" className="py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        <div className="lg:col-span-4">
          <motion.div variants={staggerItem}>
            <p className="font-mono text-sm uppercase tracking-widest text-[#1A1A1A]/50 mb-4">01 // The Journey</p>
          </motion.div>
          <AnimatedTitle text="Embrace the\nunknown." className="text-4xl md:text-5xl font-serif tracking-tight" />
        </div>
        <div className="lg:col-span-8">
          <motion.div variants={staggerItem}>
            <p className="text-2xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight font-medium text-[#1A1A1A]">
              Summit is a premier adventure trekking company that stands out with its robust, massive, and tough expeditions, complementing the raw lines of the adjacent mountain ranges and the wild character of the untamed earth.
            </p>
          </motion.div>
          <div className="mt-12 flex gap-12 border-t border-[#1A1A1A]/10 pt-8">
            <motion.div variants={blurReveal}>
              <p className="text-5xl font-serif mb-2">8k+</p>
              <p className="text-sm font-mono uppercase tracking-widest text-[#1A1A1A]/50">Meters Climbed</p>
            </motion.div>
            <motion.div variants={blurReveal}>
              <p className="text-5xl font-serif mb-2">THRILL</p>
              <p className="text-sm font-mono uppercase tracking-widest text-[#1A1A1A]/50">Guaranteed</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
