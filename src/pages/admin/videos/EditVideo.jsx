import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextEditor from '../../../components/admin/common/TextEditor';

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    short_bio: ''
  });

  // ইউটিউব আইডি বের করার ফাংশন
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const vId = (match && match[2].length === 11) ? match[2] : null;
    setVideoId(vId);
    setFormData(prev => ({ ...prev, video_url: url }));
  };

  // ১. পুরনো ডাটা লোড করা
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`https://stonebridge-api.onrender.com/api/video/single/${id}`);
        const data = response.data;
        
        setFormData({
          title: data.title,
          video_url: data.video_url,
          short_bio: data.short_bio
        });
        
        // লোড হওয়ার সময় থাম্বনেইল প্রিভিউ সেট করা
        extractVideoId(data.video_url);
      } catch (error) {
        Swal.fire('Error', 'Failed to load video data', 'error');
        navigate('/admin/videos');
      } finally {
        setLoading(false);
      }
    };
    fetchVideoDetails();
  }, [id, navigate]);

  // ২. ডাটা আপডেট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await axios.put(`https://stonebridge-api.onrender.com/api/video/update/${id}`, formData);
      if (response.data.success) {
        Swal.fire({
          title: 'Updated!',
          text: 'Video information updated successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/videos'));
      }
    } catch (error) {
      Swal.fire('Error', 'Update failed!', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Loading Data...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Video</h2>

      <div className="bg-white rounded-[32px] shadow-soft-1 p-6 lg:p-10 border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ভিডিও টাইটেল */}
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Video Title</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">YouTube Video Link</label>
              <input 
                type="url" 
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                value={formData.video_url}
                onChange={(e) => extractVideoId(e.target.value)}
              />
            </div>

            {/* থাম্বনেইল প্রিভিউ */}
            <div className="h-48 lg:h-56 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative">
              {videoId ? (
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                  className="w-full h-full object-cover" 
                  alt="Preview" 
                />
              ) : (
                <p className="text-[10px] font-black text-slate-300 uppercase">Invalid Link</p>
              )}
            </div>
          </div>

          {/* শর্ট বায়ো (CKEditor) */}
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Short Bio / Description</label>
            <TextEditor 
              value={formData.short_bio} 
              onChange={(data) => setFormData({ ...formData, short_bio: data })}
            />
          </div>

          {/* বাটন গ্রুপ */}
          <div className="pt-6 border-t border-slate-50 flex items-center justify-end gap-4">
            <Link to="/admin/videos" className="px-8 py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={updating}
              className="px-10 py-3.5 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:bg-slate-400"
            >
              {updating ? 'UPDATING...' : 'UPDATE VIDEO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;