import { ArrowRight } from 'lucide-react'
import GlowBadge from './ui/GlowBadge'
import GradientButton from './ui/GradientButton'

// Content sourced from FinMark-About-Section.docx.
// "Who we are" section deliberately excluded per founder request.
// Placeholders [X,000+] and [N] should be replaced with real numbers
// before going live — the invoice volume line is the single biggest
// credibility lever on this page.

const SECTIONS = [
  {
    kicker: 'The problem we saw',
    body: [
      'FinMark.ai started because one problem refused to go away: large enterprises running ERP had nowhere to turn for financial automation that actually understood their finance team\'s reality. Existing tools were built for tax regimes and workflows that did not match how local finance teams operate — with no real grasp of regional withholding tax rules, compliance requirements, or the way complex vendor invoices really move through an enterprise\'s approval chain.',
      'Enterprises running ERP were stuck with two options — handle it all by hand, or bend foreign tools into shapes they were never designed to take. Neither option was a product. Both were workarounds. So we built the product that was missing.',
    ],
  },
  {
    kicker: 'How we built it',
    body: [
      'We didn\'t start with code. We started in the seat next to the finance controller. For months, we sat with finance teams at enterprises — watching invoices arrive in dozens of different formats, listening to how purchase order and goods-received matching breaks down for services and marketing categories, tracking how withholding tax certificates actually get generated and filed, and studying how finance managers really use their ERP day to day.',
      'What we learned shaped every design decision. Matching logic had to be category-aware. Withholding tax couldn\'t be an afterthought. Sanity checks had to catch the edge cases that AI alone misses. And the whole system had to end where the finance team\'s job does — with approved, audit-ready entries posted back into the ERP.',
    ],
  },
  {
    kicker: 'What FinMark.ai does today',
    body: [
      'FinMark.ai runs the full invoice-to-ERP workflow end to end. AI captures invoices in any format. Matching happens against live ERP data. Withholding tax is computed automatically against current regulations. Sanity checks catch what AI alone would miss. Approved invoices post back into the ERP, audit-ready. What used to take finance teams days now takes minutes.',
      // TODO(founder): replace the brackets with real numbers before going live.
      // The invoice volume line is the single biggest credibility lever on this page.
      // If you have no public reference, lead with a number — invoices processed,
      // transaction value, or hours saved — rather than adjectives.
      'Today we process invoices across enterprises in production.',
    ],
  },
  {
    kicker: 'What we believe',
    body: [
      'FinMark.ai is the beginning of a broader financial automation platform built for enterprise. Our first product tackles the most painful workflow in enterprise finance — but it will not be the last.',
      'We have one rule about how this expansion happens: each new product will ship only after it is real, running, and proven at a paying customer. We will not launch something that has not already earned its place in a finance team\'s workflow. That discipline is how we earned the trust of the enterprises running FinMark.ai today, and it is how we plan to earn the next one.',
    ],
  },
]

// `headingTag` lets the About page render this heading as its H1
// (every page needs exactly one), while the homepage keeps it as an H2
// under the hero's H1.
export default function About({ headingTag: Heading = 'h2' }) {
  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-8" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div>
            <GlowBadge>About</GlowBadge>
          </div>
          <div>
            <Heading className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              About <span className="gradient-text">FinMark.ai</span>
            </Heading>
          </div>
          <div>
            <p className="mt-5 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed">
              Financial automation built for enterprise finance teams.
            </p>
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div key={section.kicker} className="mb-16 last:mb-0">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-electric-light/80 mb-3 font-medium">
                {section.kicker}
              </p>
            </div>
            <div className="space-y-5 text-gray-400 leading-relaxed text-base sm:text-lg">
              {section.body.map((para, pi) => (
                <div key={pi}>
                  <p>{para}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Let's talk CTA */}
        <div>
          <div className="mt-20 text-center">
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              If you run ERP at an enterprise and any of what you just read sounds like your finance team's life, we would like to meet them.
            </p>
            <GradientButton to="/demo" className="text-sm sm:text-base px-9 py-4 flex items-center gap-2 mx-auto">
              Book a 30-minute walkthrough <ArrowRight size={16} />
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  )
}
