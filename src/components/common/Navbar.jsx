import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Mail, Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();
  const activePage = location.pathname;

  // ১. নিউজ বুলেটের জন্য ডাটাবেস থেকে রিয়েল ব্লগ ডাটা আনা


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://stonebridge-api.onrender.com/api/blog/all');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } 
    };
    fetchBlogs();
  }, []);

  const isActive = (path) => activePage === path ? 'nav-active' : '';
  const isMobileActive = (path) => activePage === path ? 'mobile-nav-active' : '';

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 flex items-center justify-between py-3">
          <Link to="/" className="inline-flex items-center gap-2">
            <img className="w-32" src="/img/logo.png" alt="Stonebridge Legal Logo" />
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col gap-1 items-start">
              <div className="flex items-center gap-6">
                <a href="mailto:info@stonebridgelegal.co.uk" className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" /> 
                  <span>info@stonebridgelegal.co.uk</span>
                </a>
                <a href="tel:+447988138221" className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+447988138221</span>
                </a>
              </div>
            </div>
            
            <Link to="/appointment" className="text-center font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary px-4 py-2 text-sm md:px-6 md:py-3 rounded-md ">
              Book Appointment
            </Link>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md border text-xl" aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Desktop Nav */}
      <div id="navWrap" className="bg-primary shadow-md">
        <nav className="hidden lg:flex container mx-auto items-center justify-center py-2">
          <ul className="flex items-center gap-6 font-semibold relative">
            <li><Link to="/" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/')}`}>Home</Link></li>
            <li><Link to="/about-us" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/about-us')}`}>About Us</Link></li>
            <li><Link to="/team" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/team')}`}>Team</Link></li>
            <li><Link to="/services" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/services')}`}>Services</Link></li>
            <li><Link to="/sponsor-checker" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/sponsor-checker')}`}>Sponsor Checker</Link></li>
            <li><Link to="/eligible-occupation" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/eligible-occupation')}`}>Eligible Occupation</Link></li>
            <li><Link to="/application-guidance" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/application-guidance')}`}>Application Guidance </Link></li>
            <li><Link to="/gallery" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/gallery')}`}> Gallery</Link></li>
            <li><Link to="/videos" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/videos')}`}> Videos</Link></li>
            <li><Link to="/blogs" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/blogs')}`}>Blogs</Link></li>
            <li><Link to="/contact" className={`text-sm tracking-wide text-white hover:text-amber-300 transition-colors ${isActive('/contact')}`}>Contact</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu - সব মেনু এখানে অ্যাড করা হয়েছে */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden border-t bg-white/95 backdrop-blur-xl max-h-[calc(100vh-80px)] overflow-y-auto`}>
          <div className="container mx-auto px-6 py-4">
            <ul className="grid gap-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about-us' },
                { name: 'Team', path: '/team' },
                { name: 'Services', path: '/services' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Videos', path: '/videos' },
                { name: 'Blogs', path: '/blogs' },
                { name: 'Sponsor Checker', path: '/sponsor-checker' },
                { name: 'Eligible Occupation', path: '/eligible-occupation' },
                { name: 'Application Guidance', path: '/application-guidance' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md hover:bg-slate-100 font-semibold transition-all ${isMobileActive(item.path)}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* News Bulletin (Dynamic & Infinite Loop) */}
     <div className="news-bulletin bg-white border-b border-slate-200 w-full">
  <div className="flex items-center h-10 overflow-hidden px-1">
    <span className="shrink-0 text-xs md:text-md font-extrabold text-white p-1 px-2 bg-primary mr-1 z-10">
      <strong>Latest News:</strong>
    </span>
    <div className="scroller overflow-hidden flex-1">
      {/* এখানে 'animate-scroll' এর বদলে 'news-scroll' ক্লাসটি ব্যবহার করা হয়েছে */}
      <ul className="scroller__inner news-bulletin__inner flex gap-10 whitespace-nowrap news-scroll hover:[animation-play-state:paused]">
        {/* ডাটাবেস থেকে আসা লেটেস্ট ব্লগ */}
        {blogs.length > 0 ? (
          blogs.map((blog, i) => (
            <li key={i} className="news-bulletin__item">
              <Link to={`/blog-details/${blog._id}`} className="text-sm font-bold text-primary hover:text-amber-700 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                {blog.title}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-sm font-bold text-slate-400">Updating latest news...</li>
        )}
      </ul>
    </div>
  </div>
</div>
    </header>
  );
};

export default Navbar;