import React from 'react';

const WelcomeBanner = ({ name, image }) => {
  // ১. আজকের তারিখ ডাইনামিকভাবে জেনারেট করা
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  // ২. ইমেজ সোর্স হ্যান্ডেল করা (Cloudinary বা Local)
  const profileImg = image && (image.startsWith('http') 
    ? image 
    : `/my_profile/${image}`);

  return (
    <div className="relative bg-white border border-slate-100 p-6 md:p-10 rounded-2xl shadow-soft-1 mb-8 overflow-hidden group font-body">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h2 className="font-heading text-2xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Welcome Back, <span className="text-primary">{name || 'Admin'}</span>!
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl text-base md:text-lg italic font-medium leading-relaxed">
            "Your dedication and hard work are the driving forces behind our success."
          </p>
          
          {/* ডাইনামিক ডেট সেকশন */}
          <div className="mt-6 flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-xl w-fit mx-auto md:mx-0 shadow-sm transition-all hover:border-primary/20 hover:bg-white">
            <i className="far fa-calendar-alt text-primary"></i>
            <p className="font-bold text-slate-700 text-sm tracking-wide">{formattedDate}</p>
          </div>
        </div>
        
        <div className="relative">
          {/* গ্লো ইফেক্ট */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
          
          <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full p-1.5 bg-white shadow-soft-2 ring-1 ring-slate-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
             <img 
               src={profileImg || '/img/admin.png'} 
               alt="Profile" 
               className="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-inner" 
               onError={(e) => { e.target.src = '/img/admin.png'; }}
             />
          </div>
        </div>
      </div>

      {/* Background Decorative Icon - Law theme-এর জন্য Gavel */}
      <i className="fas fa-gavel absolute -bottom-8 -left-8 text-[200px] text-slate-50 group-hover:text-primary/5 transition-all duration-700 transform -rotate-12 pointer-events-none"></i>
    </div>
  );
};

export default WelcomeBanner;