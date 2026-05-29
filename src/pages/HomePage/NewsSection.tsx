import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle'
import AnimatedSection from '../../components/AnimatedSection'
import { newsData } from '../../data/news'

export default function NewsSection() {
  const latestNews = newsData.slice(0, 3)

  return (
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="联盟最新动态"
          subtitle="了解CGIA最新进展与GEO行业前沿资讯"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news, index) => (
            <AnimatedSection key={news.id} delay={index * 0.15}>
              <Link to="/news">
                <motion.div
                  whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                  className="glass-card rounded-2xl p-6 h-full group cursor-pointer flex flex-col"
                >
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-[hsl(50_100%_70%)] transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                    {news.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[hsl(50_100%_70%)] text-sm group-hover:gap-2 transition-all">
                    <span>查看详情</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
