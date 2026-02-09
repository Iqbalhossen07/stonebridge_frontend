import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // এপিআই থেকে ব্লগ ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/blog/all');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // তারিখ ফরম্যাট করার ফাংশন (createdAt ব্যবহার করা হবে)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // টেক্সট ট্রিম করার ফাংশন (HTML ট্যাগ রিমুভ করে ট্রিম করবে)
  const truncateText = (htmlContent, length) => {
    const plainText = htmlContent.replace(/<[^>]*>/g, ''); // HTML ট্যাগ সরানোর জন্য
    return plainText.length > length ? plainText.substring(0, length) + "..." : plainText;
  };

  // ডাটা না থাকলে সেকশনটি দেখাবে না (স্লাইডার/গ্যালারির মতো একই লজিক)
  if (loading) return null;
  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Our Blog-
          </span>
          <h2 className="font-heading text-2xl md:text-4xl text-slate-900 font-bold leading-tight" data-aos="fade-up">
            Learn From Experts
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="100">
            Your Guide to Navigating UK Law—Expert Tips & Updates
          </p>
        </div>

        {/* Blog Grid - হোম পেজে লেটেস্ট ৪টি ব্লগ দেখাবে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.slice(0, 4).map((row, index) => (
            <article 
              key={row._id} 
              className="card-premium group bg-white rounded-xl shadow-md overflow-hidden" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden h-56">
                {/* সরাসরি ক্লাউডিনারি ইউআরএল (row.image) ব্যবহার করা হয়েছে */}
                <img 
                  src={row.image} 
                  alt={row.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <div className="p-6">
                <div className="text-xs text-slate-500 mb-3 flex items-center flex-wrap gap-1">
                  {row.category && (
                    <>
                      <span className="font-semibold text-primary">{row.category}</span>
                      <span className="mx-1">&bull;</span>
                    </>
                  )}
                  <span>{formatDate(row.createdAt)}</span>
                  <span className="mx-1">&bull;</span>
                  <span>{row.author}</span>
                </div>

                <h3 className="font-heading font-semibold text-xl text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {/* স্লাগ (slug) থাকলে সেটি দিয়ে লিঙ্ক হবে, নাহলে আইডি */}
                  <Link to={`/blog/${row.slug || row._id}`}>{row.title}</Link>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {truncateText(row.description, 85)}
                </p>

                <Link 
                  to={`/blog/${row.slug || row._id}`} 
                  className="font-semibold text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Read More &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            to="/blogs" 
            className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;