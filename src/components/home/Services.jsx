import React, { useState } from 'react';
import HeroBackground from './HeroBackground';

const Services = () => {
  // ডামি ডাটা - আপনার ডাটাবেসের ডাটাগুলো এখানে অ্যারে হিসেবে আছে
  const allServices = [
    {
      id: 1,
      s_title: "Sponsorship Licence",
      s_image: "sponsor.png",
      sub_services: ["Sponsor Licence Application", "Sponsor Licence Renewal", "Sponsor Licence Suspension"]
    },
    {
      id: 2,
      s_title: "Immigration Compliance",
      s_image: "compliance.png",
      sub_services: ["Civil Penalty", "Home Office Compliance Visit", "Right to Work Check"]
    },
    {
      id: 3,
      s_title: "Skilled Worker Visas",
      s_image: "skilled.png",
      sub_services: ["Skilled Worker Visa", "Minister of Religion Visa", "Health Care Visa"]
    },
    {
      id: 4,
      s_title: "Temporary (Tier 5) Visas",
      s_image: "tier5.png",
      sub_services: ["Religious Worker Visa", "Creative Worker Visa", "Charity Worker Visa"]
    },
    {
      id: 5,
      s_title: "Partner and Family Visas",
      s_image: "family.png",
      sub_services: ["Spouse Visa", "Dependent Visa", "Unmarried Partner Visa"]
    },
    {
      id: 6,
      s_title: "Global Business Mobility",
      s_image: "business.png",
      sub_services: ["Graduate Trainee Visa", "UK Expansion Worker Visa", "Specialist Worker Visa"]
    },
    // ৬ এর বেশি সার্ভিস থাকলে সেগুলো এখানে যোগ করবেন
    {
      id: 7,
      s_title: "Visitor Visas",
      s_image: "visitor.png",
      sub_services: ["Standard Visitor Visa", "Marriage Visitor Visa", "Permitted Paid Engagement"]
    }
  ];

  const [showAll, setShowAll] = useState(false);

  // লজিক: যদি showAll true হয় সব দেখাবে, নাহলে শুধু প্রথম ৬টা দেখাবে
  const visibleServices = showAll ? allServices : allServices.slice(0, 6);

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
              -Our Services-
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 leading-tight mb-4" data-aos="fade-up" data-aos-delay="100">
              Complete Immigration Services
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg" data-aos="fade-up" data-aos-delay="200">
              We provide comprehensive UK immigration advice and legal services at the highest level permitted by regulation, covering a wide range of personal and business immigration matters.
            </p>
          </div>
        </div>

        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
          {visibleServices.map((service, index) => (
            <div 
              key={service.id} 
              className="card-premium p-6 service-card"
              data-aos="fade-up" 
              data-aos-delay={100 + (index % 6) * 100}
            >
              <h3 className="font-heading text-xl text-slate-800 mb-4">
                {service.s_title}
              </h3>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center p-2 shadow-sm ring-1 ring-orange-200 shrink-0">
                  <img 
                    src={`app/service_images/${service.s_image}`} 
                    alt={service.s_title} 
                    className="h-full w-full object-contain" 
                  />
                </div>

                <ul className="space-y-2 text-slate-700">
                  {service.sub_services.map((sub, subIndex) => (
                    <li key={subIndex} className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <a href="#" className="hover:text-primary transition-colors text-sm md:text-lg">
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button - শুধুমাত্র যদি ডাটা ৬ এর বেশি হয় তবেই দেখাবে */}
        {allServices.length > 6 && (
          <div className="text-center mt-16" data-aos="fade-up">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-block px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary"
            >
              {showAll ? "Show Less" : "View All Services"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;