import { motion } from 'framer-motion';
import { useFun } from '../context/FunContext';

export default function FunMeter() {
  const { score, achievements, partyMode, matrixMode, setPartyMode, setMatrixMode, unlock } =
    useFun();
  const level = Math.floor(score / 50) + 1;
  const progress = score % 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs" style={{ color: 'var(--accent-purple)' }}>
          portfolio.exe — level {level}
        </p>
        <p className="font-mono text-[10px] text-[var(--text-muted)]">
          {achievements.length} achievements · ↑↑↓↓←→←→BA for secret
        </p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--bg-deep)]">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))',
            width: `${(progress / 50) * 100}%`,
          }}
          layout
        />
      </div>
      <p className="mt-1 font-mono text-[10px] text-[var(--text-muted)]">
        {progress}/50 XP to next level
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setPartyMode(true);
            unlock('party-btn', 'Manual party button smashed');
            setTimeout(() => setPartyMode(false), 6000);
          }}
          className={`rounded border px-3 py-1.5 font-mono text-xs transition ${
            partyMode
              ? 'border-[var(--accent-orange)] text-[var(--accent-orange)]'
              : 'border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent-orange)]'
          }`}
        >
          {partyMode ? '🎉 partying…' : '🎉 party mode'}
        </button>
        <button
          type="button"
          onClick={() => {
            setMatrixMode(!matrixMode);
            unlock('matrix-btn', 'Took the red pill');
          }}
          className={`rounded border px-3 py-1.5 font-mono text-xs transition ${
            matrixMode
              ? 'border-[var(--accent-green)] text-[var(--accent-green)]'
              : 'border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent-green)]'
          }`}
        >
          {matrixMode ? '🟢 matrix on' : '🟢 matrix mode'}
        </button>
      </div>
    </motion.div>
  );
}
