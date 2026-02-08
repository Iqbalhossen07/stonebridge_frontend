import React from 'react';

const VideoGrid = ({ videos, onVideoSelect }) => {
  
  // ইউটিউব লিঙ্ক থেকে থাম্বনেইল বের করার ফাংশন
  const getThumbnail = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <section className="relative py-24 bg-slate-50/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="font-heading text-lg font-semibold text-primary tracking-widest uppercase mb-2" data-aos="fade-up">Legal Insights</h3>
          <h2 className="font-heading text-2xl md:text-4xl text-slate-900 leading-tight" data-aos="fade-up" data-aos-delay="100">Legal Advice & Success Stories</h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="200">
            Explore our video library to see how we simplify complex legal processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
          {videos.map((v, idx) => (
            <div 
              key={v.id} 
              className="group bg-white rounded-xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2"
              onClick={() => onVideoSelect(v.v_link)}
              data-aos="fade-up" 
              data-aos-delay={idx * 100}
            >
              {/* Thumbnail Wrapper */}
              <div className="relative h-52 overflow-hidden bg-black flex items-center justify-center">
                <img 
                  src={getThumbnail(v.v_link)} 
                  alt={v.v_title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all flex items-center justify-center">
                  <div className="h-16 w-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"></path></svg>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h4 className="font-heading text-lg text-slate-800 group-hover:text-primary transition-colors leading-tight">
                  {v.v_title}
                </h4>
                <p className="text-slate-500 text-xs mt-2 line-clamp-2">{v.v_des}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;