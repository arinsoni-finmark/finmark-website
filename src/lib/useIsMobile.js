import { useState, useEffect } from 'react'

let cached = null

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (cached !== null) return cached
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0
  })

  useEffect(() => {
    cached = isMobile
  }, [isMobile])

  return isMobile
}
