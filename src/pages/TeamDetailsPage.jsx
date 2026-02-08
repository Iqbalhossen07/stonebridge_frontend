import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TeamDetailsHero from '../components/team/TeamDetailsHero';
import TeamProfileCard from '../components/team/TeamProfileCard';
import TeamAbout from '../components/team/TeamAbout';
import CTA from '../components/common/CTA';

const TeamDetailsPage = () => {
  const { id } = useParams(); // URL থেকে মেম্বার আইডি নিবে
  const [member, setMember] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    // এখানে আপনার API থেকে মেম্বার ডাটা লোড হবে
    // আপাতত ডামি ডাটা:
    const fetchedMember = {
      id: id,
      t_name: "Sonjoy Kumar Roy",
      t_designation: "Solicitor, Barrister & FCILEX",
      t_image: "team1.jpg",
      t_des: "<h4>Biography</h4><p>Sonjoy Kumar Roy is a distinguished immigration expert with over a decade of experience in UK immigration law...</p>"
    };
    setMember(fetchedMember);
  }, [id]);

  if (!member) return null;

  return (
    <main className="bg-white min-h-screen antialiased">
      {/* ১. হিরো সেকশন */}
      <TeamDetailsHero name={member.t_name} />

      {/* ২. প্রোফাইল এবং বর্ণনা সেকশন */}
      <div className="container mx-auto px-6 py-24 relative">
        <div className="lg:grid lg:grid-cols-3 gap-12">
          <TeamProfileCard 
            image={member.t_image} 
            name={member.t_name} 
            designation={member.t_designation} 
          />
          <TeamAbout 
            name={member.t_name} 
            description={member.t_des} 
          />
        </div>
      </div>

      <CTA />
    </main>
  );
};

export default TeamDetailsPage;