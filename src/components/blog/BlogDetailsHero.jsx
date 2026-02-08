import React from 'react';
import { Link } from 'react-router-dom';

const BlogDetailsHero = () => {
  return (
    <section 
      className="relative pt-36 md:pt-52 pb-8 md:pb-12 bg-cover bg-center min-h-[200px] flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1600')" }}
    >
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <div className="space-y-4" data-aos="fade-up">
          <h1 className="font-heading font-bold text-2xl md:text-4xl">Blog Details</h1>
          <p className="text-sm font-semibold text-slate-200">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link> › 
            <Link to="/blog" className="hover:text-primary transition-colors ml-1">Blog</Link> › 
            <span className="text-white ml-2">Details</span>
          </p>
          <p className="max-w-2xl mx-auto text-slate-300">
            A curated collection of our insights and legal updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHero;