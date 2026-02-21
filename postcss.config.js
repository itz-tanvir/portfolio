// ─────────────────────────────────────────────────────────────────────────────
// postcss.config.js  |  POSTCSS PIPELINE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
// PostCSS is a CSS post-processor that Vite automatically runs on every CSS file
// during both development and production builds.
//
// The two plugins listed here run in ORDER (top → bottom):
//
//   1. tailwindcss
//      Reads tailwind.config.js, scans source files for used class names,
//      and replaces the three @tailwind directives in index.css with real CSS.
//      Without this plugin, the @tailwind base/components/utilities lines
//      in index.css would be left as invalid unrecognised at-rules.
//
//   2. autoprefixer
//      Reads the generated CSS and automatically inserts vendor-prefixed
//      properties for cross-browser compatibility. For example:
//        display: flex  →  also adds  display: -webkit-flex  (old Safari)
//        user-select: none  →  also adds  -webkit-user-select: none
//      This means we never need to write vendor prefixes manually in CSS.
//      autoprefixer uses the browserslist config (or defaults) to decide
//      which browsers to target and which prefixes are still needed.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  plugins: {
    tailwindcss:  {}, // generate utility classes from tailwind.config.js — run FIRST so autoprefixer can see the output
    autoprefixer: {}, // add vendor prefixes to all resulting CSS — run AFTER Tailwind generates its classes
  },
}
