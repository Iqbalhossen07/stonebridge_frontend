import React from 'react';
import { Link } from 'react-router-dom';

const TestimonialCard = ({ item, onDelete }) => {
  // ডাটাবেসের রেটিং নাম্বারটি নেওয়া (যদি না থাকে তবে ডিফল্ট ৫)
  const rating = item.rating || 5;

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-soft-1 border border-slate-50 flex flex-col h-full hover:shadow-soft-2 transition-all duration-500 group testimonial-row">
      
      {/* ক্লায়েন্ট ইনফো ও কোট আইকন */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* ক্লাউডিনারি থেকে আসা সরাসরি ইমেজ ইউআরএল */}
            <img 
              src={item.image} 
              className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md group-hover:scale-110 transition-transform"
              alt={item.name}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[8px] border-2 border-white">
              <i className="fas fa-check"></i>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{item.designation}</p>
          </div>
        </div>
        <i className="fas fa-quote-right text-3xl text-slate-100 group-hover:text-primary/20 transition-colors"></i>
      </div>

      {/* রেটিং স্টারস (ডাইনামিক লুপ) */}
      <div className="flex items-center gap-1 mb-4 bg-amber-50 w-fit px-3 py-1 rounded-full border border-amber-100/50">
        {[...Array(5)].map((_, i) => (
          <i 
            key={i} 
            className={`fas fa-star text-[10px] ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
          ></i>
        ))}
        <span className="text-[11px] font-bold text-amber-700 ml-1.5">{rating}.0</span>
      </div>

      {/* রিভিউ টেক্সট (HTML ট্যাগ রিমুভ করে ক্লিন টেক্সট দেখানো হয়েছে) */}
      <div className="flex-grow">
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 italic">
          "{item.description ? item.description.replace(/<[^>]*>?/gm, '') : ""}"
        </p>
      </div>

      {/* অ্যাকশন বাটনসমূহ */}
      <div className="mt-8 pt-5 border-t border-slate-50 flex justify-end gap-3">
        {/* View Button */}
        <Link 
          to={`/admin/testimonial-view/${item._id}`} 
          className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          title="View Review"
        >
          <i className="fas fa-eye text-xs"></i>
        </Link>
        
        {/* Edit Button */}
        <Link 
          to={`/admin/edit-testimonial/${item._id}`} 
          className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm"
          title="Edit Review"
        >
          <i className="fas fa-pencil-alt text-xs"></i>
        </Link>
        
        {/* Delete Button - _id ব্যবহার করা হয়েছে */}
        <button 
          onClick={() => onDelete(item._id)}
          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
          title="Delete Review"
        >
          <i className="fas fa-trash-alt text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;