import React from 'react';

const GuidanceSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-12 bg-white p-6 rounded-lg shadow-soft-1 border border-slate-200/60" data-aos="fade-up">
      <label htmlFor="liveSearchInput" className="block text-sm font-semibold text-slate-700 mb-2">
        Search Service Instantly
      </label>
      <input 
        type="text" 
        id="liveSearchInput" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type at least 2 letters (e.g., Student, Work...)" 
        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-primary focus:border-primary transition outline-none"
      />
    </div>
  );
};

export default GuidanceSearch;