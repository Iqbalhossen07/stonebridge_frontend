import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ServiceContent = ({ title, description, serviceFound }) => {
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // ডেট চেঞ্জ হলে টাইম স্লট ফেচ করার হ্যান্ডলার
  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setLoadingSlots(true);
    // এখানে আপনার API কল (fetch_available_slots.php) হবে
    console.log("Fetching slots for:", selectedDate);
    // ডামি স্লট সিমুলেশন
    setTimeout(() => {
      setTimeSlots(["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]);
      setLoadingSlots(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* সার্ভিস ডেসক্রিপশন */}
        <div className="prose prose-lg max-w-6xl mx-auto shadow-2xl p-6 md:p-16 rounded-2xl mb-24 bg-white border border-slate-50">
          {serviceFound ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <p className="text-center text-red-500 font-bold">{description}</p>
          )}
        </div>

        {/* অ্যাপয়েন্টমেন্ট ফর্ম */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Schedule Your Consultation</h2>
            <p className="mt-2 text-slate-600">Book your appointment with our legal experts in just a few steps.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <form className="space-y-10">
            {/* Step 1: Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                <h3 className="font-heading text-xl font-bold text-slate-800">Your Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary outline-none" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary outline-none" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary outline-none" placeholder="+44xxxxxxxxx" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <textarea rows="2" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary outline-none" placeholder="Your address..."></textarea>
              </div>
            </div>

            {/* Step 2: Appointment Details */}
            <div className="space-y-6 border-t pt-8">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                <h3 className="font-heading text-xl font-bold text-slate-800">Appointment Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Service</label>
                  <input type="text" value={title} readOnly className="w-full bg-slate-50 border border-gray-300 rounded-md py-2 px-3 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                  <input type="text" value="30 Mins (80 GBP)" readOnly className="w-full bg-slate-50 border border-gray-300 rounded-md py-2 px-3 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                  <input type="date" onChange={handleDateChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Time Slot</label>
                  <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-primary outline-none" required>
                    <option value="">{loadingSlots ? "Loading slots..." : "Select time"}</option>
                    {timeSlots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="space-y-6 border-t pt-8">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                <h3 className="font-heading text-xl font-bold text-slate-800">Case Details & Payment</h3>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
                <p className="text-sm text-amber-800 font-medium">A payment of £96 (£80 + VAT) is required to confirm. This will be adjusted against your final fee.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="YOUR_CLIO_LINK" target="_blank" rel="noreferrer" className="flex items-center justify-center bg-primary text-white py-3 px-4 rounded-md font-bold hover:bg-primary/90 transition-all">Proceed to Payment</a>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload Receipt</label>
                  <input type="file" className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:ring-primary outline-none" required />
                </div>
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="6LedVUIsAAAAAHqBT66Ew1-vPB5kH6HRgzWJRy9G"
                onChange={(val) => setCaptchaSolved(!!val)}
              />
            </div>

            <div className="text-center">
              <button 
                type="submit" 
                disabled={!captchaSolved}
                className={`px-8 py-3 rounded-md font-bold text-white transition-all shadow-lg ${captchaSolved ? 'bg-gradient-to-br from-primary to-amber-700 hover:scale-105' : 'bg-slate-300 cursor-not-allowed opacity-60'}`}
              >
                Book Your Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;