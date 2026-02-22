// ─────────────────────────────────────────────────────────────────────────────
// About.jsx  |  HERO / INTRODUCTION SECTION
// ─────────────────────────────────────────────────────────────────────────────
// The first section visible when the page loads. Contains:
//   • Two-line hero heading ("i am" small + "Tanvir." large bold)
//   • Profile photo with a decorative rotated orange border frame behind it
//   • Education card — three academic milestones listed with accent dots
//   • Awards card   — three contest placements in branded highlight boxes
//
// All elements use fadeUp() so they slide up and fade in as they scroll into view.
// The photo uses its own scale animation for a distinct "pop" entrance.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion' // motion.div etc. — Framer Motion's animatable element wrappers

// ── Local fadeUp helper ────────────────────────────────────────────────────────
// Duplicated from utils/animations.js because About.jsx was written before
// that utility file was extracted. Both are identical — refactor later if desired.
// Returns a spread-ready Framer Motion prop object that fades + slides the element up.
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },         // hidden, 30px below resting position
  whileInView: { opacity: 1, y: 0 },          // fully visible, at natural position
  viewport:    { once: true },                 // trigger animation only the first time it enters view
  transition:  { duration: 0.6, delay, ease: 'easeOut' }, // 600ms; `delay` staggers sibling elements
})

export default function About() {
  return (
    // id="about" is required so IntersectionObserver in App.jsx can detect this section
    // min-h-screen: occupies full viewport height so it looks intentional as the landing hero
    // pt-28: extra top padding to clear the fixed Navbar (64px) plus breathing room
    <section id="about" className="section-padding min-h-screen flex items-center pt-28">
      <div className="max-w-6xl mx-auto w-full">

        {/* ── Hero row ───────────────────────────────────────────────────────── */}
        {/* flex-col-reverse on mobile: photo stacks ABOVE text (more visual impact on small screens)
            md:flex-row on desktop: text on left, photo on right — standard CV / bio layout     */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-20">

          {/* ── Text column ──────────────────────────────────────────────────── */}
          <div className="flex-1"> {/* flex-1 allows text to grow and fill remaining space next to photo */}

            {/* "👋 Welcome" — accent-coloured label in small mono uppercase caps */}
            <motion.div {...fadeUp(0)}> {/* delay 0: first element to animate in */}
              <span style={{ color: 'var(--accent)' }} className="font-mono text-sm tracking-widest uppercase">
                👋 Welcome
              </span>
            </motion.div>

            {/* Two-line heading: "i am" in small muted text, "Tanvir." in giant bold ink */}
            {/* Using two separate <span> elements allows each line to have independent sizing */}
            <motion.h1 {...fadeUp(0.1)} className="leading-tight mt-2 mb-4" style={{ color: 'var(--ink)' }}>
              <span className="block text-2xl md:text-2xl font-mono text-sm tracking-widest" style={{ color: 'var(--muted)' }}>
                I am {/* intentionally lowercase for stylistic effect */}
              </span>
              <span className="block text-5xl md:text-7xl font-extrabold tracking-tight" style={{ color: 'var(--ink)' }}>
                Tanvir<span style={{ color: 'var(--accent)' }}>.</span> {/* trailing period in accent orange — signature branding element */}
              </span>
            </motion.h1>

            {/* Personal tagline — short and personality-driven */}
            <motion.p {...fadeUp(0.2)} className="text-lg max-w-md leading-relaxed" style={{ color: 'var(--muted)' }}>
              i'm a hedgehog who lives in Sylhet.
            </motion.p>
          </div>

          {/* ── Photo column ─────────────────────────────────────────────────── */}
          {/* Independent animation: scales up from 85% opacity-0 for a "pop in" feel
              distinct from the text's slide-up — breaks visual monotony              */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} // start small and invisible
            whileInView={{ opacity: 1, scale: 1 }} // grow to full size and become visible
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex-shrink-0" // prevent the photo from shrinking when space is tight
          >
            {/* Relative-positioned wrapper allows the decorative border to be absolutely offset */}
            <div className="relative w-52 h-52 md:w-64 md:h-64">

              {/* Decorative frame: a rotated square behind the photo
                  -inset-3 extends it 12px beyond the photo edges on all sides
                  rotate-3 tilts it 3° for an asymmetric, playful look
                  The orange border ties into the accent colour theme              */}
              <div
                className="absolute -inset-3 border-2 rounded-2xl rotate-3"
                style={{ borderColor: 'rgba(212,98,42,0.3)' }} // 30% opacity so it's subtle, not loud
              />

              {/* Actual profile photo — sits on top of the decorative frame via `relative` */}
              <img
                src="image/my_image3.jpeg"
                alt="Tanvir's profile photo"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl" // rounded corners, deep shadow for depth
              />
            </div>
          </motion.div>
        </div>

        {/* ── Info cards row ─────────────────────────────────────────────────── */}
        {/* Two equal columns on md+; single column stack on mobile */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* ── Education card ─────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.1)} className="card p-8">
            <div className="accent-line" /> {/* short 40px orange bar — decorative section indicator defined in index.css */}
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>Education</h2>

            {/* Map over education milestones — add new entries to this array as needed */}
            {[
              { level: 'Secondary School Certificate',  name: 'Shahjalal Jameya Islamia Kamil Madrasha', year: 'Completed 2018' },
              { level: 'Higher Secondary Certificate',  name: 'Sylhet Government College',               year: 'Completed 2020' },
              { level: 'College / University',          name: 'Metropolitan University',                  year: '2020 – Present' },
            ].map(({ level, name, year }) => (
              <div key={level} className="flex items-start gap-4 mb-5 last:mb-0"> {/* last:mb-0 removes bottom margin on the final item */}
                {/* Small filled circle — acts as a bullet point in accent colour */}
                <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{level}</p> {/* qualification type label */}
                  <p className="font-semibold" style={{ color: 'var(--ink)' }}>{name}</p>     {/* institution name */}
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{year}</p>         {/* completion year or date range */}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Awards card ────────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.2)} className="card p-8"> {/* 0.2 delay: animates in just after the education card */}
            <div className="accent-line" />
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>Awards</h2>

            {/* Map over contest placements — each rendered as a tinted highlight box */}
            {[
              { rank: '🥈 2nd Place',  event: 'MU_CSE_FEST_2023', description: 'Intra‑University Programming Contest' },
              { rank: '🏅 7th Place',  event: 'IMUPC 2025',        description: 'Intra Metropolitan University Programming Contest' },
              { rank: '🏅 11th Place', event: 'MU_IUPC_2024',      description: 'Metropolitan University Inter University Programming Contest - Sylhet Division 2024' },
            ].map(({ rank, event, description }) => (
              <div
                key={event}
                className="mb-6 last:mb-0 p-4 rounded-xl"
                style={{
                  background: 'rgba(212,98,42,0.07)',         // very faint orange wash — links visually to the accent theme
                  border:     '1px solid rgba(212,98,42,0.2)', // slightly stronger orange border defines the box edge
                }}
              >
                <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>{rank}</p>      {/* medal + placement text */}
                <p className="font-bold text-xl" style={{ color: 'var(--accent)' }}>{event}</p>                                   {/* contest shortcode in large accent colour — most prominent piece */}
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{description}</p>                                   {/* full contest name and details */}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
