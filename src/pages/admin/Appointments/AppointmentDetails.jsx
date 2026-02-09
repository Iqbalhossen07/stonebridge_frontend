import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, MapPin, Briefcase, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://stonebridge-api.onrender.com/api/bookings/details/${id}`);
        if (res.data.success) {
          setBooking(res.data.data);
        }
      } catch (err) {
        console.error("Error loading details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-black animate-pulse">LOADING DETAILS...</div>;
  if (!booking) return <div className="p-20 text-center text-red-500">Booking Not Found!</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-8 font-body">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[32px] shadow-sm border border-slate-50">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold text-sm"
        >
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-all">
            <ArrowLeft size={18} />
          </div>
          Back to List
        </button>
        <div className="text-right">
          <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
            booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {booking.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Client & Appointment Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Client Identity Card */}
          <div className="bg-white p-8 rounded-[40px] shadow-soft-1 border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16"></div>
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[3px] mb-6">Client Identity</h3>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center text-primary text-3xl font-black">
                {booking.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-800">{booking.name}</h1>
                <p className="text-slate-400 font-medium italic">ID: #{booking._id.slice(-6).toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm"><Mail size={18}/></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase">Email Address</p><p className="font-bold text-slate-700">{booking.email}</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm"><Phone size={18}/></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase">Phone Number</p><p className="font-bold text-slate-700">{booking.phone}</p></div>
              </div>
              <div className="md:col-span-2 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm"><MapPin size={18}/></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase">Physical Address</p><p className="font-bold text-slate-700">{booking.address}</p></div>
              </div>
            </div>
          </div>

          {/* Appointment Logic Card */}
          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-8">Appointment Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest"><Calendar size={14}/> Scheduled Date</div>
                   <p className="text-xl font-bold">{new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest"><Clock size={14}/> Scheduled Time</div>
                   <p className="text-xl font-bold">{booking.time}</p>
                </div>
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest"><Briefcase size={14}/> Service Type</div>
                   <p className="text-xl font-bold">{booking.service}</p>
                </div>
             </div>
             
             <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/10">
                <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4"><FileText size={14}/> Client Message</div>
                <p className="text-slate-300 italic">"{booking.message || 'No message provided'}"</p>
             </div>
          </div>
        </div>

        {/* Right Column: Payment Proof */}
        <div className="space-y-8">
           <div className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-6 text-center">Payment Verification</h3>
              <div className="group relative rounded-[32px] overflow-hidden border-4 border-slate-50 aspect-[3/4]">
                <img 
                  src={booking.receipt_image} 
                  alt="Payment Receipt" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <a href={booking.receipt_image} target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">View Full Image</a>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                <AlertCircle size={20}/>
                <p className="text-[10px] font-bold leading-tight uppercase">Verify the receipt carefully before confirming status</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;