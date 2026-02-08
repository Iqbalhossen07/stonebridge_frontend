import React from 'react';

const testimonialsData = [
  { id: 1, name: "Md Imran Hossain", review: "5.0", des: "Excellent service from start to finish. Highly recommended for UK visa." },
  { id: 2, name: "Sarah Khan", review: "4.9", des: "The solicitor was very professional and helped me with my complex asylum case." },
  { id: 3, name: "Ahmed Ali", review: "5.0", des: "Stonebridge Legal handled my Skilled Worker visa perfectly. Thank you!Stonebridge Legal handled my Skilled Worker visa perfectly. Thank you!Stonebridge Legal handled my Skilled Worker visa perfectly. Thank you!Stonebridge Legal handled my Skilled Worker visa perfectly. Thank you!" },

];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border-primary/20 mb-2">-Our Happy Clients-</span>
          <p className="font-lora text-2xl md:text-4xl font-bold text-slate-900 leading-tight" data-aos="fade-up">Real Clients. Real Success</p>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg">Testimonials relate to individual cases handled by Stonebridge Legal Solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-soft-1 border border-slate-200/80 p-8 flex flex-col h-full testimonial-card-item transition-all duration-300 hover:scale-105 hover:bg-slate-200"  >
              <svg className="w-10 h-10 text-slate-300 mb-4" viewBox="0 0 44 34" fill="none"><path d="M15.6042 34H0L10.0521 0H22.1042L15.6042 34ZM41.6042 34H26L36.0521 0H44L41.6042 34Z" fill="currentColor" /></svg>
              <div className="grow text-slate-600 leading-relaxed testimonial-text-box">{t.des}</div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
               <div>
                 <p className="font-lora text-md font-bold text-slate-800">{t.name}</p>
               </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span className="font-bold text-slate-700">{t.review}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;