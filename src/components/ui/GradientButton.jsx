import { Link } from 'react-router-dom'

const BASE =
  'relative inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-electric to-purple px-6 py-3 font-semibold text-white shadow-lg shadow-electric/25 hover:shadow-xl hover:shadow-electric/40',
  outline:
    'border border-white/10 bg-dark-card/90 px-6 py-3 text-white hover:border-electric/50 hover:bg-white/10',
}

/**
 * Primary CTA.
 *
 * Pass `to` to navigate — the component then renders as a router Link.
 * Do NOT wrap it in a <Link> instead: that nests a <button> inside an <a>,
 * which is invalid HTML and gives every CTA two tab stops and a muddled
 * screen-reader announcement.
 *
 * The button used to slide toward the cursor and sweep a shine across itself
 * on hover. Both are gone — a CTA that moves away as you aim at it is a
 * usability cost, not a flourish.
 */
export default function GradientButton({
  children,
  variant = 'primary',
  className = '',
  to,
  ...props
}) {
  const Component = to ? Link : 'button'
  const isOutline = variant === 'outline'

  return (
    <Component
      {...(to ? { to } : {})}
      className={`${BASE} ${isOutline ? VARIANTS.outline : VARIANTS.primary} ${className}`}
      {...props}
    >
      <span className="inline-flex items-center gap-2">{children}</span>
    </Component>
  )
}
