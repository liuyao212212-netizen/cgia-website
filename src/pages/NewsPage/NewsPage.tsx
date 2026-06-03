import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import AnimatedSection from '../../components/AnimatedSection'
import { api, type ApiNewsItem, API_BASE } from '../../api'

// Fallback 数据 - API 不可用时使用
const fallbackPosts = [
  {
    id: '2026-06-03',
    date: '2026-06-03',
    title: 'AI营销+GEO资讯速递',
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260603.jpg',
    tags: ['AI营销', '算法动态'],
  },
  {
    id: '2026-06-02',
    date: '2026-06-02',
    title: 'AI搜索算法大洗牌，GEO从业者必读',
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260602.jpg',
    tags: ['算法动态', 'AI营销'],
  },
  {
    id: '2026-06-01',
    date: '2026-06-01',
    title: '跨境GEO实战：从0到1的品牌出海策略',
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260601.jpg',
    tags: ['跨境GEO'],
  },
  {
    id: '2026-05-31',
    date: '2026-05-31',
    title: '各大平台收录规则本周变动汇总',
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260531.jpg',
    tags: ['算法动态'],
  },
]

interface DisplayPost {
  id: string
  date: string
  title: string
  poster: string
  tags: string[]
}

function toDisplayPost(item: ApiNewsItem): DisplayPost {
  return {
    id: String(item.id),
    date: item.date,
    title: item.title,
    // API 返回的 image 是 /uploads/xxx.jpg，需拼接 API_BASE
    poster: item.image.startsWith('http') ? item.image : `${API_BASE}${item.image}`,
    tags: item.tags,
  }
}

export default function NewsPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [posts, setPosts] = useState<DisplayPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNews() {
      const data = await api.getNews()
      if (data && data.length > 0) {
        setPosts(data.map(toDisplayPost))
      } else {
        // API 不可用，用 fallback
        setPosts(fallbackPosts as DisplayPost[])
      }
      setLoading(false)
    }
    loadNews()
  }, [])

  return (
    <div>
      {/* Hero - 主海报横幅 */}
      <section className="relative overflow-hidden bg-black">
        <div className="w-full aspect-[21/9] md:aspect-[3/1] relative">
          <img
            src={`${import.meta.env.BASE_URL}images/news-poster-main.jpg`}
            alt="资讯速递"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-6xl font-bold text-[hsl(50_100%_70%)] mb-4"
            >
              资讯速递
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-[hsl(50_100%_70%)] max-w-2xl mx-auto leading-relaxed"
            >
              一站式掌握全球数字营销风向
            </motion.p>
          </div>
        </div>
      </section>

      {/* 日期倒序专题海报列表 */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {loading ? (
            // 加载中
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[hsl(50_100%_70%)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            // 无数据
            <div className="text-center py-20">
              <p className="text-gray-500 text-sm">暂无速递内容</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl overflow-hidden glass-card group cursor-pointer"
                  onClick={() => setPreviewImage(post.poster)}
                >
                  {/* 海报图 */}
                  <div className="w-full aspect-[16/9] relative bg-black">
                    <img
                      src={post.poster}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {/* 放大图标 */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  {/* 底部信息 */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 text-xs">{post.date}</span>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-[hsl(50_100%_70%_/0.15)] text-[hsl(50_100%_70%)] text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white text-base md:text-lg font-semibold">
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))
          )}

          {/* 往期回顾 */}
          <div className="text-center pt-8">
            <p className="text-gray-500 text-sm">更多往期速递持续更新中…</p>
          </div>
        </div>
      </section>

      {/* 大图预览弹窗 */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setPreviewImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              onClick={() => setPreviewImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              src={previewImage}
              alt="速递大图"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
