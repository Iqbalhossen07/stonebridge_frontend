import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VideoHero from '../components/video/VideoHero';
import VideoGrid from '../components/video/VideoGrid';
import VideoModal from '../components/video/VideoModal';
import CTA from '../components/common/CTA';

const VideoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    // ডাটাবেস থেকে সব ভিডিও নিয়ে আসা
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/video/all');
        // আপনার রেসপন্স ফরম্যাট অনুযায়ী ডাটা সেট করা
        const data = response.data.data || response.data;
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // ইউটিউব লিঙ্ককে এম্বেড লিঙ্কে কনভার্ট করার ফাংশন
  const getEmbedLink = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handleVideoSelect = (url) => {
    setSelectedVideo(getEmbedLink(url));
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <p className="ml-3 font-semibold text-slate-700">Loading Legal Videos...</p>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* ১. ভিডিও হিরো সেকশন */}
      <VideoHero />

      {/* ২. ভিডিও গ্রিড - এখানে ডাটাবেসের ভিডিওগুলো পাঠানো হচ্ছে */}
      {videos.length > 0 ? (
        <VideoGrid videos={videos} onVideoSelect={handleVideoSelect} />
      ) : (
        <div className="py-24 text-center">
          <p className="text-slate-500 italic text-lg font-medium">No videos found in the legal archive.</p>
        </div>
      )}

      {/* ৩. ভিডিও পপআপ মোডাল */}
      <VideoModal 
        isOpen={isModalOpen} 
        videoUrl={selectedVideo} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* ৪. কল টু অ্যাকশন */}
      <CTA />
    </main>
  );
};

export default VideoPage;