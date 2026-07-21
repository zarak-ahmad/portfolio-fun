import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FunContext = createContext(null);

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function FunProvider({ children }) {
  const [partyMode, setPartyMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const showToast = (message, tone = 'cyan') => {
    setToast({ message, tone, id: Date.now() });
  };

  const unlock = (id, message) => {
    setAchievements((prev) => {
      if (prev.includes(id)) return prev;
      showToast(`🏆 ${message}`, 'orange');
      return [...prev, id];
    });
    bumpScore(25);
  };

  const bumpScore = (points = 5) => {
    setScore((s) => s + points);
  };

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    let idx = 0;
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[idx];
      const match =
        key === expected ||
        (expected.length === 1 && key === expected.toLowerCase());

      if (match) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setPartyMode(true);
          unlock('konami', 'Konami code! Party mode unlocked');
          setTimeout(() => setPartyMode(false), 8000);
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('party-mode', partyMode);
    document.body.classList.toggle('matrix-mode', matrixMode);
  }, [partyMode, matrixMode]);

  const value = useMemo(
    () => ({
      partyMode,
      setPartyMode,
      matrixMode,
      setMatrixMode,
      score,
      bumpScore,
      toast,
      showToast,
      achievements,
      unlock,
    }),
    [partyMode, matrixMode, score, toast, achievements]
  );

  return <FunContext.Provider value={value}>{children}</FunContext.Provider>;
}

export function useFun() {
  const ctx = useContext(FunContext);
  if (!ctx) throw new Error('useFun must be used within FunProvider');
  return ctx;
}
