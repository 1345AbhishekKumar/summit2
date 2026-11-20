"use client";

import { motion } from "motion/react";
import { ease } from "@/app/lib/constants";

export const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease, delay }}
    className={className}
  >
    {children}
  </motion.div>
);
