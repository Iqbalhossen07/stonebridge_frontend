import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Axios ইমপোর্ট করুন
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceDetailsHero from '../components/services/ServiceDetailsHero';
import ServiceContent from '../components/services/ServiceContent';
import CTA from '../components/common/CTA';

const ServiceDetailsPage = () => {
  const { id } = useParams(); 
  // স্টেট ম্যানেজমেন্ট - শুরুতে ল্যালোডিং এবং ইমেজ ফিল্ড সহ
  const [service, setService] = useState({ 
    title: "Loading...", 
    description: "", 
    image: "", 
    found: false 
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    const fetchSubServiceData = async () => {
      try {
        setLoading(true);
        // আপনার ব্যাকএন্ড এপিআই কল (লোকালহোস্ট ৫০০০)
       // আপনার রাউট অনুযায়ী সঠিক লিঙ্ক
    const response = await axios.get(`https://stonebridge-api.onrender.com/api/sub-service/single/${id}`);
        
        if (response.data) {
          setService({
            title: response.data.title,
            description: response.data.description,
            image: response.data.image, // ক্লাউডিনারি ইমেজ লিঙ্ক
            found: true
          });
        }
      } catch (error) {
        console.error("Error fetching sub-service:", error);
        setService({
          title: "Not Found",
          description: "Sorry, we couldn't find the service you're looking for.",
          image: "",
          found: false
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubServiceData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <span className="ml-3 font-bold text-slate-700">Loading Details...</span>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <ServiceDetailsHero title={service.title} />
      
      {/* আমরা ServiceContent-এ এখন ইমেজটাও পাঠিয়ে দিচ্ছি */}
      <ServiceContent 
        title={service.title} 
        description={service.description} 
        image={service.image} 
        serviceFound={service.found} 
      />
      
      <CTA />
    </main>
  );
};

export default ServiceDetailsPage;