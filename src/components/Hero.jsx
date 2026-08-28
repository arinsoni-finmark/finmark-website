import { useRef, useEffect, useLayoutEffect } from 'react'
import { ArrowRight, Sparkles, Brain, Shield, TrendingUp } from 'lucide-react'
import GradientButton from './ui/GradientButton'
import ReifyCard from './ui/ReifyCard'

// useLayoutEffect warns during SSR; the body only matters in the browser.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

// Scroll distance over which the mark turns upright. The old hero used a
// 400vh sticky section — four screens before a visitor reached any content.
// This is roughly half a screen and adds no page height whatsoever.
const ROTATE_OVER_PX = 520

/**
 * Turns the brand mark upright as the page scrolls — the effect the old hero
 * had, driven off page scroll the same way, but over half a screen instead of
 * the 400vh sticky rig it used to need. It adds no page height at all.
 *
 * Writes straight to the node rather than going through React state. State
 * would re-render the component on every scroll frame, which is the trap the
 * old hero fell into by calling setState on every mousemove.
 *
 * Runs as a layout effect so the starting angle is applied before the browser
 * paints. The markup renders the mark upright and visible, so it stays correct
 * if this never runs at all — but without the pre-paint pass you would see it
 * flick from upright to sideways on load.
 */
function useLogoScrollRotation(ref) {
  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Leave the resting state alone for anyone who asked for less movement.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = null
    const apply = () => {
      frame = null
      const p = Math.min(1, Math.max(0, window.scrollY / ROTATE_OVER_PX))
      // Faintly present at the top, brightening as it comes upright.
      el.style.opacity = String(0.1 + 0.2 * p)
      el.style.transform = `rotate(${90 * (1 - p)}deg) scale(${0.65 + 0.35 * p})`
    }
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [ref])
}

/**
 * Static hero.
 *
 * This was previously a 400vh scroll-scrubbed sequence with a WebGL canvas,
 * a cursor-tracking gradient and drifting decorative shapes — four screens of
 * choreography before a visitor reached any content. It is now one screen of
 * headline, subhead, CTA and three value cards, laid out responsively in CSS
 * so there is no JS-driven desktop/mobile split and nothing to hydrate around.
 */

const CARDS = [
  {
    icon: Brain,
    title: 'AI Invoice Capture',
    desc: 'AI reads vendor invoices in any format and matches them against live ERP data.',
  },
  {
    icon: Shield,
    title: 'Tax & Compliance Built In',
    desc: 'Withholding tax computed automatically against current regulations, audit-ready.',
  },
  {
    icon: TrendingUp,
    title: 'Straight Into Your ERP',
    desc: 'Matched, checked, and approved invoices post back into your ERP in minutes, not days.',
  },
]

const HERO_SUBHEAD =
  'FinMark.ai builds AI automation for enterprise finance teams — invoice capture, accounts payable, tax compliance, and ERP posting, end to end.'

export default function Hero() {
  const logoRef = useRef(null)
  useLogoScrollRotation(logoRef)

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Static ambience — no motion, purely decorative */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,transparent_0%,var(--color-dark)_100%)]" />
      <div className="glow-orb w-[600px] h-[600px] bg-electric/8 -top-40 -left-40" />
      <div className="glow-orb w-[500px] h-[500px] bg-purple/8 -bottom-32 -right-32" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] max-w-5xl flex-col justify-center text-center">
        {/* self-center so the pill hugs its text — as a flex item it would
            otherwise stretch the full width of the column. */}
        <span className="self-center inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/[0.08] px-4 py-2 text-xs sm:text-sm font-medium text-electric-light">
          <Sparkles size={14} />
          Automate what slows you down
        </span>

        <h1 className="mt-6 font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white tracking-[-0.03em]">
          AI Financial
          <br />
          <span className="gradient-text">Automation</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed">
          {HERO_SUBHEAD}
        </p>

        <div className="mt-8 flex justify-center">
          <GradientButton
            to="/demo"
            className="text-sm sm:text-base px-8 py-3.5 sm:px-10 sm:py-4 flex items-center gap-2"
          >
            Get a demo <ArrowRight size={16} />
          </GradientButton>
        </div>

        {/* Brand mark — starts on its side and turns upright as the page
            scrolls, the way the old hero did, minus the 400vh rig. */}
        <div
          ref={logoRef}
          className="mx-auto mt-16 w-[170px] sm:w-[210px] md:w-[240px] will-change-transform"
          style={{ opacity: 0.3 }}
        >
          <img
            src="/logo-full.png"
            alt=""
            width={655}
            height={484}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-5 pb-24 sm:pb-28 md:grid-cols-3">
        {CARDS.map((card) => (
          <ReifyCard key={card.title} className="rounded-2xl">
            <div className="p-8 text-center h-full">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center mb-5">
                <card.icon size={24} className="text-electric-light" />
              </div>
              <h2 className="font-display text-lg font-semibold text-white mb-2">
                {card.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          </ReifyCard>
        ))}
      </div>
    </section>
  )
}
