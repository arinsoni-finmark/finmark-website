import { useState, useId } from 'react'
import { Plus, Minus } from 'lucide-react'

/**
 * Accessible FAQ accordion. Pair with faqSchema() in the SEO component.
 *
 * Every answer stays mounted and is collapsed via CSS, rather than being
 * unmounted. That matters twice over: Google requires FAQ content to actually
 * be present on the page for the FAQPage rich result, and these answers are
 * substantial body copy that should be indexable. Unmounting them shipped a
 * page whose schema promised eight answers while the HTML contained one.
 *
 * The open/close is a pure CSS grid-row transition rather than a JS animation,
 * so reading an answer never depends on an animation frame running.
 *
 * Props:
 *   - faqs: [{ q, a }]
 */
export default function PillarFAQ({ faqs, heading = 'Frequently Asked Questions' }) {
  const baseId = useId()
  const [open, setOpen] = useState(0)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-14">
          {heading}
        </h2>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            const questionId = `${baseId}-q${i}`
            const answerId = `${baseId}-a${i}`
            return (
              <div
                key={f.q}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-white/[0.03] transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="font-display text-base sm:text-lg font-medium text-white">
                      {f.q}
                    </span>
                    <span className="flex-shrink-0 text-electric-light">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed text-sm sm:text-base">
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
