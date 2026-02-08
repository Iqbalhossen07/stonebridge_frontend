import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import TextEditor from '../../../components/admin/common/TextEditor';

const EditSubService = () => {
  const { id } = useParams(); // URL থেকে সাব-সার্ভিসের আইডি নেওয়া
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    main_serviceId: ''
  });

  // ১. পুরনো ডাটা লোড করা
  useEffect(() => {
    const fetchSubServiceData = async () => {
      try {
        const response = await axios.get(`https://stonebridge-api.onrender.com/api/sub-service/single/${id}`);
        const data = response.data;
        
        setFormData({
          title: data.title,
          description: data.description,
          main_serviceId: data.main_serviceId
        });
        setPreview(data.image); // পুরনো ইমেজ প্রিভিউতে দেখানো
        
        setTimeout(() => { AOS.init({ duration: 800 }); }, 100);
      } catch (error) {
        Swal.fire('Error', 'Failed to load sub-service data', 'error');
        navigate('/admin/services');
      } finally {
        setLoading(false);
      }
    };
    fetchSubServiceData();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ২. আপডেট সাবমিট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (imageFile) {
      data.append('image', imageFile); // নতুন ইমেজ সিলেক্ট করলে সেটি যাবে
    }

    try {
      const response = await axios.put(`https://stonebridge-api.onrender.com/api/sub-service/update/${id}`, data);
      if (response.data.success) {
        Swal.fire({
          title: 'Updated!',
          text: 'Sub-service updated successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/services'));
      }
    } catch (error) {
      Swal.fire('Error', 'Update failed!', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-slate-400 uppercase tracking-widest text-xs">Loading Details...</div>;

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

      <div className="bg-white rounded-[40px] shadow-soft-2 border border-slate-50 overflow-hidden" data-aos="fade-up">
        <div className="p-8 lg:p-10 border-b border-slate-50 bg-slate-50/30">
          <h2 className="font-heading text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Edit Sub-service</h2>
          <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">Update the information below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-10">
          
          {/* টাইটেল */}
          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Sub-service Name</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-5 rounded-[24px] border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-700 text-lg"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* ইমেজ সেকশন */}
          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Sub-service Image</label>
            <label className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[32px] bg-slate-50 cursor-pointer hover:border-primary/40 transition-all group">
              <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
              {preview ? (
                <div className="text-center">
                  <img src={preview} className="w-48 h-32 object-cover rounded-2xl shadow-md mb-2" alt="Preview" />
                  <p className="text-[10px] font-bold text-primary uppercase">Click to Change Image</p>
                </div>
              ) : (
                <div className="text-center">
                  <i className="fas fa-cloud-upload-alt text-2xl text-slate-200 mb-2"></i>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Upload Image</p>
                </div>
              )}
            </label>
          </div>

          {/* ডেসক্রিপশন */}
          <div className="space-y-3">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] ml-1">Detailed Description</label>
            <div className="rounded-[24px] overflow-hidden border border-slate-100 shadow-inner">
              <TextEditor 
                value={formData.description}
                onChange={(data) => setFormData({...formData, description: data})}
              />
            </div>
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="pt-8 border-t border-slate-50 flex items-center justify-end gap-4">
            <Link to="/admin/services" className="px-10 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-[3px] hover:bg-slate-200 transition-all">Cancel</Link>
            <button 
              type="submit"
              disabled={updating}
              className="px-12 py-4 rounded-2xl bg-primary text-white font-bold text-[10px] uppercase tracking-[3px] shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all disabled:bg-slate-400 flex items-center gap-3"
            >
              {updating ? "Updating..." : <><i className="fas fa-save"></i> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubService;