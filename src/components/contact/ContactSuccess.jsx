import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Clock } from 'lucide-react';
import AOS from 'aos';

const ContactSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Valued Client' };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // যদি কেউ সরাসরি এই লিঙ্কে আসে (ডাটা ছাড়া), তবে তাকে হোমপেইজে পাঠিয়ে দিবে
    if (!location.state) {
      setTimeout(() => navigate('/'), 5000);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-body mt-16">
      <div 
        data-aos="zoom-in" 
        className="max-w-2xl w-full bg-white rounded-[40px] shadow-soft-2 p-8 md:p-16 text-center border border-slate-100 relative overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-amber-600 to-primary"></div>
        
        {/* Success Icon with Animation */}
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle size={48} strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
          Message Sent Successfully!
        </h1>
        
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          Thank you, <span className="text-slate-900 font-bold">{name}</span>. 
          We have received your query. A confirmation email has been sent to your inbox.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-3">
              <Clock size={20} />
            </div>
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">Response Time</h4>
            <p className="text-xs text-slate-500 font-medium">Within 24 working hours</p>
          </div>
          
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-3">
              <Mail size={20} />
            </div>
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider">Check Email</h4>
            <p className="text-xs text-slate-500 font-medium">Please check your spam folder too</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[2px] hover:bg-primary transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Go to Home
          </Link>
          <Link 
            to="/services" 
            className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-[11px] uppercase tracking-[2px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
          >
            Explore Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccess;