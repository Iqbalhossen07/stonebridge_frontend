import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CTA from '../components/common/CTA';

const SponsorChecker = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 48;

  // ১. CSV ফাইল লোড করা
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    fetch('/sponsorchecker.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // আপনার CSV-র কলাম নামের সাথে মিলিয়ে ম্যাপ করছি
            const formattedData = results.data.map(item => ({
              name: item['Organisation Name'] || item['name'] || '',
              city: item['Town/City'] || item['city'] || 'N/A',
              rating: item['Type & Rating'] || item['rating'] || 'N/A',
              route: item['Route'] || item['route'] || 'N/A'
            }));
            setSponsors(formattedData);
            setLoading(false);
          }
        });
      });
  }, []);

  // ২. ফিল্টারিং লজিক (মাখন পারফরম্যান্সের জন্য useMemo)
  const filteredSponsors = useMemo(() => {
    return sponsors.filter(item => 
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [searchName, sponsors]);

  // ৩. প্যাজিনেশন লজিক
  const totalResults = filteredSponsors.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const offset = (currentPage - 1) * resultsPerPage;
  const displayedSponsors = filteredSponsors.slice(offset, offset + resultsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // সার্চ করলে ১ নম্বর পেজে নিয়ে যাবে
  };

  const clearSearch = () => {
    setSearchName("");
    setCurrentPage(1);
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative pt-36 md:pt-52 pb-8 md:pb-12 bg-cover bg-center min-h-[200px] flex items-center justify-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1733819109723-92a56f6872a5?q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="space-y-4" data-aos="fade-up">
            <h1 className="font-heading font-bold text-2xl md:text-4xl">Check Sponsor Licenses</h1>
            <p className="text-sm font-semibold text-slate-200  tracking-widest">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link> › 
              <span className="text-white ml-2">Sponsor License</span>
            </p>
            <p className="max-w-2xl mx-auto text-slate-300">
              Check a company’s sponsor licence status so you don’t face fraud or delays.
            </p>
          </div>
        </div>
      </section>

      {/* Search Form Section */}
      <section className="pt-24 pb-12 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <p className="mt-4 text-sm md:text-lg text-slate-600 max-w-2xl mx-auto text-center">
            Tip: Use the exact legal name. Partial matches are supported. Try adding “Ltd/LLP” if you don’t see a result.
          </p>

          <form onSubmit={handleSearch} className="mt-8 p-6 md:p-8 border border-slate-100 rounded-2xl bg-slate-50/50 shadow-lg max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Organisation Name</label>
                <input 
                  type="text" 
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="e.g., McMullan Shellfish, LITTLE NOORIYAH LTD"
                  className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-3 text-slate-800 bg-white"
                />
              </div>
              <div className="flex gap-3">
               
                <button type="button" onClick={clearSearch} className="flex-1 bg-slate-200 text-slate-700 font-medium py-3 rounded-xl hover:bg-slate-300 transition-all">
                  Clear
                </button>
              </div>
            </div>

            {/* Warning Info Box */}
            <div className="mt-8 p-5 rounded-xl border border-primary/10 bg-white shadow-sm flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
                <p>
                                    This sponsor licence information is provided for general reference only and is based on data last
                                    updated on <span class="font-bold text-slate-900 underline decoration-primary/30">4 January 2026</span>.
                                    It may not reflect the most recent changes made by the <span class="text-slate-900 font-medium">Home Office</span>.
                                    Please always check the official Home Office Register of Licensed Sponsors to confirm the current status.
                                    We will always try to keep this databases updated as much as possible.
                                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-12" data-aos="fade-up">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-slate-600">Loading Database...</p>
            </div>
          ) : displayedSponsors.length === 0 ? (
            <div className="text-center bg-white p-12 rounded-2xl shadow-md border border-slate-100">
              <h3 className="font-heading text-xl text-slate-800">No Results Found</h3>
              <p className="text-slate-600 mt-2">Your search criteria did not match any records.</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-slate-600 font-medium">
                Showing {offset + 1} to {Math.min(offset + resultsPerPage, totalResults)} of {totalResults.toLocaleString()} results.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedSponsors.map((company, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-amber-50 group"
                  >
                    <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{company.rating}</p>
                    
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex justify-between text-sm">
                        <strong className="text-slate-500">City:</strong>
                        <span className="text-slate-800 font-medium">{company.city}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <strong className="text-slate-500">Route:</strong>
                        <span className="text-slate-800 font-medium">{company.route}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm disabled:opacity-50 hover:bg-slate-100"
                  >
                    First
                  </button>
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm disabled:opacity-50 hover:bg-slate-100"
                  >
                    &larr; Prev
                  </button>
                  
                  <span className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm disabled:opacity-50 hover:bg-slate-100"
                  >
                    Next &rarr;
                  </button>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm disabled:opacity-50 hover:bg-slate-100"
                  >
                    Last
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTA />
    </main>
  );
};

export default SponsorChecker;