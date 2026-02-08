import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../components/home/Hero';
import Testimonials from '../components/home/Testimonials';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Gallery from '../components/home/Gallery';
import VideoSection from '../components/home/VideoSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Blog from '../components/home/Blog';
import CTA from '../components/common/CTA';

// Components



const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white text-slate-900 font-body antialiased selection:bg-primary/20 selection:text-primary">
      {/* Background FX */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 ">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/25 via-primary/10 to-transparent"></div>
        <div className="absolute top-40 -right-24 h-96 w-96 rounded-full blur-3xl opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-amber-400/0 to-transparent"></div>
        <div className="absolute inset-0 noise"></div>
      </div>

      <main>
        <Hero />
        <Testimonials />
        <Services />
        <About />
        <Gallery />
        <VideoSection />
        <WhyChooseUs />
        <Blog />
        <CTA />
     
      </main>
    </div>
  );
};

export default Home;