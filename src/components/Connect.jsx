// ─────────────────────────────────────────────────────────────────────────────
// Connect.jsx  |  CONTACT / SOCIAL LINKS SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Renders five social platform icon cards (GitHub, LinkedIn, Gmail, Instagram,
// Facebook) followed by a large direct-email CTA button at the bottom.
//
// Each platform card:
//   • Floats up 4px on hover (Framer Motion whileHover)
//   • Switches its entire background/border/text to the platform's brand colour on hover
//   • Opens the profile link in a new tab (except email which opens Gmail compose)
//
// Sub-component:
//   SocialButton — one platform icon card
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Instagram, Facebook } from 'lucide-react' // official brand-adjacent icons from Lucide
import { fadeUp } from '../utils/animations'

// ── Social platform definitions ────────────────────────────────────────────────
// Add / remove platforms here. The grid renders them automatically.
// Fields:
//   name       — label text shown below the icon
//   href       — URL to navigate to (profile page or Gmail compose link)
//   icon       — Lucide icon component (assigned to const `Icon` in SocialButton)
//   hoverBg    — brand background colour shown when hovering the card
//   hoverColor — text/icon colour when hovering (almost always white on dark brand bg)
const SOCIALS = [
  { name: 'GitHub',    href: 'https://github.com/itz-tanvir',                                        icon: Github,    hoverBg: '#24292e', hoverColor: '#fff' }, // GitHub dark grey brand
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/in/tanvir-muhammad-hasan-421ba9282/',         icon: Linkedin,  hoverBg: '#0A66C2', hoverColor: '#fff' }, // LinkedIn official blue
  { name: 'Gmail',     href: 'https://mail.google.com/mail/?view=cm&to=tanvirhasan.pe@gmail.com',    icon: Mail,      hoverBg: '#EA4335', hoverColor: '#fff' }, // Gmail red; ?view=cm opens compose window pre-filled with To address
  { name: 'Instagram', href: 'https://www.instagram.com/t_anv_i_r/',                                icon: Instagram, hoverBg: '#E1306C', hoverColor: '#fff' }, // Instagram pink/magenta brand
  { name: 'Facebook',  href: 'https://www.facebook.com/tanvir.hasan.401601',                        icon: Facebook,  hoverBg: '#1877F2', hoverColor: '#fff' }, // Facebook blue brand
]

// ─────────────────────────────────────────────────────────────────────────────
// SocialButton
// One platform card showing an icon above a label.
//
// Props:
//   social — one object from the SOCIALS array
//   delay  — fadeUp stagger offset in seconds
// ─────────────────────────────────────────────────────────────────────────────
function SocialButton({ social, delay }) {
  const Icon = social.icon // resolve the Lucide icon component from the data object — capitalised because JSX requires component names to start with uppercase

  return (
    // motion.a: animatable <a> tag — combines link behaviour with Framer Motion
    // whileHover: lift card 4px upward for a tactile floating sensation
    <motion.a
      {...fadeUp(delay)}
      href={social.href}
      // mailto: and Gmail compose links should open in the SAME tab (replaces compose action);
      // all other profile URLs open in a NEW tab so the visitor doesn't leave the portfolio
      target={social.href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer" // prevent new tab from reading window.opener — standard security practice
      whileHover={{ y: -4 }}   // float card up 4px on hover
      className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-200 cursor-pointer"
      style={{
        background:  'var(--card)',                       // default card background
        border:      '2px solid rgba(128,128,128,0.2)',   // subtle grey border defines card edge
        color:       'var(--ink)',                        // default icon/text colour
      }}
      // Hover: swap in platform brand colours for all three style properties simultaneously
      onMouseEnter={e => {
        e.currentTarget.style.background  = social.hoverBg    // fill card with brand colour
        e.currentTarget.style.color       = social.hoverColor // switch icon + text to white
        e.currentTarget.style.borderColor = social.hoverBg    // match border to background so it disappears visually
      }}
      // Leave: restore all three properties to their default card styles
      onMouseLeave={e => {
        e.currentTarget.style.background  = 'var(--card)'
        e.currentTarget.style.color       = 'var(--ink)'
        e.currentTarget.style.borderColor = 'rgba(128,128,128,0.2)'
      }}
    >
      <Icon size={28} /> {/* platform icon — size 28px is large enough to be recognisable at a glance */}
      {/* Platform name in tiny mono uppercase — secondary to the icon */}
      <span className="font-mono text-xs tracking-widest uppercase">{social.name}</span>
    </motion.a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Connect  |  Default export
// ─────────────────────────────────────────────────────────────────────────────
export default function Connect() {
  return (
    // id="connect" required for IntersectionObserver active-section tracking in App.jsx
    <section id="connect" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)}>
          <div className="accent-line" />
          <p className="section-subtitle">Get in touch</p>
          <h2 className="section-title">Connect</h2>
          <p className="text-lg max-w-lg mb-12 leading-relaxed" style={{ color: 'var(--muted)' }}>
            Whether it's a project collaboration, CP discussion, or just a hello — my inbox is always open.
          </p>
        </motion.div>

        {/* ── Social icon grid ─────────────────────────────────────────────── */}
        {/* Responsive column count: 2 → 3 → 5 as screen widens
            5 platforms × 1 per column = full row on md+ with no leftover gap */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SOCIALS.map((social, i) => (
            // i * 0.07s stagger: 5 cards spread across 0–0.28s for a smooth cascade
            <SocialButton key={social.name} social={social} delay={i * 0.07} />
          ))}
        </div>

        {/* ── Direct email CTA ─────────────────────────────────────────────── */}
        {/* Secondary call-to-action for visitors who prefer email over social media */}
        <motion.div {...fadeUp(0.4)} className="mt-16 text-center"> {/* 0.4s delay: loads after all social cards finish animating in */}
          <p className="text-lg mb-4" style={{ color: 'var(--muted)' }}>Prefer direct contact?</p>

          {/* Large pill button — more prominent than the icon cards above */}
          {/* Background switches from dark ink → accent orange on hover */}
          <a
            href="https://mail.google.com/mail/?view=cm&to=tanvirhasan.pe@gmail.com" // opens Gmail compose pre-filled with Tanvir's address in To field
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg transition-all duration-200"
            style={{ background: 'var(--ink)', color: 'var(--cream)' }} // dark background, cream text — inverted from main palette
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'} // switch to orange on hover
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}    // restore dark on leave
          >
            <Mail size={20} /> {/* mail icon reinforces that this is an email action */}
            tanvirhasan.pe@gmail.com {/* email address displayed as the button label — doubles as clear CTA text */}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
