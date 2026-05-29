import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Users, BookOpen, X } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import AnimatedSection from '../../components/AnimatedSection'

const gbiDetail = {
  title: '《国际品牌观察》杂志社',
  content: [
    '《国际品牌观察》是中国商务广告协会主管主办的中央级权威品牌财经期刊，创刊于1985年，拥有国内统一刊号CN11-5938/F、国际标准刊号ISSN 1674-9863，面向国内外公开发行。',
    '杂志社由中国商务广告协会会长李西沙担任名誉社长，中国传媒大学教授、国家广告研究院院长丁俊杰任社长，耐特康赛创始人/董事长兼CEO渠成出任总编辑；编委会汇聚分众传媒、蓝色光标、荣耀、快手、恒源祥等数十家头部企业高管及顶尖高校专家学者，构建了覆盖政、产、学、研全链条的权威资源体系。',
    '深耕品牌管理、市场营销、广告创意、品牌出海等领域40余年，是政府高层决策、企业品牌建设的重要专业参考，全网覆盖用户超1000万，已成为中国品牌领域极具公信力的核心传播阵地与行业智库。',
  ],
}

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(50_100%_70%_/0.3)] bg-[hsl(50_100%_70%_/0.05)] mb-6">
              <BookOpen className="w-4 h-4 text-[hsl(50_100%_70%)]" />
              <span className="text-[hsl(50_100%_70%)] text-sm">关于 CGIA</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#f5d47a] mb-6"
          >
            中国 GEO 创新联盟
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            深度共建 GEO 生态，赋能 AI 营销时代
          </motion.p>
        </div>
      </section>

      {/* Alliance Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[hsl(50_100%_70%)] mb-4">联盟介绍</h2>
                <p className="text-gray-400 leading-relaxed">
                  在生成式 AI 全面重塑搜索生态的时代，品牌的"AI 可见性"已成为企业数字化竞争的核心要素。中国 GEO 创新联盟（CGIA）应运而生，以"深度共建 GEO 生态，赋能 AI 营销时代"为使命，汇聚行业头部企业、核心平台方、技术专家与权威学者，致力于打造推动 GEO 技术落地、助力企业数据资产增值与品牌增长的生态共同体。
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[hsl(50_100%_70%)] mb-3">使命愿景</h3>
                <p className="text-gray-400 leading-relaxed">
                  深度共建 GEO 生态，赋能 AI 营销时代。我们致力于成为中国 GEO 行业的引领者，推动 GEO 技术标准化、产业化，帮助更多企业在 AI 搜索时代获得品牌竞争优势。
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="组织架构"
            subtitle="完善的治理体系，保障联盟高效运转"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-5">
                  <Building2 className="w-8 h-8 text-[hsl(50_100%_70%)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">理事会</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  联盟最高决策机构，负责制定联盟发展战略、重大决策及会员资质审批。
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-5">
                  <Users className="w-8 h-8 text-[hsl(50_100%_70%)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">秘书处</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  日常运营管理机构，负责会员服务、活动策划、资源对接及联盟品牌推广
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Co-founder */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="联合发起方"
            subtitle="强强联合，共建GEO行业生态"
          />

          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.01, borderColor: 'hsl(50 100% 70% / 0.4)' }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setModalOpen(true)}
              className="mt-12 glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={import.meta.env.BASE_URL + 'images/logo-guojipinpai.png'}
                    alt="《国际品牌观察》杂志社"
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[hsl(50_100%_70%)] transition-colors">
                    《国际品牌观察》杂志社
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    国家一级期刊出版单位，长期关注全球品牌发展趋势与数字营销创新。作为CGIA联合发起方，杂志社将为联盟提供权威媒体背书、行业资源对接及品牌传播支持。
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {['权威媒体', '行业资源', '品牌传播', '期刊出版'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs bg-[hsl(50_100%_70%_/0.1)] text-[hsl(50_100%_70%)] border border-[hsl(50_100%_70%_/0.2)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[hsl(50_100%_70%_/0.2)] bg-[#0a0a0a] p-6 md:p-10"
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="flex flex-col items-start gap-4 mb-8">
                <div className="w-full max-w-[280px] h-16 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden px-4">
                  <img
                    src={import.meta.env.BASE_URL + 'images/logo-guojipinpai-wide.png'}
                    alt="《国际品牌观察》杂志社"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {gbiDetail.title}
                  </h2>
                  <p className="text-[hsl(50_100%_70%)] text-sm mt-1">
                    CGIA 联合发起方
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[hsl(50_100%_70%_/0.15)] mb-6" />

              {/* Content */}
              <div className="space-y-5">
                {gbiDetail.content.map((paragraph, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
