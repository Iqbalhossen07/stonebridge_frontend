import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";

const ServiceContent = ({ title, description, image, serviceFound }) => {
  const navigate = useNavigate();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '',
    service: title, 
    date: '', time: '', message: '', receipt: null
  });

  // টাইটেল প্রপস থেকে অটো সার্ভিস ফিল্ড সেট করা
  useEffect(() => {
    setFormData(prev => ({ ...prev, service: title }));
  }, [title]);

  // তারিখ পরিবর্তন ও স্লট চেক (উইকেন্ড লকসহ)
  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;

    const dateObj = new Date(selectedDate);
    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weekend Closed',
        text: 'No available slots for Saturday and Sunday. Please choose a weekday.',
        confirmButtonColor: '#87550D'
      });
      e.target.value = '';
      setAvailableSlots([]);
      return;
    }

    setFormData({ ...formData, date: selectedDate, time: '' });
    setLoadingSlots(true);
    try {
      const res = await axios.post('https://stonebridge-api.onrender.com/api/time-slots/check-available', { date: selectedDate });
      if (res.data.success) {
        setAvailableSlots(res.data.slots);
      }
    } catch (err) {
      console.error("❌ Error fetching slots");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, receipt: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) return Swal.fire('Error', 'Please complete the Captcha!', 'error');
    if (!formData.receipt) return Swal.fire('Error', 'Please upload payment receipt!', 'error');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('duration_time', '30 Minutes');

    try {
      Swal.fire({ title: 'Processing...', didOpen: () => Swal.showLoading() });
      const res = await axios.post('https://stonebridge-api.onrender.com/api/bookings/create', data);
      if (res.data.success) {
        Swal.fire({ icon: 'success', title: 'Success!', text: 'Appointment booked successfully.', timer: 1500, showConfirmButton: false });
        navigate('/booking-success', { state: { bookingDetails: formData } });
      }
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <section className="py-24 bg-slate-50 font-body antialiased">
      <div className="container mx-auto px-6">
        
        {/* সার্ভিস ডেসক্রিপশন কার্ড */}
        <div className="max-w-6xl mx-auto bg-white shadow-soft-2 rounded-2xl mb-20 overflow-hidden border border-slate-100">
          {serviceFound && image && (
            <div className="w-full h-[300px] md:h-[450px] overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          )}
          <div className="p-8 md:p-16">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 border-b pb-4 font-heading">{title}</h1>
            <div className="text-slate-700 leading-relaxed text-justify prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>

        {/* অ্যাপয়েন্টমেন্ট ফর্ম (Hurdle-style Design) */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-soft-2 p-6 sm:p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Schedule Your Consultation</h2>
            <p className="mt-2 text-slate-600 italic">Book your appointment for {title} in just a few steps.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <form className="space-y-12">
            {/* Step 1: Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shadow-sm">1</span>
                <h3 className="font-heading text-xl font-bold text-slate-800">Your Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input type="text" placeholder="Full Name" className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input type="email" placeholder="Email Address" className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input type="tel" placeholder="Phone Number" className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <textarea rows="2" placeholder="Your address..." className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}></textarea>
            </div>

            {/* Step 2: Appointment Details */}
            <div className="space-y-6 border-t pt-10">
              <div className="flex items-center gap-4">
                <span className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shadow-sm">2</span>
                <h3 className="font-heading text-xl font-bold text-slate-800">Appointment Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Service Selected</label>
                  <input type="text" value={formData.service} readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-500 cursor-not-allowed outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Session Duration</label>
                  <input type="text" value="30 Mins (80 GBP)" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-500 cursor-not-allowed outline-none shadow-sm" />
                </div>
                <input type="date" onChange={handleDateChange} className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none shadow-sm" />
                <select className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold shadow-sm" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} disabled={availableSlots.length === 0}>
                   <option value="">{loadingSlots ? "Loading..." : (availableSlots.length > 0 ? "Select Time Slot" : "Choose a date first")}</option>
                   {availableSlots.map((slot, index) => {
                       const timeValue = typeof slot === 'object' ? slot.time : slot;
                       const isBooked = typeof slot === 'object' ? slot.isBooked : false;
                       return (
                           <option key={index} value={timeValue} disabled={isBooked} className={isBooked ? "text-red-500" : "text-green-600"}>
                               {timeValue} {isBooked ? " (Booked)" : " (Available)"}
                           </option>
                       );
                   })}
                </select>
              </div>
            </div>

            {/* Step 3: Payment */}
            {/* Step 3: Case Details & Payment */}
                        <div className="space-y-6 border-t pt-8">
                            <div className="flex items-center gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                                <h2 className="font-heading text-xl font-bold text-slate-800">Case Details & Payment</h2>
                            </div>
                            <textarea 
                                rows="3" 
                                placeholder="Briefly describe your situation..." 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t pt-8">
                                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg h-full flex items-center">
                                    <p className="text-sm text-amber-800 leading-relaxed">
                                        <i className="fas fa-exclamation-triangle mr-2 text-amber-500"></i>
                                        <b>Please note:</b> A payment of <b>(£80 + vat = £96)</b> is required to confirm your appointment. This amount will be adjusted against your final service fee.
                                    </p>
                                </div>
                                <div>
                                    <a href="https://eu.app.clio.com/link/v2/2/2/7ad0f483d2091d55e0d08d09ceb17f51?hmac=a3c0207ef32adbdba456344be548ea347bcc2e7e5b91cbf3473cae67a64cf15d&origin=qr_code&origin_metadata=ios" target="_blank" rel="noreferrer" 
                                        className="block w-full text-center bg-primary text-white py-4 px-4 rounded-md font-bold hover:shadow-lg transition-all">
                                        <i className="fas fa-credit-card mr-2"></i> Proceed to Payment
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Step 4: Image Upload */}
                        <div className="space-y-6 border-t pt-8">
                            <div className="flex items-center gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">4</span>
                                <h2 className="font-heading text-xl font-bold text-slate-800">Payment Receipt Upload</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                                <div className="flex flex-col">
                                    <input type="file" id="receipt" className="hidden" onChange={handleImageChange} accept="image/*" />
                                    <label htmlFor="receipt" className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-6 cursor-pointer hover:border-primary hover:bg-slate-50 transition-all group min-h-[250px]">
                                        <div className="text-center">
                                            <i className="fas fa-cloud-upload-alt text-3xl text-slate-300 group-hover:text-primary mb-3"></i>
                                            <p className="block text-slate-600 font-bold sm:text-sm">Click to Upload Receipt</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="border-2 border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 relative shadow-inner w-full h-[280px] overflow-hidden group">
                                    {preview ? (
                                        <div className="relative w-full h-full flex items-center justify-center p-2 bg-white">
                                            <img src={preview} alt="Receipt Preview" className="max-w-full max-h-full object-contain" />
                                            <button type="button" onClick={() => {setPreview(null); setFormData({...formData, receipt: null})}} className="absolute top-3 right-3 bg-red-500 text-white h-8 w-8 rounded-full flex items-center justify-center z-20"><i className="fas fa-times text-sm"></i></button>
                                        </div>
                                    ) : (
                                        <div className="text-center p-6">
                                            <i className="fas fa-image text-slate-200 text-4xl mb-2 block"></i>
                                            <p className="text-slate-400 font-bold uppercase text-[10px]">Receipt Preview Box</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

            {/* Step 4: Verification */}
            <div className="flex flex-col items-center gap-8 border-t pt-10">
              <ReCAPTCHA sitekey="6LedVUIsAAAAAHqBT66Ew1-vPB5kH6HRgzWJRy9G" onChange={(token) => setCaptchaToken(token)} />
              <button 
                type="button" 
                onClick={handleSubmit} 
                disabled={!captchaToken} 
                className={`px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary ${captchaToken ? 'bg-slate-900 hover:bg-primary hover:scale-105 active:scale-95' : 'bg-slate-300 cursor-not-allowed opacity-60'}`}
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