import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, onDelete }) => {
  // তারিখটি সুন্দর করে দেখানোর জন্য ফরম্যাটিং
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-3xl shadow-soft-1 overflow-hidden group hover:shadow-soft-2 transition-all duration-500 border border-slate-50 flex flex-col h-full blog-row">
      {/* ইমেজ সেকশন - সরাসরি Cloudinary URL ব্যবহার করা হয়েছে */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm border border-slate-100">
            {blog.category || 'Article'}
          </span>
        </div>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-tight mb-3">
          <span className="flex items-center gap-1.5">
            <i className="fas fa-user-circle text-primary/60"></i> {blog.author || 'Sonjoy Roy'}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="far fa-calendar-alt text-primary/60"></i> {formattedDate}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {blog.title}
        </h3>

        {/* ডিসক্রিপশন (HTML ট্যাগ রিমুভ করে ক্লিন টেক্সট দেখানো হয়েছে) */}
        <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
          {blog.description ? blog.description.replace(/<[^>]*>?/gm, '') : ""}
        </p>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="mt-auto pt-5 border-t border-slate-50 flex justify-end gap-2.5">
          {/* ভিউ বাটন */}
          <Link 
            to={`/admin/blog-view/${blog._id}`} 
            className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            title="View Blog"
          >
            <i className="fas fa-eye text-xs"></i>
          </Link>
          
          {/* এডিট বাটন */}
          <Link 
            to={`/admin/edit-blog/${blog._id}`} 
            className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm"
            title="Edit Blog"
          >
            <i className="fas fa-pencil-alt text-xs"></i>
          </Link>
          
          {/* ডিলিট বাটন */}
          <button 
            onClick={() => onDelete(blog._id)}
            className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
            title="Delete Blog"
          >
            <i className="fas fa-trash-alt text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;