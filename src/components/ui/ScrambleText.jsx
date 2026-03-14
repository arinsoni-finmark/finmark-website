import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function ScrambleText({ text, className = '', as: Tag = 'span', delay = 0 }) {
  const [displayed, setDisplayed] = useState(text)
  const [hasScrambled, setHasScrambled] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (!inView || hasScrambled) return

    const timeout = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayed(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < iteration) return text[i]
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        iteration += 1 / 3
        if (iteration >= text.length) {
          clearInterval(interval)
          setDisplayed(text)
          setHasScrambled(true)
        }
      }, 30)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [inView, text, delay, hasScrambled])

  return (
    <Tag ref={ref} className={className}>
      {displayed}
    </Tag>
  )
}
