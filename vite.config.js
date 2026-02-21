// // ─────────────────────────────────────────────────────────────────────────────
// // vite.config.js  |  VITE BUILD TOOL CONFIGURATION
// // ─────────────────────────────────────────────────────────────────────────────
// // Vite serves two purposes:
// //   DEV  — instant dev server with Hot Module Replacement (HMR):
// //          any saved file change reflects in the browser in milliseconds
// //          without a full page reload or losing component state
// //   PROD — bundles, tree-shakes, and minifies everything in /src into
// //          optimised static assets in the /dist output folder
// //
// // defineConfig: wraps the config object to provide TypeScript type hints
// //               and IDE autocompletion — has no runtime effect
// // ─────────────────────────────────────────────────────────────────────────────

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' // Official Vite plugin for React; does two things:
//                                           //   1. Transforms JSX → JS using Babel (so browsers can run it)
//                                           //   2. Injects React Fast Refresh client code for HMR —
//                                           //      component state is preserved across hot reloads


// export default defineConfig({
//   plugins: [
//     react(), // must be listed first — processes JSX before any other plugins run
//   ],

//   server: {
//     // historyApiFallback: when the dev server receives a request for an unknown path
//     // (e.g. GET /blog when the user refreshes the blog tab or pastes the URL directly),
//     // it serves index.html instead of returning a 404.
//     // React Router then reads window.location.pathname and renders the correct <Route>.
//     // Without this, navigating directly to /blog would return "Cannot GET /blog".
//     historyApiFallback: true,
//   },
// })

// ─────────────────────────────────────────────────────────────────────────────
// vite.config.js  |  VITE BUILD TOOL CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
// Vite serves two purposes:
//   DEV  — instant dev server with Hot Module Replacement (HMR):
//          any saved file change reflects in the browser in milliseconds
//          without a full page reload or losing component state
//   PROD — bundles, tree-shakes, and minifies everything in /src into
//          optimised static assets in the /dist output folder
//
// defineConfig: wraps the config object to provide TypeScript type hints
//               and IDE autocompletion — has no runtime effect
// ─────────────────────────────────────────────────────────────────────────────

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Official Vite plugin for React; does two things:
                                          //   1. Transforms JSX → JS using Babel (so browsers can run it)
                                          //   2. Injects React Fast Refresh client code for HMR —
                                          //      component state is preserved across hot reloads

export default defineConfig({
  base: '/portfolio/', // ← ADD THIS LINE — tells Vite the site lives at /portfolio/ on GitHub Pages

  plugins: [
    react(), // must be listed first — processes JSX before any other plugins run
  ],

  server: {
    // historyApiFallback: when the dev server receives a request for an unknown path
    // (e.g. GET /blog when the user refreshes the blog tab or pastes the URL directly),
    // it serves index.html instead of returning a 404.
    // React Router then reads window.location.pathname and renders the correct <Route>.
    // Without this, navigating directly to /blog would return "Cannot GET /blog".
    historyApiFallback: true,
  },
})
