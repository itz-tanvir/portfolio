// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  |  ROOT COMPONENT — ROUTING + PORTFOLIO LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
// Two URL routes are handled here:
//   "/"      → renders the full single-page Portfolio (Navbar + all sections + Footer)
//   "/blog"  → renders the Blog page (photo gallery + coming-soon message)
//
// The Portfolio sub-component also owns two pieces of global state:
//   activeSection — which section id is currently visible in the viewport
//   darkMode      — whether the dark CSS theme is active
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'   // useEffect: run side effects after render; useState: hold reactive values
import { Routes, Route } from 'react-router-dom' // Routes: container that matches current URL; Route: maps a path to a component

// ── Section component imports ─────────────────────────────────────────────────
import Navbar     from './components/Navbar'     // Fixed top nav bar with scroll tracking and dark-mode toggle
import About      from './components/About'      // Hero section: name, tagline, photo, education, awards
import CPLife     from './components/CPLife'     // Competitive programming: platform ratings and contest badges
import Projects   from './components/Projects'   // Project cards: Chess Game, Sell It marketplace
import Skills     from './components/Skills'     // Skill cards: C, C++, Java, MySQL, OOP, Problem Solving
import Experience from './components/Experience' // Work history: currently shows animated skeleton placeholder
import Resume     from './components/Resume'     // Resume card with "Open PDF" button
import Connect    from './components/Connect'    // Social links (GitHub, LinkedIn, etc.) and email CTA
import Footer     from './components/Footer'     // Copyright bar with tech-stack credits
import Blog       from './pages/Blog'            // Blog page: coming-soon header + hobby photo gallery

// ── Section IDs ────────────────────────────────────────────────────────────────
// These strings MUST exactly match the `id` attribute on each <section> element.
// Used by IntersectionObserver to detect which section is on screen,
// and by scrollTo() to find the correct DOM node when a nav link is clicked.
const SECTIONS = ['about', 'cp-life', 'projects', 'skills', 'experience', 'resume', 'connect']

// ─────────────────────────────────────────────────────────────────────────────
// Portfolio  |  The main single-page layout (rendered at route "/")
// ─────────────────────────────────────────────────────────────────────────────
function Portfolio() {
  // activeSection: id string of whichever section is currently ≥35% visible
  // Default to 'about' so the first nav link is highlighted on page load
  const [activeSection, setActiveSection] = useState('about')

  // darkMode: boolean — true means html.dark class is active, CSS vars flip to dark palette
  // ✏️ Changed default from `false` (light) → `true` (dark) so the site opens in dark mode.
  // Users can still toggle to light mode via the Navbar sun/moon button as before.
  const [darkMode, setDarkMode] = useState(true)

  // ── Dark mode effect ──────────────────────────────────────────────────────
  // Runs every time darkMode changes.
  // classList.toggle(className, force): adds class when force=true, removes when false.
  // All colour changes are handled purely by CSS variables under html.dark in index.css —
  // no component re-renders are needed beyond this single DOM mutation.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode) // flip CSS theme on <html>
  }, [darkMode]) // dependency: re-run only when darkMode value changes

  // ── IntersectionObserver: active section tracking ──────────────────────────
  // Creates one observer per section. When a section crosses the 35% visibility
  // threshold it fires the callback, updating activeSection with that section's id.
  // Navbar reads activeSection to underline the matching nav link.
  useEffect(() => {
    const observers = [] // collect all observers so cleanup can disconnect them all at once

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id) // find the <section id="..."> in the DOM
      if (!el) return                         // skip gracefully if element doesn't exist yet

      const obs = new IntersectionObserver(
        ([entry]) => {
          // entry.isIntersecting is true when the element is inside the viewport
          // entry.intersectionRatio is the fraction of the element currently visible
          if (entry.isIntersecting) setActiveSection(id) // update highlighted nav link
        },
        { threshold: 0.35 } // fire when 35% of the section's height is visible — prevents rapid flickering between adjacent sections
      )

      obs.observe(el)       // start watching this section element
      observers.push(obs)   // save reference for cleanup
    })

    // Cleanup function: runs when Portfolio unmounts (or before effect re-runs)
    // Disconnects all observers to prevent memory leaks and phantom state updates
    return () => observers.forEach((o) => o.disconnect())
  }, []) // empty array: run once after initial render — sections don't change

  return (
    <div className="min-h-screen"> {/* ensure page fills at least full viewport height even on short content */}

      {/* Sticky top navigation bar
          activeSection → which link gets the accent underline
          darkMode + setDarkMode → controls the sun/moon toggle button  */}
      <Navbar
        activeSection={activeSection}
        sections={SECTIONS}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* All page sections stacked vertically.
          Each must have the matching id="..." attribute for IntersectionObserver to find it. */}
      <main>
        <About />       {/* id="about"      — hero + education + awards */}
        <CPLife />      {/* id="cp-life"    — Codeforces & CodeChef ratings + contest badges */}
        <Projects />    {/* id="projects"   — Chess Game, Sell It marketplace cards */}
        <Skills />      {/* id="skills"     — language & tool proficiency cards */}
        <Experience />  {/* id="experience" — skeleton placeholder, no real entries yet */}
        <Resume />      {/* id="resume"     — PDF download card */}
        <Connect />     {/* id="connect"    — social icons + direct email button */}
      </main>

      <Footer /> {/* outside <main> — purely decorative, not a navigable section */}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App  |  Default export — top-level route switch
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    // <Routes> inspects window.location.pathname and renders the first matching <Route>
    <Routes>
      <Route path="/"     element={<Portfolio />} /> {/* "/" → full portfolio single-page layout */}
      <Route path="/blog" element={<Blog />}      /> {/* "/blog" → blog page (opens in new tab from Navbar) */}
    </Routes>
  )
}