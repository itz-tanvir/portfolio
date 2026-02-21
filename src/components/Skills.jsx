// ─────────────────────────────────────────────────────────────────────────────
// Skills.jsx  |  TECHNICAL SKILLS SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Renders a responsive grid of skill cards. Each card shows:
//   • A large emoji icon (quick visual association for the technology)
//   • Skill name + one-line description of how it's applied
//   • A colour-coded proficiency badge (Advanced = green, Intermediate = amber)
//
// Cards float up 4px and scale up 2% on hover via Framer Motion whileHover.
// To add a skill: append an object to SKILLS. Grid renders it automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

// ── Skills data ────────────────────────────────────────────────────────────────
// Each object contains everything needed to render one SkillCard.
// `level` must match a key in LEVEL_STYLE below for badge colours to work.
const SKILLS = [
  { name: 'Problem Solving', emoji: '🧠', level: 'Advanced',     desc: 'Algorithms & Data Structures' },
  { name: 'C',               emoji: '⚙️', level: 'Advanced',     desc: 'Systems & Low‑level programming' },
  { name: 'C++',             emoji: '🚀', level: 'Advanced',     desc: 'Competitive Programming' },
  { name: 'Java',            emoji: '☕', level: 'Intermediate', desc: 'OOP & Application dev' },
  { name: 'OOP',             emoji: '🏗️', level: 'Intermediate', desc: 'Design Patterns & Principles' },
  { name: 'MySQL',           emoji: '🗄️', level: 'Intermediate', desc: 'Relational Databases & Queries' },
]

// ── Proficiency badge colour map ───────────────────────────────────────────────
// Maps a level string to its badge text colour, background tint, and border colour.
// Colours are chosen to be distinct and readable on both light and dark themes:
//   Advanced     → green  (positive/mastered connotation)
//   Proficient   → blue   (solid working knowledge)
//   Intermediate → amber  (actively learning / solid foundation)
const LEVEL_STYLE = {
  Advanced:     { color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.35)' },  // green-400
  Proficient:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)' },  // blue-400
  Intermediate: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)' },  // amber-400
}

// ─────────────────────────────────────────────────────────────────────────────
// SkillCard
// Renders one skill from the SKILLS array.
//
// Props:
//   skill — one object from SKILLS
//   delay — fadeUp stagger offset so cards cascade in instead of all at once
// ─────────────────────────────────────────────────────────────────────────────
function SkillCard({ skill, delay }) {
  const ls = LEVEL_STYLE[skill.level] // look up badge styles for this specific level string

  return (
    // whileHover lifts the card up 4px and scales it to 102%
    // cursor-default prevents the text-cursor from appearing since this is not a clickable element
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -4, scale: 1.02 }} // subtle lift + grow on hover for interactivity feel
      className="card p-6 flex flex-col gap-3 cursor-default"
    >
      {/* Large emoji acts as the skill's logo — faster to scan than text alone */}
      <span className="text-4xl">{skill.emoji}</span>

      <div>
        <p className="font-bold text-lg" style={{ color: 'var(--ink)' }}>{skill.name}</p>   {/* skill name e.g. "C++" */}
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{skill.desc}</p>   {/* one-line context e.g. "Competitive Programming" */}
      </div>

      {/* Proficiency badge — self-start keeps it left-aligned, not full width */}
      {/* All three style values (color, bg, border) come from the LEVEL_STYLE lookup above */}
      <span
        className="font-mono text-xs rounded-lg px-2.5 py-1 self-start"
        style={{
          color:      ls.color,
          background: ls.bg,
          border:     `1px solid ${ls.border}`,
        }}
      >
        {skill.level} {/* "Advanced" / "Proficient" / "Intermediate" */}
      </span>
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

        {/* Section header */}
        <motion.div {...fadeUp(0)}>
          <div className="accent-line" />
          <p className="section-subtitle">What I know</p>
          <h2 className="section-title">Skills</h2>
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            The tools and languages I use to build, compete, and create.
          </p>
        </motion.div>

        {/* 2 columns on mobile, 3 columns on md+ screens
            Stagger: each card's delay increases by 0.07s → smooth cascade effect (6 cards = 0 to 0.35s spread) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  )
}
