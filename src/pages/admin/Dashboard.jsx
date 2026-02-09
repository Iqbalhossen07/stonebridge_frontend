import React, { useEffect, useState } from 'react';
import WelcomeBanner from '../../components/admin/dashboard/WelcomeBanner';
import StatCard from '../../components/admin/dashboard/StatCard';
import RecentAppointments from '../../components/admin/dashboard/RecentAppointments';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Dashboard = () => {
  // ১. অ্যাডমিন ডাটা রাখার জন্য স্টেট
  const [adminData, setAdminData] = useState({ name: '', image: '' });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    // ২. ডাটাবেস থেকে অ্যাডমিনের লেটেস্ট তথ্য নিয়ে আসা
    const fetchAdmin = async () => {
      try {
        const res = await axios.get('https://stonebridge-api.onrender.com/api/admin/check-auth', { 
          withCredentials: true 
        });
        if (res.data.authenticated) {
          setAdminData({
            name: res.data.admin.name,
            image: res.data.admin.image
          });
        }
      } catch (err) {
        console.error("Dashboard data load failed:", err);
      }
    };
    fetchAdmin();
  }, []);



const [counts, setCounts] = useState({
  appointments: 0,
  team: 0,
  services: 0,
  blogs: 0,
  testimonials: 0,
  gallery: 0
});

// এপিআই থেকে ডাটা ফেচ করার লজিক
useEffect(() => {
  const fetchAllStats = async () => {
    try {
      const res = await axios.get('https://stonebridge-api.onrender.com/api/admin/all-stats', { withCredentials: true });
      setCounts(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };
  fetchAllStats();
}, []);

const stats = [
  { title: "Appointments", count: counts.appointments, icon: "fa-handshake", color: "border-primary", iconColor: "text-primary", bgColor: "bg-primary/10", delay: 100 },
  { title: "Team Members", count: counts.team, icon: "fa-users", color: "border-blue-500", iconColor: "text-blue-500", bgColor: "bg-blue-500/10", delay: 200 },
  { title: "Main Services", count: counts.services, icon: "fa-concierge-bell", color: "border-green-500", iconColor: "text-green-500", bgColor: "bg-green-500/10", delay: 300 },
  { title: "Sub-Services", count: counts.subservices, icon: "fa-layer-group", color: "border-cyan-500", iconColor: "text-cyan-500", bgColor: "bg-cyan-500/10", delay: 350 },
  { title: "Total Blogs", count: counts.blogs, icon: "fa-blog", color: "border-purple-500", iconColor: "text-purple-500", bgColor: "bg-purple-500/10", delay: 400 },
  { title: "Testimonials", count: counts.testimonials, icon: "fa-comment-dots", color: "border-orange-500", iconColor: "text-orange-500", bgColor: "bg-orange-500/10", delay: 450 },
  { title: "Gallery Photos", count: counts.gallery, icon: "fa-images", color: "border-rose-500", iconColor: "text-rose-500", bgColor: "bg-rose-500/10", delay: 500 },
  { title: "Time Slots", count: counts.timeslots, icon: "fa-clock", color: "border-indigo-500", iconColor: "text-indigo-500", bgColor: "bg-indigo-500/10", delay: 550 },
  { title: "Videos", count: counts.videos, icon: "fa-video", color: "border-red-500", iconColor: "text-red-500", bgColor: "bg-red-500/10", delay: 600 }
];

  return (
    <div className="space-y-8">
      {/* ৩. এখন adminData এর ভেতর থেকে সঠিক নাম এবং ছবি পাবে */}
      <WelcomeBanner name={adminData.name} image={adminData.image} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            Recent Appointments
        </h2>
        <RecentAppointments />
      </div> */}
    </div>
  );
};

export default Dashboard;