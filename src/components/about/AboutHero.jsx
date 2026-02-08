import React from 'react';
import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <section
      className="relative pt-36 md:pt-52 pb-8 md:pb-12 bg-cover bg-center min-h-[200px] flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1589216532372-1c2a367900d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <div className="space-y-4" data-aos="fade-up">
          
          <h1 className="font-heading font-bold text-2xl md:text-4xl">About Us</h1>

          {/* Breadcrumb */}
          <p className="text-sm font-semibold text-slate-200">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">About Us</span>
          </p>

          <p className="max-w-2xl mx-auto text-slate-300">
            Discover our story, our values, and what makes us a trusted partner in your journey.
          </p>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;