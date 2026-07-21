import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import FloatingBits from './FloatingBits';
import FunMeter from './FunMeter';
import PlayTerminal from './PlayTerminal';
import { useFun } from '../context/FunContext';

const DOT_MESSAGES = {
  red: 'nice try — windows stay open here 😎',
  yellow: 'minimized… just kidding',
  green: 'fullscreen vibes unlocked',
};

const BOOT_LINES = [
  { color: 'var(--accent-cyan)', text: '✓ Express API online' },
  { color: 'var(--accent-cyan)', text: '✓ MongoDB connected' },
  { color: 'var(--accent-cyan)', text: '✓ React + Tailwind ready' },
  { color: 'var(--accent-green)', text: '✓ charm.modules loaded' },
  { color: 'var(--accent-purple)', text: '→ awaiting your applause…' },
];

export default function Hero() {
  const [dotMsg, setDotMsg] = useState('');
  const [hiFives, setHiFives] = useState(0);
  const { bumpScore, unlock, showToast } = useFun();

  const pokeDot = (color) => {
    setDotMsg(DOT_MESSAGES[color]);
    bumpScore(2);
    unlock('dots', 'Window controls are not buttons… or are they?');
    setTimeout(() => setDotMsg(''), 2200);
  };

  return (
    <section className="relative mx-auto max-w-4xl">
      <FloatingBits />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-4 font-mono text-sm"
        style={{ color: 'var(--accent-green)' }}
      >
        $ whoami --fun-mode
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="relative text-4xl font-extrabold tracking-tight text-[var(--text-bright)] sm:text-5xl md:text-6xl"
      >
        Zarak Ahmad
        <br />
        <motion.span
          style={{ color: 'var(--accent-blue)' }}
          animate={{ rotate: [0, -1.5, 1.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block origin-left"
        >
          Full-Stack Developer
        </motion.span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25 }}
        className="relative mt-6 font-mono text-lg sm:text-xl"
        style={{ color: 'var(--accent-purple)' }}
      >
        <span className="text-[var(--text-muted)]">&gt; </span>
        <TypeAnimation
          sequence={[
            'MERN Stack Developer',
            2000,
            'Bug Whisperer',
            2000,
            'Pixel Persuader',
            2000,
            'Coffee → Code Converter',
            2000,
            'Senior-Impressing Machine',
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
        <span className="animate-pulse">_</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4 }}
        className="relative mt-6 max-w-xl text-base leading-relaxed text-[var(--text-primary)] sm:text-lg"
      >
        I ship full-stack apps that solve real problems — and I do it with
        clean code, sharp UI, and just enough terminal swagger to make demos
        memorable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.55 }}
        className="relative mt-8 flex flex-wrap items-center gap-3"
      >
        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/projects"
            className="inline-block rounded border border-[var(--accent-blue)] bg-[rgba(97,175,239,0.12)] px-5 py-2.5 font-mono text-sm font-medium transition hover:bg-[rgba(97,175,239,0.22)]"
            style={{ color: 'var(--accent-blue)' }}
          >
            ./view-projects 🚀
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
          <a
            href="mailto:zarakahmad0@gmail.com"
            className="inline-block rounded border border-[var(--border)] px-5 py-2.5 font-mono text-sm text-[var(--text-primary)] transition hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]"
          >
            ./ping-zarak ✉️
          </a>
        </motion.div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.08, rotate: [-2, 2, 0] }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const next = hiFives + 1;
            setHiFives(next);
            bumpScore(5);
            if (next % 5 === 0) {
              unlock('highfive', 'Senior-approved energy');
              showToast('✋ High-five streak! Keep going', 'green');
            }
          }}
          className="rounded border border-[var(--accent-green)] bg-[rgba(152,195,121,0.1)] px-4 py-2.5 font-mono text-sm"
          style={{ color: 'var(--accent-green)' }}
        >
          high-five ✋ {hiFives > 0 ? `×${hiFives}` : ''}
        </motion.button>
      </motion.div>

      <FunMeter />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="relative mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)]"
      >
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2">
          {[
            { key: 'red', color: 'var(--accent-red)' },
            { key: 'yellow', color: 'var(--accent-orange)' },
            { key: 'green', color: 'var(--accent-green)' },
          ].map((dot) => (
            <motion.button
              key={dot.key}
              type="button"
              aria-label={`${dot.key} window control`}
              onClick={() => pokeDot(dot.key)}
              whileHover={{ scale: 1.35 }}
              whileTap={{ scale: 0.85 }}
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: dot.color }}
            />
          ))}
          <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
            zarak-shell — interactive
          </span>
        </div>

        <AnimatePresence>
          {dotMsg && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-[var(--border)] bg-[var(--bg-deep)] px-4 py-2 font-mono text-xs"
              style={{ color: 'var(--accent-orange)' }}
            >
              // {dotMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
          <span style={{ color: 'var(--accent-green)' }}>zarak@portfolio</span>
          <span className="text-[var(--text-muted)]">:</span>
          <span style={{ color: 'var(--accent-blue)' }}>~/dev</span>
          <span className="text-[var(--text-muted)]">$ </span>
          <span style={{ color: 'var(--text-bright)' }}>
            npm run impress --seniors
          </span>
          {'\n'}
          {BOOT_LINES.map((line, i) => (
            <motion.span
              key={line.text}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.22 }}
              className="block"
              style={{ color: line.color }}
            >
              {line.text}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-1 block"
            style={{ color: 'var(--accent-orange)' }}
          >
            @ zarakahmad0@gmail.com
          </motion.span>
        </pre>
      </motion.div>

      <PlayTerminal />
    </section>
  );
}
