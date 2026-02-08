import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // এপিআই থেকে গ্যালারি ডাটা আনা
  const fetchGallery = async () => {
    try {
      const response = await axios.get('https://stonebridge-api.onrender.com/api/gallery/all');
      setImages(response.data);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchGallery();
  }, []);

  // মাল্টিপল ইমেজ প্রিভিউ এবং ফাইল হ্যান্ডলিং
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  // ইমেজ আপলোড লজিক
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
        return Swal.fire('Error', 'Please select at least one image', 'error');
    }

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file); // ব্যাকএন্ডে 'images' নামে রিসিভ হবে
    });
    formData.append('caption', caption);

    try {
      const res = await axios.post('https://stonebridge-api.onrender.com/api/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Images uploaded to Cloudinary successfully',
          icon: 'success',
          confirmButtonColor: '#87550D',
        });
        fetchGallery(); // লিস্ট রিফ্রেশ করা
        setIsModalOpen(false);
        setPreviews([]);
        setSelectedFiles([]);
        setCaption("");
      }
    } catch (error) {
      Swal.fire('Error', 'Upload Failed! Check your server.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // ইমেজ ডিলিট লজিক
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the image!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://stonebridge-api.onrender.com/api/gallery/delete/${id}`);
          setImages(prev => prev.filter(img => img._id !== id));
          Swal.fire('Deleted!', 'Image has been removed.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Delete Failed', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
        <h2 className="text-xl font-bold text-slate-800 ml-2">Photo Gallery</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <i className="fas fa-plus text-sm"></i>
          <span className="text-sm">Add New Image</span>
        </button>
      </div>

      {/* ইমেজ গ্রিড */}
   {/* ইমেজ গ্রিড */}
{loading ? (
  <div className="text-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    <p className="mt-4 text-slate-400 font-medium">Loading Gallery...</p>
  </div>
) : (
  <div className="min-h-[400px]"> {/* হাইট ফিক্সড থাকলে ফ্লিকার করবে না */}
    {images.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" data-aos="fade-up">
        {images.map((img) => (
          <div key={img._id} className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-sm hover:shadow-xl transition-all duration-500">
            <img 
              src={img.image} 
              alt={img.caption} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button 
                onClick={() => handleDelete(img._id)}
                className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white hover:bg-red-500 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      /* ডাটা লোড হওয়ার পর যদি সত্যিই ডাটা না থাকে তবেই এটি দেখাবে */
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200" data-aos="zoom-in">
         <i className="fas fa-images text-5xl text-slate-100 mb-4"></i>
         <p className="text-slate-400 font-medium">Your gallery is empty!</p>
         <button onClick={() => setIsModalOpen(true)} className="mt-4 text-primary font-bold hover:underline">Upload your first image</button>
      </div>
    )}
  </div>
)}

      {/* --- এড ইমেজ মডাল --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div 
            className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden" 
            data-aos="zoom-in" 
            data-aos-duration="300"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Upload to Gallery</h3>
              <button 
                onClick={() => { setIsModalOpen(false); setPreviews([]); }}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all font-bold"
              >
                &times;
              </button>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              <label className="group flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-200 rounded-[24px] bg-slate-50 hover:border-primary/50 cursor-pointer transition-all">
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
                
                {previews.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 w-full">
                    {previews.map((src, i) => (
                      <img key={i} src={src} className="w-full h-16 object-cover rounded-lg border-2 border-white shadow-sm" alt="Preview" />
                    ))}
                    <div className="w-full h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-images text-2xl text-primary"></i>
                    </div>
                    <p className="text-sm font-bold text-slate-700">Click to Select Multiple Images</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-2 font-medium">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </label>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 ml-1">Image Caption</label>
                <input 
                  type="text" 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g., Office Opening Ceremony"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => { setIsModalOpen(false); setPreviews([]); }}
                  className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:bg-slate-400"
                >
                  {uploading ? 'Uploading...' : 'Submit Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;