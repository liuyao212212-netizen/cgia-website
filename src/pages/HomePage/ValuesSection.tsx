import { motion } from 'framer-motion'
import { Shield, Target, Globe, Handshake } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import AnimatedSection from '../../components/AnimatedSection'

const values = [
  {
    icon: Shield,
    title: '官方品牌背书',
    description: '依托国家一级期刊《国际品牌观察》及联盟权威背书，提升企业品牌公信力与行业影响力。',
  },
  {
    icon: Target,
    title: '行业标准共建',
    description: '参与制定GEO行业技术标准与最佳实践，引领AI搜索时代品牌营销新范式。',
  },
  {
    icon: Globe,
    title: '全球生态资源',
    description: '对接全球主流AI搜索平台、数字营销渠道及行业专家网络，拓展商业边界。',
  },
  {
    icon: Handshake,
    title: '精准商机对接',
    description: '通过联盟活动与会员网络，高效匹配商业合作机会，实现资源精准对接。',
  },
]

export default function ValuesSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="联盟核心价值"
          subtitle="加入CGIA，获得全方位的品牌赋能与资源支持"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-card rounded-2xl p-6 md:p-8 h-full group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-5 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                  <value.icon className="w-6 h-6 text-[hsl(50_100%_70%)]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
