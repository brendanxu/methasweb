import { useLanguage } from '@/contexts/LanguageContext'

// 多语言翻译
const partnersTranslations = {
  'zh-CN': {
    title: '领先机构的信任选择',
    subtitle: '财富500强企业、政府机构和NGO组织信任我们提供气候影响解决方案',
    partnerLabel: '合作伙伴',
    joinText: '加入1000+机构，与碳智METHAS共同创造气候影响'
  },
  'en': {
    title: 'Trusted by Leading Organizations',
    subtitle: 'Fortune 500 companies, governments, and NGOs trust us to deliver climate impact',
    partnerLabel: 'Partner',
    joinText: 'Join 1000+ organizations creating climate impact with METHAS'
  },
  'de': {
    title: 'Vertrauen führender Organisationen',
    subtitle: 'Fortune 500 Unternehmen, Regierungen und NGOs vertrauen uns bei der Umsetzung von Klimaimpact',
    partnerLabel: 'Partner',
    joinText: 'Schließen Sie sich 1000+ Organisationen an, die mit METHAS Klimaimpact schaffen'
  },
  'fr': {
    title: 'Approuvé par les organisations leader',
    subtitle: 'Les entreprises Fortune 500, les gouvernements et les ONG nous font confiance pour l\'impact climatique',
    partnerLabel: 'Partenaire',
    joinText: 'Rejoignez 1000+ organisations créant un impact climatique avec METHAS'
  }
}

export default function HomepagePartners() {
  const { language } = useLanguage()
  const t = partnersTranslations[language]
  
  const partners = [
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg' },
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="text-gray-400 text-center">
                <div className="text-2xl font-bold mb-1">{partner.name}</div>
                <div className="text-xs opacity-60">{t.partnerLabel}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            {t.joinText}
          </p>
        </div>
      </div>
    </section>
  )
}