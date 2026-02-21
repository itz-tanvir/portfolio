// ─────────────────────────────────────────────────────────────────────────────
// Navbar.jsx  |  FIXED TOP NAVIGATION BAR
// ─────────────────────────────────────────────────────────────────────────────
// Responsibilities:
//   1. Slide down from off-screen on page load (entrance animation)
//   2. Show a frosted-glass background once the user scrolls past 20px
//   3. Highlight the nav link that matches the currently visible section
//   4. Smooth-scroll to a section when a desktop nav link is clicked
//   5. Open the Blog page in a new tab (external: '/blog')
//   6. Toggle dark / light mode with a cross-fading Sun ↔ Moon icon
//   7. Show a hamburger drawer menu on mobile screens
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // motion: animatable HTML/SVG elements; AnimatePresence: handles enter/exit animations for conditionally rendered elements
import { Sun, Moon } from 'lucide-react'                // SVG icon components from Lucide icon library

// ── Nav link definitions ───────────────────────────────────────────────────────
// Each object maps a visible label to the section id it targets.
// `external` is an optional URL string — when present, clicking opens that URL
// in a new browser tab instead of smooth-scrolling to a section.
const NAV_LINKS = [
  { label: 'about',      id: 'about' },                              // scrolls to <section id="about">
  { label: 'programming',         id: 'cp-life' },                           // scrolls to <section id="cp-life">
  { label: 'projects',   id: 'projects' },                          // scrolls to <section id="projects">
  { label: 'skills',     id: 'skills' },                            // scrolls to <section id="skills">
  { label: 'experience', id: 'experience' },                        // scrolls to <section id="experience">
  { label: 'resume',     id: 'resume' },                            // scrolls to <section id="resume">
  { label: 'blog',       id: 'blog', external: '/blog' },           // opens /blog route in a NEW TAB — does NOT scroll
  { label: 'connect',    id: 'connect' },                           // scrolls to <section id="connect">
]

// ─────────────────────────────────────────────────────────────────────────────
// Navbar component
// Props:
//   activeSection — id string of currently visible section (from App.jsx observer)
//   darkMode      — boolean, true when dark theme is active
//   setDarkMode   — state setter to toggle dark/light mode
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar({ activeSection, darkMode, setDarkMode }) {
  // scrolled: becomes true after user scrolls 20px down
  // Used to activate the frosted-glass background on the header
  const [scrolled, setScrolled] = useState(false)

  // menuOpen: controls visibility of the mobile hamburger drawer
  // false = drawer hidden; true = drawer visible
  const [menuOpen, setMenuOpen] = useState(false)

  // ── Scroll detection effect ─────────────────────────────────────────────────
  // Attaches a 'scroll' listener to window on mount, removes it on unmount.
  // Checks window.scrollY every scroll event — if > 20px, activates glass bg.
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20) // update state based on current scroll position
    window.addEventListener('scroll', handler)              // start listening
    return () => window.removeEventListener('scroll', handler) // cleanup: prevent memory leak when component unmounts
  }, []) // empty deps: attach once, never re-attach

  // ── Smooth scroll helper ────────────────────────────────────────────────────
  // Uses the native browser scrollIntoView API with smooth behaviour.
  // Also closes the mobile menu so it doesn't stay open after navigation.
  // The ?. optional chaining handles the rare case where the element isn't in the DOM yet.
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) // glide to target section
    setMenuOpen(false)                                                    // close hamburger drawer after tapping a link
  }

  return (
    // motion.header: slides in from y=-80 (above screen) to y=0 on page load
    // fixed + z-50: sits above all page content at all times
    // transition-all duration-300: background/shadow changes animate smoothly
    <motion.header
      initial={{ y: -80 }}                              // start position: 80px above the top of the screen
      animate={{ y: 0 }}                                // animate to: natural position at top of screen
      transition={{ duration: 0.6, ease: 'easeOut' }}  // 600ms ease-out — feels like it "lands" gently
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        // Frosted glass effect — only visible after scrolling past 20px
        background:      scrolled ? 'rgba(var(--cream-rgb, 245,240,232),0.9)' : 'transparent', // semi-transparent cream background when scrolled
        backdropFilter:  scrolled ? 'blur(12px)' : 'none',   // blurs content behind header for frosted effect
        boxShadow:       scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none', // subtle shadow to separate header from content
        backgroundColor: scrolled ? 'var(--cream)' : 'transparent',          // fallback solid colour for browsers that don't support backdropFilter
        opacity:         scrolled ? 0.97 : 1,                                 // very slight transparency to feel light not heavy
      }}
    >
      {/* Inner nav: max-width container, horizontal flex, 64px tall */}
      <nav className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">

        {/* ── Logo / home button ───────────────────────────────────────────── */}
        {/* Clicking scrolls back to the very top (About section) */}
        <button
          onClick={() => scrollTo('about')}                           // scroll to top of page
          className="font-bold text-lg tracking-tight transition-colors"
          style={{ color: 'var(--ink)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} // orange tint on hover
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ink)'}    // restore default ink colour on leave
        >
          Tanvir<span style={{ color: 'var(--accent)' }}>.</span> {/* accent dot is always orange, draws the eye */}
        </button>

        {/* ── Desktop navigation links ─────────────────────────────────────── */}
        {/* hidden on mobile (xs/sm), visible as flex row on md+ screens */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, id, external }) => (
            <li key={id}>
              <button
                onClick={() => external
                  ? window.open(external, '_blank')  // external links (Blog) open a new browser tab
                  : scrollTo(id)                     // internal links smooth-scroll to the section
                }
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  // Active section link gets accent colour; inactive links get muted grey
                  color: activeSection === id ? 'var(--accent)' : 'var(--muted)'
                }}
                onMouseEnter={e => { if (activeSection !== id) e.currentTarget.style.color = 'var(--ink)' }}   // darken on hover only if NOT currently active
                onMouseLeave={e => { if (activeSection !== id) e.currentTarget.style.color = 'var(--muted)' }} // restore muted colour when mouse leaves
              >
                {label}

                {/* Animated underline indicator
                    layoutId="nav-indicator" is shared across all buttons —
                    Framer Motion MOVES the same element between buttons when activeSection changes,
                    creating a sliding underline effect instead of a jump-cut */}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-indicator"                               // shared key: enables layout animation between buttons
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: 'var(--accent)' }}               // orange underline
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* ── Right side controls ───────────────────────────────────────────── */}
        <div className="flex items-center gap-2">

          {/* Dark / light mode toggle button */}
          <motion.button
            onClick={() => setDarkMode(p => !p)} // flip darkMode boolean in App.jsx
            whileTap={{ scale: 0.9 }}            // squish animation on click — gives physical press feedback
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              border:     '1px solid rgba(128,128,128,0.25)', // subtle grey border to define the button shape
              color:      'var(--ink)',
              background: 'var(--card)',                      // matches card background for consistency
            }}
            aria-label="Toggle dark mode" // screen reader label since button has no text
          >
            {/* AnimatePresence enables exit animation for the outgoing icon.
                mode="wait" ensures the old icon fully exits before the new one enters.
                Without AnimatePresence, React would just swap elements with no transition. */}
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                // In dark mode: show Sun icon (clicking will switch back to light)
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }} // enter from rotated left
                  animate={{ rotate: 0, opacity: 1 }}   // spin to upright, fade in
                  exit={{ rotate: 90, opacity: 0 }}     // exit spinning right, fade out
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={16} />
                </motion.span>
              ) : (
                // In light mode: show Moon icon (clicking will switch to dark)
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}  // enter from rotated right
                  animate={{ rotate: 0, opacity: 1 }}   // spin to upright, fade in
                  exit={{ rotate: -90, opacity: 0 }}    // exit spinning left, fade out
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* ── Hamburger button — mobile only (md:hidden) ─────────────────── */}
          {/* Three <span> bars animate into an ✕ icon when the menu is open */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(p => !p)} // toggle drawer open/closed
            aria-label="Toggle menu"
          >
            {/* Top bar: rotates +45° and shifts down to form top arm of ✕ */}
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--ink)',
                transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none', // 45° + 8px shift aligns it with the bottom bar
              }}
            />
            {/* Middle bar: fades out completely when menu is open */}
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--ink)',
                opacity: menuOpen ? 0 : 1, // invisible but still occupies space (avoids layout shift)
              }}
            />
            {/* Bottom bar: rotates -45° and shifts up to form bottom arm of ✕ */}
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--ink)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown drawer ───────────────────────────────────────────── */}
      {/* AnimatePresence detects when menuOpen becomes false and plays the exit animation
          before unmounting. Without it, the drawer would vanish instantly with no animation. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}   // start slightly above and invisible
            animate={{ opacity: 1, y: 0 }}     // slide down and fade in
            exit={{ opacity: 0, y: -10 }}      // reverse on close
            transition={{ duration: 0.2 }}     // fast 200ms — drawer should feel snappy
            className="md:hidden px-6 pb-4"
            style={{
              background:   'var(--cream)',
              borderBottom: '1px solid rgba(128,128,128,0.15)', // thin separator at bottom of drawer
            }}
          >
            {/* One button per nav link; same external/scroll logic as desktop */}
            {NAV_LINKS.map(({ label, id, external }) => (
              <button
                key={id}
                onClick={() => external ? window.open(external, '_blank') : scrollTo(id)} // same behaviour as desktop links
                className="block w-full text-left py-3 text-sm font-medium transition-colors"
                style={{
                  color:        activeSection === id ? 'var(--accent)' : 'var(--muted)', // highlight active section
                  borderBottom: '1px solid rgba(128,128,128,0.08)',                       // fine separator between each link row
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
