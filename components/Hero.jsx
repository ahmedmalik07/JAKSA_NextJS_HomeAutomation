import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import phoneImg from '../assets/jaksa/phone.png';
import cameraImg from '../assets/jaksa/camera.png';
import switchImg from '../assets/jaksa/switch.png';
import perfumeImg from '../assets/jaksa/perfume.png';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className='w-full flex flex-col items-center justify-center mt-8'>
      {/* Main hero container */}
      <div className='relative w-full max-w-[1100px] rounded-[32px] overflow-visible ring-1 ring-white/10 shadow-[0_10px_40px_rgba(26,53,120,0.25)]'>
        {/* Gradient backdrop close to reference screenshot */}
        <div className='relative rounded-[32px] min-h-[520px] md:min-h-[560px] px-6 sm:px-10 md:px-12 py-10 flex flex-col md:flex-row items-center bg-[radial-gradient(140%_120%_at_15%_0%,#C7D6EC_0%,#7D94B6_35%,#405C87_70%,#264066_100%)]'>
          {/* subtle top-left highlight */}
          <div className='pointer-events-none absolute -top-10 -left-16 w-[320px] h-[320px] rounded-full bg-white/10 blur-3xl' />

          {/* Left: Heading and Text */}
          <div className='flex-1 flex flex-col justify-center z-10 max-w-[620px]'>
            <h1
              className={`text-white font-extrabold tracking-tight leading-[1.1] text-[34px] sm:text-[40px] md:text-[48px] mb-4 transition-all duration-700 ease-out ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '120ms' }}
            >
              Experience the Ultimate in
              <br />
              Smart Home Living
            </h1>
            <p
              className={`text-white/90 text-base sm:text-lg md:text-[18px] leading-relaxed mb-6 md:mb-8 max-w-[620px] transition-all duration-700 ease-out ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '240ms' }}
            >
              Step into a world where convenience meets innovation. Our latest
              smart home solutions are designed to elevate your lifestyle with
              simplicity, security, and seamless control.
            </p>
            <div
              className={`flex gap-3 sm:gap-4 transition-all duration-700 ease-out ${
                mounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: '320ms' }}
            >
              <Link
                href='/all-products'
                aria-label='Shop products'
                className='px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold bg-[#1A3578] text-white text-sm sm:text-base shadow hover:shadow-lg hover:-translate-y-[2px] active:translate-y-0 transition-all'
              >
                Shop
              </Link>
              <Link
                href='/contact'
                aria-label='Learn more'
                className='px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold bg-white text-[#1A3578] text-sm sm:text-base border border-white/70 shadow hover:shadow-md hover:-translate-y-[2px] active:translate-y-0 transition-all'
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: Phone image */}
          <div className='flex-1 flex justify-end items-center z-10 mt-8 md:mt-0'>
            <Image
              src={phoneImg}
              alt='Phone Sanitizer'
              width={460}
              height={520}
              className='object-contain max-h-[420px] md:max-h-[520px] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]'
              priority
            />
          </div>

          {/* Desktop floating accessory cards (overlapping bottom) */}
          <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-20 gap-6 z-20'>
            {[
              {
                img: cameraImg,
                alt: 'Air Purifier',
                title: 'A Futuristic\nAir Purifier',
              },
              {
                img: switchImg,
                alt: 'Smart Plug',
                title: 'A Futuristic\nAir Purifier',
              },
              {
                img: perfumeImg,
                alt: 'Smart Speaker',
                title: 'A Futuristic\nAir Purifier',
              },
            ].map((c, i) => (
              <div
                key={i}
                className='group relative w-[290px] h-[170px] rounded-2xl border border-white/40 bg-white/55 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-[2px]'
              >
                {/* top-left soft gradient */}
                <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_55%,rgba(255,255,255,0)_100%)]' />
                <div className='relative h-full flex flex-col items-start p-4'>
                  <span className='text-[10px] tracking-wide font-semibold text-white/90'>
                    ACCESSORIES
                  </span>
                  <h3 className='text-white font-bold text-[18px] leading-tight mt-1 whitespace-pre-line'>
                    {c.title}
                  </h3>
                  <div className='mt-auto flex items-end w-full h-[68px]'>
                    <Image
                      src={c.img}
                      alt={c.alt}
                      width={78}
                      height={78}
                      className='object-contain ml-auto drop-shadow transition-transform duration-300 group-hover:-translate-y-[3px]'
                    />
                  </div>
                  <Link
                    href='/all-products'
                    aria-label='Shop now'
                    className='text-white/95 text-xs font-medium mt-2 inline-flex items-center gap-1'
                  >
                    SHOP NOW{' '}
                    <span className='ml-1 transition-transform group-hover:translate-x-1'>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile accessory cards (stack below) */}
      <div className='md:hidden grid grid-cols-1 sm:grid-cols-3 gap-3 px-2 w-full max-w-[1100px] mt-6'>
        {[
          {
            img: cameraImg,
            alt: 'Air Purifier',
            title: 'A Futuristic Air Purifier',
          },
          {
            img: switchImg,
            alt: 'Smart Plug',
            title: 'A Futuristic Air Purifier',
          },
          {
            img: perfumeImg,
            alt: 'Smart Speaker',
            title: 'A Futuristic Air Purifier',
          },
        ].map((c, i) => (
          <div
            key={i}
            className='group relative rounded-2xl border border-white/40 bg-white/55 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden p-4 transition-all duration-300 hover:shadow-lg'
          >
            <span className='text-[10px] tracking-wide font-semibold text-[#4B6584]'>
              ACCESSORIES
            </span>
            <h3 className='text-[#1A3578] font-bold text-base leading-tight mt-1'>
              {c.title}
            </h3>
            <div className='mt-2 flex items-end justify-end h-[60px]'>
              <Image
                src={c.img}
                alt={c.alt}
                width={64}
                height={64}
                className='object-contain transition-transform duration-300 group-hover:-translate-y-[2px]'
              />
            </div>
            <Link
              href='/all-products'
              aria-label='Shop now'
              className='text-[#1A3578] text-xs font-medium mt-2 inline-flex items-center gap-1'
            >
              SHOP NOW{' '}
              <span className='ml-1 transition-transform group-hover:translate-x-1'>
                →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
