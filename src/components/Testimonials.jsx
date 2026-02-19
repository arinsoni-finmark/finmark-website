import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { TESTIMONIALS } from '../lib/constants'
import SectionWrapper from './ui/SectionWrapper'
import GlowBadge from './ui/GlowBadge'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <GlowBadge>Testimonials</GlowBadge>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Trusted by Finance Leaders
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            See what industry leaders say about transforming their operations with Finmark.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="glass rounded-2xl p-6 h-full flex flex-col">
                <Quote size={28} className="text-electric/30 mb-4" />
                <p className="text-gray-300 leading-relaxed flex-1">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-purple flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionWrapper>
  )
}
