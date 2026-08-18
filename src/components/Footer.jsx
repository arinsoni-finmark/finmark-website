import { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import { Send, Check } from 'lucide-react'
import { PRODUCTS } from '../lib/constants'

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Security', to: '/security' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get a demo', to: '/demo' },
]

/**
 * Posts to the Netlify "newsletter" form declared in index.html.
 * Same contract as the demo/contact forms: only claim success when Netlify
 * actually accepted it, since fetch resolves happily on a 404 or 500.
 */
function NewsletterSignup() {
  const emailId = useId()
  const [email, setEmail] = useState('')
  const [botField, setBotField] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const body = new URLSearchParams({
      'form-name': 'newsletter',
      'bot-field': botField,
      email,
    })

    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(`Netlify form POST returned ${res.status}`)
      setStatus('sent')
      setEmail('')
    } catch (err) {
      console.error('Newsletter signup failed:', err)
      setStatus('error')
    }
  }

  return (
    <div className="mt-6">
      <label htmlFor={emailId} className="block text-sm text-gray-400 mb-2">
        Stay updated
      </label>

      {status === 'sent' ? (
        <p className="flex items-center gap-2 text-sm text-electric-light">
          <Check size={16} />
          You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xs">
          <p className="hidden">
            <label>
              Leave this field empty
              <input
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />
            </label>
          </p>
          <div className="flex">
            <input
              id={emailId}
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 min-w-0 rounded-l-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-electric/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              aria-label="Subscribe"
              className="rounded-r-lg bg-gradient-to-r from-electric to-purple px-4 py-2 text-white hover:opacity-90 transition-all hover:shadow-lg hover:shadow-electric/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
          {status === 'error' && (
            <p role="alert" className="mt-2 text-xs text-red-300">
              That didn&apos;t go through. Try again, or email{' '}
              <a href="mailto:admin@finmark.ai" className="underline hover:text-white">
                admin@finmark.ai
              </a>
              .
            </p>
          )}
        </form>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-lighter overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-electric/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple/5 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo-nav.png" alt="FinMark.ai" width={173} height={128} className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              AI financial automation for enterprise finance teams. Invoice capture,
              accounts payable automation, withholding tax, and ERP posting — end to
              end, in one platform.
            </p>

            {/* Newsletter */}
            <NewsletterSignup />
          </div>

          {/* Platform */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {PRODUCTS.map((product) => (
                <li key={product.to}>
                  <Link
                    to={product.to}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} FinMark.ai. All rights reserved.
          </p>
          <a
            href="mailto:admin@finmark.ai"
            className="text-sm text-gray-600 hover:text-electric-light transition-colors"
          >
            admin@finmark.ai
          </a>
        </div>
      </div>
    </footer>
  )
}
