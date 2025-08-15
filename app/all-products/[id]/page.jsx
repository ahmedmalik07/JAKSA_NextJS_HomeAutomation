'use client';
import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';

import switchImg from '../../../assets/jaksa/switch.png';
import { notFound } from 'next/navigation';
import { useAppContext } from '../../../context/AppContext';

import { useState, useEffect } from 'react';
export default function ProductPage({ params }) {
  // Unwrap params for Next.js future compatibility
  const actualParams =
    typeof React.use === 'function' ? React.use(params) ?? params : params;
  const { products } = useAppContext();
  const product = products.find(
    (p) => p._id === (actualParams.id || params.id)
  );
  if (!product) return notFound();

  // Carousel: use same image for all thumbs
  const carouselImages = Array(4).fill(
    product.image && product.image.length > 0 ? product.image[0] : switchImg
  );
  const [selectedImage, setSelectedImage] = useState(carouselImages[0]);

  // Dummy review data for now
  const defaultReviews = [
    {
      name: 'Grace Carey',
      rating: 4,
      date: '24 January,2023',
      text: `I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn't connect with my data plan, since the new phones don't have the physical Sim tray anymore, but couldn't have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!!`,
    },
    {
      name: 'Ronald Richards',
      rating: 5,
      date: '24 January,2023',
      text: `This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! (All about the Benjamin's) So if you want a phone that's going to last grab an iPhone 14 pro max and get several cords and plugs.`,
    },
    {
      name: 'Darcy King',
      rating: 4,
      date: '24 January,2023',
      text: `I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update; otherwise, love this phone! Came in great condition`,
    },
  ];

  // Local/session storage reviews
  const storageKey = `product-reviews-${product._id}`;
  const [userReviews, setUserReviews] = useState([]);
  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(storageKey)
        : null;
    if (stored) setUserReviews(JSON.parse(stored));
  }, [storageKey]);
  const addUserReview = (review) => {
    const updated = [review, ...userReviews];
    setUserReviews(updated);
    if (typeof window !== 'undefined')
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // View More logic
  const INITIAL_REVIEWS = 3;
  const [visibleReviews, setVisibleReviews] = useState(INITIAL_REVIEWS);
  const allReviews = [...userReviews, ...defaultReviews];
  const canViewMore = visibleReviews < allReviews.length;

  // Review stats
  const reviews = allReviews.length;
  const rating = reviews
    ? (allReviews.reduce((a, b) => a + b.rating, 0) / reviews).toFixed(1)
    : '0.0';
  const reviewStats = [
    allReviews.filter((r) => r.rating === 5).length,
    allReviews.filter((r) => r.rating === 4).length,
    allReviews.filter((r) => r.rating === 3).length,
    allReviews.filter((r) => r.rating === 2).length,
    allReviews.filter((r) => r.rating === 1).length,
  ];

  // Add review modal state
  const [showModal, setShowModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    text: '',
  });
  const handleReviewChange = (e) =>
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  const handleStarClick = (star) =>
    setReviewForm({ ...reviewForm, rating: star });
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.rating || !reviewForm.text) return;
    addUserReview({
      ...reviewForm,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    });
    setReviewForm({ name: '', rating: 0, text: '' });
    setShowModal(false);
    setVisibleReviews((v) => v + 1);
  };

  return (
    <div className='min-h-screen flex flex-col bg-[#F7F9FC]'>
      <Navbar />
      <div className='h-8 md:h-12' />
      <main className='flex-1 max-w-[1200px] mx-auto w-full px-2 md:px-8 py-10'>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Left: Carousel */}
          <aside className='w-full md:w-1/2 flex gap-8'>
            <div className='flex flex-col gap-6 items-center justify-center'>
              {carouselImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-20 h-20 rounded bg-white border border-[#E3E8F0] flex items-center justify-center cursor-pointer ${
                    selectedImage === img ? 'ring-2 ring-[#274b9a]' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt='thumb'
                    className='object-contain w-16 h-16'
                  />
                </div>
              ))}
            </div>
            <div className='flex-1 flex items-center justify-center'>
              <div className='bg-[#F7F9FC] rounded-xl flex items-center justify-center w-full h-[400px]'>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className='object-contain max-h-[350px] max-w-full'
                />
              </div>
            </div>
          </aside>
          {/* Right: Product Info */}
          <section className='flex-1 flex flex-col gap-4'>
            <h1 className='text-[2rem] font-bold text-[#27346A] leading-tight'>
              {product.name}
            </h1>
            <div className='text-[2rem] font-semibold text-[#A0A9BD] mb-2'>
              Rs{(product.offerPrice ?? product.price).toLocaleString()}
            </div>
            <div className='flex gap-4 mb-4'>
              <button className='bg-[#27346A] text-white px-12 py-3 rounded-lg font-semibold text-lg hover:bg-[#1A3578] transition'>
                Buy
              </button>
              <button className='bg-[#27346A] text-white px-12 py-3 rounded-lg font-semibold text-lg hover:bg-[#1A3578] transition'>
                Add to cart
              </button>
            </div>
            <div className='mt-4'>
              <h2 className='font-semibold text-[#27346A] text-xl mb-4'>
                Product description
              </h2>
              <div className='grid grid-cols-3 gap-4 mb-4'>
                <div className='flex items-center gap-2 bg-[#F7F9FC] rounded-lg px-4 py-2 text-[#27346A] text-sm font-medium border border-[#E3E8F0]'>
                  <span className='material-icons text-lg'>devices</span>Screen
                  size <span className='ml-auto font-bold'>6.7"</span>
                </div>
                <div className='flex items-center gap-2 bg-[#F7F9FC] rounded-lg px-4 py-2 text-[#27346A] text-sm font-medium border border-[#E3E8F0]'>
                  <span className='material-icons text-lg'>memory</span>CPU{' '}
                  <span className='ml-auto font-bold'>Apple A16 Bionic</span>
                </div>
                <div className='flex items-center gap-2 bg-[#F7F9FC] rounded-lg px-4 py-2 text-[#27346A] text-sm font-medium border border-[#E3E8F0]'>
                  <span className='material-icons text-lg'>apps</span>Number of
                  Cores <span className='ml-auto font-bold'>6</span>
                </div>
                <div className='flex items-center gap-2 bg-[#F7F9FC] rounded-lg px-4 py-2 text-[#27346A] text-sm font-medium border border-[#E3E8F0]'>
                  <span className='material-icons text-lg'>photo_camera</span>
                  Main camera{' '}
                  <span className='ml-auto font-bold'>48-12-12</span>
                </div>
                <div className='flex items-center gap-2 bg-[#F7F9FC] rounded-lg px-4 py-2 text-[#27346A] text-sm font-medium border border-[#E3E8F0]'>
                  <span className='material-icons text-lg'>camera_front</span>
                  Front-camera <span className='ml-auto font-bold'>12 MP</span>
                </div>
                <div className='flex items-center gap-2 bg-[#F7F9FC] rounded-lg px-4 py-2 text-[#27346A] text-sm font-medium border border-[#E3E8F0]'>
                  <span className='material-icons text-lg'>battery_full</span>
                  Battery capacity{' '}
                  <span className='ml-auto font-bold'>4323 mAh</span>
                </div>
              </div>
              <p className='text-[#4B6584] text-base mb-2'>
                {product.description}
              </p>
            </div>
            <div className='flex justify-end mt-8'>
              <button
                className='bg-[#27346A] text-white px-16 py-3 rounded-lg font-semibold text-lg hover:bg-[#1A3578] transition'
                onClick={() => setShowModal(true)}
              >
                Add a review
              </button>
            </div>
          </section>
        </div>
        {/* Reviews Section */}
        <section className='mt-16'>
          <h2 className='text-2xl font-bold text-[#27346A] mb-8'>Reviews</h2>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex flex-col items-center bg-[#F7F9FC] rounded-xl p-8 min-w-[180px]'>
              <span className='text-5xl font-bold text-[#27346A]'>
                {rating}
              </span>
              <span className='text-sm text-[#A0A9BD] mb-2'>
                of {reviews} reviews
              </span>
              <div className='flex gap-1 text-[#27346A] text-2xl mb-2'>
                {'★'.repeat(Math.round(rating))}
                {rating % 1 !== 0 ? (
                  <span className='text-[#A0A9BD]'>½</span>
                ) : null}
              </div>
            </div>
            <div className='flex-1 flex flex-col justify-center'>
              {['Excellent', 'Good', 'Average', 'Below Average', 'Poor'].map(
                (label, i) => (
                  <div key={label} className='flex items-center gap-2 mb-2'>
                    <span className='w-32 text-sm text-[#27346A]'>{label}</span>
                    <div className='flex-1 h-2 bg-[#E3E8F0] rounded'>
                      <div
                        className='h-2 bg-[#27346A] rounded'
                        style={{
                          width: `${
                            (reviewStats[i] / Math.max(1, ...reviewStats)) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className='w-8 text-sm text-[#27346A]'>
                      {reviewStats[i]}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className='mt-8 space-y-6'>
            {allReviews.slice(0, visibleReviews).map((r, i) => (
              <div
                key={i}
                className='bg-[#F7F9FC] rounded-xl p-6 flex gap-4 items-start'
              >
                <div className='w-14 h-14 rounded-full bg-[#E3E8F0] flex items-center justify-center text-2xl font-bold text-[#27346A] overflow-hidden'>
                  {r.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span className='font-semibold text-[#27346A] text-lg'>
                      {r.name}
                    </span>
                    <span className='text-[#27346A] text-lg'>
                      {'★'.repeat(r.rating)}
                    </span>
                    <span className='text-sm text-[#A0A9BD] ml-auto'>
                      {r.date}
                    </span>
                  </div>
                  <p className='text-[#27346A] text-base'>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
          {canViewMore && (
            <div className='flex justify-center mt-8'>
              <button
                className='px-10 py-3 border border-[#27346A] text-[#27346A] rounded-lg font-semibold text-lg hover:bg-[#F7F9FC] transition'
                onClick={() => setVisibleReviews((v) => v + 3)}
              >
                View More
              </button>
            </div>
          )}
        </section>
        {/* Add Review Modal */}
        {showModal && (
          <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
            <div className='bg-[#F7F9FC] rounded-xl shadow-lg p-12 w-full max-w-2xl relative'>
              <button
                className='absolute top-4 right-4 text-2xl text-[#27346A]'
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <form
                onSubmit={handleReviewSubmit}
                className='flex flex-col gap-8'
              >
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='flex-1 flex flex-col gap-4'>
                    <label className='text-[#27346A] text-lg font-semibold'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={reviewForm.name}
                      onChange={handleReviewChange}
                      className='border-b border-[#A0A9BD] bg-transparent px-2 py-2 text-lg outline-none'
                      required
                    />
                  </div>
                  <div className='flex-1 flex flex-col gap-4'>
                    <label className='text-[#27346A] text-lg font-semibold'>
                      Review
                    </label>
                    <div className='flex gap-2'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type='button'
                          key={star}
                          onClick={() => handleStarClick(star)}
                          className='text-3xl text-[#A0A9BD] focus:outline-none'
                        >
                          {reviewForm.rating >= star ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <label className='text-[#27346A] text-lg font-semibold'>
                    Comment
                  </label>
                  <textarea
                    name='text'
                    value={reviewForm.text}
                    onChange={handleReviewChange}
                    className='border-b border-[#A0A9BD] bg-transparent px-2 py-2 text-lg outline-none min-h-[80px]'
                    required
                  />
                </div>
                <div className='flex justify-center mt-4'>
                  <button
                    type='submit'
                    className='bg-[#27346A] text-white px-16 py-3 rounded-lg font-semibold text-lg hover:bg-[#1A3578] transition'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
// ...existing code...
