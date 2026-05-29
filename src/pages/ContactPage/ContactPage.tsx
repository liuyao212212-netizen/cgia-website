import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, ArrowRight, Clock } from 'lucide-react'
import AnimatedSection from '../../components/AnimatedSection'
import GoldButton from '../../components/GoldButton'

const contactInfo = [
  {
    icon: MessageCircle,
    label: '官方微信',
    value: 'bbly212',
    description: '添加微信，获取一对一咨询服务',
  },
  {
    icon: Phone,
    label: '联系电话',
    value: '15802439194',
    description: '工作日 9:00-18:00',
  },
  {
    icon: Mail,
    label: '电子邮箱',
    value: 'liuyao@netconcepts.cn',
    description: '发送邮件，我们将在24小时内回复',
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(50_100%_70%_/0.3)] bg-[hsl(50_100%_70%_/0.05)] mb-6">
              <MessageCircle className="w-4 h-4 text-[hsl(50_100%_70%)]" />
              <span className="text-[hsl(50_100%_70%)] text-sm">联系我们</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            联系<span className="text-gradient-gold">我们</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            有任何问题或合作意向，欢迎随时联系CGIA秘书处
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={info.label} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -6, borderColor: 'hsl(50 100% 70% / 0.4)' }}
                  className="glass-card rounded-2xl p-8 text-center h-full group"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-5 group-hover:bg-[hsl(50_100%_70%_/0.2)] transition-colors">
                    <info.icon className="w-7 h-7 text-[hsl(50_100%_70%)]" />
                  </div>
                  <h3 className="text-sm text-gray-500 mb-2">{info.label}</h3>
                  <p className="text-xl font-semibold text-white mb-3">{info.value}</p>
                  <p className="text-gray-400 text-sm">{info.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Secretariat Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">CGIA 秘书处</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[hsl(50_100%_70%)] mt-0.5" />
                      <div>
                        <p className="text-white font-medium">负责人</p>
                        <p className="text-gray-400 text-sm">刘瑶</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[hsl(50_100%_70%)] mt-0.5" />
                      <div>
                        <p className="text-white font-medium">工作时间</p>
                        <p className="text-gray-400 text-sm">周一至周五 9:00-18:00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[hsl(50_100%_70%)] mt-0.5" />
                      <div>
                        <p className="text-white font-medium">办公地址</p>
                        <p className="text-gray-400 text-sm">北京市（具体地址请联系确认）</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-white mb-4">申请入会咨询</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    如果您希望加入CGIA成为会员，或了解更多会员权益信息，请通过微信或电话联系我们，秘书处将为您提供详细的入会指导。
                  </p>
                  <GoldButton to="/membership" variant="primary">
                    了解会员权益 <ArrowRight className="w-4 h-4" />
                  </GoldButton>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

// Import Users for the secretariat section
import { Users } from 'lucide-react'
