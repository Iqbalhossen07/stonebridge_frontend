import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';
import axios from 'axios';

const MyProfile = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    image: ''
  });

  // ১. বর্তমান প্রোফাইল ডাটা লোড করা
  useEffect(() => {
    AOS.init({ duration: 800 });
    
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/check-auth', { 
          withCredentials: true 
        });
        if (res.data.admin) {
          setFormData(prev => ({
            ...prev,
            name: res.data.admin.name,
            email: res.data.admin.email,
            image: res.data.admin.image
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // ২. ছবি পরিবর্তনের প্রিভিউ হ্যান্ডেল করা
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ৩. আপডেট রিকোয়েস্ট পাঠানো
 const handleSubmit = async (e) => {
  e.preventDefault();

  // যদি নতুন পাসওয়ার্ড ফিল্ডে কিছু লেখা থাকে, তবেই ওল্ড পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড চেক করবে
  if (formData.newPassword) {
    if (!formData.oldPassword) {
      return Swal.fire('Wait!', 'Please enter your Current Password to set a new one.', 'warning');
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return Swal.fire('Error', 'New password and confirm password do not match!', 'error');
    }
  }

  Swal.fire({
    title: 'Update Profile?',
    text: "Save changes to your account?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#87550D',
    confirmButtonText: 'Yes, update it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      setLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      
      // শুধুমাত্র পাসওয়ার্ড থাকলে পাঠাবে
      if (formData.oldPassword) data.append('oldPassword', formData.oldPassword);
      if (formData.newPassword) data.append('newPassword', formData.newPassword);
      
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      }

      try {
        const res = await axios.put('http://localhost:5000/api/admin/update-profile', data, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (res.data.success) {
          Swal.fire('Updated!', 'Profile successfully updated.', 'success');
          // পাসওয়ার্ড ফিল্ডগুলো ক্লিয়ার করে দেওয়া
          setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
          if (res.data.admin.image) {
            setFormData(prev => ({ ...prev, image: res.data.admin.image }));
          }
        }
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Update failed', 'error');
      } finally {
        setLoading(false);
      }
    }
  });
};

  return (
    <div className="flex-1 flex items-center justify-center p-6 py-12" data-aos="fade-up">
      <div className="w-full max-w-5xl bg-white p-8 lg:p-12 rounded-[48px] shadow-soft-2 border border-slate-50 relative">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest font-heading">Profile Management</h2>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-[3px]">Secure your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* প্রোফাইল ইমেজ সেকশন */}
          <div className="flex flex-col items-center">
            <label htmlFor="avatar-upload" className="relative cursor-pointer group">
              <div className="w-36 h-36 rounded-[40px] border-8 border-slate-50 shadow-xl overflow-hidden relative transition-all group-hover:scale-105 rotate-2 group-hover:rotate-0">
                <img 
                  src={preview || formData.image || '/img/admin.png'} 
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-camera text-white text-2xl"></i>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                <i className="fas fa-pen text-xs"></i>
              </div>
            </label>
            <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body">
            {/* নাম ফিল্ড */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Account Holder Name</label>
              <input 
                type="text" 
                value={formData.name}
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-slate-700"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            {/* ইমেইল ফিল্ড (যদি চেঞ্জ করতে চান) */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-slate-700"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            {/* Old Password - এটি মাস্ট লাগবে আপডেট করতে */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-red-400 uppercase tracking-[2px] ml-1">Current Password</label>
              <div className="relative">
                <input 
                  type={showPass.old ? "text" : "password"}
                  placeholder="Enter current password"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-red-50/30 focus:bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all font-bold"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                  
                />
                <button type="button" onClick={() => setShowPass({...showPass, old: !showPass.old})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary">
                  <i className={`fas ${showPass.old ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">New Password (Optional)</label>
              <div className="relative">
                <input 
                  type={showPass.new ? "text" : "password"}
                  placeholder="Create new password"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
                <button type="button" onClick={() => setShowPass({...showPass, new: !showPass.new})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary">
                  <i className={`fas ${showPass.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Confirm New Password</label>
              <div className="relative">
                <input 
                  type={showPass.confirm ? "text" : "password"}
                  placeholder="Repeat new password"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <button type="button" onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary">
                  <i className={`fas ${showPass.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-max px-12 p-4 bg-primary text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-95 transition-all text-xs uppercase tracking-[4px] disabled:bg-slate-300"
            >
              {loading ? 'Processing...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;