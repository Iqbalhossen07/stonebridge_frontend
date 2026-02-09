import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TeamHero from '../components/team/TeamHero';
import TeamCard from '../components/team/TeamCard';
import CTA from '../components/common/CTA';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // AOS এবং স্ক্রল পজিশন সেট
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    // ডাটাবেস থেকে টিম মেম্বারদের নিয়ে আসা
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/team/all');
        // আপনার মডেল অনুযায়ী ডাটা 'order' ফিল্ড দিয়ে সর্ট হয়ে আসতে পারে
        console.log(response.data);
        setTeamMembers(response.data.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <p className="ml-3 font-semibold text-slate-600">Loading Experts...</p>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <TeamHero />

      <section id="team" className="relative py-24 bg-slate-50/50 overflow-hidden">
        {/* Wave Background Effect */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
          <svg className="relative block w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="font-heading text-lg font-semibold text-primary tracking-widest uppercase mb-2" data-aos="fade-up">Our Team</h3>
            <h2 className="font-heading text-2xl md:text-4xl text-slate-900 leading-tight" data-aos="fade-up" data-aos-delay="100">
              The Experts Behind Our Success
            </h2>
            <p className="text-slate-600 mt-4 text-sm md:text-lg" data-aos="fade-up" data-aos-delay="200">
              Introducing the dedicated professionals committed to transforming your vision into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <TeamCard 
                  key={member._id} 
                  member={member} 
                  delay={100 * (index + 1)} 
                />
              ))
            ) : (
              <p className="text-center col-span-full text-slate-500 italic">No team members found.</p>
            )}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
};

export default TeamPage;