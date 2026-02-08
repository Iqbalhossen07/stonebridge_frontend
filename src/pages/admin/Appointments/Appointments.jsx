import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // মডাল কন্ট্রোল স্টেট
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const [appointments, setAppointments] = useState([
    { id: 1, name: "Ariful Islam", email: "arif@example.com", phone: "01712345678", service: "UK Student Visa", date: "2026-02-10", time: "10:30", status: "Pending", receipt: "receipt1.jpg" },
    { id: 2, name: "Sultana Razia", email: "razia@example.com", phone: "01812345679", service: "Legal Consultation", date: "2026-02-12", time: "14:00", status: "Confirmed", receipt: "receipt2.jpg" },
  ]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // ডিলিট লজিক
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This appointment will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setAppointments(appointments.filter(app => app.id !== id));
        Swal.fire('Deleted!', 'Success', 'success');
      }
    });
  };

  // ফিল্টার লজিক
  const filteredData = appointments.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24">
      {/* হেডার ও সার্চ */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recent Appointments</h2>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search by client name..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
        </div>
      </div>

      {/* টেবিল হেডার (ডেস্কটপ) */}
      <div className="bg-white rounded-[32px] shadow-soft-1 overflow-hidden">
        <div className="hidden md:grid md:grid-cols-5 gap-4 bg-slate-50/80 border-b p-6 font-black text-slate-400 text-[10px] uppercase tracking-[2px]">
          <div>Client Info</div>
          <div>Service</div>
          <div>Schedule</div>
          <div className="text-center">Payment & Status</div>
          <div className="text-center">Actions</div>
        </div>

        {/* অ্যাপয়েন্টমেন্ট লিস্ট */}
       {/* অ্যাপয়েন্টমেন্ট লিস্ট */}
<div className="space-y-6 md:space-y-0 md:divide-y md:divide-slate-50">
  {filteredData.map((row) => (
    <div key={row.id} className="bg-white md:bg-transparent rounded-[32px] md:rounded-none shadow-soft-1 md:shadow-none p-6 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 items-center hover:bg-slate-50/50 transition-colors duration-300 border border-slate-100 md:border-none appointment-row">
      
      {/* Client Info */}
      <div className="space-y-1">
        <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Client Info</h4>
        <p className="font-bold text-slate-800 text-lg md:text-base">{row.name}</p>
        <p className="text-sm md:text-xs text-slate-400 font-medium">{row.email}</p>
        <p className="text-sm md:text-xs text-slate-400 font-medium">{row.phone}</p>
      </div>

      {/* Service */}
      <div className="space-y-1">
        <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service</h4>
        <span className="inline-block bg-primary/5 text-primary text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-wider">
          {row.service}
        </span>
      </div>

      {/* Schedule */}
      <div className="space-y-3">
        <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date and Time</h4>
        <div className="flex flex-col gap-1 text-slate-600 text-sm md:text-xs font-bold">
          <p>Date: {row.date}</p>
          <p>Time: {row.time} PM</p>
        </div>
        <div className="flex items-center justify-between md:justify-start gap-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Change Time</span>
          <button 
            onClick={() => { setSelectedAppointment(row); setShowTimeModal(true); }}
            className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"
          >
            <i className="fas fa-pencil-alt text-xs"></i>
          </button>
        </div>
      </div>

      {/* Payment & Status */}
      <div className="space-y-4 md:space-y-2">
        <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Status</h4>
        <div className="flex items-center justify-between md:flex-col md:items-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
            row.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {row.status}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => { setSelectedAppointment(row); setShowReceiptModal(true); }}
              className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100"
            >
              <i className="fas fa-receipt text-xs"></i>
            </button>
            {row.status === 'Pending' && (
              <button 
                onClick={() => { setSelectedAppointment(row); setShowStatusModal(true); }}
                className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"
              >
                <i className="fas fa-pencil-alt text-xs"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 md:pt-0 border-t md:border-none border-slate-50">
        <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Action</h4>
        <div className="flex items-center justify-center gap-4">
          <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100">
            <i className="fas fa-eye text-sm"></i>
          </button>
          <button 
            onClick={() => handleDelete(row.id)}
            className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
          >
            <i className="fas fa-trash-alt text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>

      {/* --- মডাল সেকশনসমূহ --- */}

      {/* ১. টাইম ও ডেট চেঞ্জ মডাল */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl" data-aos="zoom-in">
            <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">Reschedule Appointment</h3>
            <div className="space-y-4">
              <input type="date" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700" defaultValue={selectedAppointment?.date} />
              <input type="time" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700" defaultValue={selectedAppointment?.time} />
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowTimeModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
              <button className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all">Update Schedule</button>
            </div>
          </div>
        </div>
      )}

      {/* ২. স্ট্যাটাস চেঞ্জ মডাল */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl text-center" data-aos="zoom-in">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-widest">Update Payment Status</h3>
            <p className="text-xs text-slate-400 font-bold mb-8">Confirm if you have received the payment from {selectedAppointment?.name}</p>
            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl uppercase text-[10px] tracking-widest shadow-lg shadow-green-200 active:scale-95 transition-all">Receive & Confirm</button>
              <button onClick={() => setShowStatusModal(false)} className="w-full py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all">Keep Pending</button>
            </div>
          </div>
        </div>
      )}

      {/* ৩. পেমেন্ট রিসিপ্ট প্রিভিউ মডাল */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4" onClick={() => setShowReceiptModal(false)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowReceiptModal(false)} className="absolute -top-12 right-0 text-white text-3xl hover:text-primary transition-all">
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={`/receiptimg/${selectedAppointment?.receipt}`} 
              className="w-full h-auto rounded-3xl shadow-2xl border-8 border-white/10"
              alt="Payment Receipt" 
            />
            <div className="mt-6 text-center">
              <p className="text-white font-bold tracking-widest uppercase text-xs">Payment Proof: {selectedAppointment?.name}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Appointments;