import { useState } from 'react'
import { Sparkles, Check } from 'lucide-react'
import SEO from '../components/seo/SEO'
import Breadcrumb from '../components/seo/Breadcrumb'
import GlowBadge from '../components/ui/GlowBadge'
import GradientButton from '../components/ui/GradientButton'
import ReifyCard from '../components/ui/ReifyCard'
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
} from '../lib/schema'

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const path = '/request'
  const items = [
    { name: 'Home', path: '/' },
    { name: 'Request', path },
  ]

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new URLSearchParams({
      'form-name': 'request',
      name: form.name,
      email: form.email,
      message: form.message,
    })
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData.toString() })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true))
  }

  return (
    <>
      <SEO
        title="Tell Us What You Need — FinMark.ai"
        description="Don't see what you need? Tell us and we'll build it for you within 2 weeks. FinMark.ai builds custom financial automation for enterprise finance teams."
        path={path}
        schema={[
          organizationSchema(),
          webPageSchema({
            title: 'Tell Us What You Need — FinMark.ai',
            description: "Tell us your problem. We'll build it for you within 2 weeks.",
            path,
          }),
          breadcrumbSchema(items),
        ]}
      />
      <Breadcrumb items={items} />

      <section className="relative overflow-hidden pt-12 pb-20 sm:pb-28">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="glow-orb w-[700px] h-[700px] bg-electric/8 -top-40 -right-40" />
        <div className="glow-orb w-[500px] h-[500px] bg-purple/8 -bottom-32 -left-32" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="mb-6 inline-flex"
            >
              <GlowBadge>
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={12} />
                  & many more
                </span>
              </GlowBadge>
            </div>
            <h1
              className="font-display text-[2.25rem] sm:text-5xl md:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.05]"
            >
              Tell us what you <span className="gradient-text">need</span>
            </h1>
            <p
              className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto"
            >
              We'll build it for you within 2 weeks.
            </p>
          </div>

          <ReifyCard className="rounded-2xl max-w-lg mx-auto">
            <div className="p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-electric to-purple flex items-center justify-center mb-5">
                    <Check size={28} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-3">
                    Got it. We'll be in touch.
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Someone from the FinMark.ai team will get back to you within one business day to discuss what you need.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 focus:border-electric/50 focus:bg-white/[0.05] focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 focus:border-electric/50 focus:bg-white/[0.05] focus:outline-none transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      What do you need?
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 focus:border-electric/50 focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                      placeholder="Describe the problem you want automated..."
                    />
                  </div>
                  <GradientButton type="submit" className="w-full text-sm py-3 mt-2">
                    Submit
                  </GradientButton>
                </form>
              )}
            </div>
          </ReifyCard>
        </div>
      </section>
    </>
  )
}
