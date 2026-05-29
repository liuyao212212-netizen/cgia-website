export interface IMember {
  id: string
  name: string
  logo?: string
  level: 'founding-org' | 'founding-pioneer'
  description: string
  fullDescription: string
  platforms: string[]
  honors: string[]
  memberNo: string
  certificateNo?: string
  certificateDate?: string
  contact?: {
    person: string
    position: string
    email: string
    phone: string
  }
}

export const membersData: IMember[] = [
  {
    id: 'natekang',
    name: '耐特康赛网络技术（北京）有限公司',
    level: 'founding-org',
    description: '中国领先的数字整合营销服务商，以AI驱动的全链路技术体系助力品牌增长',
    fullDescription: '耐特康赛（Netconcepts）是中国领先的数字整合营销服务商，成立于2008年，总部位于北京，业务覆盖全球。公司以"智能营销助力品牌增长"为核心理念，以AI驱动的全链路技术体系、行业领先的营销方法论及全球化服务能力，依托年专业技术积累，为企业提供从流量获取到商业转化的一站式解决方案，至今已助力几千家企业实现品牌价值与商业目标的双重突破。\n\n耐特康赛的智能营销中台团队具备实时数据融合与策略调度能力，结合行业领先的搜索拦截技术和"星球大战营销体系"，成功帮助超千家品牌实现流量突破与转化提升。至今，累计获得金鼠标、虎啸奖等30余项行业权威奖项，多次入选中国数字营销公司TOP排行榜。\n\n未来，耐特康赛将持续深耕智能技术整合与垂直领域赋能，通过品效合一的营销策略，为企业构建可持续的增长生态。坚持以技术为矛，以平台为盾，助力客户实现品牌价值与商业增长的双重突破，成为AI时代企业增长中最值得信赖的转型与业务增长伙伴。',
    platforms: ['AI营销', '数字整合营销', '搜索技术', '品牌增长'],
    honors: ['创始会员单位'],
    memberNo: '00000001',
    certificateNo: 'CGIA-2026-001',
    certificateDate: '2026-03-01',
    contact: {
      person: '渠成',
      position: 'CEO',
      email: 'contact@netconcepts.cn',
      phone: '010-xxxxxxxx',
    },
  },
  {
    id: 'jimeng',
    name: '即梦计算机（北京）有限公司',
    level: 'founding-org',
    description: '中国领先的AI营销服务提供商，以助力中国企业全球化生意拓展为使命',
    fullDescription: '即梦计算机是中国领先的AI营销服务提供商，以香港为全球工作中心管理巴西、印尼、新加坡和中东的驻外机构，以助力中国企业全球化生意拓展为使命。业务范围主要集中在文娱和泛文娱行业，主要合作平台包括Meta、Google、Kwai、Transsion、Mercado Libre、AppsFlyer、Developer等。2025年荣获中国网科技企业先锋榜评选年度影响力企业。',
    platforms: ['AI营销', '全球化拓展', '文娱行业', '数字广告'],
    honors: ['创始会员单位'],
    memberNo: '20260301',
    certificateNo: 'CGIA-2026-002',
    certificateDate: '2026-03-01',
    contact: {
      person: '负责人',
      position: '总经理',
      email: 'contact@jimeng.com',
      phone: '010-xxxxxxxx',
    },
  },
  {
    id: 'ipinova',
    name: 'IPINOVA 文化有限公司',
    level: 'founding-org',
    description: '立足澳门，融合AI技术、数字媒体运营与产业资源整合的文化科技企业',
    fullDescription: 'ipinova文化有限公司立足澳门，面向粤港澳大湾区及国际市场，是一家融合人工智能技术、数字媒体运营、产业资源整合与招商转化能力于一体的文化科技企业。\n\n公司以"数据驱动、内容引导、转化导向"为核心理念，致力于为政府部门、企业及各类机构提供从前端触达、品牌塑造到商业转化的一站式服务。通过整合人工智能分析能力与新媒体传播能力，协助客户在复杂多变的市场环境中建立可持续的竞争优势。\n\nipinova并非传统宣传或媒体代理机构，而是以结果为导向的产业赋能平台，强调以数据支持决策、以流量促进转化，实现从曝光到商业成果的完整闭环。',
    platforms: ['AI技术', '数字媒体', '产业整合', '招商转化'],
    honors: ['创始会员单位'],
    memberNo: '20260302',
    certificateNo: 'CGIA-2026-003',
    certificateDate: '2026-03-01',
    contact: {
      person: '负责人',
      position: '总经理',
      email: 'contact@ipinova.com',
      phone: '853-xxxxxxxx',
    },
  },
  {
    id: 'deshiheng',
    name: '北京得实恒泰科技有限公司',
    level: 'founding-org',
    description: '深耕企业数字化转型赛道的高新技术企业，提供一站式技术服务',
    fullDescription: '北京得实恒泰科技有限公司总部位于北京，是一家深耕企业数字化转型赛道的高新技术企业。公司以技术创新为核心，为各行业客户提供数字化解决方案定制、软件研发、系统集成、全周期运维的一站式技术服务，助力企业实现数字化、智能化升级。\n\n中国传媒大学人工智能营销研究院，是依托中国传媒大学新闻传播、广告学、数字媒体技术、人工智能等顶尖交叉学科优势设立的产学研一体化专业科研机构，是链接学界前沿研究与营销产业实践落地的核心平台，也是国内率先深耕人工智能与营销传播融合领域的权威高校科研主体。',
    platforms: ['数字化转型', '软件研发', '系统集成', 'AI营销研究'],
    honors: ['创始会员单位'],
    memberNo: '20260303',
    certificateNo: 'CGIA-2026-004',
    certificateDate: '2026-03-01',
    contact: {
      person: '负责人',
      position: '总经理',
      email: 'contact@deshiheng.com',
      phone: '010-xxxxxxxx',
    },
  },
  {
    id: 'sundaojun',
    name: '孙道军（中国传媒大学人工智能营销研究院）',
    level: 'founding-pioneer',
    description: '中国传媒大学人工智能营销研究院院长，产学研一体化科研平台核心负责人',
    fullDescription: '孙道军，中国传媒大学人工智能营销研究院院长。该研究院是依托中国传媒大学新闻传播、广告学、数字媒体技术、人工智能等顶尖交叉学科优势设立的产学研一体化专业科研机构，是链接学界前沿研究与营销产业实践落地的核心平台，也是国内率先深耕人工智能与营销传播融合领域的权威高校科研主体。',
    platforms: ['学术研究', 'AI营销', '产学研融合'],
    honors: ['创始会员先锋'],
    memberNo: '20260304',
    certificateNo: 'CGIA-2026-P001',
    certificateDate: '2026-03-01',
    contact: {
      person: '孙道军',
      position: '院长',
      email: 'sundj@cuc.edu.cn',
      phone: '010-xxxxxxxx',
    },
  },
  {
    id: 'liudiyan',
    name: '刘荻岩（北京盛久基金管理有限公司）',
    level: 'founding-pioneer',
    description: '专注于私募投资基金管理、资产管理与产业投资的专业金融机构',
    fullDescription: '北京盛久基金管理有限公司，总部坐落于北京核心金融商务区，是一家专注于私募投资基金管理、资产管理、产业投资与财富管理的专业金融机构。公司严格遵循中国证券投资基金业协会监管要求，坚守合规经营、稳健发展的核心底线，以深度产业研究为基础、价值投资为核心，为机构投资者与高净值客户提供专业、规范、全周期的资产管理与投资解决方案。\n\n公司核心投研与管理团队均来自头部券商、公募基金、知名PE/VC机构、四大会计师事务所及红圈律所，拥有超十年资本市场与产业投资实操经验，具备全品类资产配置、全流程风险管控、全周期项目操盘的综合能力，累计管理规模与项目落地成果位居行业同梯队前列。',
    platforms: ['基金管理', '资产管理', '产业投资', '财富管理'],
    honors: ['创始会员先锋'],
    memberNo: '20260308',
    certificateNo: 'CGIA-2026-P002',
    certificateDate: '2026-03-01',
    contact: {
      person: '刘荻岩',
      position: '总经理',
      email: 'contact@shengjiu-fund.com',
      phone: '010-xxxxxxxx',
    },
  },
  {
    id: 'yanglin',
    name: '杨琳（丰田汽车（中国）投资有限公司）',
    level: 'founding-pioneer',
    description: '丰田汽车在华地区总部与核心统括机构，深耕中国市场二十余年',
    fullDescription: '丰田汽车（中国）投资有限公司（简称"丰田中国"，英文缩写TMCI），是丰田汽车公司于2001年7月在中国设立的全资子公司，总部位于北京，是丰田在华业务的地区总部与核心统括机构。\n\n作为丰田全球战略的核心落地主体，丰田中国全面统筹丰田在华的产品企划、技术研发、生产制造、品牌营销、渠道网络、售后服务、合规管理等全产业链业务，联动一汽丰田、广汽丰田、雷克萨斯中国等在华核心事业体，深耕中国市场二十余年，已成为中国汽车市场核心的外资车企主体之一。',
    platforms: ['汽车营销', '品牌营销', '渠道管理', '合规管理'],
    honors: ['创始会员先锋'],
    memberNo: '20260309',
    certificateNo: 'CGIA-2026-P003',
    certificateDate: '2026-03-01',
    contact: {
      person: '杨琳',
      position: '营销总监',
      email: 'yang.lin@toyota.com.cn',
      phone: '010-xxxxxxxx',
    },
  },
  {
    id: 'youjubolian',
    name: '北京优聚博联营销策划有限公司',
    level: 'founding-org',
    description: '专注于全链路品牌营销策划、整合传播与商业转化赋能的专业营销服务机构',
    fullDescription: '北京优聚博联营销策划有限公司总部位于北京，是一家专注于全链路品牌营销策划、整合传播与商业转化赋能的专业营销服务机构。公司以实效为核心，为各行业客户提供从品牌定位、策略策划到落地执行、效果优化的一站式定制化营销解决方案，助力品牌实现长效增长与市场突破。',
    platforms: ['品牌策划', '整合传播', '商业转化', '效果优化'],
    honors: ['创始会员单位'],
    memberNo: '20260311',
    certificateNo: 'CGIA-2026-005',
    certificateDate: '2026-03-01',
    contact: {
      person: '负责人',
      position: '总经理',
      email: 'contact@youjubolian.com',
      phone: '010-xxxxxxxx',
    },
  },
  {
    id: 'xinlong',
    name: '北京新龙理工基金',
    level: 'founding-org',
    description: '北京市大兴区政府引导基金参股的专业创业投资基金，聚焦硬科技与数字经济',
    fullDescription: '北京新龙理工创业投资基金成立于2020年12月，总出资额3.35亿元，是由北京市大兴发展引导基金联合社会资本共同发起设立的专业创业投资基金，已在中国证券投资基金业协会完成备案（基金编号：SB4229）。\n\n基金由北京新龙国坤私募基金管理有限公司担任执行事务合伙人，依托德丰杰资本等国际知名投资机构的专业管理经验，聚焦硬科技、数字经济、人工智能、企业服务等国家战略性新兴产业领域，重点投资处于成长期的优质科技创新企业，已成功投资耐特康赛、环球航通、星网通等多家行业领先企业。\n\n作为北京市大兴区政府引导基金参股的市场化投资平台，基金充分发挥政府资金的引导作用和社会资本的资源优势，践行"投早、投小、投科技"的投资理念，致力于为被投企业提供资金支持、产业对接、战略规划等全方位增值服务，助力科技成果转化和实体经济高质量发展。',
    platforms: ['创业投资', '硬科技', '数字经济', '人工智能'],
    honors: ['创始会员单位'],
    memberNo: '20260312',
    certificateNo: 'CGIA-2026-006',
    certificateDate: '2026-03-01',
    contact: {
      person: '负责人',
      position: '执行事务合伙人',
      email: 'contact@xinlong-fund.com',
      phone: '010-xxxxxxxx',
    },
  },
]

export const getMemberById = (id: string): IMember | undefined => {
  return membersData.find((m) => m.id === id)
}
