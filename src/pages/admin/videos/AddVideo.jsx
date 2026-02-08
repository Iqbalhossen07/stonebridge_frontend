import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import TextEditor from '../../../components/admin/common/TextEditor';
import axios from 'axios';

const AddVideo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [vDes, setVDes] = useState(''); // এটি ডাটাবেসে short_bio হিসেবে যাবে
  const [loading, setLoading] = useState(false);

  // ইউটিউব আইডি বের করার ফাংশন
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    setVideoId(id);
    setVideoUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const videoData = {
      title,
      video_url: videoUrl,
      short_bio: vDes // এডিটরের ডাটা
    };

    try {
      const response = await axios.post('http://localhost:5000/api/video/add', videoData);
      
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Video added successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/videos'));
      }
    } catch (error) {
      console.error("Video add error:", error);
      Swal.fire('Error', 'Failed to add video. Check your server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New Video</h2>

      <div className="bg-white rounded-[32px] shadow-soft-1 p-6 lg:p-10 border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ভিডিও টাইটেল */}
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Video Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              placeholder="Enter video title..."
            />
          </div>

          {/* ইউটিউব লিঙ্ক ও প্রিভিউ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">YouTube Video Link</label>
              <input 
                type="url" 
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                placeholder="e.g., https://www.youtube.com/watch?v=..."
                onChange={(e) => extractVideoId(e.target.value)}
              />
              <p className="mt-2 text-[10px] text-slate-400 font-bold ml-1">The thumbnail will be generated automatically.</p>
            </div>

            {/* লাইভ থাম্বনেইল প্রিভিউ বক্স */}
            <div className="h-48 lg:h-56 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
              {videoId ? (
                <>
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt="Preview" 
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <i className="fab fa-youtube text-4xl text-white/80"></i>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-2">
                  <i className="fas fa-play-circle text-3xl text-slate-200"></i>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[2px]">
                    Video Preview
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* টেক্সট এডিটর (CKEditor) */}
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-3 ml-1">Description</label>
            <TextEditor 
              value={vDes} 
              onChange={(data) => setVDes(data)}
              placeholder="Write a short description for the video..."
            />
          </div>

          {/* বাটন গ্রুপ */}
          <div className="pt-6 border-t border-slate-50 flex items-center justify-end gap-4">
            <Link 
              to="/admin/videos"
              className="px-8 py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={loading}
              className="px-10 py-3.5 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 disabled:bg-slate-400"
            >
              {loading ? 'Submitting...' : 'Submit Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;