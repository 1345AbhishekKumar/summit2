"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ease } from "@/app/lib/constants";

const navContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
  }
};

const navItem = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } }
};

const menuVariants = {
  hidden: { opacity: 0, y: "-100%" },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } 
  },
  exit: { 
    opacity: 0, 
    y: "-100%", 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } 
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } }
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuLinks = [
    { name: "The Journey", href: "#editorial" },
    { name: "Exploration", href: "#gallery" },
    { name: "Basecamps", href: "#amenities" },
    { name: "The Routes", href: "#routes" },
  ];

  return (
    <>
      <motion.nav
        variants={navContainer}
        initial="hidden"
        animate="show"
        className={`fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-[60] ${isOpen ? 'text-[#1A1A1A]' : 'mix-blend-difference text-white'} transition-colors duration-500`}
      >
        <motion.div variants={navItem}>
          <Link href="/" onClick={() => setIsOpen(false)} className="font-serif font-bold text-2xl tracking-tighter">
            SUMMIT.
          </Link>
        </motion.div>
        <motion.div variants={navItem} className="flex gap-8 items-center">
          <span className="hidden md:block text-sm font-medium tracking-widest uppercase">Expeditions</span>
          <button 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className={`w-12 h-12 border rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ease-out active:scale-95 ${isOpen ? 'border-[#1A1A1A]/30 hover:bg-[#1A1A1A] hover:text-[#F5F5F0]' : 'border-white/30 hover:bg-white hover:text-black'}`}
          >
            <span className={`w-4 h-[1px] bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}></span>
            <span className={`w-4 h-[1px] bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}></span>
          </button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 bg-[#F5F5F0] z-50 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8">
              {menuLinks.map((link, i) => (
                <motion.div 
                  key={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-5xl md:text-7xl font-serif tracking-tight text-[#1A1A1A] hover:opacity-50 transition-opacity duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
