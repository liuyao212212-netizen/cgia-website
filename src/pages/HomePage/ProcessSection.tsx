import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, CheckCircle, Award } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'

const steps = [
  {
    icon: FileText,
    title: '提交申请',
    description: '通过联盟官网或邀约海报填写报名表单，提交企业/个人信息及行业背景资料。',
  },
  {
    icon: CheckCircle,
    title: '资质审批',
    description: 'CGIA秘书处审批确认会员资质与类型',
  },
  {
    icon: Award,
    title: '认证授牌',
    description: '审批通过后获得联盟专属认证授牌，可领取电子和实体证书权威背书。',
  },
]

function TimelineItem({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex items-center gap-0 md:gap-0">
      {/* Mobile: left timeline + card */}
      <div className="flex md:hidden w-full gap-4">
        {/* Timeline column */}
        <div className="flex flex-col items-center flex-shrink-0 w-8">
          {/* Node */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0.3 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-4 h-4 rounded-full border-2 border-[hsl(50_100%_70%)] bg-[hsl(50_100%_70%)] shadow-[0_0_12px_hsl(50_100%_70%_/0.5)] z-10"
          />
          {/* Line down */}
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ originY: 0 }}
              className="w-px h-full bg-[hsl(50_100%_70%_/0.4)]"
            />
          )}
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 glass-card rounded-xl p-5 mb-8"
        >
          <div className="w-10 h-10 rounded-lg bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-3">
            <step.icon className="w-5 h-5 text-[hsl(50_100%_70%)]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
        </motion.div>
      </div>

      {/* Desktop: alternating layout */}
      <div className="hidden md:flex w-full items-center">
        {/* Left side */}
        <div className="flex-1 flex justify-end pr-8">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 md:p-8 max-w-sm text-right"
            >
              <div className="w-10 h-10 rounded-lg bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center ml-auto mb-3">
                <step.icon className="w-5 h-5 text-[hsl(50_100%_70%)]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          )}
        </div>

        {/* Center timeline */}
        <div className="flex flex-col items-center flex-shrink-0 relative z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0.3 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-5 h-5 rounded-full border-2 border-[hsl(50_100%_70%)] bg-[hsl(50_100%_70%)] shadow-[0_0_16px_hsl(50_100%_70%_/0.5)]"
          />
        </div>

        {/* Right side */}
        <div className="flex-1 flex justify-start pl-8">
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 md:p-8 max-w-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.2)] flex items-center justify-center mb-3">
                <step.icon className="w-5 h-5 text-[hsl(50_100%_70%)]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="入会流程" subtitle="" />

        <div className="mt-16 relative">
          {/* Desktop center timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            {/* Background line */}
            <div className="absolute inset-0 bg-[hsl(50_100%_70%_/0.15)]" />
            {/* Animated fill line */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[hsl(50_100%_70%_/0.5)]"
              initial={{ height: '0%' }}
              animate={isSectionInView ? { height: '100%' } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>

          {/* Steps */}
          <div className="relative space-y-0 md:space-y-16">
            {steps.map((step, index) => (
              <TimelineItem
                key={step.title}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
