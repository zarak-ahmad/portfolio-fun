import { motion } from 'framer-motion';

const TAG_COLORS = [
  'var(--accent-green)',
  'var(--accent-blue)',
  'var(--accent-purple)',
  'var(--accent-cyan)',
  'var(--accent-orange)',
];

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 120 }}
      whileHover={{
        y: -10,
        rotate: 0.6,
        transition: { type: 'spring', stiffness: 300 },
      }}
      className="group overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)]"
    >
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full transition group-hover:scale-125" style={{ background: 'var(--accent-red)' }} />
        <span className="h-2.5 w-2.5 rounded-full transition group-hover:scale-125" style={{ background: 'var(--accent-orange)' }} />
        <span className="h-2.5 w-2.5 rounded-full transition group-hover:scale-125" style={{ background: 'var(--accent-green)' }} />
        <span className="ml-2 truncate font-mono text-xs text-[var(--text-muted)]">
          {project.title.toLowerCase().replace(/\s+/g, '-')}.sh
        </span>
        <motion.span
          className="ml-auto font-mono text-[10px] opacity-0 transition group-hover:opacity-100"
          style={{ color: 'var(--accent-cyan)' }}
        >
          running…
        </motion.span>
      </div>

      {project.imageUrl ? (
        <div className="aspect-video overflow-hidden border-b border-[var(--border)] bg-[var(--bg-deep)]">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
      ) : (
        <div className="flex aspect-[2.4/1] items-center justify-center border-b border-[var(--border)] bg-[var(--bg-deep)] font-mono text-xs text-[var(--text-muted)]">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            {'<ProjectPreview />'}
          </motion.span>
        </div>
      )}

      <div className="p-5">
        <h3 className="text-lg font-semibold text-[var(--text-bright)]">
          <span style={{ color: 'var(--accent-blue)' }}>const </span>
          {project.title}
          <span style={{ color: 'var(--accent-orange)' }}> = </span>
          <span style={{ color: 'var(--accent-green)' }}>{'"awesome"'}</span>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
          {project.description}
        </p>

        {project.techStack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.12, y: -2 }}
                className="cursor-default rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[11px]"
                style={{ color: TAG_COLORS[i % TAG_COLORS.length] }}
              >
                #{tech}
              </motion.span>
            ))}
          </div>
        )}

        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[var(--accent-blue)] px-3 py-1.5 font-mono text-xs transition hover:bg-[rgba(97,175,239,0.15)]"
                style={{ color: 'var(--accent-blue)' }}
              >
                live ↗
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[var(--accent-purple)] px-3 py-1.5 font-mono text-xs transition hover:bg-[rgba(198,120,221,0.15)]"
                style={{ color: 'var(--accent-purple)' }}
              >
                github ↗
              </a>
            ) : null}
          </div>
        )}
      </div>
    </motion.article>
  );
}
