import React from 'react';
import { Link } from 'react-router-dom';

const GalleryHero = () => {
  return (
    <section className="relative pt-36 md:pt-52 pb-8 md:pb-12 bg-cover bg-center min-h-[200px] flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=2000')" }}>
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <div className="space-y-4" data-aos="fade-up">
          <h1 className="font-heading font-bold text-2xl md:text-4xl">Our Gallery</h1>
          <p className="text-sm font-semibold text-slate-200  tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link> &rsaquo;
            <span className="text-white ml-2">Gallery</span>
          </p>
          <p className="max-w-2xl mx-auto text-slate-300">
            A curated collection of our finest projects and moments that define our passion for excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;