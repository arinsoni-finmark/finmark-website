import { Link } from 'react-router-dom'
import SEO from '../components/seo/SEO'
import GradientButton from '../components/ui/GradientButton'

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | FinMark.ai"
        description="The page you're looking for doesn't exist. Browse our platform pillars or return to the homepage."
        path="/404"
        noindex
      />
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <p className="text-electric-light text-sm uppercase tracking-[0.2em] mb-4">
            Error 404
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-white tracking-tight mb-5">
            Page <span className="gradient-text">not found</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-9">
            The page you're looking for doesn't exist or has moved. Try the homepage or
            browse the platform from the navigation above.
          </p>
          <GradientButton to="/" className="text-sm sm:text-base px-8 py-3">
            Back to homepage
          </GradientButton>
        </div>
      </section>
    </>
  )
}
