import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ member, delay }) => {
  return (
    <div className="team-card group relative" data-aos="fade-up" data-aos-delay={delay}>
      <div className="team-card-inner bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
        {/* Image Section */}
        <div className="relative overflow-hidden h-72">
          <img 
            src="https://images.unsplash.com/photo-1562788869-4ed32648eb72?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt={member.t_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>

        {/* Info Section */}
        <div className="p-5 text-center">
          <Link to={`/team-details/${member.id}`} className="font-heading text-xl text-slate-800 hover:text-primary transition-colors block">
            {member.t_name}
          </Link>
          <p className="text-primary text-sm mt-1 font-medium italic">{member.t_designation}</p>
          <Link 
            to={`/team-details/${member.id}`}
            className="inline-block mt-3 font-semibold text-sm text-primary hover:underline"
          >
            View Profile &rarr;
          </Link>
        </div>
      </div>

      {/* Social Panel - Appears on Hover */}
      <div className="social-panel absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <a href={member.t_facebook} target="_blank" rel="noreferrer" className="bg-white p-2 rounded-full text-blue-600 shadow-md hover:bg-primary hover:text-white transition-all">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-0.326-0.043-1.557-0.14-2.857-0.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4V13.5z"></path>
          </svg>
        </a>
        <a href={member.t_linkedin} target="_blank" rel="noreferrer" className="bg-white p-2 rounded-full text-blue-700 shadow-md hover:bg-primary hover:text-white transition-all">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.43 12.9,11.2V10.13H10.13V18.5H12.9V13.57C12.9,12.8 13.54,12.17 14.31,12.17C15.08,12.17 15.72,12.17 15.72,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 8,5.19 6.88,5.19C5.76,5.19 5.19,6 5.19,6.88C5.19,7.77 5.76,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TeamCard;