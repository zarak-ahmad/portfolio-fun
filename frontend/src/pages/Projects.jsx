import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../data/projectStore';
import ProjectCard from '../components/ProjectCard';
import { useFun } from '../context/FunContext';

const LOADING_LINES = [
  'loading local project vault…',
  'polishing cards…',
  'fetching cool projects…',
  'almost there…',
];

const MOODS = [
  { id: 'all', label: 'all' },
  { id: 'react', label: 'react' },
  { id: 'mern', label: 'mern' },
  { id: 'dashboard', label: 'dashboards' },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadLine, setLoadLine] = useState(0);
  const [mood, setMood] = useState('all');
  const [shuffleKey, setShuffleKey] = useState(0);
  const { bumpScore, unlock, showToast } = useFun();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(getProjects());
      setLoading(false);
      bumpScore(8);
      unlock('projects-loaded', 'Project arcade unlocked');
    }, 450);

    const onFocus = () => setProjects(getProjects());
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onFocus);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onFocus);
    };
  }, []);

  useEffect(() => {
    if (!loading) return undefined;
    const id = setInterval(() => {
      setLoadLine((i) => (i + 1) % LOADING_LINES.length);
    }, 900);
    return () => clearInterval(id);
  }, [loading]);

  const visible = useMemo(() => {
    let list = [...projects];
    if (mood === 'react') {
      list = list.filter((p) =>
        p.techStack?.some((t) => /react/i.test(t))
      );
    } else if (mood === 'mern') {
      list = list.filter((p) =>
        p.techStack?.some((t) => /mern|mongo|express|node/i.test(t))
      );
    } else if (mood === 'dashboard') {
      list = list.filter((p) =>
        /dashboard|finance|attendance|library/i.test(
          `${p.title} ${p.description} ${p.techStack?.join(' ')}`
        )
      );
    }

    if (shuffleKey > 0) {
      for (let i = list.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list;
  }, [projects, mood, shuffleKey]);

  return (
    <section className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="font-mono text-sm" style={{ color: 'var(--accent-green)' }}>
          $ ls ./projects --sort=impressiveness
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[var(--text-bright)] sm:text-4xl">
          Project Arcade 🕹️
        </h2>
        <p className="mt-2 max-w-xl text-[var(--text-primary)]">
          Frontend-only data vault — showcase projects ship with the app, and
          Admin additions save in this browser for live demos.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMood(m.id);
                bumpScore(2);
              }}
              className={`rounded border px-3 py-1.5 font-mono text-xs transition ${
                mood === m.id
                  ? 'border-[var(--accent-blue)] text-[var(--accent-blue)] bg-[rgba(97,175,239,0.12)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-cyan)]'
              }`}
            >
              {m.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setShuffleKey((k) => k + 1);
              bumpScore(4);
              showToast('🔀 Projects shuffled — chaos is a feature', 'purple');
              unlock('shuffle', 'Master of the shuffle');
            }}
            className="rounded border border-[var(--accent-purple)] px-3 py-1.5 font-mono text-xs text-[var(--accent-purple)] transition hover:bg-[rgba(198,120,221,0.12)]"
          >
            shuffle 🎲
          </button>
          <button
            type="button"
            onClick={() => {
              setProjects(getProjects());
              showToast('↻ Reloaded project vault', 'cyan');
            }}
            className="rounded border border-[var(--border)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)] transition hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
          >
            refresh
          </button>
        </div>

        {!loading && projects.length > 0 && (
          <p className="mt-3 font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
            showing {visible.length}/{projects.length} · fun filter: {mood}
          </p>
        )}
      </motion.div>

      {loading && (
        <motion.div
          key={loadLine}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm"
          style={{ color: 'var(--accent-cyan)' }}
        >
          {LOADING_LINES[loadLine]}
          <span className="animate-pulse">_</span>
        </motion.div>
      )}

      {!loading && visible.length === 0 && (
        <div className="rounded border border-dashed border-[var(--border)] px-6 py-12 text-center">
          <p className="font-mono text-sm text-[var(--text-muted)]">
            No matches for this filter. Hit “all” or shuffle again.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((project, index) => (
          <ProjectCard key={`${project._id}-${shuffleKey}`} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
