import { useEffect, useRef, useState } from 'react';

const GLYPHS = ['</>', '{ }', '=>', '$#', '◆'];
const TRAIL_COUNT = 3;

function prefersFinePointer() {
  return window.matchMedia('(pointer: fine)').matches;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CursorChaser() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const core = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const trail = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );

  const coreEl = useRef(null);
  const ringEl = useRef(null);
  const trailEls = useRef([]);
  const labelEl = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    if (!prefersFinePointer() || prefersReducedMotion()) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-on');

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target;
      const interactive =
        target instanceof Element &&
        Boolean(
          target.closest(
            'a, button, input, textarea, select, label, [role="button"]'
          )
        );
      setHovering(interactive);
    };

    const onClick = () => {
      setPulsing(true);
      window.setTimeout(() => setPulsing(false), 450);
    };

    const tick = () => {
      const m = mouse.current;

      core.current.x += (m.x - core.current.x) * 0.55;
      core.current.y += (m.y - core.current.y) * 0.55;

      ring.current.x += (m.x - ring.current.x) * 0.18;
      ring.current.y += (m.y - ring.current.y) * 0.18;

      let px = ring.current.x;
      let py = ring.current.y;
      trail.current.forEach((point, i) => {
        const ease = 0.34 - i * 0.04;
        point.x += (px - point.x) * ease;
        point.y += (py - point.y) * ease;
        px = point.x;
        py = point.y;

        const el = trailEls.current[i];
        if (el) {
          el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) rotate(${i * 10}deg)`;
          el.style.opacity = String(0.45 - i * 0.1);
        }
      });

      if (coreEl.current) {
        coreEl.current.style.transform = `translate3d(${core.current.x}px, ${core.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (labelEl.current) {
        labelEl.current.style.transform = `translate3d(${ring.current.x + 18}px, ${ring.current.y + 14}px, 0)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onClick);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('custom-cursor-on');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onClick);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="cursor-chaser" aria-hidden="true">
      {GLYPHS.slice(0, TRAIL_COUNT).map((glyph, i) => (
        <span
          key={glyph + i}
          ref={(el) => {
            trailEls.current[i] = el;
          }}
          className="cursor-chaser__glyph"
          style={{
            color: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)',
          }}
        >
          {glyph}
        </span>
      ))}

      <div
        ref={ringEl}
        className={`cursor-chaser__ring ${hovering ? 'is-hot' : ''} ${pulsing ? 'is-pulse' : ''}`}
      />

      <div
        ref={coreEl}
        className={`cursor-chaser__core ${hovering ? 'is-hot' : ''}`}
      >
        <span className="cursor-chaser__cross-h" />
        <span className="cursor-chaser__cross-v" />
        <span className="cursor-chaser__dot" />
      </div>

      <div ref={labelEl} className="cursor-chaser__label">
        {hovering ? 'click' : 'track'}
      </div>
    </div>
  );
}
