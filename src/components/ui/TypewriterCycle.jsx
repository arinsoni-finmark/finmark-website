import { useEffect, useState } from 'react'

export default function TypewriterCycle({ words, className = '' }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    const speed = isDeleting ? 40 : 80

    if (!isDeleting && displayed === word) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? word.slice(0, displayed.length - 1)
          : word.slice(0, displayed.length + 1)
      )
    }, speed)

    return () => clearTimeout(timer)
  }, [displayed, isDeleting, index, words])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse ml-0.5 text-electric">|</span>
    </span>
  )
}
