import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryGrid from '../components/gallery/GalleryGrid';
import CTA from '../components/common/CTA';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/gallery/all');
        
        // আপনার ব্যাকএন্ডের success এবং data কি চেক করা হচ্ছে
        if (response.data && response.data.success) {
          setImages(response.data.data);
        } else {
          setImages(response.data);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <p className="ml-3 font-semibold text-slate-700">Loading Gallery...</p>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* ১. গ্যালারি হিরো সেকশন */}
      <GalleryHero />

      {/* ২. গ্যালারি গ্রিড - এখানে images প্রপস হিসেবে পাঠানো হচ্ছে */}
      {images.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <div className="py-24 text-center">
          <p className="text-slate-500 italic text-lg">No moments captured yet.</p>
        </div>
      )}

      {/* ৩. কল টু অ্যাকশন */}
      <CTA />
    </main>
  );
};

export default Gallery;