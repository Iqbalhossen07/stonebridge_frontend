import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BlogHero from '../components/blog/BlogHero';
import BlogList from '../components/blog/BlogList';
import CTA from '../components/common/CTA';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // ১. সব ব্লগ ফেচ করা
        const blogRes = await axios.get('https://stonebridge-api.onrender.com/api/blog/all');
        const blogData = blogRes.data.data || blogRes.data;
        setBlogs(blogData);
        setFilteredBlogs(blogData);

        // ২. ইউনিক ক্যাটাগরি তৈরি করা (ডাটাবেসের ব্লগ থেকেই বের করা হচ্ছে)
        const uniqueCategories = [...new Set(blogData.map(blog => blog.category))];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // ৩. সার্চ এবং ফিল্টারিং লজিক
  useEffect(() => {
    const results = blogs.filter(blog => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        blog.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "" || blog.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    setFilteredBlogs(results);
  }, [searchTerm, selectedCategory, blogs]);

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* ব্লগ হিরো সেকশন */}
      <BlogHero />

      {/* ব্লগ লিস্ট এবং ফিল্টারিং */}
      <BlogList 
        filteredBlogs={filteredBlogs}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        handleClear={handleClear}
      />

      <CTA />
    </main>
  );
};

export default Blogs;