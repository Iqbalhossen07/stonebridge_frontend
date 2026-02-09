import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';

const ContactQueries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All"); // ফিল্টার স্টেট
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);

  // ১. ডাটাবেস থেকে সব মেসেজ নিয়ে আসা
  const fetchQueries = async () => {
    try {
      const res = await axios.get('https://stonebridge-api.onrender.com/api/contact/all'); // আপনার এপিআই লিঙ্ক
      if (res.data.success) {
        setQueries(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
    AOS.init({ duration: 800 });
  }, []);

  // সার্চ এবং সাবজেক্ট ফিল্টার লজিক
  const filteredQueries = queries.filter(q => {
    const matchesSearch = 
      q.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === "All" || q.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  // Bulk Selection লজিক
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredQueries.map(q => q._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Single Delete
  const deleteSingle = (id) => {
    Swal.fire({
      title: 'Delete message?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://stonebridge-api.onrender.com/api/contact/delete/${id}`);
          setQueries(queries.filter(q => q._id !== id));
          Swal.fire('Deleted!', 'Message removed.', 'success');
        } catch (err) {
          Swal.fire('Error', 'Delete failed', 'error');
        }
      }
    });
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-slate-400 uppercase tracking-widest">Loading Inbox...</div>;

  return (
    <div className="space-y-6 pb-24 font-body">
      {/* হেডার এবং ফিল্টার এরিয়া */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white p-6 rounded-[32px] shadow-sm border border-slate-50">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <i className="fas fa-inbox text-xl"></i>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Client Inquiries</h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* সাবজেক্ট ফিল্টার ড্রপডাউন */}
          <select 
            className="w-full md:w-56 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-600 cursor-pointer"
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All">All Topics</option>
            <option value="PSW">PSW (Post-Study Work)</option>
            <option value="Asylum">Asylum</option>
            <option value="Self-Sponsorship">Self-Sponsorship</option>
            <option value="General Query">General Query</option>
          </select>

          {/* সার্চ বার */}
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-700"></i>
          </div>

          {selectedIds.length > 0 && (
            <button 
              className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-black py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-100 transition-all text-[11px] uppercase tracking-widest"
            >
              <i className="fas fa-trash-sweep"></i> Delete ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Select All Section */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-primary rounded-lg cursor-pointer shadow-sm"
              onChange={handleSelectAll}
              checked={selectedIds.length === filteredQueries.length && filteredQueries.length > 0}
            />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select All ({filteredQueries.length})</span>
        </div>
        <p className="text-[10px] font-bold text-slate-700 italic uppercase">Showing results for: {selectedSubject}</p>
      </div>

      {/* কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-aos="fade-up">
        {filteredQueries.map((row) => (
          <div key={row._id} className={`group relative bg-white rounded-[40px] p-8 transition-all duration-700 hover:shadow-2xl border-2 ${selectedIds.includes(row._id) ? 'border-primary bg-primary/[0.02]' : 'border-transparent shadow-soft-1'}`}>
            
            <input 
              type="checkbox" 
              className="absolute top-6 right-6 w-5 h-5 accent-primary cursor-pointer z-10"
              checked={selectedIds.includes(row._id)}
              onChange={() => handleSelectOne(row._id)}
            />

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-primary flex items-center justify-center font-black text-lg">
                    {row.full_name?.charAt(0) || "U"}
                </div>
                <div className="overflow-hidden">
                    <h3 className="font-black text-slate-800 text-lg leading-none truncate">{row.full_name}</h3>
                    <p className="text-slate-400 text-xs font-bold mt-1 truncate">{row.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[9px] md:text-[12px] font-black text-slate-700 uppercase mb-1">Subject</p>
                    <p className="text-[11px] md:text-[13px] font-bold text-slate-700 truncate">{row.subject}</p>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[9px] md:text-[12px] font-black text-slate-700 uppercase mb-1">Phone</p>
                    <p className="text-[11px] md:text-[13px] font-bold text-slate-700 truncate">{row.phone || 'N/A'}</p>
                 </div>
              </div>

              <div className="relative">
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-[2px] mb-2 block">Message Body</span>
                <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-3xl text-slate-600 text-sm leading-relaxed h-32 overflow-y-auto custom-scrollbar italic shadow-inner">
                   {row.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-700 font-bold">{new Date(row.createdAt).toLocaleDateString()}</span>
                <button 
                  onClick={() => deleteSingle(row._id)}
                  className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <i className="fas fa-trash-alt text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQueries.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[50px] border-4 border-dashed border-slate-50">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200 text-3xl">
                <i className="fas fa-folder-open"></i>
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No matching inquiries found</p>
        </div>
      )}
    </div>
  );
};

export default ContactQueries;