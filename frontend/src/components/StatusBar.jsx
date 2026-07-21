import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIPS = [
  'coffee.exe is running…',
  'bugs fear this terminal',
  'compiling charm…',
  '0% typos detected (today)',
  'git push --force-of-personality',
  'stack overflow? never heard of her',
  'deploying vibes…',
];

export default function StatusBar() {
  const [time, setTime] = useState(() => new Date());
  const [quipIndex, setQuipIndex] = useState(0);

  useEffect(() => {
    const clock = setInterval(() => setTime(new Date()), 1000);
    const rotate = setInterval(() => {
      setQuipIndex((i) => (i + 1) % QUIPS.length);
    }, 3500);
    return () => {
      clearInterval(clock);
      clearInterval(rotate);
    };
  }, []);

  const stamp = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="flex min-w-0 flex-1 items-center justify-between gap-3 font-mono text-[11px] sm:text-xs">
      <div className="flex min-w-0 items-center gap-2 text-[var(--text-muted)]">
        <span className="hidden sm:inline">command-center — bash</span>
        <span className="hidden text-[var(--border)] md:inline">|</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={quipIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="truncate"
            style={{ color: 'var(--accent-cyan)' }}
          >
            {QUIPS[quipIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="shrink-0 tabular-nums text-[var(--text-muted)]">
        <span style={{ color: 'var(--accent-green)' }}>●</span> {stamp}
      </div>
    </div>
  );
}
