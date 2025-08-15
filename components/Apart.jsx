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
    desc: 'Enjoy reliable performance with our 1-year warranty. In case of any faults, we’ve got you covered with repair or replacement support — no extra hassle.',
  },
];

const Apart = () => {
  return (
    <section className='w-full flex flex-col items-center pt-16 pb-14 bg-white'>
      <div className='mb-10 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-[#1A3578] mb-3'>
          What Sets Us Apart?
        </h2>
        <p className='text-[#4B6584] text-base md:text-lg max-w-2xl mx-auto mb-2 font-normal'>
          At Jaksa, we believe technology should be simple, elegant, and
          life-enhancing. Here’s what makes us stand out in the smart home
          industry
        </p>
        <div className='w-12 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-2'>
        {features.map((feature, idx) => (
          <div
            key={idx}
            className='bg-[#F4F7FB] rounded-[24px] shadow-[0_2px_16px_rgba(44,62,80,0.10)] p-8 flex flex-col items-center text-center transition-all duration-500 cursor-pointer group relative overflow-hidden animate-fade-in-up hover:scale-[1.07] hover:shadow-2xl hover:z-10'
            style={{
              minWidth: '240px',
              minHeight: '180px',
              animationDelay: `${idx * 0.1}s`,
            }}
            tabIndex={0}
            aria-label={feature.title}
          >
            <span
              className='text-4xl md:text-5xl font-extrabold text-[#5A7BD8] mb-2 drop-shadow-lg transition group-hover:text-[#1A3578] group-focus:text-[#1A3578]'
              style={{ letterSpacing: '2px' }}
            >
              {feature.number}
            </span>
            <h3 className='text-lg md:text-xl font-bold text-[#1A3578] mb-2 transition group-hover:text-[#5A7BD8] group-focus:text-[#5A7BD8]'>
              {feature.title}
            </h3>
            <p className='text-[#4B6584] text-sm md:text-base leading-relaxed font-normal transition group-hover:text-[#1A3578] group-focus:text-[#1A3578]'>
              {feature.desc}
            </p>
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition bg-[#5A7BD8]/10 rounded-[24px] pointer-events-none'></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Apart;
