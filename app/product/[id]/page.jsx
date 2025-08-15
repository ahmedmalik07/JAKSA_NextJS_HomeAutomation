'use client';
import { useEffect, useState } from 'react';
import { assets } from '../../../assets/assets';
import ProductCard from '../../../components/ProductCard';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loading from '../../../components/Loading';
import { useAppContext } from '../../../context/AppContext';
import React from 'react';

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    name: '',
    comment: '',
  });
  const [productReviews, setProductReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);

    // Load reviews from localStorage
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setProductReviews(JSON.parse(savedReviews));
    } else {
      // Default reviews for demo
      const defaultReviews = [
        {
          name: 'Grace Carey',
          rating: 4,
          date: '24 January 2023',
          comment:
            "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn't connect with my data plan, since the new phones don't have the physical Sim tray anymore, but couldn't have been easier!",
        },
        {
          name: 'Ronald Richards',
          rating: 5,
          date: '24 January 2023',
          comment:
            'This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones!',
        },
      ];
      setProductReviews(defaultReviews);
      localStorage.setItem(`reviews_${id}`, JSON.stringify(defaultReviews));
    }
  };

  const handleAddReview = () => {
    setShowReviewModal(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const review = {
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      comment: newReview.comment,
    };

    const updatedReviews = [review, ...productReviews];
    setProductReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setShowReviewModal(false);
    setNewReview({ rating: 5, name: '', comment: '' });
    alert('Review submitted successfully!');
  };

  const handleViewMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const calculateRatingStats = () => {
    if (productReviews.length === 0) {
      return {
        average: 0,
        total: 0,
        breakdown: [0, 0, 0, 0, 0],
      };
    }

    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const average = (totalRating / productReviews.length).toFixed(1);

    const breakdown = [5, 4, 3, 2, 1].map(
      (rating) =>
        productReviews.filter((review) => review.rating === rating).length
    );

    return {
      average,
      total: productReviews.length,
      breakdown,
    };
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  const productSpecs = [
    { label: 'Screen size', value: '6.7"', icon: '📱' },
    { label: 'CPU', value: 'Apple A16 Bionic', icon: '⚡' },
    { label: 'Number of Cores', value: '6', icon: '🔧' },
    { label: 'Main Camera', value: '48+12-12 MP', icon: '📷' },
    { label: 'Front Camera', value: '12 MP', icon: '🤳' },
    { label: 'Battery capacity', value: '4323 mAh', icon: '🔋' },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return productData ? (
    <>
      <Navbar />

      {/* Main Product Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16'>
          {/* Left Side - Product Images */}
          <div className='space-y-4'>
            {/* Thumbnail Images */}
            <div className='flex lg:flex-col flex-row gap-2 sm:gap-4 lg:order-1 order-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0'>
              {productData.image.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 transition-all flex-shrink-0 ${
                    (mainImage || productData.image[0]) === image
                      ? 'border-[#4A5F8A]'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productData.name} view ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>

            {/* Main Product Image */}
            <div className='lg:order-2 order-1 bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]'>
              <img
                src={mainImage || productData.image[0]}
                alt={productData.name}
                className='max-w-full max-h-full object-contain'
              />
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className='space-y-4 sm:space-y-6'>
            <div>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4'>
                {productData.name}
              </h1>
              <div className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 mb-4 sm:mb-6'>
                Rs
                {productData.offerPrice?.toLocaleString() ||
                  productData.price?.toLocaleString()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push('/cart');
                }}
                className='flex-1 bg-[#4A5F8A] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#3d4f73] transition-colors'
              >
                Buy
              </button>
              <button
                onClick={() => addToCart(productData._id)}
                className='flex-1 bg-[#4A5F8A] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#3d4f73] transition-colors'
              >
                Add to cart
              </button>
            </div>

            {/* Product Description */}
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold text-[#4A5F8A]'>
                Product description
              </h3>

              {/* Product Specifications Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                {productSpecs.map((spec, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-lg p-3 sm:p-4 flex items-center space-x-3'
                  >
                    <div className='w-8 h-8 bg-[#4A5F8A] rounded-full flex items-center justify-center text-white text-sm flex-shrink-0'>
                      {spec.icon}
                    </div>
                    <div className='min-w-0'>
                      <div className='text-xs sm:text-sm text-gray-600 truncate'>
                        {spec.label}
                      </div>
                      <div className='font-medium text-gray-900 text-sm sm:text-base truncate'>
                        {spec.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product Description Text */}
              <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
                {productData.description ||
                  'Smart Crystal Series-round touch wall switches are smart way of controlling your home appliances and electronic devices and having a personalized experience on your smart phones, with blue and red on/off LED indication lights.'}
              </p>
            </div>

            {/* Add Review Button */}
            <div className='pt-4'>
              <button
                onClick={handleAddReview}
                className='bg-[#4A5F8A] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#3d4f73] transition-colors'
              >
                Add a review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className='bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8'>
            <h2 className='text-2xl lg:text-3xl font-bold text-[#4A5F8A] mb-4 lg:mb-0'>
              Reviews ({calculateRatingStats().total})
            </h2>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
            {/* Rating Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm'>
                <div className='text-4xl sm:text-5xl font-bold text-gray-900 mb-2'>
                  {calculateRatingStats().average}
                </div>
                <div className='text-gray-500 mb-4 text-sm sm:text-base'>
                  of {calculateRatingStats().total} reviews
                </div>
                <div className='flex justify-center mb-4'>
                  {renderStars(Math.round(calculateRatingStats().average))}
                </div>

                {/* Rating Breakdown */}
                <div className='space-y-2 text-xs sm:text-sm'>
                  {[
                    { label: 'Excellent', rating: 5 },
                    { label: 'Good', rating: 4 },
                    { label: 'Average', rating: 3 },
                    { label: 'Below Average', rating: 2 },
                    { label: 'Poor', rating: 1 },
                  ].map((item, index) => {
                    const count = calculateRatingStats().breakdown[index];
                    const total = calculateRatingStats().total;
                    return (
                      <div
                        key={index}
                        className='flex items-center justify-between'
                      >
                        <span className='text-gray-600'>{item.label}</span>
                        <div className='flex items-center space-x-2 flex-1 max-w-[80px] sm:max-w-[100px] ml-2'>
                          <div className='bg-gray-200 rounded-full h-2 flex-1'>
                            <div
                              className='bg-[#4A5F8A] h-2 rounded-full'
                              style={{
                                width:
                                  total > 0
                                    ? `${(count / total) * 100}%`
                                    : '0%',
                              }}
                            ></div>
                          </div>
                          <span className='text-xs text-gray-500'>{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className='lg:col-span-3 space-y-4 sm:space-y-6'>
              {productReviews.length === 0 ? (
                <div className='bg-white rounded-xl p-6 text-center'>
                  <p className='text-gray-500'>
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              ) : (
                productReviews.slice(0, visibleReviews).map((review, index) => (
                  <div
                    key={index}
                    className='bg-white rounded-xl p-4 sm:p-6 shadow-sm'
                  >
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                      <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0'></div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2'>
                          <h4 className='font-semibold text-gray-900 text-sm sm:text-base truncate'>
                            {review.name}
                          </h4>
                          <span className='text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0'>
                            {review.date}
                          </span>
                        </div>
                        <div className='flex items-center mb-2 sm:mb-3'>
                          {renderStars(review.rating)}
                        </div>
                        <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* View More Button */}
              {visibleReviews < productReviews.length && (
                <div className='text-center pt-4 sm:pt-6'>
                  <button
                    onClick={handleViewMore}
                    className='border-2 border-[#4A5F8A] text-[#4A5F8A] py-2 sm:py-3 px-6 sm:px-8 rounded-xl font-medium hover:bg-[#4A5F8A] hover:text-white transition-colors text-sm sm:text-base'
                  >
                    View More ({productReviews.length - visibleReviews}{' '}
                    remaining)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6'>
            <h3 className='text-lg sm:text-xl font-bold mb-4'>Add a Review</h3>
            <form onSubmit={handleSubmitReview} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>Rating</label>
                <div className='flex space-x-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type='button'
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className={`text-xl sm:text-2xl ${
                        star <= newReview.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>Name</label>
                <input
                  type='text'
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5F8A] focus:border-transparent'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Comment
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A5F8A] focus:border-transparent'
                  required
                />
              </div>

              <div className='flex space-x-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowReviewModal(false)}
                  className='flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex-1 py-3 px-4 bg-[#4A5F8A] text-white rounded-lg font-medium hover:bg-[#3d4f73]'
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;
