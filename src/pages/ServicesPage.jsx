import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceHero from '../components/services/ServiceHero';
import ServiceCard from '../components/services/ServiceCard';
import HeroBackground from '../components/home/HeroBackground'; 
import CTA from '../components/common/CTA';

const ServicesPage = () => {
  // 🟢 পরিবর্তন এখানে: sub_services কে অবজেক্ট অ্যারেতে রূপান্তর করা হয়েছে
  const allServices = [
    {
      id: 1,
      s_title: "Sponsorship Licence",
      s_image: "sponsor.png",
      sub_services: [
        { id: 101, sub_service_title: "Sponsor Licence Application" },
        { id: 102, sub_service_title: "Sponsor Licence Renewal" },
        { id: 103, sub_service_title: "Sponsor Licence Suspension" }
      ]
    },
    {
      id: 2,
      s_title: "Immigration Compliance",
      s_image: "compliance.png",
      sub_services: [
        { id: 201, sub_service_title: "Civil Penalty" },
        { id: 202, sub_service_title: "Home Office Compliance Visit" },
        { id: 203, sub_service_title: "Right to Work Check" }
      ]
    },
    {
      id: 3,
      s_title: "Skilled Worker Visas",
      s_image: "skilled.png",
      sub_services: [
        { id: 301, sub_service_title: "Skilled Worker Visa" },
        { id: 302, sub_service_title: "Minister of Religion Visa" },
        { id: 303, sub_service_title: "Health Care Visa" }
      ]
    },
    {
      id: 4,
      s_title: "Temporary (Tier 5) Visas",
      s_image: "tier5.png",
      sub_services: [
        { id: 401, sub_service_title: "Religious Worker Visa" },
        { id: 402, sub_service_title: "Creative Worker Visa" },
        { id: 403, sub_service_title: "Charity Worker Visa" }
      ]
    },
    {
      id: 5,
      s_title: "Partner and Family Visas",
      s_image: "family.png",
      sub_services: [
        { id: 501, sub_service_title: "Spouse Visa" },
        { id: 502, sub_service_title: "Dependent Visa" },
        { id: 503, sub_service_title: "Unmarried Partner Visa" }
      ]
    },
    {
      id: 6,
      s_title: "Global Business Mobility",
      s_image: "business.png",
      sub_services: [
        { id: 601, sub_service_title: "Graduate Trainee Visa" },
        { id: 602, sub_service_title: "UK Expansion Worker Visa" },
        { id: 603, sub_service_title: "Specialist Worker Visa" }
      ]
    },
    {
      id: 7,
      s_title: "Visitor Visas",
      s_image: "visitor.png",
      sub_services: [
        { id: 701, sub_service_title: "Standard Visitor Visa" },
        { id: 702, sub_service_title: "Marriage Visitor Visa" },
        { id: 703, sub_service_title: "Permitted Paid Engagement" }
      ]
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0); 
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <ServiceHero />

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
                We provide comprehensive UK immigration advice and legal services at the highest level permitted by regulation.
              </p>
            </div>
          </div>

          <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
            {allServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
};

export default ServicesPage;