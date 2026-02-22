// ─────────────────────────────────────────────────────────────────────────────
// Resume.jsx  |  RESUME DOWNLOAD SECTION
// ─────────────────────────────────────────────────────────────────────────────
// A single card prompting visitors to open Tanvir's PDF résumé.
// The PDF is served from /image/Resume.pdf in the built output —
// it sits in the /image/ folder alongside my_image.jpeg.
//
// Clicking "Open PDF" opens the file in a new browser tab rather than
// forcing a download, so visitors can preview before saving.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { FileText, ArrowUpRight } from 'lucide-react' // FileText: document icon; ArrowUpRight: diagonal arrow = external/new-tab link convention
import { fadeUp } from '../utils/animations'

// ─────────────────────────────────────────────────────────────────────────────
// Resume  |  Default export
// ─────────────────────────────────────────────────────────────────────────────
export default function Resume() {
  return (
    // id="resume" required for IntersectionObserver active-section tracking in App.jsx
    <section id="resume" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)}>
          <div className="accent-line" /> {/* 40px orange decoration bar from index.css */}
          <p className="section-subtitle">My credentials</p>
          <h2 className="section-title">Resume</h2>
        </motion.div>

        {/* ── Resume card ──────────────────────────────────────────────────── */}
        {/* max-w-2xl: keeps card from being uncomfortably wide on large monitors
            flex-col on mobile, flex-row on md+ — icon | text | button side by side on desktop */}
        <motion.div
          {...fadeUp(0.15)} // slight delay so heading animates in before the card follows
          className="card p-10 mt-10 max-w-2xl flex flex-col md:flex-row items-center gap-8"
        >
          {/* FileText icon in a faint orange square — visual anchor left of the text */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(212,98,42,0.1)' }} // very faint orange tint — ties to accent without dominating
          >
            <FileText size={36} style={{ color: 'var(--accent)' }} /> {/* accent orange matches the rest of the portfolio */}
          </div>

          {/* Card text block — grows to fill space between icon and button */}
          <div className="flex-1 text-center md:text-left"> {/* centre on mobile (stacked), left-align on desktop (side-by-side) */}
            <p className="font-bold text-2xl" style={{ color: 'var(--ink)' }}>Tanvir — Resume</p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              Full résumé including education, projects, skills, and achievements.
            </p>
            <p className="font-mono text-xs mt-2" style={{ color: 'var(--muted)' }}>PDF · Updated 2025</p> {/* format + last-updated note */}
          </div>

          {/* "Open PDF" button — solid accent background, opens PDF in new tab */}
          {/* flex-shrink-0 prevents the button from squishing when the text block is wide */}
          <a
            href="public/image/Resume.pdf"   // path to the PDF file in the built output
            target="_blank"            // open in a new browser tab — visitor doesn't lose their place
            rel="noopener noreferrer"  // security: block new tab from accessing window.opener
            className="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-200 flex-shrink-0 shadow-md"
            style={{ background: 'var(--accent)', color: '#fff' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} // subtle dim on hover — feedback without a heavy colour change
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}    // restore full opacity on leave
          >
            Open PDF
            <ArrowUpRight size={16} /> {/* diagonal arrow icon — universally understood "opens externally" signal */}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
