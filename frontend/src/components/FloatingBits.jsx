import { motion } from 'framer-motion';

const BITS = [
  { text: 'const vibe = "on";', x: '8%', y: '18%', delay: 0 },
  { text: 'npm run fun', x: '72%', y: '22%', delay: 0.4 },
  { text: '{ ship: true }', x: '15%', y: '68%', delay: 0.8 },
  { text: '// no bugs here*', x: '78%', y: '70%', delay: 1.2 },
  { text: '<Wow />', x: '55%', y: '12%', delay: 0.2 },
  { text: '404: boring not found', x: '40%', y: '82%', delay: 1 },
];

export default function FloatingBits() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {BITS.map((bit) => (
        <motion.span
          key={bit.text}
          className="absolute font-mono text-[10px] opacity-40 sm:text-xs"
          style={{
            left: bit.x,
            top: bit.y,
            color: 'var(--accent-blue)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0.15, 0.45, 0.15],
            y: [0, -14, 0],
          }}
          transition={{
            duration: 5 + bit.delay,
            delay: bit.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {bit.text}
        </motion.span>
      ))}
    </div>
  );
}
