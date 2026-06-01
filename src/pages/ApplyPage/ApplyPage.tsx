import { motion } from 'framer-motion'
import { Building2, User, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ApplyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-particles.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[hsl(50_100%_70%)] mb-4"
          >
            中国GEO创新联盟 · 入会申请
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[hsl(50_100%_70%)] max-w-2xl mx-auto leading-relaxed"
          >
            选择您对应的申请通道
          </motion.p>
        </div>
      </section>

      {/* Selection Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Company Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/apply/company"
                className="block glass-card rounded-2xl p-8 md:p-10 group hover:border-[hsl(50_100%_70%_/0.4)] transition-all duration-300 h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-6 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                  <Building2 className="w-8 h-8 text-[hsl(50_100%_70%)]" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[hsl(50_100%_70%)] mb-3">
                  单位申请
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  适用对象：企业、机构、公司
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[hsl(50_100%_70%)] text-black font-medium text-sm hover:scale-105 transition-transform duration-300">
                  立即申请（单位会员）
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>

            {/* Personal Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/apply/person"
                className="block glass-card rounded-2xl p-8 md:p-10 group hover:border-[hsl(50_100%_70%_/0.4)] transition-all duration-300 h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-6 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                  <User className="w-8 h-8 text-[hsl(50_100%_70%)]" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[hsl(50_100%_70%)] mb-3">
                  个人申请
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  适用对象：行业从业者、专家、独立负责人
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[hsl(50_100%_70%)] text-black font-medium text-sm hover:scale-105 transition-transform duration-300">
                  立即申请（个人会员）
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
