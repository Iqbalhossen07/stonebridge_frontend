import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AOS from 'aos';
import axios from 'axios';
import BlogCard from '../../../components/admin/blog/BlogCard';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]); // ডাটাবেস থেকে আসা ব্লগের জন্য
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে সব ব্লগ লোড করার ফাংশন
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://stonebridge-api.onrender.com/api/blog/all');
      setBlogs(response.data);
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
    fetchBlogs();
  }, []);

  // ব্লগ ডিলিট লজিক
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This blog post will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#87550D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`https://stonebridge-api.onrender.com/api/blog/delete/${id}`);
          if (response.data.success) {
            setBlogs(blogs.filter(b => b._id !== id));
            Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to delete blog.', 'error');
        }
      }
    });
  };

  // সার্চ ফিল্টারিং লজিক (ডাটাবেস মডেল অনুযায়ী title এবং category ফিল্ডে সার্চ হবে)
  const filteredBlogs = blogs.filter(blog => 
    (blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (blog.category && blog.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-24">
      {/* হেডার ও সার্চ বার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-[24px] shadow-sm border border-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <i className="fas fa-blog text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Blog Posts</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your articles</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* সার্চ ইনপুট */}
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-400 transition-colors"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            )}
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
          </div>

          <Link 
            to="/admin/add-blog"
            className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm"
          >
            <i className="fas fa-plus"></i> Add New Post
          </Link>
        </div>
      </div>

      {/* লোডিং স্পিনার */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-400 font-medium">Loading Blogs...</p>
        </div>
      ) : (
        <div className="min-h-[400px]">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBlogs.map((blog) => (
                <div key={blog._id} data-aos="fade-up">
                  <BlogCard blog={blog} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200" data-aos="zoom-in">
              <i className="fas fa-search text-4xl text-slate-200 mb-3"></i>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No blogs found matches your search</p>
              {searchTerm && <button onClick={() => setSearchTerm("")} className="mt-4 text-primary font-bold hover:underline">Clear Search</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;