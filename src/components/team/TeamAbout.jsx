import React from 'react';

const TeamAbout = ({ name, description }) => {
  return (
    <div className="lg:col-span-2 space-y-12 mt-12 lg:mt-0" data-aos="fade-left">
      <div className="card-premium p-8 md:p-12 bg-white rounded-2xl shadow-soft-2 border border-slate-100">
        <h3 className="font-heading text-3xl text-slate-900 mb-6 border-b border-slate-50 pb-4">
          About {name}
        </h3>
        <div className="space-y-4 text-slate-700 leading-relaxed text-lg prose prose-slate max-w-none">
          {/* ডাটাবেস থেকে HTML কন্টেন্ট আসলে dangerouslySetInnerHTML ব্যবহার করতে পারেন */}
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </div>
  );
};

export default TeamAbout;