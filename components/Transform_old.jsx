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
      <section className='w-full flex flex-col items-center pt-0 pb-14 bg-white'>
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
            Here’s how our process ensures a seamless experience from start to
            finish/
          </p>
          <div className='w-12 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'></div>
        </div>
        {/* Steps Row */}
        <div className='flex flex-col md:flex-row justify-center items-stretch gap-6 w-full max-w-5xl mb-12 px-2'>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex-1 bg-[#F4F7FB] rounded-[24px] shadow-[0_2px_16px_rgba(44,62,80,0.10)] p-8 flex flex-col items-center text-center 
                transition-all duration-500 ease-in-out cursor-pointer group relative overflow-hidden 
                animate-fade-in-up hover:scale-[1.07] hover:shadow-2xl hover:z-10`}
              style={{
                minWidth: '240px',
                minHeight: '160px',
                animationDelay: `${idx * 0.1}s`,
              }}
              tabIndex={0}
              aria-label={step.title}
            >
              <span
                className='text-5xl md:text-6xl font-extrabold text-[#5A7BD8] mb-2 drop-shadow-lg transition group-hover:text-[#1A3578] group-focus:text-[#1A3578]'
                style={{ letterSpacing: '2px' }}
              >
                {step.number}
              </span>
              <h3 className='text-lg md:text-xl font-bold text-[#1A3578] mb-2 transition group-hover:text-[#5A7BD8] group-focus:text-[#5A7BD8]'>
                {step.title}
              </h3>
              <p className='text-[#4B6584] text-sm md:text-base leading-relaxed font-normal transition group-hover:text-[#1A3578] group-focus:text-[#1A3578]'>
                {step.desc}
              </p>
              <div className='absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition bg-[#5A7BD8]/10 rounded-[24px] pointer-events-none'></div>
            </div>
          ))}
        </div>
        {/* Lower Section (two-panel composition) */}
        <div className='relative grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-6 w-full max-w-6xl mt-4 px-2 items-center'>
          {/* Left photo card with dark tint */}
          <div className='relative rounded-[28px] overflow-hidden shadow-[0_12px_36px_rgba(26,53,120,0.18)]'>
            <Image
              src={auto}
              alt='Smart devices on a table'
              className='w-full h-auto object-cover'
              priority
            />
            <div className='absolute inset-0 bg-[#0b1a3a]/55' />
          </div>

          {/* Right soft angled panel */}
          <div className='relative'>
            {/* angled soft background */}
            <div className='absolute -inset-x-4 -inset-y-6 md:-inset-y-8 rounded-[28px] bg-[linear-gradient(180deg,#F5F7FB_0%,#ECEFF6_100%)] shadow-[0_10px_30px_rgba(26,53,120,0.10)] rotate-0 md:rotate-2' />
            <div className='relative p-6 md:p-10'>
              <h3 className='text-3xl md:text-5xl font-extrabold text-[#1A3578] leading-tight mb-4'>
                We Are Experts
                <br />
                in Building Future
              </h3>
              <p className='text-[#4B6584] text-base md:text-lg max-w-xl'>
                At Jaksa, we’re a team of innovators, engineers, and dreamers
                transforming everyday homes into smart living spaces. With a
                passion for seamless automation and intuitive design, we make
                the future of living accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transform;
