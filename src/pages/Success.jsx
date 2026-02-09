import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link, useLocation } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const { bookingDetails } = location.state || {};

    if (!bookingDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Link to="/" className="text-primary underline">Go Back to Home</Link>
            </div>
        );
    }

    return (
        <main className="bg-slate-50 min-h-screen font-body">
            {/* প্রিন্টের সময় Navbar হাইড করার জন্য 'no-print' ক্লাস */}
            <div className="no-print">
                <Navbar />
            </div>
            
            <div className="pt-48 pb-20 px-4">
                {/* এই মেইন কার্ডটি প্রিন্ট হবে */}
                <div id="printable-card" className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    
                    {/* সাকসেস হেডার */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center text-white relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <i className="fas fa-gavel text-8xl rotate-12"></i>
                        </div>
                        <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white/20">
                            <i className="fas fa-check text-3xl"></i>
                        </div>
                        <h1 className="font-heading text-3xl font-bold mb-2">Appointment Scheduled!</h1>
                        <p className="text-slate-300">Your consultation has been confirmed. Please save this for your record.</p>
                    </div>

                    {/* বুকিং ডিটেইলস */}
                    <div className="p-8 md:p-12">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="h-2 w-8 bg-primary rounded-full no-print"></span>
                            Booking Summary
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Client Name</p>
                                    <p className="text-lg font-semibold text-slate-700">{bookingDetails.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Email Address</p>
                                    <p className="text-slate-600">{bookingDetails.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Service Type</p>
                                    <p className="text-primary font-bold">{bookingDetails.service}</p>
                                </div>
                            </div>

                            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white print:border-slate-200">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary border border-slate-100">
                                        <i className="far fa-calendar-alt"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Appointment Date</p>
                                        <p className="text-lg font-bold text-slate-800">{bookingDetails.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-primary border border-slate-100">
                                        <i className="far fa-clock"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Start Time</p>
                                        <p className="text-lg font-bold text-slate-800">{bookingDetails.time}</p>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-slate-200 mt-2">
                                    <p className="text-[10px] text-slate-400 italic font-medium tracking-wide text-center">Consultation Duration: 30 Minutes</p>
                                </div>
                            </div>
                        </div>

                        {/* প্রিন্টের সময় এই বাটনগুলো হাইড থাকবে */}
                        <div className="mt-12 space-y-6 no-print">
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-sm text-amber-900">
                                <b>Next Steps:</b> Our team will contact you via email shortly with the meeting link.
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button 
                                    onClick={() => window.print()} 
                                    className="flex-1 bg-white border-2 border-slate-200 text-slate-700 py-3 px-6 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <i className="fas fa-print text-primary"></i> Print Summary
                                </button>
                                <Link to="/" className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all text-center flex items-center justify-center gap-2">
                                    <i className="fas fa-home"></i> Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           

            {/* --- এই স্টাইলটুকু প্রিন্টের কাজটা করবে --- */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0 !important; }
                    .pt-32 { padding-top: 0 !important; }
                    .pb-20 { padding-bottom: 0 !important; }
                    .shadow-xl { shadow: none !important; border: 1px solid #eee !important; }
                    .max-w-3xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
                    .rounded-3xl { border-radius: 0 !important; }
                }
            `}} />
        </main>
    );
};

export default Success;