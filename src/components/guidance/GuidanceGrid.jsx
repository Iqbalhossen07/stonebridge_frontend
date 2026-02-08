import React from 'react';
import { Link } from 'react-router-dom';

const GuidanceGrid = ({ visaData = [] }) => {
  
  
  // ডাটা না থাকলে সেফটি চেক
  if (!visaData || visaData.length === 0) {
    return <div className="text-center py-10">No Data Available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
      {visaData.map((visa, idx) => (
        <div 
          key={visa.id}
          className="bg-white rounded-xl shadow-soft-2 border-l-[6px] border-primary p-8 flex flex-col transition-all duration-300 hover:shadow-glow"
          data-aos="fade-up"
          data-aos-delay={idx * 100}
        >
          {/* টাইটেল সেকশন */}
          <h3 className="font-heading text-2xl md:text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
            {visa.visa_type}
          </h3>

          {/* রিকোয়ারমেন্ট লিস্ট */}
          <div className="mb-8">
            <p className="font-semibold text-slate-700 mb-4 text-base">What's Required:</p>
            <ul className="space-y-3 text-slate-600">
              {visa.required_documents.map((req, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* বাটন */}
          <div className="mt-auto">
            <Link 
              to={`/request-help/${visa.id}`}
              className="inline-block w-full text-center bg-primary text-white font-semibold text-sm rounded-md py-2.5 px-6 transition-all hover:bg-opacity-90"
            >
              Request Help
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuidanceGrid;