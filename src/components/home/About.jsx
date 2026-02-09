import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // আপনার ক্যারোসেল ইমেজগুলো
  const images = [
    { src: "/img/h1.jfif", alt: "Stonebridge Gallery 1" },
    { src: "/img/h2.jfif", alt: "Stonebridge Gallery 2" },
    { src: "/img/h3.jfif", alt: "Stonebridge Gallery 3" },
  ];

  // অটোমেটিক স্লাইড হওয়ার লজিক (প্রতি ৫ সেকেন্ড পর পর)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const changeSlide = (direction) => {
    if (direction === 1) {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-50/50 to-amber-50/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Text Content */}
          <div data-aos="fade-left" className="space-y-6 lg:text-left text-center  p-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
              -About Stonebridge Legal Solutions-
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-slate-900 leading-tight">
              Led by a Highly Qualified UK Immigration Lawyer
            </h2>
            <p className="text-slate-700 max-w-prose mx-auto lg:mx-0 text-sm md:text-lg leading-relaxed text-justify">
              Stonebridge Legal Solutions is led by Sonjoy Kumar Roy, a distinguished immigration expert
              with over a decade of experience in UK immigration law. He is a Solicitor of England and Wales,
              a Barrister (called in 2011), a Chartered Legal Executive (FCILEX), and an Immigration Advice
              Authority (IAA) Level 3 Immigration Adviser — the highest level of accreditation.
              Mr Roy has full rights of audience before the Immigration Tribunal and has represented clients
              in complex asylum, human rights, appeals, detention, and business immigration matters.
            </p>

            <div className="pt-6">
              <Link to="/about-us" className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary">
                Learn More
              </Link>
            </div>
           <div className='text-gray-200'>
             <hr />
           </div>
          </div>

          {/* Image Carousel & Stats */}
          <div data-aos="fade-right" className="space-y-8 max-w-2xl mx-auto lg:mx-0">
            <div className="relative w-full rounded-xl overflow-hidden shadow-soft-3 ring-1 ring-black/10">
              <div className="relative h-[360px] md:h-[400px] w-full">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  />
                ))}

                {/* Navigation Arrows */}
                <button 
                  onClick={() => changeSlide(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md rounded-full p-2 text-slate-800 hover:bg-white transition-colors duration-300 shadow-md z-20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button 
                  onClick={() => changeSlide(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md rounded-full p-2 text-slate-800 hover:bg-white transition-colors duration-300 shadow-md z-20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? "bg-primary scale-110" : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="card-premium p-4 text-center">
                <div className="font-heading text-3xl text-primary">10+</div>
                <p className="text-sm text-slate-600 mt-1">Years Experience</p>
              </div>
              <div className="card-premium p-4 text-center">
                <div className="font-heading text-3xl text-primary">300+</div>
                <p className="text-sm text-slate-600 mt-1">Cases Done</p>
              </div>
              <div className="card-premium p-4 text-center col-span-2 sm:col-span-1">
                <div className="font-heading text-3xl text-primary">90%</div>
                <p className="text-sm text-slate-600 mt-1">Happy Clients</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;