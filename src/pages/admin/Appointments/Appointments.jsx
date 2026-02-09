import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // আপডেট হচ্ছে কি না তা বোঝার জন্য
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [availableSlots, setAvailableSlots] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  
  // মডাল কন্ট্রোল স্টেট
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // ১. এপিআই থেকে সব বুকিং ডাটা নিয়ে আসা
  const fetchAppointments = async () => {
    try {
      const res = await axios.get('https://stonebridge-api.onrender.com/api/bookings/all');
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    AOS.init({ duration: 800 });
  }, []);

  // ২. তারিখ পরিবর্তন হলে স্লট নিয়ে আসার ফাংশন (উইকেন্ড চেকসহ)
  const handleDateChange = async (e) => {
    const dateVal = e.target.value;
    const selectedDate = new Date(dateVal);
    const day = selectedDate.getDay(); // ০ = রবিবার, ৬ = শনিবার

    if (day === 0 || day === 6) {
      Swal.fire('Closed!', 'Sorry, we are closed on weekends. Please select a weekday.', 'info');
      e.target.value = ""; 
      setAvailableSlots([]);
      setNewDate("");
      return;
    }

    setNewDate(dateVal);
    setNewTime(""); // নতুন তারিখ সিলেক্ট করলে আগের টাইম রিসেট

    try {
      const res = await axios.post('https://stonebridge-api.onrender.com/api/bookings/available-slots', { date: dateVal });
      if (res.data.success) {
        setAvailableSlots(res.data.slots);
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  // ৩. স্ট্যাটাস কনফার্ম করার লজিক
  const handleConfirmStatus = async (id) => {
    setIsUpdating(true); // আপডেট শুরু
    try {
      const res = await axios.put(`https://stonebridge-api.onrender.com/api/bookings/status/${id}`);
      if (res.data.success) {
        setAppointments(appointments.map(app => 
          app._id === id ? { ...app, status: 'Confirmed' } : app
        ));
        setShowStatusModal(false);
        Swal.fire('Success!', 'Payment verified and appointment confirmed.', 'success');
      }
    } catch (err) {
      Swal.fire('Error', 'Update failed', 'error');
    } finally {
      setIsUpdating(false); // আপডেট শেষ
    }
  };

  // ৪. রি-শেডিউল কনফার্ম করার লজিক
  const handleConfirmReschedule = async () => {
    if (!newDate || !newTime) {
      return Swal.fire('Wait!', 'Please select both date and a time slot.', 'warning');
    }

    setIsUpdating(true); // আপডেট শুরু
    try {
      const res = await axios.put(`https://stonebridge-api.onrender.com/api/bookings/reschedule/${selectedAppointment._id}`, {
        date: newDate,
        time: newTime
      });

      if (res.data.success) {
        Swal.fire('Success!', 'Appointment Rescheduled Successfully', 'success');
        fetchAppointments(); // টেবিল রিফ্রেশ
        closeRescheduleModal(); // মডাল রিসেট ও বন্ধ
      }
    } catch (err) {
      Swal.fire('Error', 'Could not update schedule', 'error');
    } finally {
      setIsUpdating(false); // আপডেট শেষ
    }
  };

  // ৫. ডিলিট লজিক
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This appointment will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`https://stonebridge-api.onrender.com/api/bookings/delete/${id}`);
          if (res.data.success) {
            setAppointments(appointments.filter(app => app._id !== id));
            Swal.fire('Deleted!', 'Success', 'success');
          }
        } catch (err) {
          Swal.fire('Error', 'Delete failed', 'error');
        }
      }
    });
  };

  // মডাল ক্লোজ করার সময় সব রিসেট করার ফাংশন
  const closeRescheduleModal = () => {
    setShowTimeModal(false);
    setNewDate("");
    setNewTime("");
    setAvailableSlots([]);
    setSelectedAppointment(null);
  };

  // ফিল্টার লজিক
  const filteredData = appointments.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[3px] animate-pulse">Loading Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 font-body">
      {/* হেডার ও সার্চ */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Appointments Management</h2>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search client or email..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
        </div>
      </div>

      {/* টেবিল কন্টেইনার */}
      <div className="bg-white rounded-[32px] shadow-soft-1 overflow-hidden border border-slate-100">
        <div className="hidden md:grid md:grid-cols-5 gap-4 bg-slate-50/80 border-b p-6 font-black text-slate-400 text-[10px] uppercase tracking-[2px]">
          <div>Client Info</div>
          <div>Service</div>
          <div>Schedule</div>
          <div className="text-center">Payment & Status</div>
          <div className="text-center">Actions</div>
        </div>

        <div className="space-y-6 md:space-y-0 md:divide-y md:divide-slate-50">
          {filteredData.map((row) => (
            <div key={row._id} className="bg-white md:bg-transparent rounded-[32px] md:rounded-none p-2 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4 items-center hover:bg-slate-50/50 transition-all duration-300">
              
              <div className="p-5 md:p-0 border-b md:border-none border-slate-50 space-y-1">
                <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <i className="fas fa-user-circle text-primary/40 text-sm"></i> Client Info
                </h4>
                <p className="font-bold text-slate-800 text-lg md:text-base leading-tight">{row.name}</p>
                <p className="text-sm md:text-xs text-slate-500 font-medium">{row.email}</p>
                <p className="text-sm md:text-xs text-slate-400 font-bold">{row.phone}</p>
              </div>

              <div className="p-5 md:p-0 border-b md:border-none border-slate-50">
                <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <i className="fas fa-briefcase text-primary/40 text-sm"></i> Service
                </h4>
                <span className="inline-block bg-primary/5 text-primary text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-wider border border-primary/10">
                  {row.service}
                </span>
              </div>

              <div className="p-5 md:p-0 border-b md:border-none border-slate-50 space-y-4">
                <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <i className="fas fa-calendar-alt text-primary/40 text-sm"></i> Date & Time
                </h4>
                <div className="flex flex-col gap-1 text-slate-700 text-sm md:text-xs font-black">
                  <p><span className="text-slate-400 font-medium">Date:</span> {new Date(row.date).toLocaleDateString('en-GB')}</p>
                  <p><span className="text-slate-400 font-medium">Time:</span> {row.time}</p>
                </div>
                <div className="flex items-center justify-between md:justify-start gap-3 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-2xl">
                  <span className="md:hidden text-[10px] text-slate-500 font-bold uppercase tracking-widest italic text-primary">Change schedule?</span>
                  <button 
                    onClick={() => { setSelectedAppointment(row); setShowTimeModal(true); }}
                    className="w-10 h-10 rounded-full bg-white md:bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"
                  >
                    <i className="fas fa-clock text-xs"></i>
                  </button>
                </div>
              </div>

              <div className="p-5 md:p-0 border-b md:border-none border-slate-50 space-y-4">
                <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <i className="fas fa-credit-card text-primary/40 text-sm"></i> Payment Status
                </h4>
                <div className="flex items-center justify-between md:flex-col md:items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    row.status === 'Confirmed' ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {row.status}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedAppointment(row); setShowReceiptModal(true); }}
                      className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100"
                    >
                      <i className="fas fa-file-invoice text-sm"></i>
                    </button>
                    {row.status === 'Pending' && (
                      <button 
                        onClick={() => { setSelectedAppointment(row); setShowStatusModal(true); }}
                        className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"
                      >
                        <i className="fas fa-check-double text-sm"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-0">
                <h4 className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <i className="fas fa-tasks text-primary/40 text-sm"></i> Action
                </h4>
                <div className="flex items-center justify-center gap-4">
                 <Link 
  to={`/admin/appointment/${row._id}`} 
  className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all shadow-md border border-slate-800"
>
  <i className="fas fa-eye text-sm"></i>
</Link>
                  <button 
                    onClick={() => handleDelete(row._id)}
                    className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                  >
                    <i className="fas fa-trash-alt text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- মডালসমূহ --- */}

      {/* রি-শেডিউল মডাল */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">Reschedule Appointment</h3>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Select Date</label>
              <input 
                  type="date" 
                  onChange={handleDateChange} 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-700" 
              />

              <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto p-2 scrollbar-thin">
                      {availableSlots.length > 0 ? availableSlots.map((slot, index) => (
                          <button
                              key={index}
                              disabled={slot.isBooked || isUpdating}
                              onClick={() => setNewTime(slot.time)}
                              className={`py-3 rounded-xl text-[10px] font-black transition-all border-2 ${
                                  slot.isBooked 
                                  ? 'bg-red-50 border-red-100 text-red-200 cursor-not-allowed' 
                                  : newTime === slot.time 
                                      ? 'bg-primary border-primary text-white shadow-lg' 
                                      : 'bg-green-50 border-green-100 text-green-600 hover:border-green-400' 
                              }`}
                          >
                              {slot.time}
                          </button>
                      )) : <p className="col-span-3 text-center text-[10px] text-slate-400 py-4 italic">Please select a weekday first</p>}
                  </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={closeRescheduleModal} disabled={isUpdating} className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl uppercase text-[10px] tracking-widest">Cancel</button>
              <button 
                  onClick={handleConfirmReschedule}
                  disabled={!newTime || isUpdating}
                  className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-95 transition-all"
              >
                  {isUpdating ? "Rescheduling..." : "Confirm Reschedule"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* পেমেন্ট কনফার্ম মডাল */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <i className={`${isUpdating ? 'fas fa-spinner fa-spin' : 'fas fa-check-circle'}`}></i>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-widest">Verify Payment</h3>
            <p className="text-xs text-slate-400 font-bold mb-8 italic">Confirm if you have received the payment from {selectedAppointment?.name}</p>
            <div className="flex flex-col gap-3">
              <button 
                disabled={isUpdating}
                onClick={() => handleConfirmStatus(selectedAppointment._id)}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl uppercase text-[10px] tracking-widest shadow-lg shadow-green-200 active:scale-95 transition-all disabled:opacity-50"
              >
                {isUpdating ? "Confirming..." : "Receive & Confirm"}
              </button>
              <button onClick={() => setShowStatusModal(false)} disabled={isUpdating} className="w-full py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl uppercase text-[10px] tracking-widest hover:bg-slate-100">Keep Pending</button>
            </div>
          </div>
        </div>
      )}

      {/* পেমেন্ট রিসিপ্ট প্রিভিউ মডাল */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4" onClick={() => setShowReceiptModal(false)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowReceiptModal(false)} className="absolute -top-12 right-0 text-white text-3xl hover:text-primary transition-all">
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={selectedAppointment?.receipt_image} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-[40px] shadow-2xl border-[12px] border-white/10"
              alt="Payment Receipt" 
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Appointments;