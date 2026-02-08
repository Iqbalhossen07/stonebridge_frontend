import React from 'react';

const WhyStonebridge = () => {
  const reasons = [
    {
      id: 1,
      title: "Expert Guidance",
      desc: "Benefit from the knowledge of our highly accredited and experienced legal professionals.",
      delay: 100,
      icon: <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 19.586V17M12 4.414V7M7 12h10" />
    },
    {
      id: 2,
      title: "Tailored Solutions",
      desc: "We provide personalized strategies designed to meet your specific needs and goals.",
      delay: 200,
      icon: <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    },
    {
      id: 3,
      title: "Proven Track Record",
      desc: "A history of successful outcomes and satisfied clients speaks for itself.",
      delay: 300,
      icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    },
    {
      id: 4,
      title: "Client-Centric Approach",
      desc: "Your success is our priority. We are dedicated to providing attentive and responsive service.",
      delay: 400,
      icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2m2-5h10M7 9l4-4 4 4M7 13l4 4 4-4" />
    },
    {
      id: 5,
      title: "Transparent Process",
      desc: "We believe in clear communication and provide honest advice every step of the way.",
      delay: 500,
      icon: <path d="M9 12.76V6.24M15 12.76V6.24M12 18.26V11.74M12 5.74V2.26M5 12H2M19 12h3M12 21.74V18.26M12 2v3.48" />
    },
    {
      id: 6,
      title: "Utmost Confidentiality",
      desc: "Your privacy is paramount. We handle all cases with the strictest confidentiality.",
      delay: 600,
      icon: <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    }
  ];

  return (
    <section id="why-stonebridge" className="py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900" data-aos="fade-up">
            Why Stonebridge?
          </h2>
          <p className="text-sm md:text-lg text-slate-600 mt-4" data-aos="fade-up" data-aos-delay="100">
            Discover the core reasons why clients trust Stonebridge for their legal and advisory needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item) => (
            <div 
              key={item.id}
              className="card-premium p-8 flex flex-col items-center text-center group cursor-pointer
                         /* --- সিনিয়রের স্পেশাল স্মুথ লজিক --- */
                         !transition-all !duration-500 ease-out transform-gpu 
                         hover:!scale-[1.05] hover:!shadow-2xl hover:!-translate-y-2 
                         will-change-transform backface-hidden"
              data-aos="fade-up" 
              data-aos-delay={item.delay}
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mb-6 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  {item.icon}
                </svg>
              </div>

              <h4 className="font-heading font-semibold text-xl text-slate-800 mb-3 transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStonebridge;