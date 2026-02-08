import React from 'react';

const TeamProfileCard = ({ image, name, designation }) => {
  return (
    <div className="lg:col-span-1 space-y-8" data-aos="fade-right">
      <div className="card-premium p-8 text-center bg-white rounded-2xl shadow-soft-2 border border-slate-100">
        <div className="relative inline-block">
          <img 
            src="https://images.unsplash.com/photo-1562788869-4ed32648eb72?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt={name} 
            className="h-40 w-40 rounded-full object-cover mx-auto mb-6 ring-4 ring-primary/10 shadow-lg" 
          />
        </div>
        <h2 className="font-heading text-3xl text-slate-900 mb-2">{name}</h2>
        <p className="text-primary font-bold tracking-wide uppercase text-sm">{designation}</p>
        
        {/* আপনি চাইলে এখানে সোশ্যাল লিঙ্ক বা কন্টাক্ট ইনফো যোগ করতে পারেন */}
        <div className="w-16 h-1 bg-primary/20 mx-auto mt-6 rounded-full"></div>
      </div>
    </div>
  );
};

export default TeamProfileCard;