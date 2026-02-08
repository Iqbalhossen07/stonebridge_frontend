import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextEditor from '../../../components/admin/common/TextEditor';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddTestimonial = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    rating: '5', // ডিফল্ট ৫
    description: '',
    image: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setPreview(null);
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('rating', formData.rating);
    data.append('description', formData.description);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/api/testimonial/add', data);
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Testimonial added successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/testimonials'));
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to add testimonial.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Add New Testimonial</h2>
        <Link to="/admin/testimonials" className="text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <i className="fas fa-arrow-left"></i> Back to All
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[40px] p-8 lg:p-12 shadow-soft-1 border border-slate-50 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Author's Name</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              placeholder="e.g. Sheldon Jackson"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Designation</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              placeholder="e.g. Software Engineer"
              onChange={(e) => setFormData({...formData, designation: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Review Rating (1-5)</label>
            <div className="relative">
               <input 
                type="number" 
                min="1" max="5" 
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-amber-600"
                placeholder="e.g. 5"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
              />
              <i className="fas fa-star absolute right-5 top-1/2 -translate-y-1/2 text-amber-400"></i>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Author Photo</label>
            <label className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[32px] bg-slate-50 cursor-pointer transition-all group ${preview ? 'border-solid border-primary/20' : 'border-slate-200 hover:border-primary/40'}`}>
              <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
              {preview ? (
                <div className="text-center w-full">
                  <img src={preview} className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-xl mb-6" alt="Preview" />
                  <button onClick={removeImage} className="bg-red-500 text-white text-[10px] font-black px-5 py-2 rounded-full hover:bg-red-600 shadow-lg active:scale-95 transition-all">REMOVE PHOTO</button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i className="fas fa-user-plus text-2xl text-primary"></i>
                  </div>
                  <p className="text-xs font-bold text-slate-600">Click to Upload Photo</p>
                </div>
              )}
            </label>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Testimonial Content</label>
            <TextEditor 
              value={formData.description}
              onChange={(data) => setFormData({...formData, description: data})}
              placeholder="What did the client say about your service?"
            />
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50 flex items-center justify-end gap-4">
          <Link to="/admin/testimonials" className="px-10 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest active:scale-95 transition-all">Cancel</Link>
          <button 
            type="submit"
            disabled={loading}
            className="px-12 py-4 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-3 disabled:bg-slate-400"
          >
            {loading ? 'Saving...' : <><i className="fas fa-check-circle"></i> Save Testimonial</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonial;