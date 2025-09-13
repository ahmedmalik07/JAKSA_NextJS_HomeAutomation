'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import jaksaLogo from '../assets/jaksa/jaksa.png';
import fbIcon from '../assets/jaksa/fb.png';
import instaIcon from '../assets/jaksa/insta.png';
import linkedinIcon from '../assets/jaksa/linkedin.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/gs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter',
          payload: {
            email,
            page: 'Footer',
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent:
              typeof navigator !== 'undefined' ? navigator.userAgent : '',
          },
        }),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setMessage('Successfully subscribed to newsletter!');
        setEmail('');
      } else {
        setMessage(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className='bg-[#1A2340] text-white pt-8 pb-2 px-4 sm:px-6 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Main footer content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10'>
          {/* Logo and Company Info */}
          <div className='flex flex-col items-start gap-4 sm:col-span-1'>
            <Image
              src={jaksaLogo}
              alt='Jaksa Logo'
              width={70}
              height={70}
              className='mb-2'
            />
            <p className='text-sm text-gray-300 leading-relaxed'>
              Leading provider of smart home automation solutions with
              cutting-edge technology and reliable service.
            </p>
          </div>

          {/* Company Links */}
          <div className='sm:col-span-1'>
            <h3 className='font-semibold text-base mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/all-products'
                  className='text-sm hover:text-[#A7B8D8] transition'
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm hover:text-[#A7B8D8] transition'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/tutorials'
                  className='text-sm hover:text-[#A7B8D8] transition'
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href='/cart'
                  className='text-sm hover:text-[#A7B8D8] transition'
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='sm:col-span-1'>
            <h3 className='font-semibold text-base mb-4'>Reach us</h3>
            <ul className='space-y-3 text-sm'>
              <li className='flex items-center gap-2'>
                <Image src={fbIcon} alt='Phone' width={18} height={18} />
                <span>+92-332-1052572</span>
              </li>
              <li className='flex items-center gap-2'>
                <Image src={instaIcon} alt='Email' width={18} height={18} />
                <span className='break-all'>jaksa.connect@gmail.com</span>
              </li>
              <li className='flex items-start gap-2'>
                <Image
                  src={linkedinIcon}
                  alt='Location'
                  width={18}
                  height={18}
                  className='mt-0.5 flex-shrink-0'
                />
                <span className='leading-relaxed'>
                  AUBIC, FMC 5th Floor, E9 Islamabad.
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className='mt-6'>
              <h4 className='font-semibold text-sm mb-3'>Follow Us</h4>
              <div className='flex gap-4 items-center'>
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
                  <Image
                    src={instaIcon}
                    alt='Instagram'
                    width={28}
                    height={28}
                  />
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
          </div>

          {/* Newsletter Section - Responsive */}
          <div className='sm:col-span-2 lg:col-span-1'>
            <h3 className='font-semibold text-base mb-4'>Stay Updated</h3>
            <p className='text-sm text-gray-300 mb-4 leading-relaxed'>
              Subscribe to our newsletter for the latest smart home innovations
              and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className='space-y-3'>
              <div className='relative'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                  className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#A7B8D8] focus:ring-2 focus:ring-[#A7B8D8]/20 transition text-sm'
                />
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full px-4 py-3 bg-[#1A3578] hover:bg-[#25335a] text-white rounded-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed font-medium text-sm'
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <p
                  className={`text-sm ${
                    message.includes('Successfully')
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='flex flex-col sm:flex-row justify-between items-center pt-6 gap-4 text-xs text-gray-300'>
          <span>Copyright © 2024 JAKSA</span>
          <div className='flex flex-wrap gap-2 justify-center sm:justify-end'>
            <span>All Rights Reserved</span>
            <span>|</span>
            <Link
              href='/terms'
              className='hover:text-white underline transition'
            >
              Terms and Conditions
            </Link>
            <span>|</span>
            <Link
              href='/privacy'
              className='hover:text-white underline transition'
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
