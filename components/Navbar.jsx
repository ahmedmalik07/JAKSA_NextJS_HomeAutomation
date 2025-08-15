'use client';
import React from 'react';
import { assets } from '../assets/assets';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import Image from 'next/image';

const Navbar = () => {
  const { isSeller, router, getCartCount } = useAppContext();

  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700'>
      {/* Logo on the left */}
      <div className='flex items-center'>
        <Image
          src={require('../assets/jaksa/jaksa_logo.png')}
          alt='Jaksa Logo'
          width={50}
          height={50}
          className='cursor-pointer w-14 h-14 object-contain'
          onClick={() => router.push('/')}
        />
        <span className='ml-2 font-bold text-xs tracking-wide'>JAKSA</span>
      </div>

      {/* Centered navigation links */}
      <div className='flex-1 flex justify-center'>
        <ul className='flex items-center gap-8 text-base font-semibold'>
          <li>
            <Link href='/' className='hover:underline underline-offset-4'>
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/all-products'
              className='hover:underline underline-offset-4'
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href='/contact'
              className='hover:underline underline-offset-4'
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href='/tutorials'
              className='hover:underline underline-offset-4'
            >
              Tutorials
            </Link>
          </li>
          <li>
            <Link
              href='/reviews'
              className='hover:underline underline-offset-4'
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      {/* Cart icon on the right */}
      <div className='flex items-center gap-4'>
        <Link href='/cart' className='relative'>
          <Image src={assets.cart_icon} alt='Cart' className='w-6 h-6' />
          {getCartCount() > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
              {getCartCount()}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
