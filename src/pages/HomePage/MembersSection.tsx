import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionTitle from '../../components/SectionTitle'
import AnimatedSection from '../../components/AnimatedSection'
import { membersData } from '../../data/members'

export default function MembersSection() {
  const [activeTab, setActiveTab] = useState<'founding-org' | 'founding-pioneer'>('founding-org')

  const filteredMembers = membersData.filter((m) => m.level === activeTab)

  const tabs = [
    { key: 'founding-org' as const, label: '创始会员单位' },
    { key: 'founding-pioneer' as const, label: '创始会员先锋' },
  ]

  return (
    <section className="relative py-20 md:py-32">
      {/* Card shimmer + glow animations */}
      <style>{`
        @keyframes cardShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 4px hsl(50 100% 70% / 0.05); }
          50% { box-shadow: 0 0 16px hsl(50 100% 70% / 0.15), 0 0 32px hsl(50 100% 70% / 0.05); }
        }
        .member-card-shiny {
          position: relative;
          overflow: hidden;
          animation: cardGlow 3s ease-in-out infinite;
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
          animation: cardShimmer 4s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .member-card-shiny:hover::before {
          animation-duration: 2s;
        }
        .member-card-shiny:hover {
          animation: cardGlow 1.5s ease-in-out infinite;
          box-shadow: 0 0 24px hsl(50 100% 70% / 0.25), 0 0 48px hsl(50 100% 70% / 0.1) !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="联盟认证成员"
          subtitle="汇聚行业头部企业、核心平台方与技术专家"
        />

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="memberTab"
                    className="absolute inset-0 bg-[hsl(50_100%_70%)] rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Members Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredMembers.map((member, index) => (
              <AnimatedSection key={member.id} delay={index * 0.1}>
                <Link to={`/members/${member.id}`}>
                  <motion.div
                    whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                    className="member-card-shiny glass-card rounded-2xl p-6 text-center group cursor-pointer h-full"
                  >
                    <div className="w-16 h-16 mx-auto rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-4 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                      <Trophy className="w-8 h-8 text-[hsl(50_100%_70%)]" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">{member.name}</h3>
                    <div className="mb-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[hsl(50_100%_70%_/0.15)] text-[hsl(50_100%_70%)] border border-[hsl(50_100%_70%_/0.3)]">
                        {member.honors[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[hsl(50_100%_70%)] text-xs group-hover:gap-2 transition-all">
                      <span>查看详情</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 text-[hsl(50_100%_70%)] hover:gap-3 transition-all text-sm"
          >
            查看全部成员 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
