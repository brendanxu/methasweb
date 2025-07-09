export default function TeamCulture() {
  const cultureValues = [
    {
      title: 'Purpose-Driven Work',
      description: 'Every team member is motivated by our shared mission to combat climate change and create a sustainable future.',
      icon: '🎯',
      stats: '98% say their work has meaning'
    },
    {
      title: 'Innovation & Learning',
      description: 'We foster a culture of continuous learning, experimentation, and innovation to stay at the forefront of climate solutions.',
      icon: '💡',
      stats: '40+ hours annual learning per employee'
    },
    {
      title: 'Global Collaboration',
      description: 'Our diverse, multicultural team works across borders and time zones to deliver climate solutions worldwide.',
      icon: '🌍',
      stats: '50+ nationalities represented'
    },
    {
      title: 'Work-Life Balance',
      description: 'We believe in sustainable work practices that allow our team to thrive both professionally and personally.',
      icon: '⚖️',
      stats: 'Flexible work arrangements for all'
    }
  ]

  const benefits = [
    {
      category: 'Professional Development',
      items: [
        'Annual learning budget',
        'Conference attendance',
        'Internal training programs',
        'Mentorship opportunities'
      ]
    },
    {
      category: 'Health & Wellness',
      items: [
        'Comprehensive health insurance',
        'Mental health support',
        'Fitness memberships',
        'Wellness programs'
      ]
    },
    {
      category: 'Flexibility',
      items: [
        'Remote work options',
        'Flexible hours',
        'Sabbatical opportunities',
        'Location independence'
      ]
    },
    {
      category: 'Impact & Purpose',
      items: [
        'Climate project involvement',
        'Volunteer time off',
        'Sustainability initiatives',
        'Community engagement'
      ]
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Culture & Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A thriving culture built on shared values, mutual respect, and collective commitment 
            to creating meaningful climate impact while supporting individual growth and well-being.
          </p>
        </div>

        {/* Culture Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {cultureValues.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {value.description}
                  </p>
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {value.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits & Perks */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Benefits & Perks
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We invest in our team's success and well-being with comprehensive benefits 
              and opportunities for growth, impact, and work-life balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  {category.category}
                </h4>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stories */}
        <div className="bg-white rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Voices from Our Team
            </h3>
            <p className="text-gray-600">
              Hear what our team members say about working at 碳智METHAS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Every day I know my work is contributing to a better future for our planet. The impact we create here is truly meaningful.",
                author: "Sarah Chen",
                role: "Climate Scientist",
                location: "Singapore",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
              },
              {
                quote: "The collaborative culture here is incredible. I've learned so much from colleagues across different departments and countries.",
                author: "Marcus Silva",
                role: "Project Developer",
                location: "São Paulo",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                quote: "碳智METHAS gives me the flexibility to balance my work with family life while pursuing my passion for climate action.",
                author: "Emma Thompson",
                role: "Technology Lead",
                location: "London",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <blockquote className="text-gray-600 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-blue-600 text-sm">{testimonial.role}</div>
                  <div className="text-gray-500 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diversity & Inclusion */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Diversity & Inclusion
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe that diverse perspectives and inclusive practices drive innovation 
              and create stronger climate solutions for our global community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600 text-sm">Nationalities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">45%</div>
              <div className="text-gray-600 text-sm">Women in Leadership</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">40+</div>
              <div className="text-gray-600 text-sm">Languages Spoken</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600 text-sm">Employee Resource Groups</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}