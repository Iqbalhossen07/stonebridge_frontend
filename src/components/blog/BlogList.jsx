import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ filteredBlogs, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, handleClear }) => {
  return (
    <section id="blog" className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-2xl md:text-4xl text-slate-900" data-aos="fade-up">Latest Insights & Articles</h2>
          <p className="text-slate-600 mt-4">Your Guide to Navigating UK Law—Expert Tips & Updates</p>
        </div>

        {/* Search & Filter Area */}
        <div className="card-premium p-6 mb-12" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <input 
                type="search" 
                placeholder="Search blog..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input w-full h-full" 
              />
            </div>
            <div className="md:col-span-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-input w-full h-full"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleClear}
              className="md:col-span-2 bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-md hover:bg-slate-300 transition-all"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post, idx) => (
              <article 
                key={post.id} 
                className="card-premium group cursor-pointer 
                           /* --- মাখন জুম ইফেক্ট লজিক --- */
                           !transition-all !duration-500 ease-out transform-gpu 
                           hover:!scale-[1.03] hover:!shadow-2xl hover:!-translate-y-2 
                           will-change-transform backface-hidden" 
                data-aos="fade-up" 
                data-aos-delay={idx * 50}
              >
                <div className="relative overflow-hidden rounded-t-lg h-52">
                  <img 
                    src={`/app/blogImage/${post.b_image}`} 
                    alt={post.b_title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="p-6">
                  <div className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-bold">
                    <span className="text-primary">{post.category_name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.b_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${post.id}`}>{post.b_title}</Link>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.b_des.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                  </p>
                  <Link to={`/blog-details/${post.id}`} className="font-bold text-sm text-primary hover:underline">Read More →</Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl font-heading text-slate-700">No Articles Found!</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
              <button onClick={handleClear} className="mt-4 text-primary font-bold hover:underline">View All Articles</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;