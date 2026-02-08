import React from 'react';

const VideoModal = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  // ভিডিও আইডি বের করা
  const videoId = videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop();
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[999] transition-opacity">
      <div className="relative w-full max-w-4xl animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 text-white hover:text-primary text-4xl font-light"
        >
          &times;
        </button>
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
          <iframe 
            className="w-full h-full" 
            src={embedUrl}
            title="Video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;