// ─────────────────────────────────────────────────────────────────────────────
// tailwind.config.js  |  TAILWIND CSS CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
// Tailwind reads this file to know:
//   1. WHERE to look for class names (content array) — for tree-shaking unused CSS
//   2. WHAT custom tokens to add (theme.extend) — fonts and colour palette
//
// Tree-shaking: Tailwind scans every file listed in `content` and generates CSS
// ONLY for the class names it actually finds. This keeps the production bundle
// small even though Tailwind's full library has thousands of classes.
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import('tailwindcss').Config} — enables IDE autocomplete and type checking */
export default {
  // Files to scan for Tailwind class names — any class used here will be kept in the output CSS
  // '**/*.{js,jsx}' is a glob that matches every JS and JSX file inside /src recursively
  content: [
    './index.html',          // root HTML file — contains the #root mount point
    './src/**/*.{js,jsx}',   // every component, page, and utility file in the src directory
  ],

  theme: {
    extend: {
      // ── Custom font families ───────────────────────────────────────────────
      // These map Tailwind's font-sans and font-mono utilities to the Google Fonts
      // loaded via <link> in index.html. Without registering them here, Tailwind
      // would use its own default system font stacks instead.
      fontFamily: {
        sans: ['Syne', 'sans-serif'],              // font-sans → Syne (used for all body text and headings)
        mono: ['JetBrains Mono', 'monospace'],     // font-mono → JetBrains Mono (used for labels, code, tags)
        kiwi: ['Kiwi Maru', 'serif'],              // font-kiwi → Kiwi Maru (used for decorative headings)
      },

      // ── Custom colour palette ──────────────────────────────────────────────
      // Mirrors the CSS variables in index.css (:root).
      // Registering them here allows Tailwind classes like text-accent, bg-card,
      // text-muted etc. in addition to the inline var(--accent) style approach.
      // Both approaches are used in this codebase — Tailwind classes for layout,
      // inline styles for dynamic values that change with dark mode.
      colors: {
        cream:  '#F5F0E8', // warm off-white — light mode page background
        ink:    '#1A1A1A', // near-black   — primary text and icons
        accent: '#D4622A', // orange       — CTAs, active states, badges
        muted:  '#8C8C8C', // medium grey  — secondary / subdued text
        card:   '#FDFAF5', // warm white   — card surfaces, slightly lighter than cream
      },
    },
  },

  // plugins: [] — no Tailwind plugins needed for this project
  // (plugins add extra utility classes, e.g. typography, forms, aspect-ratio)
  plugins: [],
}
