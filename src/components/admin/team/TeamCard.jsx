import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ member, onDelete }) => {
  // যদি কোনো কারণে মেম্বার ডাটা না থাকে তবে রেন্ডার হবে না
  if (!member) return null;

  return (
    <div className="relative bg-white rounded-2xl shadow-soft-1 text-center p-8 group hover:-translate-y-2 hover:shadow-soft-2 transition-all duration-300 overflow-hidden border border-slate-50">
      
      {/* সোশ্যাল মিডিয়া স্লাইডার */}
      <div className="absolute inset-y-0 left-0 w-14 bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center gap-5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10">
        <a href={member.linkedin || "#"} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white hover:scale-125 transition-all">
          <i className="fab fa-linkedin-in text-lg"></i>
        </a>
        <a href={member.facebook || "#"} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white hover:scale-125 transition-all">
          <i className="fab fa-facebook-f text-lg"></i>
        </a>
      </div>

      {/* প্রোফাইল ইমেজ */}
      <div className="relative inline-block mb-4">
        <img 
          src={member.image || "https://via.placeholder.com/150"} // ইমেজ না থাকলে একটি প্লেসহোল্ডার দেখাবে
          alt={member.name}
          className="w-28 h-28 rounded-full mx-auto border-4 border-slate-100 group-hover:border-primary/30 transition-all duration-500 object-cover shadow-sm"
        />
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      {/* মেম্বার ইনফো */}
      <h3 className="font-heading text-lg font-bold text-slate-800 mb-1">{member.name || "Unknown Name"}</h3>
      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-6">{member.designation || "No Designation"}</p>

      {/* অ্যাকশন বাটনসমূহ */}
      <div className="flex items-center justify-center gap-3 pt-5 border-t border-slate-50">
        
        {/* View Details */}
        <Link 
          to={`/admin/team-view/${member._id}`} 
          className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm" 
          title="View Details"
        >
          <i className="fas fa-eye text-xs"></i>
        </Link>

        {/* Edit Member */}
        <Link 
          to={`/admin/edit-team/${member._id}`}
          className="h-9 w-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm" 
          title="Edit"
        >
          <i className="fas fa-pencil-alt text-xs"></i>
        </Link>

        {/* Delete Member */}
        <button 
          onClick={() => onDelete(member._id)}
          className="h-9 w-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm" 
          title="Delete"
        >
          <i className="fas fa-trash-alt text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default TeamCard;