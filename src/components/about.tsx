const INFO_CARDS = [
  { label: 'Location',     value: 'Cavite, Philippines · Remote' },
  { label: 'Availability', value: 'Open to full-time roles'      },
  { label: 'Timezone',     value: 'PHT (UTC+8) · US hours flex'  },
] as const;

export default function About() {
  return (
    <section id="about" className="py-24 px-6" aria-label="About">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-[3px] uppercase mb-3" style={{ color: 'var(--bp-accent)' }}>
            // ABOUT
          </p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--bp-text-primary)' }}>
            Who I Am
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
          <div>
            <p className="text-base leading-[1.8] mb-4" style={{ color: 'var(--bp-text-secondary)' }}>
              I&apos;m Rex, an AI Automation Specialist based in Cavite, Philippines with 4+ years of
              fully remote experience. I&apos;ve logged 3,500+ hours on Upwork with a 100% Job Success
              Score, building automation pipelines and AI-powered tools for clients across industries.
            </p>
            <p className="text-base leading-[1.8]" style={{ color: 'var(--bp-text-secondary)' }}>
              My daily stack is Claude Code + n8n — I use them in production, not just demos. From
              5-phase AI content pipelines to collaborative web apps powered by Claude, I build systems
              that solve real business problems.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {INFO_CARDS.map(({ label, value }) => (
              <div
                key={label}
                className="p-4 rounded-lg border"
                style={{ background: 'var(--bp-surface)', borderColor: 'var(--bp-border)' }}
              >
                <p className="font-mono text-xs tracking-[2px] uppercase mb-1" style={{ color: 'var(--bp-accent)' }}>
                  {label}
                </p>
                <p className="text-sm" style={{ color: 'var(--bp-text-primary)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
