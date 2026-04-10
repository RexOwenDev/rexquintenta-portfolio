import type { NextConfig } from "next";

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
];

const securityHeadersRoute = [{ source: '/(.*)', headers: SECURITY_HEADERS }];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  headers: () => Promise.resolve(securityHeadersRoute),
};

export default nextConfig;
