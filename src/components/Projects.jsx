// ─────────────────────────────────────────────────────────────────────────────
// Projects.jsx  |  PERSONAL / ACADEMIC PROJECTS SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Renders a 2-column grid of project cards. Each card shows:
//   • Large emoji icon + project title (title changes colour on hover)
//   • Optional "Featured" pill badge in the top-right corner
//   • Short project description paragraph
//   • Technology tag pills (language / framework / library used)
//   • "View on GitHub" button that opens the repo in a new tab
//
// To add a new project: append an object to the PROJECTS array below.
// The grid renders it automatically — no JSX changes needed.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'    // GitHub logo icon from Lucide
import { fadeUp } from '../utils/animations'

// ── Project data ───────────────────────────────────────────────────────────────
// Source of truth for everything displayed on this section.
// Fields:
//   title    — project name (also used as React list key)
//   emoji    — large visual icon at the top of the card
//   description — 1-2 sentence summary of what the project is / does
//   tech     — array of technology label strings (rendered as tag pills)
//   github   — full GitHub URL opened when the button is clicked
//   featured — boolean; if true, a "Featured" badge appears top-right
const PROJECTS = [
  {
    title: 'Chess Game',
    emoji: '♟️',
    description:
      'A fully functional chess game built from scratch with move validation, turn management, check/checkmate detection, and a clean interactive UI.',
    tech: ['C++', 'OOP', 'Data Structures'],
    github: 'https://github.com/itz-tanvir',
    featured: true, // marks this as the highlighted/primary project
  },
  {
    title: 'Sell It',
    emoji: '🛒',
    description:
      'A product listing platform where users can post, browse, and manage product listings. Includes user auth, image uploads, and a MySQL‑powered backend.',
    tech: ['Java', 'MySQL', 'OOP', 'JDBC'],
    github: 'https://github.com/ARSalman23/Sell-It-Marketplace',
    featured: false, // no badge for this one
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard
// Renders one project from the PROJECTS array.
//
// Props:
//   project — one object from PROJECTS
//   delay   — fadeUp stagger delay so cards animate in one after another
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, delay }) {
  return (
    // flex flex-col + gap-6 stacks all card sections vertically with consistent spacing
    <motion.div {...fadeUp(delay)} className="card p-8 flex flex-col gap-6 group">

      {/* ── Top row: icon + title + optional badge ─────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          {/* Large emoji — quick visual cue for the project type before reading the title */}
          <span className="text-4xl mb-3 block">{project.emoji}</span>

          {/* Title changes to accent orange on hover — interactive without needing a button */}
          <h3
            className="text-2xl font-bold transition-colors duration-200"
            style={{ color: 'var(--ink)' }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'} // orange on hover
            onMouseLeave={e => e.target.style.color = 'var(--ink)'}    // restore on leave
          >
            {project.title}
          </h3>
        </div>

        {/* "Featured" badge — only rendered when project.featured is true */}
        {/* Uses a conditional render (not CSS display:none) so no empty space is reserved */}
        {project.featured && (
          <span
            className="font-mono text-xs rounded-full px-3 py-1 h-fit border"
            style={{
              color:       'var(--accent)',             // orange text
              borderColor: 'rgba(212,98,42,0.35)',      // semi-transparent orange border
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* ── Description ───────────────────────────────────────────────────── */}
      {/* flex-1 pushes the tech tags and button to the bottom of the card
          keeping multi-card rows aligned even when descriptions differ in length */}
      <p className="leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
        {project.description}
      </p>

      {/* ── Technology tag pills ──────────────────────────────────────────── */}
      {/* flex-wrap allows tags to wrap onto a second line if there are many */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-xs rounded-lg px-3 py-1"
            style={{
              background: 'rgba(128,128,128,0.1)',          // very faint grey wash
              color:      'var(--ink)',
              border:     '1px solid rgba(128,128,128,0.2)', // subtle border to define each pill
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── GitHub link button ────────────────────────────────────────────── */}
      {/* self-start keeps the button left-aligned rather than stretching full width */}
      {/* Inverts colours on hover: transparent outline → solid filled background */}
      <a
        href={project.github}
        target="_blank"            // open repo in a new tab
        rel="noopener noreferrer"  // security: prevents new tab from accessing window.opener
        className="inline-flex items-center gap-2 self-start font-semibold text-sm border-2 rounded-xl px-5 py-2.5 transition-all duration-200"
        style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--ink)'   // fill with dark background on hover
          e.currentTarget.style.color      = 'var(--cream)' // switch text to light cream colour
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'  // clear fill on leave
          e.currentTarget.style.color      = 'var(--ink)'   // restore dark text
        }}
      >
        <Github size={16} /> {/* GitHub octocat logo icon from Lucide */}
        View on GitHub
      </a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects  |  Default export
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    // id="projects" required for IntersectionObserver active-section tracking
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)}>
          <div className="accent-line" />
          <p className="section-subtitle">What I've built</p>
          <h2 className="section-title">Projects</h2>
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            A selection of projects that reflect my passion for clean architecture and thoughtful problem-solving.
          </p>
        </motion.div>

        {/* 2-column grid on md+; stacks to single column on mobile
            Cards stagger by 0.1s each (i * 0.1) for a cascading entrance */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
