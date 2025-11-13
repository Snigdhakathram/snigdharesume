'use client';

import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(var(--glow-color), var(--glow-opacity)), transparent 70%)`
        }}
      />
    </div>
  );
}
