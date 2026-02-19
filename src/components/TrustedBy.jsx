import { TRUSTED_LOGOS } from '../lib/constants'

export default function TrustedBy() {
  const doubled = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS]

  return (
    <section className="relative py-16 overflow-hidden border-y border-white/5">
      <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-8">
        Trusted by industry leaders
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="mx-8 flex-shrink-0 flex items-center justify-center"
            >
              <span className="text-lg font-display font-semibold text-gray-600 select-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
