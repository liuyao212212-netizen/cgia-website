import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import GoldButton from '../../components/GoldButton'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl md:text-9xl font-bold text-gradient-gold mb-4">404</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-white mb-4"
        >
          页面未找到
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-400 mb-8 max-w-md mx-auto"
        >
          您访问的页面不存在或已被移除。请返回首页或浏览其他页面。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GoldButton to="/" variant="primary">
            <Home className="w-4 h-4" />
            返回首页
          </GoldButton>
          <GoldButton to="/membership" variant="outline">
            <ArrowLeft className="w-4 h-4" />
            会员中心
          </GoldButton>
        </motion.div>
      </div>
    </div>
  )
}
