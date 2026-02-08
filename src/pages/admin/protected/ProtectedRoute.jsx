import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // ব্যাকএন্ডে চেক-অথ রাউটে রিকোয়েস্ট পাঠানো
        const res = await axios.get('https://stonebridge-api.onrender.com/api/admin/check-auth', {
          withCredentials: true
        });
        
        if (res.data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  // যতক্ষণ ভেরিফিকেশন চলছে ততক্ষণ একটি সিম্পল লোডার
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // যদি ভেরিফাই না হয় তবে লগইন পেজে পাঠিয়ে দেবে
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;