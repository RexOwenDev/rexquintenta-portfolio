import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rex Quintenta — AI Automation Specialist',
  description:
    'I build AI pipelines, n8n workflows, and full-stack apps that ship. Claude Code + n8n + Next.js specialist based in the Philippines.',
  openGraph: {
    title: 'Rex Quintenta — AI Automation Specialist',
    description: 'I build AI pipelines, n8n workflows, and full-stack apps that ship.',
    url: 'https://rexquintenta.dev',
    siteName: 'Rex Quintenta',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rex Quintenta — AI Automation Specialist',
    description: 'I build AI pipelines, n8n workflows, and full-stack apps that ship.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

// Static compile-time string — no user input, no interpolation.
// Runs before hydration to set the correct theme class and prevent flash.
// Safe use of dangerouslySetInnerHTML per Next.js docs for beforeInteractive scripts.
const THEME_INIT_SCRIPT = `
  (function() {
    try {
      var stored = localStorage.getItem('rex-theme');
      var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      if ((stored || preferred) === 'light') {
        document.documentElement.classList.add('light');
      }
    } catch (e) {}
  })();
`;

// Static JSON-LD — JSON.stringify of a static object literal.
// Safe: no user-supplied fields, JSON.stringify escapes all special characters.
const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rex Quintenta',
  jobTitle: 'AI Automation Specialist',
  url: 'https://rexquintenta.dev',
  sameAs: [
    'https://linkedin.com/in/owendev',
    'https://github.com/RexOwenDev',
    'https://upwork.com/freelancers/~016d94e91b51fc9dec',
  ],
}, null, 2);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme init — must run before first paint. Static string, no user data. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        {/* JSON-LD — static object, JSON.stringify escapes all chars. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
