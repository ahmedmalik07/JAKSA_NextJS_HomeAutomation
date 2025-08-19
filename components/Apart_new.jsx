import React from 'react';

import { assets } from '../assets/assets';
import Image from 'next/image';

const features = [
  {
    number: '01',
    title: 'Made in Pakistan',
    desc: "Every Jaksa product is locally engineered and assembled with precision. We're proud to contribute to Pakistan's tech innovation with quality that competes globally.",
  },
  {
    number: '02',
    title: 'Elegant, Functional Design',
    desc: 'Our products combine clean aesthetics with practical functionality — built to blend seamlessly into your space without compromising performance.',
  },
  {
    number: '03',
    title: 'Covered with Confidence',
    desc: 'Enjoy reliable performance with our 1-year warranty. In case of any faults, we've got you covered with repair or replacement support — no extra hassle.',
  },
];

const Apart = () => {
  return (
    <section className='w-full flex flex-col items-center pt-16 pb-14 bg-gradient-to-br from-slate-50 to-blue-50'>
      <div className='mb-10 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-[#1A3578] mb-3'>
          What Sets Us Apart?
        </h2>
        <p className='text-[#4B6584] text-base md:text-lg max-w-2xl mx-auto mb-2 font-normal'>
          At Jaksa, we believe technology should be simple, elegant, and
          life-enhancing. Here's what makes us stand out in the smart home
          industry
        </p>
        <div className='w-12 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-2'>
        {features.map((feature, idx) => (
          <div
            key={idx}
            className='bg-gradient-to-br from-white to-slate-50 rounded-[24px] shadow-[0_8px_32px_rgba(44,62,80,0.12)] p-8 flex flex-col items-center text-center transition-all duration-700 ease-out cursor-pointer group relative overflow-hidden hover:shadow-[0_20px_60px_rgba(26,53,120,0.25)] hover:scale-[1.08] hover:-translate-y-2 border border-slate-100 hover:border-[#5A7BD8]/30'
            style={{
              minWidth: '240px',
              minHeight: '180px',
              animationDelay: `${idx * 0.15}s`,
            }}
            tabIndex={0}
            aria-label={feature.title}
          >
            {/* Animated background gradient on hover */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#5A7BD8]/5 via-[#1A3578]/5 to-[#A7B8D8]/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-[24px]'></div>
            
            {/* Floating orb effect */}
            <div className='absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[#5A7BD8]/20 to-[#1A3578]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl'></div>
            
            <span
              className='text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-[#5A7BD8] to-[#1A3578] bg-clip-text text-transparent mb-4 drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl relative z-10'
              style={{ letterSpacing: '2px' }}
            >
              {feature.number}
            </span>
            
            <h3 className='text-lg md:text-xl font-bold text-[#1A3578] mb-3 transition-all duration-500 group-hover:text-[#2d4aa3] group-hover:scale-105 relative z-10'>
              {feature.title}
            </h3>
            
            <p className='text-[#4B6584] text-sm md:text-base leading-relaxed font-normal transition-all duration-500 group-hover:text-[#2d3748] group-hover:scale-[1.02] relative z-10'>
              {feature.desc}
            </p>
            
            {/* Bottom accent line */}
            <div className='absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-[#5A7BD8] to-[#1A3578] transition-all duration-500 group-hover:w-3/4 transform -translate-x-1/2 rounded-full'></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Apart;
