export const ease = [0.16, 1, 0.3, 1] as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease } 
  },
};
