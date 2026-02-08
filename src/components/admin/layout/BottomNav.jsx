import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BottomNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  // লগআউট ফাংশন
  const handleLogout = async () => {
    setIsDrawerOpen(false);
    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      confirmButtonText: 'Yes, Logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post('https://stonebridge-api.onrender.com/api/admin/logout', {}, { withCredentials: true });
          if (res.data.success) window.location.href = '/login';
        } catch (error) { window.location.href = '/login'; }
      }
    });
  };

  // ডাইনামিক স্টাইল লজিক (Apps বাটনসহ সবার জন্য)
  const getIconStyle = (path, isAppsButton = false) => {
    // Apps বাটনের জন্য লজিক: যদি ড্রয়ার খোলা থাকে তবে বড়, নাহলে ছোট
    if (isAppsButton) {
      return isDrawerOpen 
        ? "w-14 h-14 bg-primary text-white -mt-10 shadow-lg border-4 border-[#F8FAFC]" 
        : "w-10 h-10 bg-transparent text-slate-400 mt-0 border-none";
    }
    // বাকি লিঙ্কগুলোর জন্য লজিক: যদি একটিভ থাকে তবে বড়, নাহলে ছোট
    return isActive(path) 
      ? "w-14 h-14 bg-primary text-white -mt-10 shadow-lg border-4 border-[#F8FAFC]" 
      : "w-10 h-10 bg-transparent text-slate-400 mt-0 border-none";
  };

  const getTextStyle = (path, isAppsButton = false) => {
    const active = isAppsButton ? isDrawerOpen : isActive(path);
    return active ? "text-primary font-black mt-1 scale-110" : "text-slate-400 font-bold mt-1 scale-100";
  };

  return (
    <>
      {/* বটম নেভিগেশন বার */}
      <div className="fixed bottom-4 inset-x-4 bg-white/95 backdrop-blur-md border border-slate-100 h-16 rounded-2xl flex items-end justify-around pb-2 z-40 lg:hidden shadow-soft-2 transition-all duration-500">
        
        {/* Home Link */}
        <Link to="/admin/dashboard" className="flex flex-col items-center transition-all duration-300">
          <div className={`${getIconStyle('/admin/dashboard')} rounded-full flex items-center justify-center transition-all duration-500`}>
            <i className="fas fa-tachometer-alt text-lg"></i>
          </div>
          <span className={`text-[9px] uppercase tracking-tighter transition-all ${getTextStyle('/admin/dashboard')}`}>Home</span>
        </Link>
        
        {/* Inbox Link */}
        <Link to="/admin/messages" className="flex flex-col items-center transition-all duration-300">
          <div className={`${getIconStyle('/admin/messages')} rounded-full flex items-center justify-center transition-all duration-500`}>
            <i className="fas fa-envelope text-lg"></i>
          </div>
          <span className={`text-[9px] uppercase tracking-tighter transition-all ${getTextStyle('/admin/messages')}`}>Inbox</span>
        </Link>

       

        {/* Book Link */}
        <Link to="/admin/appointments" className="flex flex-col items-center transition-all duration-300">
          <div className={`${getIconStyle('/admin/appointments')} rounded-full flex items-center justify-center transition-all duration-500`}>
            <i className="fas fa-calendar-check text-lg"></i>
          </div>
          <span className={`text-[9px] uppercase tracking-tighter transition-all ${getTextStyle('/admin/appointments')}`}>Book</span>
        </Link>

        {/* Me Link */}
        <Link to="/admin/my-profile" className="flex flex-col items-center transition-all duration-300">
          <div className={`${getIconStyle('/admin/my-profile')} rounded-full flex items-center justify-center transition-all duration-500`}>
            <i className="fas fa-user-circle text-lg"></i>
          </div>
          <span className={`text-[9px] uppercase tracking-tighter transition-all ${getTextStyle('/admin/my-profile')}`}>Me</span>
        </Link>

         {/* ডাইনামিক Apps বাটন */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center transition-all duration-300"
        >
          <div className={`${getIconStyle(null, true)} rounded-full flex items-center justify-center transition-all duration-500 transform active:scale-90`}>
            <i className="fas fa-th-large text-xl"></i>
          </div>
          <span className={`text-[9px] uppercase tracking-wider transition-all ${getTextStyle(null, true)}`}>Apps</span>
        </button>
      </div>

      {/* ড্রয়ার কোড আগের মতোই থাকবে */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300 lg:hidden ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div 
          className={`absolute bottom-0 inset-x-0 bg-white rounded-t-[40px] p-8 pb-12 transition-transform duration-500 ease-out transform ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6"></div>
          {/* বাকি ড্রয়ার কন্টেন্ট... */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 uppercase tracking-[3px] text-xs">Control Center</h3>
            <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-red-500"><i className="fas fa-times-circle text-2xl"></i></button>
          </div>
          <div className="grid grid-cols-4 gap-y-8 gap-x-2 h-[40vh] overflow-y-auto hide-scrollbar">
            <MenuIcon icon="fa-users" label="Team" link="/admin/team" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-concierge-bell" label="Services" link="/admin/services" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-images" label="Gallery" link="/admin/gallery" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-video" label="Videos" link="/admin/videos" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-blog" label="Blogs" link="/admin/blogs" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-comment-dots" label="Reviews" link="/admin/testimonials" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-envelope" label="Messages" link="/admin/messages" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-user-cog" label="Profile" link="/admin/my-profile" onClick={() => setIsDrawerOpen(false)} />
            <MenuIcon icon="fa-tachometer-alt" label="Dash" link="/admin/dashboard" onClick={() => setIsDrawerOpen(false)} />
            <button onClick={handleLogout} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-red-50 text-red-500 border border-red-100 transition-all duration-300 group-hover:scale-110">
                <i className="fas fa-power-off"></i>
              </div>
              <span className="text-[10px] font-bold text-red-500 uppercase">Exit</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuIcon = ({ icon, label, link, onClick }) => (
  <Link to={link} onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-xl text-slate-600 border border-slate-100 shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-active:scale-95">
      <i className={`fas ${icon}`}></i>
    </div>
    <span className="text-[10px] font-bold text-slate-600 text-center uppercase tracking-tighter">{label}</span>
  </Link>
);

export default BottomNav;