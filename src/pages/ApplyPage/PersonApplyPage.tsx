import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, User, Briefcase, Check, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'

// 飞书群机器人 Webhook URL
const FEISHU_WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/c9ffcdc0-211f-42b1-b94b-61d5d91f9800'

const genderOptions = ['男', '女', '其他']

const fieldOptions = [
  'GEO', 'AI营销', '内容创作', '增长运营', '品牌建设', '数据分析', '其他',
]

const activityOptions = [
  '行业沙龙',
  '专业培训',
  '闭门交流会',
  '分享演讲',
  '项目合作',
]

interface PersonForm {
  name: string
  gender: string
  phone: string
  email: string
  company: string
  position: string
  field: string
  intro: string
  experience: string
  purpose: string
  activities: string[]
  agreed: boolean
}

export default function PersonApplyPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<PersonForm>({
    name: '',
    gender: '',
    phone: '',
    email: '',
    company: '',
    position: '',
    field: '',
    intro: '',
    experience: '',
    purpose: '',
    activities: [],
    agreed: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof PersonForm, value: string | string[] | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const toggleActivity = (value: string) => {
    setForm(prev => {
      const exists = prev.activities.includes(value)
      return {
        ...prev,
        activities: exists ? prev.activities.filter(a => a !== value) : [...prev.activities, value],
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
          title: { tag: 'plain_text', content: '👤 CGIA 先锋个人入会申请' },
          template: 'gold',
        },
        elements: [
          {
            tag: 'div',
            fields: [
              { is_short: true, text: { tag: 'lark_md', content: `**姓名**\n${form.name}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**性别**\n${form.gender || '未填写'}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**手机号**\n${form.phone}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**邮箱**\n${form.email}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**所在单位**\n${form.company || '未填写'}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**职务**\n${form.position}` } },
              { is_short: true, text: { tag: 'lark_md', content: `**擅长领域**\n${form.field || '未填写'}` } },
            ],
          },
          { tag: 'hr' },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**个人简介**\n${form.intro || '未填写'}` },
          },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**行业经验与优势**\n${form.experience || '未填写'}` },
          },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**加入联盟目的**\n${form.purpose || '未填写'}` },
          },
          { tag: 'hr' },
          {
            tag: 'div',
            text: { tag: 'lark_md', content: `**希望参与的联盟活动**\n${form.activities.length > 0 ? form.activities.join('、') : '未选择'}` },
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
            先锋个人申请
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
                    {/* Section 1: 个人基本信息 */}
                    <div>
                      <h3 className={sectionTitle}>
                        <User className="w-5 h-5" />
                        一、个人基本信息
                      </h3>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>
                              姓名 <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={form.name}
                              onChange={e => updateField('name', e.target.value)}
                              placeholder="请输入"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>性别</label>
                            <select
                              value={form.gender}
                              onChange={e => updateField('gender', e.target.value)}
                              className={`${inputClass} appearance-none`}
                            >
                              <option value="" className="bg-[#0a0a0a]">请选择</option>
                              {genderOptions.map(opt => (
                                <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                              ))}
                            </select>
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
                              个人邮箱 <span className="text-red-400">*</span>
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

                    {/* Section 2: 职业信息 */}
                    <div>
                      <h3 className={sectionTitle}>
                        <Briefcase className="w-5 h-5" />
                        二、职业信息
                      </h3>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>所在单位/机构</label>
                            <input
                              type="text"
                              value={form.company}
                              onChange={e => updateField('company', e.target.value)}
                              placeholder="请输入"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              职务/职称 <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={form.position}
                              onChange={e => updateField('position', e.target.value)}
                              placeholder="请输入"
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>擅长领域</label>
                          <select
                            value={form.field}
                            onChange={e => updateField('field', e.target.value)}
                            className={`${inputClass} appearance-none`}
                          >
                            <option value="" className="bg-[#0a0a0a]">请选择</option>
                            {fieldOptions.map(opt => (
                              <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Section 3: 个人介绍 */}
                    <div>
                      <h3 className={sectionTitle}>
                        <User className="w-5 h-5" />
                        三、个人介绍
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <label className={labelClass}>个人简介（150字以内）</label>
                          <textarea
                            rows={3}
                            maxLength={150}
                            value={form.intro}
                            onChange={e => updateField('intro', e.target.value)}
                            placeholder="请简要介绍自己"
                            className={`${inputClass} resize-none`}
                          />
                          <p className="text-xs text-gray-500 mt-1 text-right">{form.intro.length}/150</p>
                        </div>
                        <div>
                          <label className={labelClass}>行业经验与优势</label>
                          <input
                            type="text"
                            value={form.experience}
                            onChange={e => updateField('experience', e.target.value)}
                            placeholder="请输入"
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
                      <div className="space-y-5">
                        <div>
                          <label className={labelClass}>加入联盟的目的</label>
                          <textarea
                            rows={2}
                            value={form.purpose}
                            onChange={e => updateField('purpose', e.target.value)}
                            placeholder="请简要描述"
                            className={`${inputClass} resize-none`}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>希望参与的联盟活动（可多选）</label>
                          <div className="space-y-2.5">
                            {activityOptions.map(option => (
                              <label
                                key={option}
                                onClick={() => toggleActivity(option)}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                                  form.activities.includes(option)
                                    ? 'border-[hsl(50_100%_70%_/0.5)] bg-[hsl(50_100%_70%_/0.06)]'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                  form.activities.includes(option)
                                    ? 'bg-[hsl(50_100%_70%)] border-[hsl(50_100%_70%)]'
                                    : 'border-gray-500'
                                }`}>
                                  {form.activities.includes(option) && (
                                    <Check className="w-3.5 h-3.5 text-black" />
                                  )}
                                </div>
                                <span className={`text-sm ${form.activities.includes(option) ? 'text-white' : 'text-gray-400'}`}>
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
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
                            提交个人会员申请
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
