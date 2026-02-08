import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextEditor from '../../../components/admin/common/TextEditor';

const EditTeamMember = () => {
  const { id } = useParams(); // URL থেকে মেম্বার আইডি নেওয়া
  const navigate = useNavigate();
  
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    short_bio: '',
    linkedin: '',
    facebook: '',
    image: null
  });

  // ১. পুরনো ডাটা লোড করা
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/team/single/${id}`);
        const data = response.data;
        
        setFormData({
          name: data.name,
          designation: data.designation,
          short_bio: data.short_bio,
          linkedin: data.linkedin,
          facebook: data.facebook,
          image: data.image // পুরনো ইমেজের ইউআরএল
        });
        setPreview(data.image); // প্রিভিউতে পুরনো ছবি দেখানো
      } catch (error) {
        Swal.fire('Error', 'Failed to load member data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchMemberDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ২. ডাটা আপডেট করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('short_bio', formData.short_bio);
    data.append('facebook', formData.facebook);
    data.append('linkedin', formData.linkedin);
    
    // যদি নতুন ইমেজ সিলেক্ট করা হয় তবেই সেটি পাঠাবে
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/team/update/${id}`, data);
      if (response.status === 200) {
        Swal.fire({
          title: 'Updated!',
          text: 'Member information updated successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        }).then(() => navigate('/admin/team'));
      }
    } catch (error) {
      Swal.fire('Error', 'Update failed!', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Loading Data...</div>;

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Team Member</h2>

      <div className="bg-white rounded-2xl shadow-soft-1 p-6 lg:p-10 border border-slate-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Role / Designation</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Short Bio</label>
              <TextEditor 
                value={formData.short_bio} 
                onChange={(data) => setFormData({ ...formData, short_bio: data })}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Social Links</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              />
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                placeholder="Facebook URL"
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">Featured Image</label>
              <label className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 cursor-pointer hover:border-primary/50 transition-all">
                <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-xl shadow-md mb-4 mx-auto border-4 border-white" />
                <span className="text-[10px] font-bold text-primary uppercase">Change Image</span>
              </label>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link to="/admin/team" className="px-6 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all">CANCEL</Link>
              <button 
                type="submit"
                disabled={updating}
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-95 transition-all disabled:bg-slate-400"
              >
                {updating ? 'UPDATING...' : 'UPDATE MEMBER'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeamMember;