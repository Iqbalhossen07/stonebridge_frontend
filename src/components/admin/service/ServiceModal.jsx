import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ServiceModal = ({ isOpen, onClose, editData = null }) => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // এডিট মুডে ডাটা অটো-লোড করা
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setPreview(editData.image || null);
    } else {
      setTitle("");
      setPreview(null);
    }
    setImageFile(null);
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      let response;
      if (editData) {
        // আপডেট লজিক
        response = await axios.put(`http://localhost:5000/api/service/update/${editData._id}`, formData);
      } else {
        // নতুন সার্ভিস তৈরি
        response = await axios.post('http://localhost:5000/api/service/add', formData);
      }

      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: editData ? 'Service updated successfully' : 'New service created!',
          icon: 'success',
          confirmButtonColor: '#87550D',
        });
        onClose(); // কাজ শেষ হলে মডাল বন্ধ হবে এবং লিস্ট রিফ্রেশ হবে
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-300">
      <div 
        className="bg-white rounded-[40px] w-full max-w-md p-8 lg:p-10 shadow-2xl relative border border-white/20"
        data-aos="zoom-in"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className={editData ? "fas fa-edit" : "fas fa-plus-circle"}></i>
          </div>
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-widest">
            {editData ? "Update Service" : "New Service"}
          </h3>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] mt-2">
            Fill the details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Service Name</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-slate-700"
              placeholder="e.g. UK Student Visa"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Service Icon</label>
            <label className={`group flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[32px] bg-slate-50 cursor-pointer transition-all ${preview ? 'border-primary/20 bg-white shadow-inner' : 'border-slate-200 hover:border-primary/40'}`}>
              <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              
              {preview ? (
                <div className="text-center">
                  <img 
                    src={preview} 
                    className="w-24 h-24 object-cover rounded-[24px] shadow-lg border-4 border-white mb-3 mx-auto" 
                    alt="Preview" 
                  />
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Change Image</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <i className="fas fa-image text-2xl text-slate-200 group-hover:text-primary transition-colors"></i>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Service Icon</p>
                </div>
              )}
            </label>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-primary text-white font-black rounded-[24px] uppercase text-xs tracking-[3px] shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <i className="fas fa-check-circle"></i>
                  {editData ? "Save Changes" : "Create Service"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;