'use client';

import { useEffect } from 'react';
import { initScrollReveals } from '@/lib/animations';

// Tiny client component — keeps page.tsx as a Server Component.
// Runs initScrollReveals once after mount and cleans up on unmount.
export default function AnimationInit() {
  useEffect(() => {
    const cleanup = initScrollReveals();
    return cleanup;
  }, []);
  return null;
}
