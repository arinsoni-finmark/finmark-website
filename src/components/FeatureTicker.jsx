const KEYWORDS = [
  'AI Financial Automation',
  'Built for Finance Teams',
  'Enterprise-Grade',
  'Live in Production',
]

/**
 * Was an infinitely scrolling marquee of keywords that also faded in and out
 * as you scrolled past it. Constant motion for its own sake; the words say the
 * same thing standing still.
 */
export default function FeatureTicker() {
  return (
    <section className="relative border-y border-white/[0.04] py-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
        {KEYWORDS.map((keyword, i) => (
          <span key={keyword} className="flex items-center">
            <span className="text-xs sm:text-sm font-display font-medium uppercase tracking-wide text-gray-500 select-none">
              {keyword}
            </span>
            {i < KEYWORDS.length - 1 && (
              <span className="ml-6 text-xs text-electric/40 select-none">&#9670;</span>
            )}
          </span>
        ))}
      </div>
    </section>
  )
}
