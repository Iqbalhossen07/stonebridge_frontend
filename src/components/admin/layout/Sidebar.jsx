import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const Sidebar = ({ isMobile, onClose }) => {
  const location = useLocation();
  
  // ১. বর্তমান পাথ্ ভেরিয়েবল নেয়া
  let currentPath = location.pathname;

  /**
   * ডাইনামিক হাইলাইট লজিক (PHP স্টাইল)
   * যদি ইউআরএল-এ মডিউলের নাম থাকে, তবে মেইন মেনু হাইলাইট করবে।
   * উদাহরণ: /admin/edit-video/123 থাকলে এটি /admin/videos হয়ে যাবে।
   */
  if (currentPath.includes('team')) currentPath = '/admin/team';
  if (currentPath.includes('service')) currentPath = '/admin/services';
  if (currentPath.includes('video')) currentPath = '/admin/videos';
  if (currentPath.includes('blog')) currentPath = '/admin/blogs';
  if (currentPath.includes('gallery')) currentPath = '/admin/gallery';
  if (currentPath.includes('testimonial')) currentPath = '/admin/testimonials';
  if (currentPath.includes('appointment')) currentPath = '/admin/appointments';
  if (currentPath.includes('message')) currentPath = '/admin/messages';
  if (currentPath.includes('occupation')) currentPath = '/admin/eligible-occupation';
  if (currentPath.includes('profile')) currentPath = '/admin/my-profile';

  // লগআউট ফাংশন
  const handleLogout = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from the dashboard!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post('https://stonebridge-api.onrender.com/api/admin/logout', {}, { withCredentials: true });
          if (res.data.success) {
            Swal.fire({ title: 'Logged Out!', text: 'Successfully logged out.', icon: 'success', confirmButtonColor: '#87550D' })
            .then(() => { window.location.href = '/login'; });
          }
        } catch (error) {
          window.location.href = '/login';
        }
      }
    });
  };

  const getLinkClass = (path) => {
    // এখন currentPath ভেরিয়েবলটি আমরা উপরে মডিফাই করে নিয়েছি, তাই সরাসরি চেক করলেই হবে
    const active = currentPath === path;

    return `group flex items-center justify-between px-6 py-3 transition-all duration-300 border-l-4 rounded-md mr-4 ${
      active
        ? "bg-primary/10 border-primary text-primary shadow-sm"
        : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"
    }`;
  };

  return (
    <aside className={`${isMobile ? "w-full" : "w-72 border-r border-slate-100"} h-full bg-white flex flex-col shadow-sm transition-all`}>
      
      {/* লোগো সেকশন */}
      <div className="h-20 flex items-center justify-center border-b border-slate-50 bg-white px-6">
        <Link to="/admin/dashboard">
          <img src="/img/logo.png" alt="Logo" className="w-36 object-contain" />
        </Link>
        {isMobile && (
          <button onClick={onClose} className="absolute right-6 text-slate-400 p-2 hover:bg-slate-50 rounded-full">
            <i className="fas fa-times text-xl"></i>
          </button>
        )}
      </div>

      <nav className="flex-1 py-6 overflow-y-auto hide-scrollbar space-y-1 p-4 font-body">
        
        {/* Core Menu */}
        <div className="px-6 mb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core</p>
        </div>
        <Link to="/admin/dashboard" className={getLinkClass("/admin/dashboard")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-tachometer-alt w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Dashboard</span>
          </div>
        </Link>

        {/* Applications */}
        <div className="px-6 mt-6 mb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applications</p>
        </div>
        <Link to="/admin/messages" className={getLinkClass("/admin/messages")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-envelope w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Messages</span>
          </div>
        </Link>
        <Link to="/admin/appointments" className={getLinkClass("/admin/appointments")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-handshake w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Appointments</span>
          </div>
          {/* <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">2</span> */}
        </Link>

        {/* Website Content */}
        <div className="px-6 mt-6 mb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Website Content</p>
        </div>
        
        <Link to="/admin/team" className={getLinkClass("/admin/team")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-users w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Team</span>
          </div>
        </Link>

        <Link to="/admin/services" className={getLinkClass("/admin/services")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-concierge-bell w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Services</span>
          </div>
        </Link>

        <Link to="/admin/gallery" className={getLinkClass("/admin/gallery")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-images w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Gallery</span>
          </div>
        </Link>

        <Link to="/admin/videos" className={getLinkClass("/admin/videos")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-video w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Videos</span>
          </div>
        </Link>

        <Link to="/admin/blogs" className={getLinkClass("/admin/blogs")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-blog w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Blogs</span>
          </div>
        </Link>

        <Link to="/admin/testimonials" className={getLinkClass("/admin/testimonials")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-comment-dots w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">Testimonials</span>
          </div>
        </Link>

        {/* Settings */}
        <div className="px-6 mt-6 mb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Settings</p>
        </div>
        <Link to="/admin/my-profile" className={getLinkClass("/admin/my-profile")}>
          <div className="flex items-center gap-3">
            <i className="fas fa-user-circle w-5 text-center text-xs"></i>
            <span className="font-bold text-sm">My Profile</span>
          </div>
        </Link>
      </nav>

      {/* Logout বাটন */}
      <div className="p-4 border-t border-slate-50">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm outline-none">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;