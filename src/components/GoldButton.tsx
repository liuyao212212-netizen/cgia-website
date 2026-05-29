import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface GoldButtonProps {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  shiny?: boolean
}

export default function GoldButton({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  shiny = false,
}: GoldButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300'

  const variantClasses = {
    primary: shiny
      ? 'gold-btn-shiny text-black hover:scale-105'
      : 'bg-[hsl(50_100%_70%)] text-black hover:shadow-[0_0_30px_hsl(50_100%_70%/_0.4)] hover:scale-105',
    outline:
      'border border-[hsl(50_100%_70%)] text-[hsl(50_100%_70%)] hover:bg-[hsl(50_100%_70%)] hover:text-black',
    ghost:
      'text-[hsl(50_100%_70%)] hover:bg-[hsl(50_100%_70%_/0.1)]',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const MotionWrapper = ({ children: child }: { children: ReactNode }) => (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      {child}
    </motion.span>
  )

  const ButtonContent = (
    <>
      {shiny && variant === 'primary' && (
        <style>{`
          @keyframes goldBtnShimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes goldBtnGlow {
            0%, 100% { box-shadow: 0 0 12px hsl(50 100% 70% / 0.3), 0 0 30px hsl(50 100% 70% / 0.1); }
            50% { box-shadow: 0 0 24px hsl(50 100% 70% / 0.6), 0 0 60px hsl(50 100% 70% / 0.25); }
          }
          .gold-btn-shiny {
            background: linear-gradient(
              110deg,
              #d4a843 0%,
              #f5d47a 25%,
              #fff5c2 40%,
              #f5d47a 55%,
              #d4a843 75%,
              #f5d47a 100%
            );
            background-size: 250% 100%;
            animation: goldBtnShimmer 3s ease-in-out infinite, goldBtnGlow 2.5s ease-in-out infinite;
            position: relative;
            overflow: hidden;
          }
          .gold-btn-shiny::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              110deg,
              transparent 0%,
              hsl(50 100% 95% / 0.4) 45%,
              transparent 55%
            );
            background-size: 250% 100%;
            animation: goldBtnShimmer 3s ease-in-out infinite;
            pointer-events: none;
          }
        `}</style>
      )}
      {to ? (
        <Link to={to} className={classes} onClick={onClick}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button className={classes} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  )

  return (
    <MotionWrapper>
      {ButtonContent}
    </MotionWrapper>
  )
}
