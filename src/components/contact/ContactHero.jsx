import React from 'react';
import { Link } from 'react-router-dom';

const ContactHero = () => {
  return (
    <section 
      className="relative pt-36 md:pt-52 pb-8 md:pb-12 bg-cover bg-center min-h-[200px] flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587560699334-bea93391dcef?fm=jpg&q=60&w=3000')" }}
    >
      {/* ওভারলে */}
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <div className="space-y-4" data-aos="fade-up">
          <h1 className="font-heading text-2xl md:text-4xl font-bold tracking-widest">Get In Touch</h1>

          <nav className="text-sm font-semibold text-slate-200">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link> 
            <span className="mx-2">›</span>
            <span className="text-white">Contact Us</span>
          </nav>
          
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
            We're here to help. Contact us by phone, email or through our form below. 
            Our expert team is ready to assist you with your legal needs.
          </p>
        </div>
      </div>

  
    </section>
  );
};

export default ContactHero;