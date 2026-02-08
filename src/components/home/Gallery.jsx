import React from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from './HeroBackground';

const Gallery = () => {
  // ডামি ডাটা - আপনার ডাটাবেসের ছবিগুলো এখানে থাকবে
  const images = [
    { id: 1, src: "/app/gallery_image/g1.jfif", name: "Client Meeting" },
    { id: 2, src: "/app/gallery_image/g2.jfif", name: "Legal Consultation" },
    { id: 3, src: "/app/gallery_image/g3.jfif", name: "Success Story" },
    { id: 4, src: "/app/gallery_image/g4.jfif", name: "Court Visit" },
    { id: 5, src: "/app/gallery_image/g5.jfif", name: "Office Event" },
  ];

  // ইনফিনিট স্ক্রলিং এর জন্য ডাটা ডুপ্লিকেট করা (Smooth Loop এর জন্য)
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section id="gallery" className="relative py-24 bg-slate-50/50 overflow-hidden">
       <HeroBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Our Gallery-
          </span>
          <h2 className="font-heading text-2xl font-bold md:text-4xl text-slate-900 leading-tight" data-aos="fade-up" data-aos-delay="100">
            A Glimpse into Our Legal Journey
          </h2>
          <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="200">
            Helping Families, Students & Professionals Move Forward With Confidence
          </p>
        </div>

        {/* Scroller Container */}
        <div className="scroller" data-speed="slow" data-aos="fade-up" data-aos-delay="300">
          <ul className="tag-list scroller__inner flex">
            {duplicatedImages.map((img, index) => (
              <li key={index}>
                <div className="gallery-card group">
                  <img 
                    src={img.src} 
                    alt={img.name} 
                    className="w-full h-full object-cover"
                  />
                  {/* আপনি চাইলে এখানে CSS overlay-ও অ্যাড করতে পারেন */}
                  <div className="gallery-overlay">
                    <h3>{img.name}</h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-16">
          <Link 
            data-aos="fade-up" 
            to="/gallery" 
            className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-br from-primary to-amber-700 text-white border-2 border-transparent hover:border-primary"
          >
            View All Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;