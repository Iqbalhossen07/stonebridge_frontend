import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import BottomNav from './BottomNav';

const AdminLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminData, setAdminData] = useState({ name: '', image: '' });

  // ব্যাকএন্ড থেকে বর্তমান অ্যাডমিনের ডাটা লোড করা
  useEffect(() => {
    const getAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/check-auth', { 
          withCredentials: true 
        });
        if (res.data.authenticated) {
          setAdminData({
            name: res.data.admin.name,
            image: res.data.admin.image
          });
        }
      } catch (err) {
        console.error("Layout context error:", err);
      }
    };
    getAdminData();
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-body text-slate-800 antialiased overflow-hidden">
      
      {/* ১. ডেক্সটপ সাইডবার */}
      <div className="hidden lg:flex shrink-0">
        {/* সাইডবারেও ডাটা পাস করছি যদি সেখানে প্রোফাইল দেখান */}
        <Sidebar name={adminData.name} image={adminData.image} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* ২. হেডার - এখানে ডাইনামিক ডাটা পাস হচ্ছে */}
        <AdminHeader 
          name={adminData.name} 
          image={adminData.image} 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />

        {/* ৩. মেইন কন্টেন্ট */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 lg:pb-8 custom-scrollbar">
          <div className="max-w-400 mx-auto">
            {children}
          </div>
        </main>

        {/* ৪. মোবাইল বটম নেভ */}
        <BottomNav onMenuClick={() => setIsMobileMenuOpen(true)} />
      </div>

      {/* ৫. মোবাইল স্লাইডিং সাইডবার */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute left-0 top-0 w-72 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar 
            isMobile={true} 
            name={adminData.name} 
            image={adminData.image} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;