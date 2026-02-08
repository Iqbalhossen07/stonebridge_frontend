import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // এক্সিওস ইম্পোর্ট করুন
import Swal from 'sweetalert2';
import TextEditor from '../../../components/admin/common/TextEditor';

const AddTeamMember = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // লোডিং স্টেট

  const [formData, setFormData] = useState({
    t_name: '',
    t_designation: '',
    t_des: '',
    t_linkedln: '',
    t_facebook: '',
    t_image: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, t_image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFormData({ ...formData, t_image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ছবি সিলেক্ট না করলে সতর্ক করবে
    if (!formData.t_image) {
      return Swal.fire('Error', 'Please upload a featured image', 'error');
    }

    setLoading(true);

    // FormData তৈরি করা (ইমেজ পাঠানোর জন্য এটি দরকার)
    const data = new FormData();
    data.append('name', formData.t_name);
    data.append('designation', formData.t_designation);
    data.append('short_bio', formData.t_des);
    data.append('facebook', formData.t_facebook);
    data.append('linkedin', formData.t_linkedln);
    data.append('image', formData.t_image); // ব্যাকএন্ডে upload.single('image') নাম অনুযায়ী

    try {
      const response = await axios.post('https://stonebridge-api.onrender.com/api/team/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Team member added and image uploaded to Cloudinary',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/team'));
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Swal.fire('Error', error.response?.data?.error || 'Failed to add member', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New Team Member</h2>

      <div className="bg-white rounded-2xl shadow-soft-1 p-6 lg:p-10 border border-slate-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Enter member's full name"
                onChange={(e) => setFormData({...formData, t_name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Role / Designation</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="e.g., Solicitor, Barrister & FCILEX"
                onChange={(e) => setFormData({...formData, t_designation: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Short Bio</label>
              <TextEditor 
                value={formData.t_des} 
                onChange={(data) => setFormData({ ...formData, t_des: data })}
                placeholder="Write a short introduction about the team member..."
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Social Links</label>
              <div className="relative group">
                <i className="fab fa-linkedin-in absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"></i>
                <input 
                  type="text" 
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="LinkedIn URL"
                  onChange={(e) => setFormData({...formData, t_linkedln: e.target.value})}
                />
              </div>
              <div className="relative group">
                <i className="fab fa-facebook absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"></i>
                <input 
                  type="text" 
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Facebook URL"
                  onChange={(e) => setFormData({...formData, t_facebook: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Featured Image</label>
              <label 
                className={`relative mt-1 flex flex-col items-center justify-center p-8 border-2 cursor-pointer 
                ${preview ? 'border-solid border-primary/30' : 'border-dashed border-slate-200 hover:border-primary/50'} 
                rounded-2xl bg-slate-50 transition-all group`}
              >
                <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                {preview ? (
                  <div className="text-center">
                    <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-xl shadow-md mb-4 mx-auto border-4 border-white transition-transform group-hover:scale-105" />
                    <button type="button" onClick={(e) => { e.preventDefault(); removeImage(); }} className="relative z-10 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1.5 px-4 rounded-full transition-all active:scale-95">REMOVE IMAGE</button>
                  </div>
                ) : (
                  <div className="text-center">
                    <i className="fas fa-cloud-upload-alt text-4xl text-slate-300 mb-3 group-hover:text-primary transition-colors"></i>
                    <div className="text-sm text-slate-600">
                      <span className="font-bold text-primary group-hover:text-primary-dark">Click to upload</span>
                      <p className="mt-1">or drag and drop</p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link to="/admin/team" className="px-6 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all">CANCEL</Link>
              <button 
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-95 transition-all disabled:bg-slate-400"
              >
                {loading ? 'UPLOADING...' : 'ADD MEMBER'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMember;