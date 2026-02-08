import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import ServiceCard from '../../../components/admin/service/ServiceCard';
import ServiceModal from '../../../components/admin/service/ServiceModal';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [services, setServices] = useState([]); // ডাটাবেসের ডাটা এখানে থাকবে
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে সার্ভিস ও সাব-সার্ভিস নিয়ে আসার ফাংশন
  const fetchServices = async () => {
    try {
      // এই এপিআইটি আপনার মেইন সার্ভিসের সাথে সাব-সার্ভিসগুলোও নিয়ে আসবে
      const res = await axios.get('http://localhost:5000/api/service/all-with-sub');
      setServices(res.data);
      // ডাটা আসার পর AOS রিফ্রেশ যাতে এনিমেশন ঠিক থাকে
      setTimeout(() => { AOS.refresh(); }, 100);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditData(null);
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditData(service);
    setShowModal(true);
  };

  // মেইন সার্ভিস ডিলিট করার ফাংশন
 const handleDelete = (id, type) => {
  // টাইপ অনুযায়ী মেসেজ সেট করা
  const message = type === 'Service' 
    ? "All sub-services under this will also be deleted!" 
    : "This sub-service will be removed permanently!";

  Swal.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#87550D',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // টাইপ অনুযায়ী আলাদা আলাদা এপিআই কল করা
        let apiUrl = type === 'Service' 
          ? `http://localhost:5000/api/service/delete/${id}`
          : `http://localhost:5000/api/sub-service/delete/${id}`;

        const response = await axios.delete(apiUrl);

        if (response.data.success) {
          // ডিলিট সফল হলে লিস্ট রিফ্রেশ করা
          fetchServices(); 
          Swal.fire('Deleted!', `${type} has been deleted.`, 'success');
        }
      } catch (error) {
        console.error("Delete error", error);
        Swal.fire('Error', `Failed to delete ${type}`, 'error');
      }
    }
  });
};

  // সার্চ ফিল্টারিং লজিক (আপনার ডাটা স্ট্রাকচার অনুযায়ী)
  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24">
      <h2 className="font-heading text-2xl font-bold text-slate-800">All Services and Sub Services</h2>

      {/* সার্চ ও অ্যাড বাটন বার - আপনার ডিজাইন */}
      <div className="bg-white w-full rounded-2xl shadow-soft-1 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-50">
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 text-sm w-fit transition-all"
        >
          <i className="fas fa-plus"></i> Add New Service
        </button>

        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search services or sub-services..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
        </div>
      </div>

      {/* সার্ভিস কার্ড গ্রিড - লোডিং ফিক্স সহ */}
 {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">Loading Services...</p>
        </div>
      ) : (
        <div className="min-h-[450px]"> {/* হাইট ফিক্সড রাখা হয়েছে যাতে জাম্প না করে */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div key={service._id} data-aos="fade-up"> {/* এনিমেশন কার্ডের ওপর আলাদা করে দেওয়া হয়েছে */}
                  <ServiceCard 
                    service={service} 
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No services found</p>
            </div>
          )}
        </div>
      )}

      {/* মডাল - ডিজাইন আপনারই থাকছে */}
      <ServiceModal 
        isOpen={showModal} 
        onClose={() => { setShowModal(false); fetchServices(); }} 
        editData={editData}
      />
    </div>
  );
};

export default Services;