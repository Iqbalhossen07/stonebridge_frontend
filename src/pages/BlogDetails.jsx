import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogDetailsHero from '../components/blog/BlogDetailsHero';
import BlogContent from '../components/blog/BlogContent';
import CTA from '../components/common/CTA';

const BlogDetails = () => {
  const { id } = useParams(); // URL থেকে ID ক্যাচ করা

  // ১. ব্লগের সব ডাটা (৬টি পোস্ট)
  const allBlogs = [
    {
      id: 1,
      b_title: "UK Skilled Worker Visa: New Updates for 2026",
      b_des: "The UK government has recently announced several key changes to the Skilled Worker Visa route. \n\nThese updates include higher salary thresholds and new compliance requirements for sponsors. It is crucial for businesses to stay updated with these regulations to avoid penalties.",
      b_image: "blog1.jfif",
      b_date: "2026-02-01",
      b_author: "Sonjoy Kumar Roy",
      b_video_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category_id: "1",
      category_name: "Immigration"
    },
    {
      id: 2,
      b_title: "Top 5 Mistakes in Spouse Visa Applications",
      b_des: "Applying for a spouse visa can be stressful. We've identified the top 5 mistakes that lead to rejection. \n\nFrom insufficient financial evidence to failing the English language requirement, we guide you through everything you need to know for a successful application.",
      b_image: "blog2.jfif",
      b_date: "2026-01-25",
      b_author: "Legal Team",
      b_video_link: "",
      category_id: "2",
      category_name: "Family Law"
    },
    {
      id: 3,
      b_title: "Navigating the New Asylum Policy in the UK",
      b_des: "Asylum law is constantly evolving. This article explores the new procedural changes and how they impact individuals seeking protection in the UK.",
      b_image: "blog3.jfif",
      b_date: "2026-01-20",
      b_author: "Legal Expert",
      b_video_link: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      category_id: "1",
      category_name: "Immigration"
    },
    {
      id: 4,
      b_title: "Business Immigration: Guide for Startups",
      b_des: "Startups looking to bring global talent to the UK must understand the sponsor license process. Here's a step-by-step breakdown.",
      b_image: "blog4.jfif",
      b_date: "2026-01-15",
      b_author: "Corporate Advisor",
      b_video_link: "",
      category_id: "3",
      category_name: "Corporate Law"
    },
    {
      id: 5,
      b_title: "Student Visa to PSW: Transition Guide",
      b_des: "Transitioning from a Student Visa to a Graduate Route (PSW) requires careful planning. Make sure you meet the residency requirements.",
      b_image: "blog5.jfif",
      b_date: "2026-01-10",
      b_author: "Education Consultant",
      b_video_link: "",
      category_id: "1",
      category_name: "Immigration"
    },
    {
      id: 6,
      b_title: "Contract Disputes: How to Protect Your Business",
      b_des: "Legal safeguards are essential for every contract. We discuss mediation, arbitration, and litigation strategies for businesses.",
      b_image: "blog6.jfif",
      b_date: "2026-01-05",
      b_author: "Senior Lawyer",
      b_video_link: "",
      category_id: "3",
      category_name: "Corporate Law"
    }
  ];

  // ২. ফিল্টারিং লজিক (স্টেট ম্যানেজমেন্ট)
  const [currentPost, setCurrentPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // বর্তমান পোস্ট খুঁজে বের করা
    const foundPost = allBlogs.find(blog => blog.id === parseInt(id));
    
    if (foundPost) {
      setCurrentPost(foundPost);
      // বর্তমান পোস্ট বাদে বাকিগুলো থেকে ৩টি সাম্প্রতিক পোস্ট নেওয়া
      const others = allBlogs.filter(blog => blog.id !== foundPost.id).slice(0, 3);
      setRecentPosts(others);
    }
    
    // পেজ পরিবর্তন হলে একদম উপরে নিয়ে যাওয়া
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-heading">Loading Legal Insights...</h2>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* ১. হিরো কম্পোনেন্ট */}
      <BlogDetailsHero />
      
      {/* ২. কন্টেন্ট কম্পোনেন্ট (ডাটা পাস করা হয়েছে) */}
      <BlogContent post={currentPost} recentPosts={recentPosts} />
      
      {/* ৩. কল টু অ্যাকশন */}
      <CTA />
    </main>
  );
};

export default BlogDetails;