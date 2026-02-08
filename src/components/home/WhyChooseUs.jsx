import React from 'react';
import HeroBackground from './HeroBackground';

const whyChooseData = [
  {
    id: 1,
    title: "Expert Regulated Advice",
    description: "Regulated at the highest level (IAA Level 3) to handle complex cases, appeals, and asylum claims with proven expertise.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>,
    hoverClass: "hover-bg-amber"
  },
  {
    id: 2,
    title: "High Success Rate",
    description: "Our reputation is built on results. We have a strong track record of securing visas and winning appeals for our clients.",
    icon: <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>,
    hoverClass: "hover-bg-sky"
  },
  {
    id: 3,
    title: "Client-Centric Service",
    description: "We provide clear, honest, and supportive guidance. You get direct access to your dedicated legal advisor.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </>
    ),
    hoverClass: "hover-bg-emerald"
  },
  {
    id: 4,
    title: "Transparent Pricing",
    description: "We believe in honesty. Our pricing is straightforward with no hidden fees, so you know exactly what to expect.",
    icon: (
      <>
        <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
        <path d="M2 20h.01"></path>
      </>
    ),
    hoverClass: "hover-bg-rose"
  },
  {
    id: 5,
    title: "Full-Service Firm",
    description: "From initial application to appeals and business compliance, we cover every aspect of UK immigration law.",
    icon: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>,
    hoverClass: "hover-bg-indigo"
  },
  {
    id: 6,
    title: "Business & HR Support",
    description: "We offer dedicated services for businesses, including sponsor licence applications and HRMS portals for compliance.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <polyline points="17 11 19 13 23 9"></polyline>
      </>
    ),
    hoverClass: "hover-bg-teal"
  }
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="relative py-24 overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            - Why Choose Us -
          </span>
          <h2 className="font-heading text-2xl font-bold md:text-4xl text-slate-900 leading-tight" data-aos="fade-up">
            The Stonebridge Legal Difference
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="100">
            Our commitment to excellence and client success sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="500">
          {whyChooseData.map((item) => (
            <div 
              key={item.id} 
              className={`card-premium ${item.hoverClass} p-6 text-center h-full flex flex-col transition-all duration-300 hover:scale-105`}
            >
              <div className="h-16 w-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center shadow-md ring-1 ring-primary/20 mx-auto">
                <svg className="w-8 h-8" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-heading text-xl text-slate-800 mt-6 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm md:text-base grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;