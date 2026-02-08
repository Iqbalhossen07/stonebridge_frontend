import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryGrid from '../components/gallery/GalleryGrid';
import CTA from '../components/common/CTA';

// ছবিগুলো ইমপোর্ট করা (আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী)
import img1 from '../assets/gallery/1.jpeg';
import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';
import img4 from '../assets/gallery/4.jpeg';
import img5 from '../assets/gallery/5.jpeg';
import img6 from '../assets/gallery/6.jpeg';
import img7 from '../assets/gallery/7.jpeg';
import img8 from '../assets/gallery/8.jpeg';
import img9 from '../assets/gallery/9.jpeg';
import img10 from '../assets/gallery/10.jpeg';
import img11 from '../assets/gallery/11.jpeg';
import img12 from '../assets/gallery/12.jpeg';

const Gallery = () => {
  const [images] = useState([
    { id: 1, g_name: "Client Victory 2026", g_image: img1 },
    { id: 2, g_name: "Immigration Success", g_image: img2 },
    { id: 3, g_name: "Our Professional Team", g_image: img3 },
    { id: 4, g_name: "Community Support", g_image: img4 },
    { id: 5, g_name: "Business Law Win", g_image: img5 },
    { id: 6, g_name: "Family Court Victory", g_image: img6 },
    { id: 7, g_name: "London Office", g_image: img7 },
    { id: 8, g_name: "Client Consultation", g_image: img8 },
    { id: 9, g_name: "Legal Advisory", g_image: img9 },
    { id: 10, g_name: "Corporate Meeting", g_image: img10 },
    { id: 11, g_name: "Success Story", g_image: img11 },
    { id: 12, g_name: "Court Representation", g_image: img12 },
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white">
      <GalleryHero />
      <GalleryGrid images={images} />
      <CTA />
    </main>
  );
};

export default Gallery;