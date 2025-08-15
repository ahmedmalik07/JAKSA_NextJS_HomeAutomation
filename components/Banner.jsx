import React from 'react';
import Image from 'next/image';
import house from '../assets/jaksa/house.png';
import office from '../assets/jaksa/office.png';
import plum from '../assets/jaksa/plum.png';

const applications = [
  {
    image: house,
    alt: 'Home automation',
    desc: 'Home automation for comfort, security, and energy efficiency.',
  },
  {
    image: office,
    alt: 'Smart solutions',
    desc: 'Smart solutions for efficient, connected offices.',
  },
  {
    image: plum,
    alt: 'Automation and monitoring',
    desc: 'Automation and monitoring for hospitals, industries, and institutes to improve safety, efficiency, and control.',
  },
];

const Banner = () => {
  return (
    <section className='w-full flex flex-col items-center pt-16 pb-14 bg-white'>
      <div className='mb-10 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-[#1A3578] mb-3'>
          Real-Life Applications
        </h2>
        <p className='text-[#4B6584] text-base md:text-lg max-w-2xl mx-auto mb-2 font-normal'>
          Whether you’re upgrading your home security or automating your
          lighting, Jaksa offers real-world solutions for everyday needs.
          Discover how our technology enhances convenience, comfort, and peace
          of mind.
        </p>
        <div className='w-12 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-2'>
        {applications.map((app, idx) => (
          <div
            key={idx}
            className='flex flex-col items-center text-center bg-white rounded-2xl p-6 transition-all duration-300 shadow-none hover:shadow-lg hover:-translate-y-2 cursor-pointer'
          >
            <Image
              src={app.image}
              alt={app.alt}
              width={180}
              height={140}
              className='mb-6 object-contain'
            />
            <p className='text-[#4B6584] text-base md:text-lg font-medium max-w-xs'>
              {app.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
