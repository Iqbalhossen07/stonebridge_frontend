import React from 'react';

const CoreValues = () => {
  const values = [
    {
      id: 1,
      title: "Integrity First",
      desc: "Upholding the highest ethical standards in every action we take and every piece of advice we give.",
      delay: 200,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.153.36c-1.853 0-3.663-.7-5.018-1.928a5.991 5.991 0 01-2.249-4.17c.013-.33.028-.66.046-1.008.18-2.132 1.5-4.013 3.42-4.952.51-.234 1.04-.397 1.58-.492zM6.25 4.97A48.416 48.416 0 0112 4.5c2.291 0 4.545.16 6.75.47m-13.5 0c-1.01.143-2.01.317-3 .52m3-.52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.153.36c1.853 0 3.663-.7 5.018-1.928a5.991 5.991 0 002.249-4.17c-.013-.33-.028-.66-.046-1.008-.18-2.132-1.5-4.013-3.42-4.952a5.13 5.13 0 00-1.58-.492z" />
      )
    },
    {
      id: 2,
      title: "Client-Centric Approach",
      desc: "Your goals are our priority. We offer personalized attention and solutions tailored to you.",
      delay: 300,
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3 3 0 006 12v-1.5a3 3 0 00-3-3H2.25m9.007.527a3 3 0 00-3.34-2.174 3 3 0 00-3.34 2.174m0 0a3 3 0 003.34 2.173 3 3 0 003.34-2.173m-7.5-2.964A3 3 0 006 6v-1.5a3 3 0 00-3-3H2.25m13.5 6.073V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.75m13.5 6.073a3 3 0 01-3 3v1.5a3 3 0 01-3 3h-3a3 3 0 01-3-3v-1.5a3 3 0 01-3-3m13.5 6.073h3.75a3 3 0 003-3v-1.5a3 3 0 00-3-3h-3.75m-13.5 6.073H3.375a3 3 0 01-3-3v-1.5a3 3 0 013-3h3.75" />
    },
    {
      id: 3,
      title: "Unmatched Expertise",
      desc: "Leveraging deep legal knowledge and experience to navigate complex challenges effectively.",
      delay: 400,
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    },
    {
      id: 4,
      title: "Absolute Confidentiality",
      desc: "Your sensitive information is protected with the strictest standards of privacy and discretion.",
      delay: 500,
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    },
    {
      id: 5,
      title: "Diligent Advocacy",
      desc: "We are your dedicated and tireless advocates, committed to achieving the best possible outcome for you.",
      delay: 600,
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    },
    {
      id: 6,
      title: "Communication",
      desc: "Keeping you informed at every stage with clear, honest, and timely updates about your case.",
      delay: 700,
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m2.25 1.5a4.5 4.5 0 01-4.5 4.5H5.25a4.5 4.5 0 01-4.5-4.5V8.25a4.5 4.5 0 014.5-4.5h3.75a4.5 4.5 0 014.5 4.5v.75" />
    }
  ];

  return (
    <section id="operations-optimize" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 leading-tight" data-aos="fade-up">
            Our Core Values
          </h2>
          <p className="text-sm md:text-lg text-slate-600 mt-4" data-aos="fade-up" data-aos-delay="100">
            These principles guide every case we handle and every client we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((item) => (
            <div 
              key={item.id}
              className="group bg-white p-8 rounded-2xl shadow-md border border-slate-100 flex items-start gap-6 
                         /* --- স্মুথ জুম লজিক --- */
                         transition-all duration-500 ease-in-out transform-gpu 
                         hover:scale-[1.03] hover:shadow-lg hover:-translate-y-1 
                         will-change-transform backface-hidden cursor-pointer"
            >
              <div className="h-16 w-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 
                              transition-transform duration-500 group-hover:scale-110">
                <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  {item.icon}
                </svg>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-xl text-slate-800 mb-2 transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;