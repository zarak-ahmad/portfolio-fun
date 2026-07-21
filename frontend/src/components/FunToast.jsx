import { motion, AnimatePresence } from 'framer-motion';
import { useFun } from '../context/FunContext';

const TONES = {
  cyan: 'var(--accent-cyan)',
  orange: 'var(--accent-orange)',
  green: 'var(--accent-green)',
  purple: 'var(--accent-purple)',
  red: 'var(--accent-red)',
};

export default function FunToast() {
  const { toast } = useFun();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[80]">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="max-w-xs rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-4 py-3 font-mono text-xs shadow-lg"
            style={{ color: TONES[toast.tone] || TONES.cyan }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
