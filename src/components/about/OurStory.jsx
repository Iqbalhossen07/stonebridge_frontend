import React from 'react';
import { Link } from 'react-router-dom';

const OurStory = () => {
  return (
    <section id="our-story" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl" data-aos="fade-down">
            <img 
              src="/img/2c2f979e-286f-453c-b735-c3dcb324a34e.jfif"
              alt="Our Story - Team working together"
              className="w-full h-80 md:h-96 object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Text Content Side */}
          <div className="space-y-6" data-aos="fade-up">
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-slate-900 leading-tight">
              Our Story: A Journey of Excellence and Trust
            </h2>
            
            <p className="text-slate-700 leading-relaxed text-justify">
              Stonebridge Legal was founded on a simple yet powerful principle: to offer clear and
              compassionate guidance in the often-complex world of UK immigration. We started as a small,
              dedicated team with a passion for helping people navigate their legal journeys, and have
              since grown into a trusted name for clients both in the UK and abroad.
            </p>
            
            <p className="text-slate-700 leading-relaxed text-justify">
              At Stonebridge Legal, our journey began with a clear vision: to provide unparalleled legal
              guidance and support. Founded on the principles of integrity, expertise, and client-first
              service, we've grown from a passionate team into a trusted name in the legal landscape.
            </p>

            <div className="pt-4">
              <Link 
                to="/contact"
                className="inline-block px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-br from-primary to-amber-700 text-white border-2 border-transparent hover:border-primary hover:bg-none hover:bg-white hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;