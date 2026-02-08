import React from 'react';

const MapSection = () => {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div data-aos="fade-up">
            <h3 className="font-heading text-2xl text-slate-800 mb-6 font-bold uppercase tracking-wide">London Office Location</h3>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96 border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.583348633!2d0.0016!3d51.542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMyJzMxLjIiTiAwwrAwMCcwNS44IkU!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="font-heading text-2xl text-slate-800 mb-6 font-bold uppercase tracking-wide">Birmingham Office Location</h3>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96 border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.5!2d-1.85!3d52.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI4JzEyLjAiTiAxwrA1MScwMC4wIlc!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;