export interface INewsItem {
  id: string
  type: 'alliance' | 'industry' | 'report' | 'event'
  title: string
  summary: string
  date: string
  image?: string
  link?: string
}

export const newsData: INewsItem[] = [
  {
    id: '1',
    type: 'alliance',
    title: 'CGIA首批创始会员单位正式授牌',
    summary: '2026年3月，中国GEO创新联盟（CGIA）在北京举行首批创始会员单位授牌仪式，耐特康赛、即梦计算机等企业正式加入联盟。',
    date: '2026-03-15',
  },
  {
    id: '2',
    type: 'industry',
    title: 'GEO技术：AI搜索时代的品牌新战场',
    summary: '随着生成式AI重塑搜索生态，GEO（Generative Engine Optimization）正成为品牌数字营销的核心战场。本文深入解析GEO的技术原理与实战策略。',
    date: '2026-04-20',
  },
  {
    id: '3',
    type: 'report',
    title: '《2026中国GEO行业趋势白皮书》发布',
    summary: '联盟联合会员单位正式发布首份中国GEO行业趋势白皮书，涵盖技术演进、市场规模、应用案例及未来展望四大核心板块。',
    date: '2026-04-01',
  },
  {
    id: '4',
    type: 'event',
    title: 'CGIA首届GEO创新峰会暨会员大会',
    summary: '将于2026年6月在北京举办，汇聚行业领袖、技术专家、品牌方共同探讨GEO技术最新进展与商业应用。会员优先报名通道已开启。',
    date: '2026-05-28',
  },
  {
    id: '6',
    type: 'industry',
    title: '豆包、元宝、千问等平台算法更新对GEO的影响分析',
    summary: '近期国内主流AI搜索平台相继更新算法，本文详细解读各平台最新收录规则及对企业GEO策略的影响与应对建议。',
    date: '2026-05-15',
  },
]
