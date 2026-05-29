import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GradientButton from '../../components/GradientButton'

export default function JoinSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-cta.jpg)` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Gold glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(50_100%_70%_/0.05)] blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          <span className="text-gradient-gold">期待与您携手</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[hsl(50_100%_70%)] mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          以生态共建凝聚合力
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GradientButton to="/application" size="lg">
            立即加入 <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </div>
    </section>
  )
}
