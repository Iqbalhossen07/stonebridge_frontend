import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';

const ContactQueries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); // Bulk delete এর জন্য
  const [queries, setQueries] = useState([
    { id: 1, full_name: "Farheen Sultana", email: "nid.younas77@gmail.com", subject: "General Query", phone: "07448448516", submission_time: "2026-02-04 18:39:00", message: "I am writing to enquire whether your firm would be willing to assist my family.I am writing to enquire whether your firm would be willing to assist my family.I am writing to enquire whether your firm would be willing to assist my family..." },
    { id: 2, f_name: "Isabella Buga", email: "isabellabuga188@gmail.com", subject: "Asylum", phone: "+919810914954", submission_time: "2026-01-26 14:56:00", message: "Seeking Legal Aid for PAP challenge to Deportation Order..." },
    // আরও ডাটা...
  ]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // সার্চ লজিক
  const filteredQueries = queries.filter(q => 
    q.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bulk Selection লজিক
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredQueries.map(q => q.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Single Delete
  const deleteSingle = (id) => {
    Swal.fire({
      title: 'Delete this message?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setQueries(queries.filter(q => q.id !== id));
        Swal.fire('Deleted!', 'Message has been removed.', 'success');
      }
    });
  };

  // Bulk Delete
  const deleteBulk = () => {
    Swal.fire({
      title: `Delete ${selectedIds.length} messages?`,
      text: "Every selected message will be permanently removed!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete All!'
    }).then((result) => {
      if (result.isConfirmed) {
        setQueries(queries.filter(q => !selectedIds.includes(q.id)));
        setSelectedIds([]);
        Swal.fire('Bulk Deleted!', 'Selected messages have been cleared.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Inbox Queries</h1>
        
        <div className="flex items-center gap-3">
          {/* সার্চ বার */}
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
          </div>

          {/* Bulk Delete Button - শুধুমাত্র যখন কিছু সিলেক্ট থাকবে তখনই দেখাবে */}
          {selectedIds.length > 0 && (
            <button 
              onClick={deleteBulk}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-red-200 transition-all active:scale-95 text-sm"
            >
              <i className="fas fa-trash-sweep"></i>
              Delete ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Select All Checkbox */}
      <div className="flex items-center gap-2 ml-4">
        <input 
          type="checkbox" 
          className="w-5 h-5 accent-primary rounded cursor-pointer"
          onChange={handleSelectAll}
          checked={selectedIds.length === filteredQueries.length && filteredQueries.length > 0}
        />
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Select All Messages</span>
      </div>

      {/* কুয়েরি কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-aos="fade-up">
        {filteredQueries.map((row) => (
          <div key={row.id} className={`group relative bg-white rounded-3xl p-6 border-l-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedIds.includes(row.id) ? 'border-primary bg-primary/5 shadow-inner' : 'border-slate-100 shadow-soft-1'}`}>
            
            {/* Checkbox for selection */}
            <input 
              type="checkbox" 
              className="absolute top-4 right-4 w-5 h-5 accent-primary cursor-pointer z-10"
              checked={selectedIds.includes(row.id)}
              onChange={() => handleSelectOne(row.id)}
            />

            <div className="space-y-4">
              <div>
                <h3 className="font-black text-slate-800 text-lg leading-tight truncate pr-6">{row.full_name || row.f_name}</h3>
                <p className="text-primary text-xs font-bold mt-1 uppercase tracking-wider">{row.email}</p>
              </div>

              <div className="bg-slate-50/50 rounded-2xl p-4 space-y-2 border border-slate-50">
                <p className="text-[11px]"><span className="text-slate-400 font-bold uppercase mr-2">Subject:</span> <span className="text-slate-700 font-bold">{row.subject}</span></p>
                <p className="text-[11px]"><span className="text-slate-400 font-bold uppercase mr-2">Phone:</span> <span className="text-slate-700 font-bold">{row.phone}</span></p>
                <p className="text-[11px]"><span className="text-slate-400 font-bold uppercase mr-2">Received:</span> <span className="text-slate-500 font-medium">{new Date(row.submission_time).toLocaleString()}</span></p>
              </div>

             <div className="relative mt-4">
  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] mb-2 block ml-1">
    Message
  </span>
  <div 
    className="bg-white border border-slate-100 p-3 rounded-2xl text-slate-600 text-sm md:text-base shadow-inner overflow-y-auto scrollbar-hide"
    style={{ 
      height: '7.2rem',     /* ২ লাইনের জন্য নির্দিষ্ট হাইট */
      lineHeight: '1.6rem'   /* প্রতি লাইনের স্পেসিং */
    }}
  >
    {row.message}
  </div>
</div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => deleteSingle(row.id)}
                  className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQueries.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-100">
           <i className="fas fa-envelope-open-text text-5xl text-slate-200 mb-4"></i>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No messages in your inbox</p>
        </div>
      )}
    </div>
  );
};

export default ContactQueries;