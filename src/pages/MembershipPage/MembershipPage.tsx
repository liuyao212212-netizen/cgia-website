import { motion } from 'framer-motion'
import {
  Award,
  Newspaper,
  FileText,
  Radio,
  Newspaper as WeeklyIcon,
  Users,
  Wrench,
  ArrowRight,
} from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import AnimatedSection from '../../components/AnimatedSection'
import GoldButton from '../../components/GoldButton'
import { membersData } from '../../data/members'
import { Link } from 'react-router-dom'

const benefits = [
  {
    icon: Award,
    title: '联盟证书/授牌颁发',
    description: '"中国GEO创新联盟会员"实体牌匾与专属证书，彰显品牌权威背书。',
  },
  {
    icon: Newspaper,
    title: '品牌专栏曝光',
    description: '会员优秀实践案例、人物专访等优质内容，可在国家一级期刊《国际品牌观察》的"GEO创新观察"专栏中刊发。',
  },
  {
    icon: FileText,
    title: '联合署名发布',
    description: '联盟每季度重磅发布《中国GEO行业趋势白皮书》，会员将获列为"联合发起单位"或"技术贡献单位"。',
  },
  {
    icon: Radio,
    title: '全媒体矩阵传播',
    description: '依托联盟、耐特康赛、《国际品牌观察》期刊等旗下公众号、视频号及合作媒体共建全媒体矩阵，为会员重要动态提供专业二次传播服务。',
  },
  {
    icon: WeeklyIcon,
    title: 'GEO全球周报',
    description: '会员每周都将收到联盟整理的全球主流AI搜索工具算法迭代动态及收录规则调整要点（如豆包、千问、元宝、ChatGPT、Gemini等）。',
  },
  {
    icon: Users,
    title: '线下私享会专属',
    description: '依托联盟优质活动资源，每年举办多场高端线下私享沙龙，仅限会员专属参与，深度交流行业前沿。',
  },
  {
    icon: Wrench,
    title: '技术工具池',
    description: '会员可享受联盟专属的GEO工具会员福利（如专属折扣、优先技术支持等），涵盖关键词监测、AI内容生成检测等。',
  },
]

export default function MembershipPage() {
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
              <Award className="w-4 h-4 text-[hsl(50_100%_70%)]" />
              <span className="text-[hsl(50_100%_70%)] text-sm">会员中心</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            <span className="text-gradient-gold">成员权益</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            CGIA尊贵的成员，您将享受以下权益
          </motion.p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                  className="glass-card rounded-2xl p-6 md:p-8 h-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-5 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                    <benefit.icon className="w-6 h-6 text-[hsl(50_100%_70%)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Member List Preview */}
      <section className="py-16 md:py-24">
        <style>{`
          @keyframes memberCardShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes memberCardGlow {
            0%, 100% { box-shadow: 0 0 4px hsl(50 100% 70% / 0.05); }
            50% { box-shadow: 0 0 16px hsl(50 100% 70% / 0.15), 0 0 32px hsl(50 100% 70% / 0.05); }
          }
          .member-card-shiny {
            position: relative;
            overflow: hidden;
            animation: memberCardGlow 3s ease-in-out infinite;
          }
          .member-card-shiny::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1.2px;
            background: linear-gradient(
              110deg,
              hsl(50 100% 70% / 0) 0%,
              hsl(50 100% 70% / 0) 35%,
              hsl(50 100% 85% / 0.5) 45%,
              hsl(50 100% 70% / 0.7) 50%,
              hsl(50 100% 85% / 0.5) 55%,
              hsl(50 100% 70% / 0) 65%,
              hsl(50 100% 70% / 0) 100%
            );
            background-size: 200% 100%;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: memberCardShimmer 4s ease-in-out infinite;
            pointer-events: none;
            mix-blend-mode: screen;
          }
          .member-card-shiny:hover::before {
            animation-duration: 2s;
          }
          .member-card-shiny:hover {
            animation: memberCardGlow 1.5s ease-in-out infinite;
            box-shadow: 0 0 24px hsl(50 100% 70% / 0.25), 0 0 48px hsl(50 100% 70% / 0.1) !important;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="联盟认证成员"
            subtitle="与行业领袖并肩前行"
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membersData.map((member, index) => (
              <AnimatedSection key={member.id} delay={index * 0.1}>
                <Link to={`/members/${member.id}`}>
                  <motion.div
                    whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                    className="member-card-shiny glass-card rounded-2xl p-6 text-center group cursor-pointer h-full"
                  >
                    <div className="w-14 h-14 mx-auto rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-4">
                      <Award className="w-7 h-7 text-[hsl(50_100%_70%)]" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">{member.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                      member.level === 'founding-org'
                        ? 'bg-[hsl(50_100%_70%_/0.15)] text-[hsl(50_100%_70%)]'
                        : 'bg-blue-500/15 text-blue-400'
                    }`}>
                      {member.level === 'founding-org' ? '创始会员单位' : '创始会员先锋'}
                    </span>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 md:py-24 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/bg-cta.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-gradient-gold">期待与您携手</span>
            </h2>
            <p className="text-[hsl(50_100%_70%)] text-lg md:text-xl mb-8 leading-relaxed">
              以生态共建凝聚合力
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GoldButton
                to="/application"
                variant="primary"
                size="lg"
                className="rounded-full"
                shiny
              >
                立即加入 <ArrowRight className="w-5 h-5" />
              </GoldButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
