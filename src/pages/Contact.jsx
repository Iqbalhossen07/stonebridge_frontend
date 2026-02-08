import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import OfficeInfo from '../components/contact/OfficeInfo';
import MapSection from '../components/contact/MapSection';
import CTA from '../components/common/CTA';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <ContactHero />
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ContactForm />
            <OfficeInfo />
          </div>
        </div>
      </section>
      <MapSection />
      <CTA />
    </main>
  );
};

export default Contact;