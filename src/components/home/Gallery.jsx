import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroBackground from './HeroBackground';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/gallery/all');
        setImages(response.data);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const duplicatedImages = images.length > 0 ? [...images, ...images, ...images] : [];

  if (loading) return null;

  return (
    <section id="gallery" className="relative py-24 bg-slate-50/50 overflow-hidden min-h-[400px] flex items-center">
      <HeroBackground />
      <div className="container mx-auto px-6 relative z-10">
        
        {images.length > 0 ? (
          <>
            {/* ডাটা থাকলেই কেবল এই টাইটেল পার্ট দেখাবে */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
                -Our Gallery-
              </span>
              <h2 className="font-heading text-2xl font-bold md:text-4xl text-slate-900 leading-tight" data-aos="fade-up">
                A Glimpse into Our Legal Journey
              </h2>
              <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="100">
                Helping Families, Students & Professionals Move Forward With Confidence
              </p>
            </div>

            {/* স্ক্রলার */}
            <div className="scroller" data-speed="slow" data-aos="fade-up" data-aos-delay="200">
              <ul className="tag-list scroller__inner flex">
                {duplicatedImages.map((img, index) => (
                  <li key={index}>
                    <div className="gallery-card group">
                      <img 
                        src={img.image} 
                        alt={img.caption} 
                        className="w-full h-full object-cover"
                      />
                      <div className="gallery-overlay">
                        <h3 className="text-white text-center px-2">{img.caption}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* বাটন */}
            <div className="text-center mt-16">
              <Link 
                to="/gallery" 
                className="px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary"
              >
                View All Gallery
              </Link>
            </div>
          </>
        ) : (
          /* ডাটা না থাকলে পুরো কম্পোনেন্ট জুড়ে এই মেসেজটি আসবে */
          <div className="text-center py-20 w-full" data-aos="zoom-in">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-slate-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-heading text-xl md:text-3xl font-bold text-slate-400 mb-2">Gallery Coming Soon</h2>
            <p className="text-slate-500 italic max-w-md mx-auto">
              We are currently documenting our latest success stories. Stay tuned for a glimpse into our legal victories!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;