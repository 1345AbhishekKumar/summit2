"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { SafeImage } from "./ui/SafeImage";
import { useRef } from "react";
import { ease } from "@/app/lib/constants";

export const HorizontalGallery = () => {
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalProgress } = useScroll({ target: horizontalRef });
  const x = useTransform(horizontalProgress, [0, 1], ["0%", "-66.66%"]);
  const imgX = useTransform(horizontalProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="gallery" ref={horizontalRef} className="h-[300vh] relative bg-[#1A1A1A]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw]">
          {[
            { title: "The Valley", img: "https://picsum.photos/seed/valley/1600/1000" },
            { title: "The Ascent", img: "https://picsum.photos/seed/ascent/1600/1000" },
            { title: "The Peak", img: "https://picsum.photos/seed/peak/1600/1000" }
          ].map((item, i) => (
            <div key={i} className="w-screen h-screen flex items-center justify-center p-6 md:p-24 relative overflow-hidden shrink-0">
              <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10 text-[#F5F5F0]">
                <p className="font-mono text-sm uppercase tracking-widest mb-4 opacity-50">02.0{i+1}</p>
                <motion.div 
                  initial={{ opacity: 0, x: 50, skewX: 10 }}
                  whileInView={{ opacity: 1, x: 0, skewX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease }}
                >
                  <h3 className="text-5xl md:text-8xl font-serif italic">{item.title}</h3>
                </motion.div>
              </div>
              <div className="relative w-full h-full max-h-[80vh] overflow-hidden rounded-sm">
                <motion.div style={{ x: imgX, scale: 1.1 }} className="w-full h-full relative">
                  <SafeImage 
                    src={item.img} 
                    alt={`Landscape view of ${item.title}`} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
