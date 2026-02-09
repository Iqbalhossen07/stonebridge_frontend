import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TeamDetailsHero from '../components/team/TeamDetailsHero';
import TeamProfileCard from '../components/team/TeamProfileCard';
import TeamAbout from '../components/team/TeamAbout';
import CTA from '../components/common/CTA';

const TeamDetailsPage = () => {
  const { id } = useParams(); // URL থেকে মেম্বার আইডি নিবে
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        // আপনার ব্যাকএন্ডের সিঙ্গেল মেম্বার এপিআই কল (নিশ্চিত হোন আপনার ব্যাকএন্ডে এই রাউটটি আছে)
        const response = await axios.get(`https://stonebridge-api.onrender.com/api/team/single/${id}`);
        
        // কনসোলের লজিক অনুযায়ী যদি ডাটা 'data' প্রপার্টিতে থাকে
        if (response.data && response.data.success) {
          setMember(response.data.data);
        } else {
          // যদি সরাসরি অবজেক্ট আসে
          setMember(response.data);
        }
      } catch (error) {
        console.error("Error fetching team member details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMemberDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 font-bold">Member not found!</p>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen antialiased">
      {/* ১. হিরো সেকশন - ডাটাবেসের 'name' ব্যবহার করা হয়েছে */}
      <TeamDetailsHero name={member.name} />

      {/* ২. প্রোফাইল এবং বর্ণনা সেকশন */}
      <div className="container mx-auto px-6 py-24 relative">
        <div className="lg:grid lg:grid-cols-3 gap-12">
          {/* আপনার মডেল অনুযায়ী image, name, designation পাঠানো হচ্ছে */}
          <TeamProfileCard 
            image={member.image} 
            name={member.name} 
            designation={member.designation} 
          />
          <TeamAbout 
            name={member.name} 
            description={member.short_bio} // মডেলের description বা short_bio
          />
        </div>
      </div>

      <CTA />
    </main>
  );
};

export default TeamDetailsPage;