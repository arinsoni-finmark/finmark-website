export default function GlowBadge({ children }) {
  return (
    <span className="inline-block rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-sm font-medium text-electric-light">
      {children}
    </span>
  )
}
