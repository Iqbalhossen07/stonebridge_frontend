import React from 'react';
import { Link } from 'react-router-dom';

const BlogContent = ({ post, recentPosts }) => {
  // YouTube Embed লজিক
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?modestbranding=1&rel=0` : null;
  };

  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="space-y-4 mb-8" data-aos="fade-up">
              <h2 className="font-heading font-medium text-2xl md:text-4xl text-slate-900 leading-tight">
                {post.b_title}
              </h2>
              <p className="text-sm text-slate-500">
                By {post.b_author} • Published on {new Date(post.b_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* YouTube Video Section */}
            {getEmbedUrl(post.b_video_link) && (
              <div className="my-10" data-aos="fade-up">
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                  <iframe className="w-full h-full" src={getEmbedUrl(post.b_video_link)} title="Video" allowFullScreen></iframe>
                </div>
              </div>
            )}

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-soft-2 mb-10" data-aos="fade-up">
              <img src={`/app/blogImage/${post.b_image}`} alt={post.b_title} className="w-full object-cover" />
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6" data-aos="fade-up">
              {post.b_des.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-1 space-y-8" data-aos="fade-left">
            <div className="card-premium p-8 sticky top-32">
              <h4 className="font-heading text-2xl text-slate-800 mb-6">Recent Posts</h4>
              <ul className="space-y-6">
                {recentPosts.map((recent) => (
                  <li key={recent.id} className="flex items-center gap-4 group">
                    <Link to={`/blog-details/${recent.id}`} className="shrink-0 overflow-hidden rounded-lg">
                      <img 
                        src={`/app/blogImage/${recent.b_image}`} 
                        alt="Recent" 
                        className="w-20 h-20 object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </Link>
                    <div>
                      <Link to={`/blog-details/${recent.id}`} className="font-bold text-slate-800 hover:text-primary transition-colors block leading-tight mb-1 line-clamp-2">
                        {recent.b_title}
                      </Link>
                      <span className="text-xs text-slate-500">{recent.b_date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default BlogContent;