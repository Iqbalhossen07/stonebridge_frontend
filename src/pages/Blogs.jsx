import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BlogHero from '../components/blog/BlogHero';
import BlogList from '../components/blog/BlogList';
import CTA from '../components/common/CTA';

const Blogs = () => {
const [blogs, setBlogs] = useState([
  {
    id: 1,
    b_title: "UK Skilled Worker Visa: New Updates for 2026",
    b_des: "The UK government has recently announced several key changes to the Skilled Worker Visa route. Learn how these updates affect sponsors and applicants.",
    b_image: "blog1.jfif",
    b_date: "2026-02-01",
    b_author: "Sonjoy Kumar Roy",
    category_id: "1",
    category_name: "Immigration"
  },
  {
    id: 2,
    b_title: "Top 5 Mistakes in Spouse Visa Applications",
    b_des: "Avoiding common errors can significantly increase your chances of a successful spouse visa application. Here are the most frequent mistakes we see.",
    b_image: "blog2.jfif",
    b_date: "2026-01-25",
    b_author: "Legal Team",
    category_id: "2",
    category_name: "Family Law"
  },
  {
    id: 3,
    b_title: "Navigating the New Asylum Policy in the UK",
    b_des: "Understanding the latest asylum rules is crucial for legal representatives. We break down the key procedural changes and legal requirements.",
    b_image: "blog3.jfif",
    b_date: "2026-01-20",
    b_author: "Legal Expert",
    category_id: "1",
    category_name: "Immigration"
  },
  {
    id: 4,
    b_title: "Business Immigration: Guide for Startups",
    b_des: "Are you a founder looking to expand to the UK? This guide covers the Innovator Founder visa and sponsor license requirements.",
    b_image: "blog4.jfif",
    b_date: "2026-01-15",
    b_author: "Corporate Advisor",
    category_id: "3",
    category_name: "Corporate Law"
  },
  {
    id: 5,
    b_title: "Student Visa to PSW: Transition Guide",
    b_des: "Ready to graduate? Here is everything you need to know about moving from a Student Visa to the Graduate Route (PSW) smoothly.",
    b_image: "blog5.jfif",
    b_date: "2026-01-10",
    b_author: "Education Consultant",
    category_id: "1",
    category_name: "Immigration"
  },
  {
    id: 6,
    b_title: "Contract Disputes: How to Protect Your Business",
    b_des: "Learn about the legal safeguards you should have in place to prevent contract disputes and handle them effectively if they arise.",
    b_image: "blog6.jfif",
    b_date: "2026-01-05",
    b_author: "Senior Lawyer",
    category_id: "3",
    category_name: "Corporate Law"
  }
]);

const [categories] = useState([
  { id: "1", name: "Immigration" },
  { id: "2", name: "Family Law" },
  { id: "3", name: "Corporate Law" }
]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const results = blogs.filter(blog => {
      const matchesSearch = blog.b_title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            blog.b_des.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || blog.category_id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredBlogs(results);
  }, [searchTerm, selectedCategory, blogs]);

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <main className="bg-white">
      <BlogHero />
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