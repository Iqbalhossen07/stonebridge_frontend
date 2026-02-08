import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showCookie, setShowCookie] = useState(false);

  // কুকি ব্যানার দেখানোর লজিক
  useEffect(() => {
    const isAccepted = localStorage.getItem('cookieAccepted');
    if (!isAccepted) {
      setTimeout(() => setShowCookie(true), 2000); // ২ সেকেন্ড পর দেখাবে
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setShowCookie(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative bg-slate-900 pt-24 text-slate-300">
        {/* Top Wave SVG */}
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-24">
          <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
            <path className="text-slate-900" d="M0 100 C 500 100 800 0 1440 100 Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* About Section */}
            <div className="space-y-4">
              <Link to="/" className="inline-flex items-center gap-2">
                <h4 className="font-heading text-lg text-white mb-4">About Stonebridge Legal</h4>
              </Link>
              <p className="text-slate-400 max-w-xs">
                Stonebridge Legal is a renowned law firm dedicated to providing expert legal solutions with unwavering commitment to justice and client success. Your trusted partner in every legal challenge.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" aria-label="LinkedIn" className="social-link-footer">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.43 12.9,11.2V10.13H10.13V18.5H12.9V13.57C12.9,12.8 13.54,12.17 14.31,12.17C15.08,12.17 15.72,12.8 15.72,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 8,5.19 6.88,5.19C5.76,5.19 5.19,6 5.19,6.88C5.19,7.77 5.76,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="social-link-footer">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h6.38V14.25h-2.1V11.5h2.1V9.62c0-2.09 1.25-3.23 3.16-3.23.9 0 1.8.16 1.8.16v2.28h-1.15c-1.02 0-1.35.61-1.35 1.28v1.59h2.53l-.4 2.75h-2.13V21H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="social-link-footer">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M21.58 7.19c-.23-1.63-1.04-2.81-2.22-3.23C17.65 3.5 12 3.5 12 3.5s-5.65 0-7.36.46c-1.18.42-1.99 1.6-2.22 3.23C2 8.85 2 12 2 12s0 3.15.42 4.81c.23 1.63 1.04 2.81 2.22 3.23C6.35 20.5 12 20.5 12 20.5s5.65 0 7.36-.46c1.18-.42 1.99-1.6 2.22-3.23C22 15.15 22 12 22 12s0-3.15-.42-4.81zM9.5 15.56V8.44L15.42 12 9.5 15.56z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:mx-auto">
              <h4 className="font-heading text-lg text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/team" className="footer-link">Our Team</Link></li>
                <li><Link to="/blog" className="footer-link">Blog</Link></li>
                <li><Link to="/contact" className="footer-link">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="lg:mx-auto">
              <h4 className="font-heading text-lg text-white mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Office 12, Boardman House, 64 Broadway, Stratford, London, E15 1NT</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <a href="mailto:info@stonebridgelegal.co.uk" className="footer-link">info@stonebridgelegal.co.uk</a>
                </li>
              </ul>
            </div>

            {/* Regulated Logo & Info */}
            <div>
              <img src="/img/iaa-logo.jfif" alt="IAA Logo" className="mb-4 h-[100px] w-auto rounded" />
              <p className="text-slate-400 text-sm">
                Stonebridge Legal Solutions Limited is authorised and regulated by the Immigration Advice Authority (IAA), Registration No: F202208988.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-700 text-center sm:text-left sm:flex sm:justify-between text-slate-400 text-sm pb-4">
            <p>&copy; {currentYear} Stonebridge Legal. All Rights Reserved.</p>
            <div className="mt-4 sm:mt-0 space-x-6">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Social Icons */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="flex flex-col gap-4">
          <a href="https://wa.me/+447988138221" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform bg-[#25D366]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.451-4.437-9.884-9.888-9.884-5.452 0-9.885 4.434-9.888 9.884.001 2.228.651 4.39 1.849 6.22l-1.072 3.912 3.912-1.074z" /></svg>
          </a>
          <a href="https://facebook.com/stonebridgelegalsolution" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform bg-[#1877F2]">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
        </div>
      </div>

      {/* Cookie Banner */}
      {showCookie && (
        <div className="fixed bottom-6 left-6 right-6 lg:left-12 lg:right-auto lg:max-w-md bg-white p-6 shadow-soft-3 border-l-4 border-primary z-[100] animate-fadeIn">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-[#87550D10] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-2xl">🍪</span>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-gray-900 mb-2">Cookie Notice</h4>
              <p className="font-body text-sm text-gray-600 leading-relaxed mb-5">
                We use cookies to enhance your browsing experience and analyze our site traffic.
              </p>
              <div className="flex items-center gap-4">
                <button onClick={acceptCookies} className="bg-primary text-white px-6 py-3 text-[11px] font-heading font-bold uppercase tracking-[2px] hover:bg-black transition-all">Accept All</button>
                <button onClick={() => setShowCookie(false)} className="text-gray-400 text-[11px] font-heading font-bold uppercase tracking-[2px] hover:text-primary transition-all">Decline</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;