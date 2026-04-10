'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { target: 3500, label: '+ UPWORK HRS'      },
  { target: 100,  label: '% JOB SUCCESS'      },
  { target: 4,    label: '+ YEARS REMOTE'     },
  { target: 13,   label: '+ LIVE WORKFLOWS'   },
] as const;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rafHandles: number[] = [];

    // Count-up — Geist Mono ensures fixed digit width, preventing CLS
    if (!reduced && statsRef.current) {
      const counters = statsRef.current.querySelectorAll<HTMLElement>('[data-target]');
      counters.forEach(el => {
        const target = parseInt(el.dataset.target ?? '0', 10);
        const startTime = performance.now();
        const duration = 1200;
        let handle: number;
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          el.textContent = Math.floor(easeOutCubic(progress) * target).toString();
          if (progress < 1) {
            handle = requestAnimationFrame(tick);
            rafHandles.push(handle);
          } else {
            el.textContent = target.toString();
          }
        };
        handle = requestAnimationFrame(tick);
        rafHandles.push(handle);
      });
    }

    // Cursor glow — CSS custom property on hero element
    if (reduced) {
      return () => {
        rafHandles.forEach(h => cancelAnimationFrame(h));
      };
    }
    const hero = document.getElementById('hero');
    if (!hero) {
      return () => {
        rafHandles.forEach(h => cancelAnimationFrame(h));
      };
    }
    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--cursor-x', `${e.clientX - rect.left}px`);
      hero.style.setProperty('--cursor-y', `${e.clientY - rect.top}px`);
    };
    hero.addEventListener('mousemove', onMouseMove);
    return () => {
      rafHandles.forEach(h => cancelAnimationFrame(h));
      hero.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = '';
  };

  const scrollTo = (id: string) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center blueprint-grid overflow-hidden"
      style={{
        background: `radial-gradient(
          ellipse 600px 400px at var(--cursor-x, 50%) var(--cursor-y, 50%),
          rgba(0,212,255,0.06) 0%,
          transparent 70%
        ), var(--bp-bg)`,
      }}
      aria-label="Hero"
    >
      {/* Scroll progress bar */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* Corner bracket marks */}
      {([
        'top-8 left-8 border-t-2 border-l-2 border-r-0 border-b-0',
        'top-8 right-8 border-t-2 border-r-2 border-l-0 border-b-0',
        'bottom-8 left-8 border-b-2 border-l-2 border-r-0 border-t-0',
        'bottom-8 right-8 border-b-2 border-r-2 border-l-0 border-t-0',
      ] as const).map((cls, i) => (
        <span
          key={i}
          className={`absolute w-5 h-5 ${cls}`}
          style={{ borderColor: 'var(--bp-corner)' }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-[3px] uppercase mb-6 typing-cursor"
           style={{ color: 'var(--bp-accent)' }}>
          // AI AUTOMATION SPECIALIST
        </p>

        <h1
          className="shimmer-text font-bold mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
        >
          Rex Quintenta
        </h1>

        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--bp-text-secondary)' }}>
          I build AI systems and automations that actually ship.
        </p>

        {/* Stats — Geist Mono keeps digit widths fixed, preventing CLS during count-up */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 font-mono text-sm">
          {STATS.map(({ target, label }) => (
            <div key={label} style={{ minWidth: '120px' }} className="text-center">
              <span className="font-bold text-lg" style={{ color: 'var(--bp-accent)' }}>
                <span data-target={target}>{target}</span>{label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => scrollTo('work')}
            className="font-mono text-sm px-6 py-3 rounded-md font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--bp-accent)', color: '#070d1a' }}
          >
            VIEW_WORK()
          </button>
          <button
            onMouseMove={handleMagneticMove}
            onMouseLeave={e => {
              handleMagneticLeave(e);
              e.currentTarget.style.borderColor = 'var(--bp-border)';
              e.currentTarget.style.color = 'var(--bp-text-secondary)';
            }}
            onClick={() => scrollTo('contact')}
            className="font-mono text-sm px-6 py-3 rounded-md border transition-all duration-200"
            style={{ borderColor: 'var(--bp-border)', color: 'var(--bp-text-secondary)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--bp-accent)';
              e.currentTarget.style.color = 'var(--bp-accent)';
            }}
          >
            CONTACT()
          </button>
        </div>
      </div>
    </section>
  );
}
