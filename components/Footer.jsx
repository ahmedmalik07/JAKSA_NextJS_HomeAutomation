import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import jaksaLogo from '../assets/jaksa/jaksa.png';
import fbIcon from '../assets/jaksa/fb.png';
import instaIcon from '../assets/jaksa/insta.png';
import linkedinIcon from '../assets/jaksa/linkedin.png';

const Footer = () => {
  return (
    <footer className='bg-[#1A2340] text-white pt-10 pb-2 px-2 md:px-0'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 pb-8 border-b border-white/10'>
        <div className='flex flex-col items-start gap-4 min-w-[180px]'>
          <Image
            src={jaksaLogo}
            alt='Jaksa Logo'
            width={70}
            height={70}
            className='mb-2'
          />
        </div>
        <div className='flex flex-col md:flex-row gap-10 flex-1 justify-between w-full'>
          <div className='min-w-[120px]'>
            <h3 className='font-semibold text-base mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/all-products'
                  className='hover:text-[#A7B8D8] transition'
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-[#A7B8D8] transition'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/tutorials'
                  className='hover:text-[#A7B8D8] transition'
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href='/cart' className='hover:text-[#A7B8D8] transition'>
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          <div className='min-w-[120px]'>
            <h3 className='font-semibold text-base mb-4'>Social Media</h3>
            <div className='flex gap-4 items-center mt-2'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:opacity-80 transition'
              >
                <Image src={fbIcon} alt='Facebook' width={28} height={28} />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:opacity-80 transition'
              >
                <Image src={instaIcon} alt='Instagram' width={28} height={28} />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:opacity-80 transition'
              >
                <Image
                  src={linkedinIcon}
                  alt='LinkedIn'
                  width={28}
                  height={28}
                />
              </a>
            </div>
          </div>
          <div className='min-w-[180px]'>
            <h3 className='font-semibold text-base mb-4'>Reach us</h3>
            <ul className='space-y-2 text-sm'>
              <li className='flex items-center gap-2'>
                <Image src={fbIcon} alt='Facebook' width={18} height={18} />
                +1012 3456 789
              </li>
              <li className='flex items-center gap-2'>
                <Image src={instaIcon} alt='Email' width={18} height={18} />
                demo@gmail.com
              </li>
              <li className='flex items-center gap-2'>
                <Image
                  src={linkedinIcon}
                  alt='Location'
                  width={18}
                  height={18}
                />
                132 Dartmouth Street Boston, Massachusetts 02156 United States
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-4 text-xs text-gray-300'>
        <span>Copyright © 2024 JAKSA</span>
        <span className='flex gap-2 mt-2 md:mt-0'>
          All Rights Reserved |
          <Link href='/terms' className='hover:text-white underline transition'>
            Terms and Conditions
          </Link>{' '}
          |
          <Link
            href='/privacy'
            className='hover:text-white underline transition'
          >
            Privacy Policy
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
