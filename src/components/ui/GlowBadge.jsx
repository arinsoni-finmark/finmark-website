
export default function GlowBadge({ children }) {
  return (
    <span
      className="inline-block rounded-full border border-electric/30 bg-electric/10 px-5 py-2 text-sm font-medium text-electric-light backdrop-blur-sm"
      >
      {children}
    </span>
  )
}
