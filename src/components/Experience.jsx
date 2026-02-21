// ─────────────────────────────────────────────────────────────────────────────
// Experience.jsx  |  WORK HISTORY SECTION (PLACEHOLDER STATE)
// ─────────────────────────────────────────────────────────────────────────────
// Tanvir currently has no professional work experience to list, so this section
// renders two animated "skeleton" cards — pulsing grey placeholder blocks that
// mimic the shape of a real job entry card — together with a pinging status dot
// and "Loading experience data…" text to signal that content is coming.
//
// When real experience is available: replace SkeletonCard calls with actual
// job entry components and remove the "Loading" indicator at the bottom.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

// ─────────────────────────────────────────────────────────────────────────────
// SkeletonCard
// One animated placeholder card mimicking a real experience entry layout:
//   ┌──────────────────────────────────────────┐
//   │ [logo box]  ██████████████  (title)      │
//   │             ████████████████████  (co.)  │
//   │             ████████████  (dates)        │
//   │             ████████████████████████     │
//   │             ██████████████████           │
//   │             ████████████                 │
//   └──────────────────────────────────────────┘
// animate-pulse is a Tailwind utility that oscillates opacity 1 → 0.5 → 1
// in a 2s loop, giving the appearance of "loading" content.
//
// Props:
//   delay — fadeUp stagger delay in seconds
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonCard({ delay }) {
  return (
    <motion.div {...fadeUp(delay)} className="card p-8">
      <div className="flex items-start gap-5">

        {/* Placeholder for a company logo / avatar — square with rounded corners */}
        <div
          className="w-14 h-14 rounded-xl animate-pulse flex-shrink-0" // flex-shrink-0 prevents squishing when text lines are long
          style={{ background: 'rgba(128,128,128,0.15)' }}              // neutral grey wash — not accent colour, keeps it clearly "not real content"
        />

        {/* Placeholder text lines — varying widths simulate real text rhythm */}
        <div className="flex-1 space-y-3"> {/* space-y-3 adds consistent 12px gap between each line */}
          <div className="h-5 w-40 rounded-lg animate-pulse" style={{ background: 'rgba(128,128,128,0.15)' }} /> {/* job title — wider/taller */}
          <div className="h-4 w-56 rounded-lg animate-pulse" style={{ background: 'rgba(128,128,128,0.12)' }} /> {/* company name — longest */}
          <div className="h-3 w-32 rounded-lg animate-pulse" style={{ background: 'rgba(128,128,128,0.1)'  }} /> {/* date range — short */}

          {/* Description paragraph lines — each slightly shorter to mimic real text wrapping */}
          <div className="pt-2 space-y-2">
            <div className="h-3 w-full rounded-lg animate-pulse" style={{ background: 'rgba(128,128,128,0.1)' }} /> {/* full-width first line */}
            <div className="h-3 w-5/6 rounded-lg animate-pulse" style={{ background: 'rgba(128,128,128,0.1)' }} /> {/* 83% width second line */}
            <div className="h-3 w-4/6 rounded-lg animate-pulse" style={{ background: 'rgba(128,128,128,0.1)' }} /> {/* 66% width third line — paragraph tail */}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Experience  |  Default export
// ─────────────────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    // id="experience" required for IntersectionObserver active-section tracking in App.jsx
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)}>
          <div className="accent-line" />
          <p className="section-subtitle">Work history</p>
          <h2 className="section-title">Experience</h2>
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            Professional experience coming soon — stay tuned!
          </p>
        </motion.div>

        {/* Two skeleton cards — [0, 1].map(...) is a concise way to render a fixed count without needing dummy data */}
        {/* Stagger: second card delayed 0.1s so they slide in one after the other */}
        <div className="space-y-6">
          {[0, 1].map((i) => <SkeletonCard key={i} delay={i * 0.1} />)}
        </div>

        {/* ── "Loading" status indicator ────────────────────────────────────── */}
        {/* Appears below the skeleton cards to reinforce the "coming soon" message */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-8 flex items-center gap-3 font-mono text-sm"
          style={{ color: 'var(--muted)' }}
        >
          {/* Pinging dot: two layered elements create the ripple animation
              Outer span (animate-ping): fades in/out and expands — the ripple ring
              Inner span (relative):     stays solid — the permanent dot centre     */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: 'var(--accent)' }} // orange ripple ring
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: 'var(--accent)' }} // solid orange dot centre
            />
          </span>
          Loading experience data...
        </motion.div>
      </div>
    </section>
  )
}
