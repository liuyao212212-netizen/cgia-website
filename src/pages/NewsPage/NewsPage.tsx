import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight, FileText, Radio, BookOpen, PartyPopper } from 'lucide-react'
import AnimatedSection from '../../components/AnimatedSection'
import { newsData } from '../../data/news'

const tabs = [
  { key: 'alliance' as const, label: '联盟新闻', icon: Radio },
  { key: 'industry' as const, label: '行业资讯', icon: FileText },
  { key: 'report' as const, label: '研究报告', icon: BookOpen },
  { key: 'event' as const, label: '活动中心', icon: PartyPopper },
]

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'alliance' | 'industry' | 'report' | 'event'>('alliance')

  const filteredNews = newsData.filter((news) => news.type === activeTab)

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[hsl(50_100%_70%)] mb-6"
          >
            资讯中心
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            了解CGIA最新进展与GEO行业前沿资讯
          </motion.p>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'text-black'
                    : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="newsTab"
                    className="absolute inset-0 bg-[hsl(50_100%_70%)] rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* News Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredNews.length > 0 ? (
                filteredNews.map((news, index) => (
                  <AnimatedSection key={news.id} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                      className="glass-card rounded-2xl p-6 h-full group cursor-pointer flex flex-col"
                    >
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{news.date}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[hsl(50_100%_70%_/0.1)] text-[hsl(50_100%_70%)] text-[10px]">
                          {tabs.find((t) => t.key === news.type)?.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-[hsl(50_100%_70%)] transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {news.summary}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-[hsl(50_100%_70%)] text-sm group-hover:gap-2 transition-all">
                        <span>阅读更多</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500">暂无内容，敬请期待</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
