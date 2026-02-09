import React from 'react';

const TeamProfileCard = ({ image, name, designation }) => {
  return (
    <div className="lg:col-span-1 space-y-8" data-aos="fade-right">
      <div className="card-premium p-8 text-center bg-white rounded-2xl shadow-soft-2 border border-slate-100 transition-all hover:shadow-xl">
        <div className="relative inline-block">
          {/* ডাটাবেসের অরিজিনাল ইমেজ (Cloudinary URL) ব্যবহার করা হচ্ছে */}
          <img 
            src={image} 
            alt={name} 
            className="h-40 w-40 rounded-full object-cover mx-auto mb-6 ring-4 ring-primary/10 shadow-lg transition-transform duration-500 hover:scale-105" 
          />
        </div>
        <h2 className="font-heading text-3xl text-slate-900 mb-2 font-bold">{name}</h2>
        <p className="text-primary font-bold tracking-wide uppercase text-sm italic">{designation}</p>
        
        <div className="w-16 h-1 bg-primary/20 mx-auto mt-6 rounded-full"></div>
      </div>
    </div>
  );
};

export default TeamProfileCard;