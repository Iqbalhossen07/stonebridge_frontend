import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video, onPlay, onDelete, getYouTubeId }) => {
  // ডাটাবেসের video_url থেকে আইডি বের করা হবে
  const videoId = getYouTubeId(video.video_url);

  return (
    <div className="bg-white rounded-2xl shadow-soft-1 overflow-hidden group border border-slate-50 hover:shadow-soft-2 transition-all duration-300">
      
      {/* থাম্বনেইল এরিয়া - হোভারে জুম হবে */}
      <div 
        className="relative h-48 bg-slate-200 cursor-pointer overflow-hidden"
        onClick={() => onPlay(video.video_url)}
      >
        <img 
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={video.title}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-300">
              <i className="fas fa-play text-white text-xl ml-1"></i>
           </div>
        </div>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <div className="p-5">
        <h3 className="font-bold text-slate-800 mb-2 truncate group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        
        {/* রিচ টেক্সট বা শর্ট ডেসক্রিপশন রেন্ডারিং */}
        <div 
          className="text-slate-500 text-[11px] line-clamp-2 mb-4 h-8 leading-relaxed prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: video.short_bio }}
        />
        
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-50">
          {/* Edit Button */}
       {/* Edit Button - Link দিয়ে কানেক্ট করা হয়েছে */}
        <Link 
          to={`/admin/edit-video/${video._id}`}
          className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm" 
          title="Edit Video"
        >
          <i className="fas fa-pencil-alt text-xs"></i>
        </Link>
          
          {/* Delete Button - MongoDB _id ব্যবহার করা হয়েছে */}
          <button 
            onClick={() => onDelete(video._id)}
            className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
            title="Delete Video"
          >
            <i className="fas fa-trash-alt text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;