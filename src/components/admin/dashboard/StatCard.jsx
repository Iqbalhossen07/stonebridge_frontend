import React from 'react';

const StatCard = ({ title, count, icon, color, iconColor, bgColor, delay }) => {
  // বর্ডার কালার থেকে সলিড ব্যাকগ্রাউন্ড কালার বের করার লজিক (Tailwind এর জন্য)
  const hoverBgColor = color.replace('border-', 'bg-');

  return (
    <div 
      className={`stat-card-premium bg-white p-6 rounded-xl shadow-soft-1 border-l-4 ${color} group cursor-pointer hover:shadow-soft-2 hover:bg-white`}
      data-aos="fade-right"
      data-aos-delay={delay}
    >
      <div className="flex items-center gap-5">
        {/* আইকন বক্স - হোভারে কার্ডের বর্ডার কালার অনুযায়ী সলিড হয়ে যাবে */}
        <div
          className={`stat-icon-box h-14 w-14 ${bgColor} ${iconColor} rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:${hoverBgColor} group-hover:text-white`}
        >
          <i className={`fas ${icon} text-xl`}></i>
        </div>

        {/* টেক্সট এরিয়া */}
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <p className={`font-heading text-2xl font-bold transition-colors duration-300 group-hover:${iconColor}`}>
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;