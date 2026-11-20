"use client";

import { motion } from "motion/react";
import { FadeUp } from "./ui/FadeUp";
import { AnimatedTitle } from "./ui/AnimatedTitle";
import { ease } from "@/app/lib/constants";

const letterContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const letterItem = {
  hidden: { opacity: 0, y: "100%", rotate: 10 },
  show: { opacity: 1, y: "0%", rotate: 0, transition: { duration: 1, ease } }
};

export const Footer = () => {
  return (
    <footer className="bg-[#F5F5F0] pt-32 pb-10 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
        <div className="md:col-span-8">
          <AnimatedTitle text="Ready to\nexplore?" className="text-6xl md:text-[8vw] leading-[0.9] font-serif tracking-tighter mb-10" />
          <FadeUp delay={0.2}>
            <motion.a 
              href="mailto:hello@summit.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-block px-8 py-4 bg-[#1A1A1A] text-[#F5F5F0] rounded-full overflow-hidden"
            >
              <span className="relative z-10 font-medium tracking-wide">Contact the guides</span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="absolute inset-0 z-20 flex items-center justify-center text-[#1A1A1A] font-medium tracking-wide translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                Contact the guides
              </span>
            </motion.a>
          </FadeUp>
        </div>
        
        <div className="md:col-span-4 flex flex-col justify-end gap-12">
          <FadeUp delay={0.2}>
            <p className="font-mono text-sm uppercase tracking-widest text-[#1A1A1A]/50 mb-4">Basecamp</p>
            <p className="text-xl">Everest Base Camp<br/>Khumbu, Nepal</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex gap-8">
            <a href="#" aria-label="Follow us on Instagram" className="hover:opacity-50 active:scale-95 transition-all duration-300 ease-out inline-block">Instagram</a>
            <a href="#" aria-label="Connect with us on LinkedIn" className="hover:opacity-50 active:scale-95 transition-all duration-300 ease-out inline-block">LinkedIn</a>
            <a href="#" aria-label="Follow us on Twitter" className="hover:opacity-50 active:scale-95 transition-all duration-300 ease-out inline-block">Twitter</a>
          </FadeUp>
        </div>
      </div>

      <div className="w-full border-t border-[#1A1A1A]/10 pt-10 flex justify-between items-end">
        <p className="text-sm font-mono text-[#1A1A1A]/50">© 2026 SUMMIT. ALL RIGHTS RESERVED.</p>
        <motion.div 
          variants={letterContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-[15vw] leading-[0.7] font-serif tracking-tighter text-[#1A1A1A] flex overflow-visible pb-4"
        >
          {"SUMMIT.".split("").map((char, i) => (
            <motion.span key={i} variants={letterItem} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};
