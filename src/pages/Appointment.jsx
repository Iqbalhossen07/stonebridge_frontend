import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Appointment = () => {
    const navigate = useNavigate();
    const recaptchaRef = useRef(null);
    const [subServices, setSubServices] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [preview, setPreview] = useState(null);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '',
        service: '', date: '', time: '', message: '', receipt: null
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://stonebridge-api.onrender.com/api/appointment/sub-services'); 
                if (response.data.success) {
                    setSubServices(response.data.data);
                }
            } catch (err) {
                console.error("❌ Error loading services:", err.response || err);
            }
        };
        fetchServices();
    }, []);

    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;
        if (!selectedDate) return;

        const dateObj = new Date(selectedDate);
        const dayIndex = dateObj.getDay(); 

        if (dayIndex === 0 || dayIndex === 6) {
            Swal.fire({
                icon: 'error',
                title: 'Weekend Closed',
                text: 'No available slots for Saturday and Sunday. Please choose a weekday.',
                confirmButtonColor: '#87550D'
            });
            e.target.value = '';
            setAvailableSlots([]);
            setFormData({ ...formData, date: '', time: '' });
            return;
        }

        setFormData({ ...formData, date: selectedDate, time: '' });
        setLoadingSlots(true);

        try {
            const res = await axios.post('https://stonebridge-api.onrender.com/api/time-slots/check-available', { date: selectedDate });
            if (res.data.success) {
                setAvailableSlots(res.data.slots);
            } else {
                setAvailableSlots([]);
                Swal.fire('Notice', res.data.message, 'info');
            }
        } catch (err) {
            console.error("❌ Error fetching slots:", err);
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

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            return Swal.fire('Error', 'Please fill in Name, Email and Phone!', 'error');
        }
        if (!formData.receipt) {
            return Swal.fire('Error', 'Please upload your payment receipt!', 'error');
        }
        if (!captchaToken) {
            return Swal.fire('Error', 'Please complete the Captcha!', 'error');
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('service', formData.service);
        data.append('date', formData.date);
        data.append('time', formData.time);
        data.append('message', formData.message);
        data.append('receipt', formData.receipt);
        data.append('duration_time', '30 Minutes');

      try {
            Swal.fire({ title: 'Processing...', didOpen: () => Swal.showLoading() });
            
            const res = await axios.post('https://stonebridge-api.onrender.com/api/bookings/create', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                // সাকসেস মেসেজ দেখানো
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Appointment booked successfully.',
                    timer: 1500,
                    showConfirmButton: false
                });

                // ১. ডাটাগুলো একটি অবজেক্টে নিয়ে রাখা রিডাইরেক্ট করার জন্য
                const details = {
                    name: formData.name,
                    email: formData.email,
                    service: formData.service,
                    date: formData.date,
                    time: formData.time
                };

                // ২. ফর্ম রিসেট করা
                setFormData({ name: '', email: '', phone: '', address: '', service: '', date: '', time: '', message: '', receipt: null });
                setPreview(null);

                // ৩. ২ সেকেন্ড পর সাকসেস পেইজে পাঠানো (ডিটেইলস সহ)
                setTimeout(() => {
                    navigate('/booking-success', { state: { bookingDetails: details } });
                }, 1500);
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', err.response?.data?.message || 'Something went wrong!', 'error');
        }
    };

    return (
        <main className="bg-slate-50 font-body text-slate-700 antialiased">
            <Navbar />
            
            <section className="relative pt-36 md:pt-52 pb-8 md:pb-12 bg-cover bg-center min-h-[200px] flex items-center justify-center mb-12" 
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1600&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center text-white">
                    <div className="space-y-4">
                        <h1 className="font-heading text-2xl md:text-4xl">Appointment</h1>
                        <p className="text-sm font-semibold text-slate-200">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link> &rsaquo; 
                            <span className="text-white ml-1">Appointment</span>
                        </p>
                        <p className="max-w-2xl mx-auto text-slate-300">
                            The passionate minds dedicated to bringing your vision to life with creativity and precision.
                        </p>
                    </div>
                </div>
            </section>

            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
                <div className="bg-white w-full max-w-6xl rounded-2xl shadow-soft-2 p-6 sm:p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Schedule Your Consultation</h1>
                        <p className="mt-2 text-slate-600">Book your appointment with our legal experts in just a few steps.</p>
                        <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
                    </div>

                    <form className="space-y-10">
                        {/* Step 1: Contact Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                                <h2 className="font-heading text-xl font-bold text-slate-800">Your Contact Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <textarea 
                                rows="3" 
                                placeholder="Type your address..." 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Step 2: Appointment Details */}
                        <div className="space-y-6 border-t pt-8">
                            <div className="flex items-center gap-4">
                                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                                <h2 className="font-heading text-xl font-bold text-slate-800">Appointment Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <select 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary" 
                                    value={formData.service}
                                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                                >
                                    <option value="">Select Service</option>
                                    {subServices.map(sub => (
                                        <option key={sub._id} value={sub.sub_service_title}>{sub.sub_service_title}</option>
                                    ))}
                                </select>
                                <input type="text" value="30 Mins (80 GBP)" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-slate-50 font-semibold" readOnly />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary" onChange={handleDateChange} />
                                <select 
                                    className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary ${formData.time ? 'border-primary' : ''}`}
                                    value={formData.time} 
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })} 
                                    disabled={availableSlots.length === 0}
                                >
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

                        <div className="flex justify-center border-t pt-8">
                            <ReCAPTCHA sitekey="6LedVUIsAAAAAHqBT66Ew1-vPB5kH6HRgzWJRy9G" onChange={onCaptchaChange} />
                        </div>

                        <div className="text-center">
                            <button 
                                type="button" 
                                onClick={handleSubmit}
                                disabled={!captchaToken} 
                                className={`text-center px-6 py-3 rounded-md font-semibold text-center transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-0.5  bg-gradient-to-br from-primary to-amber-700 text-white hover:bg-none hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary ${!captchaToken ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                            >
                                Book Your Appointment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Appointment;