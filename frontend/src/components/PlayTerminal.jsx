import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFun } from '../context/FunContext';

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'A SQL query walks into a bar, walks up to two tables and asks… “Can I JOIN you?”',
  'There are only 10 kinds of people: those who understand binary and those who don’t.',
  'I would tell you a UDP joke, but you might not get it.',
  'Git commit -m "fixed bugs" // created new ones',
];

const SKILLS = [
  'React ████████░░ 82%',
  'Node/Express ███████░░░ 74%',
  'MongoDB ███████░░░ 71%',
  'UI Polish █████████░ 90%',
  'Senior Charm ██████████ 99%',
];

export default function PlayTerminal() {
  const fun = useFun();
  const [lines, setLines] = useState([
    'welcome to zarak-shell v2.0 — type "help" to play',
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const runCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const inputLower = trimmed.toLowerCase();
    let output = [];

    if (inputLower === 'help') {
      output = [
        'commands: help | whoami | joke | skills | party | matrix | score | clear | projects | contact',
      ];
    } else if (inputLower === 'whoami') {
      fun.unlock('whoami', 'Identity checked');
      output = [
        'Zarak Ahmad — Full-Stack Developer',
        'email: zarakahmad0@gmail.com',
        'status: ready to impress seniors',
      ];
    } else if (inputLower === 'joke') {
      fun.bumpScore(3);
      output = [JOKES[Math.floor(Math.random() * JOKES.length)]];
    } else if (inputLower === 'skills') {
      fun.unlock('skills', 'Skill tree inspected');
      output = SKILLS;
    } else if (inputLower === 'party') {
      fun.setPartyMode(true);
      fun.unlock('party', 'Party mode engaged');
      setTimeout(() => fun.setPartyMode(false), 7000);
      output = ['🎉 party mode ON for 7 seconds — dance, code, repeat'];
    } else if (inputLower === 'matrix') {
      fun.setMatrixMode((v) => !v);
      fun.unlock('matrix', 'Neo would be proud');
      output = ['matrix mode toggled — look behind you 👀'];
    } else if (inputLower === 'score') {
      output = [
        `fun score: ${fun.score} XP · achievements: ${fun.achievements.length}`,
      ];
    } else if (inputLower === 'projects') {
      output = ['opening tip: click Projects.jsx in the sidebar 😄'];
    } else if (inputLower === 'contact') {
      output = ['ping: zarakahmad0@gmail.com'];
    } else if (inputLower === 'clear') {
      setLines(['terminal cleared. boredom deleted.']);
      setInput('');
      fun.bumpScore(1);
      return;
    } else if (inputLower === 'sudo' || inputLower.startsWith('sudo ')) {
      fun.bumpScore(2);
      output = ['nice try. with great power comes great… syntax errors.'];
    } else {
      output = [
        `command not found: ${trimmed}`,
        'type "help" for the cheat sheet',
      ];
    }

    setLines((prev) => [...prev, `$ ${trimmed}`, ...output].slice(-40));
    setInput('');
    fun.bumpScore(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85 }}
      className="relative mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2">
        <span className="font-mono text-xs text-[var(--text-muted)]">
          interactive terminal — try: joke · party · matrix
        </span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--accent-green)' }}>
          {fun.score} XP
        </span>
      </div>

      <div className="max-h-56 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <p
            key={`${i}-${line.slice(0, 24)}`}
            className="whitespace-pre-wrap"
            style={{
              color: line.startsWith('$')
                ? 'var(--text-bright)'
                : 'var(--accent-cyan)',
            }}
          >
            {line}
          </p>
        ))}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(input);
        }}
        className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--bg-deep)] px-4 py-3"
      >
        <span style={{ color: 'var(--accent-green)' }} className="font-mono text-sm">
          $
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[var(--text-bright)] outline-none"
          placeholder="type a command…"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="font-mono text-xs"
          style={{ color: 'var(--accent-blue)' }}
        >
          enter
        </button>
      </form>

      <div className="flex flex-wrap gap-2 border-t border-[var(--border)] px-4 py-2">
        {['help', 'joke', 'party', 'matrix', 'skills'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(cmd);
            }}
            className="rounded border border-[var(--border)] px-2 py-1 font-mono text-[10px] text-[var(--text-muted)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
          >
            {cmd}
          </button>
        ))}
        <Link
          to="/projects"
          onClick={(e) => e.stopPropagation()}
          className="rounded border border-[var(--border)] px-2 py-1 font-mono text-[10px] text-[var(--text-muted)] transition hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
        >
          projects →
        </Link>
      </div>
    </motion.div>
  );
}
