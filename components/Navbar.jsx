'use client';
import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Image from 'next/image';

const Navbar = () => {
  const { isSeller, router, getCartCount } = useAppContext();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Helper function to determine if a link is active
  const isActiveLink = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Helper function to get link classes
  const getLinkClasses = (href) => {
    const baseClasses =
      'hover:underline underline-offset-4 transition-all duration-200 block py-2 px-3 rounded-md touch-manipulation';
    const activeClasses = 'underline text-blue-600 font-bold';
    return isActiveLink(href) ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  // Close menu when link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className='bg-white border-b border-gray-300 text-gray-700 relative'
      ref={menuRef}
    >
      <div className='flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-32 py-3'>
        {/* Logo on the left */}
        <div className='flex items-center'>
          <Image
            src={require('../assets/jaksa/jaksa_logo.png')}
            alt='Jaksa Logo'
            width={50}
            height={50}
            className='cursor-pointer w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain'
            onClick={() => router.push('/')}
          />
          <span className='ml-2 font-bold text-xs sm:text-sm tracking-wide'>
            JAKSA
          </span>
        </div>

        {/* Desktop navigation - Hidden on mobile */}
        <div className='hidden lg:flex flex-1 justify-center'>
          <ul className='flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold'>
            <li>
              <Link
                href='/'
                className={`hover:underline underline-offset-4 transition-all duration-200 py-2 px-3 rounded-md touch-manipulation ${
                  isActiveLink('/') ? 'underline text-blue-600 font-bold' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/all-products'
                className={`hover:underline underline-offset-4 transition-all duration-200 py-2 px-3 rounded-md touch-manipulation ${
                  isActiveLink('/all-products')
                    ? 'underline text-blue-600 font-bold'
                    : ''
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className={`hover:underline underline-offset-4 transition-all duration-200 py-2 px-3 rounded-md touch-manipulation ${
                  isActiveLink('/contact')
                    ? 'underline text-blue-600 font-bold'
                    : ''
                }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href='/tutorials'
                className={`hover:underline underline-offset-4 transition-all duration-200 py-2 px-3 rounded-md touch-manipulation ${
                  isActiveLink('/tutorials')
                    ? 'underline text-blue-600 font-bold'
                    : ''
                }`}
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                href='/reviews'
                className={`hover:underline underline-offset-4 transition-all duration-200 py-2 px-3 rounded-md touch-manipulation ${
                  isActiveLink('/reviews')
                    ? 'underline text-blue-600 font-bold'
                    : ''
                }`}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side - Cart and Menu button */}
        <div className='flex items-center gap-4'>
          {/* Cart icon */}
          <Link
            href='/cart'
            className={`relative ${isActiveLink('/cart') ? 'opacity-80' : ''}`}
          >
            <Image
              src={assets.cart_icon}
              alt='Cart'
              className='w-5 h-5 sm:w-6 sm:h-6'
            />
            {getCartCount() > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold text-[10px] sm:text-xs'>
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile menu button - Hidden on desktop */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
            aria-label='Toggle menu'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu - Shown when menu is open */}
      {isMenuOpen && (
        <div className='lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-50'>
          <ul className='flex flex-col py-4 px-4 space-y-3'>
            <li>
              <Link
                href='/'
                className={`block py-3 px-4 rounded-md text-base transition-all duration-200 touch-manipulation ${
                  isActiveLink('/')
                    ? 'bg-blue-50 underline text-blue-600 font-bold'
                    : 'hover:bg-gray-50'
                }`}
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/all-products'
                className={`block py-3 px-4 rounded-md text-base transition-all duration-200 touch-manipulation ${
                  isActiveLink('/all-products')
                    ? 'bg-blue-50 underline text-blue-600 font-bold'
                    : 'hover:bg-gray-50'
                }`}
                onClick={handleLinkClick}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className={`block py-3 px-4 rounded-md text-base transition-all duration-200 touch-manipulation ${
                  isActiveLink('/contact')
                    ? 'bg-blue-50 underline text-blue-600 font-bold'
                    : 'hover:bg-gray-50'
                }`}
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href='/tutorials'
                className={`block py-3 px-4 rounded-md text-base transition-all duration-200 touch-manipulation ${
                  isActiveLink('/tutorials')
                    ? 'bg-blue-50 underline text-blue-600 font-bold'
                    : 'hover:bg-gray-50'
                }`}
                onClick={handleLinkClick}
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                href='/reviews'
                className={`block py-3 px-4 rounded-md text-base transition-all duration-200 touch-manipulation ${
                  isActiveLink('/reviews')
                    ? 'bg-blue-50 underline text-blue-600 font-bold'
                    : 'hover:bg-gray-50'
                }`}
                onClick={handleLinkClick}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
