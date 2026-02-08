import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextEditor from '../../../components/admin/common/TextEditor';

const EditBlog = () => {
  const { id } = useParams(); // URL থেকে ব্লগের আইডি নেওয়া
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    video_link: '',
    author: 'Sonjoy Kumar Roy',
    image: null
  });

  // ১. ডাটাবেস থেকে পুরনো ডাটা লোড করা
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`https://stonebridge-api.onrender.com/api/blog/single/${id}`);
        const data = response.data;
        
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          video_link: data.video_link,
          author: data.author || 'Sonjoy Kumar Roy',
          image: null // নতুন ইমেজ সিলেক্ট না করা পর্যন্ত এটি নাল থাকবে
        });
        
        setPreview(data.image); // পুরনো ইমেজটি প্রিভিউতে দেখানো
      } catch (error) {
        Swal.fire('Error', 'Failed to load blog data', 'error');
        navigate('/admin/blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id, navigate]);

  // ইমেজ হ্যান্ডেল করা
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
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('video_link', formData.video_link);
    if (formData.image) {
      data.append('image', formData.image); // যদি নতুন ইমেজ থাকে তবেই পাঠাবে
    }

    try {
      const response = await axios.put(`https://stonebridge-api.onrender.com/api/blog/update/${id}`, data);
      if (response.data.success) {
        Swal.fire({
          title: 'Updated!',
          text: 'Blog post updated successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/blogs'));
      }
    } catch (error) {
      Swal.fire('Error', 'Update failed!', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-slate-400">Loading Blog Data...</div>;

  return (
    <div className="max-w-8xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Blog Post</h2>
        <Link to="/admin/blogs" className="text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors">
          <i className="fas fa-arrow-left"></i> Back to Blogs
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-soft-1 border border-slate-50 space-y-6">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Blog Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Blog Content</label>
                <TextEditor 
                  value={formData.description}
                  onChange={(data) => setFormData({...formData, description: data})}
                />
              </div>
            </div>
          </div>

          {/* Right Side: Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-soft-1 border border-slate-50 space-y-6">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Featured Image</label>
                <label className="relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl bg-slate-50 cursor-pointer hover:border-primary/40 transition-all group">
                  <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                  {preview ? (
                    <div className="text-center w-full">
                      <img src={preview} className="w-full h-48 object-cover rounded-xl mb-3 shadow-md" alt="Preview" />
                      <span className="text-[10px] font-bold text-primary uppercase">Change Featured Image</span>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <i className="fas fa-cloud-upload-alt text-2xl text-primary mb-2"></i>
                      <p className="text-xs font-bold text-slate-600">Upload Image</p>
                    </div>
                  )}
                </label>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Category</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Video Link (Optional)</label>
                  <input 
                    type="url" 
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium"
                    value={formData.video_link}
                    onChange={(e) => setFormData({...formData, video_link: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Author</label>
                  <input 
                    type="text" 
                    readOnly
                    className="w-full px-5 py-3 rounded-xl border border-slate-100 bg-slate-100 text-slate-400 outline-none text-sm font-bold cursor-not-allowed"
                    value={formData.author}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white rounded-[24px] p-6 shadow-soft-1 border border-slate-50 flex items-center justify-end gap-4">
          <Link to="/admin/blogs" className="px-8 py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={updating}
            className="px-10 py-3.5 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:bg-slate-400"
          >
            {updating ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;