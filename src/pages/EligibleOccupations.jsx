import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import CTA from '../components/common/CTA';

const EligibleOccupations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    const fetchLiveData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/occupations');
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchLiveData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      (item.code && item.code.includes(searchTerm)) || 
      (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-36 md:pt-52 pb-12 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1733819109723-92a56f6872a5?q=80&w=2000')" }}>
    


         <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center text-white">
                  <div className="space-y-4" data-aos="fade-up">
                    <h1 className="font-heading font-bold text-2xl md:text-4xl">Eligible Occupation List</h1>
                    <p className="text-sm font-semibold text-slate-200  tracking-widest">
                      <Link to="/" className="hover:text-primary transition-colors">Home</Link> › 
                      <span className="text-white ml-2">Occupation Rates</span>
                    </p>
                    <p className="max-w-2xl mx-auto text-slate-300">
                     Find out which jobs are eligible for the Skilled Worker visa. Search for your job title or code below.
                    </p>
                  </div>
                </div>
      </section>

      <section className="py-12 md:py-20 bg-slate-50/30">
        <div className="container mx-auto px-6">
          
          {/* Search Box */}
          {/* --- Search & Info Section Start --- */}
          <div className="max-w-2xl mx-auto mb-12 space-y-6 px-4 md:px-0" data-aos="fade-up">
            
            {/* ১. প্রিমিয়াম সার্চ বক্স - একদম সমান Width */}
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-amber-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <input 
                type="text" 
                placeholder="Search by SOC Code or Job Title..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="relative w-full px-6 py-4 rounded-xl border border-slate-200 shadow-xl focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none text-slate-800 bg-white"
              />
            </div>

            {/* ২. প্রিমিয়াম ইনফো বক্স - ইনপুট বক্সের সমান Width */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden group transition-all hover:shadow-md">
              {/* অ্যাকসেন্ট বর্ডার */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/30 group-hover:bg-primary transition-colors duration-500"></div>
              
              <div className="flex gap-4 md:gap-5 items-start">
                {/* আইকন কন্টেইনার */}
                <div className="shrink-0 hidden sm:block">
                  <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-5.19 4.59-9.362 9.716-9.716m6.533 12.235A10.956 10.956 0 0112 21c-2.307 0-4.448-.71-6.215-1.928" />
                    </svg>
                  </div>
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <div className="space-y-2 flex-1">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    Important Notice
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  </h4>
                  <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
                    This eligible occupation information is provided for general reference only and is based on data
                    last updated on <span className="font-bold text-slate-900 underline decoration-primary/30 decoration-2 underline-offset-2">4 January 2026</span>. 
                    It may not reflect the most recent changes to immigration rules. 
                    Please always check the official <span className="text-primary font-bold hover:underline cursor-pointer">Home Office guidance</span> to confirm current eligibility.
                  </p>
                </div>
              </div>
            </div>

          </div>
          {/* --- Search & Info Section End --- */}


          {/* Counter Section */}
          {!loading && (
            <div className="mb-6" data-aos="fade-up">
              <p className="text-slate-600 font-medium text-sm md:text-base">
                Showing <span className="text-primary font-bold">{offset + 1}</span> to <span className="text-primary font-bold">{Math.min(offset + itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-slate-900">{filteredData.length.toLocaleString()}</span> occupations found.
              </p>
            </div>
          )}

          {/* Table Container (Large Devices) & Card Container (Mobile) */}
          <div className="bg-transparent md:bg-white md:rounded-2xl md:shadow-2xl md:border md:border-slate-200 overflow-hidden" data-aos="fade-up">
            
            {loading ? (
              <div className="p-20 text-center bg-white rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  <p className="text-slate-500 ">Syncing live data from GOV.UK...</p>
                </div>
              </div>
            ) : currentItems.length > 0 ? (
              <>
                {/* 1. ডেস্কটপ ভিউ (Table) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr className="text-slate-500 uppercase text-[11px] font-bold tracking-widest">
                        <th className="p-5">Code</th>
                        <th className="p-5">Job Type</th>
                        <th className="p-5">Related Titles</th>
                        <th className="p-5 text-center">Eligible</th>
                        <th className="p-5">Standard Rate</th>
                        <th className="p-5">Lower Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentItems.map((row, idx) => (
                        <tr key={idx} className="hover:bg-primary/5 transition-all group">
                          <td className="p-5 font-bold text-primary">{row.code}</td>
                          <td className="p-5 font-bold text-slate-800">{row.type}</td>
                          <td className="p-5 text-slate-700 text-xs md:text-base  leading-relaxed max-w-xs">{row.related_titles}</td>
                          <td className="p-5 text-center">
                            <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase border ${
                              row.eligible === 'Yes' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                            }`}>
                              {row.eligible}
                            </span>
                          </td>
                          <td className="p-5 text-slate-900 font-semibold">{row.standard_rate}</td>
                          <td className="p-5 text-slate-500  text-xs">{row.lower_rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 2. মোবাইল ভিউ (Cards -  */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {currentItems.map((row, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">SOC CODE: {row.code}</span>
                          <h3 className="font-heading text-lg font-bold text-slate-900 mt-1">{row.type}</h3>
                        </div>
                        <span className={`px-2 py-1 text-[9px] font-bold rounded-full uppercase border ${
                          row.eligible === 'Yes' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                        }`}>
                          {row.eligible}
                        </span>
                      </div>
                      
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-[12px]  text-slate-600 font-bold uppercase ">Related Job Titles</span>
                          <p className="text-md  text-slate-700  leading-relaxed">{row.related_titles || 'N/A'}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Standard Rate</span>
                            <span className="text-sm font-bold text-slate-800">{row.standard_rate}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Lower Rate</span>
                            <span className="text-sm font-bold text-slate-500">{row.lower_rate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-20 text-center bg-white rounded-2xl shadow-md">
                <p className="text-slate-500">No results found for your search.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
              <button 
                disabled={currentPage === 1}
                onClick={() => {setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo(0, 500);}}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-slate-100 shadow-sm transition-all disabled:opacity-30 text-sm md:text-base font-medium"
              >
                &larr; Prev
              </button>
              <span className="font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-lg text-xs md:text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => {setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo(0, 500);}}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-slate-100 shadow-sm transition-all disabled:opacity-30 text-sm md:text-base font-medium"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      </section>
      <CTA />
    </main>
  );
};

export default EligibleOccupations;