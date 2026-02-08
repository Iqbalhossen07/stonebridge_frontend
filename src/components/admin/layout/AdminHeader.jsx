import React from 'react';

const AdminHeader = ({ name, image }) => {
  // ছবির সোর্স হ্যান্ডেল করার জন্য লজিক
  // যদি ক্লাউডিনারি ইউআরএল হয় তবে সেটিই দেখাবে, নতুবা লোকাল পাথ বা ডিফল্ট ইমেজ
  const profileImg = image && (image.startsWith('http') 
    ? image 
    : `/my_profile/${image}`);

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm font-body">
      
      {/* বাম পাশে কন্টেন্ট */}
      <div className="flex items-center gap-3">
        {/* মোবাইল ডিভাইসে ছোট লোগো */}
        <img src="/img/logo.png" alt="Logo" className="w-10 lg:hidden" />
        <div className="hidden lg:block">
          <h1 className="font-heading text-lg font-black text-slate-800 leading-tight tracking-tight">
            Welcome back, <span className="text-primary">{name?.split(' ')[0] || 'Admin'}!</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Admin Dashboard Control</p>
        </div>
      </div>

      {/* ডান পাশে প্রোফাইল এবং স্ট্যাটাস */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-black text-slate-800 leading-none mb-1">
            {name || 'Stonebridge Admin'}
          </p>
          <div className="flex items-center justify-end gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-green-600 font-black uppercase tracking-widest italic">Active Now</span>
          </div>
        </div>

        {/* প্রোফাইল ইমেজ ড্রপডাউন (ঐচ্ছিক) */}
        <div className="relative group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl border-2 border-slate-50 shadow-soft overflow-hidden transition-all group-hover:scale-105 group-hover:shadow-lg">
            <img 
              src={profileImg || '/img/admin.png'} 
              className="w-full h-full object-cover" 
              alt="Admin Profile" 
              onError={(e) => { e.target.src = '/img/admin.png'; }} // ইমেজ লোড না হলে ডিফল্ট
            />
          </div>
          {/* অনলাইন ডট */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;