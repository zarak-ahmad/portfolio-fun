import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import { useFun } from '../context/FunContext';

const ADMIN_PASSWORD = 'adminsecret';
const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  liveUrl: '',
  githubUrl: '',
  imageUrl: '',
};

const FAIL_LINES = [
  'Access denied. Nice try, hacker 🕵️',
  'Nope. That password is on vacation.',
  'Wrong key. The vault yawned.',
  '403: vibes not authorized.',
];

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [shake, setShake] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [confetti, setConfetti] = useState(false);
  const { bumpScore, unlock, showToast } = useFun();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoginError('');
      bumpScore(15);
      unlock('admin', 'Entered the secret lair');
      showToast('🔓 Welcome to Mission Control', 'purple');
    } else {
      setShake(true);
      bumpScore(1);
      setLoginError(FAIL_LINES[Math.floor(Math.random() * FAIL_LINES.length)]);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post(
        '/projects',
        {
          ...form,
          techStack: form.techStack
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: ADMIN_PASSWORD,
          },
        }
      );

      setStatus({
        type: 'success',
        message: '🚀 Project launched into the arcade!',
      });
      setForm(emptyForm);
      setConfetti(true);
      bumpScore(20);
      unlock('deploy', 'Deployed live during the demo');
      showToast('🚀 Ship it! Project is live on /projects', 'green');
      setTimeout(() => setConfetti(false), 2200);
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err.response?.data?.message ||
          'Deploy flopped. Check the API and auth header.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!authenticated) {
    return (
      <section className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            x: shake ? [0, -10, 10, -8, 8, -4, 4, 0] : 0,
          }}
          transition={{ duration: shake ? 0.45 : 0.35 }}
          className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)]"
        >
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent-red)' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent-orange)' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent-green)' }} />
            <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
              sudo auth — fun edition
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 p-6">
            <div>
              <p className="font-mono text-sm" style={{ color: 'var(--accent-purple)' }}>
                $ sudo access --please-be-nice
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--text-bright)]">
                Secret Lair 🔐
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Enter the magic word. Wrong guesses make the box dance.
              </p>
            </div>

            <label className="block">
              <span className="mb-1.5 block font-mono text-xs text-[var(--text-muted)]">
                password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-[var(--border)] bg-[var(--bg-deep)] px-3 py-2.5 font-mono text-sm text-[var(--text-bright)] outline-none focus:border-[var(--accent-purple)]"
                placeholder="••••••••"
                autoFocus
              />
            </label>

            {loginError && (
              <p className="font-mono text-xs" style={{ color: 'var(--accent-red)' }}>
                {loginError}
              </p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded border border-[var(--accent-purple)] bg-[rgba(198,120,221,0.15)] px-4 py-2.5 font-mono text-sm font-medium transition hover:bg-[rgba(198,120,221,0.25)]"
              style={{ color: 'var(--accent-purple)' }}
            >
              unlock the fun
            </motion.button>
          </form>
        </motion.div>
      </section>
    );
  }

  const fields = [
    { name: 'title', label: 'title', placeholder: 'My Next Banger', required: true },
    {
      name: 'description',
      label: 'description',
      placeholder: 'What epic thing does this project do?',
      required: true,
      textarea: true,
    },
    {
      name: 'techStack',
      label: 'techStack (comma-separated)',
      placeholder: 'React, Node, MongoDB, Good Vibes',
    },
    { name: 'liveUrl', label: 'liveUrl', placeholder: 'https://...' },
    { name: 'githubUrl', label: 'githubUrl', placeholder: 'https://github.com/...' },
    { name: 'imageUrl', label: 'imageUrl', placeholder: 'https://...' },
  ];

  return (
    <section className="relative mx-auto max-w-2xl">
      <AnimatePresence>
        {confetti &&
          Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              animate={{
                opacity: 0,
                y: 120 + Math.random() * 80,
                x: (Math.random() - 0.5) * 280,
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 + Math.random() * 0.6 }}
              className="pointer-events-none absolute left-1/2 top-24 z-10 font-mono text-sm"
              style={{
                color: [
                  'var(--accent-blue)',
                  'var(--accent-green)',
                  'var(--accent-purple)',
                  'var(--accent-orange)',
                  'var(--accent-cyan)',
                ][i % 5],
              }}
            >
              {['★', '◆', '●', '▲', '✦'][i % 5]}
            </motion.span>
          ))}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-sm" style={{ color: 'var(--accent-green)' }}>
          $ nano new-project.json --with-sparkles
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[var(--text-bright)]">
          Mission Control 🛰️
        </h2>
        <p className="mt-2 text-[var(--text-primary)]">
          Drop a project into MongoDB and watch the arcade update like magic.
          Pro tip: deploy something silly during your demo. Instant legend status.
        </p>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-6"
      >
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-1.5 block font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
              {field.label}
            </span>
            {field.textarea ? (
              <textarea
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
                rows={4}
                placeholder={field.placeholder}
                className="w-full resize-y rounded border border-[var(--border)] bg-[var(--bg-deep)] px-3 py-2.5 font-mono text-sm text-[var(--text-bright)] outline-none focus:border-[var(--accent-blue)]"
              />
            ) : (
              <input
                type="text"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full rounded border border-[var(--border)] bg-[var(--bg-deep)] px-3 py-2.5 font-mono text-sm text-[var(--text-bright)] outline-none focus:border-[var(--accent-blue)]"
              />
            )}
          </label>
        ))}

        {status.message && (
          <p
            className="font-mono text-xs"
            style={{
              color:
                status.type === 'success'
                  ? 'var(--accent-green)'
                  : 'var(--accent-red)',
            }}
          >
            {status.message}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className="w-full rounded border border-[var(--accent-blue)] bg-[rgba(97,175,239,0.15)] px-4 py-2.5 font-mono text-sm font-medium transition hover:bg-[rgba(97,175,239,0.25)] disabled:opacity-50"
          style={{ color: 'var(--accent-blue)' }}
        >
          {submitting ? 'launching rockets…' : '🚀 POST /api/projects'}
        </motion.button>
      </form>
    </section>
  );
}
