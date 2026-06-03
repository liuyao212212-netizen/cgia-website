import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'
import { api, type ApiNewsItem, API_BASE } from '../../api'

export default function NewsSection() {
  const [latestPost, setLatestPost] = useState<ApiNewsItem | null>(null)

  useEffect(() => {
    async function loadLatest() {
      const data = await api.getNews()
      if (data && data.length > 0) {
        setLatestPost(data[0]) // 最新的那条
      }
    }
    loadLatest()
  }, [])

  // 精选速递海报图：API 有数据就用最新的，没有就用今日海报
  const featuredImage = latestPost
    ? (latestPost.image.startsWith('http') ? latestPost.image : `${API_BASE}${latestPost.image}`)
    : `${import.meta.env.BASE_URL}images/news-daily-20260603.jpg`

  const featuredTitle = latestPost?.title || 'AI营销+GEO资讯速递'
  const featuredTags = latestPost?.tags || ['AI营销', '算法动态']

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 头部标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[hsl(50_100%_70%)] mb-4">
            资讯速递
          </h2>
          <p className="text-base md:text-lg text-[hsl(50_100%_70%)] max-w-2xl mx-auto leading-relaxed">
            聚焦GEO&AI营销全行业前沿资讯
          </p>
        </motion.div>

        {/* 主海报 - 全屏展示 */}
        <AnimatedSection delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden mb-8 group cursor-pointer bg-black">
            <div className="w-full aspect-[16/7] md:aspect-[21/9] relative">
              <img
                src={`${import.meta.env.BASE_URL}images/news-poster-main.jpg`}
                alt="资讯速递"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* 海报遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <p className="text-sm md:text-base text-[hsl(50_100%_70%)] font-medium mb-2">
                资讯速递
              </p>
              <p className="text-white/70 text-xs md:text-sm">
                一站式掌握全球数字营销风向
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* 精选速递卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 精选速递 - 占2列 */}
          <AnimatedSection delay={0.2} className="md:col-span-2">
            <Link to="/news">
              <motion.div
                whileHover={{ y: -4 }}
                className="relative rounded-2xl overflow-hidden glass-card group cursor-pointer"
              >
                <div className="w-full aspect-[16/9] relative bg-black">
                  <img
                    src={featuredImage}
                    alt={featuredTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {/* 角标 */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {featuredTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-[hsl(50_100%_70%)] text-black text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-lg font-semibold mb-2">{featuredTitle}</p>
                  <p className="text-gray-400 text-sm">每日定时更新行业干货、平台新规、营销趋势</p>
                </div>
              </motion.div>
            </Link>
          </AnimatedSection>

          {/* 右侧 - 速递概览 + 按钮 */}
          <AnimatedSection delay={0.3}>
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-[hsl(50_100%_70%)]" />
                  <span className="text-[hsl(50_100%_70%)] font-semibold">速递概览</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(50_100%_70%)] mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">AI搜索算法最新变动解读</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(50_100%_70%)] mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">跨境GEO实战案例分析</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(50_100%_70%)] mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">各平台收录规则变化速报</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(50_100%_70%)] mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">GEO行业趋势与数据洞察</p>
                  </div>
                </div>
              </div>
              <Link
                to="/news"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[hsl(50_100%_70%)] text-black font-medium text-sm hover:scale-105 transition-transform duration-300"
              >
                查看全部速递 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
