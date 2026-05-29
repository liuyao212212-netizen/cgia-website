import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, Mail, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'

// CGIA Logo - 新logo，透明底，无框
const BASE = import.meta.env.BASE_URL
const cgiaLogoUrl = BASE + 'images/cgia-logo-new.png'

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    // 强制回到顶部，兼容所有浏览器和移动端
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname])

  const navLinks = [
    { label: '首页', to: '/' },
    { label: '关于CGIA', to: '/about' },
    { label: '会员中心', to: '/membership' },
    { label: '联盟资讯中心', to: '/news' },
  ]

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen text-white bg-black relative">
      {/* 黑金背景图 */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-40"
        style={{ backgroundImage: `url(${BASE}images/bg-gold-1.jpg)` }}
      />

      {/* 背景叠加层 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-[100px] md:blur-[150px]"
          style={{ background: 'hsl(50 100% 70% / 0.08)' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-56 md:w-80 h-56 md:h-80 rounded-full blur-[80px] md:blur-[120px]"
          style={{ background: 'hsl(50 100% 70% / 0.05)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>

      {/* 导航栏 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - 更大，透明底，无框 */}
            <NavLink to="/" className="flex items-center gap-3 md:gap-4">
              <motion.img
                src={cgiaLogoUrl}
                alt="CGIA"
                className="h-10 md:h-14 w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={() =>
                    `px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActivePath(link.to)
                        ? 'text-[hsl(50_100%_70%)] bg-[hsl(50_100%_70%_/0.1)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/application"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium border border-[hsl(50_100%_70%)] text-[hsl(50_100%_70%)] hover:bg-[hsl(50_100%_70%)] hover:text-black transition-all duration-300"
              >
                申请入会
              </NavLink>
            </div>

            {/* Mobile: 申请入会 CTA + Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <NavLink
                to="/application"
                className="px-3 py-1.5 rounded-md text-xs font-medium border border-[hsl(50_100%_70%)] text-[hsl(50_100%_70%)] hover:bg-[hsl(50_100%_70%)] hover:text-black transition-all duration-300"
              >
                申请入会
              </NavLink>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={() =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActivePath(link.to)
                          ? 'text-[hsl(50_100%_70%)] bg-[hsl(50_100%_70%_/0.1)]'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/application"
                  className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg text-sm font-medium border border-[hsl(50_100%_70%)] text-[hsl(50_100%_70%)] hover:bg-[hsl(50_100%_70%)] hover:text-black transition-all duration-300"
                >
                  申请入会
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex flex-col items-start gap-2 mb-4">
                <img
                  src={cgiaLogoUrl}
                  alt="CGIA"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-bold text-lg">中国 GEO 创新联盟</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                深度共建GEO生态，赋能AI营销时代
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-[hsl(50_100%_70%)] font-semibold mb-4 text-sm">快速导航</h3>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="block text-gray-400 text-sm hover:text-[hsl(50_100%_70%)] transition-colors"
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/application"
                  className="block text-gray-400 text-sm hover:text-[hsl(50_100%_70%)] transition-colors"
                >
                  申请入会
                </NavLink>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[hsl(50_100%_70%)] font-semibold mb-4 text-sm">联系我们</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-[hsl(50_100%_70%)]" />
                  <span>15802439194</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-[hsl(50_100%_70%)]" />
                  <span>liuyao@netconcepts.cn</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Globe className="w-4 h-4 text-[hsl(50_100%_70%)]" />
                  <span>微信：bbly212</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              &copy; 2026 中国 GEO 创新联盟 (CGIA). All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              联合发起：《国际品牌观察》杂志社 × CGIA 秘书处
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
