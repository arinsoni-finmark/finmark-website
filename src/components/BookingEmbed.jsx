import { BOOKING } from '../lib/site'

/**
 * The scheduler frame itself. Deliberately just the frame — no section, no
 * width constraint, no heading — so the page can place it in a column beside
 * the contact form rather than owning the full width.
 *
 * Renders nothing when no URL is configured, so /demo falls back to the form
 * alone rather than showing an empty box.
 */
export default function BookingEmbed() {
  if (!BOOKING.url) return null

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <iframe
          src={BOOKING.url}
          title="Book a call with FinMark.ai"
          className="w-full"
          // color-scheme is declared because an embedded document is supposed
          // to inherit it, and it costs nothing if Google starts honouring it.
          // Tested: today they do not. The booking page follows the visitor's
          // own system theme, so someone in light mode gets a white panel on
          // this dark page and there is no way to override it from out here —
          // the frame is cross-origin, so its colours, fonts and layout are
          // all beyond reach.
          style={{ height: `${BOOKING.heightPx}px`, border: 0, colorScheme: 'dark' }}
          loading="lazy"
        />
      </div>

      {/* A framed scheduler is a dead end if the iframe is blocked by an
          extension or a corporate policy — common in exactly the finance
          environments this page is aimed at. Always give a way out. */}
      <p className="mt-4 text-center text-sm text-gray-500">
        Calendar not loading?{' '}
        <a
          href={BOOKING.fallbackUrl || BOOKING.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-electric-light underline underline-offset-4 decoration-electric/30 hover:text-white hover:decoration-electric"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  )
}
