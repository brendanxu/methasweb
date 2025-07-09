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
    heroTitle: '专业的碳中和解决方案提供商',
    heroSubtitleLine1: '助力企业实现双碳目标，',
    heroSubtitleLine2: '构建可持续发展未来',
    heroSubtitle: '助力企业实现双碳目标，构建可持续发展未来',
    yearsLeading: '年领先经验',
    co2Reduced: 'CO₂ 减排量',
    clientsServed: '服务客户',
    exploreButton: '查看案例详情',
    startButton: '开始您的旅程',
    discoverImpact: '继续探索',
    
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
    heroTitle: 'Professional Carbon Neutral Solutions Provider',
    heroSubtitleLine1: 'Helping enterprises achieve dual carbon goals,',
    heroSubtitleLine2: 'Building a sustainable future',
    heroSubtitle: 'Helping enterprises achieve dual carbon goals, Building a sustainable future',
    yearsLeading: 'Years Leading',
    co2Reduced: 'CO₂ Reduced',
    clientsServed: 'Clients Served',
    exploreButton: 'View Case Studies',
    startButton: 'Start Your Journey',
    discoverImpact: 'Continue Exploring',
    
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
    heroTitle: 'Professioneller Anbieter für Kohlenstoffneutralitätslösungen',
    heroSubtitleLine1: 'Unternehmen bei der Erreichung der Dual-Carbon-Ziele helfen,',
    heroSubtitleLine2: 'Eine nachhaltige Zukunft aufbauen',
    heroSubtitle: 'Unternehmen bei der Erreichung der Dual-Carbon-Ziele helfen, Eine nachhaltige Zukunft aufbauen',
    yearsLeading: 'Jahre führend',
    co2Reduced: 'CO₂ reduziert',
    clientsServed: 'Kunden betreut',
    exploreButton: 'Fallstudien ansehen',
    startButton: 'Ihre Reise beginnen',
    discoverImpact: 'Weiter erkunden',
    
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
    heroTitle: 'Fournisseur professionnel de solutions neutres en carbone',
    heroSubtitleLine1: 'Aider les entreprises à atteindre les objectifs de double carbone,',
    heroSubtitleLine2: 'Construire un avenir durable',
    heroSubtitle: 'Aider les entreprises à atteindre les objectifs de double carbone, Construire un avenir durable',
    yearsLeading: 'Années de leadership',
    co2Reduced: 'CO₂ réduit',
    clientsServed: 'Clients servis',
    exploreButton: 'Voir les études de cas',
    startButton: 'Commencer votre parcours',
    discoverImpact: 'Continuer à explorer',
    
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