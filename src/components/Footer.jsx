import { Send } from 'lucide-react'

const SECTION_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-lighter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-electric to-purple" />
              <span className="font-display text-xl font-bold text-white">Finmark</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              AI-powered financial automation for the modern enterprise.
              Compliance, forecasting, and fraud detection — all in one platform.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Stay updated</p>
              <div className="flex max-w-xs">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 rounded-l-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-electric/50"
                />
                <button className="rounded-r-lg bg-gradient-to-r from-electric to-purple px-4 py-2 text-white hover:opacity-90 transition-opacity cursor-pointer">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {SECTION_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Finmark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
