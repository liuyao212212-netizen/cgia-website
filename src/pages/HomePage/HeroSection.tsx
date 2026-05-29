import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GoldButton from '../../components/GoldButton'

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/bg-hero.jpg)` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Shimmer + Glow Styles */}
      <style>{`
        @keyframes heroTitleShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes heroTitleGlow {
          0%, 100% { filter: drop-shadow(0 0 8px hsl(50 100% 70% / 0.3)) drop-shadow(0 0 24px hsl(50 100% 70% / 0.1)); }
          50% { filter: drop-shadow(0 0 16px hsl(50 100% 70% / 0.5)) drop-shadow(0 0 40px hsl(50 100% 70% / 0.2)); }
        }
        .hero-title-shiny {
          background: linear-gradient(
            110deg,
            #d4a843 0%,
            #f5d47a 30%,
            #fff5c2 45%,
            #f5d47a 55%,
            #d4a843 70%,
            #f5d47a 100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: heroTitleShimmer 4s ease-in-out infinite, heroTitleGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title-shiny text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          中国 GEO 创新联盟
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-[#f5d47a] mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          深度共建 GEO 生态，赋能 AI 营销时代
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <GoldButton to="/application" variant="primary" size="lg" className="rounded-full" shiny>
            申请入会 <ArrowRight className="w-5 h-5" />
          </GoldButton>
          <GoldButton to="/membership" variant="outline" size="lg">
            查看成员权益
          </GoldButton>
        </motion.div>
      </div>
    </section>
  )
}
