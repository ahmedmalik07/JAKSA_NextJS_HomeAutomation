import React, { useState } from 'react';

const reviews = [
  {
    name: 'Elizabeth',
    location: 'Chicago',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    stars: 5,
  },
  {
    name: 'Catherine',
    location: 'New York',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    stars: 5,
  },
  {
    name: 'Victoria',
    location: 'Washington, DC',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    stars: 5,
  },
  {
    name: 'Adeel',
    location: 'Lahore',
    review: 'Great product, exceeded my expectations. Highly recommended!',
    stars: 5,
  },
  {
    name: 'Sara',
    location: 'Karachi',
    review: 'Customer service was excellent and the installation was smooth.',
    stars: 5,
  },
  {
    name: 'John',
    location: 'London',
    review: 'Smart home features are intuitive and easy to use.',
    stars: 5,
  },
  {
    name: 'Ali',
    location: 'Islamabad',
    review: 'The automation system is very reliable and easy to use.',
    stars: 5,
  },
  {
    name: 'Fatima',
    location: 'Multan',
    review: 'Installation was quick and the team was very professional.',
    stars: 5,
  },
  {
    name: 'Michael',
    location: 'New Jersey',
    review: 'I love the new smart features in my home. Highly recommended!',
    stars: 5,
  },
];

const Reviews = () => {
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;
  const totalPages = Math.ceil(reviews.length / visibleCount);
  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  const handleNext = () =>
    setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1));

  return (
    <section className='w-full flex flex-col items-center pt-16 pb-14 bg-white'>
      <div className='mb-8 text-center'>
        <p className='tracking-[0.5em] text-xs font-semibold text-[#1A3578] mb-2'>
          T e s t i m o n i a l
        </p>
        <h2 className='text-3xl md:text-5xl font-bold text-[#1A3578] mb-3'>
          What Our Client Says
        </h2>
        <p className='text-[#4B6584] text-base md:text-lg max-w-2xl mx-auto mb-2 font-normal'>
          We’re proud to help homeowners experience the future of living. Here’s
          what real customers are saying about their transformation with Jaksa.
        </p>
        <div className='w-12 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'></div>
      </div>
      <div className='flex items-center justify-center gap-4 w-full'>
        <button
          onClick={handlePrev}
          className='w-10 h-10 flex items-center justify-center rounded-full bg-[#1A3578] text-white text-xl hover:bg-[#27408b] transition'
        >
          &#8592;
        </button>
        <div className='w-full max-w-5xl px-2 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {reviews
            .slice(current * visibleCount, (current + 1) * visibleCount)
            .map((review, idx) => (
              <div
                key={idx}
                className='bg-[#F7F8FA] rounded-[20px] shadow-[0_2px_16px_rgba(44,62,80,0.08)] p-8 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-white cursor-pointer'
                style={{ minWidth: '220px', minHeight: '180px' }}
              >
                <div className='flex justify-center mb-4'>
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <span
                      key={i}
                      className='text-[#1A3578] text-xl md:text-2xl transition-colors duration-300 group-hover:text-[#A7B8D8]'
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className='text-[#4B6584] text-base md:text-lg font-normal mb-6 text-center'>
                  {review.review}
                </p>
                <div className='flex flex-col items-center w-full'>
                  <span className='font-bold text-[#1A3578] text-base md:text-lg text-center'>
                    {review.name}
                  </span>
                  <span className='text-[#7B8CA6] text-sm md:text-base text-center'>
                    {review.location}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={handleNext}
          className='w-10 h-10 flex items-center justify-center rounded-full bg-[#1A3578] text-white text-xl hover:bg-[#27408b] transition'
        >
          &#8594;
        </button>
      </div>
      <div className='flex items-center justify-center gap-2 mt-8'>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              current === idx ? 'bg-[#1A3578]' : 'bg-[#A7B8D8]'
            } transition`}
            onClick={() => setCurrent(idx)}
            style={{ cursor: 'pointer' }}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
