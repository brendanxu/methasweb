export default function HomepageImpact() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Creating Lasting Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our work extends far beyond carbon reduction. We create positive change 
            for communities, ecosystems, and organizations worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Climate Impact Across the Globe
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-green-600 text-xl">🌍</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h4>
                  <p className="text-gray-600">Projects delivered across 20+ countries, creating local impact with global significance.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-blue-600 text-xl">👥</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Benefits</h4>
                  <p className="text-gray-600">2M+ people positively impacted through our sustainable development projects.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-purple-600 text-xl">🌱</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Ecosystem Restoration</h4>
                  <p className="text-gray-600">Million hectares of forest protected and restored, preserving biodiversity.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
              alt="Climate impact"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            
            {/* Floating Stats */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">50M+</div>
              <div className="text-gray-600 text-sm">Tonnes CO₂ Reduced</div>
            </div>
            
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">700+</div>
              <div className="text-gray-600 text-sm">Projects Worldwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}