import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-soft-1 border border-slate-50 flex flex-col h-full group transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      
      {/* কার্ড হেডার: ইমেজ ও মেইন অ্যাকশন */}
      <div className="relative h-36 bg-slate-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center p-2 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          {/* Cloudinary থেকে আসা সরাসরি ইমেজ পাথ */}
          <img 
            src={service.image} 
            className="w-full h-full object-cover rounded-2xl" 
            alt={service.title} 
          />
        </div>
        
        {/* মেইন সার্ভিস এডিট ও ডিলিট বাটন */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            onClick={() => onEdit(service)}
            className="w-8 h-8 rounded-xl bg-white/80 backdrop-blur-md text-green-600 shadow-sm flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
            title="Edit Main Service"
          >
            <i className="fas fa-pencil-alt text-[10px]"></i>
          </button>
          <button 
            onClick={() => onDelete(service._id, 'Service')} 
            className="w-8 h-8 rounded-xl bg-white/80 backdrop-blur-md text-red-500 shadow-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
            title="Delete Main Service"
          >
            <i className="fas fa-trash-alt text-[10px]"></i>
          </button>
        </div>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tight border-b border-slate-50 pb-4">
          {service.title}
        </h3>

        {/* সাব-সার্ভিস লিস্ট */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] mb-2 ml-1">Sub Services</p>
          
          {service.sub_services && service.sub_services.length > 0 ? (
            service.sub_services.map(sub => (
              <div key={sub._id} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl border border-slate-50 group/sub hover:bg-white hover:shadow-sm transition-all">
                <span className="text-sm font-bold text-slate-600 group-hover/sub:text-primary transition-colors pl-2 truncate pr-2">
                  {sub.title}
                </span>
                
                <div className="flex gap-2 flex-shrink-0">
                  <Link to={`/admin/sub-service-view/${sub._id}`} className="w-7 h-7 rounded-lg bg-white text-blue-500 flex items-center justify-center shadow-sm hover:bg-blue-500 hover:text-white transition-all border border-slate-100">
                    <i className="fas fa-eye text-[10px]"></i>
                  </Link>
                  <Link to={`/admin/edit-sub-service/${sub._id}`} className="w-7 h-7 rounded-lg bg-white text-green-600 flex items-center justify-center shadow-sm hover:bg-green-600 hover:text-white transition-all border border-slate-100">
                    <i className="fas fa-pencil-alt text-[10px]"></i>
                  </Link>
                  <button 
                    onClick={() => onDelete(sub._id, 'Sub-service')} 
                    className="w-7 h-7 rounded-lg bg-white text-red-500 flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all border border-slate-100"
                  >
                    <i className="fas fa-trash-alt text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[10px] text-slate-400 font-bold ml-1 italic">No sub-services yet.</p>
          )}
        </div>
      </div>

      {/* কার্ডের নিচে সাব-সার্ভিস অ্যাড করার বাটন */}
      <div className="p-6 pt-0 mt-auto">
        <Link 
          to={`/admin/add-sub-service?service_id=${service._id}`} 
          className="w-full py-4 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-[2px] rounded-2xl border-2 border-dashed border-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 group/btn"
        >
          <i className="fas fa-plus-circle text-sm group-hover/btn:rotate-90 transition-transform"></i> 
          Add Sub-service
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;