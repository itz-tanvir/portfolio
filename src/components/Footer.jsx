// ─────────────────────────────────────────────────────────────────────────────
// Footer.jsx  |  PAGE FOOTER
// ─────────────────────────────────────────────────────────────────────────────
// A slim bar at the very bottom of the page containing:
//   • Tech-stack credit line (React, Tailwind CSS, Framer Motion)
//   • Auto-updating copyright year — uses JS Date API, never needs manual updates
//
// Rendered once by App.jsx, after all <section> components and outside <main>.
// Not a navigable section (no id="footer"), so IntersectionObserver ignores it.
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  // new Date().getFullYear() returns the current 4-digit calendar year (e.g. 2025)
  // Evaluated once when this component renders — if the user keeps the tab open
  // across midnight on New Year's it won't update, which is fine for a copyright line
  const year = new Date().getFullYear()

  return (
    // borderTop: thin 15% opacity grey line visually separates footer from Connect section
    // py-10: generous top/bottom padding so the footer doesn't feel cramped
    <footer className="py-10 px-6 md:px-16" style={{ borderTop: '1px solid rgba(128,128,128,0.15)' }}>

      {/* Inner row: side by side on md+, stacked centred on mobile
          font-mono text-sm: monospace small text feels appropriate for a footer credit line */}
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm"
        style={{ color: 'var(--muted)' }} // muted grey — footer content should recede, not compete with page sections
      >
        {/* Left side: tech stack credits */}
        {/* The ♥ symbol gets the accent orange colour — small branded flourish */}
        <p>Built with <span style={{ color: 'var(--accent)' }}>♥</span> using React + Tailwind + Framer Motion</p>

        {/* Right side: copyright with dynamically computed year */}
        {/* Using {year} instead of hardcoded "2025" prevents the line becoming stale */}
        <p>© {year} Tanvir. All rights reserved.</p>
      </div>
    </footer>
  )
}
