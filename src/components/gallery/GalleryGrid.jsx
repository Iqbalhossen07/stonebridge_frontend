import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
// লাইটবক্সে থাম্বনেইল এবং জুম অপশন যোগ করার জন্য প্লাগইন (ঐচ্ছিক কিন্তু প্রিমিয়াম লাগে)
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const GalleryGrid = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // লাইটবক্সের স্লাইড লজিক
  const slides = images.map((img) => ({ 
    src: img.image,
    title: img.caption,
    description: "Stonebridge Legal Success Story" 
  }));

  useEffect(() => {
    if (images && images.length >= 0) {
      setLoading(false);
    }
  }, [images]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-6 text-slate-500 italic font-medium">Loading gallery assets...</p>
      </div>
    );
  }

  return (
    <section className="relative py-24 bg-slate-50/50 overflow-hidden min-h-[600px]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-2">
            -Our Moments-
          </span>
          <h2 className="font-heading text-2xl md:text-4xl text-slate-900 leading-tight mb-4 font-bold" data-aos="fade-up">
            Our Landmark Cases & Successes
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg" data-aos="fade-up" data-aos-delay="100">
            Explore a gallery of our successful cases, client victories, and professional milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {images.map((img, idx) => (
            <div
              key={img._id}
              className="group relative block w-full h-80 overflow-hidden rounded-2xl shadow-md cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              onClick={() => { setIndex(idx); setOpen(true); }}
            >
              {/* মেইন ইমেজ */}
              <img
                src={img.image}
                alt={img.caption || "Legal Gallery"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* ওভারলে ইফেক্টস */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              {/* হোভার করলে সোনালী আভা আসবে (আপনার ব্র্যান্ড কালার অনুযায়ী) */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* কন্টেন্ট */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-xs uppercase tracking-widest text-primary-light mb-2 opacity-0 group-hover:opacity-100 transition-all delay-100">Success Story</p>
                <h3 className="font-heading text-lg md:text-xl font-semibold leading-tight">{img.caption}</h3>
                <div className="mt-3 w-12 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
              </div>

              {/* জুম আইকন (সেন্টারে) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                 <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* লাইটবক্স প্লাগইনসহ */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
      />
    </section>
  );
};

export default GalleryGrid;