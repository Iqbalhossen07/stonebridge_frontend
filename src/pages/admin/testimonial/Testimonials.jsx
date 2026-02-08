import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AOS from 'aos';
import axios from 'axios';
import TestimonialCard from '../../../components/admin/testimonial/TestimonialCard';

const Testimonials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে সব টেস্টিমোনিয়াল লোড করা
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/testimonial/all');
      setTestimonials(response.data);
      
      // ডাটা আসার পর AOS রিফ্রেশ করা যাতে ডাটা লুকিয়ে না থাকে
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchTestimonials();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This testimonial will be removed permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:5000/api/testimonial/delete/${id}`);
          if (response.data.success) {
            setTestimonials(prev => prev.filter(t => t._id !== id));
            Swal.fire('Deleted!', 'Success', 'success');
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to delete', 'error');
        }
      }
    });
  };

  // সার্চ ফিল্টারিং লজিক (ডাটাবেস মডেল অনুযায়ী name এবং description চেক করবে)
  const filteredData = testimonials.filter(t => 
    (t.name && t.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-24">
      {/* হেডার ও সার্চ বার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-[24px] shadow-sm border border-slate-50">
        <h2 className="text-xl font-bold text-slate-800 ml-2">Success Stories</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              value={searchTerm}
              placeholder="Search reviews..." 
              className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-400 transition-colors z-10"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            )}
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
          </div>

          <Link to="/admin/add-testimonial" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 text-sm transition-all">
            <i className="fas fa-plus"></i> Add New Review
          </Link>
        </div>
      </div>

      {/* লোডিং এবং ডাটা গ্রিড */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-400 font-medium tracking-widest uppercase text-[10px]">Loading Reviews...</p>
        </div>
      ) : (
        <div className="min-h-[400px]"> {/* ফ্লিকারিং রোধ করতে ফিক্সড মিনিমাম হাইট */}
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item) => (
                <div key={item._id} data-aos="fade-up"> {/* প্রতিটি কার্ডে আলাদা AOS র‍্যাপার */}
                  <TestimonialCard item={item} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200" data-aos="zoom-in">
               <i className="fas fa-comment-slash text-5xl text-slate-100 mb-4"></i>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No reviews found</p>
               {searchTerm && <button onClick={() => setSearchTerm("")} className="mt-4 text-primary font-bold hover:underline">Clear Search</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Testimonials;