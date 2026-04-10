'use client';

import { useEffect, useState } from 'react';
import { toggleTheme, getTheme } from '@/lib/theme';

const NAV_LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'About',   href: '#about'   },
  { label: 'Contact', href: '#contact' },
] as const;

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [theme,     setTheme]     = useState<'light' | 'dark'>('dark');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    setTheme(getTheme());
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleToggle = () => {
    toggleTheme();
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const iconBtnBase: React.CSSProperties = { borderColor: 'var(--bp-border)', color: 'var(--bp-text-secondary)' };

  return (
    <>
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
          <a
            href="#hero"
            className="font-semibold focus-ring rounded"
            style={{ color: 'var(--bp-text-primary)' }}
          >
            Rex Quintenta
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm transition-colors duration-200 focus-ring rounded"
                style={{ color: 'var(--bp-text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--bp-accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--bp-text-secondary)')}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle — 44×44px touch target */}
            <button
              onClick={handleToggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-11 h-11 rounded-md border flex items-center justify-center transition-all duration-200 focus-ring"
              style={iconBtnBase}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bp-accent)'; e.currentTarget.style.color = 'var(--bp-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bp-border)'; e.currentTarget.style.color = 'var(--bp-text-secondary)'; }}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Hamburger — mobile only, 44×44px */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="md:hidden w-11 h-11 rounded-md border flex items-center justify-center transition-all duration-200 focus-ring"
              style={iconBtnBase}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bp-accent)'; e.currentTarget.style.color = 'var(--bp-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bp-border)'; e.currentTarget.style.color = 'var(--bp-text-secondary)'; }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-label="Site navigation"
          className="fixed inset-x-0 bottom-0 z-40 md:hidden flex flex-col blueprint-grid"
          style={{ top: '64px', background: 'var(--bp-bg)' }}
        >
          <nav aria-label="Mobile navigation" className="flex flex-col px-6 pt-6 pb-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold py-5 border-b transition-colors duration-200 focus-ring"
                style={{ color: 'var(--bp-text-primary)', borderColor: 'var(--bp-border)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--bp-accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--bp-text-primary)')}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
