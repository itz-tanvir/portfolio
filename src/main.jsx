// ─────────────────────────────────────────────────────────────────────────────
// main.jsx  |  APPLICATION BOOTSTRAP
// ─────────────────────────────────────────────────────────────────────────────
// This is the first JS file executed by the browser.
// Its only job: grab the #root <div> from index.html and mount the React tree.
// Everything else (routing, state, UI) lives in App.jsx and its children.
// ─────────────────────────────────────────────────────────────────────────────

import { StrictMode } from 'react'           // StrictMode: warns about deprecated APIs & side-effect bugs IN DEV ONLY — zero impact on production bundle
import { createRoot } from 'react-dom/client' // React 18 concurrent root API — replaces legacy ReactDOM.render()
import { BrowserRouter } from 'react-router-dom' // Provides history-based URL routing; must wrap the entire app so <Routes> and hooks (useNavigate etc.) work anywhere in the tree
import './index.css'                          // Load Tailwind base/components/utilities + custom CSS variables (:root color tokens, .card, .section-padding etc.)
import App from './App.jsx'                  // Root component — renders either Portfolio layout or Blog page depending on the current URL path

// document.getElementById('root') targets <div id="root"> in index.html
// createRoot() sets up React 18's concurrent renderer on that DOM node
createRoot(document.getElementById('root')).render(
  // StrictMode double-invokes render functions in dev to surface impure renders
  // It does NOT render anything visible itself — purely a development diagnostic wrapper
  <StrictMode>
    {/* BrowserRouter must be the outermost wrapper so every component below
        can access routing context (current path, navigation functions, etc.)   */}
    <BrowserRouter>
      <App /> {/* Single entry point; App decides which page to render via <Routes> */}
    </BrowserRouter>
  </StrictMode>,
)
