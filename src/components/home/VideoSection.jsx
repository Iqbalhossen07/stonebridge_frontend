import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // এপিআই থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/video/all');
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // ১. মাস্টার ফাংশন: যেকোনো ইউটিউব লিঙ্ক (Share/Browser) থেকে আইডি বের করার জন্য
  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // ২. পপআপের জন্য এম্বেড ইউআরএল তৈরি
  const getEmbedLink = (url) => {
    const id = getYouTubeID(url);
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  if (loading) return null;
  if (videos.length === 0) return null;

  return (
    <section id="videos" className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Legal Insights-
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
            Legal Advice & Success Stories
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg">
            Videos are for general information only and do not constitute legal advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
          {videos.slice(0, 4).map((video, index) => {
            const videoId = getYouTubeID(video.video_url);
            
            return (
              <div 
                key={video._id}
                className="video-card-container group shadow-2xl cursor-pointer" 
                onClick={() => setSelectedVideo(getEmbedLink(video.video_url))}
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="video-card-content bg-white rounded-lg overflow-hidden">
                  <div className="video-thumbnail-wrapper relative h-48 bg-slate-900 flex items-center justify-center">
                    {/* থাম্বনেইল লজিক: ডাটাবেসে থাম্বনেইল না থাকলে ইউটিউব থেকে hqdefault নিবে */}
                 
                       <img 
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={video.title}
                  />
                    
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 3l14 9-14 9V3z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-heading text-lg font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                      {video.title}
                    </h4>
                    {/* <p className="text-slate-600 text-xs mt-2 line-clamp-2">{video.short_bio} </p> */}
                     <div 
          className="text-slate-500 text-[11px] line-clamp-2 mb-4 h-8 leading-relaxed prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: video.short_bio }}
        />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <a href="/videos" className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary">
            View All Videos
          </a>
        </div>
      </div>

      {/* Video Modal (Popup) */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[100]" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 h-10 w-10 text-white text-4xl font-light hover:text-primary transition-colors"
            >
              &times;
            </button>
            <div className="aspect-video">
              <iframe 
                className="w-full h-full rounded-lg" 
                src={`${selectedVideo}?autoplay=1`}
                title="YouTube Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
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