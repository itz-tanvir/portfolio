// ─────────────────────────────────────────────────────────────────────────────
// Skills.jsx  |  TECHNICAL SKILLS SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Redesigned from the original card grid into a bold horizontal "bento" layout.
// Each skill sits in a tall panel with a large logo image, name, description,
// and a proficiency badge.
//
// ── HOW TO CONTROL LOGO ZOOM PER SKILL ──────────────────────────────────────
//   Every skill object in SKILLS has two zoom properties:
//
//     logoSize   — the rendered width & height of the <img> in pixels.
//                  Increase to make the logo fill more of the panel.
//                  Decrease to shrink it.
//                  Example:  logoSize: 80   → 80×80px image
//
//     logoBg     — optional CSS background for the logo container
//                  (useful when a logo has transparency and needs a tinted backdrop)
//                  Defaults to transparent if omitted.
//
//   The container that holds the logo is always 120px tall — the image is
//   centred inside it. logoSize only controls the <img> dimensions.
//
// ── TO ADD A SKILL ───────────────────────────────────────────────────────────
//   Append an object to SKILLS. The grid renders it automatically.
//
// ── TO REMOVE A SKILL ────────────────────────────────────────────────────────
//   Delete its object from SKILLS.
//
// Sub-components:
//   SkillCard — renders one skill panel
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS  ✏️  EDIT THIS ARRAY TO ADD / REMOVE / REORDER SKILLS
// ─────────────────────────────────────────────────────────────────────────────
// Fields:
//   name      — displayed skill name
//   logoUrl   — direct internet URL for the skill's logo image
//   logoAlt   — accessible alt text
//   logoSize  — ✏️ image width & height in px — CHANGE THIS PER SKILL to zoom in/out
//   level     — must match a key in LEVEL_STYLE ("Advanced" | "Proficient" | "Intermediate")
//   desc      — one-line description of how this skill is applied
// ─────────────────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    name: 'Problem Solving',
    // Brain / algorithm icon from a public CDN
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
    logoAlt: 'Problem solving icon',
    logoSize: 72,           // ✏️ zoom: increase to make this logo bigger, decrease to shrink
    level: 'Advanced',
    desc: 'Algorithms & Data Structures',
  },
  {
    name: 'C',
    // Official C language logo from WorldVectorLogo
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/c-1.svg',
    logoAlt: 'C programming language logo',
    logoSize: 78,           // ✏️ zoom: C logo is compact — slightly larger looks good
    level: 'Advanced',
    desc: 'Systems & Low-level programming',
  },
  {
    name: 'C++',
    // Official C++ logo from WorldVectorLogo
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/c.svg',
    logoAlt: 'C++ programming language logo',
    logoSize: 78,           // ✏️ zoom: same size as C for visual consistency
    level: 'Advanced',
    desc: 'Competitive Programming',
  },
  {
    name: 'MERN Stack',
    // MongoDB + Express + React + Node composite — using the React logo as the
    // representative icon since React is the most visually recognisable part of MERN
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    logoAlt: 'MERN stack (React) logo',
    logoSize: 80,           // ✏️ zoom: React logo is circular — 80px fills nicely
    level: 'Intermediate',
    desc: 'MongoDB · Express · React · Node',
  },
  {
    name: 'MySQL',
    // Official MySQL logo from WorldVectorLogo
    logoUrl: 'https://altnix.com/_next/static/media/mySQL.d519545a.png',
    logoAlt: 'MySQL logo',
    logoSize: 100,           // ✏️ zoom: MySQL logo is wide — larger size fills the panel well
    level: 'Intermediate',
    desc: 'Relational Databases & Queries',
  },
  {
    name: 'Java',
    // Official Java logo from WorldVectorLogo
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/java-4.svg',
    logoAlt: 'Java programming language logo',
    logoSize: 75,           // ✏️ zoom: Java logo is taller — slightly smaller prevents overflow
    level: 'Intermediate',
    desc: 'OOP & Application dev',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// LEVEL_STYLE
// Maps a proficiency level string to badge colours.
//   Advanced     → green
//   Proficient   → blue
//   Intermediate → amber
// ─────────────────────────────────────────────────────────────────────────────
const LEVEL_STYLE = {
  Advanced:     { color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.35)' },
  Proficient:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)' },
  Intermediate: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)' },
}

// ─────────────────────────────────────────────────────────────────────────────
// SkillCard
// Renders one skill as a tall vertical panel.
//
// Layout (top → bottom):
//   ┌──────────────────────┐
//   │   logo image area    │  ← fixed 120px tall container, logo centred inside
//   │   (120px tall box)   │
//   ├──────────────────────┤
//   │   skill name         │
//   │   description        │
//   ├──────────────────────┤
//   │   [badge]            │
//   └──────────────────────┘
//
// Props:
//   skill — one object from SKILLS (all fields used)
//   delay — fadeUp stagger offset in seconds
// ─────────────────────────────────────────────────────────────────────────────
function SkillCard({ skill, delay }) {
  const ls = LEVEL_STYLE[skill.level] // badge colour lookup

  return (
    <motion.div
      {...fadeUp(delay)}
      // whileHover: lifts the card 6px and very subtly scales up —
      // more pronounced than the old 4px/1.02 to suit the taller panel format
      whileHover={{ y: -6, scale: 1.03 }}
      className="card flex flex-col cursor-default overflow-hidden"
      style={{ minHeight: 260 }} /* tall enough for the logo + text + badge to breathe */
    >

      {/* ── Logo area ────────────────────────────────────────────────────────
          Fixed-height container so all cards align their text at the same Y.
          The faint orange tint echoes the site's accent colour.
          Logo image is centred inside — its rendered size is controlled by
          skill.logoSize so each logo can be zoomed independently. */}
      <div
        className="flex items-center justify-center w-full"
        style={{
          height: 130,                          /* fixed height — all logo areas same height */
          background: 'rgba(212,98,42,0.06)',   /* very faint orange tint — accent echo */
          borderBottom: '1px solid rgba(128,128,128,0.1)',
        }}
      >
        <img
          src={skill.logoUrl}
          alt={skill.logoAlt}
          // ✏️ skill.logoSize drives the rendered dimensions of THIS skill's logo.
          // Change logoSize in the SKILLS array above to zoom it in or out.
          width={skill.logoSize}
          height={skill.logoSize}
          className="object-contain"
          style={{ width: skill.logoSize, height: skill.logoSize }}
          onError={(e) => { e.currentTarget.style.display = 'none' }} /* hide gracefully if URL breaks */
        />
      </div>

      {/* ── Text + badge area ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Skill name — prominent, uses site's --ink CSS variable */}
        <div>
          <p className="font-bold text-lg leading-tight" style={{ color: 'var(--ink)' }}>
            {skill.name}
          </p>

          {/* One-line description — muted, smaller */}
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {skill.desc}
          </p>
        </div>

        {/* Proficiency badge — pinned to bottom via mt-auto */}
        <span
          className="font-mono text-xs rounded-lg px-2.5 py-1 self-start mt-auto"
          style={{
            color:      ls.color,
            background: ls.bg,
            border:     `1px solid ${ls.border}`,
          }}
        >
          {skill.level}
        </span>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Skills  |  Default export
// ─────────────────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    // id="skills" required for IntersectionObserver active-section tracking in App.jsx
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)}>
          {/* 40px orange accent bar — defined in index.css */}
          <div className="accent-line" />

          {/* Small mono uppercase sub-label */}
          <p className="section-subtitle">What I know</p>

          {/* Large bold section heading */}
          <h2 className="section-title">Skills</h2>

          {/* Tagline */}
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            The tools and languages I use to build, compete, and create.
          </p>
        </motion.div>

        {/* ── Skill cards grid ─────────────────────────────────────────────
            2 columns on mobile, 3 on md, 6 on lg so all cards sit in one row
            on large screens (bento strip feel).
            Stagger: each card delays by 0.07s → smooth cascade on entrance. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 0.07} />
          ))}
        </div>

      </div>
    </section>
  )
}