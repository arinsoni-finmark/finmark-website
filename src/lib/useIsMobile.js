import { useState, useEffect, useLayoutEffect } from 'react'

/**
 * Single source of truth for "is this a small/touch device".
 *
 * Two things this has to get right:
 *
 * 1. Hydration. The SSG pre-render has no `window`, so the server always
 *    produces the desktop tree. If the first client render disagreed, React
 *    would throw the server markup away and rebuild — a visible flash on
 *    every phone visit. So the first render is ALWAYS desktop on both sides,
 *    and we correct in a layout effect, which React flushes before the
 *    browser paints. The desktop tree never actually reaches the screen.
 *
 * 2. Touch laptops. A 1920px Windows touch laptop is not a phone. Requiring
 *    a coarse pointer *alongside* a small viewport keeps those on the full
 *    desktop experience instead of serving them the cut-down mobile site.
 */

// useLayoutEffect warns when run during SSR; fall back to useEffect there.
// The effect body only matters in the browser, so this is safe.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const MOBILE_QUERY = '(max-width: 767px), (pointer: coarse) and (max-width: 1024px)'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mq.matches)

    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isMobile
}
