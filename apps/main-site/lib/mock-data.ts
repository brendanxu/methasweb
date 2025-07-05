import type { CaseStudy, NewsArticle, Service, Industry, Category } from './types'

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Climate Action',
    slug: 'climate-action',
    description: 'Comprehensive climate solutions for net zero transition'
  },
  {
    id: '2',
    name: 'Climate Finance',
    slug: 'climate-finance',
    description: 'Investment solutions for sustainable growth'
  },
  {
    id: '3',
    name: 'Renewable Energy',
    slug: 'renewable-energy',
    description: 'Clean energy projects and certifications'
  },
  {
    id: '4',
    name: 'Nature-Based Solutions',
    slug: 'nature-based',
    description: 'Natural climate solutions and biodiversity'
  }
]

export const mockIndustries: Industry[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Climate solutions for tech companies'
  },
  {
    id: '2',
    name: 'Finance',
    slug: 'finance',
    description: 'Sustainable finance and investment'
  },
  {
    id: '3',
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Industrial decarbonization solutions'
  },
  {
    id: '4',
    name: 'Energy',
    slug: 'energy',
    description: 'Renewable energy transition'
  }
]

export const mockCategories: Category[] = [
  { id: '1', name: 'Climate Action', slug: 'climate-action' },
  { id: '2', name: 'Sustainability', slug: 'sustainability' },
  { id: '3', name: 'Innovation', slug: 'innovation' },
  { id: '4', name: 'Policy', slug: 'policy' }
]

export const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Microsoft Achieves Carbon Negative Status',
    slug: 'microsoft-carbon-negative',
    clientName: 'Microsoft Corporation',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop',
    summary: 'How Microsoft achieved carbon negative status through innovative climate solutions and renewable energy investments.',
    theGoal: 'Achieve carbon negative status by 2030 and remove historical emissions by 2050.',
    theChallenge: 'Balancing rapid business growth with ambitious climate targets across global operations.',
    theSolution: 'Comprehensive carbon removal portfolio, renewable energy procurement, and supply chain transformation.',
    relatedServices: [mockServices[0]!, mockServices[1]!],
    relatedIndustry: mockIndustries[0]!,
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'Unilever\'s Sustainable Supply Chain Transformation',
    slug: 'unilever-supply-chain',
    clientName: 'Unilever',
    heroImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1600&h=900&fit=crop',
    summary: 'Transforming Unilever\'s global supply chain to achieve net zero emissions and support regenerative agriculture.',
    theGoal: 'Transform supply chain to net zero emissions while supporting 1 million farmers.',
    theChallenge: 'Complex global supply chain with diverse agricultural inputs and manufacturing processes.',
    theSolution: 'Nature-based solutions, regenerative agriculture programs, and renewable energy transition.',
    relatedServices: [mockServices[3]!, mockServices[2]!],
    relatedIndustry: mockIndustries[2]!,
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    title: 'Swiss Re: Climate Risk Modeling Excellence',
    slug: 'swiss-re-climate-risk',
    clientName: 'Swiss Re',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop',
    summary: 'Developing advanced climate risk models to guide investment decisions and insurance products.',
    theGoal: 'Create industry-leading climate risk assessment tools for financial decision-making.',
    theChallenge: 'Integrating complex climate data into actionable financial risk models.',
    theSolution: 'Advanced climate analytics platform with real-time risk assessment capabilities.',
    relatedServices: [mockServices[1]!],
    relatedIndustry: mockIndustries[1]!,
    createdAt: '2024-01-10'
  }
]

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'New Carbon Removal Technologies Show Promise for Scale',
    slug: 'carbon-removal-technologies-2024',
    publishDate: '2024-07-01',
    heroImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1600&h=900&fit=crop',
    content: 'Latest developments in direct air capture and enhanced weathering technologies demonstrate potential for gigaton-scale carbon removal...',
    category: mockCategories[2]!,
    summary: 'Breakthrough technologies in carbon removal are approaching commercial viability, offering new pathways to achieve net zero targets.'
  },
  {
    id: '2',
    title: 'EU Announces Expanded Carbon Border Adjustment Mechanism',
    slug: 'eu-cbam-expansion-2024',
    publishDate: '2024-06-28',
    heroImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62ca?w=1600&h=900&fit=crop',
    content: 'The European Union has announced an expansion of its Carbon Border Adjustment Mechanism to include additional sectors...',
    category: mockCategories[3]!,
    summary: 'New EU regulations will impact global trade flows and accelerate decarbonization efforts across industries.'
  },
  {
    id: '3',
    title: 'Nature-Based Solutions Gain Momentum in Corporate Strategy',
    slug: 'nature-based-solutions-corporate-2024',
    publishDate: '2024-06-25',
    heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=900&fit=crop',
    content: 'Major corporations are increasingly turning to nature-based solutions as part of their climate strategies...',
    category: mockCategories[1]!,
    summary: 'Companies are investing billions in forest conservation, regenerative agriculture, and ecosystem restoration projects.'
  },
  {
    id: '4',
    title: 'South Pole Launches New Climate Finance Platform',
    slug: 'climate-finance-platform-launch',
    publishDate: '2024-06-20',
    heroImage: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=1600&h=900&fit=crop',
    content: 'South Pole announces the launch of an innovative climate finance platform connecting investors with verified climate projects...',
    category: mockCategories[0]!,
    summary: 'New platform streamlines investment in high-impact climate projects with enhanced transparency and verification.'
  }
]