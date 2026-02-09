import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ filteredBlogs, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, handleClear }) => {
  
  // তারিখ ফরম্যাট করার ছোট ফাংশন
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <section id="blog" className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Our Insights-
          </span>
          <h2 className="font-heading text-2xl md:text-4xl text-slate-900 font-bold" data-aos="fade-up">
            Latest Insights & Articles
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg">
            Your Guide to Navigating UK Law—Expert Tips & Updates
          </p>
        </div>

        {/* Search & Filter Area */}
        <div className="card-premium p-6 mb-12 shadow-sm" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <input 
                type="search" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
              />
            </div>
            <div className="md:col-span-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleClear}
              className="md:col-span-2 h-12 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post, idx) => (
              <article 
                key={post._id} 
                className="card-premium group bg-white rounded-2xl overflow-hidden shadow-md  hover:shadow-2xl  will-change-transform" 
                data-aos="fade-up" 
                data-aos-delay={idx * 50}
              >
                {/* ইমেজ সেকশন - সরাসরি ডাটাবেস ইউআরএল */}
                <div className="relative overflow-hidden h-52 bg-slate-200">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-semibold flex items-center gap-2">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="text-slate-300">•</span>
                    <span>By {post.author || 'Admin'}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog-details/${post._id}`} >{post.title}</Link>
                  </h3>

                  <div 
                    className="text-slate-600 text-xs md:text-base leading-relaxed mb-4 line-clamp-3 h-12"
                    dangerouslySetInnerHTML={{ __html: post.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' }}
                  />

                  <Link 
                    to={`/blog-details/${post._id}`} 
                    className="inline-flex items-center font-bold text-xs text-primary group-hover:gap-2 transition-all"
                  >
                    Read More <span className="ml-1">→</span>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <h3 className="text-xl font-heading text-slate-700 font-bold">No Articles Found!</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
              <button onClick={handleClear} className="mt-6 bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;