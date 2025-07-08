import type { Article } from '@/lib/types/carbon-insights'

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '中国碳市场年度报告：2024年交易量创历史新高',
    excerpt: '最新数据显示，2024年中国碳排放权交易市场交易量突破10亿吨，交易额超过500亿元人民币，创下历史新纪录。这一增长反映了企业对碳资产管理的重视程度不断提升。',
    image: {
      src: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',
      alt: '碳市场交易大厅'
    },
    category: '市场动态',
    categoryColor: '#0052CC',
    date: '2024-01-15',
    readingTime: 5,
    link: '/news/china-carbon-market-2024'
  },
  {
    id: '2',
    title: 'CCER重启带来新机遇：林业碳汇项目迎来发展春天',
    excerpt: '国家核证自愿减排量（CCER）交易市场重启后，林业碳汇项目备受关注。专家预测，未来五年内林业碳汇交易规模将达到千亿级别，为生态保护和经济发展带来双赢。',
    image: {
      src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      alt: '森林碳汇项目'
    },
    category: '政策解读',
    categoryColor: '#00875A',
    date: '2024-01-12',
    readingTime: 7,
    link: '/news/ccer-restart-opportunities'
  },
  {
    id: '3',
    title: '欧盟碳边境调节机制（CBAM）对中国企业的影响分析',
    excerpt: '欧盟CBAM正式实施后，中国出口企业面临新的挑战。本文深入分析CBAM的运作机制，为企业提供应对策略，助力企业在国际贸易中保持竞争优势。',
    image: {
      src: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800&q=80',
      alt: '国际贸易与碳税'
    },
    category: '国际视野',
    categoryColor: '#FF8B00',
    date: '2024-01-10',
    readingTime: 8,
    link: '/news/eu-cbam-impact-analysis'
  },
  {
    id: '4',
    title: '绿色金融创新：碳资产质押融资模式探索',
    excerpt: '随着碳市场的成熟，碳资产作为一种新型资产类别受到金融机构关注。多家银行推出碳资产质押贷款产品，为企业盘活碳资产、获得低成本融资提供新途径。',
    image: {
      src: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
      alt: '绿色金融创新'
    },
    category: '金融创新',
    categoryColor: '#00B8A9',
    date: '2024-01-08',
    readingTime: 6,
    link: '/news/carbon-asset-financing'
  },
  {
    id: '5',
    title: '碳中和技术前沿：CCUS技术商业化进程加速',
    excerpt: '碳捕集、利用与封存（CCUS）技术被视为实现碳中和的关键技术之一。最新项目显示，CCUS技术成本大幅下降，商业化应用前景广阔，有望成为减排新引擎。',
    image: {
      src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
      alt: 'CCUS技术设施'
    },
    category: '技术前沿',
    categoryColor: '#6554C0',
    date: '2024-01-05',
    readingTime: 10,
    link: '/news/ccus-technology-progress'
  },
  {
    id: '6',
    title: '企业碳管理最佳实践：华为的碳中和之路',
    excerpt: '作为科技行业的领军企业，华为发布了详细的碳中和路线图。通过创新技术应用、供应链协同和能源结构优化，华为计划在2030年前实现运营碳中和目标。',
    image: {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      alt: '企业碳中和实践'
    },
    category: '案例研究',
    categoryColor: '#172B4D',
    date: '2024-01-03',
    readingTime: 12,
    link: '/news/huawei-carbon-neutral-roadmap'
  },
  {
    id: '7',
    title: '可再生能源配额制度升级：绿电交易市场迎来新机遇',
    excerpt: '国家发改委发布新版可再生能源配额制度，提高了各省份的绿电消纳责任权重。这一政策将推动绿电交易市场快速发展，为新能源产业带来巨大商机。',
    image: {
      src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
      alt: '可再生能源发电'
    },
    category: '政策动态',
    categoryColor: '#00875A',
    date: '2024-01-01',
    readingTime: 9,
    link: '/news/renewable-energy-quota-upgrade'
  },
  {
    id: '8',
    title: '碳足迹标准化进展：ISO 14067国际标准在中国的应用',
    excerpt: '随着国际贸易中碳足迹要求日益严格，掌握ISO 14067标准成为企业必修课。本文详解该标准的核算方法、认证流程，帮助企业建立规范的碳足迹管理体系。',
    image: {
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      alt: '碳足迹认证标准'
    },
    category: '标准认证',
    categoryColor: '#DE350B',
    date: '2023-12-28',
    readingTime: 11,
    link: '/news/iso-14067-carbon-footprint'
  }
]