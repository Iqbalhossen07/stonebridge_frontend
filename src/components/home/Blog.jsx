import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // ডামি ব্লগ ডাটা (পরবর্তীতে API থেকে আসবে)
  const blogs = [
    {
      id: 1,
      b_title: "Understanding UK Skilled Worker Visa Changes 2026",
      b_des: "The UK government has introduced new salary thresholds and rules for skilled workers. Here is everything you need to know to stay compliant.",
      b_image: "blog1.jfif",
      b_date: "2026-02-01",
      b_author: "Sonjoy Kumar Roy",
      category_name: "Immigration"
    },
    {
      id: 2,
      b_title: "How to Switch from Graduate Visa to Skilled Worker",
      b_des: "Are you currently on a PSW visa? Learn the step-by-step process of switching to a long-term work permit without leaving the UK.",
      b_image: "blog2.jfif",
      b_date: "2026-01-28",
      b_author: "Legal Team",
      category_name: "Visa Guide"
    },
    {
      id: 3,
      b_title: "Self-Sponsorship: A New Route for Entrepreneurs",
      b_des: "Run your own business in the UK and sponsor yourself. We break down the legal requirements for this innovative visa route.",
      b_image: "blog3.jfif",
      b_date: "2026-01-15",
      b_author: "Sonjoy Kumar Roy",
      category_name: "Business"
    },
    {
      id: 4,
      b_title: "Common Asylum Claim Mistakes to Avoid",
      b_des: "Legal representation is crucial in asylum cases. Avoid these three common errors that could lead to an immediate refusal.",
      b_image: "blog4.jfif",
      b_date: "2026-01-10",
      b_author: "Legal Expert",
      category_name: "Asylum"
    }
  ];

  // তারিখ ফরম্যাট করার ফাংশন
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // টেক্সট ট্রিম (Trimming) করার ফাংশন
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <section id="blog" className="relative py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Our Blog-
          </span>
          <h2 className="font-heading text-2xl md:text-4xl text-slate-900 font-bold leading-tight" data-aos="fade-up" data-aos-delay="100">
            Learn From Experts
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="200">
            Your Guide to Navigating UK Law—Expert Tips & Updates
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((row, index) => (
            <article 
              key={row.id} 
              className="card-premium group" 
              data-aos="fade-up" 
              data-aos-delay={300 + (index * 100)}
            >
              <div className="relative overflow-hidden rounded-t-lg h-56">
                <img 
                  src={`app/blogImage/${row.b_image}`} 
                  alt={row.b_title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <div className="p-6">
                <div className="text-xs text-slate-500 mb-3 flex items-center flex-wrap gap-1">
                  {row.category_name && (
                    <>
                      <span className="font-semibold text-primary ">{row.category_name}</span>
                      <span className="mx-1">&bull;</span>
                    </>
                  )}
                  <span>{formatDate(row.b_date)}</span>
                  <span className="mx-1">&bull;</span>
                  <span>{row.b_author}</span>
                </div>

                <h3 className="font-heading font-semibold text-xl text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/blog/${row.id}`}>{row.b_title}</Link>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {truncateText(row.b_des, 85)}
                </p>

                <Link 
                  to={`/blog/${row.id}`} 
                  className="font-semibold text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Read More &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
          <Link 
            to="/blog" 
            className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-br from-primary to-amber-700 text-white border-2 border-transparent hover:border-primary"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;