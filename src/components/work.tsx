import { projects } from '@/lib/projects';
import ProjectCard from './project-card';

export default function Work() {
  return (
    <section id="work" className="py-24 px-6" aria-label="Work">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-[3px] uppercase mb-3" style={{ color: 'var(--bp-accent)' }}>
            // WORK
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--bp-text-primary)' }}>
            Things I&apos;ve Built
          </h2>
          <div className="h-px w-full" style={{ background: 'var(--bp-border)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
