import { motion } from 'framer-motion'
import GlowBadge from './ui/GlowBadge'
import ReifyCard from './ui/ReifyCard'
import useIsMobile from '../lib/useIsMobile'

const FOUNDERS = [
  {
    name: 'Arin Soni',
    initials: 'AS',
    bio: 'Arin is a technology-driven problem solver with a strong focus on building intelligent, scalable systems. With a vision to leverage automation and AI at the core of business workflows, he is dedicated to creating seamless, high-performance solutions that enhance productivity and decision-making across organizations.',
  },
  {
    name: 'Aditi Agarwal',
    initials: 'AA',
    bio: 'Aditi brings a sharp strategic mindset and a deep understanding of business operations, with a focus on identifying inefficiencies and transforming them into scalable, high-impact solutions. She is passionate about building structured systems that bring clarity, control, and efficiency to organizations, enabling them to operate at their full potential.',
  },
]

export default function About() {
  const isMobile = useIsMobile()

  const Wrapper = isMobile ? 'div' : motion.div
  const sectionMotion = isMobile ? {} : {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }
  const delayMotion = (d) => isMobile ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: d },
  }

  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-8" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* About Header */}
        <div className="text-center mb-16">
          <Wrapper {...sectionMotion}>
            <GlowBadge>About</GlowBadge>
          </Wrapper>
          <Wrapper {...delayMotion(0.1)}>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              About <span className="gradient-text">FinMark.ai</span>
            </h2>
          </Wrapper>
        </div>

        {/* About Content */}
        <div className="space-y-6 text-gray-400 leading-relaxed text-base sm:text-lg">
          <Wrapper {...delayMotion(0.15)}>
            <p>
              At FinMark.ai, we are building intelligent tools that simplify and optimize both financial and operational workflows for modern businesses.
            </p>
          </Wrapper>
          <Wrapper {...delayMotion(0.2)}>
            <p>
              Our mission is to empower organizations with technology that brings structure, visibility, and efficiency across their core processes. By leveraging advanced artificial intelligence, we transform complex, manual operations into streamlined, automated systems—helping teams save time, reduce errors, and operate with greater precision.
            </p>
          </Wrapper>
          <Wrapper {...delayMotion(0.25)}>
            <p>
              FinMark.ai is designed as a flexible platform that supports a wide range of business functions, from financial management to general operations. Whether it's handling data, automating workflows, or enabling smarter decision-making, our solutions adapt to the unique needs of each organization.
            </p>
          </Wrapper>
          <Wrapper {...delayMotion(0.3)}>
            <p>
              We believe that both finance and operations should work seamlessly together—not in silos. That's why we focus on building tools that are intuitive, scalable, and aligned with real-world business challenges, enabling companies to run more efficiently and grow with confidence.
            </p>
          </Wrapper>
          <Wrapper {...delayMotion(0.35)}>
            <p>
              Driven by innovation and a deep understanding of business processes, FinMark.ai is committed to helping organizations move toward a more automated, transparent, and technology-driven future.
            </p>
          </Wrapper>
        </div>

        {/* Founding Team */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <Wrapper {...delayMotion(0.1)}>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Founding <span className="gradient-text">Team</span>
              </h3>
            </Wrapper>
            <Wrapper {...delayMotion(0.15)}>
              <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                Meet the founding team—driven, visionary leaders committed to redefining how businesses manage finance and operations through intelligent technology.
              </p>
            </Wrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((founder, i) => (
              <Wrapper key={founder.name} {...delayMotion(0.2 + i * 0.1)}>
                <ReifyCard className="rounded-2xl h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric to-purple flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                        {founder.initials}
                      </div>
                      <h4 className="font-display text-xl font-semibold text-white">
                        {founder.name}
                      </h4>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                      {founder.bio}
                    </p>
                  </div>
                </ReifyCard>
              </Wrapper>
            ))}
          </div>

          {/* Together statement */}
          <Wrapper {...delayMotion(0.4)}>
            <p className="mt-10 text-center text-gray-400 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
              Together, they are building FinMark.ai with a clear ambition—to create a unified platform that not only simplifies finance and operations but also empowers businesses to scale with speed, precision, and confidence in an increasingly digital world.
            </p>
          </Wrapper>
        </div>
      </div>
    </section>
  )
}
