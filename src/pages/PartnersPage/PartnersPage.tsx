import { motion } from 'framer-motion'
import {
  Handshake,
  Globe,
  Radio,
  Megaphone,
  Newspaper,
  Cpu,
  Network,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import AnimatedSection from '../../components/AnimatedSection'
import GoldButton from '../../components/GoldButton'

const cooperationModes = [
  {
    icon: Handshake,
    title: '战略合作伙伴',
    description: '与行业头部企业、机构建立长期战略合作关系，共同推动GEO生态建设。',
  },
  {
    icon: Globe,
    title: '生态共建伙伴',
    description: '共同开发产品、服务，共建行业标准，实现资源互补与价值共创。',
  },
  {
    icon: Megaphone,
    title: '活动赞助商',
    description: '赞助联盟峰会、沙龙等活动，获得品牌曝光与行业影响力提升。',
  },
  {
    icon: Radio,
    title: '媒体合作伙伴',
    description: '与行业媒体合作，扩大联盟影响力，共建GEO行业传播矩阵。',
  },
]

const resources = [
  {
    icon: Newspaper,
    title: '媒体资源',
    description: '《国际品牌观察》等主流行业媒体，覆盖品牌、营销、科技领域。',
  },
  {
    icon: Cpu,
    title: '技术资源',
    description: 'AI工具、营销技术平台、数据分析工具等前沿技术资源。',
  },
  {
    icon: Network,
    title: '渠道资源',
    description: '国内外GEO组织、行业协会、企业客户等广泛渠道网络。',
  },
  {
    icon: GraduationCap,
    title: '人才资源',
    description: '行业专家、资深从业者、高校科研机构等高端人才库。',
  },
]

export default function PartnersPage() {
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
              <Handshake className="w-4 h-4 text-[hsl(50_100%_70%)]" />
              <span className="text-[hsl(50_100%_70%)] text-sm">生态合作</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            生态<span className="text-gradient-gold">合作</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            携手共建GEO行业生态，共享资源与价值
          </motion.p>
        </div>
      </section>

      {/* Cooperation Modes */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="合作模式"
            subtitle="多元化的合作方式，满足不同伙伴需求"
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cooperationModes.map((mode, index) => (
              <AnimatedSection key={mode.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                  className="glass-card rounded-2xl p-6 md:p-8 h-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-5 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                    <mode.icon className="w-6 h-6 text-[hsl(50_100%_70%)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{mode.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{mode.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="生态资源"
            subtitle="丰富的资源储备，助力合作伙伴快速发展"
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <AnimatedSection key={resource.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                  className="glass-card rounded-2xl p-6 md:p-8 h-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-5 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                    <resource.icon className="w-6 h-6 text-[hsl(50_100%_70%)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{resource.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{resource.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/bg-gold-2.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              成为<span className="text-gradient-gold">合作伙伴</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              无论您是行业企业、技术平台、媒体机构还是行业专家，欢迎与CGIA建立合作，共同推动GEO生态繁荣发展。
            </p>
            <GoldButton to="/contact" variant="primary" size="lg">
              联系合作 <ArrowRight className="w-5 h-5" />
            </GoldButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
