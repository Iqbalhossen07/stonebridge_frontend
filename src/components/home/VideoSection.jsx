import React, { useState } from 'react';

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // ডামি ভিডিও ডাটা
  const videos = [
    {
      id: 1,
      v_title: "How to apply for UK Spouse Visa",
      v_des: "Step by step guide for 2026 immigration rules.",
      v_link: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Embed link
      v_thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: 2,
      v_title: "Success Story: Skilled Worker Visa",
      v_des: "Client shares their journey to the UK.",
      v_link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      v_thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: 3,
      v_title: "Self-Sponsorship Visa Update",
      v_des: "Key changes you need to know this year.",
      v_link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      v_thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: 4,
      v_title: "Asylum Support Legal Advice",
      v_des: "Know your rights and legal options.",
      v_link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      v_thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    }
  ];

  return (
    <section id="videos" className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Legal Insights-
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 leading-tight" data-aos="fade-up" data-aos-delay="100">
            Legal Advice & Success Stories
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="200">
            Videos are for general information only and do not constitute legal advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="video-card-container group shadow-2xl" 
              onClick={() => setSelectedVideo(video.v_link)}
              data-aos="fade-up" 
              data-aos-delay={300 + (index * 100)}
            >
              <div className="video-card-content">
                <div className="video-thumbnail-wrapper relative overflow-hidden rounded-t-lg h-56 bg-black flex items-center justify-center">
                  <img 
                    className="video-thumbnail absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-300 group-hover:scale-105"
                    src={video.v_thumb}
                    alt="Video Thumbnail" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="h-16 w-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                      <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 3l14 9-14 9V3z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-heading text-xl text-slate-800 group-hover:text-primary transition-colors">
                    {video.v_title}
                  </h4>
                  <p className="text-slate-600 text-sm mt-1">{video.v_des}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="/video" className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary">
            View All Videos
          </a>
        </div>
      </div>

      {/* Video Modal - পপআপ যখন selectedVideo ভ্যালু পাবে তখন দেখাবে */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 -right-0 md:-right-10 h-10 w-10 bg-white rounded-full text-slate-800 flex items-center justify-center text-2xl font-bold"
            >
              &times;
            </button>
            <div className="aspect-video">
              <iframe 
                className="w-full h-full rounded-lg" 
                src={`${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;