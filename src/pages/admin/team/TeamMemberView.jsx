import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const TeamMemberView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL থেকে মেম্বার আইডি নেওয়া
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে মেম্বারের তথ্য নিয়ে আসা
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/team/single/${id}`);
        // ব্যাকএন্ড সরাসরি মেম্বার অবজেক্ট পাঠাচ্ছে
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching member details:", error);
        Swal.fire('Error', 'Member details not found!', 'error');
        navigate('/admin/team');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-slate-400 font-medium">Fetching details...</p>
      </div>
    );
  }

  if (!member) return null;

  return (
    <div className="max-w-[1200px] mx-auto pb-24">
      {/* ব্যাক বাটন */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/admin/team')}
          className="group flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <i className="fas fa-arrow-left"></i>
          </div>
          Back to All Members
        </button>
      </div>

      {/* মেইন ভিউ কার্ড */}
      <div className="bg-white rounded-[32px] shadow-soft-1 border border-slate-50 overflow-hidden lg:p-12 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* বাম পাশ: প্রোফাইল পিকচার এবং সোশ্যাল (৪ কলাম) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:border-r border-slate-100 lg:pr-12">
            <div className="relative group">
              <img 
                src={member.image} // ক্লাউডিনারির সরাসরি ইউআরএল
                alt={member.name} 
                className="w-56 h-56 lg:w-64 lg:h-64 rounded-full object-cover border-8 border-slate-50 shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            <div className="mt-10 flex gap-4">
              <SocialIcon icon="fab fa-linkedin-in" link={member.linkedin} color="bg-blue-50 text-blue-600 hover:bg-blue-600" />
              <SocialIcon icon="fab fa-facebook-f" link={member.facebook} color="bg-blue-50 text-blue-700 hover:bg-blue-700" />
            </div>
          </div>

          {/* ডান পাশ: বিস্তারিত তথ্য (৮ কলাম) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-black text-slate-800 mb-2 leading-tight">
                {member.name}
              </h2>
              <p className="text-primary font-bold text-lg lg:text-xl uppercase tracking-wider italic">
                {member.designation}
              </p>
            </div>

            <div className="h-1 w-20 bg-primary/20 rounded-full"></div>

            {/* বায়োগ্রাফি সেকশন */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                 <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                 About {member.name}
              </h3>
              
              {/* রিচ টেক্সট রেন্ডারিং (CKEditor থেকে আসা short_bio ডাটা) */}
              <div 
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base lg:text-lg"
                dangerouslySetInnerHTML={{ __html: member.short_bio }}
              />
            </div>

            {/* মোবাইল অ্যাপ স্টাইল বাটন - শুধু মোবাইলের জন্য */}
            <div className="lg:hidden pt-8">
              <button 
                onClick={() => navigate('/admin/team')}
                className="w-full bg-slate-50 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <i className="fas fa-chevron-left"></i> CLOSE PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ছোট সোশ্যাল আইকন হেল্পার
const SocialIcon = ({ icon, link, color }) => (
  <a 
    href={link || "#"} 
    target="_blank" 
    rel="noreferrer"
    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all shadow-sm hover:text-white hover:scale-110 active:scale-90 ${color}`}
  >
    <i className={icon}></i>
  </a>
);

export default TeamMemberView;