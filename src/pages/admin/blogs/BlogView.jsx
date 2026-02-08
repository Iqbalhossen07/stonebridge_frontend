import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BlogView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে ব্লগের ডিটেইলস নিয়ে আসা
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://stonebridge-api.onrender.com/api/blog/single/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        Swal.fire('Error', 'Blog not found!', 'error');
        navigate('/admin/blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  // ইউটিউব লিঙ্ক থেকে এম্বেড লিঙ্ক তৈরি করার ফাংশন
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  // ডিলিট করার ফাংশন
  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This blog post will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://stonebridge-api.onrender.com/api/blog/delete/${id}`);
          Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
          navigate('/admin/blogs');
        } catch (error) {
          Swal.fire('Error', 'Delete Failed', 'error');
        }
      }
    });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-slate-400 font-medium tracking-widest uppercase text-[10px]">Loading Article...</p>
    </div>
  );

  if (!blog) return null;

  const embedUrl = getEmbedUrl(blog.video_link);

  return (
    <div className="max-w-8xl mx-auto pb-24">
      {/* ব্যাক বাটন */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/admin/blogs')}
          className="group flex items-center gap-3 text-slate-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-[2px]"
        >
          <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all border border-slate-50">
            <i className="fas fa-arrow-left"></i>
          </div>
          Back to All Posts
        </button>
      </div>

      <div className="bg-white rounded-[40px] shadow-soft-1 border border-slate-50 overflow-hidden lg:p-12 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* বাম পাশ: ব্লগ কন্টেন্ট (৮ কলাম) */}
          <div className="lg:col-span-8 space-y-8 lg:border-r border-slate-50 lg:pr-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {blog.category}
                </span>
                <span className="text-slate-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                   <i className="far fa-calendar-alt"></i> {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              
              <h1 className="text-2xl lg:text-4xl font-heading font-black text-slate-800 leading-[1.2] mb-8">
                {blog.title}
              </h1>
              
              {/* ব্লগ কন্টেন্ট - CKEditor ডাটা রেন্ডারিং */}
              <div 
                className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed prose-headings:font-heading prose-headings:text-slate-800 prose-strong:text-slate-800 prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>

            {/* ইউটিউব ভিডিও সেকশন */}
            {embedUrl && (
              <div className="pt-10 border-t border-slate-50">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                   <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                   Watch Related Video
                </h3>
                <div className="aspect-video w-full rounded-[32px] overflow-hidden shadow-2xl border-8 border-slate-50 bg-black">
                  <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* ডান পাশ: সাইডবার ডিটেইলস (৪ কলাম) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] ml-2">Featured Image</h3>
              <div className="relative group rounded-[32px] overflow-hidden shadow-lg border-4 border-white transition-all duration-500 hover:shadow-xl">
                <img 
                  src={blog.image} 
                  alt="Featured" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* পোস্ট ইনফো কার্ড */}
            <div className="bg-slate-50/50 rounded-[32px] p-8 border border-slate-100">
               <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-6">Post Statistics</h3>
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                       <i className="fas fa-user-edit text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Author</p>
                      <p className="text-sm font-bold text-slate-700">{blog.author || 'Sonjoy Kumar Roy'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                       <i className="fas fa-tags text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Category</p>
                      <p className="text-sm font-bold text-slate-700">{blog.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                       <i className="fas fa-clock text-lg"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                      <p className="text-sm font-bold text-green-600">Published</p>
                    </div>
                  </div>
               </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;