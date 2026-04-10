import { skillGroups } from '@/lib/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 blueprint-grid" aria-label="Skills">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-[3px] uppercase mb-3" style={{ color: 'var(--bp-accent)' }}>
            // SKILLS
          </p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--bp-text-primary)' }}>
            What I Work With
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
          {skillGroups.map(group => (
            <div key={group.label}>
              <h3 className="font-mono text-xs tracking-[2px] uppercase mb-4" style={{ color: 'var(--bp-accent)' }}>
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded border cursor-default transition-transform duration-150 hover:-translate-y-0.5"
                    style={{ background: 'var(--bp-surface)', color: 'var(--bp-text-secondary)', borderColor: 'var(--bp-border)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
