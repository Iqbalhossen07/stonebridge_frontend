import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import HeroBackground from './HeroBackground';

const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // আপনার কাস্টম হোভার ক্লাসগুলো
  const hoverClasses = [
    'hover-bg-amber', 
  
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/service/all-with-sub'); 
        // আপনার ব্যাকএন্ডের রেসপন্স ফরম্যাট অনুযায়ী ডাটা সেট করা
        const data = response.data.data || response.data;
        setAllServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const visibleServices = showAll ? allServices : allServices.slice(0, 6);

  if (loading) {
    return (
      <div className="py-24 text-center min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
              -Our Services-
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 leading-tight mb-4">
              Complete Immigration Services
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg">
              We provide comprehensive UK immigration advice and legal services.
            </p>
          </div>
        </div>

        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
          {visibleServices.map((service, index) => (
            <div 
              key={service._id} 
              // আপনার কাস্টম হোভার ক্লাস ডাইনামিকলি বসানো হয়েছে
              className={`card-premium p-8 bg-white rounded-2xl shadow-sm border border-slate-50 group overflow-hidden ${hoverClasses[index % hoverClasses.length]}`} 
              style={{ 
                transform: 'translateZ(0)', 
                backfaceVisibility: 'hidden',
                perspective: '1000px',
                willChange: 'transform'
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* মেইন সার্ভিস টাইটেল */}
              <h3 className="font-heading text-xl md:text-2xl font-bold text-slate-800 mb-6 text-left group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              
              <div className="flex items-center gap-6">
                {/* ইমেজ হোল্ডার */}
                <div className="h-20 w-20 bg-orange-50/50 rounded-2xl flex items-center justify-center p-3 shadow-sm ring-1 ring-orange-100 shrink-0 overflow-hidden bg-white group-hover:bg-transparent transition-all duration-500">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="h-full w-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-110" 
                    loading="lazy"
                  />
                </div>

                {/* সাব-সার্ভিস লিস্ট */}
                <ul className="space-y-2 text-slate-700 flex-1">
                  {service.sub_services && service.sub_services.slice(0, 4).map((sub) => (
                    <li key={sub._id} className="flex items-center gap-2 group/link">
                      <svg className="h-4 w-4 text-primary shrink-0 transition-transform duration-300 group-hover/link:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <Link 
                        to={`/sub-service-details/${sub._id}`} 
                        className="hover:text-primary transition-colors duration-300 text-sm md:text-base font-semibold text-slate-700"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                  {service.sub_services?.length > 4 && (
                    <li className="text-[10px] text-slate-400 font-medium italic pl-6">
                      + {service.sub_services.length - 4} more services
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {allServices.length > 6 && (
          <div className="text-center mt-16">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-block px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary"
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