import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GuidanceHero from '../components/guidance/GuidanceHero';
import GuidanceSearch from '../components/guidance/GuidanceSearch';
import GuidanceGrid from '../components/guidance/GuidanceGrid';
import CTA from '../components/common/CTA';

const ApplicationGuidance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // আপনার রিকোয়ারমেন্ট অনুযায়ী ডাটাবেসের স্যাম্পল ডাটা
  const allServices = [
    {
      id: 1,
      visa_type: "Visitor Visa",
      required_documents: [
        "Job Offer Letter",
        "Passport",
        "Educational Certificates"
      ]
    },
    {
      id: 2,
      visa_type: "Skill Worker Visa",
      required_documents: [
        "Job Offer Letter",
        "Passport",
        "Educational Certificates"
      ]
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  // লাইভ সার্চ লজিক
  const filteredData = allServices.filter(item => 
    item.visa_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-slate-50/30 min-h-screen antialiased">
      {/* ১. হিরো সেকশন */}
      <GuidanceHero />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* ২. সার্চ বার কম্পোনেন্ট */}
            <GuidanceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          {/* ৩. সার্ভিস গ্রিড কম্পোনেন্ট */}
          <div className="mt-16">
            <GuidanceGrid visaData={filteredData} />
          </div>
        </div>
      </section>

      {/* ৪. কল টু অ্যাকশন */}
      <CTA />
    </main>
  );
};

export default ApplicationGuidance;