'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import tutorialsImg from '../../assets/jaksa/tutorials.png';

const tutorials = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: "Don't make these mistakes while purchasing a new phone in 2025",
  image: tutorialsImg,
}));

export default function TutorialsPage() {
  const [search, setSearch] = useState('');
  const filtered = tutorials.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='min-h-screen flex flex-col bg-[#f7f9fc]'>
      <Navbar />
      <main className='flex-1 max-w-7xl mx-auto w-full px-2 md:px-6 py-10'>
        <header className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#1A3578] mb-2'>
            Learn & Build
          </h1>
          <p className='text-[#4B6584] text-base md:text-lg max-w-2xl mx-auto mb-2 font-normal'>
            Follow simple, step-by-step guides to bring your smart home ideas to
            life.
          </p>
          <div
            className='w-24 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'
            aria-hidden='true'
          ></div>
        </header>
        <form
          className='flex justify-center mb-10'
          role='search'
          aria-label='Search tutorials'
          onSubmit={(e) => e.preventDefault()}
        >
          <div className='relative w-full max-w-lg'>
            <label htmlFor='tutorial-search' className='sr-only'>
              Search tutorials
            </label>
            <input
              id='tutorial-search'
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search tutorials...'
              className='w-full border border-[#bfcbe3] rounded-lg py-2.5 px-4 pr-10 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition shadow-sm'
              autoComplete='off'
            />
            <span className='absolute right-3 top-1/2 -translate-y-1/2 text-[#A7B8D8] pointer-events-none'>
              <svg
                width='20'
                height='20'
                fill='none'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <circle
                  cx='11'
                  cy='11'
                  r='7'
                  stroke='#A7B8D8'
                  strokeWidth='2'
                />
                <path
                  d='M20 20L16.65 16.65'
                  stroke='#A7B8D8'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </span>
          </div>
        </form>
        <section
          aria-label='Tutorials list'
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-8 pr-2 focus:outline-none'
          tabIndex={0}
        >
          {filtered.length === 0 ? (
            <div className='col-span-full text-center text-[#4B6584] text-lg py-10'>
              No tutorials found.
            </div>
          ) : (
            filtered.map((tutorial) => (
              <article
                key={tutorial.id}
                tabIndex={0}
                className='rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer flex flex-col focus:ring-2 focus:ring-[#A7B8D8] focus:z-10'
                aria-label={tutorial.title}
              >
                <div className='relative w-full aspect-video overflow-hidden'>
                  <Image
                    src={tutorial.image}
                    alt={tutorial.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, 33vw'
                    priority={tutorial.id === 1}
                  />
                </div>
                <div className='p-3 flex-1 flex items-center justify-center'>
                  <h2 className='text-[#4B6584] text-base text-center font-medium leading-tight'>
                    {tutorial.title}
                  </h2>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
