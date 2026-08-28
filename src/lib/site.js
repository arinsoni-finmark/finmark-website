// Site-wide constants used across SEO, schema, and routing.
// Update SITE_URL when you point a real domain at the build output.

export const SITE_URL = 'https://finmark.ai'
export const SITE_NAME = 'FinMark.ai'
export const SITE_TAGLINE = 'AI-Powered Financial and Operational Automation'
export const DEFAULT_OG_IMAGE = '/og/default.png'

export const SOCIAL = {
  twitter: 'https://twitter.com/finmark_ai',
  linkedin: 'https://linkedin.com/company/finmark-ai',
}

/**
 * Direct booking.
 *
 * Set `url` to your scheduler's public booking page and /demo puts a live
 * calendar above the form, so a visitor can pick a slot instead of sending a
 * message and waiting for a reply. Leave it null and /demo is unchanged —
 * form only — so a missing URL degrades to today's behaviour rather than an
 * empty box.
 *
 * Works with any scheduler that allows itself to be framed, which covers the
 * common ones:
 *   Cal.com            https://cal.com/<user>/<event>
 *   Calendly           https://calendly.com/<user>/<event>
 *   Microsoft Bookings https://outlook.office365.com/book/<page>/
 *   Google Appointments the "book an appointment" share link
 *
 * SET A DARK THEME ON THE URL. Schedulers default to a light theme, and a
 * white calendar dropped into this site reads as a broken embed. Append:
 *   Cal.com   ?theme=dark
 *   Calendly  ?background_color=0A0A0F&text_color=e5e7eb&primary_color=0066FF
 *   Bookings  no theme parameter — check how it looks before shipping
 *
 * Deliberately an iframe rather than a vendor embed script. The scripts pull
 * a few hundred KB of third-party JS into the page and run it on the main
 * thread; an iframe loads in its own context and leaves the bundle alone —
 * which matters on a site that was cut from 375KB to 213KB on purpose.
 */
export const BOOKING = {
  url: null,
  // Shown above the calendar. Keep it short.
  heading: 'Pick a time that works',
  subhead: 'A 30-minute walkthrough with the team. No prep needed.',
  // Scheduler iframes do not resize themselves cross-origin, so this is
  // fixed. ~720 fits a month grid plus the slot list without inner scrolling.
  heightPx: 720,
}
