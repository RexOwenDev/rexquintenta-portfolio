// Client-only utilities — all functions access `document` and must only be called
// from 'use client' components or browser event handlers.

export function applyTheme(theme: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('light', theme === 'light');
  try {
    localStorage.setItem('rex-theme', theme);
  } catch (e) {
    // localStorage blocked in sandboxed contexts — degrade silently
  }
}

export function toggleTheme(): void {
  if (typeof document === 'undefined') return;
  const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
  const next: 'light' | 'dark' = current === 'light' ? 'dark' : 'light';

  // View Transitions API — smooth cross-fade. Class swap MUST be inside the callback.
  // Falls back to instant swap on unsupported browsers (~15% as of 2026).
  if ('startViewTransition' in document) {
    (document as Document & {
      startViewTransition: (cb: () => void) => { ready: Promise<void> };
    }).startViewTransition(() => applyTheme(next));
  } else {
    applyTheme(next);
  }
}

export function getTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}
