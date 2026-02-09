import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/testimonial/all'); 
        // আপনার সার্ভার যেহেতু সরাসরি অ্যারে পাঠাচ্ছে
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-primary mr-2"></div>
        Loading Testimonials...
      </div>
    );
  }

  return (
    <section id="testimonials" className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border-primary/20 mb-2">-Our Happy Clients-</span>
          <p className="font-lora text-2xl md:text-4xl font-bold text-slate-900 leading-tight">Real Clients. Real Success</p>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg">Testimonials relate to individual cases handled by Stonebridge Legal Solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((t) => (
              <div key={t._id} className="bg-white rounded-xl shadow-soft-1 border border-slate-200/80 p-8 flex flex-col h-full testimonial-card-item transition-all duration-300 hover:scale-105 hover:bg-slate-200">
                <svg className="w-10 h-10 text-slate-300 mb-4" viewBox="0 0 44 34" fill="none">
                  <path d="M15.6042 34H0L10.0521 0H22.1042L15.6042 34ZM41.6042 34H26L36.0521 0H44L41.6042 34Z" fill="currentColor" />
                </svg>
                
                {/* CKEditor এর ডাটা দেখানোর জন্য dangerouslySetInnerHTML ব্যবহার করা হয়েছে যদি HTML ট্যাগ থাকে */}
                <div 
                  className="grow text-slate-600 leading-relaxed testimonial-text-box overflow-y-auto"
                  style={{ maxHeight: '4.5rem' }} // ৩ লাইন পর স্ক্রল ঠিক রাখার জন্য
                  dangerouslySetInnerHTML={{ __html: t.description }} 
                />

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    {/* ইমেজ দেখানোর জন্য */}
                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <div>
                      <p className="font-lora text-md font-bold text-slate-800">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="font-bold text-slate-700">{t.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No testimonials found in database.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;