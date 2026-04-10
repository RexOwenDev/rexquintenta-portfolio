'use client';

import { useEffect, useState } from 'react';
import { toggleTheme, getTheme } from '@/lib/theme';

const NAV_LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'About',   href: '#about'   },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setTheme(getTheme());
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--bp-bg) 98%, transparent)'
          : 'color-mix(in srgb, var(--bp-bg) 95%, transparent)',
        backdropFilter: `blur(${scrolled ? '20px' : '12px'})`,
        borderBottom: `1px solid ${scrolled ? 'var(--bp-border)' : 'transparent'}`,
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold" style={{ color: 'var(--bp-text-primary)' }}>
          Rex Quintenta
        </span>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--bp-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--bp-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--bp-text-secondary)')}
            >
              {label}
            </a>
          ))}
        </div>

        <button
          onClick={handleToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="w-9 h-9 rounded-md border flex items-center justify-center text-base transition-all duration-200"
          style={{ borderColor: 'var(--bp-border)', color: 'var(--bp-text-secondary)' }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--bp-accent)';
            el.style.color = 'var(--bp-accent)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--bp-border)';
            el.style.color = 'var(--bp-text-secondary)';
          }}
        >
          {theme === 'dark' ? '☀' : '☽'}
        </button>
      </div>
    </nav>
  );
}
