'use client';

import type { Project, ProjectStatus } from '@/types';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; dot: string; color: string }> = {
  'live':         { label: 'LIVE',         dot: '●', color: '#22c55e' },
  'production':   { label: 'PRODUCTION',   dot: '●', color: '#22c55e' },
  'demo':         { label: 'DEMO',         dot: '○', color: 'var(--bp-text-muted)' },
  'open-source':  { label: 'OPEN SOURCE',  dot: '○', color: 'var(--bp-text-muted)' },
  'coming-soon':  { label: 'COMING SOON',  dot: '○', color: 'var(--bp-text-muted)' },
};

export default function ProjectCard({ project }: { project: Project }) {
  const { label, dot, color } = STATUS_CONFIG[project.status];
  const isComingSoon = project.status === 'coming-soon';
  const headingId = `project-title-${project.id}`;

  return (
    <article
      className="group relative rounded-lg border overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      style={{ background: 'var(--bp-surface)', borderColor: 'var(--bp-border)' }}
      aria-labelledby={headingId}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,212,255,0.12)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
    >
      {/* Top accent — scaleX transform, not width change */}
      <div className="card-accent-line" aria-hidden="true" />

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs" style={{ color }} role="status" aria-label={`Status: ${label}`}>
            <span aria-hidden="true">{dot}</span> {label}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4" aria-label="Tech stack">
          {project.stack.map(tag => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded border"
              style={{ background: 'var(--bp-bg)', color: 'var(--bp-text-muted)', borderColor: 'var(--bp-border)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 id={headingId} className="text-base font-bold mb-1" style={{ color: 'var(--bp-text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--bp-text-secondary)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.liveUrl && !isComingSoon && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live (opens in new tab)`}
              className="focus-ring font-mono text-xs px-3 py-1.5 rounded border transition-colors duration-200"
              style={{ borderColor: 'var(--bp-border)', color: 'var(--bp-text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bp-accent)'; e.currentTarget.style.color = 'var(--bp-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bp-border)'; e.currentTarget.style.color = 'var(--bp-text-secondary)'; }}
            >
              VIEW LIVE →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
              className="focus-ring font-mono text-xs px-3 py-1.5 rounded border transition-colors duration-200"
              style={{ borderColor: 'var(--bp-border)', color: 'var(--bp-text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bp-accent)'; e.currentTarget.style.color = 'var(--bp-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bp-border)'; e.currentTarget.style.color = 'var(--bp-text-secondary)'; }}
            >
              VIEW CODE →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
