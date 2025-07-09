'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import OptimizedImage from '@/components/ui/OptimizedImage'

// 多语言翻译
const impactTranslations = {
  'zh-CN': {
    title: '创造持久影响',
    subtitle: '我们的工作远超碳减排范畴。我们为全球社区、生态系统和组织创造积极变化。',
    climateImpactTitle: '全球气候影响',
    features: [
      {
        title: '全球覆盖',
        description: '项目覆盖20+国家，创造具有全球意义的本地影响。'
      },
      {
        title: '社区效益',
        description: '通过可持续发展项目，积极影响200万+人群。'
      },
      {
        title: '生态系统恢复',
        description: '百万公顷森林得到保护和恢复，保护生物多样性。'
      }
    ],
    stats: {
      co2: '万吨二氧化碳减排',
      projects: '全球项目'
    }
  },
  'en': {
    title: 'Creating Lasting Impact',
    subtitle: 'Our work extends far beyond carbon reduction. We create positive change for communities, ecosystems, and organizations worldwide.',
    climateImpactTitle: 'Climate Impact Across the Globe',
    features: [
      {
        title: 'Global Reach',
        description: 'Projects delivered across 20+ countries, creating local impact with global significance.'
      },
      {
        title: 'Community Benefits',
        description: '2M+ people positively impacted through our sustainable development projects.'
      },
      {
        title: 'Ecosystem Restoration',
        description: 'Million hectares of forest protected and restored, preserving biodiversity.'
      }
    ],
    stats: {
      co2: 'Tonnes CO₂ Reduced',
      projects: 'Projects Worldwide'
    }
  },
  'de': {
    title: 'Nachhaltige Wirkung schaffen',
    subtitle: 'Unsere Arbeit geht weit über die Kohlenstoffreduzierung hinaus. Wir schaffen positive Veränderungen für Gemeinden, Ökosysteme und Organisationen weltweit.',
    climateImpactTitle: 'Klimawirkung auf der ganzen Welt',
    features: [
      {
        title: 'Globale Reichweite',
        description: 'Projekte in über 20 Ländern durchgeführt, mit lokalem Impact und globaler Bedeutung.'
      },
      {
        title: 'Gemeinschaftsnutzen',
        description: 'Über 2 Millionen Menschen positiv durch unsere nachhaltigen Entwicklungsprojekte beeinflusst.'
      },
      {
        title: 'Ökosystem-Wiederherstellung',
        description: 'Millionen Hektar Wald geschützt und wiederhergestellt, Biodiversität bewahrt.'
      }
    ],
    stats: {
      co2: 'Tonnen CO₂ reduziert',
      projects: 'Projekte weltweit'
    }
  },
  'fr': {
    title: 'Créer un impact durable',
    subtitle: 'Notre travail va bien au-delà de la réduction carbone. Nous créons des changements positifs pour les communautés, les écosystèmes et les organisations dans le monde entier.',
    climateImpactTitle: 'Impact climatique à travers le monde',
    features: [
      {
        title: 'Portée mondiale',
        description: 'Projets réalisés dans plus de 20 pays, créant un impact local avec une signification mondiale.'
      },
      {
        title: 'Avantages communautaires',
        description: 'Plus de 2 millions de personnes impactées positivement par nos projets de développement durable.'
      },
      {
        title: 'Restauration d\'écosystèmes',
        description: 'Millions d\'hectares de forêt protégés et restaurés, préservant la biodiversité.'
      }
    ],
    stats: {
      co2: 'Tonnes de CO₂ réduites',
      projects: 'Projets dans le monde'
    }
  }
}

export default function HomepageImpact() {
  const { language } = useLanguage()
  const t = impactTranslations[language]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              {t.climateImpactTitle}
            </h3>
            
            <div className="space-y-6">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-12 h-12 ${
                    index === 0 ? 'bg-green-100' : 
                    index === 1 ? 'bg-blue-100' : 'bg-purple-100'
                  } rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    <span className={`${
                      index === 0 ? 'text-green-600' : 
                      index === 1 ? 'text-blue-600' : 'text-purple-600'
                    } text-xl`}>
                      {index === 0 ? '🌍' : index === 1 ? '👥' : '🌱'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
                alt="Climate impact"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                priority
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">50M+</div>
              <div className="text-gray-600 text-sm">{t.stats.co2}</div>
            </div>
            
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">700+</div>
              <div className="text-gray-600 text-sm">{t.stats.projects}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}