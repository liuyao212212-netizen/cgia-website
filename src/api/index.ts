// API 基础地址配置
// 部署到阿里云后改为实际服务器地址，如：https://your-domain.com
// 本地开发时用空字符串（走同源代理）
const API_BASE = import.meta.env.VITE_API_BASE || ''

export interface ApiNewsItem {
  id: number
  date: string
  title: string
  image: string
  tags: string[]
}

export interface ApiMemberItem {
  id: number
  name: string
  company: string
  type: string
  certificate_image: string
}

export interface ApiActivityItem {
  id: number
  title: string
  description: string
  image: string
  date: string
  location: string
  status: string
}

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000), // 8秒超时
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn(`[API] ${path} 请求失败:`, err)
    return null
  }
}

export const api = {
  // 资讯速递
  getNews: () => fetchApi<ApiNewsItem[]>('/api/news/public'),

  // 会员
  getMembers: () => fetchApi<ApiMemberItem[]>('/api/members/public'),

  // 活动
  getActivities: () => fetchApi<ApiActivityItem[]>('/api/activities/public'),
}

export { API_BASE }
