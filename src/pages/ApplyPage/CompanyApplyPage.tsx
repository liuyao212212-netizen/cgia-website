import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Building2, Phone, Briefcase, Check, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'

// 飞书群机器人 Webhook URL
const FEISHU_WEBHOOK_URL = ''

const industryOptions = [
  '互联网/科技', '品牌/营销', '媒体/出版', 'AI/大数据',
  '电商/零售', '金融/保险', '教育/培训', '制造/工业', '其他',
]

const scaleOptions = [
  '1-50人', '51-200人', '201-500人', '501-1000人', '1000人以上',
]

const supportOptions = [
  '官方品牌背书',
  '行业资源对接',
  '闭门会议参与',
  '联合标准制定',
  '技术与商机合作',
]

interface CompanyForm {
  companyName: string
  industry: string
  scale: string
  contactName: string
  phone: string
  email: string
  position: string
  intro: string
  mainBusiness: string
  supports: string[]
  agreed: boolean
}

export default function CompanyApplyPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CompanyForm>({
    companyName: '',
    industry: '',
    scale: '',
    contactName: '',
    phone: '',
    email: '',
    position: '',
    intro: '',
    mainBusiness: '',
    supports: [],
    agreed: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof CompanyForm, value: string | string[] | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const toggleSupport = (value: string) => {
    setForm(prev => {
      const exists = prev.supports.includes(value)
      return {
        ...prev,
        supports: exists ? prev.supports.filter(s => s !== value) : [...prev.supports, value],
      }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.agreed) return
    setSubmitting(true)

    const feishuMessage = {
      msg_type: 'interactive',
      card: {
        header: {
          title: { tag: 'plain_text', content: '🏢 CGIA 单位会员申请' },
          template: 'gold',
        },
        elements: [
          {
            tag: 'div',
            fields: [
              { is_short: true, text: { tag: 'lark_md', content: `**单位全称**\n${form.companyName}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**所属行业**\n${form.industry || '未填写'}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**单位规模**\n${form.scale || '未填写'}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**联系人**\n${form.contactName}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**职务**\n${form.position || '未填写'}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**手机号**\n${form.phone}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**邮箱**\n${form.email}` } },
            ],
          },
          { tag: 'hr' },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**单位简介**\n${form.intro || '未填写'}` },
          },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**主营业务**\n${form.mainBusiness || '未填写'}` },
          },
          { tag: 'hr' },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**希望获得的联盟支持**\n${form.supports.length > 0 ? form.supports.join('、') : '未选择'}` },
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
  const sectionTitle = 'text-base font-semibold text-[hsl(50_100%_70%)] mb-4 flex items-center gap-2'

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-particles.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-[hsl(50_100%_70%)] mb-4"
          >
            单位会员申请
          </motion.h1>
        </div>
      </section>

      {/* Form */}
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
                <h2 className="text-2xl font-bold text-white mb-3">申请提交成功！</h2>
                <div className="space-y-2 text-gray-400 text-sm mb-6">
                  <p>您的入会申请已成功受理</p>
                  <p>秘书处将在7个工作日内完成审批</p>
                  <p>审核结果将通过短信/邮箱通知您</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[hsl(50_100%_70%)] text-[hsl(50_100%_70%)] hover:bg-[hsl(50_100%_70%)] hover:text-black transition-all duration-300 text-sm font-medium"
                  >
                    返回首页
                  </button>
                  <button
                    onClick={() => navigate('/membership')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(50_100%_70%)] text-black text-sm font-medium hover:scale-105 transition-transform duration-300"
                  >
                    查看会员权益
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AnimatedSection>
                  <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-10 space-y-8">
                    {/* Section 1: 申请单位信息 */}
                    <div>
                      <h3 className={sectionTitle}>
                        <Building2 className="w-5 h-5" />
                        一、申请单位信息
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <label className={labelClass}>
                            申请单位全称 <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.companyName}
                            onChange={e => updateField('companyName', e.target.value)}
                            placeholder="请输入单位全称"
                            className={inputClass}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>单位所属行业</label>
                            <select
                              value={form.industry}
                              onChange={e => updateField('industry', e.target.value)}
                              className={`${inputClass} appearance-none`}
                            >
                              <option value="" className="bg-[#0a0a0a]">请选择</option>
                              {industryOptions.map(opt => (
                                <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>单位规模（员工人数）</label>
                            <select
                              value={form.scale}
                              onChange={e => updateField('scale', e.target.value)}
                              className={`${inputClass} appearance-none`}
                            >
                              <option value="" className="bg-[#0a0a0a]">请选择</option>
                              {scaleOptions.map(opt => (
                                <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Section 2: 联系人信息 */}
                    <div>
                      <h3 className={sectionTitle}>
                        <Phone className="w-5 h-5" />
                        二、联系人信息
                      </h3>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>
                              联系人姓名 <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={form.contactName}
                              onChange={e => updateField('contactName', e.target.value)}
                              placeholder="请输入"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              联系人职务
                            </label>
                            <input
                              type="text"
                              value={form.position}
                              onChange={e => updateField('position', e.target.value)}
                              placeholder="请输入"
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>
                              联系电话 <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={form.phone}
                              onChange={e => updateField('phone', e.target.value)}
                              placeholder="请输入"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              联系邮箱 <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={form.email}
                              onChange={e => updateField('email', e.target.value)}
                              placeholder="请输入"
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Section 3: 单位业务介绍 */}
                    <div>
                      <h3 className={sectionTitle}>
                        <Briefcase className="w-5 h-5" />
                        三、单位业务介绍
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <label className={labelClass}>单位简介（200字以内）</label>
                          <textarea
                            rows={3}
                            maxLength={200}
                            value={form.intro}
                            onChange={e => updateField('intro', e.target.value)}
                            placeholder="请简要介绍贵单位"
                            className={`${inputClass} resize-none`}
                          />
                          <p className="text-xs text-gray-500 mt-1 text-right">{form.intro.length}/200</p>
                        </div>
                        <div>
                          <label className={labelClass}>主营业务</label>
                          <input
                            type="text"
                            value={form.mainBusiness}
                            onChange={e => updateField('mainBusiness', e.target.value)}
                            placeholder="请输入主营业务"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Section 4: 加入联盟意向 */}
                    <div>
                      <h3 className={sectionTitle}>
                        <FileText className="w-5 h-5" />
                        四、加入联盟意向
                      </h3>
                      <div>
                        <label className={labelClass}>希望获得的联盟支持（可多选）</label>
                        <div className="space-y-2.5">
                          {supportOptions.map(option => (
                            <label
                              key={option}
                              onClick={() => toggleSupport(option)}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                                form.supports.includes(option)
                                  ? 'border-[hsl(50_100%_70%_/0.5)] bg-[hsl(50_100%_70%_/0.06)]'
                                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                form.supports.includes(option)
                                  ? 'bg-[hsl(50_100%_70%)] border-[hsl(50_100%_70%)]'
                                  : 'border-gray-500'
                              }`}>
                                {form.supports.includes(option) && (
                                  <Check className="w-3.5 h-3.5 text-black" />
                                )}
                              </div>
                              <span className={`text-sm ${form.supports.includes(option) ? 'text-white' : 'text-gray-400'}`}>
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Section 5: 协议确认 */}
                    <div>
                      <label
                        onClick={() => updateField('agreed', !form.agreed)}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <div className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          form.agreed
                            ? 'bg-[hsl(50_100%_70%)] border-[hsl(50_100%_70%)]'
                            : 'border-gray-500'
                        }`}>
                          {form.agreed && <Check className="w-3.5 h-3.5 text-black" />}
                        </div>
                        <span className="text-sm text-gray-400">
                          我已阅读并同意联盟章程 <span className="text-red-400">*</span>
                        </span>
                      </label>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting || !form.agreed}
                        className="w-full py-4 rounded-xl bg-[hsl(50_100%_70%)] text-black font-bold text-lg hover:shadow-[0_0_40px_hsl(50_100%_70%/_0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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
                            提交单位会员申请
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
