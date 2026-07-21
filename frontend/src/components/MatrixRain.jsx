import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GLYPHS = '01アイウエオカキクケコサシスセソ<>/{}[]#*$';

export default function MatrixRain({ active }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!active) {
      setColumns([]);
      return undefined;
    }

    const count = Math.min(18, Math.floor(window.innerWidth / 70));
    setColumns(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i / count) * 100}%`,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 6,
        text: Array.from({ length: 14 }, () =>
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ).join('\n'),
      }))
    );
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden opacity-30">
      {columns.map((col) => (
        <motion.pre
          key={col.id}
          className="absolute top-[-20%] font-mono text-[11px] leading-tight"
          style={{ left: col.left, color: 'var(--accent-green)' }}
          initial={{ y: '-20%' }}
          animate={{ y: '120vh' }}
          transition={{
            duration: col.duration,
            delay: col.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {col.text}
        </motion.pre>
      ))}
    </div>
  );
}
