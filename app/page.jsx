'use client';
import React from 'react';
// Using alias; if build still can't resolve ensure jsconfig baseUrl is set. Provide relative fallbacks:
import Hero from '../components/Hero';
import Transform from '../components/Transform';
import Banner from '../components/Banner';
import Reviews from '../components/Reviews';
import Apart from '../components/Apart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='px-6 md:px-16 lg:px-32'>
        <Hero />
        <Transform />
        <Apart />
        {/* //Real life applications */}
        <Banner />
        <Reviews />
      </div>
      <Footer />
    </>
  );
};

export default Home;
