import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const files = [
  { path: '/', label: 'Home.jsx', icon: '◈', color: 'var(--accent-blue)', tip: 'start here' },
  { path: '/projects', label: 'Projects.jsx', icon: '◇', color: 'var(--accent-green)', tip: 'the goods' },
  { path: '/admin', label: 'Admin.jsx', icon: '⬡', color: 'var(--accent-purple)', tip: 'secret lair' },
];

const FOOTER_LINES = [
  'MongoDB linked 🟢',
  'coffee levels: high',
  'branch: main ✨',
  'linter mood: chill',
];

export default function Sidebar({ open, onClose }) {
  const [footerIndex, setFooterIndex] = useState(0);
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFooterIndex((i) => (i + 1) % FOOTER_LINES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-full w-[var(--sidebar-width)] flex-col
          border-r border-[var(--border)] bg-[var(--bg-panel)]
          transition-transform duration-300 ease-out
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="border-b border-[var(--border)] px-4 py-4">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: wiggle ? [0, -8, 8, -4, 4, 0] : 0,
            }}
            transition={{ duration: wiggle ? 0.5 : 0.4 }}
            onAnimationComplete={() => setWiggle(false)}
            onClick={() => setWiggle(true)}
            className="flex w-full items-center gap-2 text-left"
          >
            <motion.span
              className="font-mono text-lg font-bold"
              style={{ color: 'var(--accent-blue)' }}
              whileHover={{ scale: 1.2, rotate: 12 }}
            >
              {'</>'}
            </motion.span>
            <div>
              <p className="text-sm font-semibold text-[var(--text-bright)]">
                Zarak Ahmad
              </p>
              <p className="font-mono text-[10px] text-[var(--text-muted)]">
                Full Stack Developer
              </p>
            </div>
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            explorer
          </p>
          <p className="mb-1 px-2 font-mono text-xs text-[var(--accent-orange)]">
            ▾ src
          </p>
          <p className="mb-2 px-4 font-mono text-xs text-[var(--text-muted)]">
            ▾ pages
          </p>

          <nav className="flex flex-col gap-0.5 pl-6">
            {files.map((file, i) => (
              <motion.div
                key={file.path}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <NavLink
                  to={file.path}
                  end={file.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between gap-2 rounded px-2 py-1.5 font-mono text-sm transition-colors ${
                      isActive
                        ? 'bg-[var(--bg-hover)] text-[var(--text-bright)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <span style={{ color: file.color }}>{file.icon}</span>
                    {file.label}
                  </span>
                  <span className="hidden font-mono text-[9px] text-[var(--text-muted)] group-hover:inline">
                    {file.tip}
                  </span>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <p className="mt-6 px-2 font-mono text-[10px] text-[var(--text-muted)]">
            tip: click the window dots 🔴🟡🟢
          </p>
        </div>

        <div className="border-t border-[var(--border)] px-4 py-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={footerIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="font-mono text-[10px] text-[var(--text-muted)]"
            >
              {FOOTER_LINES[footerIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}
