import type { NextConfig } from "next";

// CSP uses 'unsafe-inline' because:
// - Theme init script runs inline (beforeInteractive, prevents theme flash)
// - Tailwind v4 generates inline styles at runtime
// 'unsafe-eval' is dev-only: React requires dynamic code execution for enhanced
// error stack reconstruction during development. Excluded from production builds.
const isDev = process.env.NODE_ENV === 'development';
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "connect-src 'self' https://vitals.vercel-analytics.com",
  "upgrade-insecure-requests",
].join('; ');

const SECURITY_HEADERS = [
  // Prevent clickjacking — this site should never be embedded in an iframe
  { key: 'X-Frame-Options', value: 'DENY' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Only send full referrer to same-origin; send origin-only to cross-origin HTTPS
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features not used by this site
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Opt into DNS prefetch for performance
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Content Security Policy — restricts resource origins to prevent XSS and injection attacks
  { key: 'Content-Security-Policy', value: CSP },
];

const securityHeadersRoute = [{ source: '/(.*)', headers: SECURITY_HEADERS }];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  headers: () => Promise.resolve(securityHeadersRoute),
};

export default nextConfig;
