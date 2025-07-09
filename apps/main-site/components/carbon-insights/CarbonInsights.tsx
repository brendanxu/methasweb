'use client'

import React, { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

// 多语言翻译
const carbonInsightsTranslations = {
  'zh-CN': {
    title: '碳智观察',
    subtitle: '深度洞察碳市场动态，把握可持续发展机遇',
    articles: [
      {
        title: '碳市场月度报告',
        description: '深入分析全球碳市场走势，为您的碳资产管理提供专业指导和前瞻性洞察。',
        category: '市场分析',
        actionText: '下载报告'
      },
      {
        title: 'Article 6 实施指南',
        description: '详解《巴黎协定》第六条机制，帮助企业掌握国际碳信用交易新规则。',
        category: '政策解读',
        actionText: '了解更多'
      },
      {
        title: 'CCER重启深度解读',
        description: '中国核证自愿减排量重启，解析最新政策要点及市场机遇。',
        category: '政策动态',
        actionText: '了解更多'
      },
      {
        title: '企业碳管理指南',
        description: '从碳盘查到碳中和，帮助企业构建完整的碳管理体系。',
        category: '实践指南',
        actionText: '了解更多'
      },
      {
        title: '碳金融创新产品',
        description: '探索碳期货、碳期权等创新金融工具在碳市场中的应用。',
        category: '金融创新',
        actionText: '了解更多'
      },
      {
        title: '全球碳市场链接',
        description: '分析EU ETS、RGGI等国际碳市场互联互通最新进展。',
        category: '国际视野',
        actionText: '了解更多'
      }
    ]
  },
  'en': {
    title: 'Carbon Insights',
    subtitle: 'Deep insights into carbon market dynamics, seizing sustainable development opportunities',
    articles: [
      {
        title: 'Monthly Carbon Market Report',
        description: 'In-depth analysis of global carbon market trends, providing professional guidance and forward-looking insights for your carbon asset management.',
        category: 'Market Analysis',
        actionText: 'Download Report'
      },
      {
        title: 'Article 6 Implementation Guide',
        description: 'Detailed explanation of Article 6 mechanisms of the Paris Agreement, helping companies master new rules for international carbon credit trading.',
        category: 'Policy Interpretation',
        actionText: 'Learn More'
      },
      {
        title: 'CCER Restart Deep Analysis',
        description: 'China Certified Emission Reduction restart, analyzing latest policy points and market opportunities.',
        category: 'Policy Updates',
        actionText: 'Learn More'
      },
      {
        title: 'Corporate Carbon Management Guide',
        description: 'From carbon inventory to carbon neutrality, helping companies build complete carbon management systems.',
        category: 'Practice Guide',
        actionText: 'Learn More'
      },
      {
        title: 'Carbon Financial Innovation Products',
        description: 'Explore the application of innovative financial instruments such as carbon futures and carbon options in carbon markets.',
        category: 'Financial Innovation',
        actionText: 'Learn More'
      },
      {
        title: 'Global Carbon Market Linkage',
        description: 'Analyze the latest progress in interconnection of international carbon markets such as EU ETS and RGGI.',
        category: 'International Perspective',
        actionText: 'Learn More'
      }
    ]
  },
  'de': {
    title: 'Carbon Insights',
    subtitle: 'Tiefe Einblicke in die Dynamik des Kohlenstoffmarktes, nachhaltige Entwicklungschancen nutzen',
    articles: [
      {
        title: 'Monatlicher Kohlenstoffmarktbericht',
        description: 'Tiefgreifende Analyse der globalen Kohlenstoffmarkttrends, professionelle Beratung und zukunftsweisende Einblicke für Ihr Kohlenstoff-Asset-Management.',
        category: 'Marktanalyse',
        actionText: 'Bericht herunterladen'
      },
      {
        title: 'Artikel 6 Umsetzungsleitfaden',
        description: 'Detaillierte Erklärung der Artikel 6-Mechanismen des Pariser Abkommens, Unternehmen bei der Beherrschung neuer Regeln für den internationalen Kohlenstoffkredithandel zu helfen.',
        category: 'Politikinterpretation',
        actionText: 'Mehr erfahren'
      },
      {
        title: 'CCER Neustart Tiefenanalyse',
        description: 'China Certified Emission Reduction Neustart, Analyse der neuesten Politikpunkte und Marktchancen.',
        category: 'Politik-Updates',
        actionText: 'Mehr erfahren'
      },
      {
        title: 'Unternehmens-Kohlenstoffmanagement-Leitfaden',
        description: 'Von der Kohlenstoffinventur zur Kohlenstoffneutralität, Unternehmen beim Aufbau vollständiger Kohlenstoffmanagementsysteme helfen.',
        category: 'Praxisleitfaden',
        actionText: 'Mehr erfahren'
      },
      {
        title: 'Kohlenstoff-Finanzinnovationsprodukte',
        description: 'Erkunden Sie die Anwendung innovativer Finanzinstrumente wie Kohlenstoff-Futures und Kohlenstoff-Optionen in Kohlenstoffmärkten.',
        category: 'Finanzinnovation',
        actionText: 'Mehr erfahren'
      },
      {
        title: 'Globale Kohlenstoffmarkt-Verknüpfung',
        description: 'Analysieren Sie die neuesten Fortschritte bei der Vernetzung internationaler Kohlenstoffmärkte wie EU ETS und RGGI.',
        category: 'Internationale Perspektive',
        actionText: 'Mehr erfahren'
      }
    ]
  },
  'fr': {
    title: 'Perspectives Carbone',
    subtitle: 'Aperçus approfondis de la dynamique du marché du carbone, saisir les opportunités de développement durable',
    articles: [
      {
        title: 'Rapport mensuel du marché du carbone',
        description: 'Analyse approfondie des tendances du marché mondial du carbone, fournissant des conseils professionnels et des perspectives prospectives pour votre gestion d\'actifs carbone.',
        category: 'Analyse de marché',
        actionText: 'Télécharger le rapport'
      },
      {
        title: 'Guide de mise en œuvre Article 6',
        description: 'Explication détaillée des mécanismes de l\'Article 6 de l\'Accord de Paris, aidant les entreprises à maîtriser les nouvelles règles du commerce international de crédits carbone.',
        category: 'Interprétation politique',
        actionText: 'En savoir plus'
      },
      {
        title: 'Analyse approfondie du redémarrage CCER',
        description: 'Redémarrage de la réduction certifiée des émissions de Chine, analyse des derniers points politiques et opportunités de marché.',
        category: 'Mises à jour politiques',
        actionText: 'En savoir plus'
      },
      {
        title: 'Guide de gestion du carbone d\'entreprise',
        description: 'De l\'inventaire carbone à la neutralité carbone, aider les entreprises à construire des systèmes complets de gestion du carbone.',
        category: 'Guide pratique',
        actionText: 'En savoir plus'
      },
      {
        title: 'Produits d\'innovation financière carbone',
        description: 'Explorer l\'application d\'instruments financiers innovants tels que les contrats à terme sur le carbone et les options carbone dans les marchés du carbone.',
        category: 'Innovation financière',
        actionText: 'En savoir plus'
      },
      {
        title: 'Liaison du marché mondial du carbone',
        description: 'Analyser les derniers progrès dans l\'interconnexion des marchés internationaux du carbone tels que EU ETS et RGGI.',
        category: 'Perspective internationale',
        actionText: 'En savoir plus'
      }
    ]
  }
}

export function CarbonInsights() {
  const { language } = useLanguage()
  const t = carbonInsightsTranslations[language]
  // 简化为静态显示4个卡片，不需要复杂的轮播逻辑

  return (
    <>
      <section className="carbon-insights-new">
        <div className="ci-header">
          <h2 className="ci-title">{t.title}</h2>
          <p className="ci-subtitle">{t.subtitle}</p>
        </div>
        
        <div className="ci-carousel">
          <div className="ci-viewport">
            <div className="ci-track" id="ciTrack">
              {t.articles.slice(0, 4).map((article, index) => (
                <article key={index} className="ci-card">
                  <div className="ci-card-image">
                    <img 
                      src={`https://via.placeholder.com/300x200/${['0066cc', '00aa66', 'ff6633', '9933ff'][index]}/ffffff?text=Article+${index + 1}`} 
                      alt={article.title} 
                      loading="lazy"
                      style={{
                        transition: 'transform 0.3s ease',
                        willChange: 'transform'
                      }}
                    />
                    <span className="ci-tag">{article.category}</span>
                  </div>
                  <h3 className="ci-card-title">{article.title}</h3>
                  <p className="ci-card-desc">{article.description}</p>
                  <a href="#" className="ci-card-link">{article.actionText} →</a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* 碳智观察 - 全新样式 */
        .carbon-insights-new {
          padding: 60px 20px;
          background: #f8f9fa;
          overflow: hidden;
        }

        .ci-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .ci-title {
          font-size: 36px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .ci-subtitle {
          font-size: 16px;
          color: #666;
        }

        /* 容器 - 显示4个卡片 */
        .ci-carousel {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          padding: 0 20px;
        }

        /* 视口 - 显示区域 */
        .ci-viewport {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        /* 轨道 - 包含所有卡片，确保4个卡片并排显示 */
        .ci-track {
          display: flex;
          gap: 20px;
          width: 100%;
          min-width: 100%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        /* 卡片样式 - 关键：固定宽度显示4个 */
        .ci-card {
          flex: 0 0 calc(25% - 15px);
          min-width: 280px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .ci-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        /* 图片容器 */
        .ci-card-image {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }

        .ci-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .ci-card:hover .ci-card-image img {
          transform: scale(1.05);
        }

        /* 标签 */
        .ci-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0, 102, 204, 0.9);
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        /* 内容区 */
        .ci-card-title {
          padding: 16px 16px 8px;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.4;
        }

        .ci-card-desc {
          padding: 0 16px;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .ci-card-link {
          display: inline-block;
          padding: 12px 16px 16px;
          color: #0066cc;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .ci-card-link:hover {
          color: #0052a3;
        }


        /* 响应式设计 - 确保不同屏幕都能看到卡片 */
        @media (max-width: 1200px) {
          .ci-card {
            flex: 0 0 calc(33.333% - 15px);
            min-width: 250px;
          }
        }

        @media (max-width: 768px) {
          .ci-card {
            flex: 0 0 calc(50% - 10px);
            min-width: 200px;
          }
          
          .ci-carousel {
            padding: 0 10px;
          }
        }

        @media (max-width: 480px) {
          .ci-card {
            flex: 0 0 calc(100% - 20px);
            min-width: unset;
          }
          
          .ci-title {
            font-size: 28px;
          }
          
          .ci-track {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}