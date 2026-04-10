'use client';

const CONTACT_LINKS = [
  { label: 'Email',    value: 'owenquintenta@gmail.com',          href: 'mailto:owenquintenta@gmail.com'                   },
  { label: 'LinkedIn', value: 'linkedin.com/in/owendev',          href: 'https://linkedin.com/in/owendev'                  },
  { label: 'GitHub',   value: 'github.com/RexOwenDev',            href: 'https://github.com/RexOwenDev'                    },
  { label: 'Upwork',   value: 'upwork.com/freelancers',           href: 'https://upwork.com/freelancers/~016d94e91b51fc9dec'},
] as const;

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 blueprint-grid" aria-label="Contact">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-[3px] uppercase mb-3" style={{ color: 'var(--bp-accent)' }}>
            // CONTACT
          </p>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--bp-text-primary)' }}>
            Let&apos;s build something.
          </h2>
          <p className="text-base" style={{ color: 'var(--bp-text-secondary)' }}>
            Available for full-time roles and consulting. Based in Cavite, PH — working US business hours.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
          {CONTACT_LINKS.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="p-5 rounded-lg border text-left transition-all duration-200 hover:-translate-y-1"
              style={{ background: 'var(--bp-surface)', borderColor: 'var(--bp-border)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--bp-accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--bp-border)')}
            >
              <p className="font-mono text-xs tracking-[2px] uppercase mb-2" style={{ color: 'var(--bp-accent)' }}>
                {label}
              </p>
              <p className="text-sm truncate" style={{ color: 'var(--bp-text-secondary)' }}>{value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
