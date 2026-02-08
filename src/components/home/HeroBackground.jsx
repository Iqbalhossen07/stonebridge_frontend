import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* ১. মেইন রেডিয়াল গ্রেডিয়েন্ট লেয়ার */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 0%, #ffffff 0%, #fdfbf7 60%, #f4f1ea 100%)"
        }}
      />

      {/* ২. প্রিমিয়াম গ্রিড প্যাটার্ন লেয়ার (মাস্কিং সহ) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 z-0 opacity-60 w-full h-full"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxkZWZzPjxwYXR0ZXJuIGlkPSdncmlkJyB3aWR0aD0nMzAnIGhlaWdodD0nMzAnIHBhdHRlcm5Vbml0cz0ndXNlclNwYWNlT25Vc2UnPjxwYXRoIGQ9J00gMzAgMCBMIDAgMCBMIDAgMzAnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2UwZTBlMCcgc3Ryb2tlLXdpZHRoPScxJy8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2dyaWQpJy8+PC9zdmc+')`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />
    </>
  );
};

export default HeroBackground;