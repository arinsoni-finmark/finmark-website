/**
 * Premium glass card.
 *
 * Previously tilted up to 15 degrees toward the cursor and scaled on hover,
 * driven by spring physics on every card on the page. That reads as portfolio
 * site rather than enterprise software, so the card is now static: the border,
 * glass surface and hover shine are all CSS.
 */
export default function ReifyCard({ children, className = '' }) {
  return (
    <div className={`reify-card ${className}`}>
      <div className="reify-border" />
      <div className="reify-surface">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
