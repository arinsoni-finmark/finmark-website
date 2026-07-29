import { useState, useRef, useId } from 'react'
import VideoEmbed from './VideoEmbed'

/**
 * Segmented control that swaps between product videos in place.
 *
 * Used where one product has several recordings — a general walkthrough plus
 * a version per market. Switching is local state, not navigation, so the
 * video changes without a page load.
 *
 * The panel is keyed on the selected tab so React remounts it, which both
 * replays the fade and guarantees a playing video is torn down when you
 * switch away rather than continuing to play behind the new one.
 *
 * Standard tablist semantics: roles, aria-selected, roving tabindex and
 * arrow-key movement, so it is operable without a mouse.
 *
 * Props:
 *   - items: [{ key, label, video }]
 */
export default function VideoTabs({ items }) {
  const baseId = useId()
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])

  if (!items || items.length === 0) return null
  if (items.length === 1) {
    const { video } = items[0]
    return (
      <VideoEmbed
        youtubeId={video.youtubeId}
        title={video.title}
        poster={video.poster}
        placeholder={video.placeholder}
      />
    )
  }

  const onKeyDown = (e) => {
    const last = items.length - 1
    let next = null
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const current = items[active]

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a version of the walkthrough"
        onKeyDown={onKeyDown}
        className="mx-auto mb-5 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
      >
        {items.map((item, i) => {
          const selected = i === active
          return (
            <button
              key={item.key}
              ref={(el) => { tabRefs.current[i] = el }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                selected
                  ? 'bg-gradient-to-r from-electric to-purple text-white shadow shadow-electric/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div
        key={active}
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="video-panel"
      >
        <VideoEmbed
          youtubeId={current.video.youtubeId}
          title={current.video.title}
          poster={current.video.poster}
          placeholder={current.video.placeholder}
        />
      </div>
    </div>
  )
}
