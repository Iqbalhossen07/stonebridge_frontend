import React from 'react';

const VideoGrid = ({ videos, onVideoSelect }) => {
  
  // ১. মাস্টার ফাংশন: ইউটিউব আইডি বের করার জন্য (Share/Browser সব সাপোর্ট করবে)
  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* হেডার অংশ */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Legal Insights-
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 leading-tight" data-aos="fade-up">
            Legal Advice & Success Stories
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="100">
            Explore our video library to see how we simplify complex legal processes.
          </p>
        </div>

        {/* ভিডিও গ্রিড অংশ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
          {videos.map((video, index) => {
            const videoId = getYouTubeID(video.video_url);
            
            return (
              <div 
                key={video._id}
                className="video-card-container group shadow-2xl cursor-pointer" 
                onClick={() => onVideoSelect(video.video_url)} // অরিজিনাল লিঙ্ক পাঠাচ্ছে, যা ভিডিওপেজে এম্বেড হবে
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="video-card-content bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl">
                  
                  {/* প্রিমিয়াম থাম্বনেইল অংশ */}
                  <div className="video-thumbnail-wrapper relative h-52 bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      alt={video.title}
                      onError={(e) => { e.target.src = 'https://placehold.co/600x400/1e293b/white?text=Stonebridge+Video'; }}
                    />
                    
                    {/* প্লে বাটন ওভারলে */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-primary shadow-xl">
                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 3l14 9-14 9V3z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* টেক্সট কন্টেন্ট অংশ */}
                  <div className="p-5">
                    <h4 className="font-heading text-lg font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                      {video.title}
                    </h4>
                    
                    {/* শর্ট বায়ো (CKEditor ডাটা হ্যান্ডলিং) */}
                    <div 
                      className="text-slate-500 text-[11px] line-clamp-2 mt-2 h-8 leading-relaxed prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: video.short_bio }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;