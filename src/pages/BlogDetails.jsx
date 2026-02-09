import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogDetailsHero from '../components/blog/BlogDetailsHero';
import BlogContent from '../components/blog/BlogContent';
import CTA from '../components/common/CTA';

const BlogDetails = () => {
  const { id } = useParams(); // URL থেকে মেম্বার বা ব্লগের আইডি রিসিভ করা
  const [currentPost, setCurrentPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        // ১. সিঙ্গেল ব্লগ এবং সাম্প্রতিক সব ব্লগের জন্য এপিআই কল
        const [singleRes, allRes] = await Promise.all([
          axios.get(`https://stonebridge-api.onrender.com/api/blog/single/${id}`),
          axios.get('https://stonebridge-api.onrender.com/api/blog/all')
        ]);

        // ২. সিঙ্গেল ব্লগের ডাটা সেট করা
        if (singleRes.data && singleRes.data.success) {
          setCurrentPost(singleRes.data.data);
        } else {
          setCurrentPost(singleRes.data);
        }

        // ৩. রিসেন্ট পোস্ট সেট করা (বর্তমান পোস্ট বাদে ৩টি)
        const allData = allRes.data.data || allRes.data;
        const filteredRecent = allData.filter(blog => blog._id !== id).slice(0, 3);
        setRecentPosts(filteredRecent);

      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
        <p className="ml-3 font-semibold text-slate-700">Loading Legal Insights...</p>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-bold">
        Article not found!
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* ১. হিরো কম্পোনেন্ট */}
      <BlogDetailsHero />
      
      {/* ২. কন্টেন্ট কম্পোনেন্ট (লাইভ ডাটা পাস করা হয়েছে) */}
      <BlogContent post={currentPost} recentPosts={recentPosts} />
      
      {/* ৩. কল টু অ্যাকশন */}
      <CTA />
    </main>
  );
};

export default BlogDetails;