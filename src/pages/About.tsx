import React from 'react';
import { MapPin, Award, Coffee, Heart } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Ana Crespo",
      role: "Founder & Head of Operations",
      image: "https://images.pexels.com/photos/4350057/pexels-photo-4350057.jpeg",
      bio: "Third-generation coffee grower with a passion for sustainable farming and women's empowerment in agriculture."
    },
    {
      name: "Carlos Crespo",
      role: "Farm Manager",
      image: "https://images.pexels.com/photos/4339618/pexels-photo-4339618.jpeg",
      bio: "Expert in agroforestry systems and organic farming practices, overseeing our day-to-day farm operations."
    },
    {
      name: "Maria Santos",
      role: "Quality Controller",
      image: "https://images.pexels.com/photos/4085628/pexels-photo-4085628.jpeg",
      bio: "Certified Q-grader with 15 years of experience in coffee quality assessment and processing optimization."
    }
  ];

  const timeline = [
    { year: "1985", event: "The Crespo family begins farming in Yunguilla Valley" },
    { year: "2010", event: "Transition to organic and sustainable farming practices" },
    { year: "2018", event: "Ana takes over farm management, focusing on specialty coffee" },
    { year: "2021", event: "First specialty coffee exports to international markets" },
    { year: "2023", event: "Pillcocaja brand officially launched" },
    { year: "2024", event: "Partnership with 15+ specialty roasters worldwide" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative section-padding bg-cover bg-center text-white"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/4350057/pexels-photo-4350057.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative pt-24">
        <div className="container-width text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            The Pillcocaja Story
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 hero-desc font-light">
            Three generations of coffee expertise, rooted in the pristine Yunguilla Valley 
            and guided by principles of sustainability and community.
          </p>
        </div>
        </div>
      </section>

      {/* Name Origin */}
      <section className="section-padding bg-cream-50">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">
                What's in a Name?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                "Pillcocaja" comes from the Quechua language, meaning "little bird's nest." 
                It perfectly captures how our coffee plants nestle among the native trees 
                of the Yunguilla Valley, creating a harmonious ecosystem where exceptional 
                coffee grows naturally.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Like birds carefully building their nests, we've cultivated our farm with 
                patience, respect for nature, and attention to every detail. Each coffee 
                tree is part of a larger family, protected and nurtured within the 
                embrace of our mountain home.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4339618/pexels-photo-4339618.jpeg" 
                alt="Coffee plants in natural habitat" 
                className="w-full h-96 object-cover rounded-xl shadow-xl"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-forest-800 font-semibold text-sm">Pillcocaja</div>
                <div className="text-gray-600 text-xs">Little Bird's Nest</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">
              Our Journey
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From humble beginnings to international recognition, our story is one 
              of dedication, innovation, and unwavering commitment to quality.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-cacao-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-lg text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Yunguilla Valley */}
      <section className="section-padding bg-gradient-to-r from-forest-50 to-cream-100">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.pexels.com/photos/4226805/pexels-photo-4226805.jpeg" 
                alt="Yunguilla Valley landscape" 
                className="w-full h-96 object-cover rounded-xl shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-8 w-8 text-forest-600" />
                <h2 className="font-serif text-4xl font-bold text-forest-900">
                  Yunguilla Valley Roots
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nestled in the Andean foothills of Ecuador, Yunguilla Valley is a hidden 
                gem where indigenous traditions meet modern sustainability practices. 
                Our family has been stewards of this land for nearly four decades.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-forest-600 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-700">
                    <strong>Unique Microclimate:</strong> Perfect balance of temperature, 
                    rainfall, and altitude for exceptional coffee cultivation
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-forest-600 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-700">
                    <strong>Rich Biodiversity:</strong> Home to over 200 bird species 
                    and countless native plant varieties
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-forest-600 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-700">
                    <strong>Cultural Heritage:</strong> Deep indigenous roots with 
                    traditional farming wisdom passed down through generations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The passionate people behind Pillcocaja, each bringing their unique 
              expertise and love for exceptional coffee to our family business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card p-6 text-center group">
                <div className="mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-cacao-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gradient-to-r from-forest-800 to-cacao-700 text-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-6">
              Our Values
            </h2>
            <p className="text-xl max-w-2xl mx-auto opacity-90 hero-desc">
              The principles that guide every decision we make, from farming 
              practices to business relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4">Quality</h3>
              <p className="text-sm opacity-80">
                Uncompromising commitment to excellence in every aspect of our coffee
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4">Family</h3>
              <p className="text-sm opacity-80">
                Treating everyone in our extended community as part of the family
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4">Integrity</h3>
              <p className="text-sm opacity-80">
                Transparent, honest relationships built on trust and mutual respect
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4">Stewardship</h3>
              <p className="text-sm opacity-80">
                Caring for our land, community, and future generations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section-padding bg-cream-50">
        <div className="container-width text-center">
          <h2 className="font-serif text-4xl font-bold text-forest-900 mb-12">
            Recognition & Awards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8">
              <Award className="h-12 w-12 text-cacao-600 mx-auto mb-4" />
              <h3 className="font-semibold text-forest-900 mb-3">Cup of Excellence</h3>
              <p className="text-gray-600 text-sm mb-2">2023 Finalist</p>
              <p className="text-gray-600 text-sm">Ecuador National Competition</p>
            </div>

            <div className="card p-8">
              <Award className="h-12 w-12 text-cacao-600 mx-auto mb-4" />
              <h3 className="font-semibold text-forest-900 mb-3">Women in Coffee Award</h3>
              <p className="text-gray-600 text-sm mb-2">2022 Winner</p>
              <p className="text-gray-600 text-sm">International Coffee Organization</p>
            </div>

            <div className="card p-8">
              <Award className="h-12 w-12 text-cacao-600 mx-auto mb-4" />
              <h3 className="font-semibold text-forest-900 mb-3">Sustainability Champion</h3>
              <p className="text-gray-600 text-sm mb-2">2024 Recognition</p>
              <p className="text-gray-600 text-sm">Rainforest Alliance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
