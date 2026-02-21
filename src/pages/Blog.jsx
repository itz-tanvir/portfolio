// ─────────────────────────────────────────────────────────────────────────────
// Blog.jsx  |  BLOG PAGE — NEW TAB
// ─────────────────────────────────────────────────────────────────────────────
// Rendered at route "/blog" (opened in a new tab from the Navbar).
// Contains two distinct sections:
//
//   1. COMING SOON HEADER
//      Large "Coming Soon." heading with three pulsing orange dots acting
//      as a visual status indicator, and a short teaser paragraph.
//
//   2. PHOTO GALLERY ("Life Outside Code")
//      Four hobby categories — Football, Chess, Marathon Running, Hiking —
//      each displayed as a labelled 3-column photo grid.
//      Clicking any thumbnail opens it full-screen in a Lightbox overlay.
//
// Sub-components defined in this file:
//   Lightbox        — full-screen photo overlay with a close button
//   CategorySection — heading + 3-column grid for one hobby category
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react' // useState: manages lightbox open/closed state

// ── Gallery data ───────────────────────────────────────────────────────────────
// Each object represents one hobby category shown in the gallery.
// `images` contains 3 Unsplash placeholder URLs — replace with real photos when ready.
// To add a new category: append a new object here. JSX renders it automatically.
const GALLERY_CATEGORIES = [
  {
    id: 'football',        // unique React key
    label: 'Football',     // displayed as the section heading
    emoji: '⚽',           // shown next to the heading
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80', // match action aerial view
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80', // stadium at night
      'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=600&q=80', // player on pitch
    ],
  },
  {
    id: 'chess',
    label: 'Chess',
    emoji: '♟️',
    images: [
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80', // pieces on board close-up
      'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&q=80', // game in progress top-down
      'https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=600&q=80', // single king piece dramatic
    ],
  },
  {
    id: 'marathon',
    label: 'Marathon Running',
    emoji: '🏃',
    images: [
      'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=600&q=80', // runner on road at sunrise
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80', // race start crowd
      'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=600&q=80', // marathon finish line
    ],
  },
  {
    id: 'hiking',
    label: 'Hiking',
    emoji: '🧗',
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', // hiker on mountain ridge
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=600&q=80', // trail through forest
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', // summit view panorama
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Lightbox
// Full-screen overlay that displays one enlarged photo.
// Rendered by Blog when the user clicks a thumbnail.
//
// Props:
//   src     — URL of the photo to display full-size
//   alt     — accessible alt text for the enlarged image
//   onClose — callback function invoked to dismiss the lightbox
//
// Dismissal can be triggered by:
//   (a) clicking the dark backdrop (anywhere outside the image)
//   (b) clicking the × close button in the corner of the image
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
  return (
    // Full-screen fixed backdrop — covers the entire viewport above all other content
    // cursor-zoom-out: signals to the user that clicking will close / zoom out
    <div
      onClick={onClose} // clicking the backdrop (outside image) dismisses the lightbox
      style={{
        position:        'fixed',               // fixed to viewport — doesn't scroll with page
        inset:           0,                     // shorthand for top/right/bottom/left: 0 — fills entire screen
        background:      'rgba(0,0,0,0.88)',    // 88% black overlay — dark enough to focus attention on image
        zIndex:          1000,                  // sits above all page content (Navbar is z-50 = 50)
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '2rem',                // breathing room so image doesn't touch screen edges
        cursor:          'zoom-out',
      }}
    >
      {/* Image wrapper — click on the image itself should NOT close the lightbox
          e.stopPropagation() prevents the click from bubbling up to the backdrop onClick */}
      <div
        onClick={e => e.stopPropagation()} // stop click on image from reaching the backdrop dismissal handler
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }}
      >
        {/* The enlarged image — constrained to 90% viewport width and 85% viewport height
            object-fit is not needed here because the img itself is not fixed size */}
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth:   '90vw',
            maxHeight:  '85vh',
            borderRadius: '12px',
            boxShadow:  '0 20px 60px rgba(0,0,0,0.8)', // deep shadow anchors the image in space
            display:    'block',                        // removes inline baseline gap below img
          }}
        />

        {/* × close button — positioned just outside the top-right corner of the image */}
        {/* top/right: -14px offsets it 14px outside the image bounds */}
        <button
          onClick={onClose} // clicking × dismisses the lightbox
          style={{
            position:        'absolute',
            top:             '-14px',
            right:           '-14px',
            background:      '#E8774A',    // accent orange — visually consistent with the portfolio brand
            color:           '#fff',
            border:          'none',
            borderRadius:    '50%',        // circular button
            width:           '32px',
            height:          '32px',
            fontSize:        '1rem',
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontWeight:      700,
          }}
        >
          × {/* × character — universally recognised "close" symbol */}
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CategorySection
// Renders one hobby block: a labelled heading + a 3-column photo grid.
// Clicking any photo fires onImageClick so Blog can open it in the Lightbox.
//
// Props:
//   category     — one object from GALLERY_CATEGORIES
//   onImageClick — (src: string, alt: string) => void
// ─────────────────────────────────────────────────────────────────────────────
function CategorySection({ category, onImageClick }) {
  return (
    <div style={{ marginBottom: '3rem' }}> {/* 3rem gap between hobby sections */}

      {/* Hobby category heading with emoji + label */}
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize:   '1.4rem',
        fontWeight: 700,
        color:      '#f0f0f0',
        marginBottom: '1rem',
        display:    'flex',
        alignItems: 'center',
        gap:        '0.5rem',
      }}>
        <span>{category.emoji}</span> {/* emoji provides instant visual recognition of the hobby */}
        <span>{category.label}</span> {/* text label for accessibility and clarity */}
      </h2>

      {/* 3-column photo grid — fixed at 3 columns regardless of screen width
          (parent container is already max-width constrained; 3 cols is always readable) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {category.images.map((src, idx) => (
          // Each thumbnail is a plain <img> — no wrapper needed since the click target is the image itself
          <img
            key={idx}
            src={src}
            alt={`${category.label} photo ${idx + 1}`} // accessible: e.g. "Football photo 1"
            onClick={() => onImageClick(src, `${category.label} photo ${idx + 1}`)} // pass src + alt up to Blog to open Lightbox
            style={{
              width:        '100%',
              aspectRatio:  '4/3',           // all thumbnails maintain the same shape regardless of natural image dimensions
              objectFit:    'cover',          // crop to fill the 4:3 box — no letterboxing or stretching
              borderRadius: '10px',
              cursor:       'zoom-in',        // signals to the user that clicking will enlarge
              transition:   'transform 0.2s, box-shadow 0.2s', // smooth property changes on hover
              boxShadow:    '0 2px 12px rgba(0,0,0,0.4)',
            }}
            // Hover: scale up 3% and deepen shadow — provides tactile feedback before clicking
            onMouseEnter={e => {
              e.currentTarget.style.transform  = 'scale(1.03)'
              e.currentTarget.style.boxShadow  = '0 6px 24px rgba(0,0,0,0.6)'
            }}
            // Leave: restore original size and shadow
            onMouseLeave={e => {
              e.currentTarget.style.transform  = 'scale(1)'
              e.currentTarget.style.boxShadow  = '0 2px 12px rgba(0,0,0,0.4)'
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog  |  Default export — rendered at route "/blog"
// ─────────────────────────────────────────────────────────────────────────────
export default function Blog() {
  // lightbox state:
  //   null          → no lightbox shown (default / after close)
  //   { src, alt }  → lightbox is open displaying this image
  const [lightbox, setLightbox] = useState(null)

  // Opens the lightbox with the image that was clicked
  const handleImageClick = (src, alt) => setLightbox({ src, alt })

  // Closes the lightbox by resetting state to null
  const handleClose = () => setLightbox(null)

  return (
    <>
      {/* ── Scoped styles ──────────────────────────────────────────────────── */}
      {/* Inline <style> keeps the blog page self-contained — important because
          it may be loaded as a fresh page (new tab) without the portfolio's CSS context */}
      <style>{`
        /* Hard reset so browser default margins don't push content off the dark background */
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* Dark page background matching the portfolio dark theme
           min-height: 100vh ensures the background fills the whole screen even on short pages */
        body {
          font-family: 'Syne', sans-serif;
          background: #0f0f0f;
          color: #f0f0f0;
          min-height: 100vh;
        }

        /* Pulsing dot animation used in the "Coming Soon" status indicator
           opacity oscillates 0.3 → 1 → 0.3 and size scales 1 → 1.3 → 1 in a 1.5s loop */
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;      /* perfect circle */
          background: #E8774A;     /* accent orange matches portfolio brand */
          opacity: 0.3;            /* start at low opacity — animation brings it to full */
          animation: pulse 1.5s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.3s; } /* second dot starts 300ms late */
        .dot:nth-child(3) { animation-delay: 0.6s; } /* third dot starts 600ms late → rolling wave effect */

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1);   } /* dim and small at start/end */
          50%       { opacity: 1;   transform: scale(1.3); } /* bright and slightly enlarged at peak */
        }

        /* On very narrow screens (phones < 480px) collapse the 3-column photo grid
           to 2 columns so thumbnails remain large enough to see clearly */
        @media (max-width: 480px) {
          .photo-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Page content wrapper ──────────────────────────────────────────── */}
      {/* max-width 800px keeps text and images from stretching too wide on large monitors */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* ── Section label ──────────────────────────────────────────────── */}
        {/* Tiny mono uppercase "✍️ Tanvir's Blog" — mirrors the section-subtitle style from the portfolio */}
        <p style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      '0.75rem',
          color:         '#E8774A',     // accent orange
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom:  '1.5rem',
          textAlign:     'center',
        }}>
          ✍️ Tanvir's Blog
        </p>

        {/* ── "Coming Soon." heading ─────────────────────────────────────── */}
        {/* clamp(3rem, 10vw, 6rem): fluid font size — 3rem minimum, scales with viewport, 6rem maximum
            The trailing period inherits the accent orange — same signature branding as the portfolio hero */}
        <h1 style={{
          fontSize:     'clamp(3rem, 10vw, 6rem)',
          fontWeight:   800,
          lineHeight:   1,
          marginBottom: '1.5rem',
          color:        '#f0f0f0',
          textAlign:    'center',
        }}>
          Coming<br />
          Soon<span style={{ color: '#E8774A' }}>.</span>
        </h1>

        {/* ── Animated dot indicator ─────────────────────────────────────── */}
        {/* Three dots with staggered animation delays create a rolling "loading" wave */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <div className="dot" /> {/* fires at 0ms */}
          <div className="dot" /> {/* fires at 300ms (nth-child(2) delay) */}
          <div className="dot" /> {/* fires at 600ms (nth-child(3) delay) */}
        </div>

        {/* ── Teaser paragraph ───────────────────────────────────────────── */}
        {/* Sets expectations: blog will cover CP, dev, and student life */}
        <p style={{
          fontSize:     '1.1rem',
          color:        '#bbbbbb',
          lineHeight:   1.7,
          marginBottom: '4rem',
          textAlign:    'center',
        }}>
          I'm working on something here — thoughts on competitive programming,
          software development, and life as a student developer.
          Check back soon!
        </p>

        {/* ── Photo Gallery ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>

          {/* Gallery intro: tiny label + explanatory sentence */}
          <p style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      '0.75rem',
            color:         '#E8774A',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom:  '0.5rem',
          }}>
            📸 Life Outside Code
          </p>
          <p style={{ color: '#bbbbbb', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            When I'm not grinding competitive programming, here's what keeps me going.
          </p>

          {/* Render one CategorySection per hobby defined in GALLERY_CATEGORIES
              Clicking any photo in any category calls handleImageClick → opens Lightbox */}
          {GALLERY_CATEGORIES.map(category => (
            <CategorySection
              key={category.id}          // stable key prevents unnecessary re-renders
              category={category}
              onImageClick={handleImageClick} // lift the selected image src+alt up to Blog state
            />
          ))}
        </div>

        {/* ── Back to portfolio button ────────────────────────────────────── */}
        {/* href="/" navigates the current tab back to the portfolio home page */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '0.5rem',
              background:     '#E8774A',  // solid accent orange — primary CTA colour
              color:          '#fff',
              fontFamily:     "'Syne', sans-serif",
              fontWeight:     600,
              fontSize:       '0.95rem',
              padding:        '0.85rem 2rem',
              borderRadius:   '14px',
              textDecoration: 'none',
              transition:     'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} // dim slightly on hover — gives click feedback
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}    // restore on leave
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>

      {/* ── Lightbox overlay ───────────────────────────────────────────────── */}
      {/* Conditionally rendered: only mounts when lightbox state is not null
          When null: component is fully removed from DOM (no invisible overlay blocking clicks) */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}    // URL of the image to display full-screen
          alt={lightbox.alt}    // alt text for the enlarged image
          onClose={handleClose} // called by backdrop click or × button to reset state to null
        />
      )}
    </>
  )
}
