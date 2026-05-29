import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface GradientButtonProps {
  children: ReactNode
  to?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function GradientButton({
  children,
  to,
  href,
  size = 'md',
  className = '',
  onClick,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'gradient-btn-sm',
    md: 'gradient-btn-md',
    lg: 'gradient-btn-lg',
  }

  const innerClass = `gradient-btn ${sizeClasses[size]} ${className}`

  const gradientLayers = [
    { delay: '0s', duration: '25s' },
    { delay: '0.15s', duration: '15.9s' },
    { delay: '0.53s', duration: '26.4s' },
    { delay: '0.45s', duration: '17.8s' },
    { delay: '1.6s', duration: '19.2s' },
    { delay: '1.6s', duration: '29.2s' },
    { delay: '1.6s', duration: '20.2s' },
  ]

  const content = (
    <div className="btn-wrapper">
      <div className="btn-light" />
      {gradientLayers.map((layer, i) => (
        <div
          key={i}
          className="gradient-layer"
          style={{
            animationDelay: layer.delay,
            animationDuration: layer.duration,
          }}
        />
      ))}
      {to ? (
        <Link to={to} className={innerClass} onClick={onClick}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={innerClass} onClick={onClick}>
          {children}
        </a>
      ) : (
        <button className={innerClass} onClick={onClick}>
          {children}
        </button>
      )}
      <div className={`text-overlay ${sizeClasses[size]}`}>{children}</div>
    </div>
  )

  return content
}
