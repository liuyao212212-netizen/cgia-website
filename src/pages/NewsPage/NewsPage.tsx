import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Tag, ChevronRight } from 'lucide-react'
import AnimatedSection from '../../components/AnimatedSection'
import { api, type ApiNewsItem, API_BASE } from '../../api'

// ===== 文章内容数据 =====
// 从海报提取的完整文章内容
const articleContent: Record<string, NewsArticle> = {
  '2026-06-03': {
    id: '2026-06-03',
    date: '2026-06-03',
    title: 'AI营销+GEO资讯速递',
    subtitle: '每日精选全球AI营销与GEO领域最新动态',
    tags: ['AI营销', '算法动态', 'NVIDIA', 'Claude', '微软'],
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260603.jpg',
    sections: [
      {
        heading: '领英首发新增推流型AI工具 Marketing AI Beta',
        content: '领英（LinkedIn）正式推出 Marketing AI Beta 工具，专为B2B营销场景设计。该工具基于大语言模型，能够根据用户画像自动生成个性化推广文案、优化投放策略，并实时分析广告效果。对于GEO从业者而言，这意味着可以更精准地触达目标受众，提升品牌搜索可见度。',
        highlight: true,
      },
      {
        heading: 'Mistral AI：快速本地部署，开源训练精简高性能模型',
        content: 'Mistral AI 发布新一代轻量级开源模型，支持在个人设备上快速本地部署。该模型参数量精简但性能不打折，特别适用于数据隐私要求高的企业场景。GEO从业者可以借助此类工具，在不泄露商业数据的前提下，完成内容生成和语义分析工作。',
      },
      {
        heading: 'NVIDIA 推出 NeuroClip AI，助力工业芯片/物联网等AI工作负载',
        content: 'NVIDIA 发布 NeuroClip AI 平台，专为工业级芯片和物联网设备优化。该平台能够在边缘计算环境中高效运行AI推理任务，大幅降低延迟和能耗。对于需要实时响应的GEO应用场景（如动态内容优化、实时搜索排名调整），边缘AI能力将成为关键竞争优势。',
      },
      {
        heading: 'Claude Code 新增边角料工件功能：超长上下文推理、工效具增强',
        content: 'Anthropic 旗下 Claude Code 迎来重大更新，新增"边角料工件"（Artifact）功能，支持超长上下文推理和工具链增强。开发者可以将完整的代码库、文档集作为上下文输入，Claude 能够理解跨文件的复杂依赖关系。对于GEO技术团队，这意味着可以更高效地处理大规模网站结构优化任务。',
      },
      {
        heading: '微软发布开源框架：用水文标注训练更精准的AI评分/提案',
        content: '微软研究院开源了一个基于水文标注（Hydraulic Annotation）的AI训练框架，能够生成更高质量的评分和提案模型。该框架通过模拟信息流动机制，让模型更准确地理解内容之间的关联性。在GEO领域，这一技术可应用于内容质量评估和搜索相关性打分。',
      },
      {
        heading: 'GitHub Copilot 应用：智能体原生协作体研发',
        content: 'GitHub 宣布 Copilot 将向"智能体原生"（Agent-Native）架构演进，支持多智能体协作编程。新架构下，多个AI助手可以分工协作，自动完成代码审查、测试生成、文档编写等任务。GEO开发团队可借助这一能力，加速SEO工具和数据分析平台的开发迭代。',
      },
      {
        heading: '金碚AI IPIO基准采用交互情报和众包AI推理协作',
        content: '金碚AI 发布 IPIO（Interactive & Participatory Intelligence Optimization）基准测试，首次将交互情报和众包AI推理纳入评估体系。该基准强调AI系统在人机协作场景下的表现，而非单纯的自动化指标。对于GEO行业，这预示着未来内容优化将更注重人机协同质量。',
      },
      {
        heading: 'NVIDIA JetPack 7.2 支持内存优化的边缘智能体部署',
        content: 'NVIDIA JetPack SDK 7.2 版本发布，重点优化了边缘设备上的内存管理和智能体部署能力。新版本支持在内存受限的嵌入式设备上运行多智能体系统，为物联网和边缘AI应用打开了新的可能性。GEO从业者可关注其在本地化搜索和个性化推荐方面的应用潜力。',
      },
      {
        heading: 'Alphabet 收购新创600亿美元 Anthropic 股份，IPO预备',
        content: 'Alphabet（Google母公司）被曝正在洽谈收购AI初创公司Anthropic的股份，估值高达600亿美元。此次收购若完成，将进一步巩固Google在生成式AI领域的领先地位。对于依赖Google搜索生态的GEO从业者，需密切关注其AI搜索产品（如AI Overviews）的算法变化。',
      },
      {
        heading: 'Anthropic 旗下"菌中Project"Glasswing计划',
        content: 'Anthropic 启动内部代号"Glasswing"的秘密项目，旨在开发更透明的AI决策机制。该项目致力于让大语言模型的推理过程可视化，帮助用户理解AI为何给出特定答案。在GEO领域，这种"可解释AI"技术有望提升内容优化策略的可追溯性和可信度。',
      },
    ],
  },
  '2026-06-02': {
    id: '2026-06-02',
    date: '2026-06-02',
    title: 'AI搜索算法大洗牌，GEO从业者必读',
    subtitle: 'Google、Bing、百度等平台搜索算法最新变动全解析',
    tags: ['算法动态', 'AI营销', '搜索引擎'],
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260602.jpg',
    sections: [
      {
        heading: 'Google AI Overviews 全面覆盖英语搜索',
        content: 'Google 宣布 AI Overviews 功能已覆盖全部英语搜索市场，非英语市场也在加速推进。这一变化意味着传统SEO流量将进一步被AI摘要分流，GEO（生成式引擎优化）策略的重要性日益凸显。',
      },
      {
        heading: 'Bing 深度整合 Copilot，搜索体验重构',
        content: 'Microsoft Bing 完成与 Copilot 的深度整合，新搜索界面将AI对话与搜索结果无缝融合。用户可以直接在搜索页与AI交互，获取个性化答案。对于品牌而言，需要重新思考如何在AI对话中获得曝光。',
      },
      {
        heading: '百度文心一言接入搜索，中文GEO新机遇',
        content: '百度正式将文心一言大模型接入百度搜索，推出"AI伙伴"功能。中文搜索生态正在经历类似Google的AI化转型，为中文GEO市场带来了全新的优化空间和商业机会。',
      },
    ],
  },
  '2026-06-01': {
    id: '2026-06-01',
    date: '2026-06-01',
    title: '跨境GEO实战：从0到1的品牌出海策略',
    subtitle: '中国企业如何利用GEO技术实现全球化品牌布局',
    tags: ['跨境GEO', '品牌出海'],
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260601.jpg',
    sections: [
      {
        heading: 'GEO在跨境电商中的核心价值',
        content: '随着AI搜索的普及，跨境电商的流量获取方式正在发生根本性变化。传统的关键词排名优化已不能满足需求，品牌需要在AI生成的答案中占据一席之地。',
      },
      {
        heading: '多语言GEO内容策略',
        content: '针对不同市场的语言和文化特点，制定差异化的GEO内容策略。包括本地化的品牌故事、符合当地搜索习惯的内容结构，以及跨平台的品牌一致性管理。',
      },
    ],
  },
  '2026-05-31': {
    id: '2026-05-31',
    date: '2026-05-31',
    title: '各大平台收录规则本周变动汇总',
    subtitle: 'Google、百度、小红书、抖音等平台最新收录机制解读',
    tags: ['算法动态'],
    poster: import.meta.env.BASE_URL + 'images/news-daily-20260531.jpg',
    sections: [
      {
        heading: 'Google 核心算法更新',
        content: '本周Google推出新一轮核心算法更新，重点打击低质量AI生成内容，同时提升原创性和专业度高的页面排名。',
      },
      {
        heading: '小红书搜索权重调整',
        content: '小红书调整了搜索排序权重，笔记的互动率（点赞、收藏、评论）和账号粉丝量对排名的影响进一步加强。',
      },
    ],
  },
}

// ===== 类型定义 =====
interface ArticleSection {
  heading: string
  content: string
  highlight?: boolean
}

interface NewsArticle {
  id: string
  date: string
  title: string
  subtitle: string
  tags: string[]
  poster: string
  sections: ArticleSection[]
}

interface DisplayPost {
  id: string
  date: string
  title: string
  subtitle: string
  tags: string[]
  poster: string
}

// ===== 辅助函数 =====
function toDisplayPost(item: ApiNewsItem): DisplayPost {
  const article = articleContent[item.date]
  return {
    id: String(item.id),
    date: item.date,
    title: item.title,
    subtitle: article?.subtitle || '每日精选GEO行业最新动态',
    tags: item.tags,
    poster: item.image.startsWith('http') ? item.image : `${API_BASE}${item.image}`,
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// ===== 文章详情页 =====
function ArticleDetail({ article, onBack }: { article: NewsArticle; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#03040a]"
    >
      {/* 返回按钮 + 顶部封面 */}
      <div className="relative">
        <div className="w-full aspect-[21/9] md:aspect-[3/1] relative bg-black">
          <img
            src={article.poster}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#03040a]" />
        </div>

        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-sm text-white text-sm hover:bg-black/70 transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </button>

        {/* 标题覆盖 */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-6 md:pb-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1 text-gray-400 text-xs">
                <Clock className="w-3 h-3" />
                {formatDate(article.date)}
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-[hsl(50_100%_70%_/0.12)] text-[hsl(50_100%_70%)] text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-[hsl(50_100%_70%)] leading-tight">
              {article.title}
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-2">{article.subtitle}</p>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <article className="space-y-8">
          {article.sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`rounded-2xl p-5 md:p-6 ${
                section.highlight
                  ? 'bg-[hsl(50_100%_70%_/0.06)] border border-[hsl(50_100%_70%_/0.15)]'
                  : 'bg-white/[0.03] border border-white/[0.06]'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    section.highlight
                      ? 'bg-[hsl(50_100%_70%)] text-black'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {i + 1}
                </span>
                <h2 className="text-white text-base md:text-lg font-semibold leading-snug pt-0.5">
                  {section.heading}
                </h2>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed pl-10">
                {section.content}
              </p>
            </motion.section>
          ))}
        </article>

        {/* 底部 */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">内容来源：CGIA 资讯速递整理</p>
          <p className="text-gray-600 text-xs mt-1">转载请注明出处</p>
        </div>
      </div>
    </motion.div>
  )
}

// ===== 列表页卡片 =====
function ArticleCard({
  post,
  index,
  onClick,
}: {
  post: DisplayPost
  index: number
  onClick: () => void
}) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group cursor-pointer"
        onClick={onClick}
      >
        <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-[hsl(50_100%_70%_/0.2)] transition-all duration-300">
          {/* 顶部图片区域 */}
          <div className="relative h-40 md:h-48 overflow-hidden">
            <img
              src={post.poster}
              alt={post.title}
              className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-[#03040a]/60 to-transparent" />
            {/* 日期标签 */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[hsl(50_100%_70%)] text-xs font-medium">
                {formatDate(post.date)}
              </span>
            </div>
            {/* 标签组 */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-[hsl(50_100%_70%_/0.12)] text-[hsl(50_100%_70%)] text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="p-5 md:p-6">
            <h3 className="text-white text-lg md:text-xl font-bold leading-snug group-hover:text-[hsl(50_100%_70%)] transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">
              {post.subtitle}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-gray-600 text-xs flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {post.tags.join(' · ')}
              </span>
              <span className="text-[hsl(50_100%_70%)] text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                阅读全文
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

// ===== 主页面 =====
export default function NewsPage() {
  const [posts, setPosts] = useState<DisplayPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  useEffect(() => {
    async function loadNews() {
      const data = await api.getNews()
      if (data && data.length > 0) {
        setPosts(data.map(toDisplayPost))
      } else {
        // API 不可用，用 fallback
        setPosts(
          Object.values(articleContent).map((a) => ({
            id: a.id,
            date: a.date,
            title: a.title,
            subtitle: a.subtitle,
            tags: a.tags,
            poster: a.poster,
          }))
        )
      }
      setLoading(false)
    }
    loadNews()
  }, [])

  // 如果选中了文章，显示详情页
  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
  }

  return (
    <div>
      {/* Hero - 顶部横幅 */}
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

      {/* 文章列表 */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 列表标题 */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-lg md:text-xl font-bold">往期速递</h2>
            <span className="text-gray-500 text-xs">共 {posts.length} 篇</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[hsl(50_100%_70%)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-sm">暂无速递内容</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <ArticleCard
                  key={post.id}
                  post={post}
                  index={index}
                  onClick={() => {
                    const article = articleContent[post.date]
                    if (article) {
                      setSelectedArticle(article)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* 底部提示 */}
          <div className="text-center pt-12">
            <p className="text-gray-500 text-sm">更多往期速递持续更新中…</p>
          </div>
        </div>
      </section>
    </div>
  )
}
