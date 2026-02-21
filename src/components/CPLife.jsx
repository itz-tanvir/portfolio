// ─────────────────────────────────────────────────────────────────────────────
// CPLife.jsx  |  COMPETITIVE PROGRAMMING SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Shows Tanvir's activity across competitive programming platforms and
// the contests he has participated in.
//
// Sub-components:
//   PlatformCard  — displays a judge platform name, handle, and rating
//   ContestBadge  — compact badge for one contest participation entry
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations' // shared slide-up entrance animation preset

// ─────────────────────────────────────────────────────────────────────────────
// PlatformCard
// One card per competitive programming judge (Codeforces, CodeChef etc.)
//
// Props:
//   emoji       — visual identifier (e.g. "⚡" for Codeforces)
//   platform    — platform name shown in bold
//   handle      — username on that platform
//   rating      — the rating value to display (string, e.g. "1200+")
//   ratingLabel — small uppercase label above the number (e.g. "Max Rating")
//   ratingColor — CSS colour string for the rating number (differs per platform tier)
//   delay       — fadeUp stagger delay in seconds
// ─────────────────────────────────────────────────────────────────────────────
function PlatformCard({ emoji, platform, handle, rating, ratingLabel, ratingColor, delay }) {
  return (
    <motion.div {...fadeUp(delay)} className="card p-8 flex flex-col gap-4">

      {/* Top row: emoji icon + platform name stacked above handle */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">{emoji}</span> {/* large emoji serves as the platform logo substitute */}
        <div>
          <p className="font-bold text-xl" style={{ color: 'var(--ink)' }}>{platform}</p>   {/* e.g. "Codeforces" */}
          <p className="font-mono text-sm" style={{ color: 'var(--muted)' }}>{handle}</p>   {/* e.g. "@itz_tanvir" */}
        </div>
      </div>

      {/* Horizontal divider — visually separates identity from stats */}
      <div className="h-px" style={{ background: 'rgba(128,128,128,0.15)' }} />

      {/* Rating stat block */}
      <div>
        {/* "MAX RATING" / "CURRENT STAR RATING" label — tiny mono uppercase above the number */}
        <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>
          {ratingLabel}
        </p>
        {/* The actual rating value — rendered large with a platform-specific colour
            (blue for CF, amber/yellow for CodeChef) */}
        <p className="text-4xl font-extrabold" style={{ color: ratingColor }}>
          {rating}
        </p>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ContestBadge
// Compact card listing one contest Tanvir has entered.
//
// Props:
//   name        — short abbreviation shown prominently (e.g. "ICPC")
//   description — full contest name and round details
//   delay       — fadeUp stagger delay in seconds
// ─────────────────────────────────────────────────────────────────────────────
function ContestBadge({ name, description, delay }) {
  return (
    <motion.div {...fadeUp(delay)} className="card p-6 flex items-center gap-4">

      {/* Trophy emoji in a soft orange-tinted rounded square — consistent icon treatment */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: 'rgba(212,98,42,0.1)' }} // very faint orange — echoes accent without overpowering
      >
        🏆
      </div>

      <div>
        <p className="font-bold text-lg" style={{ color: 'var(--ink)' }}>{name}</p>            {/* short contest code e.g. "ICPC" */}
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{description}</p>             {/* full name + year + round */}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CPLife  |  Default export
// ─────────────────────────────────────────────────────────────────────────────
export default function CPLife() {
  return (
    // id="cp-life" required for IntersectionObserver active-section tracking in App.jsx
    <section id="cp-life" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)}>
          <div className="accent-line" /> {/* 40px orange bar defined in index.css — marks the start of every section */}
          <p className="section-subtitle">Programming</p> {/* small mono uppercase sub-label */}
          <h2 className="section-title">Programming</h2>                       {/* large bold section heading */}
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            Only thing I enjoy
          </p>
        </motion.div>

        {/* ── Platform rating cards — 2 columns on md+ ────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <PlatformCard
            emoji="⚡" platform="Codeforces" handle="@itz_tanvir"
            rating="1200+"           // max rating achieved on Codeforces
            ratingLabel="Max Rating"
            ratingColor="#60a5fa"    // Tailwind blue-400 — Codeforces uses blue for their rating tiers
            delay={0.1}
          />
          <PlatformCard
            emoji="🍴" platform="CodeChef" handle="@itztanvir"
            rating="3★"             // current star tier on CodeChef
            ratingLabel="Current Star Rating"
            ratingColor="#fbbf24"   // Tailwind amber-400 — warm gold matches a star/award feel
            delay={0.2}
          />
        </div>

        {/* ── Contest participations ───────────────────────────────────────── */}
        <motion.h3 {...fadeUp(0.1)} className="font-bold text-xl mb-4" style={{ color: 'var(--ink)' }}>
          Contests Participated
        </motion.h3>
        {/* 2-column grid mirrors the platform cards above for visual consistency */}
        <div className="grid md:grid-cols-2 gap-4">
          <ContestBadge
            name="ICPC"
            description="International Collegiate Programming Contest 2024 — Dhaka Regional Round"
            delay={0.15}
          />
          <ContestBadge
            name="NCPC"
            description="National Collegiate Programming Contest 2023"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}
