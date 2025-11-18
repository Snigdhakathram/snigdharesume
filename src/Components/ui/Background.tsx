'use client';

import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "radial-gradient(circle, rgba(var(--glow-color), 0.8) 0%, transparent 70%)"
        }}
      />
      <motion.div
        className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "radial-gradient(circle, rgba(var(--glow-color), 0.6) 0%, transparent 70%)"
        }}
      />
    </div>
  );
}
