import React from 'react';
import { Link } from 'react-router-dom';

const BlogContent = ({ post, recentPosts }) => {
  // ১. মাস্টার ইউটিউব এম্বেড লজিক
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?modestbranding=1&rel=0` 
      : null;
  };

  // ডাটা না থাকলে সেফটি চেক
  if (!post) return null;

  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* ১. মেইন কন্টেন্ট এরিয়া */}
          <div className="lg:col-span-2">
            <div className="space-y-4 mb-8" data-aos="fade-up">
              {/* ক্যাটাগরি ব্যাজ */}
              {post.category && (
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
                  {post.category}
                </span>
              )}
              
              <h1 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-3 text-sm text-slate-500 italic">
                <span className="font-semibold text-slate-700">By {post.author || "Sonjoy Kumar Roy"}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* ইউটিউব ভিডিও সেকশন */}
            {post.video_link && getEmbedUrl(post.video_link) && (
              <div className="my-10" data-aos="fade-up">
                <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black">
                  <iframe 
                    className="w-full h-full" 
                    src={getEmbedUrl(post.video_link)} 
                    title={post.title} 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* ফিচারড ইমেজ (সরাসরি Cloudinary URL) */}
            <div className="rounded-3xl overflow-hidden shadow-xl mb-10 border border-slate-100" data-aos="fade-up">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto max-h-[550px] object-cover hover:scale-105 transition-transform duration-1000" 
              />
            </div>

            {/* ব্লগের বর্ণনা - CKEditor এর HTML ডাটা রেন্ডার করার জন্য */}
            <div 
              className="prose prose-lg max-w-none text-slate-700 leading-relaxed biography-content blog-details-body" 
              data-aos="fade-up"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>

          {/* ২. সাইডবার এরিয়া (Recent Posts) */}
          <aside className="lg:col-span-1">
            <div className="card-premium p-8 sticky top-32 bg-white rounded-3xl shadow-soft-2 border border-slate-100" data-aos="fade-left">
              <h4 className="font-heading text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Recent Insights
              </h4>
              <ul className="space-y-8">
                {recentPosts && recentPosts.slice(0, 5).map((recent) => (
                  <li key={recent._id} className="flex items-start gap-4 group">
                    <Link 
                      to={`/blog-details/${recent._id}`} 
                      className="shrink-0 overflow-hidden rounded-xl w-20 h-20 bg-slate-100 border border-slate-100 shadow-sm"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <img 
                        src={recent.image} 
                        alt={recent.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </Link>
                    <div className="flex-1">
                      <Link 
                        to={`/blog-details/${recent._id}`} 
                        className="font-bold text-slate-800 hover:text-primary transition-colors block leading-tight mb-2 line-clamp-2"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        {recent.title}
                      </Link>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {new Date(recent.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* কন্টাক্ট কল-টু-অ্যাকশন */}
              <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-sm font-semibold text-slate-800 mb-2">Need Expert Advice?</p>
                <Link to="/contact" className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
                  Book a Consultation <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default BlogContent;