// ─────────────────────────────────────────────────────────────────────────────
// CPLife.jsx  |  COMPETITIVE PROGRAMMING SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Shows Tanvir's activity across competitive programming platforms and
// the contests he has participated in.
//
// ── HOW TO CHANGE A LOGO ────────────────────────────────────────────────────
//   All logo URLs live in the LOGO_URLS object right below the imports.
//   To swap any logo:
//     1. Find a new image URL on the internet, e.g.:
//          • Right-click a logo image → "Copy image address"
//          • https://simpleicons.org  → search brand → right-click SVG → copy URL
//          • https://cdn.worldvectorlogo.com/logos/<brand-name>.svg
//          • Official press/media kit pages
//     2. Paste the URL as the value for the matching key in LOGO_URLS.
//   No other code needs to change.
//
// Sub-components:
//   PlatformCard  — displays a judge platform name, handle, and rating
//   ContestBadge  — compact badge for one contest participation entry
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations' // shared slide-up entrance animation preset

// ─────────────────────────────────────────────────────────────────────────────
// LOGO_URLS  ✏️  EDIT THIS OBJECT TO CHANGE ANY LOGO
// ─────────────────────────────────────────────────────────────────────────────
// Each value is a direct image URL used as the <img src="..."> for that logo.
// Swap a URL here and the new logo instantly appears everywhere it is used.
// ─────────────────────────────────────────────────────────────────────────────
const LOGO_URLS = {

  // ✏️  Codeforces — replace this URL to use a different Codeforces logo
  codeforces: 'https://codeforces.com/codeforces.org/s/79962/android-icon-192x192.png',

  // ✏️  CodeChef — replace this URL to use a different CodeChef logo
  codechef: 'https://cdn.codechef.com/sites/all/themes/abessive/cc-logo.png',

  // ✏️  ICPC — replace this URL to use a different ICPC logo
  icpc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1eZjwvzmB205KGVFlgrLGtfXJicO-0Is0Q&s',

  // ✏️  NCPC — replace with a real URL when you find one
  ncpc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI8x_NnW40YGGq6YRIWxkqwhAqrgbMyQ6_pw&s',
}

// ─────────────────────────────────────────────────────────────────────────────
// PlatformCard
// One card per competitive programming judge (Codeforces, CodeChef etc.)
//
// Props:
//   logoUrl     — direct URL for the platform logo image (from LOGO_URLS)
//   logoAlt     — accessible alt text describing the logo
//   platform    — platform name shown in bold (e.g. "Codeforces")
//   handle      — username on that platform (e.g. "@itz_tanvir")
//   rating      — rating value to display (string, e.g. "1200+")
//   ratingLabel — tiny uppercase label above the number (e.g. "Max Rating")
//   ratingColor — CSS colour string for the big rating number
//   delay       — fadeUp stagger delay in seconds
// ─────────────────────────────────────────────────────────────────────────────
function PlatformCard({ logoUrl, logoAlt, platform, handle, rating, ratingLabel, ratingColor, delay }) {
  return (
    <motion.div {...fadeUp(delay)} className="card p-8 flex flex-col gap-4">

      {/* Top row: logo image + platform name stacked above the handle */}
      <div className="flex items-center gap-3">

        {/* Platform logo — 32×32px, unchanged from previous version */}
        <img
          src={logoUrl}
          alt={logoAlt}
          width={44}
          height={44}
          className="flex-shrink-0 object-contain rounded"
          style={{ width: 44, height: 44 }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />

        <div>
          {/* Platform name — e.g. "Codeforces" */}
          <p className="font-bold text-xl" style={{ color: 'var(--ink)' }}>{platform}</p>

          {/* Handle / username — e.g. "@itz_tanvir" */}
          <p className="font-mono text-sm" style={{ color: 'var(--muted)' }}>{handle}</p>
        </div>
      </div>

      {/* Horizontal divider — visually separates identity from stats */}
      <div className="h-px" style={{ background: 'rgba(128,128,128,0.15)' }} />

      {/* Rating stat block */}
      <div>
        {/* "MAX RATING" / "CURRENT STAR RATING" label */}
        <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>
          {ratingLabel}
        </p>

        {/* The actual rating value — large, bold, platform-specific colour */}
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
//   logoUrl     — direct URL for the contest logo image (from LOGO_URLS)
//   logoAlt     — accessible alt text describing the logo
//   name        — short contest code shown as the card title (e.g. "ICPC")
//   description — full contest name + year + round info
//   delay       — fadeUp stagger delay in seconds
// ─────────────────────────────────────────────────────────────────────────────
function ContestBadge({ logoUrl, logoAlt, name, description, delay }) {
  return (
    <motion.div {...fadeUp(delay)} className="card p-6 flex items-center gap-4">

      {/* Contest logo container.
          ↑ Container grown from w-12/h-12 (48px) → w-16/h-16 (64px) to give the
            logos more room and make them appear larger on screen. */}
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(212,98,42,0.1)' }} /* very faint orange — echoes accent */
      >
        {/* Contest logo.
            ↑ Size increased from 28×28px → 44×44px so ICPC and NCPC logos are
              clearly visible. object-contain prevents any cropping regardless of
              the image's natural aspect ratio. */}
        <img
          src={logoUrl}
          alt={logoAlt}
          width={400}
          height={400}
          className="object-contain rounded"
          style={{ width: 400, height: 400 }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      <div>
        {/* Short contest abbreviation — e.g. "ICPC" */}
        <p className="font-bold text-lg" style={{ color: 'var(--ink)' }}>{name}</p>

        {/* Full contest name + year + round */}
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{description}</p>
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
          {/* 40px orange accent bar defined in index.css — marks the start of every section */}
          <div className="accent-line" />

          {/* Small mono uppercase sub-label above the main heading */}
          <p className="section-subtitle">Programming</p>

          {/* Large bold section heading */}
          <h2 className="section-title">Programming</h2>

          {/* Short tagline */}
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            Only thing I enjoy
          </p>
        </motion.div>

        {/* ── Platform rating cards — 2 columns on md+ ────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Codeforces card — ✏️ Logo URL → LOGO_URLS.codeforces */}
          <PlatformCard
            logoUrl={LOGO_URLS.codeforces}
            logoAlt="Codeforces logo"
            platform="Codeforces"
            handle="@itz_tanvir"
            rating="1200+"
            ratingLabel="Max Rating"
            ratingColor="#039003f0"    /* green — Codeforces "Pupil" tier colour */
            delay={0.1}
          />

          {/* CodeChef card — ✏️ Logo URL → LOGO_URLS.codechef */}
          <PlatformCard
            logoUrl={LOGO_URLS.codechef}
            logoAlt="CodeChef logo"
            platform="CodeChef"
            handle="@itztanvir"
            rating="3★"
            ratingLabel="Current Star Rating"
            ratingColor="#fbbf24"     /* amber-400 — warm gold for star rating */
            delay={0.2}
          />
        </div>

        {/* ── Contest participations ───────────────────────────────────────── */}
        <motion.h3 {...fadeUp(0.1)} className="font-bold text-xl mb-4" style={{ color: 'var(--ink)' }}>
          Contests Participated
        </motion.h3>

        {/* 2-column grid mirrors the platform cards above for visual consistency */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* ICPC 2024 Dhaka Regional badge — ✏️ Logo URL → LOGO_URLS.icpc */}
          <ContestBadge
            logoUrl={LOGO_URLS.icpc}
            logoAlt="ICPC logo"
            name="ICPC"
            description="International Collegiate Programming Contest 2024 — Dhaka Regional Round"
            delay={0.15}
          />

          {/* NCPC 2023 badge — ✏️ Logo URL → LOGO_URLS.ncpc */}
          <ContestBadge
            logoUrl={LOGO_URLS.ncpc}
            logoAlt="NCPC logo"
            name="NCPC"
            description="National Collegiate Programming Contest 2023"
            delay={0.2}
          />
        </div>

      </div>
    </section>
  )
}
