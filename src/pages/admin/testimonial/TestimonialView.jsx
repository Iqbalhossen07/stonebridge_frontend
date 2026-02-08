import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const TestimonialView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে টেস্টিমোনিয়াল ডিটেইলস নিয়ে আসা
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await axios.get(`https://stonebridge-api.onrender.com/api/testimonial/single/${id}`);
        setTestimonial(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
        Swal.fire('Error', 'Review not found!', 'error');
        navigate('/admin/testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonial();
  }, [id, navigate]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-slate-400 font-medium tracking-widest uppercase text-[10px]">Fetching Success Story...</p>
    </div>
  );

  if (!testimonial) return null;

  return (
    <div className="max-w-[1000px] mx-auto pb-24">
      {/* ব্যাক বাটন */}
      <div className="mb-10">
        <button 
          onClick={() => navigate('/admin/testimonials')}
          className="group flex items-center gap-3 text-slate-400 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[3px]"
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-soft-1 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all border border-slate-50">
            <i className="fas fa-arrow-left"></i>
          </div>
          Back to Testimonials
        </button>
      </div>

      {/* মেইন ভিউ কার্ড */}
      <div className="bg-white rounded-[48px] shadow-soft-2 border border-slate-50 overflow-hidden relative">
        {/* টপ ডেকোরেশন আইকন */}
        <div className="absolute top-10 right-12 text-slate-50 text-8xl pointer-events-none">
          <i className="fas fa-quote-right"></i>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* বাম পাশ: কন্টেন্ট এরিয়া (৭ কলাম) */}
          <div className="lg:col-span-7 p-8 lg:p-16 space-y-8">
            {/* রেটিং সেকশন */}
            <div className="flex items-center gap-2 bg-amber-50 w-fit px-4 py-2 rounded-2xl border border-amber-100">
              <div className="flex text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < testimonial.rating ? '' : 'text-slate-200'}`}></i>
                ))}
              </div>
              <span className="text-xs font-black text-amber-700 ml-1">{testimonial.rating}.0 Rating</span>
            </div>

            {/* কোট সেকশন */}
            <div className="relative">
              <i className="fas fa-quote-left text-primary/20 text-4xl absolute -top-6 -left-4"></i>
              <blockquote className="text-xl font-heading font-medium text-slate-700 leading-relaxed italic relative z-10">
                "{testimonial.description ? testimonial.description.replace(/<[^>]*>?/gm, '') : ""}"
              </blockquote>
            </div>

            <div className="h-1.5 w-24 bg-primary/10 rounded-full"></div>
          </div>

          {/* ডান পাশ: লেখক প্রোফাইল (৫ কলাম) */}
          <div className="lg:col-span-5 bg-slate-50/50 p-8 lg:p-16 flex flex-col items-center justify-center text-center border-l border-slate-100">
             <div className="relative mb-8 group">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-44 h-44 rounded-[40px] object-cover border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500"
                />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-primary border border-slate-50">
                  <i className="fas fa-user-check text-xl"></i>
                </div>
             </div>

             <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-2">Verified Client</p>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{testimonial.name}</h3>
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{testimonial.designation}</p>
             </div>

             {/* মোবাইল অ্যাকশন বাটন */}
             <div className="mt-12 w-full lg:hidden">
               <button 
                  onClick={() => navigate('/admin/testimonials')}
                  className="w-full bg-white text-slate-500 font-bold py-4 rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-all"
               >
                  CLOSE VIEW
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialView;