import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, index }) => {
  return (
    <div 
      className="card-premium p-6 service-card bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300"
      data-aos="fade-up" 
      data-aos-delay={100 + (index % 6) * 100}
    >
      {/* মেইন সার্ভিস টাইটেল */}
      <h3 className="font-heading text-xl text-slate-800 mb-6 font-bold uppercase tracking-wide">
        {service.s_title}
      </h3>
      
      <div className="flex items-start gap-4">
        {/* সার্ভিস আইকন */}
        <div className="h-16 w-16 bg-orange-50 rounded-lg flex items-center justify-center p-2 shadow-inner ring-1 ring-orange-100 shrink-0 group-hover:bg-orange-100 transition-colors">
          <img 
            src={`app/service_images/${service.s_image}`} 
            alt={service.s_title} 
            className="h-full w-full object-contain" 
          />
        </div>

        {/* সাব-সার্ভিস লিস্ট */}
        <ul className="space-y-3 text-slate-700 flex-1">
          {service.sub_services && service.sub_services.map((sub, subIndex) => (
            <li key={subIndex} className="flex items-start gap-3 group/item">
              {/* গোল্ডেন চেক আইকন */}
              <svg 
                className="h-5 w-5 text-primary shrink-0 transition-transform group-hover/item:scale-125 mt-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              
              {/* সাব-সার্ভিসের নাম এবং লিঙ্ক */}
              <Link 
                to={`/service-details/${sub.id}`} 
                className="hover:text-primary transition-colors text-sm md:text-[15px] font-medium leading-tight inline-block"
              >
                {/* নাম রেন্ডার করার মূল লজিক */}
                {sub.sub_service_title || sub.title || sub} 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;