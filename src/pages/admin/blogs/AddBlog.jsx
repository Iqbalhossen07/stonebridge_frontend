import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextEditor from '../../../components/admin/common/TextEditor';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddBlog = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    video_link: '',
    author: 'Sonjoy Kumar Roy', // লেখক ফিক্সড
    image: null
  });

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
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('video_link', formData.video_link);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/api/blog/add', data);
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Blog post published successfully.',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/blogs'));
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to publish blog.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Blog Post</h2>
        <Link to="/admin/blogs" className="text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors">
          <i className="fas fa-arrow-left"></i> Back to Blogs
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-soft-1 border border-slate-50 space-y-6 h-full">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Blog Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                  placeholder="Enter a compelling title..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Blog Content</label>
                <TextEditor 
                  value={formData.description}
                  onChange={(data) => setFormData({...formData, description: data})}
                  placeholder="Write your amazing story here..."
                />
              </div>
            </div>
          </div>

          {/* Settings Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-soft-1 border border-slate-50 space-y-6">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Featured Image</label>
                <label className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl bg-slate-50 cursor-pointer transition-all group ${preview ? 'border-solid border-primary/20' : 'border-slate-200 hover:border-primary/40'}`}>
                  <input type="file" className="sr-only" accept="image/*" required={!preview} onChange={handleImageChange} />
                  {preview ? (
                    <div className="text-center w-full">
                      <img src={preview} className="w-full h-48 object-cover rounded-xl mb-4 shadow-md" alt="Preview" />
                      <span className="text-[10px] font-bold text-primary uppercase">Click to Change Image</span>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <i className="fas fa-cloud-upload-alt text-2xl text-primary"></i>
                      </div>
                      <p className="text-xs font-bold text-slate-600">Upload Featured Image</p>
                    </div>
                  )}
                </label>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Category</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium"
                    placeholder="e.g. Immigration, Visa"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Video Link (Optional)</label>
                  <input 
                    type="url" 
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none transition-all text-sm font-medium"
                    placeholder="https://youtube.com/watch?v=..."
                    value={formData.video_link}
                    onChange={(e) => setFormData({...formData, video_link: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Author Name</label>
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

        <div className="bg-white rounded-[24px] p-6 shadow-soft-1 border border-slate-50 flex items-center justify-end gap-4 transition-all">
          <Link to="/admin/blogs" className="px-8 py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">Cancel</Link>
          <button 
            type="submit"
            disabled={loading}
            className="px-10 py-3.5 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-2 disabled:bg-slate-400"
          >
            {loading ? 'Publishing...' : <><i className="fas fa-paper-plane text-[10px]"></i> Submit Blog</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;