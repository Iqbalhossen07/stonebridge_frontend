import React from 'react';

const StatCard = ({ title, count, icon, color, iconColor, bgColor, delay }) => {
  // বর্ডার কালার থেকে সলিড ব্যাকগ্রাউন্ড কালার বের করার লজিক
  const hoverBgColor = color.replace('border-', 'bg-');

  return (
    <div 
      className={`stat-card-premium bg-white p-6 rounded-2xl shadow-soft-1 border-l-4 ${color} group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
      data-aos="fade-right"
      data-aos-delay={delay}
    >
      <div className="flex items-center gap-5">
        {/* আইকন বক্স - হোভারে আইকন কালার সাদা না হয়ে নিজের কালারেই থাকবে */}
        <div
          className={`stat-icon-box h-14 w-14 ${bgColor} ${iconColor} rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-110`}
        >
          <i className={`fas ${icon} text-xl transition-transform duration-300 group-hover:rotate-12`}></i>
        </div>

        {/* টেক্সট এরিয়া */}
        <div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
          <p className={`font-heading text-2xl font-black text-slate-800 transition-colors duration-300 group-hover:${iconColor}`}>
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;