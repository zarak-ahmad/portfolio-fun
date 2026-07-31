import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';
import ClickSparkles from './ClickSparkles';
import FunToast from './FunToast';
import MatrixRain from './MatrixRain';
import CursorChaser from './CursorChaser';
import { useFun } from '../context/FunContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { matrixMode, score, bumpScore, unlock } = useFun();

  return (
    <div className="min-h-screen">
      <CursorChaser />
      <ClickSparkles />
      <FunToast />
      <MatrixRain active={matrixMode} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[var(--sidebar-width)]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-panel)]/90 px-4 py-3 backdrop-blur-md lg:px-8">
          <button
            type="button"
            className="rounded border border-[var(--border)] px-2.5 py-1.5 font-mono text-sm text-[var(--text-bright)] transition hover:border-[var(--accent-blue)] lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => {
              bumpScore(1);
              unlock('header-dots', 'You poked the traffic lights');
            }}
            aria-label="Poke the traffic lights"
          >
            <span style={{ color: 'var(--accent-red)' }}>●</span>
            <span style={{ color: 'var(--accent-orange)' }}>●</span>
            <span style={{ color: 'var(--accent-green)' }}>●</span>
          </button>
          <StatusBar />
          <span
            className="hidden shrink-0 rounded border border-[var(--border)] px-2 py-1 font-mono text-[10px] sm:inline"
            style={{ color: 'var(--accent-green)' }}
          >
            {score} XP
          </span>
        </header>

        <main className="min-h-[calc(100vh-53px)] px-4 py-8 sm:px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
