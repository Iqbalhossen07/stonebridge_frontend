import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import VideoCard from '../../../components/admin/video/VideoCard';
import { Link } from 'react-router-dom';

const VideoGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState('');
  const [videos, setVideos] = useState([]); // ডাটাবেস থেকে আসা ভিডিওর জন্য
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে সব ভিডিও লোড করা
  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://stonebridge-api.onrender.com/api/video/all');
      setVideos(response.data);
      setTimeout(() => { AOS.refresh(); }, 100);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchVideos();
  }, []);

  // ইউটিউব আইডি বের করার ফাংশন
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // ভিডিও ওপেন করার ফাংশন
  const openVideo = (url) => {
    const id = getYouTubeId(url);
    if (id) {
      setActiveVideoId(id);
      setIsModalOpen(true);
    } else {
      Swal.fire('Error', 'Invalid YouTube URL', 'error');
    }
  };

  // ভিডিও ডিলিট করার ফাংশন
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Video will be removed from gallery!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`https://stonebridge-api.onrender.com/api/video/delete/${id}`);
          if (response.data.success) {
            setVideos(prev => prev.filter(v => v._id !== id));
            Swal.fire('Deleted!', 'Video has been removed.', 'success');
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to delete video', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Video Gallery</h2>
        <Link to={'/admin/add-video'} className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all active:scale-95">
          <i className="fas fa-plus mr-2"></i> Add New Video
        </Link>
      </div>

     {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-400 font-medium">Loading Videos...</p>
        </div>
      ) : (
        <div className="min-h-[400px]"> {/* হাইট ফিক্সড রাখা হয়েছে যাতে ফ্লিকার না করে */}
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div key={video._id} data-aos="fade-up"> {/* এনিমেশন প্রতিটা কার্ডে আলাদা করে দেওয়া হয়েছে */}
                  <VideoCard 
                    video={video} 
                    onPlay={openVideo} 
                    onDelete={handleDelete}
                    getYouTubeId={getYouTubeId}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200" data-aos="zoom-in">
               <i className="fab fa-youtube text-5xl text-slate-100 mb-4"></i>
               <p className="text-slate-400 font-medium">No videos found in your gallery!</p>
            </div>
          )}
        </div>
      )}

      {/* --- ভিডিও প্লেয়ার মডাল --- */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-[100]"
          onClick={() => { setIsModalOpen(false); setActiveVideoId(''); }}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => { setIsModalOpen(false); setActiveVideoId(''); }}
              className="absolute top-4 right-4 z-[110] w-10 h-10 bg-white rounded-full text-slate-900 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl font-bold"
            >
              &times;
            </button>

            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;