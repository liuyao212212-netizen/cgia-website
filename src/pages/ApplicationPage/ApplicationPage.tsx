import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Building2, User, Phone, Mail, Briefcase, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'

// 飞书群机器人 Webhook URL（替换为你的实际地址）
const FEISHU_WEBHOOK_URL = ''

interface FormData {
  memberType: string
  companyName: string
  contactName: string
  position: string
  phone: string
  email: string
  resources: string[]
}

const resourceOptions = [
  '获取GEO前沿方法论与行业洞察',
  '获得GEO技术支持与解决方案',
  '拓展商业合作机会',
  '提升品牌在AI时代的可见性',
  '参与GEO联合研究项目',
  '其他',
]

export default function ApplicationPage() {
  const [form, setForm] = useState<FormData>({
    memberType: '单位会员',
    companyName: '',
    contactName: '',
    position: '',
    phone: '',
    email: '',
    resources: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const toggleResource = (value: string) => {
    setForm(prev => {
      const exists = prev.resources.includes(value)
      if (exists) {
        return { ...prev, resources: prev.resources.filter(r => r !== value) }
      }
      return { ...prev, resources: [...prev.resources, value] }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // 构建飞书卡片消息
    const feishuMessage = {
      msg_type: 'interactive',
      card: {
        header: {
          title: { tag: 'plain_text', content: '🆕 CGIA 入盟申请' },
          template: 'gold',
        },
        elements: [
          {
            tag: 'div',
            fields: [
              { is_short: true, text: { tag: 'lark_md', content: `**申请类型**\n${form.memberType}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**单位全称**\n${form.companyName || '未填写'}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**联系人**\n${form.contactName}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**职务**\n${form.position}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**手机号**\n${form.phone}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**邮箱**\n${form.email}` } },
            ],
          },
          { tag: 'hr' },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**期望资源与支持**\n${form.resources.length > 0 ? form.resources.join('、') : '未选择'}` },
          },
          { tag: 'hr' },
          {
            tag: 'note',
            elements: [{ tag: 'plain_text', content: `提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}` }],
          },
        ],
      },
    }

    try {
      if (FEISHU_WEBHOOK_URL) {
        await fetch(FEISHU_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feishuMessage),
        })
      }
    } catch {
      // 静默处理
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  const inputClass = 'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(50_100%_70%_/0.5)] focus:ring-1 focus:ring-[hsl(50_100%_70%_/0.3)] transition-all duration-300'
  const labelClass = 'block text-sm font-medium text-gray-300 mb-2'

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-gold-2.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            <span className="text-gradient-gold">入盟申请</span>
          </motion.h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[hsl(50_100%_70%_/0.1)] border border-[hsl(50_100%_70%_/0.3)] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[hsl(50_100%_70%)]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">申请已提交</h2>
                <p className="text-gray-400 mb-2">期待您的加入</p>
                <p className="text-gray-500 text-sm">CGIA 秘书处将于 7 个工作日内完成审核，届时将通过邮件或电话与您联系。</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg border border-[hsl(50_100%_70%)] text-[hsl(50_100%_70%)] hover:bg-[hsl(50_100%_70%)] hover:text-black transition-all duration-300 text-sm font-medium"
                >
                  返回首页
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AnimatedSection>
                  <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-10 space-y-6">
                    {/* 01 申请类型 */}
                    <div>
                      <label className={labelClass}>
                        <Briefcase className="w-4 h-4 inline mr-1.5 text-[hsl(50_100%_70%)]" />
                        申请类型 <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleChange('memberType', '单位会员')}
                          className={`p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                            form.memberType === '单位会员'
                              ? 'border-[hsl(50_100%_70%)] bg-[hsl(50_100%_70%_/0.1)] text-[hsl(50_100%_70%)]'
                              : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20'
                          }`}
                        >
                          单位会员
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange('memberType', '个人会员')}
                          className={`p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                            form.memberType === '个人会员'
                              ? 'border-[hsl(50_100%_70%)] bg-[hsl(50_100%_70%_/0.1)] text-[hsl(50_100%_70%)]'
                              : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20'
                          }`}
                        >
                          个人会员
                        </button>
                      </div>
                    </div>

                    {/* 02 单位全称 */}
                    <div>
                      <label className={labelClass}>
                        <Building2 className="w-4 h-4 inline mr-1.5 text-[hsl(50_100%_70%)]" />
                        单位全称 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.companyName}
                        onChange={e => handleChange('companyName', e.target.value)}
                        placeholder="请输入"
                        className={inputClass}
                      />
                    </div>

                    {/* 03 联系人姓名 + 04 联系人职务 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          <User className="w-4 h-4 inline mr-1.5 text-[hsl(50_100%_70%)]" />
                          联系人姓名 <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.contactName}
                          onChange={e => handleChange('contactName', e.target.value)}
                          placeholder="请输入"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          联系人职务 <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.position}
                          onChange={e => handleChange('position', e.target.value)}
                          placeholder="请输入"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* 05 联系方式 */}
                    <div>
                      <label className={labelClass}>
                        <Phone className="w-4 h-4 inline mr-1.5 text-[hsl(50_100%_70%)]" />
                        联系方式 <span className="text-red-400">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">请填写常用手机号，方便我们联系您</p>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => handleChange('phone', e.target.value)}
                        placeholder="请输入"
                        className={inputClass}
                      />
                    </div>

                    {/* 06 电子邮箱 */}
                    <div>
                      <label className={labelClass}>
                        <Mail className="w-4 h-4 inline mr-1.5 text-[hsl(50_100%_70%)]" />
                        电子邮箱 <span className="text-red-400">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">我们将通过此邮箱发送重要通知</p>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        placeholder="请输入"
                        className={inputClass}
                      />
                    </div>

                    {/* 07 期望资源与支持（多选） */}
                    <div>
                      <label className={labelClass}>
                        您期望在联盟中获取哪些资源与支持？ <span className="text-red-400">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-3">请勾选所有适用项</p>
                      <div className="space-y-2.5">
                        {resourceOptions.map(option => (
                          <label
                            key={option}
                            onClick={() => toggleResource(option)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                              form.resources.includes(option)
                                ? 'border-[hsl(50_100%_70%_/0.5)] bg-[hsl(50_100%_70%_/0.06)]'
                                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                              form.resources.includes(option)
                                ? 'bg-[hsl(50_100%_70%)] border-[hsl(50_100%_70%)]'
                                : 'border-gray-500'
                            }`}>
                              {form.resources.includes(option) && (
                                <Check className="w-3.5 h-3.5 text-black" />
                              )}
                            </div>
                            <span className={`text-sm ${form.resources.includes(option) ? 'text-white' : 'text-gray-400'}`}>
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-xl bg-[hsl(50_100%_70%)] text-black font-bold text-lg hover:shadow-[0_0_40px_hsl(50_100%_70%/_0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            提交中...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            提交
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </AnimatedSection>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
