// ─────────────────────────────────────────────────────────────────────────────
// animations.js  |  SHARED FRAMER MOTION ANIMATION PRESETS
// ─────────────────────────────────────────────────────────────────────────────
// Centralises repeated animation config so every component uses the same
// timing and easing. Import and spread into any Framer Motion element:
//
//   import { fadeUp } from '../utils/animations'
//   <motion.div {...fadeUp(0.2)}>content</motion.div>
//
// Framer Motion prop glossary:
//   initial     — the element's state BEFORE the animation starts (hidden / offset)
//   whileInView — the element's TARGET state once it enters the viewport
//   viewport    — options for the IntersectionObserver Framer Motion uses internally
//   transition  — easing curve, duration, and optional delay for the tween
// ─────────────────────────────────────────────────────────────────────────────

/**
 * fadeUp
 * Slides an element upward 30px while fading from opacity 0 → 1.
 * Used on virtually every card and heading across the portfolio for a
 * cohesive, staggered "content loading in" feel as the user scrolls.
 *
 * @param {number} delay - Seconds to wait before the animation begins.
 *   Pass increasing values (0.1, 0.2, 0.3 …) to cards inside a grid
 *   so they animate in one after another instead of all at once.
 *
 * @returns {object} Ready-to-spread Framer Motion prop object.
 *
 * Example stagger pattern used in Skills.jsx:
 *   SKILLS.map((skill, i) => <SkillCard {...fadeUp(i * 0.07)} />)
 *   → each card starts 70ms after the previous one
 */
export const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },          // start: invisible, shifted 30px below final position
  whileInView: { opacity: 1, y: 0 },           // end: fully visible, back at its natural position
  viewport:    { once: true },                  // once:true → animate only the FIRST time it enters view; scrolling back up does NOT re-trigger
  transition:  { duration: 0.6, delay, ease: 'easeOut' }, // 600ms ease-out feels snappy but not rushed; delay staggers siblings
})
