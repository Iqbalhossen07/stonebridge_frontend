import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TeamHero from '../components/team/TeamHero';
import TeamCard from '../components/team/TeamCard';
import CTA from '../components/common/CTA';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    // ডামি ডাটা (আপনি ডাটাবেস থেকে এটি লোড করবেন)
    const members = [
      { id: 1, t_name: "John Doe", t_designation: "Senior Advocate", t_image: "team1.jpg", t_facebook: "#", t_linkedin: "#" },
      { id: 2, t_name: "Jane Smith", t_designation: "Immigration Specialist", t_image: "team2.jpg", t_facebook: "#", t_linkedin: "#" },
      { id: 3, t_name: "Robert Brown", t_designation: "Corporate Lawyer", t_image: "team3.jpg", t_facebook: "#", t_linkedin: "#" },
      { id: 4, t_name: "Sarah Wilson", t_designation: "Case Manager", t_image: "team4.jpg", t_facebook: "#", t_linkedin: "#" },
    ];
    setTeamMembers(members);
  }, []);

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
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} delay={100 * (index + 1)} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
};

export default TeamPage;