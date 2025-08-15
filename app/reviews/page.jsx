'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';

const initialReviews = [
  {
    id: 1,
    product: '4 Gang Switch',
    mediaType: 'image',
    media: '/assets/sample_review.jpg',
    reviewer: 'ali',
    title: 'Great Smart Switch!',
    description: 'Easy to install and works perfectly.',
    stars: 5,
  },
  {
    id: 2,
    product: '4 Gang Switch',
    mediaType: 'video',
    media: '/assets/sample_review.mp4',
    reviewer: 'ahmed',
    title: 'Impressive Features',
    description: 'Loved the remote control feature.',
    stars: 4,
  },
];

const products = [
  'All Products',
  '4 gang switch',
  '2 gang switch',
  '3 gang switch',
  'phone disinfectant',
];

function ReviewStars({ stars }) {
  return (
    <div className='flex gap-1'>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width='18'
          height='18'
          fill={i < stars ? '#1A3578' : '#A7B8D8'}
          viewBox='0 0 24 24'
        >
          <path d='M12 17.75l-6.172 3.245 1.179-6.88L2 9.755l6.908-1.004L12 2.25l3.092 6.501L22 9.755l-5.007 4.36 1.179 6.88z' />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [search, setSearch] = useState('');
  const [reviews, setReviews] = useState(initialReviews);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    product: products[1],
    mediaType: 'image',
    media: '',
    reviewer: '',
    title: '',
    description: '',
    stars: 0,
  });
  // Group reviews by product
  const groupedReviews = products.slice(1).map((product) => ({
    product,
    reviews: reviews.filter(
      (r) =>
        r.product === product &&
        (r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.reviewer.toLowerCase().includes(search.toLowerCase()))
    ),
  }));
  // Filter to show only selected product's reviews
  const visibleGroups =
    selectedProduct === 'All Products'
      ? groupedReviews
      : groupedReviews.filter((g) => g.product === selectedProduct);
  function handleAddReview(e) {
    e.preventDefault();
    setReviews([
      ...reviews,
      { ...newReview, id: Date.now(), media: newReview.media },
    ]);
    setShowModal(false);
    setNewReview({
      product: products[1],
      mediaType: 'image',
      media: '',
      reviewer: '',
      title: '',
      description: '',
      stars: 0,
    });
  }
  function handleMediaChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setNewReview((prev) => ({ ...prev, media: url }));
    setNewReview((prev) => ({
      ...prev,
      mediaType: file.type.startsWith('video') ? 'video' : 'image',
    }));
  }

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
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Sidebar */}
          <aside className='w-full md:w-64 mb-8 md:mb-0'>
            <input
              type='text'
              placeholder='Search product...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full border border-[#bfcbe3] rounded-lg py-2.5 px-4 mb-4 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition shadow-sm'
            />
            <div className='mb-6'>
              <h3 className='text-[#1A3578] font-semibold mb-2'>
                Smart Product
              </h3>
              <ul className='space-y-2'>
                {products.slice(1).map((p) => (
                  <li key={p}>
                    <label className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='radio'
                        name='product'
                        checked={selectedProduct === p}
                        onChange={() => setSelectedProduct(p)}
                        className='accent-[#1A3578]'
                      />
                      <span className='text-[#4B6584]'>{p}</span>
                    </label>
                  </li>
                ))}
                <li>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='product'
                      checked={selectedProduct === 'All Products'}
                      onChange={() => setSelectedProduct('All Products')}
                      className='accent-[#1A3578]'
                    />
                    <span className='text-[#4B6584]'>All Products</span>
                  </label>
                </li>
              </ul>
            </div>
          </aside>
          {/* Reviews Section - Grouped by Product, Horizontal Scroll */}
          <section className='flex-1'>
            <h2 className='text-2xl font-bold text-[#1A3578] mb-6'>Reviews</h2>
            <div className='border-t border-[#A7B8D8] mb-8'></div>
            {visibleGroups.map(({ product, reviews }) => (
              <div key={product} className='mb-12'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-xl font-bold text-[#1A3578]'>
                    {product}
                  </h3>
                  <button
                    className='px-4 py-2 bg-[#1A3578] text-white rounded-md shadow hover:bg-[#25335a] transition font-semibold text-xs'
                    onClick={() => setShowModal(true)}
                  >
                    add a review
                  </button>
                </div>
                <div className='flex items-center gap-4'>
                  {/* Left Arrow */}
                  <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#1A3578] text-white shadow hover:bg-[#25335a] transition'>
                    &#8592;
                  </button>
                  {/* Scrollable Reviews Row */}
                  <div className='flex-1 overflow-x-auto'>
                    <div className='flex gap-8 min-w-[600px]'>
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className='bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col items-center p-4 min-w-[280px] max-w-[320px] relative'
                        >
                          <div className='w-full aspect-video rounded-lg overflow-hidden mb-2 relative'>
                            {review.mediaType === 'image' ? (
                              <Image
                                src={review.media}
                                alt={review.title}
                                fill
                                className='object-cover group-hover:scale-105 transition-transform duration-300'
                              />
                            ) : (
                              <video
                                src={review.media}
                                controls
                                className='w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300'
                              />
                            )}
                          </div>
                          <div className='text-xs text-[#4B6584] mb-1 text-center'>
                            review by {review.reviewer}
                          </div>
                          <div className='font-medium text-[#1A3578] mb-1 text-center'>
                            {review.title}
                          </div>
                          <div className='text-sm text-[#4B6584] mb-2 text-center'>
                            {review.description}
                          </div>
                          <ReviewStars stars={review.stars} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right Arrow */}
                  <button className='w-8 h-8 flex items-center justify-center rounded-full bg-[#1A3578] text-white shadow hover:bg-[#25335a] transition'>
                    &#8594;
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
        {/* Modal for adding review */}
        {showModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
            <form
              className='bg-white rounded-xl shadow-xl p-8 w-full max-w-lg flex flex-col gap-4'
              onSubmit={handleAddReview}
            >
              <h3 className='text-xl font-bold text-[#1A3578] mb-2'>
                Add a Review
              </h3>
              <label className='text-sm font-medium text-[#1A3578]'>
                Product
              </label>
              <select
                value={newReview.product}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, product: e.target.value }))
                }
                className='border border-[#bfcbe3] rounded-lg py-2 px-3 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition'
              >
                {products.slice(1).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <label className='text-sm font-medium text-[#1A3578]'>
                Media (Image/Video)
              </label>
              <input
                type='file'
                accept='image/*,video/*'
                onChange={handleMediaChange}
                className='border border-[#bfcbe3] rounded-lg py-2 px-3 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition'
                required
              />
              <label className='text-sm font-medium text-[#1A3578]'>
                Reviewer Name
              </label>
              <input
                type='text'
                value={newReview.reviewer}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    reviewer: e.target.value,
                  }))
                }
                className='border border-[#bfcbe3] rounded-lg py-2 px-3 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition'
                required
              />
              <label className='text-sm font-medium text-[#1A3578]'>
                Title
              </label>
              <input
                type='text'
                value={newReview.title}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, title: e.target.value }))
                }
                className='border border-[#bfcbe3] rounded-lg py-2 px-3 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition'
                required
              />
              <label className='text-sm font-medium text-[#1A3578]'>
                Description
              </label>
              <textarea
                value={newReview.description}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={2}
                className='border border-[#bfcbe3] rounded-lg py-2 px-3 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition'
                required
              />
              <label className='text-sm font-medium text-[#1A3578]'>
                Stars
              </label>
              <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type='button'
                    key={star}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                      newReview.stars >= star
                        ? 'bg-[#1A3578] text-white'
                        : 'bg-white text-[#A7B8D8]'
                    }`}
                    onClick={() =>
                      setNewReview((prev) => ({ ...prev, stars: star }))
                    }
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className='flex gap-4 mt-4'>
                <button
                  type='submit'
                  className='px-6 py-2 bg-[#1A3578] text-white rounded-md shadow hover:bg-[#25335a] transition font-semibold'
                >
                  Submit
                </button>
                <button
                  type='button'
                  className='px-6 py-2 bg-[#A7B8D8] text-[#1A3578] rounded-md shadow hover:bg-[#bfcbe3] transition font-semibold'
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
