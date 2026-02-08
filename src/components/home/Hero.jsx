import React from 'react';
import HeroBackground from './HeroBackground';

const Hero = () => {
  return (
    <section id="#" className="relative pt-52 md:pt-60 pb-24 overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div data-aos="fade-right" className="space-y-6 lg:text-left text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
              Stonebridge Legal Solutions
            </span>
            <h1 className="font-heading font-bold text-2xl leading-tight md:text-4xl lg:text-4xl">
              Your Trusted Partner for UK Immigration & Legal Solutions
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto lg:mx-0 text-sm md:text-lg text-justify">
              Stonebridge Led by a UK-qualified Solicitor, Barrister, and IAA Level 3 Immigration Adviser, 
              providing trusted immigration advice and legal representation.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 justify-center lg:justify-start">
              <a href="#services" className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary">
                Our Services
              </a>
              <a href="/testimonials" className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-transparent text-primary border-2 border-primary hover:bg-gradient-to-br hover:from-primary hover:to-amber-700 hover:text-white">
                Happy Clients
              </a>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                  4.5 <svg className="w-5 h-5 text-amber-400 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  From 500+ Clients
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-12">
              <div className="card-premium p-4 flex flex-col sm:flex-row items-start gap-4 text-left h-full" data-aos="zoom-in" data-aos-delay="100">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shadow-md ring-1 ring-primary/20 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                </div>
                <div>
                  <h3 className="font-heading md:text-lg text-slate-800 font-bold">Right to Work Compliance</h3>
                  <p className="text-sm text-slate-600 mt-1">Verify eligibility.</p>
                </div>
              </div>
              <div className="card-premium p-4 flex flex-col sm:flex-row items-start gap-4 text-left h-full" data-aos="zoom-in" data-aos-delay="200">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shadow-md ring-1 ring-primary/20 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h3 className="font-heading md:text-lg text-slate-800 font-bold">HRMS Portal</h3>
                  <p className="text-sm text-slate-600 mt-1">Streamline HR processes.</p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="relative flex justify-center lg:justify-end lg:mt-0 mt-12">
            <div className="absolute top-4 left-0 bg-white/80 backdrop-blur-md p-3 rounded-lg shadow-soft-1 border border-slate-200 flex items-center gap-2 animate-float-slow z-20">
              <span className="h-4 w-4 rounded-full bg-green-500 block"></span>
              <span className="text-sm font-medium text-slate-700">Stonebridge Live</span>
            </div>
            <div className="relative w-full max-w-3xl aspect-[16/9] bg-slate-200 rounded-xl flex items-center justify-center shadow-xl shadow-black/20 ring-1 ring-black/10 overflow-hidden">
               {/* Replace with actual video path later */}
               <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline controls>
                  <source src="/video/stonebridge.mp4" type="video/mp4" />
               </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;