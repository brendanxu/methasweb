import { CompanyInfo } from '@/lib/types'

interface HistorySectionProps {
  data?: CompanyInfo
}

export default function HistorySection({ data }: HistorySectionProps) {
  const title = data?.title || "Our Journey"
  const subtitle = data?.subtitle || "18 Years of Climate Leadership"
  const content = data?.content || "Since our founding in 2006, 碳智METHAS has grown from a small consultancy to a global leader in climate solutions. Our journey reflects our unwavering commitment to creating meaningful environmental impact."

  const milestones = [
    {
      year: "2006",
      title: "Foundation",
      description: "碳智METHAS founded in Zurich by Renat Heuberger and Maximilian Horster with a mission to accelerate climate action.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
    },
    {
      year: "2010",
      title: "Global Expansion",
      description: "Opened offices in Beijing and Singapore, marking our expansion into Asia-Pacific markets.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop"
    },
    {
      year: "2015",
      title: "100 Million Milestone",
      description: "Reached 100 million tonnes of CO₂ equivalent reduced through our projects worldwide.",
      image: "https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=600&h=400&fit=crop"
    },
    {
      year: "2018",
      title: "Technology Innovation",
      description: "Launched digital platforms for carbon accounting and sustainability management.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"
    },
    {
      year: "2021",
      title: "Nature-Based Solutions",
      description: "Expanded focus on nature-based climate solutions and biodiversity conservation projects.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
    },
    {
      year: "2024",
      title: "Net Zero Leadership",
      description: "Helping 1000+ organizations achieve their net-zero commitments with science-based solutions.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-blue-600 font-semibold mb-6">
              {subtitle}
            </p>
          )}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block"></div>

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Content */}
                <div className="flex-1 lg:max-w-lg">
                  <div className={`bg-white rounded-2xl p-8 shadow-lg ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-6">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 hidden lg:block">
                  <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Image */}
                <div className="flex-1 lg:max-w-lg">
                  <div className="relative">
                    <img 
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-24">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              The Future of Climate Action
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
              As we look ahead, we remain committed to innovation, impact, and partnership. 
              Together, we're building a climate-positive future for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/vision"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Our Vision for 2030
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="/innovation"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Innovation Hub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}