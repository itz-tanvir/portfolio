// ─────────────────────────────────────────────────────────────────────────────
// Projects.jsx  |  PROJECTS SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Renders project cards in two tiers:
//   • Visible by default  — Chess Game, Thesis (AI Cardiology)
//   • Hidden behind "Show More" — Sell It (MERN marketplace)
//
// ── HOW TO ADD YOUR GITHUB LINKS ─────────────────────────────────────────────
//   Each project object has a `repoUrl` field.
//   Replace the placeholder string with your actual GitHub repo URL:
//
//     repoUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO',
//
//   The "View on GitHub" button will appear automatically once a real URL is set.
//
// Sub-components:
//   ProjectCard — renders one project from the data arrays
//   TagBadge    — small coloured pill for a tech tag
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../utils/animations'

// ─────────────────────────────────────────────────────────────────────────────
// GitHub SVG icon — inline so no extra dependency is needed.
// Rendered at 14×14px inside the button.
// ─────────────────────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
               0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756
               -1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236
               1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466
               -1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
               0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405
               2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23
               1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
               0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295
               24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS_VISIBLE
// Always shown when the section loads.
//
// ✏️ repoUrl — paste your GitHub repo link here for each project
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS_VISIBLE = [
  {
    id: 'chess',
    title: 'Chess Game',
    subtitle: 'Java · Object-Oriented Programming',
    description:
      'A fully playable two-player chess game built in Java. The entire piece hierarchy — King, Queen, Rook, Bishop, Knight, Pawn — is modelled through OOP principles: abstract base classes, inheritance, and polymorphism. Includes move validation, turn management, and check detection.',
    tags: ['Java', 'OOP', 'Swing', 'Game Dev'],
    // ✏️ REPLACE with your actual GitHub repo URL for Chess:
    repoUrl: 'https://github.com/itz-tanvir/chess-game',
    accentColor: '#D4622A',
  },
  {
    id: 'thesis',
    title: 'AI-Powered Cardiology',
    subtitle: 'Machine Learning · Heart Disease Detection',
    description:
      'Thesis research exploring early heart disease detection using the UCI Heart Disease dataset (1,025 patients, 13 clinical attributes). Four ML models were trained — Logistic Regression, Random Forest, KNN, and SVM. Random Forest and SVM jointly achieved 92.68% accuracy; Random Forest led with 97.14% recall, maximising positive-case identification.',
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'SVM', 'KNN', 'Healthcare AI'],
    // ✏️ REPLACE with your actual GitHub repo URL for the Thesis:
    repoUrl: 'https://github.com/itz-tanvir/AI-Powered-Cardiology-A-Predictive-Framework-for-Early-Detection-of-Heart-Disease',
    accentColor: '#3b82f6',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS_HIDDEN
// Revealed only after the user clicks "Show More".
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS_HIDDEN = [
  {
    id: 'sell-it',
    title: 'Sell It',
    subtitle: 'MERN Stack · Marketplace',
    description:
      'A full-stack e-commerce marketplace built on the MERN stack. Users can list items for sale, browse listings, and manage their own store. Features JWT authentication, image uploads, RESTful API endpoints with Express, and a React frontend backed by a MongoDB database.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'REST API'],
    // ✏️ REPLACE with your actual GitHub repo URL for Sell It:
    repoUrl: 'https://github.com/ARSalman23/Sell-It-Marketplace',
    accentColor: '#4ade80',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TagBadge
// Small rounded pill for a single technology tag.
// ─────────────────────────────────────────────────────────────────────────────
function TagBadge({ label }) {
  return (
    <span
      className="font-mono text-xs rounded-lg px-2.5 py-1"
      style={{
        color:      'var(--muted)',
        background: 'rgba(128,128,128,0.1)',
        border:     '1px solid rgba(128,128,128,0.2)',
      }}
    >
      {label}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard
// Renders one project as a vertical card.
//
// Props:
//   project — one object from PROJECTS_VISIBLE or PROJECTS_HIDDEN
//   delay   — fadeUp stagger offset in seconds
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -5, scale: 1.01 }}
      className="card flex flex-col cursor-default overflow-hidden"
      style={{ borderTop: `3px solid ${project.accentColor}` }}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="p-6 pb-0">
        <p className="font-bold text-xl leading-tight" style={{ color: 'var(--ink)' }}>
          {project.title}
        </p>
        <p className="font-mono text-xs mt-1 tracking-wide" style={{ color: project.accentColor }}>
          {project.subtitle}
        </p>
      </div>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="mx-6 my-4 h-px" style={{ background: 'rgba(128,128,128,0.15)' }} />

      {/* ── Description ───────────────────────────────────────────────────── */}
      <div className="px-6 flex-1">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {project.description}
        </p>
      </div>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="mx-6 my-4 h-px" style={{ background: 'rgba(128,128,128,0.15)' }} />

      {/* ── Footer: tags + GitHub button ──────────────────────────────────── */}
      <div className="px-6 pb-6 flex flex-wrap items-center gap-2">

        {/* Technology tags */}
        {project.tags.map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}

        {/* ── "View on GitHub" button ─────────────────────────────────────
            Always visible on every card.
            When repoUrl still contains "YOUR_USERNAME" it opens GitHub.com
            as a safe fallback — replace with the real URL to deep-link
            directly to the repo.
            ml-auto pushes it to the far right of the footer row. */}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg
                     transition-all duration-200 hover:scale-105"
          style={{
            color:      'var(--ink)',
            background: 'rgba(128,128,128,0.08)',
            border:     '1px solid rgba(128,128,128,0.25)',
          }}
          // Prevent the card's cursor-default from blocking the link cursor
          onClick={(e) => e.stopPropagation()}
        >
          <GitHubIcon />
          View on GitHub
        </a>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects  |  Default export
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  // showMore: false = only PROJECTS_VISIBLE shown; true = PROJECTS_HIDDEN also rendered
  const [showMore, setShowMore] = useState(false)

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)}>
          <div className="accent-line" />
          <p className="section-subtitle">What I've built</p>
          <h2 className="section-title">Projects</h2>
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            A selection of things I've built, researched, and shipped.
          </p>
        </motion.div>

        {/* ── Always-visible cards ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS_VISIBLE.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>

        {/* ── Show More / Show Less button ─────────────────────────────────── */}
        {PROJECTS_HIDDEN.length > 0 && (
          <motion.div {...fadeUp(0.2)} className="flex justify-center mt-8">
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="font-mono text-sm px-6 py-2.5 rounded-xl transition-all duration-200"
              style={{
                color:      'var(--ink)',
                border:     '1px solid rgba(212,98,42,0.5)',
                background: showMore ? 'rgba(212,98,42,0.1)' : 'transparent',
              }}
            >
              {showMore ? '↑ Show Less' : '↓ Show More'}
            </button>
          </motion.div>
        )}

        {/* ── Hidden cards — animated in/out with AnimatePresence ──────────── */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid md:grid-cols-2 gap-6 mt-6"
            >
              {PROJECTS_HIDDEN.map((project, i) => (
                <ProjectCard key={project.id} project={project} delay={i * 0.1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}