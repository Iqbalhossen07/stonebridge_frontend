import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCaptchaChange = (value) => {
    setIsCaptchaSolved(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCaptchaSolved) {
      alert("Please solve the reCAPTCHA first.");
      return;
    }
    setLoading(true);
    // এখানে আপনার API কল বা logics.php তে ডাটা পাঠানোর লজিক হবে
    console.log("Form Data Submitted:", formData);
    setTimeout(() => {
      setLoading(false);
      alert("Message Sent Successfully!");
    }, 2000);
  };

  return (
    <div data-aos="fade-up" className="border border-slate-200 rounded-lg p-6 shadow-sm bg-white">
      <h3 className="font-heading text-3xl text-slate-800 mb-4">Send us a message</h3>
      <p className="text-slate-600 mb-6">Our team will get back to you within 24 hours.</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
          <select 
            name="subject" 
            required 
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-primary focus:border-primary sm:text-sm outline-none"
          >
            <option value="" disabled selected>Select the topic of your query...</option>
            <option value="PSW">PSW (Post-Study Work)</option>
            <option value="Asylum">Asylum</option>
            <option value="Self-Sponsorship">Self-Sponsorship</option>
            <option value="General Query">General Query</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" name="full_name" required 
            onChange={handleInputChange}
            placeholder="Your Full Name" 
            className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-primary focus:border-primary outline-none" 
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input 
            type="email" name="email" required 
            onChange={handleInputChange}
            placeholder="Your Email Address" 
            className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-primary focus:border-primary outline-none" 
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input 
            type="tel" name="phone" 
            onChange={handleInputChange}
            placeholder="Your Phone Number (Optional)" 
            className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-primary focus:border-primary outline-none" 
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea 
            name="message" rows="5" required 
            onChange={handleInputChange}
            placeholder="Your Message" 
            className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:ring-primary focus:border-primary outline-none"
          ></textarea>
        </div>

        {/* reCAPTCHA */}
        <div className="mb-6">
          <ReCAPTCHA
            sitekey="6LedVUIsAAAAAHqBT66Ew1-vPB5kH6HRgzWJRy9G"
            onChange={onCaptchaChange}
          />
        </div>

        <button 
          type="submit"
          disabled={!isCaptchaSolved || loading}
          className={`w-full md:w-auto font-semibold transition-all duration-300 shadow-lg bg-gradient-to-br from-primary to-amber-700 text-white px-6 py-3 rounded-md ${
            (!isCaptchaSolved || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-0.5 active:scale-95'
          }`}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;