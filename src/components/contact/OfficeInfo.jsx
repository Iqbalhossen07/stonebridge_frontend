import React from 'react';

const OfficeCard = ({ city, address, phone, email, flag }) => (
  <div className="border border-slate-200 rounded-lg p-6 shadow-sm hover:bg-slate-50 transition-all duration-300 group">
    <h4 className="font-heading text-xl text-slate-800 mb-4 flex items-center gap-3">
      <img src={flag} alt="Flag" className="h-5 w-auto rounded-sm shadow-sm" />
      <span>{city} Office</span>
    </h4>
    <div className="space-y-4 text-slate-600 text-[15px]">
      <div className="flex gap-3">
        <span className="text-primary mt-1">📍</span>
        <p>{address}</p>
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-primary">📞</span>
        <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a>
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-primary">✉️</span>
        <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
      </div>
    </div>
  </div>
);

const OfficeInfo = () => {
  return (
    <div className="flex flex-col gap-8" data-aos="fade-up" data-aos-delay="100">
      <OfficeCard 
        city="London"
        flag="img/gb.png"
        address="Office 12, 4th Floor, Boardman House, 64 Broadway, Stratford, London, E15 1NT"
        phone="+447988138221"
        email="info@stonebridgelegal.co.uk"
      />
      <OfficeCard 
        city="Birmingham"
        flag="img/gb.png"
        address="Sylhet Business Center, 537a Coventry Road, Birmingham, West Midlands, B10 0LL"
        phone="+447988138221"
        email="info@stonebridgelegal.co.uk"
      />
    </div>
  );
};

export default OfficeInfo;