import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SubServiceView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [subService, setSubService] = useState(null);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে সাব-সার্ভিসের ডিটেইলস নিয়ে আসা
  useEffect(() => {
    const fetchSubService = async () => {
      try {
        // এই এপিআই পাথটি আপনার ব্যাকএন্ডের সাথে মিল রাখা হয়েছে
        const response = await axios.get(`http://localhost:5000/api/sub-service/single/${id}`);
        setSubService(response.data);
      } catch (error) {
        console.error("Error fetching sub-service:", error);
        Swal.fire('Error', 'Sub-service not found!', 'error');
        navigate('/admin/services');
      } finally {
        setLoading(false);
      }
    };
    fetchSubService();
  }, [id, navigate]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-slate-400 font-medium tracking-widest uppercase text-[10px]">Loading Details...</p>
    </div>
  );

  if (!subService) return null;

  return (
    <div className="max-w-[1000px] mx-auto pb-24">
      {/* ব্যাক বাটন সেকশন */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/admin/services')}
          className="group flex items-center gap-3 text-slate-400 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-[3px]"
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-soft-1 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all border border-slate-50">
            <i className="fas fa-arrow-left"></i>
          </div>
          Back to All Services
        </button>
      </div>

      {/* মেইন কন্টেন্ট কার্ড */}
      <div className="bg-white rounded-[48px] shadow-soft-2 border border-slate-50 overflow-hidden relative">
        {/* ডেকোরেটিভ এলিমেন্ট */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none"></div>

        {/* হেডার সেকশন */}
        <div className="p-8 lg:p-12 border-b border-slate-50 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            <p className="text-[11px] font-black text-slate-300 uppercase tracking-[4px]">Detailed Overview</p>
          </div>
          <h2 className="text-3xl lg:text-5xl font-heading font-black text-slate-800 leading-tight">
            {subService.title}
          </h2>
        </div>

        {/* ডেসক্রিপশন এরিয়া */}
        <div className="p-8 lg:p-16 relative min-h-[300px]">
          {/* CKEditor থেকে আসা কন্টেন্ট রেন্ডার করার জন্য dangerouslySetInnerHTML ব্যবহার করা হয়েছে */}
          <div 
            className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed 
            prose-headings:font-heading prose-headings:text-slate-800 prose-headings:font-bold
            prose-p:mb-6 prose-strong:text-slate-800 prose-ul:list-disc prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: subService.description }}
          />
        </div>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="p-8 lg:px-16 lg:pb-16 pt-0 flex justify-end gap-4">
          <Link 
            to={`/admin/edit-sub-service/${id}`}
            className="px-8 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-[3px] hover:bg-slate-200 transition-all active:scale-95"
          >
            Edit Sub-service
          </Link>
          <button 
            onClick={() => window.print()}
            className="px-10 py-4 rounded-2xl bg-primary text-white font-bold text-[10px] uppercase tracking-[3px] shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-2"
          >
            <i className="fas fa-file-pdf"></i> Print Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubServiceView;