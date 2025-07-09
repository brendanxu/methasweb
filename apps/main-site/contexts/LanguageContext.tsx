'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'zh-CN' | 'en' | 'de' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  'zh-CN': {
    // Brand
    brandName: '碳智METHAS',
    brandTagline: '专业碳中和解决方案提供商',
    
    // Hero Section
    heroTitle: '引领气候解决方案之路',
    heroSubtitle: '自2006年以来，我们帮助组织加速向净零未来的转型，通过全面的气候行动策略和解决方案。',
    yearsLeading: '年领先经验',
    co2Reduced: 'CO₂ 减排量',
    clientsServed: '服务客户',
    exploreButton: '探索我们的解决方案',
    startButton: '开始您的旅程',
    discoverImpact: '发现我们的影响',
    
    // Navigation
    aboutUs: '关于我们',
    whatWeDo: '我们的服务',
    ourImpact: '我们的影响',
    newsInsights: '新闻与洞察',
    contact: '联系我们',
    locations: '办公地点',
    getStarted: '开始合作',
    
    // Footer
    followUs: '关注我们随时收到最新讯息',
    subscribeEmail: '请输入邮箱',
    subscribe: '订阅',
    mediaContact: '媒体联络',
    privacyPolicy: '隐私政策',
    termsOfService: '使用条款',
    siteMap: '网站地图',
    allRightsReserved: '保留所有权利',
    
    // Language Names
    chinese: '中文',
    english: 'EN',
    german: 'DE',
    french: 'FR'
  },
  'en': {
    // Brand
    brandName: 'METHAS',
    brandTagline: 'Professional Carbon Neutral Solutions Provider',
    
    // Hero Section
    heroTitle: 'Leading the Way in Climate Solutions',
    heroSubtitle: 'Since 2006, we\'ve helped organizations accelerate their transition to a net-zero future through comprehensive climate action strategies and solutions.',
    yearsLeading: 'Years Leading',
    co2Reduced: 'CO₂ Reduced',
    clientsServed: 'Clients Served',
    exploreButton: 'Explore Our Solutions',
    startButton: 'Start Your Journey',
    discoverImpact: 'Discover our impact',
    
    // Navigation
    aboutUs: 'About us',
    whatWeDo: 'What we do',
    ourImpact: 'Our impact',
    newsInsights: 'News & insights',
    contact: 'Contact',
    locations: 'Locations',
    getStarted: 'Get started',
    
    // Footer
    followUs: 'Follow us to get the latest updates',
    subscribeEmail: 'Enter your email',
    subscribe: 'Subscribe',
    mediaContact: 'Media Contact',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    siteMap: 'Site Map',
    allRightsReserved: 'All rights reserved',
    
    // Language Names
    chinese: '中文',
    english: 'EN',
    german: 'DE',
    french: 'FR'
  },
  'de': {
    // Brand
    brandName: 'METHAS',
    brandTagline: 'Professioneller Anbieter für CO₂-Neutralitätslösungen',
    
    // Hero Section
    heroTitle: 'Wegweisend bei Klimalösungen',
    heroSubtitle: 'Seit 2006 helfen wir Organisationen dabei, ihren Übergang zu einer Net-Zero-Zukunft durch umfassende Klimaschutzstrategien und -lösungen zu beschleunigen.',
    yearsLeading: 'Jahre führend',
    co2Reduced: 'CO₂ reduziert',
    clientsServed: 'Kunden betreut',
    exploreButton: 'Unsere Lösungen erkunden',
    startButton: 'Ihre Reise beginnen',
    discoverImpact: 'Entdecken Sie unsere Wirkung',
    
    // Navigation
    aboutUs: 'Über uns',
    whatWeDo: 'Was wir tun',
    ourImpact: 'Unsere Wirkung',
    newsInsights: 'News & Einblicke',
    contact: 'Kontakt',
    locations: 'Standorte',
    getStarted: 'Loslegen',
    
    // Footer
    followUs: 'Folgen Sie uns für die neuesten Updates',
    subscribeEmail: 'E-Mail eingeben',
    subscribe: 'Abonnieren',
    mediaContact: 'Medienkontakt',
    privacyPolicy: 'Datenschutz',
    termsOfService: 'Nutzungsbedingungen',
    siteMap: 'Sitemap',
    allRightsReserved: 'Alle Rechte vorbehalten',
    
    // Language Names
    chinese: '中文',
    english: 'EN',
    german: 'DE',
    french: 'FR'
  },
  'fr': {
    // Brand
    brandName: 'METHAS',
    brandTagline: 'Fournisseur professionnel de solutions neutres en carbone',
    
    // Hero Section
    heroTitle: 'Ouvrir la voie aux solutions climatiques',
    heroSubtitle: 'Depuis 2006, nous aidons les organisations à accélérer leur transition vers un avenir net zéro grâce à des stratégies et solutions d\'action climatique complètes.',
    yearsLeading: 'Années de leadership',
    co2Reduced: 'CO₂ réduit',
    clientsServed: 'Clients servis',
    exploreButton: 'Explorer nos solutions',
    startButton: 'Commencer votre parcours',
    discoverImpact: 'Découvrez notre impact',
    
    // Navigation
    aboutUs: 'À propos',
    whatWeDo: 'Ce que nous faisons',
    ourImpact: 'Notre impact',
    newsInsights: 'Actualités et perspectives',
    contact: 'Contact',
    locations: 'Emplacements',
    getStarted: 'Commencer',
    
    // Footer
    followUs: 'Suivez-nous pour recevoir les dernières mises à jour',
    subscribeEmail: 'Entrez votre email',
    subscribe: 'S\'abonner',
    mediaContact: 'Contact média',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    siteMap: 'Plan du site',
    allRightsReserved: 'Tous droits réservés',
    
    // Language Names
    chinese: '中文',
    english: 'EN',
    german: 'DE',
    french: 'FR'
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('zh-CN')

  // Load saved language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferred-language') as Language
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations[Language]]
    return translation || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}