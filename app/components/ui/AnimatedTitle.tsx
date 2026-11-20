"use client";

import { motion } from "motion/react";
import { ease } from "@/app/lib/constants";

const titleLetterContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

const titleLetterItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
};

export const AnimatedTitle = ({ text, className = "" }: { text: string, className?: string }) => {
  const processedText = text.replace(/\\n/g, '\n');
  return (
    <motion.h2
      variants={titleLetterContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {processedText.split("").map((char, i) => (
        char === "\n" ? <br key={i} /> :
        <motion.span key={i} variants={titleLetterItem} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  );
};
