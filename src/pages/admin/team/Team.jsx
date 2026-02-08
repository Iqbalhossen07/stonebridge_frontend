import React, { useState, useEffect } from 'react';
import TeamCard from '../../../components/admin/team/TeamCard';
import Swal from 'sweetalert2';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('https://stonebridge-api.onrender.com/api/team/all');
      if (Array.isArray(response.data)) {
        setMembers(response.data);
      } else if (response.data.success && Array.isArray(response.data.data)) {
        setMembers(response.data.data);
      }
    } catch (error) {
      console.error("API Connection Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: false }); // once: false দিলে বারবার এনিমেশন কাজ করবে
    fetchMembers();
  }, []);

  // সার্চ টার্ম চেঞ্জ হলে AOS রিফ্রেশ করার জন্য এই ইফেক্টটি দরকার
  useEffect(() => {
    AOS.refresh();
  }, [searchTerm, members]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Member will be removed permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`https://stonebridge-api.onrender.com/api/team/delete/${id}`);
          if (response.status === 200) {
            setMembers(prev => prev.filter(m => m._id !== id)); 
            Swal.fire('Deleted!', 'Member has been removed.', 'success');
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to delete member', 'error');
        }
      }
    });
  };

  const displayMembers = searchTerm.trim() === "" 
    ? members 
    : members.filter(m => 
        (m.name && m.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (m.designation && m.designation.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Team Members</h2>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            value={searchTerm}
            placeholder="Search by name or role..." 
            className="w-full pl-5 pr-12 py-3 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm text-sm"
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
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center justify-between">
         <p className="text-sm text-slate-500 font-medium ml-2">Manage your professional team</p>
         <Link to={"/admin/add-team"} className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95">
           <i className="fas fa-plus text-sm"></i>
           <span className="text-sm">Add New Member</span>
         </Link>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading Team Members...</p>
        </div>
      ) : (
        <div className="min-h-[400px]"> {/* হাইট ফিক্সড থাকলে লেআউট ফ্লিকার করবে না */}
          {displayMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
              {displayMembers.map((member) => (
                <div key={member._id} data-aos="fade-up"> {/* এনিমেশন এখানে দিলে সার্চ ক্লিয়ারে সুবিধা হয় */}
                  <TeamCard 
                    member={member} 
                    onDelete={handleDelete} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200" data-aos="zoom-in">
               <i className="fas fa-search-minus text-5xl text-slate-100 mb-4"></i>
               <p className="text-slate-400 font-medium">No results found for "{searchTerm}"</p>
               <button onClick={() => setSearchTerm("")} className="mt-4 text-primary font-bold hover:underline">Clear Search</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Team;