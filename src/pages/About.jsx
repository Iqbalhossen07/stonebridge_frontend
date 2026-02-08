import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutHero from '../components/about/AboutHero';
import CTA from '../components/common/CTA';
import OurStory from '../components/about/OurStory.jsx';
import CoreValues from '../components/about/CoreValues.jsx';
import WhyStonebridge from '../components/about/WhyStonebridge.jsx';




const About = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <main className="bg-white">
      <AboutHero />

      <OurStory />

      <CoreValues />

      <WhyStonebridge /> 

      <CTA />
    </main>
  );
};

export default About;