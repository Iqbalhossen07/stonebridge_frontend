import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceDetailsHero from '../components/services/ServiceDetailsHero';
import ServiceContent from '../components/services/ServiceContent';
import CTA from '../components/common/CTA';

const ServiceDetailsPage = () => {
  const { id } = useParams(); // URL থেকে আইডি ধরা
  const [service, setService] = useState({ title: "Loading...", description: "", found: false });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    // এখানে আপনার API কল হবে ID দিয়ে
    // আপাতত ডামি ডাটা:
    if(id) {
        setService({
            title: "Skilled Worker Visa",
            description: "<h3>Comprehensive Guidance on Skilled Worker Visa</h3><p>Detailed info goes here...</p>",
            found: true
        });
    }
  }, [id]);

  return (
    <main className="bg-white min-h-screen">
      <ServiceDetailsHero title={service.title} />
      <ServiceContent 
        title={service.title} 
        description={service.description} 
        serviceFound={service.found} 
      />
      <CTA />
    </main>
  );
};

export default ServiceDetailsPage;