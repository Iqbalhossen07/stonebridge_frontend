import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import TextEditor from '../../../components/admin/common/TextEditor';
import Swal from 'sweetalert2';
import AOS from 'aos';

const AddSubService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('service_id');

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    main_serviceId: serviceId || '',
    title: '',
    description: '',
    image: null
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // ইমেজ হ্যান্ডেল করা
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('main_serviceId', formData.main_serviceId);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);

    try {
      const response = await axios.post('https://stonebridge-api.onrender.com/api/sub-service/add', data);
      
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'New sub-service has been added.',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/services'));
      }
    } catch (error) {
      console.error("Error adding sub-service:", error);
      Swal.fire('Error', 'Failed to add sub-service. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-24">
      {/* ব্যাক বাটন */}
      <div className="mb-8" data-aos="fade-down">
        <Link 
          to="/admin/services" 
          className="group flex items-center gap-3 text-slate-400 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[3px]"
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-soft-1 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all border border-slate-50">
            <i className="fas fa-arrow-left"></i>
          </div>
          Back to All Services
        </Link>
      </div>

      {/* মেইন ফর্ম কার্ড */}
      <div 
        className="bg-white rounded-[40px] shadow-soft-2 border border-slate-50 overflow-hidden"
        data-aos="fade-up"
      >
        {/* কার্ড হেডার */}
        <div className="p-8 lg:p-10 border-b border-slate-50 bg-slate-50/30">
          <h2 className="font-heading text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">
            Sub-service Details
          </h2>
          <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
            Fill in the information below to add a new sub-service
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-10">
          
          {/* সাব-সার্ভিস টাইটেল */}
          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] ml-1">
              Sub-service Name
            </label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-5 rounded-[24px] border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-700 text-lg"
              placeholder="e.g. Sponsor Licence Renewal"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* ইমেজ আপলোড - আপনার ডিজাইনের সাথে সামঞ্জস্য রেখে যোগ করা হয়েছে */}
          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] ml-1">
              Sub-service Image
            </label>
            <label className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[32px] bg-slate-50 cursor-pointer transition-all group ${preview ? 'border-primary/20' : 'border-slate-100 hover:border-primary/40'}`}>
              <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
              {preview ? (
                <div className="text-center">
                  <img src={preview} className="w-48 h-32 object-cover rounded-2xl shadow-md mb-2" alt="Preview" />
                  <p className="text-[10px] font-bold text-primary uppercase">Click to Change Image</p>
                </div>
              ) : (
                <div className="text-center">
                  <i className="fas fa-cloud-upload-alt text-2xl text-slate-200 mb-2"></i>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Upload Featured Image</p>
                </div>
              )}
            </label>
          </div>

          {/* ডেসক্রিপশন (TextEditor) */}
          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] ml-1">
              Detailed Description
            </label>
            <div className="rounded-[24px] overflow-hidden border border-slate-100 shadow-inner">
              <TextEditor 
                value={formData.description}
                onChange={(data) => setFormData({...formData, description: data})}
                placeholder="Describe the sub-service features and benefits..."
              />
            </div>
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="pt-8 border-t border-slate-50 flex items-center justify-end gap-4">
            <Link 
              to="/admin/services"
              className="px-10 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-[3px] hover:bg-slate-200 transition-all active:scale-95"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={loading}
              className="px-12 py-4 rounded-2xl bg-primary text-white font-bold text-[10px] uppercase tracking-[3px] shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-3 disabled:bg-slate-400"
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  <i className="fas fa-check-double"></i> Submit Sub-service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubService;