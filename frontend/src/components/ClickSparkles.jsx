import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFun } from '../context/FunContext';

export default function ClickSparkles() {
  const [sparks, setSparks] = useState([]);
  const { bumpScore } = useFun();

  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest('input, textarea, button, a, label')) {
        bumpScore(1);
      }

      const id = Date.now() + Math.random();
      const symbols = ['✦', '◆', '●', '+', '*'];
      const colors = [
        'var(--accent-blue)',
        'var(--accent-green)',
        'var(--accent-purple)',
        'var(--accent-cyan)',
        'var(--accent-orange)',
      ];

      setSparks((prev) => [
        ...prev.slice(-12),
        {
          id,
          x: e.clientX,
          y: e.clientY,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [bumpScore]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            initial={{ opacity: 1, scale: 0.4, x: spark.x, y: spark.y }}
            animate={{
              opacity: 0,
              scale: 1.4,
              y: spark.y - 40 - Math.random() * 30,
              x: spark.x + (Math.random() - 0.5) * 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onAnimationComplete={() =>
              setSparks((prev) => prev.filter((s) => s.id !== spark.id))
            }
            className="absolute font-mono text-sm"
            style={{ color: spark.color, left: 0, top: 0 }}
          >
            {spark.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
