import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextEditor from '../../../components/admin/common/TextEditor';

const EditTestimonial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    rating: '',
    description: '',
    image: null
  });

  // ১. ডাটাবেস থেকে পুরনো ডাটা লোড করা
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/testimonial/single/${id}`);
        const data = response.data;
        
        setFormData({
          name: data.name,
          designation: data.designation,
          rating: data.rating,
          description: data.description,
          image: null 
        });
        
        setPreview(data.image); // পুরনো ইমেজটি প্রিভিউতে দেখানো
      } catch (error) {
        Swal.fire('Error', 'Failed to load data', 'error');
        navigate('/admin/testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ২. আপডেট সাবমিট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('rating', formData.rating);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/testimonial/update/${id}`, data);
      if (response.data.success) {
        Swal.fire({
          title: 'Updated!',
          text: 'Review updated successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/testimonials'));
      }
    } catch (error) {
      Swal.fire('Error', 'Update failed!', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-slate-400">Loading Review Details...</div>;

  return (
    <div className="max-w-[1100px] mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Edit Testimonial</h2>
        <Link to="/admin/testimonials" className="text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
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
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Designation</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              value={formData.designation}
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
            <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-[32px] bg-slate-50 cursor-pointer hover:border-primary/40 transition-all group">
              <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
              {preview ? (
                <div className="text-center w-full">
                  <img src={preview} className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-xl mb-4" alt="Preview" />
                  <span className="text-[10px] font-bold text-primary uppercase">Click to Change Photo</span>
                </div>
              ) : (
                <div className="text-center py-6">
                  <i className="fas fa-user-plus text-2xl text-primary mb-2"></i>
                  <p className="text-xs font-bold text-slate-600">Upload Photo</p>
                </div>
              )}
            </label>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Testimonial Content</label>
            <TextEditor 
              value={formData.description}
              onChange={(data) => setFormData({...formData, description: data})}
            />
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50 flex items-center justify-end gap-4">
          <Link to="/admin/testimonials" className="px-10 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</Link>
          <button 
            type="submit"
            disabled={updating}
            className="px-12 py-4 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:bg-slate-400"
          >
            {updating ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTestimonial;