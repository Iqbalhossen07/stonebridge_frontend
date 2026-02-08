import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const GalleryGrid = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // লাইটবক্সের স্লাইড লজিক
  const slides = images.map((img) => ({ src: img.g_image }));

  // ১ সেকেন্ডের জন্য লোডার দেখানো
  useEffect(() => {
    if (images.length > 0) {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [images]);

  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden min-h-[600px]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-2xl md:text-4xl text-slate-900 leading-tight mb-4" data-aos="fade-up">
            Our Landmark Cases & Successes
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="100">
            Explore a gallery of our successful cases and client victories that highlight our dedication to achieving justice.
          </p>
        </div>

        {/* --- লোডিং কন্ডিশন (Eligible Occupation স্টাইল) --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32" data-aos="fade-in">
            <div className="relative">
                {/* মেইন স্পিনার */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                {/* ইনার পালস ডট */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-primary rounded-full animate-pulse"></div>
            </div>
            <p className="mt-6 text-slate-500 font-medium italic tracking-wide animate-pulse">
                Loading legal gallery assets...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="group relative block w-full h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                onClick={() => { setIndex(idx); setOpen(true); }}
              >
                {/* Image */}
                <img
                  src={img.g_image}
                  alt={img.g_name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Text Area */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="font-heading text-xl md:text-2xl">{img.g_name}</h3>
                  <div className="mt-2 w-10 h-1 bg-white rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </section>
  );
};

export default GalleryGrid;