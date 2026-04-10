export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t" style={{ borderColor: 'var(--bp-border)' }}>
      <div
        className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
        style={{ color: 'var(--bp-text-muted)' }}
      >
        <span>© 2026 Rex Quintenta · rexquintenta.dev</span>
        <span>Built with Claude Code + Next.js</span>
      </div>
    </footer>
  );
}
