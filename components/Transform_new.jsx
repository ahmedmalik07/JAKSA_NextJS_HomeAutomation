import React from 'react';
import Image from 'next/image';
import auto from '../assets/jaksa/auto.png';

const steps = [
  {
    number: '01',
    title: 'Buy Smart',
    desc: 'Get future-ready devices built for upgrades and long-term use.',
  },
  {
    number: '02',
    title: 'We Guide You',
    desc: 'After purchase, we reach out to assist with setup tailored to your needs.',
  },
  {
    number: '03',
    title: 'Hassle-Free Installation',
    desc: 'Easy to install and dispatch — just follow our tutorial.',
  },
];

const Transform = () => {
  return (
    <>
      {/* Add extra space after previous content */}
      <div className='w-full h-16 md:h-24' />
      <section className='w-full flex flex-col items-center pt-0 pb-14 bg-gradient-to-br from-slate-50 to-blue-50'>
        {/* Top Section */}
        <div className='mb-10 text-center'>
          {/* Add extra space above the section */}
          <div className='h-10 md:h-16'></div>
          <p className='tracking-[0.5em] text-xs md:text-sm font-semibold text-[#1A3578] mb-2'>
            T R A N S F O R M
          </p>
          <h2 className='text-4xl md:text-5xl font-bold text-[#1A3578] mb-3'>
            Steps to Smarter Home
          </h2>
          <p className='text-[#4B6584] text-base md:text-lg max-w-2xl mx-auto mb-2 font-normal'>
            At Jaksa, we deliver more than just smart devices — we deliver smart
            living.
            <br />
            Here's how our process ensures a seamless experience from start to
            finish.
          </p>
          <div className='w-12 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'></div>
        </div>

        {/* Steps Row */}
        <div className='flex flex-col md:flex-row justify-center items-stretch gap-6 w-full max-w-5xl mb-12 px-2'>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex-1 bg-gradient-to-br from-white to-slate-50 rounded-[24px] shadow-[0_8px_32px_rgba(44,62,80,0.12)] p-8 flex flex-col items-center text-center 
                transition-all duration-700 ease-out cursor-pointer group relative overflow-hidden 
                hover:shadow-[0_20px_60px_rgba(26,53,120,0.25)] hover:scale-[1.08] hover:-translate-y-2
                border border-slate-100 hover:border-[#5A7BD8]/30`}
              style={{
                minWidth: '240px',
                minHeight: '160px',
                animationDelay: `${idx * 0.15}s`,
              }}
              tabIndex={0}
              aria-label={step.title}
            >
              {/* Animated background gradient on hover */}
              <div className='absolute inset-0 bg-gradient-to-br from-[#5A7BD8]/5 via-[#1A3578]/5 to-[#A7B8D8]/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-[24px]'></div>

              {/* Floating orb effect */}
              <div className='absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-[#5A7BD8]/20 to-[#1A3578]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl'></div>

              <span
                className='text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-[#5A7BD8] to-[#1A3578] bg-clip-text text-transparent mb-4 drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl relative z-10'
                style={{ letterSpacing: '2px' }}
              >
                {step.number}
              </span>

              <h3 className='text-lg md:text-xl font-bold text-[#1A3578] mb-3 transition-all duration-500 group-hover:text-[#2d4aa3] group-hover:scale-105 relative z-10'>
                {step.title}
              </h3>

              <p className='text-[#4B6584] text-sm md:text-base leading-relaxed font-normal transition-all duration-500 group-hover:text-[#2d3748] group-hover:scale-[1.02] relative z-10'>
                {step.desc}
              </p>

              {/* Bottom accent line */}
              <div className='absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-[#5A7BD8] to-[#1A3578] transition-all duration-500 group-hover:w-3/4 transform -translate-x-1/2 rounded-full'></div>
            </div>
          ))}
        </div>

        {/* Lower Section (two-panel composition) */}
        <div className='relative grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-8 w-full max-w-6xl mt-4 px-2 items-center'>
          {/* Left photo card with enhanced effects */}
          <div className='relative rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(26,53,120,0.25)] group cursor-pointer transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(26,53,120,0.35)]'>
            <Image
              src={auto}
              alt='Smart devices on a table'
              className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-br from-[#0b1a3a]/60 via-[#1A3578]/40 to-[#5A7BD8]/30 transition-all duration-700 group-hover:from-[#0b1a3a]/50 group-hover:via-[#1A3578]/30 group-hover:to-[#5A7BD8]/20' />

            {/* Floating elements */}
            <div className='absolute top-6 left-6 w-3 h-3 bg-white/30 rounded-full animate-pulse'></div>
            <div
              className='absolute top-12 right-8 w-2 h-2 bg-[#A7B8D8]/50 rounded-full animate-pulse'
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className='absolute bottom-8 left-8 w-4 h-4 bg-[#5A7BD8]/40 rounded-full animate-pulse'
              style={{ animationDelay: '1s' }}
            ></div>
          </div>

          {/* Right enhanced panel */}
          <div className='relative'>
            {/* Multiple layered backgrounds for depth */}
            <div className='absolute -inset-x-6 -inset-y-8 md:-inset-y-10 rounded-[32px] bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] shadow-[0_15px_45px_rgba(26,53,120,0.12)] rotate-0 md:rotate-1 transition-transform duration-700 hover:rotate-2' />
            <div className='absolute -inset-x-4 -inset-y-6 md:-inset-y-8 rounded-[28px] bg-gradient-to-br from-white/80 to-[#F8FAFC]/80 shadow-[0_10px_30px_rgba(26,53,120,0.08)] rotate-0 md:rotate-[0.5deg] transition-transform duration-700 hover:rotate-1' />

            <div className='relative p-8 md:p-12 group cursor-pointer'>
              <h3 className='text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-[#1A3578] via-[#2d4aa3] to-[#5A7BD8] bg-clip-text text-transparent leading-tight mb-6 transition-all duration-500 group-hover:scale-[1.02]'>
                We Are Experts
                <br />
                <span className='bg-gradient-to-r from-[#5A7BD8] to-[#A7B8D8] bg-clip-text text-transparent'>
                  in Building Future
                </span>
              </h3>

              <p className='text-[#4B6584] text-base md:text-lg max-w-xl leading-relaxed transition-all duration-500 group-hover:text-[#2d3748] group-hover:scale-[1.01]'>
                At Jaksa, we're a team of innovators, engineers, and dreamers
                transforming everyday homes into smart living spaces. With a
                passion for seamless automation and intuitive design, we make
                the future of living accessible to everyone.
              </p>

              {/* Decorative elements */}
              <div className='absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-[#5A7BD8]/20 to-[#1A3578]/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500'></div>
              <div className='absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-[#A7B8D8]/30 to-[#5A7BD8]/30 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500'></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transform;
