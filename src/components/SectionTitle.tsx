import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionTitle({ title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      <div className={`flex items-center gap-4 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-[hsl(50_100%_70%)]" />
        <span className="text-[hsl(50_100%_70%)] text-sm font-medium tracking-widest uppercase">
          CGIA
        </span>
        <div className="h-px w-12 bg-[hsl(50_100%_70%)]" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
