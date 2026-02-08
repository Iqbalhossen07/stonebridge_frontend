import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import AOS from 'aos';

const Login = () => {

  useEffect(() => {
  AOS.init({ duration: 800 });
  AOS.refresh(); // এটি এলিমেন্টটি হারিয়ে যাওয়া রোধ করবে
}, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await axios.post(
            'http://localhost:5000/api/admin/login', 
            { email, password },
            { withCredentials: true } // এটি কুকি সেভ করতে সাহায্য করবে
        );
        
        if (res.data.success) {
            Swal.fire('Success', 'Login Successful', 'success');
            navigate('/admin/dashboard');
        }
    } catch (error) {
        Swal.fire('Error', 'Invalid credentials', 'error');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4 antialiased font-body mt-24" 
         style={{ background: 'linear-gradient(135deg, #fefce8 0%, #ffe9c4 50%, #d8b48f 100%)' }}>
      
      <div className="w-full max-w-md" data-aos="zoom-in">
        <div className="bg-white md:bg-white/85 md:backdrop-blur-[15px] p-8 md:p-12 rounded-[40px] shadow-soft-3 text-center border border-white/30">
          
          {/* লোগো */}
          <img src="/img/logo.png" alt="Stonebridge Legal Logo" className="w-40 mx-auto mb-8" />
          
          <h2 className="font-heading text-3xl font-bold mb-3 text-slate-900 leading-tight">
            Sign In to Your Account
          </h2>
          <p className="text-slate-500 mb-10 text-sm font-medium tracking-wide">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleLogin} className="space-y-8 text-left">
            {/* ইমেইল ইনপুট */}
            <div className="relative group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-1 ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="admin@stonebridge.com"
                  className="w-full py-3 bg-transparent border-b-2 border-primary/20 focus:border-primary outline-none transition-all text-slate-700 font-bold placeholder-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fas fa-envelope absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"></i>
              </div>
            </div>

            {/* পাসওয়ার্ড ইনপুট */}
            <div className="relative group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-1 ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full py-3 bg-transparent border-b-2 border-primary/20 focus:border-primary outline-none transition-all text-slate-700 font-bold placeholder-slate-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i 
                  onClick={() => setShowPassword(!showPassword)}
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-primary transition-colors`}
                ></i>
              </div>
            </div>

            {/* সাইন ইন বাটন */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-full font-black text-white text-[12px] uppercase tracking-[3px] transition-all active:scale-95 shadow-xl shadow-primary/30 disabled:bg-slate-400"
                style={{ background: 'linear-gradient(45deg, #a17b3f, #87550D)' }}
              >
                {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Stonebridge Legal Solutions &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;