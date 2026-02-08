import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section id="cta" className="relative mt-24 mb-24 max-w-5xl mx-auto">
      {/* Background Radial Gradient */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/0 to-transparent"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-6">
        <div
          className="overflow-hidden rounded-2xl p-10 md:p-14 bg-gradient-to-br from-primary to-amber-700 text-white shadow-glow"
        >
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            
            {/* Text Side */}
            <div data-aos="fade-right">
              <h3 className="font-heading text-2xl md:text-3xl font-bold">
                Ready to Discuss Your Case?
              </h3>
              <p className="mt-2 text-white/85 max-w-prose">
                Schedule a confidential consultation with our legal experts today. Let us help you find the best path forward.
              </p>
            </div>

            {/* Button Side */}
            <div className="flex md:justify-end items-center" data-aos="fade-left">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold transition-all duration-300 bg-white text-primary hover:bg-slate-50 hover:scale-105 shadow-xl active:scale-95"
              >
                Book Appointment Now
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;