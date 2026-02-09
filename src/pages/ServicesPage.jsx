import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import ServiceHero from '../components/services/ServiceHero';
import ServiceCard from '../components/services/ServiceCard';
import HeroBackground from '../components/home/HeroBackground'; 
import CTA from '../components/common/CTA';

const ServicesPage = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // আপনার এপিআই কল
        const response = await axios.get('https://stonebridge-api.onrender.com/api/service/all-with-sub'); 
        
        // কনসোলের অভিজ্ঞতা অনুযায়ী ডাটা সেট করা
        if (response.data && response.data.success) {
          setAllServices(response.data.data);
        } else {
          setAllServices(response.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <p className="ml-3 font-semibold text-slate-700">Loading All Services...</p>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* ১. সার্ভিস পেজের হিরো */}
      <ServiceHero />

      <section id="services-list" className="relative py-24 overflow-hidden">
        <HeroBackground />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* হেডার টেক্সট */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
              -Our Complete Services-
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 leading-tight mb-4">
              Comprehensive Immigration Solutions
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg">
              Explore our full range of UK immigration advice and legal services tailored to your needs.
            </p>
          </div>

          {/* ২. সব সার্ভিস গ্রিড (এখানে কোনো slice নেই, সব দেখাবে) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
            {allServices.length > 0 ? (
              allServices.map((service) => (
                <div 
                  key={service._id} 
                  // জুম বাদ দিয়ে শুধু হভার এবং ট্রানজিশন রাখা হয়েছে
                  className="card-premium p-8 bg-white rounded-2xl shadow-sm border border-slate-100  hover:shadow-xl  group hover-bg-amber overflow-hidden" 
                
                  data-aos="fade-up"
                >
                  {/* ১. মেইন সার্ভিসের টাইটেল */}
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-slate-800 mb-6 text-left group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* ২. ইমেজ এবং সাব-সার্ভিস সেকশন */}
                  <div className="flex items-center gap-6"> 
                    {/* ইমেজ হোল্ডার - জুমের সব ক্লাস (scale-110) বাদ দেওয়া হয়েছে */}
                    <div className="h-20 w-20 bg-orange-50/50 rounded-2xl flex items-center justify-center p-3 shadow-sm ring-1 ring-orange-100 shrink-0 bg-white group-hover:bg-transparent transition-all duration-500">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="h-full w-full object-contain" // এখানে কোনো transform নেই
                      />
                    </div>

                    {/* সাব-সার্ভিস লিস্ট */}
                    <ul className="space-y-3 text-slate-700 flex-grow">
                      {service.sub_services && service.sub_services.length > 0 ? (
                        service.sub_services.slice(0, 4).map((sub) => (
                          <li key={sub._id} className="flex items-center gap-2 group/link">
                            <svg className="h-5 w-5 text-primary shrink-0 transition-all duration-300 group-hover/link:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <Link 
                              to={`/sub-service-details/${sub._id}`} 
                              className="hover:text-primary transition-colors duration-300 text-sm md:text-base font-semibold text-slate-700"
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-400 text-xs italic">Upcoming services...</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 italic font-medium text-lg">No services found in the legal catalog.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ৩. কল টু অ্যাকশন */}
      <CTA />
    </main>
  );
};

export default ServicesPage;