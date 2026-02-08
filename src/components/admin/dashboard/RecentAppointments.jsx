import React from 'react';

const RecentAppointments = () => {
  const bookings = [
    { id: 1, name: "Mohammed Kashif Qureshi", email: "mohammedkashifqureshi18@gmail.com", phone: "07424664279", service: "Student Visa", date: "2026-02-02", time: "01:00 PM", status: "Pending" },
    { id: 2, name: "Nabila Farzin", email: "nabilafarzin2@gmail.com", phone: "+447417419007", service: "Tourist Visa", date: "2026-01-15", time: "04:30 PM", status: "Pending" },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-50 text-green-600 border-green-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-4 md:space-y-0">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client Info</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Service</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date and Time</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Change Time</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <p className="font-bold text-slate-800 text-sm">{row.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{row.email}</p>
                  <p className="text-slate-400 text-xs">{row.phone}</p>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{row.service}</td>
                <td className="px-6 py-5 text-sm text-slate-600">
                  <p className="font-semibold">Date: {row.date}</p>
                  <p className="text-slate-400 text-xs">Time: {row.time}</p>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusClass(row.status)}`}>
                    {row.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <button className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <i className="fas fa-clock text-xs"></i>
                  </button>
                </td>
                <td className="px-6 py-5 text-center">
                  <button className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mx-auto hover:bg-red-500 hover:text-white transition-all shadow-sm">
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - আপনার রেফারেন্স অনুযায়ী (image_c0e63f.png) */}
      <div className="md:hidden space-y-4">
        {bookings.map((row) => (
          <div key={row.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4 relative overflow-hidden">
            {/* বর্ডার ইফেক্ট */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20"></div>
            
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Client Info</p>
              <h4 className="font-bold text-slate-800">{row.name}</h4>
              <p className="text-slate-400 text-xs">{row.email}</p>
              <p className="text-slate-400 text-xs">{row.phone}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Service</p>
              <p className="text-sm font-medium text-slate-700">{row.service}</p>
            </div>

            <div className="flex justify-between items-end border-t border-slate-50 pt-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Date and Time</p>
                <p className="text-xs font-bold text-slate-600">Date: {row.date}</p>
                <p className="text-[11px] text-slate-400">{row.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${getStatusClass(row.status)}`}>
                {row.status.toUpperCase()}
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 h-11 rounded-xl bg-slate-50 text-primary font-bold text-xs flex items-center justify-center gap-2 border border-slate-100">
                <i className="fas fa-eye"></i> View Details
              </button>
              <button className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAppointments;