import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VideoHero from '../components/video/VideoHero';
import VideoGrid from '../components/video/VideoGrid';
import VideoModal from '../components/video/VideoModal';
import CTA from '../components/common/CTA';

const VideoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  // আপনার ডামি ডাটা (পরবর্তীতে API থেকে আসবে)
  const videos = [
    { id: 1, v_title: "UK Skilled Worker Visa Guide", v_des: "Learn about the requirements and process.", v_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { id: 2, v_title: "Client Success Story: Immigration", v_des: "How we helped Mr. X get his visa.", v_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    // আরও ভিডিও যোগ করুন...
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  const handleVideoSelect = (url) => {
    setSelectedVideo(url);
    setIsModalOpen(true);
  };

  return (
    <main className="bg-white">
      <VideoHero />
      <VideoGrid videos={videos} onVideoSelect={handleVideoSelect} />
      <VideoModal 
        isOpen={isModalOpen} 
        videoUrl={selectedVideo} 
        onClose={() => setIsModalOpen(false)} 
      />
      <CTA />
    </main>
  );
};

export default VideoPage;